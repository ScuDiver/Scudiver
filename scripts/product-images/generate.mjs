#!/usr/bin/env node
/**
 * Generates the missing catalogue product photos with Gemini's image models.
 *
 * Needs GEMINI_API_KEY, read from the environment or from .env.local at the
 * repo root. No npm dependencies — Node's built-in fetch does the work.
 *
 *   node scripts/product-images/generate.mjs --dry-run     list what is missing
 *   node scripts/product-images/generate.mjs               generate everything missing
 *   node scripts/product-images/generate.mjs --only su-001,ae-003
 *   node scripts/product-images/generate.mjs --pro         higher-quality model
 *   node scripts/product-images/generate.mjs --force       redo files already on disk
 *
 * Then wire the results into the catalogue:
 *   node scripts/product-images/wire.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shots, CUTOUT_STYLE } from "./manifest.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products");

// "Nano Banana" image models, same ids the ui-ux-pro-max design skill uses.
const MODEL_FLASH = "gemini-2.5-flash-image";
const MODEL_PRO = "gemini-3-pro-image-preview";

const EXT_BY_MIME = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
};

function parseArgs(argv) {
  const args = { only: null, force: false, pro: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force") args.force = true;
    else if (a === "--pro") args.pro = true;
    else if (a === "--dry-run" || a === "--dry") args.dryRun = true;
    else if (a === "--only") args.only = String(argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (a.startsWith("--only=")) args.only = a.slice(7).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--help" || a === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

/** GEMINI_API_KEY from the environment, falling back to .env.local / .env. */
function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  for (const name of [".env.local", ".env"]) {
    const file = path.join(ROOT, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*(.*)$/);
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    }
  }
  return null;
}

/** Existing file for a shot, whatever extension it landed with. */
function existingFile(file) {
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const p = path.join(OUT_DIR, file + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(shot, { apiKey, model }) {
  const prompt = `${CUTOUT_STYLE}\n\nSubject: ${shot.subject}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: "1:1" },
    },
  };

  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify(body),
      });
    } catch (err) {
      lastErr = err;
      await sleep(attempt * 2000);
      continue;
    }

    if (res.status === 429 || res.status >= 500) {
      lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      await sleep(attempt * 4000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);

    const json = await res.json();
    const parts = json?.candidates?.[0]?.content?.parts ?? [];
    const image = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"))?.inlineData;

    if (!image) {
      const finish = json?.candidates?.[0]?.finishReason ?? "unknown";
      const text = parts.find((p) => p.text)?.text;
      throw new Error(`no image in response (finishReason=${finish})${text ? `: ${text.slice(0, 200)}` : ""}`);
    }

    const ext = EXT_BY_MIME[image.mimeType] ?? ".png";
    const dest = path.join(OUT_DIR, shot.file + ext);
    fs.writeFileSync(dest, Buffer.from(image.data, "base64"));
    return dest;
  }
  throw lastErr ?? new Error("exhausted retries");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0]);
    return;
  }

  let queue = shots;
  if (args.only) {
    const wanted = new Set(args.only);
    queue = shots.filter((s) => wanted.has(s.id) || wanted.has(s.file));
    const missing = args.only.filter((k) => !shots.some((s) => s.id === k || s.file === k));
    if (missing.length) console.warn(`! not in manifest: ${missing.join(", ")}`);
  }
  if (!args.force) queue = queue.filter((s) => !existingFile(s.file));

  if (args.dryRun) {
    console.log(`${queue.length} of ${shots.length} shot(s) would be generated:`);
    for (const s of queue) console.log(`  ${s.id.padEnd(7)} ${s.file}`);
    return;
  }
  if (!queue.length) {
    console.log("Nothing to generate — every manifest shot already has a file.");
    return;
  }

  const apiKey = loadApiKey();
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.\n");
    console.error("Add it to .env.local at the repo root:");
    console.error('  GEMINI_API_KEY="your-key"\n');
    console.error("Get a key at https://aistudio.google.com/apikey");
    process.exitCode = 1;
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const model = args.pro ? MODEL_PRO : MODEL_FLASH;
  console.log(`Model: ${model}`);
  console.log(`Generating ${queue.length} product photo(s) into public/assets/products/\n`);

  const failed = [];
  for (const [i, shot] of queue.entries()) {
    const label = `[${i + 1}/${queue.length}] ${shot.id} ${shot.file}`;
    process.stdout.write(`${label} … `);
    try {
      const dest = await generateOne(shot, { apiKey, model });
      const kb = Math.round(fs.statSync(dest).size / 1024);
      console.log(`ok (${kb} KB)`);
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
      failed.push(shot.id);
    }
    if (i < queue.length - 1) await sleep(1200); // stay under the per-minute quota
  }

  console.log(`\nDone. ${queue.length - failed.length} generated, ${failed.length} failed.`);
  if (failed.length) {
    console.log(`Retry with: node scripts/product-images/generate.mjs --only ${failed.join(",")}`);
    process.exitCode = 1;
  } else {
    console.log("Next: node scripts/product-images/wire.mjs");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
