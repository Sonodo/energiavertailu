// Enhanced LocalBusiness / Organization JSON-LD schema for provider pages

import { ElectricityProvider } from '@/types';
import { ProviderDetails } from '@/data/provider-details';

interface ProviderSchemaProps {
  provider: ElectricityProvider;
  details?: ProviderDetails;
}

export default function ProviderSchema({ provider, details }: ProviderSchemaProps) {
  const isNational = details?.type === 'national';

  // Find cheapest contract for priceRange
  const cheapestContract = provider.contracts.reduce(
    (min, c) => (c.pricePerKwh < min.pricePerKwh ? c : min),
    provider.contracts[0]
  );

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isNational ? 'Organization' : 'LocalBusiness',
    name: provider.name,
    url: provider.website,
    description: provider.description,
    areaServed: {
      '@type': 'Country',
      name: 'Finland',
    },
  };

  // Price range based on cheapest contract
  if (cheapestContract) {
    schema.priceRange = `alkaen ${cheapestContract.pricePerKwh.toFixed(2)} c/kWh`;
  }

  // Telephone
  if (details?.customerServicePhone) {
    schema.telephone = details.customerServicePhone;
  }

  // Founding date
  if (provider.founded) {
    schema.foundingDate = `${provider.founded}`;
  }

  // Address
  if (provider.headquarters) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: provider.headquarters,
      addressCountry: 'FI',
    };
  }

  // Offers
  if (provider.contracts.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${provider.name} sähkösopimukset`,
      itemListElement: provider.contracts.map((c) => ({
        '@type': 'Offer',
        name: c.name,
        description: c.description,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: c.pricePerKwh,
          priceCurrency: 'EUR',
          unitText: 'c/kWh',
          valueAddedTaxIncluded: false,
        },
        url: c.url,
        availability: 'https://schema.org/InStock',
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
