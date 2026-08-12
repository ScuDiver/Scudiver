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
