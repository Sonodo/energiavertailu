import { providers as allProviders } from '@/data/providers';

const TOTAL_PROVIDERS = allProviders.length;

const providers = [
  { name: 'Fortum', color: 'bg-blue-50 text-blue-700 ring-blue-200' },
  { name: 'Helen', color: 'bg-violet-50 text-violet-700 ring-violet-200' },
  { name: 'Vattenfall', color: 'bg-amber-50 text-amber-700 ring-amber-200' },
  { name: 'Oomi', color: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  { name: 'Väre', color: 'bg-rose-50 text-rose-700 ring-rose-200' },
  { name: 'Lumme Energia', color: 'bg-cyan-50 text-cyan-700 ring-cyan-200' },
  { name: 'Ilmatar Energia', color: 'bg-green-50 text-green-700 ring-green-200' },
  { name: 'Pori Energia', color: 'bg-orange-50 text-orange-700 ring-orange-200' },
  { name: 'Turku Energia', color: 'bg-sky-50 text-sky-700 ring-sky-200' },
  { name: 'Tampereen Sähkö', color: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  { name: 'Kuopion Energia', color: 'bg-teal-50 text-teal-700 ring-teal-200' },
  { name: 'Oulun Energia', color: 'bg-purple-50 text-purple-700 ring-purple-200' },
];

export default function ProviderLogos() {
  return (
    <section className="bg-accent-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">
            Vertailussa mukana
          </h2>
          <p className="section-subtitle">
            {TOTAL_PROVIDERS} sähköyhtiötä — kaikki merkittävät toimijat Suomen markkinoilta.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {providers.map((provider) => (
            <span
              key={provider.name}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset transition-transform hover:scale-105 ${provider.color}`}
            >
              {provider.name}
            </span>
          ))}
          <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
            + {TOTAL_PROVIDERS - providers.length} muuta
          </span>
        </div>
      </div>
    </section>
  );
}
