const stats = [
  { value: "8+", label: "Ani de experiență" },
  { value: "500+", label: "Produse disponibile" },
  { value: "15+", label: "Branduri premium" },
  { value: "48h", label: "Răspuns la oferte" },
];

export function StatsSection() {
  return (
    <section
      className="bg-white border-b border-border"
      aria-label="Cifre cheie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-extrabold text-4xl md:text-5xl text-brand leading-none">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-muted uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
