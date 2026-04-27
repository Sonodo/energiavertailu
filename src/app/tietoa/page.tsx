import type { Metadata } from 'next';
import { Info, Zap, BarChart3, Shield, Users } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tietoa palvelusta',
  description:
    'Valitse Sähkö on Suomen monipuolinen ja kattava sähkövertailupalvelu. Lue lisää palvelustamme, menetelmistämme ja tavoitteistamme.',
  openGraph: {
    title: `Tietoa palvelusta | ${SITE_NAME}`,
    description:
      'Valitse Sähkö on Suomen monipuolinen ja kattava sähkövertailupalvelu. Lue lisää palvelustamme.',
    url: `${SITE_URL}/tietoa`,
  },
  alternates: {
    canonical: `${SITE_URL}/tietoa`,
  },
};

const values = [
  {
    icon: BarChart3,
    title: 'Puolueeton vertailu',
    description:
      'Järjestys perustuu hintaan ja ominaisuuksiin. Sama menetelmä koskee jokaista sopimusta — ei suosikkeja, ei piilotettuja tuloksia.',
  },
  {
    icon: Shield,
    title: 'Riippumattomuus',
    description:
      'Toimimme käyttäjän ehdoilla. Objektiiviset kriteerit ratkaisevat sopimusten järjestyksen, ei mikään muu.',
  },
  {
    icon: Zap,
    title: 'Ajantasaisuus',
    description:
      'Päivitämme hintatiedot säännöllisesti ja seuraamme markkinoiden kehitystä reaaliajassa.',
  },
  {
    icon: Users,
    title: 'Käyttäjä ensin',
    description:
      'Palvelumme on aina ilmainen käyttää. Tavoitteenamme on auttaa suomalaisia löytämään sopivin sähkösopimus.',
  },
];

export default function TietoaPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Info className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent">Tietoa meistä</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tietoa Valitse Sähköstä
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Valitse Sähkö on suomalainen verkkopalvelu, joka auttaa kuluttajia
            vertailemaan sähkösopimuksia ja tekemään tietoon perustuvia päätöksiä
            sähkömarkkinoilla.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          {/* Mission */}
          <h2>Tehtävämme</h2>
          <p>
            Sähkömarkkinoiden vapauttaminen on antanut kuluttajille mahdollisuuden valita
            sähkösopimuksensa vapaasti — mutta valinnanvapaus edellyttää vertailukelpoista
            tietoa. Valitse Sähkö syntyi tarpeesta tarjota suomalaisille selkeä,
            selkeä ja helposti ymmärrettävä tapa vertailla sähkösopimuksia.
          </p>
          <p>
            Tavoitteenamme on, että jokainen suomalainen kotitalous löytää itselleen
            sopivimman sähkösopimuksen — oli kyseessä sitten pörssisähkö, määräaikainen
            sopimus tai vihreä sähkö.
          </p>

          {/* What we offer */}
          <h2>Mitä tarjoamme</h2>
          <p>
            Valitse Sähkö tarjoaa kattavan valikoiman työkaluja ja tietoa
            sähkömarkkinoista:
          </p>
          <ul>
            <li>
              <strong>Sähkösopimusten vertailu</strong> — Vertaa 37 sähköyhtiön
              sopimuksia hinnan, sopimusehtojen ja energialähteiden perusteella.
            </li>
            <li>
              <strong>Pörssisähkön seuranta</strong> — Seuraa pörssisähkön hintaa
              reaaliajassa ja näe tulevien tuntien hintaennusteet.
            </li>
            <li>
              <strong>Laskurit ja työkalut</strong> — Laske sähkönkulutuksesi,
              arvioi aurinkopaneelien kannattavuus ja vertaa lämmitysmuotoja.
            </li>
            <li>
              <strong>Oppaat ja artikkelit</strong> — Kattavat oppaat sähköyhtiön
              vaihdosta, pörssisähköstä ja sähkön säästämisestä.
            </li>
            <li>
              <strong>Sähköyhtiöprofiilit</strong> — Yksityiskohtaiset esittelyt
              suomalaisista sähköyhtiöistä, mukaan lukien arviot ja sopimustiedot.
            </li>
          </ul>

          {/* How it works */}
          <h2>Miten vertailu toimii</h2>
          <p>
            Keräämme sähkösopimusten tiedot suoraan sähköyhtiöiltä ja julkisista
            lähteistä. Päivitämme tiedot säännöllisesti varmistaaksemme niiden
            ajantasaisuuden. Vertailumme perustuu avoimiin kriteereihin, kuten
            sähkön hintaan, sopimusehtoihin, energialähteiden jakaumaan ja
            asiakaspalveluun.
          </p>
          <p>
            Tarkempaa tietoa menetelmistämme löydät{' '}
            <a href="/menetelma" className="text-accent hover:underline">
              Menetelmä-sivulta
            </a>
            . Toimituksen periaatteet, vastaava päätoimittaja ja
            datalähteet on koottu{' '}
            <a href="/toimituksen-periaatteet" className="text-accent hover:underline">
              Toimituksen periaatteet -sivulle
            </a>
            . Sähköalan termit selitetään{' '}
            <a href="/sanasto" className="text-accent hover:underline">
              sanastossa
            </a>
            .
          </p>

        </div>

        {/* Values grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Arvomme</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <value.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
