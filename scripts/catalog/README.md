# Elemente de asamblare — catalogue

Two scripts, both reading the same file: our fastener supplier's three-page
visual index of DIN/ISO parts, `Scudiver/SURUB TRADE - CATALOG DE PRODUSE.pdf`.

| Script | Produces |
| --- | --- |
| `rebrand.mjs` | `public/assets/catalogs/scudiver-elemente-de-asamblare.pdf` — the same three pages under our masthead |
| `product-photos.mjs` | `public/assets/products/din-*.webp` — catalogue product shots for `elemente-de-asamblare` |

```bash
node scripts/catalog/rebrand.mjs
node scripts/catalog/product-photos.mjs --dry-run   # what would be written
node scripts/catalog/product-photos.mjs             # write the files
node scripts/catalog/product-photos.mjs --only ea-009
```

Both outputs are committed. **The source PDF is not** — `Scudiver/` is
gitignored, the same as the brand catalogue masters. Drop the file back in
under that exact name before re-running either script.

## What `rebrand.mjs` replaces

Only the top 62 pt of each page, which is the whole of the supplier's identity:
their logo, their address block, and the coloured strip carrying their web
address and strapline. The fastener grid below it — every photo, label and rule
— comes through byte-for-byte; the render diffs to zero outside the masthead.

The old masthead is **cut out**, not painted over. Text runs positioned in the
band and filled paths lying entirely inside it are deleted from the content
stream, so the supplier's address does not survive in the text layer for a
search or a copy-paste, and their logo does not survive as vector art for
anyone who opens the file in a drawing program. Document properties and the
three PDF bookmarks are rewritten too — they still named the original file, in
Hungarian.

Our masthead goes in as one 300 dpi raster band rather than as PDF text. A
writer this small can only reach the base-14 fonts, and those have no Romanian
comma-below glyphs — "Sighetu Marmatiei" in a document we hand to a public
buyer is not a good look.

`pdf.mjs` is the reader/writer both scripts sit on. It is regex over the raw
bytes rather than a real parser, which is only safe because there is exactly
one file it has to read: a Corel export with a classic cross-reference table,
no object streams, and every photo an uncompressed JPEG.

## What `product-photos.mjs` is for

Photographs of the parts we actually supply, which is why they are worth having
over anything `scripts/product-images/` generates: a buyer reading a head type
or a drive off the picture gets the truth. The trade-off is resolution — the
source tops out around 370 px on the long edge, so each shot is upscaled and
laid on a white plate.

The source photos sit on a light grey studio sweep, and it cannot be keyed out:
the parts are grey too. Each one is instead faded into the plate at the frame
edge, so it reads as a vignette rather than as a pasted-on rectangle.

`shots` at the top of the file maps a product `id` to the catalogue rows it is
built from, by the standard printed on the row. Add an entry there to add a
shot; the file is written to `public/assets/products/` and pointed at by hand
from `src/lib/data/products.ts`, the same split `scripts/product-images/` uses.

## What does not come from the source

Sizes, grades, pack quantities and prices in `products.ts`. The source is a
visual index of standards, not a price list — it shows what a DIN 934 nut looks
like, not which ones are on the shelf. Anything numeric in a product entry is
ours to stand behind.
