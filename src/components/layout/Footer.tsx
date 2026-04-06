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
  oppaat: {
    title: 'Oppaat',
    links: [
      { label: 'Sähkön kilpailutus', href: '/oppaat/sahkon-kilpailutus' },
      { label: 'Pörssisähkö-opas', href: '/oppaat/porssisahko-opas' },
      { label: 'Energiansäästövinkit', href: '/oppaat/energiansaastovinkit' },
      { label: 'Sähkösopimustyypit', href: '/oppaat/sahkosopimustyypit' },
      { label: 'Blogi', href: '/blogi' },
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

const legalLinks = [
  { label: 'Tietosuoja', href: '/tietosuoja' },
  { label: 'Käyttöehdot', href: '/kayttoehdot' },
  { label: 'Evästeet', href: '/evasteet' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Energiavertailu — Etusivu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF]">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Energia<span className="text-[#0066FF]">vertailu</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Suomen kattavin ja puolueettomin sähkövertailupalvelu. Vertaa
              sähkösopimuksia, seuraa pörssisähkön hintaa ja löydä edullisin
              sähkösopimus kotitaloudellesi.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-700">
                Puolueeton
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-700">
                Ilmainen
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-700">
                37 yhtiötä
              </span>
            </div>
          </div>

          {/* Palvelut */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {footerSections.palvelut.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.palvelut.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Oppaat */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {footerSections.oppaat.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.oppaat.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tietoa */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {footerSections.tietoa.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerSections.tietoa.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Valitse-verkosto */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Osa Valitse-verkostoa</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { name: 'Lainavertailu', url: 'https://lainavertailu.vercel.app', desc: 'Lainojen vertailu' },
              { name: 'Vakuutusvertailu', url: 'https://vakuutusvertailu.vercel.app', desc: 'Vakuutusten vertailu' },
              { name: 'Puhelinvertailu', url: 'https://puhelinvertailu.vercel.app', desc: 'Liittymien vertailu' },
              { name: 'Asuntomaatti', url: 'https://asuntomaatti.fi', desc: 'Asuntojen vertailu' },
              { name: 'Alennuskartta', url: 'https://alennuskartta.fi', desc: 'Tarjoukset kartalla' },
              { name: 'Valitse', url: 'https://valitse.fi', desc: 'Kaikki vertailupalvelut' },
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                title={site.desc}
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Energiavertailu. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
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
