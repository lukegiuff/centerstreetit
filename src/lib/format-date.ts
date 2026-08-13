/**
 * Deterministic post-date formatting.
 *
 * This site is a static export (`output: 'export'`), so markup is produced on the
 * build machine and then hydrated in the visitor's browser. A bare
 * `toLocaleDateString()` resolves against whatever locale and time zone each of
 * those environments happens to have, so the build emits "8/11/2026" and a browser
 * in another locale renders "11/08/2026". React reports that as a hydration
 * mismatch, and visitors in different regions see different dates for the same post.
 *
 * Pinning both the locale and the time zone makes the output identical everywhere.
 */
export function formatPostDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
