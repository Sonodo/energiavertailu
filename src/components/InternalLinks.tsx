// Internal linking component — "Aiheeseen liittyvää" related content section
// Generates contextual links to relevant blog posts, guides, providers, and tools

import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Building2, Calculator } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { guides } from '@/data/guides';
import { providers } from '@/data/providers';
import { monthlyReports, getMonthNameInessiveFi } from '@/data/monthly-reports';

interface InternalLinksProps {
  currentPath: string;
  tags?: string[];
  category?: string;
  providerSlugs?: string[];
  maxLinks?: number;
}

interface RelatedLink {
  href: string;
  title: string;
  description: string;
  type: 'blog' | 'guide' | 'provider' | 'tool' | 'report';
  score: number;
}

const TYPE_ICONS = {
  blog: FileText,
  guide: BookOpen,
  provider: Building2,
  tool: Calculator,
  report: FileText,
};

const TYPE_LABELS = {
  blog: 'Artikkeli',
  guide: 'Opas',
  provider: 'Sähköyhtiö',
  tool: 'Työkalu',
  report: 'Raportti',
};

const TYPE_COLORS = {
  blog: 'bg-blue-50 text-blue-600',
  guide: 'bg-emerald-50 text-emerald-600',
  provider: 'bg-purple-50 text-purple-600',
  tool: 'bg-amber-50 text-amber-600',
  report: 'bg-cyan-50 text-cyan-600',
};

export default function InternalLinks({
  currentPath,
  tags = [],
  category,
  providerSlugs = [],
  maxLinks = 6,
}: InternalLinksProps) {
  const links: RelatedLink[] = [];
  const normalizedTags = tags.map((t) => t.toLowerCase());

  // Score blog posts by tag overlap
  for (const post of blogPosts) {
    const postPath = `/blogi/${post.slug}`;
    if (postPath === currentPath) continue;

    let score = 0;
    const postTags = post.tags.map((t) => t.toLowerCase());
    for (const tag of normalizedTags) {
      if (postTags.includes(tag)) score += 2;
    }
    if (category && post.category === category) score += 1;
    if (score > 0) {
      links.push({
        href: postPath,
        title: post.title,
        description: post.description,
        type: 'blog',
        score,
      });
    }
  }

  // Score guides by tag overlap
  for (const guide of guides) {
    const guidePath = `/oppaat/${guide.slug}`;
    if (guidePath === currentPath) continue;

    let score = 0;
    const guideTags = guide.tags.map((t) => t.toLowerCase());
    for (const tag of normalizedTags) {
      if (guideTags.includes(tag)) score += 2;
    }
    if (score > 0) {
      links.push({
        href: guidePath,
        title: guide.title,
        description: guide.description,
        type: 'guide',
        score,
      });
    }
  }

  // Add specific provider pages if referenced
  for (const slug of providerSlugs) {
    const provider = providers.find((p) => p.slug === slug);
    if (provider) {
      const providerPath = `/sahkoyhtiot/${provider.slug}`;
      if (providerPath === currentPath) continue;
      links.push({
        href: providerPath,
        title: provider.name,
        description: provider.description,
        type: 'provider',
        score: 3,
      });
    }
  }

  // Add latest report if not on report page
  if (!currentPath.startsWith('/raportit')) {
    const latestReport = [...monthlyReports].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    })[0];
    if (latestReport) {
      links.push({
        href: `/raportit/${latestReport.slug}`,
        title: `Sähkön hinta ${getMonthNameInessiveFi(latestReport.month)} ${latestReport.year}`,
        description: `Kuukausiraportti: keskihinta ${latestReport.avgSpotPrice.toFixed(2)} c/kWh`,
        type: 'report',
        score: 1,
      });
    }
  }

  // Always add comparison tool link if not already on it
  if (currentPath !== '/vertailu') {
    links.push({
      href: '/vertailu',
      title: 'Vertaa sähkösopimuksia',
      description:
        'Löydä halvin sähkösopimus omalle kulutuksellesi. Vertaa kaikkien yhtiöiden hintoja.',
      type: 'tool',
      score: 2,
    });
  }

  // Sort by score descending, then slice
  const sortedLinks = links
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks);

  if (sortedLinks.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Aiheeseen liittyvää
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedLinks.map((link) => {
          const Icon = TYPE_ICONS[link.type];
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TYPE_COLORS[link.type]}`}
                >
                  <Icon className="h-3 w-3" />
                  {TYPE_LABELS[link.type]}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-accent transition-colors line-clamp-2">
                {link.title}
              </h3>
              <p className="mt-1 flex-1 text-xs text-slate-500 line-clamp-2">
                {link.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                Lue lisää
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
