import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Käyttöehdot',
  description:
    'Valitse Sähkön käyttöehdot. Palvelun käyttöä koskevat ehdot, vastuunrajoitukset ja sovellettava laki.',
  openGraph: {
    title: `Käyttöehdot | ${SITE_NAME}`,
    description:
      'Valitse Sähkön käyttöehdot. Palvelun käyttöä koskevat ehdot ja vastuunrajoitukset.',
    url: `${SITE_URL}/kayttoehdot`,
  },
  alternates: {
    canonical: `${SITE_URL}/kayttoehdot`,
  },
};

export default function KayttoehdotPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent">Ehdot ja sopimukset</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Käyttöehdot
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Nämä käyttöehdot koskevat Valitse Sähkö -verkkopalvelun (valitsesahko.fi)
            käyttöä. Käyttämällä palvelua hyväksyt nämä ehdot.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Päivitetty viimeksi: 26.3.2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          {/* 1. Palvelun kuvaus */}
          <h2>1. Palvelun kuvaus</h2>
          <p>
            Valitse Sähkö on ilmainen verkkopalvelu, joka auttaa suomalaisia kuluttajia
            vertailemaan sähkösopimuksia ja sähköyhtiöitä. Palvelu tarjoaa:
          </p>
          <ul>
            <li>Sähkösopimusten hinta- ja ominaisuusvertailun</li>
            <li>Pörssisähkön hinnan reaaliaikaisen seurannan</li>
            <li>Sähkönkulutuksen laskureita ja työkaluja</li>
            <li>Oppaita ja artikkeleita sähkömarkkinoista</li>
            <li>Tietoa suomalaisista sähköyhtiöistä</li>
          </ul>
          <p>
            Palvelun tavoitteena on tarjota kattavaa ja ajantasaista tietoa
            sähkömarkkinoista, jotta kuluttajat voivat tehdä tietoon perustuvia
            päätöksiä sähkösopimuksen valinnassa.
          </p>

          {/* 2. Palvelun käyttö */}
          <h2>2. Palvelun käyttö</h2>
          <p>
            Palvelun käyttö on ilmaista eikä edellytä rekisteröitymistä. Käyttämällä
            palvelua sitoudut noudattamaan näitä käyttöehtoja. Palveluntarjoaja voi
            saada korvausta palveluntarjoajilta, joiden tuotteita palvelussa esitellään.
          </p>
          <p>Palvelun käyttäjänä sitoudut siihen, että:</p>
          <ul>
            <li>Käytät palvelua vain laillisiin tarkoituksiin</li>
            <li>Et yritä häiritä palvelun toimintaa tai kuormittaa sitä kohtuuttomasti</li>
            <li>Et yritä kopioida palvelun sisältöä automatisoidusti (scraping) ilman lupaa</li>
            <li>Et käytä palvelua kaupalliseen tarkoitukseen ilman erillistä sopimusta</li>
          </ul>
          <p>
            Pidätämme oikeuden estää pääsyn palveluun, mikäli käyttöehtoja rikotaan.
          </p>

          {/* 3. Vastuunrajoitukset */}
          <h2>3. Vastuunrajoitukset</h2>
          <p>
            <strong>
              Tämä on tärkeä osio — lue se huolellisesti.
            </strong>
          </p>
          <p>
            Valitse Sähkö pyrkii tarjoamaan mahdollisimman tarkkaa ja ajantasaista tietoa
            sähkösopimuksista ja -hinnoista. On kuitenkin tärkeää ymmärtää seuraavat
            rajoitukset:
          </p>
          <ul>
            <li>
              <strong>Hintatiedot ovat suuntaa antavia.</strong> Emme voi taata, että kaikki
              palvelussa esitetyt hinnat ovat reaaliajassa täysin oikeita. Sähkön hinnat
              muuttuvat jatkuvasti, ja tietoja päivitetään säännöllisesti mutta viiveellä.
            </li>
            <li>
              <strong>Emme ole sähköyhtiö.</strong> Valitse Sähkö on vertailupalvelu,
              ei sähkönmyyjä. Sähkösopimus tehdään aina suoraan sähköyhtiön kanssa.
            </li>
            <li>
              <strong>Ei henkilökohtaista neuvontaa.</strong> Palvelun sisältö on yleisluontoista
              tietoa eikä korvaa henkilökohtaista talous- tai energianeuvontaa.
            </li>
            <li>
              <strong>Laskurit ovat arvioita.</strong> Palvelun laskurit ja työkalut tuottavat
              arvioita, jotka perustuvat käyttäjän antamiin tietoihin ja yleisiin oletuksiin.
              Todelliset kustannukset voivat poiketa arvioista.
            </li>
          </ul>
          <p>
            Valitse Sähkö ei ole vastuussa mistään suorista tai epäsuorista vahingoista,
            jotka aiheutuvat palvelun käytöstä tai palvelussa esitettyjen tietojen perusteella
            tehdyistä päätöksistä. Käyttäjän tulee aina varmistaa hintatiedot suoraan
            sähköyhtiöltä ennen sopimuksen tekemistä.
          </p>

          {/* 4. Kolmannen osapuolen palvelut */}
          <h2>4. Kolmannen osapuolen palvelut</h2>
          <p>
            Palvelumme voi sisältää linkkejä kolmansien osapuolien verkkosivuille ja
            palveluihin. Emme ole vastuussa näiden ulkoisten sivustojen sisällöstä,
            tietosuojakäytännöistä tai palveluista.
          </p>
          <p>
            Käytämme seuraavia kolmannen osapuolen palveluita:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> — palvelun hosting ja infrastruktuuri
            </li>
            <li>
              <strong>Sähköyhtiöiden omat sivustot</strong> — sopimusten tekeminen tapahtuu
              aina sähköyhtiön omassa palvelussa
            </li>
          </ul>

          {/* 5. Immateriaalioikeudet */}
          <h2>5. Immateriaalioikeudet</h2>
          <p>
            Valitse Sähkön palvelussa oleva sisältö, mukaan lukien tekstit, kuvat,
            grafiikat, logot, ohjelmistokoodi ja muu materiaali, on suojattu
            tekijänoikeudella ja muilla immateriaalioikeuksilla.
          </p>
          <ul>
            <li>
              Palvelun sisältöä saa selata ja tulostaa henkilökohtaiseen, ei-kaupalliseen
              käyttöön.
            </li>
            <li>
              Sisällön kopioiminen, muokkaaminen, jakaminen tai kaupallinen hyödyntäminen
              ilman kirjallista lupaa on kielletty.
            </li>
            <li>
              &ldquo;Valitse Sähkö&rdquo;-nimi ja -logo ovat palvelun tavaramerkkejä.
            </li>
          </ul>

          {/* 6. Palvelun saatavuus */}
          <h2>6. Palvelun saatavuus</h2>
          <p>
            Pyrimme pitämään palvelun käytettävissä jatkuvasti, mutta emme takaa
            keskeytyksetöntä toimintaa. Palvelu voi olla tilapäisesti poissa käytöstä
            huoltotöiden, teknisten ongelmien tai muiden syiden vuoksi.
          </p>
          <p>
            Pidätämme oikeuden muuttaa, keskeyttää tai lopettaa palvelun tai sen
            osan tarjoamisen milloin tahansa ilman erillistä ilmoitusta.
          </p>

          {/* 7. Muutokset käyttöehtoihin */}
          <h2>7. Muutokset käyttöehtoihin</h2>
          <p>
            Pidätämme oikeuden päivittää näitä käyttöehtoja tarvittaessa. Muutokset
            astuvat voimaan, kun päivitetyt ehdot julkaistaan palvelussa. Merkittävistä
            muutoksista ilmoitetaan palvelun etusivulla.
          </p>
          <p>
            Jatkamalla palvelun käyttöä käyttöehtojen muutosten jälkeen käyttäjä
            hyväksyy päivitetyt ehdot.
          </p>

          {/* 8. Sovellettava laki ja riitojen ratkaisu */}
          <h2>8. Sovellettava laki ja riitojen ratkaisu</h2>
          <p>
            Näihin käyttöehtoihin sovelletaan Suomen lakia. Mahdolliset erimielisyydet
            pyritään ensisijaisesti ratkaisemaan neuvottelemalla.
          </p>
          <p>
            Kuluttajalla on oikeus saattaa erimielisyys kuluttajariitalautakunnan
            (
            <a
              href="https://www.kuluttajariita.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              kuluttajariita.fi
            </a>
            ) käsiteltäväksi. Ennen asian viemistä kuluttajariitalautakunnan
            käsiteltäväksi kuluttajan tulee olla yhteydessä{' '}
            <a
              href="https://www.kkv.fi/kuluttajaneuvonta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              kuluttajaneuvontaan
            </a>
            .
          </p>
          <p>
            Mikäli riita-asia viedään tuomioistuimeen, asian käsittelee Helsingin
            käräjäoikeus, ellei laista muuta johdu.
          </p>

          {/* 9. Yhteydenotto */}
          <h2>9. Yhteydenotto</h2>
          <p>
            Jos sinulla on kysyttävää näistä käyttöehdoista, ota meihin yhteyttä:
          </p>
          <p>
            <strong>Sonodo — Henri Linnainmaa</strong>
            <br />
            Helsinki, Suomi
            <br />
            Verkkosivu: valitsesahko.fi
            <br />
            <a href="/yhteystiedot" className="text-accent hover:underline">Ota yhteyttä</a>
          </p>
        </div>
      </div>
    </div>
  );
}
