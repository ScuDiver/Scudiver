import sharp from "sharp";
import { readdir, copyFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ASSETS_SRC = path.join(__dirname, "Assets");
const BRANDS_DEST = path.join(__dirname, "web/public/assets/brands");
const CATEGORIES_DEST = path.join(__dirname, "web/public/assets/categories");

// Brand logo files to convert
const brandFiles = [
  "dewalt.jpeg", "milwaukee.jpeg", "makita.jpg", "bosch.jpg",
  "bolman.jpeg", "unior.jpeg", "ingco.jpeg", "projahn.jpeg",
  "sculeBGS.jpeg", "YATO.jpeg", "SOUDAL.jpeg", "HENKEL.jpeg",
  "SCHULLER.jpeg", "DUPLICOLOR.jpeg", "SCHNEIDERELECTRIC.jpeg",
  "EATON.jpeg", "LOGO.jpeg",
];

// Category image mappings: [sourceFile, destBaseName]
const categoryFiles = [
  ["sudura-saffro.jpg", "sudura-saffro"],
  ["burghie-bolman.jpg", "burghie-bolman"],
  ["elemente-de-fixare-loctite.jpg", "elemente-de-fixare-loctite"],
  ["elemente-de-fixare.jpeg", "elemente-de-fixare"],
  ["scule-de-mana.png", "scule-de-mana"],
  ["truse-de-scule.png", "truse-de-scule"],
  ["echipamente-de-protectie.png", "echipament-de-protectie"],
];

async function convertToWebp(srcPath, destPath) {
  await sharp(srcPath)
    .webp({ quality: 85 })
    .toFile(destPath);
  console.log(`✓ ${path.basename(srcPath)} → ${path.basename(destPath)}`);
}

async function main() {
  // Ensure dest dirs exist
  await mkdir(BRANDS_DEST, { recursive: true });
  await mkdir(CATEGORIES_DEST, { recursive: true });

  console.log("\n=== Converting brand logos ===");
  for (const file of brandFiles) {
    const src = path.join(ASSETS_SRC, file);
    const baseName = path.basename(file, path.extname(file));
    const dest = path.join(BRANDS_DEST, `${baseName}.webp`);
    if (existsSync(src)) {
      await convertToWebp(src, dest);
    } else {
      console.warn(`  MISSING: ${src}`);
    }
  }

  console.log("\n=== Converting category images ===");
  for (const [srcFile, destBase] of categoryFiles) {
    const src = path.join(ASSETS_SRC, srcFile);
    const dest = path.join(CATEGORIES_DEST, `${destBase}.webp`);
    if (existsSync(src)) {
      await convertToWebp(src, dest);
    } else {
      console.warn(`  MISSING: ${src}`);
    }
  }

  console.log("\nDone!");
}

main().catch(console.error);
