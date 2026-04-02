import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Newspaper,
  ChevronRight,
  Mail,
  Palette,
  BarChart3,
  Info,
  BookOpen,
  Building2,
  Users,
  MapPin,
  Zap,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Medialle \u2014 Lehdist\u00f6materiaali ja yhteydenotot',
  description:
    'Energiavertailun mediasivut: br\u00e4nditiedot, avainluvut, k\u00e4ytt\u00f6ohjeet medialle ja lehdist\u00f6yhteydenotot.',
  openGraph: {
    title: `Medialle | ${SITE_NAME}`,
    description:
      'Energiavertailun mediasivut: br\u00e4nditiedot, avainluvut ja yhteydenotot.',
    url: `${SITE_URL}/media`,
  },
  alternates: {
    canonical: `${SITE_URL}/media`,
  },
};

const brandColors = [
  { name: 'Pääväri', hex: '#0066FF', tw: 'bg-[#0066FF]' },
  { name: 'Tumma', hex: '#0A1628', tw: 'bg-[#0A1628]' },
  { name: 'Korostus', hex: '#00D4AA', tw: 'bg-[#00D4AA]' },
  { name: 'Varoitus', hex: '#FFB800', tw: 'bg-[#FFB800]' },
  { name: 'Tausta', hex: '#F8FAFC', tw: 'bg-[#F8FAFC] border border-slate-200' },
];

const keyStats = [
  { icon: Building2, value: '37', label: 'S\u00e4hk\u00f6yhti\u00f6t\u00e4' },
  { icon: Zap, value: '92', label: 'Sopimusta' },
  { icon: MapPin, value: '19', label: 'Aluetta' },
  { icon: Users, value: 'Ilmainen', label: 'Palvelu kuluttajille' },
];

export default function MediaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">Medialle</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <Newspaper className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[#0066FF]">
              Lehdist\u00f6 ja media
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Medialle
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            T\u00e4lt\u00e4 sivulta l\u00f6yd\u00e4t Energiavertailun br\u00e4nditiedot,
            avainluvut sek\u00e4 ohjeet medialle. Jos tarvitset lis\u00e4tietoja tai haluat
            haastatella asiantuntijoitamme, ota yhteytt\u00e4.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* ===== Key Stats ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <BarChart3 className="h-5 w-5 text-[#0066FF]" />
              </div>
              Avainluvut
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {keyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-[#0066FF]" />
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== About ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Info className="h-5 w-5 text-[#0066FF]" />
              </div>
              Tietoa Energiavertailusta
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600">
              <p>
                Energiavertailu on Suomen kattavin ilmainen s\u00e4hk\u00f6sopimusten
                vertailupalvelu. Autamme suomalaisia kuluttajia l\u00f6yt\u00e4m\u00e4\u00e4n
                edullisimman ja luotettavimman s\u00e4hk\u00f6sopimuksen vertailemalla
                92 sopimusta 37 s\u00e4hk\u00f6yhti\u00f6lt\u00e4 kaikissa 19 alueessa.
              </p>
              <p>
                Palvelumme on t\u00e4ysin puolueeton: vertailutulokset perustuvat objektiivisiin
                laskelmiin, eiv\u00e4t kaupallisiin sopimuksiin. Teht\u00e4v\u00e4mme on
                lis\u00e4t\u00e4 l\u00e4pin\u00e4kyvyytt\u00e4 s\u00e4hk\u00f6markkinoilla
                ja auttaa kuluttajia tekemään tietoon perustuvia p\u00e4\u00e4t\u00f6ksi\u00e4.
              </p>
              <p>
                Tarjoamme my\u00f6s reaaliaikaista p\u00f6rssisähk\u00f6n seurantaa,
                aluekohtaisia hintavertailuja, s\u00e4hk\u00f6nkulutuslaskureita sek\u00e4 oppaita
                s\u00e4hk\u00f6markkinoista.
              </p>
            </div>
          </section>

          {/* ===== Brand ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Palette className="h-5 w-5 text-[#0066FF]" />
              </div>
              Br\u00e4ndi
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Nimi ja slogan
                </h3>
                <p className="text-2xl font-bold text-slate-900">Energiavertailu</p>
                <p className="mt-1 text-lg text-slate-500">
                  Suomen kattavin s\u00e4hk\u00f6vertailu
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Br\u00e4ndiv\u00e4rit
                </h3>
                <div className="grid gap-3 sm:grid-cols-5">
                  {brandColors.map((color) => (
                    <div key={color.hex} className="text-center">
                      <div
                        className={`mx-auto h-16 w-16 rounded-xl ${color.tw} shadow-sm`}
                      />
                      <p className="mt-2 text-xs font-semibold text-slate-700">
                        {color.name}
                      </p>
                      <p className="text-xs text-slate-400">{color.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== Usage Guidelines ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <BookOpen className="h-5 w-5 text-[#0066FF]" />
              </div>
              K\u00e4ytt\u00f6ohjeet medialle
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
              <ul>
                <li>
                  K\u00e4yt\u00e4 nime\u00e4 <strong>&ldquo;Energiavertailu&rdquo;</strong> yhten\u00e4
                  sanana, isolla alkukirjaimella.
                </li>
                <li>
                  Viittaa palveluun seuraavasti: &ldquo;Energiavertailu, Suomen kattavin
                  s\u00e4hk\u00f6vertailu&rdquo; tai &ldquo;s\u00e4hk\u00f6sopimusten
                  vertailupalvelu Energiavertailu&rdquo;.
                </li>
                <li>
                  Sivustolinkki: <strong>energiavertailu.fi</strong>
                </li>
                <li>
                  Kun viitataan vertailudataan, mainitse l\u00e4hteeksi &ldquo;Energiavertailu
                  (energiavertailu.fi)&rdquo;.
                </li>
                <li>
                  Logoa ja nime\u00e4 ei saa k\u00e4ytt\u00e4\u00e4 tavalla, joka antaa
                  ymmärtää palvelun suosittelevan tiettyä s\u00e4hk\u00f6yhti\u00f6t\u00e4 tai
                  sopimusta.
                </li>
              </ul>
            </div>
          </section>

          {/* ===== Contact ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Mail className="h-5 w-5 text-[#0066FF]" />
              </div>
              Yhteydenotot
            </h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-600">
                Lehdist\u00f6kyselyt ja haastattelupyynn\u00f6t:
              </p>
              <a
                href="mailto:media@energiavertailu.fi"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-[#0066FF] hover:underline"
              >
                <Mail className="h-5 w-5" />
                media@energiavertailu.fi
              </a>
              <p className="mt-4 text-xs text-slate-500">
                Pyrimme vastaamaan kaikkiin mediayhteydenottoihin saman työpäivän aikana.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
