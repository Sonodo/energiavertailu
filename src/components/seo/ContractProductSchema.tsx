// Product + Offer JSON-LD schema for each electricity contract
// Emitted as a single ItemList with individual Product entries
// so each contract is discoverable in Google's rich results.

import { ElectricityContract, ElectricityProvider } from '@/types';

interface ContractProductSchemaProps {
  provider: ElectricityProvider;
  contracts: ElectricityContract[];
}

const TYPE_LABELS: Record<string, string> = {
  fixed: 'Kiinteähintainen sähkösopimus',
  spot: 'Pörssisähkösopimus',
  hybrid: 'Yhdistelmäsähkösopimus',
  'open-ended': 'Toistaiseksi voimassa oleva sähkösopimus',
};

export default function ContractProductSchema({
  provider,
  contracts,
}: ContractProductSchemaProps) {
  if (!contracts || contracts.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${provider.name} sähkösopimukset`,
    itemListElement: contracts.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: c.name,
        description: c.description,
        category: TYPE_LABELS[c.type] ?? 'Sähkösopimus',
        brand: {
          '@type': 'Brand',
          name: provider.name,
        },
        offers: {
          '@type': 'Offer',
          url: c.url,
          priceCurrency: 'EUR',
          price: c.pricePerKwh,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: provider.name,
            url: provider.website,
          },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: c.pricePerKwh,
            priceCurrency: 'EUR',
            unitText: 'c/kWh',
            valueAddedTaxIncluded: false,
          },
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
