import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1D32] to-[#1A2940] py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-[#0066FF]" />
            Ilmainen ja puolueeton vertailu
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Aloita vertailu nyt —{' '}
            <span className="text-[#0066FF]">säästä sähkölaskussa</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-300">
            37 sähköyhtiön sopimukset vertailtavissa. Löydä sinulle sopivin sopimus
            muutamassa minuutissa.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#3385FF] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              Vertaa sähkösopimuksia
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/porssisahko"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 active:scale-[0.98]"
            >
              Katso pörssisähkön hinta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
