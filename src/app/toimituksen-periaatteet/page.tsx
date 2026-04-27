import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, FileCheck, Database, Mail, Building2 } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Toimituksen periaatteet — Valitse Sähkö',
  description:
    'Valitse Sähkön toimituksen periaatteet, ranking-menetelmä, datalähteet (Fingrid, ENTSO-E, Energiavirasto), kumppanuudet ja päivitystiheys.',
  openGraph: {
    title: `Toimituksen periaatteet | ${SITE_NAME}`,
    description:
      'Toimituksen periaatteet, ranking-menetelmä, datalähteet ja kumppanuusperiaatteet.',
    url: `${SITE_URL}/toimituksen-periaatteet`,
  },
  alternates: {
    canonical: `${SITE_URL}/toimituksen-periaatteet`,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Sonodo',
  legalName: 'Sonodo (toiminimi)',
  taxID: '2887416-4',
  vatID: 'FI28874164',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'FI Y-tunnus',
    value: '2887416-4',
  },
  url: SITE_URL,
  brand: {
    '@type': 'Brand',
    name: 'Valitse Sähkö',
  },
  publishingPrinciples: `${SITE_URL}/toimituksen-periaatteet`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FI',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Finland',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Etusivu',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Toimituksen periaatteet',
      item: `${SITE_URL}/toimituksen-periaatteet`,
    },
  ],
};

export default function ToimituksenPeriaatteetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Etusivu
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700">Toimituksen periaatteet</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-accent">
                Toimitus &amp; vastuullisuus
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Toimituksen periaatteet
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Valitse Sähkö on Sonodo-toiminimen ylläpitämä riippumaton sähkövertailupalvelu.
              Tällä sivulla kuvaamme avoimesti, miten ranking syntyy, mistä data
              tulee ja miten kumppanuudet on järjestetty.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
          {/* Toimitus */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <FileCheck className="h-5 w-5 text-accent" />
              </div>
              Toimitus
            </h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Valitse Sähkön toimituksesta vastaa Sonodo. Toimituksen tehtävä
                  on varmistaa, että hintatieto, sopimusehdot ja yhtiöprofiilit
                  pitävät paikkansa, että ranking-menetelmä on dokumentoitu ja
                  että käyttäjä saa rehellisen kuvan myös pörssisähkön riskeistä
                  ja sähkölaskun rakenteesta.
                </p>
                <p>
                  Lähestymistapamme yhdistää huolellisen arkkitehtuurisuunnittelun,
                  laajan testauskattavuuden ja data-analyyttisen työtavan:
                  poikkeamat tunnistetaan datasta ja kehityspäätökset perustuvat
                  todennettuihin havaintoihin.
                </p>
                <p>
                  Toimituksellinen periaate: jokaisella oppaalla, blogiartikkelilla
                  ja yhtiöprofiililla on viimeisin tarkistuspäivä, ja sisältö
                  käydään läpi ennen julkaisua.
                </p>
              </div>
            </div>
          </section>

          {/* Ranking-menetelmä */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              Ranking-menetelmä
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
              <p>
                Sopimusten järjestys on aina algoritmin tuottama — ei kaupallinen.
                Algoritmi yhdistää kokonaiskustannuksen (60 %) ja
                vastapuoliriskin (40 %), ja se ajetaan jokaiselle suodatusvalinnalle
                erikseen. Sama logiikka koskee jokaista sopimusta riippumatta siitä,
                onko yhtiöllä Valitse Sähkön kanssa kumppanuussopimusta vai ei.
              </p>
              <p>
                Tarkka laskukaava, esimerkkilaskelmat ja vastapuoliriskin tasot
                löytyvät erilliseltä sivulta:
              </p>
              <ul>
                <li>
                  <Link href="/menetelma" className="text-accent hover:underline">
                    Menetelmä — Näin vertailemme sähkösopimuksia
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* Datalähteet */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Database className="h-5 w-5 text-accent" />
              </div>
              Datalähteet
            </h2>
            <ul className="space-y-3">
              {[
                {
                  title: 'Fingrid Open Data',
                  desc: 'Suomen kantaverkkoyhtiön julkaisema reaaliaikainen tuotanto- ja kulutusdata. Käytetään tuotantojakauman ja järjestelmän tilan esittämiseen.',
                  url: 'https://data.fingrid.fi/',
                },
                {
                  title: 'ENTSO-E Transparency Platform',
                  desc: 'Eurooppalaisen kantaverkkoyhdistyksen läpinäkyvyysalusta. Käytetään muun muassa rajasiirtojen ja Nord Pool -hintojen taustadatana.',
                  url: 'https://transparency.entsoe.eu/',
                },
                {
                  title: 'Energiavirasto',
                  desc: 'Suomen sähkömarkkinoiden valvontaviranomainen. Lähde sääntelykehykselle, alkuperätakuille ja kuluttajan oikeuksille.',
                  url: 'https://energiavirasto.fi/',
                },
                {
                  title: 'KKV — Kilpailu- ja kuluttajavirasto',
                  desc: 'Kuluttaja-asiamies ja kuluttajansuojan valvonta. Lähde kuluttajansuojalain tulkinnoille ja sähkösopimusten reklamaatio-ohjeille.',
                  url: 'https://www.kkv.fi/',
                },
                {
                  title: 'Sähköyhtiöiden viralliset hinnastot',
                  desc: 'Kerätään sähköyhtiöiden verkkosivuilta. Tarkistetaan viikoittain ja päivitetään muutosten yhteydessä.',
                },
              ].map((src) => (
                <li
                  key={src.title}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-900">{src.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{src.desc}</p>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                    >
                      {src.url.replace('https://', '').replace(/\/$/, '')}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Kumppanuudet */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              Kumppanuudet ja kaupallinen yhteistyö
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
              <p>
                Osa Valitse Sähkön linkeistä sähköyhtiöille on kumppanilinkkejä
                (ns. affiliate-linkkejä). Kun kuluttaja tekee sopimuksen tällaisen
                linkin kautta, Sonodo voi saada välityspalkkion. Palkkio ei vaikuta
                vertailun järjestykseen eikä kuluttajan maksamaan hintaan.
              </p>
              <ul>
                <li>
                  Kumppanilinkit on merkitty <code>rel=&quot;sponsored&quot;</code>{' '}
                  -attribuutilla.
                </li>
                <li>
                  Sivuston alalaidassa on koko sivuston kattava ilmoitus
                  kumppanuussuhteista.
                </li>
                <li>
                  Ranking-algoritmi ei käytä kumppanuusstatusta sijoituksen tekijänä.
                </li>
                <li>
                  Toimituksen sisältö (artikkelit, oppaat, sanasto) tuotetaan
                  riippumattomasti, ja kumppani ei saa ennakkoon nähdä tai vaatia
                  muutoksia sisältöön.
                </li>
              </ul>
            </div>
          </section>

          {/* Päivitystiheys */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Päivitystiheys</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Pörssisähkön spot-hinnat',
                  freq: '5 min välein',
                  note: 'Reaaliaikainen ENTSO-E / Nord Pool -data',
                },
                {
                  label: 'Sopimustiedot',
                  freq: 'Viikoittain',
                  note: 'Tarkistus ja päivitys yhtiöiden hinnastoista',
                },
                {
                  label: 'Yhtiöprofiilit ja oppaat',
                  freq: 'Muutosten yhteydessä',
                  note: 'Päivityspäivä näytetään sivulla',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                  <p className="mt-1 text-lg font-bold text-accent">{item.freq}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Yhteystiedot */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Building2 className="h-5 w-5 text-accent" />
              </div>
              Yhteystiedot
            </h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Sonodo (toiminimi)</p>
              <p className="mt-1 text-sm text-slate-600">Y-tunnus 2887416-4</p>
              <p className="mt-1 text-sm text-slate-600">Brändi: Valitse Sähkö</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <Link
                    href="/yhteystiedot"
                    className="text-accent hover:underline"
                  >
                    Yhteydenotot ja palaute
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Sähkönmyynnin valvonnasta vastaa Energiavirasto. Kuluttajansuoja-asioissa
                voit kääntyä Kilpailu- ja kuluttajaviraston (KKV) puoleen.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
