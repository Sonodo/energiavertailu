import type { Metadata } from 'next';
import { Cookie } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Evästekäytäntö',
  description:
    'Valitse Sähkön evästekäytäntö. Lue, miten käytämme evästeitä ja miten voit hallita evästeasetuksiasi.',
  openGraph: {
    title: `Evästekäytäntö | ${SITE_NAME}`,
    description:
      'Valitse Sähkön evästekäytäntö. Lue, miten käytämme evästeitä palvelussamme.',
    url: `${SITE_URL}/evasteet`,
  },
  alternates: {
    canonical: `${SITE_URL}/evasteet`,
  },
};

export default function EvasteetPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Cookie className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent">Evästeet</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Evästekäytäntö
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tämä evästekäytäntö kuvaa, miten Valitse Sähkö käyttää evästeitä ja
            vastaavia teknologioita palvelussaan. Käytämme evästeitä parantaaksemme
            käyttäjäkokemusta ja analysoidaksemme palvelun käyttöä.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Päivitetty viimeksi: 7.4.2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          {/* 1. What are cookies */}
          <h2>1. Mitä evästeet ovat</h2>
          <p>
            Evästeet (cookies) ovat pieniä tekstitiedostoja, jotka verkkosivusto
            tallentaa laitteellesi (tietokone, puhelin, tabletti) vierailusi
            yhteydessä. Evästeet auttavat sivustoa muistamaan asetuksiasi ja
            parantamaan käyttökokemusta.
          </p>
          <p>
            Evästeet eivät vahingoita laitettasi eivätkä sisällä viruksia tai
            haittaohjelmia. Ne ovat yleisesti käytetty teknologia, jota lähes kaikki
            verkkosivustot hyödyntävät.
          </p>

          {/* 2. Types of cookies we use */}
          <h2>2. Käyttämämme evästetyypit</h2>

          <h3>2.1 Välttämättömät evästeet</h3>
          <p>
            Nämä evästeet ovat palvelun toiminnan kannalta välttämättömiä. Ilman
            niitä palvelu ei toimi oikein. Välttämättömiin evästeisiin ei tarvita
            käyttäjän suostumusta.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left font-semibold">Eväste</th>
                  <th className="text-left font-semibold">Tarkoitus</th>
                  <th className="text-left font-semibold">Kesto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>__next_*</td>
                  <td>Next.js-sovelluskehyksen tekniset evästeet</td>
                  <td>Istunto</td>
                </tr>
                <tr>
                  <td>cookie_consent</td>
                  <td>Tallentaa käyttäjän evästevalinnat</td>
                  <td>12 kuukautta</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2.2 Analytiikkaevästeet</h3>
          <p>
            Käytämme Google Analytics 4 (GA4) -palvelua verkkosivuston käytön
            analysointiin. GA4 kerää anonymisoitua tietoa siitä, miten kävijät
            käyttävät sivustoamme, kuten sivulataukset, vierailuajat ja
            käytetyt laitteet. Tämän tarkoituksena on parantaa palvelumme
            laatua ja käyttäjäkokemusta.
          </p>
          <p>
            Analytiikkaevästeet asetetaan vain, jos annat niihin suostumuksen
            evästebannerin kautta. Oletuksena analytiikkatietojen kerääminen on
            estetty. Voit muuttaa valintaasi milloin tahansa tyhjentämällä selaimen
            evästeet ja paikallisen tallennustilan, jolloin evästebanneri näytetään
            uudelleen.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left font-semibold">Eväste</th>
                  <th className="text-left font-semibold">Tarkoitus</th>
                  <th className="text-left font-semibold">Kesto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics — kävijän tunnistus</td>
                  <td>2 vuotta</td>
                </tr>
                <tr>
                  <td>_ga_*</td>
                  <td>Google Analytics — istunnon seuranta</td>
                  <td>2 vuotta</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2.3 Kolmannen osapuolen evästeet</h3>
          <p>
            Palvelumme voi sisältää kolmansien osapuolien sisältöä (esim. upotettuja
            videoita tai sosiaalisen median painikkeita), jotka voivat asettaa omia
            evästeitään. Emme hallinnoi näitä evästeitä, ja niiden käyttöön
            sovelletaan kyseisten palveluiden omia evästekäytäntöjä.
          </p>

          {/* 3. Managing cookies */}
          <h2>3. Evästeiden hallinta</h2>
          <p>
            Voit hallita evästeitä useilla tavoilla:
          </p>

          <h3>3.1 Selainasetukset</h3>
          <p>
            Useimmat selaimet sallivat evästeiden hallinnan asetuksistaan. Voit
            esimerkiksi:
          </p>
          <ul>
            <li>Estää kaikki evästeet</li>
            <li>Sallia vain tiettyjen sivustojen evästeet</li>
            <li>Poistaa kaikki tallennetut evästeet</li>
            <li>Saada ilmoituksen ennen evästeen tallentamista</li>
          </ul>
          <p>
            Huomaathan, että evästeiden estäminen voi vaikuttaa palvelun
            toiminnallisuuteen. Välttämättömien evästeiden estäminen voi estää
            palvelun käytön kokonaan.
          </p>

          {/* 4. Legal basis */}
          <h2>4. Oikeusperuste</h2>
          <p>
            Välttämättömien evästeiden käyttö perustuu palvelun tekniseen
            toimivuuteen (oikeutettu etu). Analytiikka- ja markkinointievästeiden
            käyttö perustuu käyttäjän suostumukseen EU:n yleisen
            tietosuoja-asetuksen (GDPR) ja Suomen sähköisen viestinnän
            tietosuojalain mukaisesti.
          </p>

          {/* 5. Changes */}
          <h2>5. Muutokset evästekäytäntöön</h2>
          <p>
            Pidätämme oikeuden päivittää tätä evästekäytäntöä tarvittaessa.
            Merkittävistä muutoksista ilmoitamme palvelussa. Suosittelemme
            tarkistamaan tämän sivun säännöllisesti.
          </p>

          {/* 6. Contact */}
          <h2>6. Yhteydenotto</h2>
          <p>
            Jos sinulla on kysyttävää evästekäytännöstämme, ota yhteyttä:
          </p>
          <p>
            <strong>Sonodo (toiminimi)</strong>
            <br />
            <a
              href="/yhteystiedot"
              className="text-accent hover:underline"
            >
              Ota yhteyttä
            </a>
          </p>
          <p>
            Lisätietoa henkilötietojen käsittelystä löydät{' '}
            <a href="/tietosuoja" className="text-accent hover:underline">
              tietosuojaselosteestamme
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
