import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerSections = {
  palvelut: {
    title: 'Palvelut',
    links: [
      { label: 'Pörssisähkön hinta', href: '/porssisahko' },
      { label: 'Sähkövertailu', href: '/vertailu' },
      { label: 'Sähköyhtiöt', href: '/sahkoyhtiot' },
      { label: 'Kulutuslaskuri', href: '/tyokalut/kulutus' },
      { label: 'Aurinkopaneelilaskuri', href: '/tyokalut/aurinkopaneelit' },
      { label: 'Kaikki työkalut', href: '/tyokalut' },
    ],
  },
  sopimustyypit: {
    title: 'Sopimustyypit',
    links: [
      { label: 'Kiinteähintainen sähkö', href: '/oppaat/sahkosopimustyypit' },
      { label: 'Pörssisähkö-opas', href: '/oppaat/porssisahko-opas' },
      { label: 'Sähkön kilpailutus', href: '/oppaat/sahkon-kilpailutus' },
      { label: 'Energiansäästövinkit', href: '/oppaat/energiansaastovinkit' },
      { label: 'Artikkelit', href: '/blogi' },
    ],
  },
  tietoa: {
    title: 'Tietoa',
    links: [
      { label: 'Tietoa palvelusta', href: '/tietoa' },
      { label: 'Menetelmä', href: '/menetelma' },
      { label: 'Medialle', href: '/media' },
      { label: 'Yhteystiedot', href: '/yhteystiedot' },
    ],
  },
};

const valitseNetwork = [
  { name: 'Valitse.fi', url: 'https://valitse.fi', desc: 'Kaikki vertailupalvelut' },
  { name: 'Valitse Laina', url: 'https://valitselaina.fi', desc: 'Lainojen vertailu' },
  { name: 'Valitse Vakuutus', url: 'https://valitsevakuutus.fi', desc: 'Vakuutusten vertailu' },
  { name: 'Valitse Liittymä', url: 'https://valitseliittyma.fi', desc: 'Liittymien vertailu' },
  { name: 'Fillioneer', url: 'https://fillioneer.fi', desc: 'Apurahojen haku' },
  { name: 'Asuntomaatti', url: 'https://asuntomaatti.fi', desc: 'Asuntojen vertailu' },
  { name: 'Alennuskartta', url: 'https://alennuskartta.fi', desc: 'Tarjoukset kartalla' },
];

const legalLinks = [
  { label: 'Tietosuoja', href: '/tietosuoja' },
  { label: 'Käyttöehdot', href: '/kayttoehdot' },
  { label: 'Evästeet', href: '/evasteet' },
  { label: 'Sivuston ansainta', href: '/sivuston-ansainta' },
];

export default function Footer() {
  return (
    <footer className="bg-navy" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Valitse Sähkö — Etusivu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent/20">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Valitse<span className="text-accent-400"> Sähkö</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Riippumaton sähkövertailupalvelu. Vertaile sähkösopimuksia, seuraa
              pörssisähkön hintaa ja löydä sopiva sopimus kotitaloudellesi.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-400 ring-1 ring-inset ring-accent/20">
                Kattava
              </span>
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-400 ring-1 ring-inset ring-accent/20">
                Ilmainen
              </span>
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-400 ring-1 ring-inset ring-accent/20">
                37 yhtiötä
              </span>
            </div>
          </div>

          {/* Palvelut */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {footerSections.palvelut.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.palvelut.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sopimustyypit */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {footerSections.sopimustyypit.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.sopimustyypit.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tietoa */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {footerSections.tietoa.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.tietoa.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Valitse Network */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
            Osa Valitse-verkostoa
          </p>
          <div className="flex flex-wrap gap-2">
            {valitseNetwork.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-slate-400 ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10 hover:text-accent-400 hover:ring-accent/20"
                title={site.desc}
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
            Mainos — kumppanilinkit
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Osa Valitse Sähkön linkeistä sähköyhtiöille on kumppanilinkkejä.
            Kun teet sopimuksen linkin kautta, saatamme saada välityspalkkion.
            Palkkio ei vaikuta vertailun järjestykseen eikä sinun maksamaasi
            hintaan. Kaikki vertailut perustuvat samoihin julkisesti
            saatavilla oleviin hintatietoihin, ja menetelmämme on kuvattu{' '}
            <Link href="/menetelma" className="font-medium text-accent-400 underline-offset-4 hover:underline">
              Menetelmä-sivulla
            </Link>
            .
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Valitse Sähkö. Kaikki oikeudet pidätetty.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
