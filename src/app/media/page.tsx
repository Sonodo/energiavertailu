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
  title: 'Medialle — Lehdistömateriaali ja yhteydenotot',
  description:
    'Valitse Sähkön mediasivut: bränditiedot, avainluvut, käyttöohjeet medialle ja lehdistöyhteydenotot.',
  openGraph: {
    title: `Medialle | ${SITE_NAME}`,
    description:
      'Valitse Sähkön mediasivut: bränditiedot, avainluvut ja yhteydenotot.',
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
  { icon: Building2, value: '37', label: 'Sähköyhtiötä' },
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
              Lehdistö ja media
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Medialle
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Tältä sivulta löydät Valitse Sähkön bränditiedot,
            avainluvut sekä ohjeet medialle. Jos tarvitset lisätietoja tai haluat
            haastatella asiantuntijoitamme, ota yhteyttä.
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
              Tietoa Valitse Sähköstä
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600">
              <p>
                Valitse Sähkö on Suomen monipuolinen ilmainen sähkösopimusten
                vertailupalvelu. Autamme suomalaisia kuluttajia löytämään
                edullisen ja luotettavan sähkösopimuksen vertailemalla
                92 sopimusta 37 sähköyhtiöltä kaikissa 19 alueessa.
              </p>
              <p>
                Vertailutulokset perustuvat avoimiin laskelmiin ja objektiivisiin
                kriteereihin. Tehtävämme on lisätä läpinäkyvyyttä sähkömarkkinoilla
                ja auttaa kuluttajia tekemään tietoon perustuvia päätöksiä.
              </p>
              <p>
                Tarjoamme myös reaaliaikaista pörssisähkön seurantaa,
                aluekohtaisia hintavertailuja, sähkönkulutuslaskureita sekä oppaita
                sähkömarkkinoista.
              </p>
            </div>
          </section>

          {/* ===== Brand ===== */}
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                <Palette className="h-5 w-5 text-[#0066FF]" />
              </div>
              Brändi
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Nimi ja slogan
                </h3>
                <p className="text-2xl font-bold text-slate-900">Valitse Sähkö</p>
                <p className="mt-1 text-lg text-slate-500">
                  Suomen monipuolinen sähkövertailu
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Brändivärit
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
              Käyttöohjeet medialle
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-li:text-slate-600">
              <ul>
                <li>
                  Käytä nimeä <strong>&ldquo;Valitse Sähkö&rdquo;</strong> kahtena
                  sanana, isolla alkukirjaimella.
                </li>
                <li>
                  Viittaa palveluun seuraavasti: &ldquo;Valitse Sähkö, Suomen monipuolinen
                  sähkövertailu&rdquo; tai &ldquo;sähkösopimusten
                  vertailupalvelu Valitse Sähkö&rdquo;.
                </li>
                <li>
                  Sivustolinkki: <strong>valitsesahko.fi</strong>
                </li>
                <li>
                  Kun viitataan vertailudataan, mainitse lähteeksi &ldquo;Valitse Sähkö
                  (valitsesahko.fi)&rdquo;.
                </li>
                <li>
                  Logoa ja nimeä ei saa käyttää tavalla, joka antaa
                  ymmärtää palvelun suosittelevan tiettyä sähköyhtiötä tai
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
                Lehdistökyselyt ja haastattelupyynnöt:
              </p>
              <a
                href="/yhteystiedot"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-[#0066FF] hover:underline"
              >
                <Mail className="h-5 w-5" />
                Ota yhteyttä
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
