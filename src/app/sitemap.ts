import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { blogPosts } from '@/data/blog-posts';
import { providers } from '@/data/providers';
import { guides } from '@/data/guides';
import { monthlyReports } from '@/data/monthly-reports';
import { providerComparisons } from '@/data/provider-comparisons';
import { regions } from '@/data/regions';
import { regionContent } from '@/data/region-content';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a fixed build date for static pages instead of new Date()
  // to avoid unnecessary sitemap churn on every build
  const BUILD_DATE = new Date('2026-04-10');

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/porssisahko`,
      lastModified: BUILD_DATE,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/vertailu`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sahkoyhtiot`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tyokalut`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tyokalut/hintaseuranta`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blogi`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/oppaat`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tietosuoja`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/kayttoehdot`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sahkon-hinta-tanaan`,
      lastModified: BUILD_DATE,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tietoa`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/yhteystiedot`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/media`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/evasteet`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/menetelma`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/tyokalut/kulutus`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tyokalut/aurinkopaneelit`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tyokalut/lammitys`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tyokalut/sahkoauto`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vertailu/rinnakkain`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogi/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Provider pages
  const providerPages: MetadataRoute.Sitemap = providers.map((provider) => ({
    url: `${SITE_URL}/sahkoyhtiot/${provider.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/oppaat/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Report pages
  const reportPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/raportit`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...monthlyReports.map((report) => ({
      url: `${SITE_URL}/raportit/${report.slug}`,
      lastModified: new Date(report.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Provider comparison pages
  const comparisonPages: MetadataRoute.Sitemap = providerComparisons.map((comp) => ({
    url: `${SITE_URL}/vertailu/${comp.slugPair}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Regional pages
  const regionPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/alue`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...regions
      .filter((region) => regionContent[region.id])
      .map((region) => ({
        url: `${SITE_URL}/alue/${region.id}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];

  return [...staticPages, ...blogPages, ...providerPages, ...guidePages, ...reportPages, ...comparisonPages, ...regionPages];
}
