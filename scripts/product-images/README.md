# Product photos

Generates the catalogue product shots that are still missing, in the same house
style as the photos already in `public/assets/products/`: a single product,
centred on white, soft contact shadow, no props — because the product cards
render `object-contain` on a light panel.

## Run it

1. Get a key at <https://aistudio.google.com/apikey>.
2. Put it in `.env.local` at the repo root:

   ```
   GEMINI_API_KEY="your-key"
   ```

3. Generate, then wire the results into the catalogue:

   ```bash
   node scripts/product-images/generate.mjs --dry-run   # what is missing
   node scripts/product-images/generate.mjs             # generate it
   node scripts/product-images/wire.mjs                 # point products.ts at the files
   npx tsc --noEmit
   ```

Useful flags:

| Flag | Effect |
| --- | --- |
| `--only su-001,ae-003` | Just these shots (accepts product ids or filenames) |
| `--pro` | `gemini-3-pro-image-preview` instead of the faster flash model |
| `--force` | Regenerate even if a file already exists |
| `--dry-run` | List what would be generated, call nothing |

`wire.mjs --check` reports without writing.

## How the two steps split

`generate.mjs` only ever writes into `public/assets/products/`. `wire.mjs` is
the only thing that edits `src/lib/data/products.ts`, and it adds an `image:`
field **only** for products whose file is actually on disk. That split is
deliberate: a product with no `image` falls back to the placeholder the card
components already render, whereas an `image` pointing at a missing file breaks
`next/image`. So a partial or failed run degrades gracefully instead of
breaking the build.

Re-running is safe. Both steps skip work that is already done.

## Editing the art direction

`manifest.mjs` holds one entry per shot — the product `id`, the output
basename, and a `subject` describing what to depict. `CUTOUT_STYLE` at the top
is the shared framing/lighting contract prepended to every prompt; change it
there and every shot moves together.

To add a shot, append an entry whose `id` matches a product in `products.ts`
that has an `imageAlt` — `wire.mjs` anchors the insertion to that field.

## Before publishing

These are generated images depicting branded consumer packaging and
manufacturer trade dress. They are stand-ins that match the existing catalogue
convention, not official manufacturer assets, and the model will approximate
rather than reproduce real label artwork. Worth a look-over for anything that
misstates a product — particularly the `aparataj-electric` and
`elemente-de-asamblare` items, where a buyer may read size or type off the
image. Official press-kit photography is the better long-term source wherever
a manufacturer provides it.
