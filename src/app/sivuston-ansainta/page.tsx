import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/components/disclosure';

const SITE_NAME = SITE_CONFIG.siteName;

export const metadata: Metadata = {
  title: 'Sivuston ansainta — näin ansaitsemme rahaa',
  description: `Miten ${SITE_NAME} valitsee sähköyhtiöt, järjestää tarjoukset ja ansaitsee rahaa. Avoin selvitys palkkioista, järjestysalgoritmista ja siitä mitä emme tee.`,
  alternates: { canonical: 'https://valitsesahko.fi/sivuston-ansainta' },
  robots: { index: true, follow: true },
};

export default function SivustonAnsaintaPage() {
  return (
    <div className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Toimituksen periaatteet
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Sivuston ansainta
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Tämä sivu kertoo avoimesti, miten {SITE_NAME} hankkii tietonsa,
            järjestää sähkösopimukset ja ansaitsee rahaa. Tavoitteemme on
            rehellinen, kuluttajan etua palveleva vertailu — ja haluamme näyttää
            tarkalleen, mitä se meiltä vaatii.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mistä sähköyhtiöt tulevat</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Keräämme sähköyhtiöiden tarjoukset suoraan heidän julkisilta
            sivuiltaan. Lisäksi käytämme rajatun joukon kumppaneita, joiden
            kanssa meillä on suora affiliate-sopimus Adtraction-verkoston
            kautta — heidän hintatietonsa päivittyvät kumppanin omasta
            järjestelmästä.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Sisällytämme listalle <strong>kaikki Suomessa toimivat
            merkittävät sähköyhtiöt</strong> riippumatta siitä, onko meillä
            heidän kanssaan kaupallinen sopimus. Vertailussa on yli 90
            sopimusta 37:ltä yhtiöltä.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Järjestysalgoritmi</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Tarjoukset järjestetään{' '}
            <strong>oletuksena syötetyn kulutuksen perusteella halvimmasta
            kalleimpaan</strong> ({SITE_CONFIG.rankingCriteria}). Algoritmi{' '}
            <strong>ei</strong> ota huomioon sitä, saammeko tarjoajalta palkkion
            vai emme. Saman hintatason sisällä huomioidaan sopimuksen pituus
            (lyhyempi sitoutuminen ensin) ja yhtiön vastapuoliriski. Käyttäjä
            voi vaihtaa järjestysperusteen vapaasti.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Kumppani- ja ei-kumppanitarjoukset näkyvät vertailussa{' '}
            <strong>identtisellä tavalla</strong> — sama ulkoasu, sama
            järjestyslogiikka. Kumppanilinkkeihin lisätään tekninen{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
              rel=&quot;sponsored&quot;
            </code>
            -merkintä hakukoneita varten, mutta käyttäjälle näkyvä korttien
            ulkoasu ei poikkea.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mitä emme tee</h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme nosta tarjouksia esiin palkkion suuruuden
                perusteella.</strong> Pay-for-placement on meille kielletty.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme piilota kilpailijoita.</strong> Vertailussa on aina
                sekä kumppaneidemme että ei-kumppaneiden tarjoukset.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme kerää henkilötietojasi salaa.</strong> Klikkauksen
                yhteydessä lähetämme yhtiölle vain ns. affiliate-tunnisteen.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme muokkaa hintatietoja.</strong> Hinnat näytetään
                sellaisina kuin yhtiö ne julkaisee — myös silloin, kun kumppanin
                hinta olisi sille epäedullinen.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Päivitysväli</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pörssisähkön spot-hinta päivittyy tunneittain. Kiinteähintaiset ja
            toistaiseksi voimassa olevat sopimukset tarkistetaan vähintään kerran
            kuussa, kumppanitarjoukset päivittyvät automaattisesti useamman
            kerran viikossa.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mukana olevat ja pois jätetyt yhtiöt</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Vertailussa on mukana valtakunnalliset suuret yhtiöt (Fortum, Helen,
            Vattenfall, Lumme Energia, Oomi, Väre jne.) sekä pienemmät paikalliset
            toimijat. Pois jätetään yhtiöt, joiden tarjonta on rajattu vain
            yhden kunnan alueelle ilman julkista hintaa, sekä ne, joista
            kuluttajaviranomainen on antanut huomautuksen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Miten ansaitsemme rahaa</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Saamme komission osasta kumppaneidemme kanssa solmituista
            sähkösopimuksista. Tämä komissio ei vaikuta sinun maksamaasi
            hintaan eikä siihen, järjestetäänkö tarjous korkeammalle vai
            matalammalle. Ilman tätä tulonlähdettä emme voisi ylläpitää
            maksutonta vertailupalvelua.
          </p>
        </section>

        <section className="rounded-xl bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">Onko jotain epäselvää?</h2>
          <p className="mt-2 text-slate-700">
            Voit ottaa yhteyttä{' '}
            <Link href="/yhteystiedot" className="text-accent underline hover:text-accent-600">
              yhteystiedot-sivun
            </Link>{' '}
            kautta tai lukea lisää{' '}
            <Link href="/menetelma" className="text-accent underline hover:text-accent-600">
              vertailumenetelmästä
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
