// Top 20 provider comparison pairs — targeting the most searched matchups in Finland
// These are used to auto-generate /vertailu/[pair] comparison pages

export interface ProviderComparison {
  slugPair: string;
  provider1Slug: string;
  provider2Slug: string;
}

export const providerComparisons: ProviderComparison[] = [
  { slugPair: 'fortum-vs-helen', provider1Slug: 'fortum', provider2Slug: 'helen' },
  { slugPair: 'fortum-vs-vattenfall', provider1Slug: 'fortum', provider2Slug: 'vattenfall' },
  { slugPair: 'helen-vs-vattenfall', provider1Slug: 'helen', provider2Slug: 'vattenfall' },
  { slugPair: 'fortum-vs-oomi', provider1Slug: 'fortum', provider2Slug: 'oomi' },
  { slugPair: 'helen-vs-oomi', provider1Slug: 'helen', provider2Slug: 'oomi' },
  { slugPair: 'vattenfall-vs-oomi', provider1Slug: 'vattenfall', provider2Slug: 'oomi' },
  { slugPair: 'fortum-vs-vare', provider1Slug: 'fortum', provider2Slug: 'vare' },
  { slugPair: 'helen-vs-vare', provider1Slug: 'helen', provider2Slug: 'vare' },
  { slugPair: 'oomi-vs-vare', provider1Slug: 'oomi', provider2Slug: 'vare' },
  { slugPair: 'vattenfall-vs-vare', provider1Slug: 'vattenfall', provider2Slug: 'vare' },
  { slugPair: 'helen-vs-ilmatar', provider1Slug: 'helen', provider2Slug: 'ilmatar' },
  { slugPair: 'fortum-vs-hehku-energia', provider1Slug: 'fortum', provider2Slug: 'hehku-energia' },
  { slugPair: 'helen-vs-nivos', provider1Slug: 'helen', provider2Slug: 'nivos' },
  { slugPair: 'fortum-vs-vantaan-energia', provider1Slug: 'fortum', provider2Slug: 'vantaan-energia' },
  { slugPair: 'fortum-vs-ilmatar', provider1Slug: 'fortum', provider2Slug: 'ilmatar' },
  { slugPair: 'helen-vs-lumme-energia', provider1Slug: 'helen', provider2Slug: 'lumme-energia' },
  { slugPair: 'oomi-vs-nivos', provider1Slug: 'oomi', provider2Slug: 'nivos' },
];
