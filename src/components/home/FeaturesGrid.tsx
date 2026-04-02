import {
  TrendingDown,
  Building2,
  Calculator,
  Shield,
  BarChart3,
  Lightbulb,
} from 'lucide-react';

const features = [
  {
    icon: TrendingDown,
    title: 'Reaaliaikainen pörssisähkö',
    description:
      'Seuraa pörssisähkön hintaa tunneittain. Näe tämän päivän ja huomisen hinnat, hintahistoria ja ennusteet.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: Building2,
    title: 'Vertaa 37 sähköyhtiötä',
    description:
      'Kaikki Suomen sähköyhtiöt ja niiden sopimukset yhdessä paikassa. Löydä edullisin vaihtoehto sinun kulutuksellesi.',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    icon: Calculator,
    title: 'Älykkäät laskurit',
    description:
      'Sähkönkulutuslaskuri, säästölaskuri, aurinkopaneelilaskuri ja muut työkalut auttavat sinua tekemään parempia päätöksiä.',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    icon: Shield,
    title: 'Puolueeton vertailu',
    description:
      'Emme suosi mitään sähköyhtiötä. Kaikki sopimukset näytetään samalla tavalla, jotta voit tehdä parhaan valinnan.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    icon: BarChart3,
    title: 'Sähkönkulutusarvio',
    description:
      'Arvioi sähkönkulutuksesi asumismuodon, pinta-alan ja asukkaiden perusteella. Tarkka arvio ilman mittarilukemia.',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    icon: Lightbulb,
    title: 'Säästövinkit',
    description:
      'Käytännön vinkit sähkönkulutuksen vähentämiseen. Pienetkin muutokset voivat tuoda isoja säästöjä vuositasolla.',
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Kaikki mitä tarvitset sähkön vertailuun
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Monipuoliset työkalut ja ajantasaiset tiedot auttavat sinua löytämään parhaan
            sähkösopimuksen.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
              >
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.lightColor}`}
                >
                  <Icon className={`h-6 w-6 ${feature.textColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
