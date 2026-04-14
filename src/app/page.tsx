import type { Metadata } from 'next';
import { providers } from '@/data/providers';
import { blogPosts } from '@/data/blog-posts';
import HomeContent from './home-content';

export const metadata: Metadata = {
  title: 'Sähkövertailu — Vertaile sähkösopimuksia ja löydä sopiva sopimus | Valitse Sähkö',
  description:
    'Vertaile 37 sähköyhtiön sopimuksia, seuraa pörssisähkön hintaa reaaliajassa ja säästä sähkölaskussa. Ilmainen ja kattava sähkövertailu Suomessa.',
  openGraph: {
    title: 'Sähkövertailu — Vertaile sähkösopimuksia ja löydä sopiva sopimus',
    description:
      'Vertaile 37 sähköyhtiön sopimuksia, seuraa pörssisähkön hintaa reaaliajassa ja säästä sähkölaskussa.',
    url: '/',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

const totalContracts = providers.reduce((sum, p) => sum + p.contracts.length, 0);

// Get latest blog posts sorted by date
const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);

export default function HomePage() {
  return (
    <HomeContent
      providerCount={providers.length}
      totalContracts={totalContracts}
      latestPosts={latestPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
      }))}
      providers={providers.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        type: p.type,
      }))}
    />
  );
}
