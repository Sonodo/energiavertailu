import Link from 'next/link';
import { Home, Search, Zap, BookOpen, ArrowRight } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export default function NotFound() {
  const popularPages = [
    {
      label: 'Pörssisähkön hinta nyt',
      href: '/porssisahko',
      icon: Zap,
      description: 'Seuraa pörssisähkön hintaa reaaliajassa',
    },
    {
      label: 'Vertaa sähkösopimuksia',
      href: '/vertailu',
      icon: Search,
      description: 'Löydä edullisin sähkösopimus',
    },
    {
      label: 'Sähköoppaat',
      href: '/oppaat',
      icon: BookOpen,
      description: 'Oppaat ja vinkit sähkön säästämiseen',
    },
  ];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 indicator */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <span className="text-3xl font-bold text-slate-400">404</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sivua ei löytynyt
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Valitettavasti etsimääsi sivua ei löytynyt. Sivu on voitu poistaa, siirtää tai
          osoite on kirjoitettu väärin.
        </p>

        {/* Back to home button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#0052CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
          >
            <Home className="h-5 w-5" />
            Takaisin etusivulle
          </Link>
        </div>

        {/* Popular pages */}
        <div className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Suosittuja sivuja
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col items-center rounded-xl border border-slate-200 p-5 transition-all hover:border-[#0066FF]/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066FF]/10 transition-colors group-hover:bg-[#0066FF]/20">
                  <page.icon className="h-5 w-5 text-[#0066FF]" />
                </div>
                <span className="mt-3 text-sm font-semibold text-slate-900 group-hover:text-[#0066FF]">
                  {page.label}
                </span>
                <span className="mt-1 text-xs text-slate-500">{page.description}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#0066FF]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Help text */}
        <p className="mt-10 text-sm text-slate-500">
          Etkö löydä etsimääsi?{' '}
          <Link
            href="/vertailu"
            className="font-medium text-[#0066FF] hover:underline"
          >
            Kokeile sähkövertailua
          </Link>{' '}
          tai{' '}
          <Link
            href="/blogi"
            className="font-medium text-[#0066FF] hover:underline"
          >
            selaa blogiamme
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
