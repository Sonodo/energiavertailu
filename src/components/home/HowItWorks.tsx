import { Home, BarChart3, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Home,
    title: 'Kerro asumismuotosi',
    description:
      'Valitse asumismuoto ja kerro sähkönkulutuksesi. Annamme myös valmiin arvion, jos et tiedä tarkkaa kulutustasi.',
  },
  {
    number: '2',
    icon: BarChart3,
    title: 'Vertaa sopimuksia',
    description:
      'Näet kaikki saatavilla olevat sähkösopimukset hinnoiteltuna omalle kulutuksellesi. Vertaile helposti.',
  },
  {
    number: '3',
    icon: Sparkles,
    title: 'Vaihda ja säästä',
    description:
      'Valitse sopivin sopimus ja siirry suoraan sähköyhtiön sivuille tekemään sopimus. Vaihto on helppoa ja nopeaa.',
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Näin helppoa sähkön vaihto on
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sähkösopimuksen vertailu ja vaihto onnistuu kolmessa helpossa vaiheessa.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative text-center">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-0.5 w-[calc(100%-6rem)] bg-gradient-to-r from-[#0066FF]/30 to-[#0066FF]/10 md:block" />
                )}

                {/* Step icon */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-[#0066FF]/10" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#0066FF] shadow-lg shadow-blue-200">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-sm">
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
