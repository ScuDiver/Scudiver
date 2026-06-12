import Image from "next/image";

const brands = [
  { name: "DeWalt", file: "dewalt.jpeg" },
  { name: "Milwaukee", file: "milwaukee.jpeg" },
  { name: "Makita", file: "makita.jpg" },
  { name: "Bosch", file: "bosch.jpg" },
  { name: "Unior", file: "unior.jpeg" },
  { name: "YATO", file: "YATO.jpeg" },
  { name: "BGS", file: "sculeBGS.jpeg" },
  { name: "Projahn", file: "projahn.jpeg" },
  { name: "INGCO", file: "ingco.jpeg" },
  { name: "SOUDAL", file: "SOUDAL.jpeg" },
  { name: "HENKEL", file: "HENKEL.jpeg" },
  { name: "Schuller", file: "SCHULLER.jpeg" },
  { name: "Duplicolor", file: "DUPLICOLOR.jpeg" },
  { name: "Schneider Electric", file: "SCHNEIDERELECTRIC.jpeg" },
  { name: "EATON", file: "EATON.jpeg" },
  { name: "Bolman", file: "bolman.jpeg" },
];

export function BrandCarousel() {
  return (
    <section className="bg-white py-12 border-y border-border" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          id="brands-heading"
          className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8"
        >
          Branduri distribuite
        </p>

        {/* Scrollable grid — accessible alternative to pure CSS marquee */}
        <div className="overflow-x-auto pb-2" aria-label="Listă branduri">
          <div className="flex items-center gap-6 min-w-max mx-auto justify-center flex-wrap">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center w-28 h-14 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                title={brand.name}
              >
                <Image
                  src={`/assets/brands/${brand.file}`}
                  alt={brand.name}
                  width={112}
                  height={56}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
