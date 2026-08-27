/** Year SCUDIVER 2016 SRL was founded — see J 24/541/2016 in the footer. */
export const FOUNDED_YEAR = 2016;

/**
 * Whole years of trading. Evaluated when the page is rendered, so a statically
 * generated page carries the figure that was true at build time — redeploy
 * annually, or the number goes stale rather than wrong.
 */
export function yearsInBusiness(now: Date = new Date()) {
  return now.getFullYear() - FOUNDED_YEAR;
}

/**
 * The company line (0753 657 215) in E.164 without the leading `+`, which is
 * the only shape wa.me accepts — a local `07…` number resolves to nothing.
 */
const WHATSAPP_NUMBER = "40753657215";

/** Opening line pre-filled for the visitor, so the chat starts with context. */
const WHATSAPP_GREETING =
  "Bună ziua! Aș dori mai multe informații despre produsele ScuDiver.";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_GREETING
)}`;
