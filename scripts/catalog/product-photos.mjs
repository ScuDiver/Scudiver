#!/usr/bin/env node
/**
 * Lifts the fastener photography out of the supplier catalogue in `Scudiver/`
 * and lays it up as catalogue product shots for `elemente-de-asamblare`.
 *
 *   node scripts/catalog/product-photos.mjs --dry-run   # what would be written
 *   node scripts/catalog/product-photos.mjs             # write the files
 *   node scripts/catalog/product-photos.mjs --only ea-002
 *
 * These are photographs of the actual parts we supply, which is why they are
 * worth having over anything `scripts/product-images/` can generate: a buyer
 * reading a head type or a drive off the picture gets the truth. The trade-off
 * is resolution — the source tops out around 370 px on the long edge, so each
 * shot is upscaled and laid on a white plate rather than used raw.
 *
 * Sizes and grades in the product entries do NOT come from here. The source is
 * a visual index of standards, not a price list: it shows what a DIN 934 nut
 * looks like, not which ones are on the shelf.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { readPdf, readRows, imageMeta, SOURCE_PDF } from "./pdf.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products");

const dryRun = process.argv.includes("--dry-run");
const onlyArg = process.argv.indexOf("--only");
const only = onlyArg === -1 ? null : new Set(process.argv[onlyArg + 1].split(","));

/**
 * Which catalogue rows make up each product shot, by the standard printed on
 * the row. Several products are an assortment, so they take more than one row;
 * `take` picks which photos of a row to use — most rows carry a head-on view
 * first and a side view second, and for a single-part shot the side view alone
 * reads better on a card.
 *
 * @typedef {object} Shot
 * @property {string} id       Product id in src/lib/data/products.ts
 * @property {string} file     Output basename in public/assets/products/
 * @property {Array<{ std: string, take?: number[] }>} rows
 */

/** @type {Shot[]} */
export const shots = [
  {
    id: "ea-001",
    file: "din-7505a-suruburi-lemn",
    rows: [{ std: "DIN 7505A" }],
  },
  {
    id: "ea-002",
    file: "din-7504k-autoforante-tabla",
    rows: [{ std: "DIN 7504K" }],
  },
  {
    id: "ea-003",
    file: "din-931-934-125-set-bolturi",
    rows: [{ std: "DIN 931", take: [1] }, { std: "DIN 934", take: [0] }, { std: "DIN 125" }],
  },
  {
    id: "ea-006",
    file: "din-7976-suruburi-inox",
    rows: [{ std: "DIN 7976" }],
  },
  {
    id: "ea-007",
    file: "din-934-piulite-hexagonale",
    rows: [{ std: "DIN 934" }, { std: "DIN 985", take: [0] }],
  },
  {
    id: "ea-008",
    file: "din-125-9021-saibe-plate",
    rows: [{ std: "DIN 125" }, { std: "DIN 9021" }, { std: "DIN 127" }],
  },
  {
    id: "ea-009",
    file: "din-912-suruburi-imbus",
    rows: [{ std: "DIN 912" }],
  },
  {
    id: "ea-010",
    file: "din-975-tija-filetata",
    rows: [{ std: "DIN 975" }],
  },
  {
    id: "ea-011",
    file: "din-571-tirfoane-lemn",
    rows: [{ std: "DIN 571" }],
  },
  {
    id: "ea-012",
    file: "din-7337-nituri-oarbe",
    rows: [{ std: "DIN 7337" }],
  },
];

/* ── Lay-up ──────────────────────────────────────────────────────────────── */

/** Long edge of a laid-up shot, in pixels. */
const PLATE = 1400;
/** White margin around the content, as a fraction of the long edge. */
const MARGIN = 0.07;
/** Gap between parts in an assortment, as a fraction of the long edge. */
const GAP = 0.045;

/**
 * The source photos sit on a light grey studio sweep. Rather than try to cut
 * that out — the parts are grey too, and a luminance key eats them — fade the
 * sweep into the white plate at the frame edge, so each part reads as a
 * vignette rather than as a pasted-on rectangle.
 */
async function feathered(jpeg, scale) {
  const img = sharp(jpeg);
  const { width, height } = await img.metadata();
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);
  const { data } = await img.resize(w, h, { kernel: "lanczos3" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const fade = Math.max(6, Math.round(Math.min(w, h) * 0.07));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const edge = Math.min(x, y, w - 1 - x, h - 1 - y);
      if (edge < fade) data[(y * w + x) * 4 + 3] = Math.round((edge / fade) * 255);
    }
  }
  return { buffer: data, width: w, height: h };
}

async function layUp(parts) {
  // One shared scale keeps the parts of an assortment in proportion.
  const longest = Math.max(...parts.map((p) => p.px));
  const tallest = Math.max(...parts.map((p) => p.py));
  const budget = PLATE * (1 - 2 * MARGIN) - PLATE * GAP * (parts.length - 1);
  const scale = Math.min(4, budget / parts.reduce((sum, p) => sum + p.px, 0), (PLATE * 0.55) / tallest);

  const laid = [];
  for (const p of parts) laid.push(await feathered(p.data, scale));

  const gap = Math.round(PLATE * GAP);
  const contentW = laid.reduce((sum, l) => sum + l.width, 0) + gap * (laid.length - 1);
  const contentH = Math.max(...laid.map((l) => l.height));
  const pad = Math.round(PLATE * MARGIN);

  const width = contentW + pad * 2;
  // Keep a landscape shot from becoming a letterbox slit on the product card.
  const height = Math.max(contentH + pad * 2, Math.round(width / 2.4));

  const composite = [];
  let x = pad;
  for (const l of laid) {
    composite.push({
      input: l.buffer,
      raw: { width: l.width, height: l.height, channels: 4 },
      left: x,
      top: Math.round((height - l.height) / 2),
    });
    x += l.width + gap;
  }

  void longest;
  return sharp({ create: { width, height, channels: 3, background: "#ffffff" } })
    .composite(composite)
    .webp({ quality: 92 })
    .toBuffer();
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

/** Corel kerned the labels apart mid-number, e.g. "DIN 79 76". */
const normalise = (label) => label.replace(/(?<=\d)\s+(?=\d)/g, "").replace(/\s+/g, " ").trim();

const pdf = readPdf(path.join(ROOT, SOURCE_PDF));
const byStandard = new Map();
for (const row of readRows(pdf)) {
  const key = normalise(row.label);
  if (!byStandard.has(key) && row.images.length) byStandard.set(key, row);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
let written = 0;

for (const shot of shots) {
  if (only && !only.has(shot.id) && !only.has(shot.file)) continue;

  const parts = [];
  let missing = null;
  for (const { std, take } of shot.rows) {
    const row = byStandard.get(std);
    if (!row) {
      missing = std;
      break;
    }
    const picked = take ? take.map((i) => row.images[i]).filter(Boolean) : row.images;
    for (const im of picked) parts.push(imageMeta(pdf, im.obj));
  }

  if (missing) {
    console.warn(`! ${shot.id}: no catalogue row for "${missing}" — skipped`);
    continue;
  }

  const target = path.join(OUT_DIR, `${shot.file}.webp`);
  const source = shot.rows.map((r) => r.std).join(" + ");
  if (dryRun) {
    console.log(`  ${shot.id}  ${shot.file}.webp  ← ${source} (${parts.length} photos)`);
    continue;
  }

  fs.writeFileSync(target, await layUp(parts));
  const { width, height } = await sharp(target).metadata();
  const kb = fs.statSync(target).size / 1024;
  console.log(`✓ ${shot.id}  ${shot.file}.webp  ${width}×${height}  ${kb.toFixed(0)} kB  ← ${source}`);
  written++;
}

if (!dryRun) console.log(`\n${written} shot${written === 1 ? "" : "s"} written to public/assets/products/`);
