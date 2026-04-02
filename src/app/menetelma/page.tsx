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
  title: 'Menetelm\u00e4 \u2014 N\u00e4in vertailemme s\u00e4hk\u00f6sopimuksia',
  description:
    'Tutustu Energiavertailun laskentamenetelm\u00e4\u00e4n, vastapuoliriskiarvioon, suositusalgoritmiin ja tietol\u00e4hteisiin. L\u00e4pin\u00e4kyv\u00e4 ja puolueeton s\u00e4hk\u00f6vertailu.',
  openGraph: {
    title: `Menetelm\u00e4 \u2014 N\u00e4in vertailemme s\u00e4hk\u00f6sopimuksia | ${SITE_NAME}`,
    description:
      'Tutustu Energiavertailun laskentamenetelm\u00e4\u00e4n, vastapuoliriskiarvioon, suositusalgoritmiin ja tietol\u00e4hteisiin.',
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
      name: 'Menetelm\u00e4',
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
              <span className="text-slate-700">Menetelm\u00e4</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Calculator className="h-5 w-5 text-[#0066FF]" />
              </div>
              <span className="text-sm font-medium text-[#0066FF]">
                L\u00e4pin\u00e4kyvyys ja luotettavuus
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Menetelm\u00e4 ja laskentaperusteet
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Haluamme, ett\u00e4 ymm\u00e4rr\u00e4t tarkalleen, miten vertailemme
              s\u00e4hk\u00f6sopimuksia ja miten tulokset lasketaan. T\u00e4ll\u00e4 sivulla
              avaamme laskentamenetelm\u00e4mme, riskiarvion perusteet, suositusalgoritmin
              sek\u00e4 k\u00e4ytt\u00e4m\u00e4mme tietol\u00e4hteet.
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
                title="N\u00e4in laskemme kokonaiskustannuksen"
                id="kokonaiskustannus"
              />
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
                <p>
                  S\u00e4hk\u00f6lasku koostuu kolmesta p\u00e4\u00e4osasta: energiakustannuksesta,
                  s\u00e4hk\u00f6n siirtomaksusta ja s\u00e4hk\u00f6verosta. Laskemme kaikki
                  osa-alueet vuositasolla, jotta sopimuksia on helppo vertailla.
                </p>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  1. Energiakustannus
                </h3>
                <p>
                  <strong>Kiinte\u00e4t ja toistaiseksi voimassa olevat sopimukset:</strong>
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Energiakustannus = (hinta c/kWh \u00d7 kulutus kWh / 100 + perusmaksu \u20ac/kk
                  \u00d7 12) \u00d7 1,255
                </div>
                <p>
                  <strong>Pörssisähkösopimukset:</strong> K\u00e4yt\u00e4mme toteutunutta
                  keskimääräistä spot-hintaa (tällä hetkellä 5,5 c/kWh alv 0 %), johon
                  lisätään yhtiön marginaali. Lopuksi lisätään ALV 25,5 %.
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Energiakustannus = ((spot-keskihinta + marginaali) c/kWh \u00d7 kulutus / 100 +
                  perusmaksu \u00d7 12) \u00d7 1,255
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  2. Siirtomaksu
                </h3>
                <p>
                  Siirtomaksu riippuu asuinalueesta ja paikallisesta verkkoyhti\u00f6st\u00e4.
                  K\u00e4yt\u00e4mme aluekohtaista keskimääräistä siirtohintaa (sis. verot).
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  Siirtomaksu = siirtohinta c/kWh \u00d7 kulutus kWh / 100
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  3. S\u00e4hk\u00f6vero
                </h3>
                <p>
                  S\u00e4hk\u00f6vero on valtion asettama vero s\u00e4hk\u00f6n kulutukselle.
                  Nykyinen verokanta on 2,79372 c/kWh (alv 0 %), johon lis\u00e4t\u00e4\u00e4n ALV
                  25,5 %.
                </p>
                <div className="my-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
                  S\u00e4hk\u00f6vero = 2,79372 c/kWh \u00d7 1,255 \u00d7 kulutus kWh / 100
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  4. Kokonaiskustannus
                </h3>
                <div className="my-4 rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 px-4 py-3 font-mono text-sm text-slate-700">
                  Yhteens\u00e4 = Energiakustannus + Siirtomaksu + S\u00e4hk\u00f6vero
                </div>

                {/* Example calculation */}
                <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                  Esimerkkilaskelma
                </h3>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Rivitalo, 5 000 kWh/v, Uusimaa, kiinte\u00e4 sopimus 5,50 c/kWh, perusmaksu
                    3,95 \u20ac/kk
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Energia: 5 000 \u00d7 5,50 / 100 = 275,00 \u20ac</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ Perusmaksu: 3,95 \u00d7 12 = 47,40 \u20ac</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ ALV 25,5 %: (275,00 + 47,40) \u00d7 0,255 = 82,21 \u20ac</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>= Energiakustannus: 404,61 \u20ac</span>
                    </div>
                    <div className="my-2 border-t border-slate-100" />
                    <div className="flex justify-between">
                      <span>Siirtomaksu: 5 000 \u00d7 4,20 / 100 = 210,00 \u20ac</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        S\u00e4hk\u00f6vero: 5 000 \u00d7 2,79372 / 100 \u00d7 1,255 = 175,33
                        \u20ac
                      </span>
                    </div>
                    <div className="my-2 border-t border-slate-200" />
                    <div className="flex justify-between text-base font-bold text-[#0066FF]">
                      <span>YHTEENS\u00c4: 789,94 \u20ac/vuosi (65,83 \u20ac/kk)</span>
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
                  Vastapuoliriski kertoo, kuinka todenn\u00e4k\u00f6ist\u00e4 on, ett\u00e4
                  s\u00e4hk\u00f6yhti\u00f6 ei pysty t\u00e4ytt\u00e4m\u00e4\u00e4n
                  sopimusvelvoitteitaan. K\u00e4yt\u00e4mme 0\u2013100 asteikkoa, jossa
                  pienempi luku tarkoittaa pienempää riskiä.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    range: '0\u201310',
                    label: 'Erittäin vakaa',
                    desc: 'Valtion omistamat tai erittäin suuret yhtiöt (esim. Fortum, Helen)',
                    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  },
                  {
                    range: '11\u201325',
                    label: 'Vakaa',
                    desc: 'Suuret, vakiintuneet yhtiöt, joilla vahva talous',
                    color: 'bg-green-100 text-green-800 border-green-200',
                  },
                  {
                    range: '26\u201350',
                    label: 'Kohtalainen',
                    desc: 'Keskikokoiset yhtiöt, kohtuullinen riski',
                    color: 'bg-amber-100 text-amber-800 border-amber-200',
                  },
                  {
                    range: '51\u201375',
                    label: 'Kohonnut riski',
                    desc: 'Kohonnut riski \u2014 tutkittava huolellisesti ennen sopimusta',
                    color: 'bg-orange-100 text-orange-800 border-orange-200',
                  },
                  {
                    range: '76\u2013100',
                    label: 'Korkea riski',
                    desc: 'Taloudellisen vakauden huolenaiheita \u2014 sopimuksen toteutuminen epävarmaa',
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
                  kokonaispisteeseen. Algoritmi on sama kaikille sopimuksille \u2014 mikään
                  yhteistyö ei vaikuta tulokseen.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { weight: '50 %', label: 'Hintapisteet', desc: 'Edullisempi sopimus saa korkeammat pisteet (0\u2013100).' },
                  { weight: '30 %', label: 'Luotettavuuspisteet', desc: 'Pienempi vastapuoliriski = korkeammat pisteet.' },
                  { weight: '20 %', label: 'Asiakastyytyväisyys', desc: 'Arvosana normalisoitu asteikolla 0\u2013100.' },
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
                    Hintapisteet = (kallein - oma hinta) / (kallein - halvin) \u00d7 100
                  </div>
                  <div className="rounded-lg bg-slate-50 px-4 py-2 font-mono">
                    Luotettavuuspisteet = 100 - vastapuoliriski
                  </div>
                  <div className="rounded-lg bg-slate-50 px-4 py-2 font-mono">
                    Tyytyv\u00e4isyyspisteet = (arvosana - 1) / 4 \u00d7 100
                  </div>
                  <div className="rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 px-4 py-2 font-mono">
                    Kokonaispisteet = hinta \u00d7 0,5 + luotettavuus \u00d7 0,3 +
                    tyytyvaisyys \u00d7 0,2
                  </div>
                </div>
                <p className="mt-4">
                  Korkein kokonaispiste saa &ldquo;Paras valinta&rdquo; -merkinn\u00e4n.
                  Pisteytys lasketaan aina uudelleen valittujen suodattimien mukaan.
                </p>
              </div>
            </section>

            {/* ===== 4. Tietolähteet ===== */}
            <section>
              <SectionHeading
                icon={Database}
                title="Tietol\u00e4hteet"
                id="tietolahteet"
              />
              <div className="space-y-4">
                {[
                  {
                    title: 'Sopimustiedot',
                    desc: 'Kerätään s\u00e4hk\u00f6yhti\u00f6iden verkkosivuilta ja p\u00e4ivitet\u00e4\u00e4n viikottain.',
                  },
                  {
                    title: 'Spot-hinnat',
                    desc: 'spot-hinta.fi API sek\u00e4 ENTSO-E Transparency Platform.',
                    link: { label: 'ENTSO-E', url: 'https://transparency.entsoe.eu/' },
                  },
                  {
                    title: 'Tuotantotiedot',
                    desc: 'Fingrid Open Data \u2014 Suomen s\u00e4hk\u00f6j\u00e4rjestelm\u00e4n reaaliaikainen data.',
                    link: { label: 'Fingrid', url: 'https://data.fingrid.fi/' },
                  },
                  {
                    title: 'Siirtohinnat',
                    desc: 'Alueellisten verkkoyhti\u00f6iden julkaisemat siirtohinnat.',
                  },
                  {
                    title: 'Regulaattoriviittaus',
                    desc: 'Energiavirasto valvoo s\u00e4hk\u00f6markkinoita ja asettaa s\u00e4\u00e4ntelykehyksen, johon nojaudumme.',
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
                    <strong>L\u00e4pin\u00e4kyvyys:</strong> Kaikki laskentamenetelm\u00e4t ja
                    tietol\u00e4hteet ovat avoimesti dokumentoitu t\u00e4ll\u00e4 sivulla.
                  </li>
                  <li>
                    <strong>Puolueettomuus:</strong> Vertailutulokset perustuvat objektiivisiin
                    kriteereihin. Kaupalliset yhteistyöt eivät vaikuta j\u00e4rjestykseen.
                  </li>
                  <li>
                    <strong>Kuluttajansuoja:</strong> Tarjoamme selke\u00e4n tiedon riskeist\u00e4,
                    hinnoittelusta ja sopimusehdoista ennen kuin kuluttaja siirtyy
                    s\u00e4hk\u00f6yhti\u00f6n sivuille.
                  </li>
                  <li>
                    <strong>Vertailtavuus:</strong> Kaikki hinnat lasketaan samalla menetelmällä,
                    jotta sopimukset ovat aidosti vertailukelpoisia.
                  </li>
                  <li>
                    <strong>Ajantasaisuus:</strong> Tiedot pidet\u00e4\u00e4n ajan tasalla ja
                    p\u00e4ivitysaikaleima n\u00e4ytet\u00e4\u00e4n selke\u00e4sti.
                  </li>
                </ul>
                <p>
                  Lis\u00e4tietoja kuluttaja-asiamiehen ohjeista:{' '}
                  <a
                    href="https://www.kkv.fi/kuluttaja-asiat/kuluttajaoikeus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline"
                  >
                    KKV \u2014 Kuluttajaoikeus
                    <ExternalLink className="ml-1 inline h-3 w-3" />
                  </a>
                </p>
              </div>
            </section>

            {/* ===== 6. Päivitystiheys ===== */}
            <section>
              <SectionHeading
                icon={RefreshCw}
                title="P\u00e4ivitystiheys"
                id="paivitystiheys"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Spot-hinnat', freq: '5 minuutin v\u00e4lein', note: 'Reaaliaikainen p\u00f6rssihinta' },
                  { label: 'Sopimustiedot', freq: 'Viikottain', note: 'Tarkistetaan ja p\u00e4ivitet\u00e4\u00e4n' },
                  { label: 'Yhti\u00f6tiedot', freq: 'Muutosten yhteydess\u00e4', note: 'P\u00e4ivitet\u00e4\u00e4n havaittujen muutosten pohjalta' },
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
              Nyt kun tied\u00e4t miten laskelmat toimivat, kokeile vertailua itse \u2014 se on ilmaista.
            </p>
            <Link
              href="/vertailu"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#0066FF] shadow-lg transition-colors hover:bg-white/90"
            >
              Vertaa s\u00e4hk\u00f6sopimuksia
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
