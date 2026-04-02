import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';

export function GET() {
  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About

${SITE_NAME} (${SITE_URL}) is Finland's most comprehensive electricity comparison service. We help Finnish consumers find the cheapest electricity contracts, monitor real-time spot electricity prices, and make informed decisions about their energy usage.

## Core Features

- **Electricity Comparison Tool** (/vertailu): Compare electricity contracts from 37 Finnish providers. Filter by contract type (spot, fixed, hybrid), calculate annual costs based on your consumption profile.
- **Real-Time Spot Prices** (/porssisahko): Live Nord Pool spot electricity prices for Finland (FI area), hourly breakdown, daily statistics, and price forecasts.
- **Provider Directory** (/sahkoyhtiot): Comprehensive database of Finnish electricity retailers with contract details, pricing, and reviews.
- **Energy Tools** (/tyokalut): Calculators for electricity costs, consumption estimation, and savings potential.
- **Educational Guides** (/oppaat): In-depth guides on electricity topics for Finnish consumers.
- **Energy Blog** (/blogi): Articles on electricity market trends, saving tips, and energy news in Finnish.

## Key Data

- Market: Finland (Suomi)
- Language: Finnish (fi)
- Currency: EUR
- Electricity pricing: c/kWh (cents per kilowatt-hour)
- VAT rate: 25.5%
- Price source: Nord Pool (day-ahead market)
- Providers covered: 37 Finnish electricity retailers

## Content Topics

- Electricity contract comparison and switching
- Spot (pörssisähkö) vs fixed price contracts
- Electricity price trends and forecasts
- Energy saving tips for Finnish households
- Electric heating optimization
- Solar panels and electricity contracts
- Electric vehicle charging and costs
- Finnish electricity provider reviews

## API

- /api/prices/spot: Current and upcoming spot electricity prices for Finland

## Contact

Website: ${SITE_URL}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
