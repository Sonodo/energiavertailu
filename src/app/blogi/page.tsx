import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/constants';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Sähköblogi — Uutiset ja analyysit sähkömarkkinoilta',
  description:
    'Ajankohtaisia artikkeleita sähkömarkkinoilta, energiapolitiikasta ja sähkön säästövinkeistä. Pysy ajan tasalla sähkön hinnasta ja markkinoista.',
  alternates: {
    canonical: `${SITE_URL}/blogi`,
  },
  openGraph: {
    title: 'Sähköblogi — Uutiset ja analyysit sähkömarkkinoilta',
    description:
      'Ajankohtaisia artikkeleita sähkömarkkinoilta, energiapolitiikasta ja sähkön säästövinkeistä.',
    url: `${SITE_URL}/blogi`,
    type: 'website',
  },
};

export default function BlogiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-[#0066FF]">
              Etusivu
            </Link>
          </li>
          <li>
            <span className="mx-1">/</span>
          </li>
          <li className="text-slate-900 font-medium">Blogi</li>
        </ol>
      </nav>

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Sähköblogi
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Ajankohtaisia artikkeleita, analyyseja ja vinkkejä Suomen
          sähkömarkkinoilta. Opi säästämään sähkökuluissa ja tekemään parempia
          päätöksiä.
        </p>
      </div>

      {/* Client component handles filtering */}
      <BlogIndexClient posts={blogPosts} categories={BLOG_CATEGORIES} />
    </div>
  );
}
