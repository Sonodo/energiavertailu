import type { Metadata } from 'next';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sivuston ansainta — Näin ValitseSähkö toimii',
  description:
    'ValitseSähkö on ilmainen sähkövertailu. Näin ansaitsemme toiminnasta ja miksi vertailu on puolueeton.',
  openGraph: {
    title: `Sivuston ansainta — Näin ValitseSähkö toimii | ${SITE_NAME}`,
    description:
      'ValitseSähkö on ilmainen sähkövertailu. Näin ansaitsemme toiminnasta ja miksi vertailu on puolueeton.',
    url: `${SITE_URL}/sivuston-ansainta`,
  },
  alternates: {
    canonical: `${SITE_URL}/sivuston-ansainta`,
  },
};

export default function SivustonAnsaintaPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Info className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent">Avoimuus</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sivuston ansainta
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            ValitseSähkö on ilmainen vertailupalvelu kuluttajille. Emme veloita käyttäjiltä mitään
            — vertailun käyttö ja kaikki sisältö on maksutonta.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>Miten ansaitsemme rahaa</h2>
          <p>
            Saamme komissiota osalta palveluntarjoajista, kun siirryt heidän sivulleen
            ValitseSähkön kautta ja teet sähkösopimuksen. Käytämme tähän
            Adtraction-affiliate-verkostoa, joka on yksi Pohjoismaiden suurimmista ja
            luotettavimmista mainosyhteistyöverkostoista.
          </p>

          <h2>Miten pidämme vertailun puolueettomana</h2>
          <ul>
            <li>
              <strong>Järjestys ei riipu komissiosta.</strong> Sähköyhtiöt näkyvät
              vertailussa samalla logiikalla riippumatta siitä, saammeko heiltä komissiota
              vai emme.
            </li>
            <li>
              <strong>Vertaamme myös yhtiöitä, joista emme saa mitään.</strong> Käyttäjällä
              on oikeus nähdä koko markkina, ei vain kumppaneita.
            </li>
            <li>
              <strong>Tiedot perustuvat julkisiin lähteisiin.</strong> Hinnat, sopimusehdot
              ja tuotetiedot tulevat sähköyhtiöiden omilta sivuilta ja spot-hintojen osalta
              pörssidatasta.
            </li>
            <li>
              <strong>Kumppanit ja ei-kumppanit näkyvät identtisesti.</strong> Emme nosta
              kumppaneita korkeammalle, emme piilota ei-kumppaneita, emmekä merkitse heitä
              eri tavalla.
            </li>
          </ul>

          <h2>Miksi teemme näin</h2>
          <p>
            Ilmainen vertailupalvelu tarvitsee ansaintatavan. Valitsimme komissiomallin
            puhtaasti sen takia, että se on ainoa tapa pitää palvelu maksuttomana ja silti
            velvoittaa meidät tekemään hyvää vertailua: käyttäjien pitää löytää itselleen
            paras sähkösopimus, tai he eivät tule takaisin.
          </p>

          <h2>Kysyttävää?</h2>
          <p>
            Mikäli sinulla on kysymyksiä komissiomallista tai vertailun toimintatavasta,
            voit olla yhteydessä{' '}
            <Link href="/yhteystiedot" className="text-accent hover:underline">
              asiakaspalveluumme
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
