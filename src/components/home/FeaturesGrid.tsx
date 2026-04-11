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
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  {
    icon: Building2,
    title: 'Vertaa 37 sähköyhtiötä',
    description:
      'Kaikki Suomen sähköyhtiöt ja niiden sopimukset yhdessä paikassa. Löydä edullisin vaihtoehto sinun kulutuksellesi.',
    lightColor: 'bg-sky-50',
    textColor: 'text-sky-600',
  },
  {
    icon: Calculator,
    title: 'Älykkäät laskurit',
    description:
      'Sähkönkulutuslaskuri, säästölaskuri, aurinkopaneelilaskuri ja muut työkalut auttavat sinua tekemään parempia päätöksiä.',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    icon: Shield,
    title: 'Kattava vertailu',
    description:
      'Emme suosi mitään sähköyhtiötä. Kaikki sopimukset näytetään samalla tavalla, jotta voit tehdä parhaan valinnan.',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    icon: BarChart3,
    title: 'Sähkönkulutusarvio',
    description:
      'Arvioi sähkönkulutuksesi asumismuodon, pinta-alan ja asukkaiden perusteella. Tarkka arvio ilman mittarilukemia.',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    icon: Lightbulb,
    title: 'Säästövinkit',
    description:
      'Käytännön vinkit sähkönkulutuksen vähentämiseen. Pienetkin muutokset voivat tuoda isoja säästöjä vuositasolla.',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">
            Kaikki mitä tarvitset sähkön vertailuun
          </h2>
          <p className="section-subtitle">
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
                className="card-hover"
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
