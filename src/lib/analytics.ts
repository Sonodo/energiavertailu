/**
 * Analytics wrapper — GA4 (gtag) + Microsoft Clarity.
 *
 * All functions are no-ops when `window` is undefined (SSR) or when the
 * underlying globals aren't loaded yet. Never throws.
 */

type ClarityFn = (...args: unknown[]) => void;

interface ClarityWindow {
  clarity?: ClarityFn;
}

function getGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === 'undefined') return null;
  const gtag = (window as Window & typeof globalThis).gtag;
  return typeof gtag === 'function' ? gtag : null;
}

function getClarity(): ClarityFn | null {
  if (typeof window === 'undefined') return null;
  const clarity = (window as Window & ClarityWindow).clarity;
  return typeof clarity === 'function' ? clarity : null;
}

/**
 * Generic GA4 event wrapper. Safe no-op if gtag is unavailable.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  try {
    const gtag = getGtag();
    if (!gtag) return;
    gtag('event', name, params ?? {});
  } catch {
    // never throw
  }
}

/**
 * Fire-and-forget affiliate click tracking.
 * Sends to GA4 AND to Microsoft Clarity (if loaded).
 */
export function trackAffiliateClick(
  provider: string,
  productType: string,
  extras?: Record<string, unknown>
): void {
  try {
    const params: Record<string, unknown> = {
      provider,
      product_type: productType,
      ...(extras ?? {}),
    };

    const gtag = getGtag();
    if (gtag) {
      gtag('event', 'affiliate_click', params);
    }

    const clarity = getClarity();
    if (clarity) {
      clarity('event', 'affiliate_click');
    }
  } catch {
    // never throw
  }
}

/**
 * Lead event — fire after successful form submission (newsletter, hintavahti, etc).
 */
export function trackLead(source: string, params?: Record<string, unknown>): void {
  try {
    const gtag = getGtag();
    if (!gtag) return;
    gtag('event', 'generate_lead', {
      source,
      ...(params ?? {}),
    });
  } catch {
    // never throw
  }
}

/**
 * Fired when the user begins the comparison flow (reaches results / hits Vertaile).
 */
export function trackBeginCompare(params?: Record<string, unknown>): void {
  try {
    const gtag = getGtag();
    if (!gtag) return;
    gtag('event', 'begin_compare', params ?? {});
  } catch {
    // never throw
  }
}
