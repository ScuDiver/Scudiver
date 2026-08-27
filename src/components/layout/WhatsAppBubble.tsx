import { WHATSAPP_HREF } from "@/lib/company";

/**
 * Floating WhatsApp call-to-action, pinned bottom-right on every page.
 *
 * Sits above the cookie banner by reading `--cookie-banner-height`, the custom
 * property CookieBanner keeps in sync with its own measured height — the banner
 * is a full-width bottom bar, so without the offset it would bury this button
 * exactly when a first-time visitor is most likely to reach for it.
 *
 * Static markup, so it stays a Server Component: no consent state to read, no
 * client JavaScript shipped for it.
 */
export function WhatsAppBubble() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrieți-ne pe WhatsApp (se deschide într-o fereastră nouă)"
      className="group fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[bottom,transform,box-shadow] duration-300 hover:scale-105 hover:shadow-xl focus-visible:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={{ bottom: "calc(var(--cookie-banner-height, 0px) + 1.25rem)" }}
    >
      {/* Attention ring — decorative, and stilled for reduced-motion users. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping motion-reduce:hidden"
      />

      {/* Desktop-only label; touch devices have no hover to reveal it. */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm bg-charcoal px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        Scrieți-ne pe WhatsApp
      </span>

      {/* WhatsApp glyph — lucide dropped brand icons, so the mark is inlined. */}
      <svg
        viewBox="0 0 24 24"
        className="relative h-7 w-7 fill-current"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    </a>
  );
}
