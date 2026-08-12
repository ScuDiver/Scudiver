/**
 * Art direction for the catalogue product photos that are still missing.
 *
 * Every entry maps a product `id` from src/lib/data/products.ts to the file it
 * should produce in public/assets/products/. `file` is the basename only — the
 * extension comes from whatever the model returns, and wire.mjs finds it again
 * by globbing.
 *
 * The house style is a clean cutout on white, matching the product shots
 * already on file (soudal-fix-all, yato-trusa-216, milwaukee-m18-fid3): one
 * product, centred, full bleed margin, soft contact shadow, no props. The
 * brand catalogue images under public/assets/brands/catalog/ are a different,
 * contextual style and deliberately are not reproduced here — product cards
 * render `object-contain` on a light panel, which crops scenes badly.
 */

/** Shared style contract. Prepended to every subject below. */
export const CUTOUT_STYLE = `Professional e-commerce catalogue product photograph.
Single product, centred, on a pure white seamless background.
Studio three-point lighting, soft even illumination, no blown highlights, subtle contact shadow directly beneath the product.
The entire product sits well inside the frame with generous even margin on all sides — nothing cropped or touching an edge.
Straight-on or gentle three-quarter angle at eye level. Square composition.
Tack sharp throughout: legible label printing, accurate moulded-plastic texture, correct metal finish.
No hands, no props, no background objects, no scene, no text overlay, no watermark, no added logos beyond what is printed on the product itself.
Photorealistic, colour-accurate, the way a manufacturer shoots for a datasheet.`;

/**
 * @typedef {object} Shot
 * @property {string} id       Product id in products.ts
 * @property {string} file     Output basename in public/assets/products/
 * @property {string} subject  What to depict, in manufacturer-accurate detail
 */

/** @type {Shot[]} */
export const shots = [
  // ─── Sudură — SAF-FRO ──────────────────────────────────────────────────────
  {
    id: "su-001",
    file: "saf-fro-presto-185-force",
    subject:
      "A compact single-phase MMA stick welding inverter in SAF-FRO livery: deep blue steel housing with a light grey front panel, a black carrying strap over the top, one large current-adjustment rotary knob, a small digital amperage readout, and two dinse output sockets on the front. Roughly the size of a small toolbox, portable, 7 kg class. Front three-quarter view.",
  },
  {
    id: "su-002",
    file: "saf-fro-prestotig-220-force",
    subject:
      "A portable TIG welding inverter in SAF-FRO livery: blue and dark grey housing with a black shoulder strap, a control panel with a digital display, several membrane push-buttons and one main encoder knob, plus gas connection and dinse sockets on the front face. Slightly larger and squarer than a stick welder, 9.5 kg class. Front three-quarter view.",
  },
  {
    id: "su-003",
    file: "saf-fro-prestomig-210m",
    subject:
      "A single-phase MIG/MAG welding machine in SAF-FRO livery: boxy blue and grey steel cabinet about 50 cm long, a black MIG torch with its cable coiled at the side, a wire-feed compartment, a front panel with two stepped selector knobs and a digital display, and a carrying handle across the top. 17 kg bench-top class. Front three-quarter view.",
  },
  {
    id: "su-004",
    file: "saf-fro-electrozi-safer-g48n",
    subject:
      "A rectangular cardboard box of welding electrodes in blue and white SAF-FRO packaging standing upright, with a small fan of loose rutile stick electrodes lying in front of it — bare 2.5 mm steel rods coated in a pale cream-grey flux with a blue-tipped end. The box is the long flat shape used for a 4.5 kg pack of electrodes.",
  },
  {
    id: "su-005",
    file: "saf-fro-electrozi-safdry-510a",
    subject:
      "A vacuum-sealed foil pack of basic low-hydrogen welding electrodes in blue and white SAF-FRO packaging, the shrink film visibly tight around the bundle, with a few loose 3.2 mm basic electrodes lying in front — steel rods with a matte pale-grey flux coating. Long flat rectangular pack.",
  },

  // ─── Aparataj electric — Eaton ─────────────────────────────────────────────
  {
    id: "ae-001",
    file: "eaton-pl7-c16-1p",
    subject:
      "A single-module miniature circuit breaker (MCB) for DIN rail in Eaton livery: white-grey moulded plastic body one module wide (18 mm), a black toggle lever in the ON position, the rating markings printed on the front face, terminal screws top and bottom, and the DIN rail clip visible on the back edge. Shown alone at a three-quarter angle so the module depth reads clearly.",
  },
  {
    id: "ae-002",
    file: "eaton-pf6-40a-30ma",
    subject:
      "A four-pole residual current circuit breaker (RCD) for DIN rail in Eaton livery: white-grey moulded plastic body four modules wide, one wide black toggle lever, a small blue or black TEST button on the front face, rating markings printed on the front, terminal screws top and bottom. Three-quarter angle.",
  },
  {
    id: "ae-003",
    file: "eaton-dilm25-10-contactor",
    subject:
      "A three-pole power contactor in Eaton livery: dark grey and black moulded plastic block roughly cubic, about 45 mm wide, with three pairs of heavy screw power terminals on the top and bottom faces, smaller auxiliary control terminals, a coil label on the front, and DIN rail mounting on the back. Three-quarter angle.",
  },
  {
    id: "ae-004",
    file: "eaton-tablou-36-module",
    subject:
      "A flush-mounted domestic electrical distribution board / consumer unit in Eaton livery: white moulded plastic enclosure with a hinged white door closed, three horizontal rows behind it, a rectangular landscape format roughly 35 cm wide. Shown closed at a slight three-quarter angle so the door edge and depth read.",
  },

  // ─── Aparataj electric — Schneider Electric ────────────────────────────────
  {
    id: "ae-005",
    file: "schneider-acti9-ic60n-c16",
    subject:
      "A single-module miniature circuit breaker (MCB) for DIN rail in Schneider Electric Acti9 livery: white moulded plastic body one module wide with a distinctive green accent stripe across the front face, a dark grey toggle lever in the ON position, rating markings printed on the front, terminal screws top and bottom. Three-quarter angle.",
  },
  {
    id: "ae-006",
    file: "schneider-acti9-iid-40a-30ma",
    subject:
      "A two-pole residual current circuit breaker (RCD) for DIN rail in Schneider Electric Acti9 livery: white moulded plastic body two modules wide with a green accent stripe, a dark grey toggle lever, a small TEST button on the front face, rating markings printed on the front. Three-quarter angle.",
  },
  {
    id: "ae-007",
    file: "schneider-resi9-24-module",
    subject:
      "A surface-mounted domestic electrical distribution board in Schneider Electric Resi9 livery: white moulded plastic enclosure with a hinged opaque white door closed, two horizontal rows behind it, rectangular landscape format roughly 30 cm wide, visibly proud of the wall rather than recessed. Slight three-quarter angle.",
  },

  // ─── Vopsele și accesorii — Schuller Eh'klar ───────────────────────────────
  {
    id: "vz-001",
    file: "schuller-trafalet-250mm",
    subject:
      "A 250 mm paint roller with its wire frame handle: a fat cylindrical sleeve of dense pale synthetic pile with a fine texture, mounted on a chromed wire roller cage with a moulded plastic grip. Laid at a three-quarter angle so both the sleeve and the handle read clearly.",
  },
  {
    id: "vz-002",
    file: "schuller-set-pensule-aqua",
    subject:
      "A set of five flat paint brushes of increasing width fanned out side by side, each with a lacquered light wood handle, a bright stainless steel ferrule and pale synthetic bristles. Arranged neatly in a row from narrowest to widest.",
  },
  {
    id: "vz-003",
    file: "schuller-banda-mascare-gold",
    subject:
      "A single roll of golden-tan crepe paper masking tape standing on its side, the coiled paper edge and the hollow core clearly visible, roughly 38 mm wide with a loose end lifted slightly off the roll.",
  },
  {
    id: "vz-004",
    file: "schuller-folie-protectie-banda",
    subject:
      "A roll of transparent polyethylene protective dust sheet with an integrated strip of tan crepe masking tape along one edge, the clear film partly unfurled to show the folded pleats and the pre-attached tape band. Cylindrical roll lying at a three-quarter angle.",
  },

  // ─── Vopsele și accesorii — Dupli-Color ────────────────────────────────────
  {
    id: "vz-005",
    file: "duplicolor-grund-metal-spray",
    subject:
      "A 400 ml aerosol spray can of grey metal primer standing upright, cylindrical steel can with a domed top, a grey plastic actuator cap fitted, and a printed wrap label with a grey colour swatch band. Straight-on front view.",
  },
  {
    id: "vz-006",
    file: "duplicolor-ral-9005-negru-mat",
    subject:
      "A 400 ml aerosol spray paint can standing upright in matte black livery, cylindrical steel can with a domed top, a black plastic actuator cap fitted, and a printed wrap label carrying a solid matte black colour swatch band. Straight-on front view.",
  },
  {
    id: "vz-007",
    file: "duplicolor-lac-transparent-spray",
    subject:
      "A 400 ml aerosol can of clear protective lacquer standing upright, cylindrical steel can with a domed top, a clear or light grey plastic actuator cap fitted, and a printed wrap label with a glossy transparent-finish indicator band. Straight-on front view.",
  },

  // ─── Consumabile — SOUDAL / Henkel ─────────────────────────────────────────
  {
    id: "co-005",
    file: "soudal-silirub-2s-300ml",
    subject:
      "A 300 ml sanitary silicone sealant cartridge standing upright: cylindrical rigid plastic cartridge with a printed wrap label, a conical white nozzle fitted to the threaded top, and the pressed metal base disc visible. Straight-on front view.",
  },
  {
    id: "co-006",
    file: "soudal-soudafoam-pistol-750ml",
    subject:
      "A 750 ml aerosol can of gun-grade polyurethane expanding foam standing upright: tall cylindrical steel can with a printed wrap label and a black threaded adaptor collar on top for screwing into a foam applicator gun. Straight-on front view.",
  },
  {
    id: "co-007",
    file: "loctite-243-10ml",
    subject:
      "A small 10 ml bottle of medium-strength threadlocker adhesive standing upright: squat white plastic bottle with a blue screw cap and a blue and red printed label, the liquid inside tinted blue. Straight-on front view, shown large enough to fill the frame.",
  },
  {
    id: "co-008",
    file: "pattex-total-fix-142g",
    subject:
      "A 142 g tube of instant-grab mounting adhesive standing upright on its cap: soft squeezable tube with a printed wrap label in yellow and black, a white screw nozzle cap, and the crimped seal at the top of the tube. Straight-on front view.",
  },

  // ─── Elemente de asamblare ─────────────────────────────────────────────────
  {
    id: "ea-001",
    file: "yato-set-suruburi-lemn-400",
    subject:
      "An open clear-lidded plastic organiser case of wood screws: a rectangular compartment box with six or so divided bays, each filled with yellow zinc-passivated Torx countersunk wood screws in a different length, the golden screws catching the light. Shown open from a high three-quarter angle so the filled compartments read.",
  },
  {
    id: "ea-002",
    file: "ingco-suruburi-autofiletante",
    subject:
      "A loose pile of bright zinc-plated hex-head self-drilling tek screws for sheet metal, showing the hexagonal flanged heads and the drill-point tips, arranged in a neat mound with a small clear plastic storage box behind them. Silver metallic finish.",
  },
  {
    id: "ea-003",
    file: "bgs-set-bolturi-piulite",
    subject:
      "An open compartmented metal storage case filled with an assortment of zinc-plated metric hex bolts, hex nuts and flat washers sorted by size into separate bays, the bright silver fasteners neatly grouped. High three-quarter angle showing the open tray.",
  },
  {
    id: "ea-004",
    file: "yato-suruburi-rigips",
    subject:
      "A loose pile of black phosphated drywall screws with bugle heads and Phillips drive recesses, the matte dark-grey coating clearly visible, arranged in a neat mound beside a small cardboard box. Fine coarse-threaded plasterboard screws.",
  },
  {
    id: "ea-006",
    file: "ingco-suruburi-inox-a2",
    subject:
      "A loose pile of bright A2 stainless steel countersunk wood screws with Torx drive recesses, the untinted silver stainless finish distinct from zinc plating, arranged in a neat mound with a small clear plastic box behind. Clean bright metal.",
  },

  // ─── Burghie și accesorii / Truse ──────────────────────────────────────────
  {
    id: "ba-004",
    file: "bgs-burghie-forstner-set",
    subject:
      "A set of eight Forstner wood drill bits of increasing diameter laid out in a row on their sides, each showing the flat circular cutting rim, the central brad point and the cylindrical shank, in a dark tempered steel finish with bright ground cutting edges.",
  },
  {
    id: "ba-005",
    file: "makita-disc-slefuire-fibra",
    subject:
      "A 115 mm abrasive fibre sanding disc shown face on and slightly tilted: a flat circular disc with a dark reddish-brown abrasive grain surface, a central round mounting hole, and the printed specification ring near the centre. Single disc, edge slightly lifted to show thickness.",
  },
  {
    id: "ts-003",
    file: "bgs-trusa-atelier-128",
    subject:
      "A large open black plastic tool case laid flat and opened like a book, both halves densely filled with a workshop tool assortment held in a fitted tray: socket sets, combination spanners, screwdrivers with red and black handles, pliers, a hammer and files, all bright chrome-vanadium. High three-quarter angle, the whole case in frame.",
  },
];

export default shots;
