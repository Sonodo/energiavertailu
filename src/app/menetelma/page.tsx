import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  Shield,
  Award,
  Database,
  Scale,
  RefreshCw,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Menetelmä — Näin vertailemme sähkösopimuksia',
  description:
    'Tutustu Valitse Sähkön laskentamenetelmään, vastapuoliriskiarvioon, suositusalgoritmiin ja tietolähteisiin. Läpinäkyvä ja kattava sähkövertailu.',
  openGraph: {
    title: `Menetelmä — Näin vertailemme sähkösopimuksia | ${SITE_NAME}`,
    description:
      'Tutustu Valitse Sähkön laskentamenetelmään, vastapuoliriskiarvioon, suositusalgoritmiin ja tietolähteisiin.',
    url: `${SITE_URL}/menetelma`,
  },
  alternates: {
    canonical: `${SITE_URL}/menetelma`,
  },
};

// BreadcrumbList structured data
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
      name: 'Menetelmä',
      item: `${SITE_URL}/menetelma`,
    },
  ],
};

function SectionHeading({
  icon: Icon,
  title,
  id,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  id: string;
}) {
  return (
    <h2
      id={id}
      className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 scroll-mt-20"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
        <Icon className="h-5 w-5 text-[#0066FF]" />
      </div>
      {title}
    </h2>
  );
}

export default function MenetelmaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0066FF] transition-colors">
                Etusivu
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700">Menetelmä</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Calculator className="h-5 w-5 text-[#0066FF]" />
              </div>
              <span className="text-sm font-medium text-[#0066FF]">
                Läpinäkyvyys ja luotettavuus
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Menetelmä ja laskentaperusteet
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Haluamme, että ymmärrät tarkalleen, miten vertailemme
              sähkösopimuksia ja miten tulokset lasketaan. Tällä sivulla
              avaamme laskentamenetelmämme, riskiarvion perusteet, suositusalgoritmin
              sekä käyttämämme tietolähteet.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* ===== 1. Kokonaiskustannus ===== */}
            <section>
              <SectionHeading
                icon={Calculator}
                title="Näin laskemme kokonaiskustannuksen"
                id="kokonaiskustannus"
              />
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <p>
                  Sähkölasku koostuu kolmesta pääosasta: energiakustannuksesta,
                  sähkön siirtomaksusta ja sähköverosta. Laskemme kaikki
                  osa-alueet vuositasolla, jotta sopimuksia on helppo vertailla.
                </p>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  1. Energiakustannus
                </h3>
                <p>
                  <strong>Kiinteät ja toistaiseksi voimassa olevat sopimukset:</strong>
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Energiakustannus = (hinta c/kWh × kulutus kWh / 100 + perusmaksu €/kk
                  × 12) × 1,255
                </div>
                <p>
                  <strong>Pörssisähkösopimukset:</strong> Käytämme toteutunutta
                  keskimääräistä spot-hintaa (tällä hetkellä 5,5 c/kWh alv 0 %), johon
                  lisätään yhtiön marginaali. Lopuksi lisätään ALV 25,5 %.
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Energiakustannus = ((spot-keskihinta + marginaali) c/kWh × kulutus / 100 +
                  perusmaksu × 12) × 1,255
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  2. Siirtomaksu
                </h3>
                <p>
                  Siirtomaksu riippuu asuinalueesta ja paikallisesta verkkoyhtiöstä.
                  Käytämme aluekohtaista keskimääräistä siirtohintaa (sis. verot).
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Siirtomaksu = siirtohinta c/kWh × kulutus kWh / 100
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  3. Sähkövero
                </h3>
                <p>
                  Sähkövero on valtion asettama vero sähkön kulutukselle.
                  Nykyinen verokanta on 2,79372 c/kWh (alv 0 %), johon lisätään ALV
                  25,5 %.
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Sähkövero = 2,79372 c/kWh × 1,255 × kulutus kWh / 100
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  4. Kokonaiskustannus
                </h3>
                <div className="my-4 rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 px-4 py-3 font-mono text-sm text-slate-700">
                  Yhteensä = Energiakustannus + Siirtomaksu + Sähkövero
                </div>

                {/* Example calculation */}
                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  Esimerkkilaskelma
                </h3>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Rivitalo, 5 000 kWh/v, Uusimaa, kiinteä sopimus 5,50 c/kWh, perusmaksu
                    3,95 €/kk
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Energia: 5 000 × 5,50 / 100 = 275,00 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ Perusmaksu: 3,95 × 12 = 47,40 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ ALV 25,5 %: (275,00 + 47,40) × 0,255 = 82,21 €</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>= Energiakustannus: 404,61 €</span>
                    </div>
                    <div className="my-2 border-t border-slate-100" />
                    <div className="flex justify-between">
                      <span>Siirtomaksu: 5 000 × 4,20 / 100 = 210,00 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Sähkövero: 5 000 × 2,79372 / 100 × 1,255 = 175,33
                        €
                      </span>
                    </div>
                    <div className="my-2 border-t border-slate-200" />
                    <div className="flex justify-between text-base font-bold text-[#0066FF]">
                      <span>YHTEENSÄ: 789,94 €/vuosi (65,83 €/kk)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===== 2. Vastapuoliriskiarvio ===== */}
            <section>
              <SectionHeading
                icon={Shield}
                title="Vastapuoliriskiarvio"
                id="vastapuoliriski"
              />
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <p>
                  Vastapuoliriski kertoo, kuinka todennäköistä on, että
                  sähköyhtiö ei pysty täyttämään
                  sopimusvelvoitteitaan. Käytämme 0–100 asteikkoa, jossa
                  pienempi luku tarkoittaa pienempää riskiä.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    range: '0–10',
                    label: 'Erittäin vakaa',
                    desc: 'Valtion omistamat tai erittäin suuret yhtiöt (esim. Fortum, Helen)',
                    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  },
                  {
                    range: '11–25',
                    label: 'Vakaa',
                    desc: 'Suuret, vakiintuneet yhtiöt, joilla vahva talous',
                    color: 'bg-green-100 text-green-800 border-green-200',
                  },
                  {
                    range: '26–50',
                    label: 'Kohtalainen',
                    desc: 'Keskikokoiset yhtiöt, kohtuullinen riski',
                    color: 'bg-amber-100 text-amber-800 border-amber-200',
                  },
                  {
                    range: '51–75',
                    label: 'Kohonnut riski',
                    desc: 'Kohonnut riski — tutkittava huolellisesti ennen sopimusta',
                    color: 'bg-orange-100 text-orange-800 border-orange-200',
                  },
                  {
                    range: '76–100',
                    label: 'Korkea riski',
                    desc: 'Taloudellisen vakauden huolenaiheita — sopimuksen toteutuminen epävarmaa',
                    color: 'bg-red-100 text-red-800 border-red-200',
                  },
                ].map((tier) => (
                  <div
                    key={tier.range}
                    className={`rounded-lg border px-4 py-3 ${tier.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{tier.range}</span>
                      <span className="text-sm font-semibold">{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm opacity-80">{tier.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                  Arviointikriteerit
                </h3>
                <ul>
                  <li>
                    <strong>Omistusrakenne:</strong> Valtion tai kunnan omistus vähentää riskiä merkittävästi
                  </li>
                  <li>
                    <strong>Taloustiedot:</strong> Tilinpäätökset, liikevaihto, kannattavuus ja vakavaraisuus
                  </li>
                  <li>
                    <strong>Asiakaspohja:</strong> Suuri ja vakaa asiakaskunta pienentää riskiä
                  </li>
                  <li>
                    <strong>Toimintavuodet:</strong> Pitkä historia kertoo vakaudesta
                  </li>
                </ul>
              </div>
            </section>

            {/* ===== 3. Suositusalgoritmi ===== */}
            <section>
              <SectionHeading
                icon={Award}
                title="Suositusalgoritmi"
                id="suositusalgoritmi"
              />
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <p>
                  &ldquo;Paras valinta&rdquo; -suosituksemme perustuu kolmen tekijän painotettuun
                  kokonaispisteeseen. Algoritmi on sama kaikille sopimuksille — mikään
                  yhteistyö ei vaikuta tulokseen.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { weight: '50 %', label: 'Hintapisteet', desc: 'Edullisempi sopimus saa korkeammat pisteet (0–100).' },
                  { weight: '30 %', label: 'Luotettavuuspisteet', desc: 'Pienempi vastapuoliriski = korkeammat pisteet.' },
                  { weight: '20 %', label: 'Asiakastyytyväisyys', desc: 'Arvosana normalisoitu asteikolla 0–100.' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-2 text-2xl font-bold text-[#0066FF]">{item.weight}</div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 prose prose-slate max-w-none prose-p:text-slate-600">
                <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                  Pisteytyksen laskenta
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="rounded-lg bg-slate-50 px-4 py-2 font-mono">
                    Hintapisteet = (kallein - oma hinta) / (kallein - halvin) × 100
                  </div>
                  <div className="rounded-lg bg-slate-50 px-4 py-2 font-mono">
                    Luotettavuuspisteet = 100 - vastapuoliriski
                  </div>
                  <div className="rounded-lg bg-slate-50 px-4 py-2 font-mono">
                    Tyytyväisyyspisteet = (arvosana - 1) / 4 × 100
                  </div>
                  <div className="rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 px-4 py-2 font-mono">
                    Kokonaispisteet = hinta × 0,5 + luotettavuus × 0,3 +
                    tyytyvaisyys × 0,2
                  </div>
                </div>
                <p className="mt-4">
                  Korkein kokonaispiste saa &ldquo;Paras valinta&rdquo; -merkinnän.
                  Pisteytys lasketaan aina uudelleen valittujen suodattimien mukaan.
                </p>
              </div>
            </section>

            {/* ===== 4. Tietolähteet ===== */}
            <section>
              <SectionHeading
                icon={Database}
                title="Tietolähteet"
                id="tietolahteet"
              />
              <div className="space-y-4">
                {[
                  {
                    title: 'Sopimustiedot',
                    desc: 'Kerätään sähköyhtiöiden verkkosivuilta ja päivitetään viikottain.',
                  },
                  {
                    title: 'Spot-hinnat',
                    desc: 'spot-hinta.fi API sekä ENTSO-E Transparency Platform.',
                    link: { label: 'ENTSO-E', url: 'https://transparency.entsoe.eu/' },
                  },
                  {
                    title: 'Tuotantotiedot',
                    desc: 'Fingrid Open Data — Suomen sähköjärjestelmän reaaliaikainen data.',
                    link: { label: 'Fingrid', url: 'https://data.fingrid.fi/' },
                  },
                  {
                    title: 'Siirtohinnat',
                    desc: 'Alueellisten verkkoyhtiöiden julkaisemat siirtohinnat.',
                  },
                  {
                    title: 'Regulaattoriviittaus',
                    desc: 'Energiavirasto valvoo sähkömarkkinoita ja asettaa sääntelykehyksen, johon nojaudumme.',
                    link: { label: 'Energiavirasto', url: 'https://energiavirasto.fi/' },
                  },
                ].map((source) => (
                  <div
                    key={source.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0066FF]" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{source.title}</h3>
                      <p className="mt-0.5 text-sm text-slate-600">{source.desc}</p>
                      {source.link && (
                        <a
                          href={source.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#0066FF] hover:underline"
                        >
                          {source.link.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== 5. KKV-yhteensopivuus ===== */}
            <section>
              <SectionHeading
                icon={Scale}
                title="KKV-yhteensopivuus"
                id="kkv"
              />
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <p>
                  Noudatamme kuluttaja-asiamiehen ohjeita hintavertailupalveluille. Olemme
                  sitoutuneet seuraaviin periaatteisiin:
                </p>
                <ul>
                  <li>
                    <strong>Läpinäkyvyys:</strong> Kaikki laskentamenetelmät ja
                    tietolähteet ovat avoimesti dokumentoitu tällä sivulla.
                  </li>
                  <li>
                    <strong>Avoimuus:</strong> Vertailutulokset perustuvat avoimiin
                    kriteereihin. Kaupalliset yhteistyöt eivät vaikuta järjestykseen.
                  </li>
                  <li>
                    <strong>Kuluttajansuoja:</strong> Tarjoamme selkeän tiedon riskeistä,
                    hinnoittelusta ja sopimusehdoista ennen kuin kuluttaja siirtyy
                    sähköyhtiön sivuille.
                  </li>
                  <li>
                    <strong>Vertailtavuus:</strong> Kaikki hinnat lasketaan samalla menetelmällä,
                    jotta sopimukset ovat aidosti vertailukelpoisia.
                  </li>
                  <li>
                    <strong>Ajantasaisuus:</strong> Tiedot pidetään ajan tasalla ja
                    päivitysaikaleima näytetään selkeästi.
                  </li>
                </ul>
                <p>
                  Lisätietoja kuluttaja-asiamiehen ohjeista:{' '}
                  <a
                    href="https://www.kkv.fi/kuluttaja-asiat/kuluttajaoikeus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline"
                  >
                    KKV — Kuluttajaoikeus
                    <ExternalLink className="ml-1 inline h-3 w-3" />
                  </a>
                </p>
              </div>
            </section>

            {/* ===== 6. Päivitystiheys ===== */}
            <section>
              <SectionHeading
                icon={RefreshCw}
                title="Päivitystiheys"
                id="paivitystiheys"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Spot-hinnat', freq: '5 minuutin välein', note: 'Reaaliaikainen pörssihinta' },
                  { label: 'Sopimustiedot', freq: 'Viikottain', note: 'Tarkistetaan ja päivitetään' },
                  { label: 'Yhtiötiedot', freq: 'Muutosten yhteydessä', note: 'Päivitetään havaittujen muutosten pohjalta' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-center"
                  >
                    <RefreshCw className="mx-auto mb-2 h-6 w-6 text-[#0066FF]" />
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <p className="mt-1 text-lg font-bold text-[#0066FF]">{item.freq}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Valmis vertailemaan?</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">
              Nyt kun tiedät miten laskelmat toimivat, kokeile vertailua itse — se on ilmaista.
            </p>
            <Link
              href="/vertailu"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#0066FF] shadow-lg transition-colors hover:bg-white/90"
            >
              Vertaa sähkösopimuksia
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
