#!/usr/bin/env node
/**
 * Republishes the fastener catalogue in `Scudiver/` under ScuDiver's masthead.
 *
 *   node scripts/catalog/rebrand.mjs
 *
 * The source is our supplier's three-page visual index of DIN/ISO fasteners.
 * The grid — every photo, label and rule on it — is left byte-for-byte alone;
 * only the top 62 pt of each page is replaced, because that is the whole of
 * the supplier's identity: their logo, their address block, and the coloured
 * strip carrying their web address and strapline. Document properties and PDF
 * bookmarks are rewritten too, since they still named the original file.
 *
 * The new masthead is composed as one raster band rather than as PDF text
 * operators: the base-14 fonts a writer this small can reach have no Romanian
 * comma-below glyphs, and "Sighetu Marmatiei" in a document we hand to a
 * public buyer is not a good look. 300 dpi keeps it crisp in print.
 *
 * Output: public/assets/catalogs/scudiver-elemente-de-asamblare.pdf
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { readPdf, readPage, streamObject, writePdf, SOURCE_PDF } from "./pdf.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = path.join(ROOT, "public", "assets", "catalogs", "scudiver-elemente-de-asamblare.pdf");
const LOGO = path.join(ROOT, "public", "assets", "brands", "LOGO.jpeg");

/* ── Page geometry, measured off the source ──────────────────────────────── */

const PAGE_W = 596;
const PAGE_H = 842;
/** Below this the fastener grid begins; above it, nothing but supplier branding. */
const BAND_Y = 780;
const BAND_H = PAGE_H - BAND_Y;
/** The supplier's strip ran between these rules; ours takes the same space. */
const STRIP_TOP = 799.33;
const STRIP_BOTTOM = 780.5;
const MARGIN_L = 33.29;
const MARGIN_R = 595.28;

const DPI = 300;
const PX = DPI / 72;
const px = (pt) => Math.round(pt * PX);

const BRAND = "#D32027";
const CHARCOAL = "#1A1A1A";
const MUTED = "#6B7280";

/* ── The logo, lifted off its paper background ───────────────────────────── */

/**
 * LOGO.jpeg is a mockup shot on off-white stock, so it cannot simply be
 * dropped onto a white masthead. Crop to the artwork and ramp everything
 * lighter than the paper out to pure white, keeping the antialiased edges.
 */
async function logoOnWhite() {
  const src = sharp(LOGO);
  const { width, height } = await src.metadata();
  const { data } = await src.raw().toBuffer({ resolveWithObject: true });
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (lum((y * width + x) * 3) < 200) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  const pad = 4;
  const cx = Math.max(0, x0 - pad);
  const cy = Math.max(0, y0 - pad);
  const cw = Math.min(width - 1, x1 + pad) - cx + 1;
  const ch = Math.min(height - 1, y1 + pad) - cy + 1;

  const out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const si = ((y + cy) * width + (x + cx)) * 3;
      const di = (y * cw + x) * 4;
      const alpha = Math.min(1, Math.max(0, (235 - lum(si)) / 25));
      out[di] = data[si];
      out[di + 1] = data[si + 1];
      out[di + 2] = data[si + 2];
      out[di + 3] = Math.round(alpha * 255);
    }
  }
  return { buffer: out, width: cw, height: ch };
}

/* ── The masthead ────────────────────────────────────────────────────────── */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function masthead() {
  const W = px(PAGE_W);
  const H = px(BAND_H);
  const stripTop = px(PAGE_H - STRIP_TOP);
  const stripBottom = px(PAGE_H - STRIP_BOTTOM);
  const left = px(MARGIN_L);
  const right = px(MARGIN_R);

  const logo = await logoOnWhite();
  const logoH = Math.round(stripTop * 0.82);
  const logoW = Math.round((logo.width / logo.height) * logoH);
  const logoTop = Math.round((stripTop - logoH) / 2);
  const logoScaled = await sharp(logo.buffer, { raw: { width: logo.width, height: logo.height, channels: 4 } })
    .resize(logoW, logoH)
    .png()
    .toBuffer();

  const family = "Arial, Helvetica, sans-serif";
  const line = (x, y, text, { size, weight = "normal", fill = CHARCOAL, anchor = "start" }) =>
    `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(text)}</text>`;

  const body = 36;
  const baseline = [58, 100, 142];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="${left}" y="${stripTop}" width="${right - left}" height="${stripBottom - stripTop}" fill="${BRAND}"/>
  ${line(left, baseline[0], "SCUDIVER 2016 SRL", { size: 40, weight: "bold", fill: BRAND })}
  ${line(left, baseline[1], "Str. Unirii bl 5A/17", { size: body, fill: MUTED })}
  ${line(left, baseline[2], "Sighetu Marmației, Maramureș", { size: body, fill: MUTED })}
  ${line(px(190), baseline[0], "Tel: 0753 657 215", { size: body, fill: CHARCOAL })}
  ${line(px(190), baseline[1], "E-mail: office@scudiver.ro", { size: body, fill: CHARCOAL })}
  ${line(px(190), baseline[2], "CUI RO35975938 · J 24/541/2016", { size: body, fill: MUTED })}
  ${line(left + 10, stripTop + 54, "www.scudiver.ro", { size: 38, weight: "bold", fill: "#ffffff" })}
  ${line(right - 10, stripTop + 54, "Distribuitor de elemente de asamblare, scule și echipamente", { size: 38, weight: "bold", fill: "#ffffff", anchor: "end" })}
</svg>`;

  return sharp(Buffer.from(svg))
    .composite([
      { input: logoScaled, left: right - logoW, top: logoTop, blend: "over" },
    ])
    .flatten({ background: "#ffffff" })
    .resize(W, H, { fit: "fill" })
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

/* ── Rewrite ─────────────────────────────────────────────────────────────── */

const bandOps = (name) =>
  [
    "q",
    "1 1 1 rg",
    `0 ${BAND_Y} ${PAGE_W} ${BAND_H} re`,
    "f",
    "Q",
    "q",
    `${PAGE_W} 0 0 ${BAND_H} 0 ${BAND_Y} cm`,
    `/${name} Do`,
    "Q",
    "",
  ].join("\n");

/**
 * Deletes the supplier's masthead from a page's content stream outright.
 *
 * Painting a white rectangle over it would hide it on screen, but the address
 * and web address would still sit in the text layer for anyone who searches or
 * copy-pastes, and the logo would still be there as vector art for anyone who
 * opens the file in a drawing program. So drop, above the band line:
 *
 *   · every BT…ET run whose text is positioned there, and
 *   · every filled path whose geometry lies entirely there — the logo
 *     outlines and the coloured strip, both converted to curves by Corel.
 *
 * Clipping paths (`W n`) are left alone: dropping one would let whatever it
 * was constraining spill across the page.
 */
function stripBand(content) {
  const LIMIT = BAND_Y - 0.5;
  const PAINT = /^(?:f|F|f\*|B|B\*|b|b\*|S|s)$/;
  const COORDS = /^((?:[\d.\-]+\s+)+)(m|l|c|v|y|re)$/;

  const out = [];
  let text = null;
  let cursor = [0, 0];
  let textInBand = false;
  let path = [];
  let pathInBand = true;

  const keepPath = () => {
    out.push(...path);
    path = [];
    pathInBand = true;
  };

  for (const ln of content.toString("latin1").split(/\r?\n/)) {
    let m;

    if (text) {
      text.push(ln);
      if ((m = ln.match(/^([\d.\-]+)\s+([\d.\-]+)\s+(?:TD|Td)$/))) {
        cursor = [cursor[0] + Number(m[1]), cursor[1] + Number(m[2])];
        textInBand = cursor[1] >= LIMIT;
      } else if ((m = ln.match(/^(?:[\d.\-]+\s+){4}([\d.\-]+)\s+([\d.\-]+)\s+Tm$/))) {
        cursor = [Number(m[1]), Number(m[2])];
        textInBand = cursor[1] >= LIMIT;
      } else if (ln === "ET") {
        if (!textInBand) out.push(...text);
        text = null;
      }
      continue;
    }

    if (ln === "BT") {
      keepPath();
      text = [ln];
      cursor = [0, 0];
      textInBand = false;
      continue;
    }

    if ((m = ln.match(COORDS))) {
      // `re` is x y w h; every other operator is a list of x y pairs.
      const n = m[1].trim().split(/\s+/).map(Number);
      const ys = m[2] === "re" ? [n[1], n[1] + n[3]] : n.filter((_, i) => i % 2 === 1);
      if (ys.some((y) => y < LIMIT)) pathInBand = false;
      path.push(ln);
      continue;
    }

    if (path.length && PAINT.test(ln)) {
      if (!pathInBand) {
        out.push(...path, ln);
      }
      path = [];
      pathInBand = true;
      continue;
    }

    keepPath();
    out.push(ln);
  }

  keepPath();
  if (text) out.push(...text);
  return Buffer.from(out.join("\n"), "latin1");
}

const pdfText = (s) => `(${s.replace(/([\\()])/g, "\\$1")})`;
/** UTF-16BE with a byte-order mark — the only way to get diacritics into /Title. */
const pdfUtf16 = (s) => `<feff${Buffer.from(s, "utf16le").swap16().toString("hex")}>`;

async function main() {
  const pdf = readPdf(path.join(ROOT, SOURCE_PDF));
  const overrides = new Map();

  const band = await masthead();
  const bandObj = Math.max(...pdf.objs.keys()) + 1;
  const bandName = "ImScuDiver";
  overrides.set(
    bandObj,
    streamObject(
      `/Type /XObject /Subtype /Image /Name /${bandName} /Filter [/DCTDecode] ` +
        `/Width ${px(PAGE_W)} /Height ${px(BAND_H)} /BitsPerComponent 8 /ColorSpace /DeviceRGB`,
      band,
    ),
  );

  for (const pageNum of pdf.kids) {
    const page = readPage(pdf, pageNum);

    // Cut the supplier masthead out, then lay ours in the space it left.
    const content = stripBand(zlib.inflateSync(pdf.stream(page.contents).data));
    const rebranded = zlib.deflateSync(Buffer.concat([content, Buffer.from(bandOps(bandName), "latin1")]));
    overrides.set(page.contents, streamObject("/Filter /FlateDecode", rebranded));

    // Register the band image in this page's resources.
    const pb = pdf.body(pageNum);
    overrides.set(pageNum, pb.replace(/\/XObject\s*<</, `/XObject << /${bandName} ${bandObj} 0 R `));
  }

  // Document properties and bookmarks still named the supplier's own file.
  overrides.set(
    pdf.info,
    `\n<< /Title ${pdfUtf16("Catalog Elemente de Asamblare — ScuDiver")} ` +
      `/Author ${pdfText("SCUDIVER 2016 SRL")} ` +
      `/Subject ${pdfUtf16("Șuruburi, piulițe, șaibe, ancore și dispozitive de fixare DIN/ISO")} ` +
      `/Keywords ${pdfText("elemente de asamblare, suruburi, piulite, saibe, ancore, DIN, ISO, CPV 44530000-4")} ` +
      `/Creator ${pdfText("ScuDiver")} /Producer ${pdfText("ScuDiver")} ` +
      `/CreationDate (D:${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "")}) >>\n`,
  );

  const sections = [
    "1: Șuruburi metrice și piulițe",
    "2: Șaibe, șuruburi pentru tablă și lemn",
    "3: Diverse organe de asamblare",
  ];
  for (const [i, num] of [221, 222, 223].entries()) {
    const b = pdf.body(num);
    if (b) overrides.set(num, b.replace(/\/Title\s*\([^)]*\)/, `/Title ${pdfUtf16(sections[i])}`));
  }

  // The linearization dictionary describes an object layout we are about to
  // change; blank it rather than leave stale byte offsets behind.
  overrides.set(226, "\n<< >>\n");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const bytes = writePdf(pdf, overrides, OUT);
  console.log(`${path.relative(ROOT, OUT)} — ${(bytes / 1024 / 1024).toFixed(2)} MB, ${pdf.kids.length} pages`);
}

await main();
