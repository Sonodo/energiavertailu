// Service + Offer JSON-LD schema for each electricity contract
// Schema.org has no clean EnergyProduct type, so electricity contracts
// are modelled as Service (serviceType "Sähkösopimus") with an Offer.
// For spot/pörssisähkö contracts the price is a marginal (c/kWh added on top
// of Nord Pool spot) and is documented honestly via priceSpecification.description.
// For fixed contracts the price is the energy component (energiamaksu, c/kWh),
// and contractLength becomes Offer.eligibleDuration in months.
//
// Emitted as a single ItemList of services so each contract is independently
// discoverable in Google rich results / SGE / AEO surfaces.

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

interface PriceSpec {
  '@type': 'UnitPriceSpecification';
  price: number;
  priceCurrency: 'EUR';
  unitText: string;
  valueAddedTaxIncluded: boolean;
  description?: string;
}

function buildPriceSpecifications(
  contract: ElectricityContract
): PriceSpec[] {
  const energySpec: PriceSpec = {
    '@type': 'UnitPriceSpecification',
    price: contract.pricePerKwh,
    priceCurrency: 'EUR',
    unitText: 'KWH',
    valueAddedTaxIncluded: false,
    description:
      contract.type === 'spot'
        ? `Pörssihinta (Nord Pool spot) + marginaali ${contract.pricePerKwh.toFixed(
            2
          )} c/kWh, alv 0 %`
        : `Energiamaksu ${contract.pricePerKwh.toFixed(2)} c/kWh, alv 0 %`,
  };

  const monthlySpec: PriceSpec = {
    '@type': 'UnitPriceSpecification',
    price: contract.monthlyFee,
    priceCurrency: 'EUR',
    unitText: 'MON',
    valueAddedTaxIncluded: false,
    description: `Perusmaksu ${contract.monthlyFee.toFixed(2)} €/kk, alv 0 %`,
  };

  return [energySpec, monthlySpec];
}

export default function ContractProductSchema({
  provider,
  contracts,
}: ContractProductSchemaProps) {
  if (!contracts || contracts.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${provider.name} sähkösopimukset`,
    itemListElement: contracts.map((c, idx) => {
      const offer: Record<string, unknown> = {
        '@type': 'Offer',
        url: c.url,
        price: c.pricePerKwh,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceSpecification: buildPriceSpecifications(c),
        seller: {
          '@type': 'Organization',
          name: provider.name,
          url: provider.website,
        },
        category: TYPE_LABELS[c.type] ?? 'Sähkösopimus',
      };

      // Fixed-term contracts expose length as Offer.eligibleDuration (months).
      if (c.contractLength && (c.type === 'fixed' || c.type === 'hybrid')) {
        offer.eligibleDuration = {
          '@type': 'QuantitativeValue',
          value: c.contractLength,
          unitCode: 'MON',
        };
      }

      const service: Record<string, unknown> = {
        '@type': 'Service',
        name: c.name,
        description: c.description,
        serviceType: TYPE_LABELS[c.type] ?? 'Sähkösopimus',
        category: c.greenEnergy
          ? 'Vihreä sähkösopimus (alkuperätakuu)'
          : TYPE_LABELS[c.type] ?? 'Sähkösopimus',
        provider: {
          '@type': 'Organization',
          name: provider.name,
          url: provider.website,
        },
        areaServed: {
          '@type': 'Country',
          name: 'FI',
        },
        offers: offer,
      };

      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: service,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
