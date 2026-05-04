/**
 * Disclosure copy — single source of truth for affiliate-disclosure strings.
 *
 * Per Chairman directive 2026-05-04: match Sähkövertailu.fi level only.
 * No per-card labels, no above-results banners, no differentiated CTA text.
 * Disclosure lives on /sivuston-ansainta and via rel="sponsored" on outbound links.
 */

export type DisclosureSiteConfig = {
  siteName: string;
  rankingCriteria: string;
};

export const SITE_CONFIG: DisclosureSiteConfig = {
  siteName: 'Valitse Sähkö',
  rankingCriteria: 'kokonaishinta + sopimuskausi + vastapuoliriski',
};

export const DISCLOSURE_COPY = {
  /** Uniform CTA text — same regardless of partner status. */
  cta: 'Siirry tarjoajan sivulle',
  /** Footer link text to /sivuston-ansainta. */
  footerLinkLabel: 'Sivuston ansainta',
} as const;
