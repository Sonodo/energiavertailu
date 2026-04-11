// Monthly electricity price reports for Finland
// Realistic data reflecting Finnish spot market conditions

export interface MonthlyReport {
  slug: string;
  title: string;
  month: number; // 1-12
  year: number;
  summary: string;
  avgSpotPrice: number; // c/kWh incl. VAT
  minSpotPrice: number;
  maxSpotPrice: number;
  cheapestHour: number; // 0-23
  expensiveHour: number; // 0-23
  priceDirection: 'up' | 'down' | 'stable';
  keyEvents: string[];
  consumerAdvice: string;
  comparisonNote: string;
  publishedAt: string;
  updatedAt: string;
}

export const monthlyReports: MonthlyReport[] = [
  {
    slug: 'sahkon-hinta-tammikuu-2026',
    title: 'Sähkön hinta tammikuussa 2026',
    month: 1,
    year: 2026,
    summary:
      'Tammikuu 2026 oli sähkömarkkinoilla haastava kuukausi. Kovat pakkaset nostivat kulutusta ja spot-hinnat nousivat selvästi joulukuun tasosta. Kuukauden keskihinta oli 8,42 c/kWh, mikä on tyypillistä Suomen talvikuukausille. Hintapiikkejä nähtiin erityisesti aamun ja illan kulutushuippujen aikaan, kun lämmitystarve kasvoi koko maassa.',
    avgSpotPrice: 8.42,
    minSpotPrice: 0.12,
    maxSpotPrice: 38.5,
    cheapestHour: 3,
    expensiveHour: 17,
    priceDirection: 'up',
    keyEvents: [
      'Kovat pakkasjaksot (alle -25 °C) nostivat kulutusta ja hintoja tammikuun puolivälissä',
      'Tuulivoimatuotanto oli keskimääräistä heikompaa, mikä vähensi edullista tarjontaa',
      'Olkiluoto 3 toimi täydellä kapasiteetilla koko kuukauden, mikä hillitsi pahimpia hintapiikkejä',
    ],
    consumerAdvice:
      'Tammikuun kaltaisina kalliina kuukausina pörssisähköasiakkaiden kannattaa erityisesti ajoittaa pesukoneita, kuivausrumpu ja sähkökiukaan käyttöä yöajan halvimmille tunneille (klo 1–5). Automaattinen ohjaus älytermostaatilla tai sähköyhtiön sovelluksella voi tuoda 20–30 % säästöjä verrattuna tasaiseen kulutukseen.\n\nKiinteän sopimuksen asiakkaat hyötyivät tammikuussa selvästi, sillä kiinteä hinta (n. 7,5–8,5 c/kWh) oli edullisempi kuin spot-keskihinta. Jos kulutuksesi on suuri eikä sinulla ole mahdollisuutta ajoittaa sitä, kiinteä sopimus tarjoaa mielenrauhaa talvikuukausina.',
    comparisonNote:
      'Kiinteähintaiset sopimukset (7,49–8,89 c/kWh) olivat tammikuussa edullisempia kuin pörssisähkön keskihinta (8,42 c/kWh). Aktiiviset pörssisähköasiakkaat, jotka optimoivat kulutustaan halvimmille tunneille, pystyivät kuitenkin pääsemään 6–7 c/kWh tasolle painotetulla keskihinnalla.',
    publishedAt: '2026-02-03',
    updatedAt: '2026-02-03',
  },
  {
    slug: 'sahkon-hinta-helmikuu-2026',
    title: 'Sähkön hinta helmikuussa 2026',
    month: 2,
    year: 2026,
    summary:
      'Helmikuussa 2026 sähkön hinta pysyi korkealla mutta kääntyi hienoiseen laskuun tammikuusta. Kuukauden keskihinta oli 7,18 c/kWh. Helmikuun loppupuolella tuulivoimatuotanto kasvoi merkittävästi, mikä painoi hintoja alas ja toi useita negatiivisten hintojen tunteja. Pakkasjaksojen ja tuulisten päivien vaihtelu teki hintaprofiilista poikkeuksellisen epätasaisen.',
    avgSpotPrice: 7.18,
    minSpotPrice: -1.2,
    maxSpotPrice: 29.8,
    cheapestHour: 4,
    expensiveHour: 18,
    priceDirection: 'down',
    keyEvents: [
      'Tuulivoimatuotanto rikkoi kuukausikohtaisen ennätyksen helmikuun viimeisellä viikolla',
      'Ruotsin ja Norjan tuonnin rajoitukset tilapäisesti nostivat hintoja kuukauden alussa',
      'Negatiivisia spot-hintoja nähtiin 12 tunnin ajan helmikuun viimeisellä viikonlopulla tuulivoiman ylitarjonnan vuoksi',
    ],
    consumerAdvice:
      'Helmikuun tyyppinen kuukausi, jossa hintavaihtelut ovat suuria, palkitsee aktiivisia pörssisähköasiakkaita. Tuulisina päivinä hinnat voivat olla lähellä nollaa tai jopa negatiivisia — nämä ovat erinomaisia hetkiä varata lämminvesivaraajan täyteen, ladata sähköautoa tai käyttää pesukoneita.\n\nKuluttajien, jotka harkitsevat kiinteää sopimusta, kannattaa seurata tilannetta keväällä: hinnat tyypillisesti laskevat maaliskuusta eteenpäin, ja kiinteiden sopimusten hinnat saattavat seurata perässä.',
    comparisonNote:
      'Pörssisähkö voitti helmikuussa niukasti kiinteät sopimukset. Keskimääräinen spot-hinta (7,18 c/kWh) alitti useimmat kiinteät sopimukset (7,49–8,89 c/kWh). Aktiivisimmat kuluttajat pääsivät painotettuun hintaan 5,5–6,5 c/kWh hyödyntämällä halpoja tunteja.',
    publishedAt: '2026-03-03',
    updatedAt: '2026-03-03',
  },
  {
    slug: 'sahkon-hinta-maaliskuu-2026',
    title: 'Sähkön hinta maaliskuussa 2026',
    month: 3,
    year: 2026,
    summary:
      'Maaliskuu 2026 toi sähkömarkkinoille selkeän helpotuksen. Kevään tuleminen, kasvava tuulivoimatuotanto ja lumi-sulamisen myötä elpynyt vesivoima painoivat sähkön keskihinnan 4,85 senttiin per kilowattitunti. Tämä on merkittävä pudotus talvikuukausien tasoista ja vastaa vuoden 2025 maaliskuun tasoa. Hintavaihtelut tasaantuivat selvästi.',
    avgSpotPrice: 4.85,
    minSpotPrice: -0.5,
    maxSpotPrice: 15.2,
    cheapestHour: 3,
    expensiveHour: 8,
    priceDirection: 'down',
    keyEvents: [
      'Vesivoiman tuotanto kasvoi merkittävästi lumien sulamisen myötä, erityisesti Pohjois-Suomessa ja Ruotsissa',
      'Tuulivoimakapasiteetti kasvoi entisestään uusien tuulipuistojen valmistuessa, mikä laski hintoja tuulisina päivinä nollan tuntumaan',
      'Lämmityskauden päättyminen kerrostaloissa vähensi sähkön kulutusta, mikä laski kysyntäpiikkejä aamulla ja illalla',
    ],
    consumerAdvice:
      'Maaliskuun edulliset hinnat osoittavat, miksi pörssisähkö on pitkällä aikavälillä usein edullisempi vaihtoehto. Talven korkeiden hintojen jälkeen kevät ja kesä tuovat merkittäviä säästöjä. Kannattaa tarkistaa, onko nykyinen sopimuksesi edelleen kilpailukykyinen — jos maksat kiinteää hintaa yli 7 c/kWh, pörssisähköön vaihtaminen voi olla nyt houkuttelevaa.\n\nKevät on myös hyvä aika investoida aurinkopaneeleihin. Huhtikuusta alkaen aurinkosähkön tuotanto alkaa olla merkittävää, ja yhdistettynä edulliseen pörssisähköön kokonaiskustannus pysyy matalana koko kesän.',
    comparisonNote:
      'Maaliskuussa pörssisähkö oli selkeästi kiinteää sopimusta edullisempi. Spot-keskihinta (4,85 c/kWh) jäi reilusti alle kiinteiden sopimusten (7,49–8,89 c/kWh). Ero oli jopa 2–4 c/kWh kiinteiden sopimusten tappioksi. Pörssisähkön asiakkaat säästivät maaliskuussa keskimäärin 50–70 euroa omakotitalon kokoisella kulutuksella.',
    publishedAt: '2026-03-27',
    updatedAt: '2026-03-27',
  },
];

// Finnish month names for display
const FINNISH_MONTHS = [
  '',
  'tammikuu',
  'helmikuu',
  'maaliskuu',
  'huhtikuu',
  'toukokuu',
  'kesäkuu',
  'heinäkuu',
  'elokuu',
  'syyskuu',
  'lokakuu',
  'marraskuu',
  'joulukuu',
];

const FINNISH_MONTHS_INESSIVE = [
  '',
  'tammikuussa',
  'helmikuussa',
  'maaliskuussa',
  'huhtikuussa',
  'toukokuussa',
  'kesäkuussa',
  'heinäkuussa',
  'elokuussa',
  'syyskuussa',
  'lokakuussa',
  'marraskuussa',
  'joulukuussa',
];

export function getMonthNameFi(month: number): string {
  return FINNISH_MONTHS[month] || '';
}

export function getMonthNameInessiveFi(month: number): string {
  return FINNISH_MONTHS_INESSIVE[month] || '';
}

export function getMonthlyReport(slug: string): MonthlyReport | undefined {
  return monthlyReports.find((r) => r.slug === slug);
}

export function getLatestReports(limit = 6): MonthlyReport[] {
  return [...monthlyReports]
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    })
    .slice(0, limit);
}
