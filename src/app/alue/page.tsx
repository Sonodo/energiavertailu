import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Zap, ChevronRight, ArrowRight, Building2 } from 'lucide-react';
import { regions } from '@/data/regions';
import { regionContent } from '@/data/region-content';
import { SITE_URL, AVG_TRANSFER_PRICE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sähkö alueittain — Vertaa sähkösopimuksia maakunnittain',
  description:
    'Vertaa sähkösopimuksia ja siirtohintoja kaikissa Suomen 19 maakunnassa. Löydä edullisin sähkö omalla alueellasi. Siirtohinta, paikalliset sähköyhtiöt ja säästövinkit.',
  openGraph: {
    title: 'Sähkö alueittain — Vertaa sähkösopimuksia maakunnittain | Valitse Sähkö',
    description:
      'Vertaa sähkösopimuksia ja siirtohintoja kaikissa Suomen 19 maakunnassa. Löydä edullisin sähkö omalla alueellasi.',
    url: `${SITE_URL}/alue`,
  },
  alternates: {
    canonical: `${SITE_URL}/alue`,
  },
};

function TransferPriceBadge({ price }: { price: number }) {
  const diff = price - AVG_TRANSFER_PRICE;
  const isBelow = diff < 0;
  const isAvg = diff === 0;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        isBelow
          ? 'bg-emerald-100 text-emerald-700'
          : isAvg
            ? 'bg-slate-100 text-slate-600'
            : 'bg-amber-100 text-amber-700'
      )}
    >
      <Zap className="h-3 w-3" />
      {price.toFixed(1)} c/kWh
    </span>
  );
}

export default function AlueIndexPage() {
  // Sort regions: cheapest transfer price first
  const sortedRegions = [...regions].sort((a, b) => a.transferPrice - b.transferPrice);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">Alueet</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sähkö alueittain
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Suomessa on 19 maakuntaa, joissa jokaisessa on eri sähkön siirtoyhtiö ja siirtohinta.
            Vertaile alueiden sähkötilannetta ja löydä parhaat sähkösopimukset omalla alueellasi.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0066FF]" />
              <span>19 maakuntaa</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0066FF]" />
              <span>Paikalliset sähköyhtiöt</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#0066FF]" />
              <span>Siirtohinnat {sortedRegions[0].transferPrice.toFixed(1)}–{sortedRegions[sortedRegions.length - 1].transferPrice.toFixed(1)} c/kWh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer price legend */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium text-slate-700">Siirtohinta:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Alle keskiarvon (&lt; {AVG_TRANSFER_PRICE.toFixed(1)} c/kWh)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Keskiarvo ({AVG_TRANSFER_PRICE.toFixed(1)} c/kWh)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Yli keskiarvon (&gt; {AVG_TRANSFER_PRICE.toFixed(1)} c/kWh)
            </span>
          </div>
        </div>
      </section>

      {/* Region grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedRegions.map((region) => {
            const content = regionContent[region.id];
            return (
              <Link
                key={region.id}
                href={`/alue/${region.id}`}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#0066FF]/30 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0066FF]" />
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                      {region.name}
                    </h2>
                  </div>
                  <TransferPriceBadge price={region.transferPrice} />
                </div>

                <p className="text-xs text-slate-500 mb-3">
                  {region.gridOperator}
                </p>

                {content && (
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {content.heroText}
                  </p>
                )}

                {content && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {content.majorCities.slice(0, 4).map((city) => (
                      <span
                        key={city}
                        className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
                      >
                        {city}
                      </span>
                    ))}
                    {content.majorCities.length > 4 && (
                      <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-400">
                        +{content.majorCities.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm font-medium text-[#0066FF] opacity-0 transition-opacity group-hover:opacity-100">
                  Katso alueen tiedot
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162540] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Vertaa sähkösopimuksia koko Suomessa
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Syötä kulutustietosi ja löydä sinulle edullisin sähkösopimus. Huomioimme
            alueesi siirtohinnan kokonaiskustannuslaskelmassa.
          </p>
          <Link
            href="/vertailu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#0052CC]"
          >
            Vertaa sopimuksia
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
