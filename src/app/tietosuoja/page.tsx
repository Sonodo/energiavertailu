import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste',
  description:
    'Energiavertailun tietosuojaseloste. Lue, miten keräämme, käsittelemme ja suojaamme henkilötietojasi EU:n tietosuoja-asetuksen (GDPR) mukaisesti.',
  openGraph: {
    title: `Tietosuojaseloste | ${SITE_NAME}`,
    description:
      'Energiavertailun tietosuojaseloste. Lue, miten keräämme, käsittelemme ja suojaamme henkilötietojasi.',
    url: `${SITE_URL}/tietosuoja`,
  },
  alternates: {
    canonical: `${SITE_URL}/tietosuoja`,
  },
};

export default function TietosuojaPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066FF]/10">
              <Shield className="h-5 w-5 text-[#0066FF]" />
            </div>
            <span className="text-sm font-medium text-[#0066FF]">Yksityisyydensuoja</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tietosuojaseloste
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tämä tietosuojaseloste kuvaa, miten Energiavertailu kerää, käyttää ja suojaa
            henkilötietojasi EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Päivitetty viimeksi: 26.3.2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          {/* 1. Rekisterinpitäjä */}
          <h2>1. Rekisterinpitäjä</h2>
          <p>
            <strong>Sonodo — Henri Linnainmaa</strong>
            <br />
            Helsinki, Suomi
            <br />
            Verkkopalvelu: valitsesahko.fi
            <br />
            Sähköposti: info@valitsesahko.fi
          </p>
          <p>
            Energiavertailu on suomalainen verkkopalvelu, joka tarjoaa sähkösopimusten
            vertailupalvelun kuluttajille. Toimimme rekisterinpitäjänä kaikille palvelumme
            kautta kerätyille henkilötiedoille.
          </p>

          {/* 2. Mitä tietoja keräämme */}
          <h2>2. Mitä tietoja keräämme</h2>
          <h3>2.1 Automaattisesti kerättävät tiedot</h3>
          <p>
            Kun käytät palveluamme, keräämme automaattisesti seuraavia tietoja:
          </p>
          <ul>
            <li>IP-osoite (anonymisoituna)</li>
            <li>Selaimen tyyppi ja versio</li>
            <li>Käyttöjärjestelmä ja laitetyyppi</li>
            <li>Sivujen katselukerrat ja vierailuajat</li>
            <li>Viittaava verkkosivu (mistä tulit palveluumme)</li>
            <li>Maantieteellinen sijainti (maa- ja kaupunkitasolla)</li>
          </ul>

          <h3>2.2 Käyttäjän antamat tiedot</h3>
          <p>
            Palvelumme toimii pääasiassa ilman käyttäjätilejä tai rekisteröitymistä.
            Voimme kerätä seuraavia tietoja, mikäli käyttäjä itse ne antaa:
          </p>
          <ul>
            <li>Sähkönkulutustiedot vertailulaskureissa (käsitellään vain selaimessa)</li>
            <li>Sähköpostiosoite, jos liityt uutiskirjeeseemme</li>
            <li>Yhteydenottolomakkeen kautta annetut tiedot (nimi, sähköpostiosoite, viesti)</li>
          </ul>

          <h3>2.3 Tiedot, joita emme kerää</h3>
          <p>
            Emme kerää arkaluontoisia henkilötietoja, kuten terveystietoja, uskonnollista
            vakaumusta tai poliittisia mielipiteitä. Emme kerää tai tallenna maksukorttitietoja
            tai henkilötunnuksia.
          </p>

          {/* 3. Evästeet ja analytiikka */}
          <h2>3. Evästeet ja analytiikka</h2>
          <h3>3.1 Välttämättömät evästeet</h3>
          <p>
            Käytämme teknisesti välttämättömiä evästeitä palvelun toiminnan
            varmistamiseksi. Nämä evästeet eivät kerää henkilötietoja ja ovat
            palvelun toiminnan kannalta välttämättömiä.
          </p>

          <h3>3.2 Analytiikkaevästeet</h3>
          <p>
            Saatamme tulevaisuudessa ottaa käyttöön analytiikkapalveluita (kuten
            Google Analytics) verkkosivuston käytön analysointiin. Mahdolliset
            analytiikkapalvelut keräävät anonymisoitua tietoa siitä, miten kävijät
            käyttävät sivustoamme. Tämän tarkoituksena on parantaa palvelumme laatua
            ja käyttäjäkokemusta.
          </p>
          <p>
            Mikäli analytiikkapalveluita otetaan käyttöön, päivitämme tämän
            tietosuojaselosteen vastaamaan käytössä olevia palveluita.
          </p>

          <h3>3.3 Evästeiden hallinta</h3>
          <p>
            Voit hallita evästeitä selaimen asetuksista. Huomioithan, että
            välttämättömien evästeiden estäminen voi vaikuttaa palvelun toimintaan.
          </p>

          {/* 4. Tietojen käyttötarkoitus */}
          <h2>4. Tietojen käyttötarkoitus</h2>
          <p>Käytämme kerättyjä tietoja seuraaviin tarkoituksiin:</p>
          <ul>
            <li>Palvelun tarjoaminen, ylläpito ja kehittäminen</li>
            <li>Käyttäjäkokemuksen parantaminen ja sisällön personointi</li>
            <li>Palvelun käytön tilastointi ja analysointi</li>
            <li>Teknisten ongelmien tunnistaminen ja korjaaminen</li>
            <li>Viestintä käyttäjien kanssa (mikäli käyttäjä on antanut yhteystietonsa)</li>
            <li>Lakisääteisten velvoitteiden noudattaminen</li>
          </ul>
          <p>
            <strong>Oikeusperuste:</strong> Tietojen käsittely perustuu oikeutettuun
            etuun (palvelun tarjoaminen ja kehittäminen) sekä käyttäjän suostumukseen
            (analytiikkaevästeet, uutiskirje).
          </p>

          {/* 5. Tietojen säilytys ja suojaus */}
          <h2>5. Tietojen säilytys ja suojaus</h2>
          <h3>5.1 Säilytysaika</h3>
          <p>
            Säilytämme henkilötietoja vain niin kauan kuin se on tarpeen tässä selosteessa
            kuvattujen käyttötarkoitusten toteuttamiseksi:
          </p>
          <ul>
            <li>Analytiikkatiedot: enintään 26 kuukautta (mikäli analytiikkapalvelu otetaan käyttöön)</li>
            <li>Uutiskirjeen tilaajatiedot: kunnes tilaus peruutetaan</li>
            <li>Yhteydenottopyynnöt: enintään 12 kuukautta</li>
          </ul>

          <h3>5.2 Tietoturva</h3>
          <p>
            Suojaamme henkilötietoja asianmukaisin teknisin ja organisatorisin toimenpitein.
            Palvelumme käyttää SSL/TLS-salausta (HTTPS) kaiken tiedonsiirron suojaamiseen.
            Pääsy henkilötietoihin on rajattu vain niille henkilöille, joiden työtehtävät
            sitä edellyttävät.
          </p>

          <h3>5.3 Tietojen siirto</h3>
          <p>
            Emme myy, vuokraa tai jaa henkilötietojasi kolmansille osapuolille
            markkinointitarkoituksiin. Tietoja voidaan siirtää luotettaville
            palveluntarjoajille (kuten hosting- ja analytiikkapalvelut), jotka
            käsittelevät tietoja puolestamme ja ainoastaan ohjeidemme mukaisesti.
          </p>

          {/* 6. Rekisteröidyn oikeudet */}
          <h2>6. Rekisteröidyn oikeudet (GDPR)</h2>
          <p>
            EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti sinulla on seuraavat
            oikeudet henkilötietojesi käsittelyyn liittyen:
          </p>
          <ul>
            <li>
              <strong>Oikeus saada pääsy tietoihin</strong> — Voit pyytää kopion sinusta
              kerätyistä henkilötiedoista.
            </li>
            <li>
              <strong>Oikeus tietojen oikaisemiseen</strong> — Voit pyytää virheellisten
              tai puutteellisten tietojesi korjaamista.
            </li>
            <li>
              <strong>Oikeus tietojen poistamiseen</strong> — Voit pyytää henkilötietojesi
              poistamista (&quot;oikeus tulla unohdetuksi&quot;).
            </li>
            <li>
              <strong>Oikeus käsittelyn rajoittamiseen</strong> — Voit pyytää tietojesi
              käsittelyn rajoittamista tietyissä tilanteissa.
            </li>
            <li>
              <strong>Oikeus siirtää tiedot</strong> — Voit pyytää tietojasi
              koneluettavassa muodossa.
            </li>
            <li>
              <strong>Oikeus vastustaa käsittelyä</strong> — Voit vastustaa tietojesi
              käsittelyä oikeutetun edun perusteella.
            </li>
            <li>
              <strong>Oikeus peruuttaa suostumus</strong> — Voit milloin tahansa peruuttaa
              antamasi suostumuksen tietojen käsittelyyn.
            </li>
          </ul>
          <p>
            Voit käyttää oikeuksiasi ottamalla meihin yhteyttä alla olevien yhteystietojen
            kautta. Vastaamme pyyntöösi viimeistään 30 päivän kuluessa.
          </p>

          {/* 7. Valvontaviranomainen */}
          <h2>7. Valvontaviranomainen</h2>
          <p>
            Mikäli katsot, että henkilötietojesi käsittely ei ole asianmukaista, sinulla on
            oikeus tehdä valitus tietosuojavaltuutetun toimistoon:
          </p>
          <p>
            <strong>Tietosuojavaltuutetun toimisto</strong>
            <br />
            Lintulahdenkuja 4, 00530 Helsinki
            <br />
            Sähköposti: tietosuoja@om.fi
            <br />
            Puhelin: 029 566 6700
            <br />
            Verkkosivu:{' '}
            <a
              href="https://tietosuoja.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066FF] hover:underline"
            >
              tietosuoja.fi
            </a>
          </p>

          {/* 8. Muutokset tietosuojaselosteeseen */}
          <h2>8. Muutokset tietosuojaselosteeseen</h2>
          <p>
            Pidätämme oikeuden päivittää tätä tietosuojaselostetta tarvittaessa.
            Merkittävistä muutoksista ilmoitetaan palvelun etusivulla. Suosittelemme
            tarkistamaan tämän selosteen säännöllisesti.
          </p>

          {/* 9. Yhteydenotto */}
          <h2>9. Yhteydenotto</h2>
          <p>
            Jos sinulla on kysyttävää tietosuojakäytännöistämme tai haluat käyttää
            rekisteröidyn oikeuksiasi, ota yhteyttä:
          </p>
          <p>
            <strong>Sonodo — Henri Linnainmaa</strong>
            <br />
            Sähköposti: info@valitsesahko.fi
          </p>
          <p>
            Pyrimme vastaamaan kaikkiin tietosuojaa koskeviin yhteydenottoihin
            mahdollisimman pian, viimeistään 30 päivän kuluessa.
          </p>
        </div>
      </div>
    </div>
  );
}
