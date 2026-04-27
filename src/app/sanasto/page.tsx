import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sähkön sanasto — pörssisähkö, marginaali, GSRN ja muut termit',
  description:
    'Sähkövertailun sanasto: pörssisähkö, perusmaksu, energiamaksu, siirtomaksu, sähkövero, marginaali, GSRN, Datahub, alkuperätakuu, ekosähkö ja kymmeniä muita keskeisiä termejä.',
  openGraph: {
    title: `Sähkön sanasto | ${SITE_NAME}`,
    description:
      'Selitykset sähkösopimusten ja sähkömarkkinoiden keskeisille termeille — pörssisähkö, marginaali, käyttöpaikan tunnus, alkuperätakuu ja muut.',
    url: `${SITE_URL}/sanasto`,
  },
  alternates: {
    canonical: `${SITE_URL}/sanasto`,
  },
};

interface Term {
  term: string;
  shortDef?: string;
  definition: string;
  source?: string;
  related?: string[];
}

const terms: Term[] = [
  {
    term: 'Pörssisähkö',
    definition:
      'Pörssisähköllä tarkoitetaan sähkösopimusta, jossa sähkön energian hinta seuraa Nord Poolin sähköpörssin tuntihintaa. Hinta vaihtelee tunneittain markkinatilanteen mukaan, ja kuluttaja maksaa todellisen pörssihinnan päälle myyjän marginaalin sekä perusmaksun. Pörssisähkö on usein edullisin sopimusmuoto pidemmällä aikavälillä, mutta hintariski on kuluttajalla.',
    source: 'Energiavirasto',
    related: ['Spot-hinta (Nord Pool)', 'Marginaali'],
  },
  {
    term: 'Spot-hinta (Nord Pool)',
    definition:
      'Nord Poolin day-ahead -markkinalla muodostuva sähkön tukkuhinta tunnille. Spot-hinta määräytyy kysynnän ja tarjonnan perusteella ja julkaistaan edellisenä päivänä klo 14 jälkeen. Kaikki suomalaiset pörssisähkösopimukset käyttävät tätä hintaa pohjana — kuluttajan maksama hinta on spot + myyjän marginaali + verot ja siirto.',
    source: 'Fingrid / Nord Pool',
    related: ['Pörssisähkö', 'Marginaali'],
  },
  {
    term: 'Marginaali',
    definition:
      'Pörssisähkösopimuksissa myyjän veloittama lisämaksu sähkön spot-hinnan päälle, ilmaistuna yleensä senteissä per kilowattitunti (c/kWh). Marginaali on myyjän kate ja kattaa muun muassa tasesähkön hankinnan ja riskinhallinnan kulut. Kilpailukykyiset marginaalit ovat tyypillisesti 0,2–0,7 c/kWh.',
    related: ['Pörssisähkö', 'Spot-hinta (Nord Pool)'],
  },
  {
    term: 'Määräaikainen sähkösopimus',
    definition:
      'Sähkösopimus, jossa sähkön energian hinta lukitaan tietyksi ajaksi — tyypillisesti 12, 24 tai 36 kuukaudeksi. Sopimuksen aikana hinta ei muutu, mikä antaa kuluttajalle ennustettavuutta. Määräaikaisesta sopimuksesta ei pääse irti ennen sopimuskauden päättymistä ilman sopimussakkoa, ellei myyjä riko sopimusta.',
    source: 'Kuluttajansuojalaki / KKV',
    related: ['Toistaiseksi voimassa oleva sopimus', 'Energiamaksu'],
  },
  {
    term: 'Toistaiseksi voimassa oleva sopimus',
    definition:
      'Sähkösopimus ilman määräaikaa, jonka kuluttaja voi irtisanoa milloin tahansa kahden viikon irtisanomisajalla. Hinta voi muuttua sopimusehtojen mukaisesti, mutta myyjän on ilmoitettava muutoksesta vähintään 30 päivää etukäteen.',
    source: 'Kuluttajansuojalaki / KKV',
    related: ['Määräaikainen sähkösopimus', 'Sopimuksen irtisanomisaika'],
  },
  {
    term: 'Perusmaksu',
    definition:
      'Sähkösopimuksen kuukausittain veloitettava kiinteä maksu, joka peritään riippumatta sähkönkulutuksesta. Perusmaksu on tyypillisesti 2–6 €/kk ja kattaa myyjän asiakaspalvelun, laskutuksen ja muut kiinteät kulut. Perusmaksua maksetaan erikseen sähkönmyynnistä ja sähkönsiirrosta — myyjän peruskuukausimaksu ei sisällä siirron perusmaksua.',
    related: ['Energiamaksu', 'Siirtomaksu'],
  },
  {
    term: 'Energiamaksu',
    definition:
      'Kulutetusta sähköstä maksettava kilowattituntikohtainen hinta (c/kWh). Kiinteähintaisessa sopimuksessa energiamaksu on lukittu sopimusajaksi; pörssisähkössä se vaihtelee tunneittain. Energiamaksun lisäksi kuluttaja maksaa siirtomaksun, sähköveron sekä arvonlisäveron.',
    related: ['Perusmaksu', 'c/kWh', 'Sähkövero'],
  },
  {
    term: 'Siirtomaksu',
    definition:
      'Maksu, jonka kuluttaja maksaa paikalliselle verkkoyhtiölle (esim. Caruna, Helen Sähköverkko) sähkön kuljettamisesta verkossa kotiin asti. Siirtomaksu sisältää yleensä kuukausittaisen perusmaksun ja kulutuspohjaisen kWh-hinnan. Siirtomaksusta ei voi kilpailuttaa — paikallinen verkko on luonnollinen monopoli, jota Energiavirasto valvoo.',
    source: 'Energiavirasto',
    related: ['Sähkövero', 'Käyttöpaikan tunnus (GSRN)'],
  },
  {
    term: 'Sähkövero',
    definition:
      'Kotitalouksilta perittävä valmistevero. Energiaveron osuus 2,24 c/kWh (alv 0 %) + huoltovarmuusmaksu 0,085 c/kWh (alv 0 %). Yhteensä 2,917875 c/kWh sisältäen alv 25,5 % (1.4.2026 alkaen). Luokka II (mm. teollisuus, datakeskukset 1.7.2026 asti) 0,169425 c/kWh. Vero peritään siirtolaskun yhteydessä.',
    source: 'Verohallinto',
    related: ['Siirtomaksu', 'c/kWh (snt/kWh)'],
  },
  {
    term: 'c/kWh (snt/kWh)',
    definition:
      'Sähkön hinnan yksikkö: senttiä per kilowattitunti. Käytetään sekä pörssisähkön spot-hinnasta että kiinteähintaisten sopimusten energiamaksusta. 1 c/kWh = 0,01 €/kWh. Esimerkiksi 8 c/kWh × 5 000 kWh = 400 € vuodessa pelkästä energiasta (ennen perusmaksua, siirtoa ja veroja).',
    related: ['Energiamaksu', 'Sähkönkulutus (kWh/v)'],
  },
  {
    term: 'Käyttöpaikan tunnus (GSRN)',
    definition:
      'GSRN (Global Service Relation Number) on 18-numeroinen yksilöivä tunniste sähkönkäyttöpaikalle. Tarvitaan sähkösopimuksen tekemiseen ja löytyy aiemmasta sähkölaskusta tai Datahub-portaalista. GSRN on käytössä yhtenäisesti koko Suomessa — vanhat verkkoyhtiökohtaiset käyttöpaikkanumerot korvautuivat GSRN:llä Datahubin myötä.',
    source: 'Fingrid Datahub',
    related: ['Datahub', 'Sopimuksen irtisanomisaika'],
  },
  {
    term: 'Datahub',
    definition:
      'Fingridin ylläpitämä keskitetty tietojärjestelmä, joka säilöö kaikki sähkön vähittäismarkkinoiden mittaus- ja sopimustiedot. Datahub otettiin käyttöön helmikuussa 2022 ja se mahdollistaa sähkösopimuksen vaihdon ilman, että uusi myyjä tarvitsee kuluttajan käyttöpaikan tietoja muusta lähteestä kuin GSRN-tunnuksesta. Kuluttaja voi tarkastella omia kulutustietojaan Datahub-asiakasportaalissa.',
    source: 'Fingrid',
    related: ['Käyttöpaikan tunnus (GSRN)', 'Sähkönkulutus (kWh/v)'],
  },
  {
    term: 'Sopimuksen irtisanomisaika',
    definition:
      'Toistaiseksi voimassa olevassa sähkösopimuksessa irtisanomisaika on lain mukaan kaksi viikkoa. Määräaikaista sopimusta ei voi irtisanoa kesken sopimuskauden ilman sopimussakkoa, paitsi jos myyjä on rikkonut sopimusta tai olosuhteissa on tapahtunut olennainen muutos (esim. muutto). Irtisanomisilmoitus tehdään myyjälle kirjallisesti.',
    source: 'Kuluttajansuojalaki / KKV',
    related: ['Toistaiseksi voimassa oleva sopimus', 'Määräaikainen sähkösopimus'],
  },
  {
    term: 'Alkuperätakuu',
    definition:
      'Eurooppalainen sähköisen sertifikaatin järjestelmä (Guarantee of Origin, GO), joka todistaa, että vastaava määrä sähköä on tuotettu uusiutuvilla energialähteillä. Suomessa alkuperätakuita hallinnoi Finextra (Fingridin tytäryhtiö). Yksi takuu vastaa yhtä megawattituntia uusiutuvaa sähköä. Vihreäksi markkinoidut sähkösopimukset perustuvat alkuperätakuiden hankintaan ja peruuttamiseen.',
    source: 'Energiavirasto / Finextra',
    related: ['Vihreä sähkö', 'Hiilineutraali sähkö'],
  },
  {
    term: 'Vihreä sähkö',
    definition:
      'Sähkösopimus, jonka mukaan kuluttajan käyttämää sähköä vastaava määrä on tuotettu uusiutuvilla energialähteillä — tyypillisesti tuuli-, vesi- tai aurinkovoimalla. Vihreä sähkö varmistetaan alkuperätakuilla. Huomaa, että fyysisesti verkossa kulkeva sähkö on aina sekoitusta kaikista tuotantomuodoista — alkuperätakuu on kirjanpidollinen sertifikaatti.',
    source: 'Energiavirasto',
    related: ['Alkuperätakuu', 'Ekosähkö', 'Hiilineutraali sähkö'],
  },
  {
    term: 'Ekosähkö',
    definition:
      'Vakiintunut markkinointitermi vihreälle sähkölle. Ei ole laissa määritelty termi, mutta käytännössä viittaa sähköön, jonka tuotanto on todennettu alkuperätakuilla uusiutuvaksi. "Ekosähkö" ja "vihreä sähkö" tarkoittavat sähkövertailussa lähes aina samaa asiaa.',
    related: ['Vihreä sähkö', 'Alkuperätakuu'],
  },
  {
    term: 'Hiilineutraali sähkö',
    definition:
      'Sähkö, jonka tuotannon hiilidioksidipäästöt on nolla tai kompensoitu päästövähennyksillä. Hiilineutraali ei ole sama kuin uusiutuva: esimerkiksi ydinvoima on hiilineutraalia mutta ei uusiutuvaa. Suomessa sähköntuotannosta valtaosa on jo hiilineutraalia ydin- ja uusiutuvan tuotannon ansiosta.',
    source: 'Tilastokeskus / Energiateollisuus',
    related: ['Vihreä sähkö', 'Alkuperätakuu'],
  },
  {
    term: 'Sähkönkulutus (kWh/v)',
    definition:
      'Kotitalouden vuosittainen sähkönkulutus kilowattitunteina. Tyypilliset arvot: kerrostaloasunto 1 500–3 000 kWh/v, rivitalo 4 000–7 000 kWh/v, omakotitalo (ilman sähkölämmitystä) 6 000–10 000 kWh/v, sähkölämmitteinen omakotitalo 18 000–30 000 kWh/v. Kulutus näkyy Datahubista ja edellisen vuoden sähkölaskuista.',
    source: 'Energiateollisuus',
    related: ['Datahub', 'Kerros- vs omakotitalon kulutus'],
  },
  {
    term: 'Kerros- vs omakotitalon kulutus',
    definition:
      'Asumismuoto vaikuttaa merkittävästi sähkönkulutukseen. Kerrostaloasunnossa lämmitys ja lämmin vesi tulevat usein kaukolämpönä, joten sähkönkulutus on pieni (1 500–3 000 kWh/v). Omakotitalossa lämmitysmuoto ratkaisee — sähkölämmitteisessä talossa kulutus voi olla 5–10× kerrostaloa suurempi. Lämpöpumppu pienentää kulutusta merkittävästi.',
    related: ['Sähkönkulutus (kWh/v)', 'Talvi-/kesäkulutus'],
  },
  {
    term: 'Talvi-/kesäkulutus',
    definition:
      'Sähkönkulutus jakautuu Suomessa epätasaisesti vuoden ympäri. Sähkölämmitteisessä omakotitalossa talvikuukaudet (joulu–helmikuu) voivat kattaa 50–60 % vuosikulutuksesta, kun kesäkuukaudet jäävät 5–10 %:iin. Tämä on syy siihen, miksi pörssisähkön talvitunnit ovat arvokkaita ja miksi kiinteähintainen sopimus on usein houkutteleva talven yli.',
    related: ['Sähkönkulutus (kWh/v)', 'Pörssisähkö'],
  },
  {
    term: 'Kotivakuutus-yhteissopimus',
    definition:
      'Joillakin sähkönmyyjillä on yhteistarjouksia vakuutusyhtiöiden kanssa: kun ottaa sähkön ja kotivakuutuksen samalta toimijaryhmältä, saa alennusta jommastakummasta tai molemmista. Hyödyt vaihtelevat tarjouksittain — kannattaa laskea kokonaiskustannus erikseen ja vertailla yhdistettyä hintaa erillisten sopimusten halvimpaan yhdistelmään.',
    related: ['Perusmaksu', 'Energiamaksu'],
  },
];

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
      name: 'Sanasto',
      item: `${SITE_URL}/sanasto`,
    },
  ],
};

const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/sanasto#termset`,
  name: 'Valitse Sähkö — sähkövertailun sanasto',
  description:
    'Sähkösopimusten ja sähkömarkkinoiden keskeiset termit suomeksi: pörssisähkö, marginaali, GSRN, Datahub, alkuperätakuu ja muut.',
  inLanguage: 'fi',
  url: `${SITE_URL}/sanasto`,
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/sanasto#${slug(t.term)}`,
    name: t.term,
    description: t.definition,
    inDefinedTermSet: `${SITE_URL}/sanasto#termset`,
  })),
};

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function SanastoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Etusivu
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700">Sanasto</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-accent">Sähkön sanasto</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sähkövertailun sanasto
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Selitykset sähkösopimusten ja sähkömarkkinoiden keskeisille termeille.
              Lähteenä on käytetty Energiavirastoa, Fingridiä, Kilpailu- ja
              kuluttajavirastoa (KKV) sekä toimialan vakiintunutta käytäntöä.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Päivitetty {new Date('2026-04-27').toLocaleDateString('fi-FI', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              .
            </p>
          </div>
        </div>

        {/* TOC */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Sisällys ({terms.length} termiä)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {terms.map((t) => (
                <a
                  key={t.term}
                  href={`#${slug(t.term)}`}
                  className="text-sm text-accent hover:underline"
                >
                  {t.term}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {terms.map((t) => (
              <article
                key={t.term}
                id={slug(t.term)}
                className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-slate-900">{t.term}</h2>
                <p className="mt-3 text-slate-700 leading-relaxed">{t.definition}</p>

                {(t.source || (t.related && t.related.length > 0)) && (
                  <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {t.source && (
                      <div className="text-xs text-slate-500">
                        <span className="font-medium text-slate-600">Lähde:</span> {t.source}
                      </div>
                    )}
                    {t.related && t.related.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-medium text-slate-600">Liittyvät:</span>
                        {t.related.map((r) => (
                          <a
                            key={r}
                            href={`#${slug(r)}`}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-accent/10 hover:text-accent transition-colors"
                          >
                            {r}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <h2 className="text-lg font-bold text-slate-900">Lue lisää</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/oppaat/porssisahko-opas" className="text-accent hover:underline">
                  Pörssisähkö-opas: miten pörssisähkö toimii käytännössä →
                </Link>
              </li>
              <li>
                <Link href="/oppaat/sahkon-kilpailutus" className="text-accent hover:underline">
                  Sähkön kilpailutus: vaihe vaiheelta opas sopimuksen vaihtoon →
                </Link>
              </li>
              <li>
                <Link href="/menetelma" className="text-accent hover:underline">
                  Vertailumenetelmämme ja datalähteet →
                </Link>
              </li>
              <li>
                <Link href="/tietoa" className="text-accent hover:underline">
                  Tietoa palvelusta ja toimituksen periaatteet →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
