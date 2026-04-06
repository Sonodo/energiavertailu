import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sähköyhtiöt Suomessa — Kattava hakemisto',
  description:
    'Vertaa Suomen sähköyhtiöitä: hinnat, arvostelut, sopimukset ja yhteystiedot. Löydä luotettava sähköyhtiö ja paras sähkösopimus.',
  openGraph: {
    title: 'Sähköyhtiöt Suomessa — Kattava hakemisto | Valitse Sähkö',
    description:
      'Vertaa Suomen sähköyhtiöitä: hinnat, arvostelut, sopimukset ja yhteystiedot. Löydä luotettava sähköyhtiö ja paras sähkösopimus.',
  },
};

export default function SahkoyhtiotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
