#!/usr/bin/env node
/**
 * Points the catalogue at the product photos that now exist on disk.
 *
 * For every manifest shot whose file is present in public/assets/products/,
 * inserts an `image:` field into that product in src/lib/data/products.ts,
 * directly above its `imageAlt` — the position the hand-written entries use.
 *
 * Products whose photo has not been generated yet are left alone on purpose:
 * an `image` pointing at a missing file breaks next/image, whereas no `image`
 * at all falls back to the placeholder the card components already render.
 *
 *   node scripts/product-images/wire.mjs --check   report only, write nothing
 *   node scripts/product-images/wire.mjs           apply
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shots } from "./manifest.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products");
const DATA = path.join(ROOT, "src", "lib", "data", "products.ts");

const checkOnly = process.argv.includes("--check");

function existingFile(file) {
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    if (fs.existsSync(path.join(OUT_DIR, file + ext))) return file + ext;
  }
  return null;
}

let source = fs.readFileSync(DATA, "utf8");
const eol = source.includes("\r\n") ? "\r\n" : "\n";

const wired = [];
const skipped = [];
const already = [];

for (const shot of shots) {
  const filename = existingFile(shot.file);
  if (!filename) {
    skipped.push(shot.id);
    continue;
  }

  // Bound the search to this product's object literal: from its id to the
  // start of the next entry, so we never edit a neighbouring product.
  const idAt = source.indexOf(`id: "${shot.id}"`);
  if (idAt === -1) {
    console.warn(`! ${shot.id} not found in products.ts`);
    skipped.push(shot.id);
    continue;
  }
  const nextIdAt = source.indexOf('\n    id: "', idAt + 1);
  const blockEnd = nextIdAt === -1 ? source.length : nextIdAt;
  const block = source.slice(idAt, blockEnd);

  if (/^\s*image:/m.test(block)) {
    already.push(shot.id);
    continue;
  }

  const altAt = block.search(/^ {4}imageAlt:/m);
  if (altAt === -1) {
    console.warn(`! ${shot.id} has no imageAlt to anchor to`);
    skipped.push(shot.id);
    continue;
  }

  const insertion = `    image: "/assets/products/${filename}",${eol}`;
  const patched = block.slice(0, altAt) + insertion + block.slice(altAt);
  source = source.slice(0, idAt) + patched + source.slice(blockEnd);
  wired.push(`${shot.id} → ${filename}`);
}

if (wired.length && !checkOnly) fs.writeFileSync(DATA, source);

console.log(`${wired.length} product(s) ${checkOnly ? "would be wired" : "wired"}:`);
for (const w of wired) console.log(`  ${w}`);
if (already.length) console.log(`\n${already.length} already had an image: ${already.join(", ")}`);
if (skipped.length) console.log(`\n${skipped.length} still without a photo: ${skipped.join(", ")}`);
if (wired.length && !checkOnly) console.log(`\nUpdated ${path.relative(ROOT, DATA)} — run \`npx tsc --noEmit\` to confirm.`);
