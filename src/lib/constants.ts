import { ConsumptionProfile, NavigationItem } from '@/types';

// Site metadata
export const SITE_NAME = 'Valitse Sähkö';
export const SITE_URL = 'https://valitsesahko.fi';
export const SITE_DESCRIPTION =
  'Vertaa sähkösopimuksia helposti. Valitse Sähkö näyttää kaikki sähköyhtiöt ja sopimukset — puolueettomasti.';
export const SITE_TAGLINE = 'Vertaa ja valitse paras sähkösopimus';

// Colors — electric blue theme
export const COLORS = {
  primary: '#0066FF',
  primaryDark: '#0052CC',
  primaryLight: '#3385FF',
  dark: '#0A1628',
  darkSecondary: '#1A2940',
  accent: '#00D4AA',
  accentWarm: '#FF6B35',
  warning: '#FFB800',
  error: '#FF3B30',
  success: '#34C759',
  background: '#F8FAFC',
  backgroundDark: '#0A1628',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
} as const;

// VAT rate for electricity in Finland
export const ELECTRICITY_VAT = 0.255; // 25.5%

// Average transfer price (siirtohinta) in Finland c/kWh (incl. tax)
export const AVG_TRANSFER_PRICE = 4.5;

// Average electricity tax c/kWh
export const ELECTRICITY_TAX = 2.79372;

// Navigation
export const NAVIGATION: NavigationItem[] = [
  {
    label: 'Pörssisähkö',
    href: '/porssisahko',
    description: 'Seuraa pörssisähkön hintaa reaaliajassa',
  },
  {
    label: 'Vertailu',
    href: '/vertailu',
    description: 'Vertaa sähkösopimuksia ja löydä halvin',
  },
  {
    label: 'Sähköyhtiöt',
    href: '/sahkoyhtiot',
    description: 'Kaikki suomalaiset sähköyhtiöt',
  },
  {
    label: 'Työkalut',
    href: '/tyokalut',
    description: 'Sähkölaskurit ja hyödylliset työkalut',
  },
  {
    label: 'Raportit',
    href: '/raportit',
    description: 'Kuukausittaiset hintaraportit',
  },
  {
    label: 'Blogi',
    href: '/blogi',
    description: 'Ajankohtaista sähkömarkkinoilta',
  },
  {
    label: 'Oppaat',
    href: '/oppaat',
    description: 'Oppaat ja vinkit sähkön säästämiseen',
  },
];

// Consumption profiles (annual kWh estimates for Finland)
export const CONSUMPTION_PROFILES: ConsumptionProfile[] = [
  {
    type: 'apartment-small',
    label: 'Pieni kerrostaloasunto (1-2 hlö)',
    annualKwh: 2000,
    description: 'Yksiö tai kaksio, 30-50 m², ei sähkölämmitystä',
  },
  {
    type: 'apartment-large',
    label: 'Iso kerrostaloasunto (3-4 hlö)',
    annualKwh: 3500,
    description: 'Kolmio tai neliö, 60-80 m², ei sähkölämmitystä',
  },
  {
    type: 'rowhouse',
    label: 'Rivitalo',
    annualKwh: 5000,
    description: 'Rivitaloasunto, 80-120 m², osittain sähkölämmitys',
  },
  {
    type: 'detached-no-heating',
    label: 'Omakotitalo (ei sähkölämmitystä)',
    annualKwh: 7000,
    description: 'Omakotitalo, 120-160 m², maalämpö tai muu lämmitys',
  },
  {
    type: 'detached-partial',
    label: 'Omakotitalo (ilmalämpöpumppu)',
    annualKwh: 12000,
    description: 'Omakotitalo, 120-160 m², ilmalämpöpumppu + lisälämmitys',
  },
  {
    type: 'detached-electric',
    label: 'Omakotitalo (suora sähkölämmitys)',
    annualKwh: 18000,
    description: 'Omakotitalo, 120-160 m², suora sähkölämmitys',
  },
  {
    type: 'detached-large',
    label: 'Iso omakotitalo (sähkölämmitys)',
    annualKwh: 25000,
    description: 'Iso omakotitalo, 180-250 m², suora sähkölämmitys',
  },
];

// Finnish regions with grid operators
export const FINNISH_REGIONS = [
  { id: 'uusimaa', name: 'Uusimaa', gridOperator: 'Helen Sähköverkko', transferPrice: 4.2 },
  { id: 'varsinais-suomi', name: 'Varsinais-Suomi', gridOperator: 'Turku Energia Sähköverkot', transferPrice: 4.1 },
  { id: 'pirkanmaa', name: 'Pirkanmaa', gridOperator: 'Elenia', transferPrice: 4.8 },
  { id: 'paijat-hame', name: 'Päijät-Häme', gridOperator: 'Elenia', transferPrice: 4.8 },
  { id: 'kanta-hame', name: 'Kanta-Häme', gridOperator: 'Elenia', transferPrice: 4.8 },
  { id: 'kymenlaakso', name: 'Kymenlaakso', gridOperator: 'Kymenlaakson Sähköverkko', transferPrice: 4.5 },
  { id: 'etela-karjala', name: 'Etelä-Karjala', gridOperator: 'Lappeenrannan Energiaverkot', transferPrice: 4.3 },
  { id: 'etela-savo', name: 'Etelä-Savo', gridOperator: 'Järvi-Suomen Energia', transferPrice: 5.0 },
  { id: 'pohjois-savo', name: 'Pohjois-Savo', gridOperator: 'Savon Voima Verkko', transferPrice: 4.9 },
  { id: 'pohjois-karjala', name: 'Pohjois-Karjala', gridOperator: 'PKS Sähkönsiirto', transferPrice: 5.1 },
  { id: 'keski-suomi', name: 'Keski-Suomi', gridOperator: 'JE-Siirto', transferPrice: 4.6 },
  { id: 'etela-pohjanmaa', name: 'Etelä-Pohjanmaa', gridOperator: 'Elenia', transferPrice: 4.8 },
  { id: 'pohjanmaa', name: 'Pohjanmaa', gridOperator: 'Vaasan Sähköverkko', transferPrice: 4.4 },
  { id: 'keski-pohjanmaa', name: 'Keski-Pohjanmaa', gridOperator: 'Kokkolan Verkko', transferPrice: 4.5 },
  { id: 'pohjois-pohjanmaa', name: 'Pohjois-Pohjanmaa', gridOperator: 'Oulun Energia Siirto ja Jakelu', transferPrice: 4.7 },
  { id: 'kainuu', name: 'Kainuu', gridOperator: 'Loiste Sähköverkko', transferPrice: 5.2 },
  { id: 'lappi', name: 'Lappi', gridOperator: 'Rovakaira', transferPrice: 5.5 },
  { id: 'satakunta', name: 'Satakunta', gridOperator: 'Pori Energia Sähköverkot', transferPrice: 4.3 },
] as const;

// Default consumption for calculations
export const DEFAULT_ANNUAL_KWH = 5000;
