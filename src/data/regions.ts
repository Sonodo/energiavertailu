import { Region } from '@/types';

// Finnish regions with primary grid operators and average transfer prices
// Transfer prices are approximate averages including tax

export const regions: Region[] = [
  { id: 'uusimaa', name: 'Uusimaa', gridOperator: 'Helen Sähköverkko', transferPrice: 4.2 },
  { id: 'varsinais-suomi', name: 'Varsinais-Suomi', gridOperator: 'Turku Energia Sähköverkot', transferPrice: 4.1 },
  { id: 'satakunta', name: 'Satakunta', gridOperator: 'Pori Energia Sähköverkot', transferPrice: 4.3 },
  { id: 'pirkanmaa', name: 'Pirkanmaa', gridOperator: 'Elenia Verkko', transferPrice: 4.8 },
  { id: 'kanta-hame', name: 'Kanta-Häme', gridOperator: 'Elenia Verkko', transferPrice: 4.8 },
  { id: 'paijat-hame', name: 'Päijät-Häme', gridOperator: 'Elenia Verkko', transferPrice: 4.8 },
  { id: 'kymenlaakso', name: 'Kymenlaakso', gridOperator: 'Kymenlaakson Sähköverkko', transferPrice: 4.5 },
  { id: 'etela-karjala', name: 'Etelä-Karjala', gridOperator: 'Lappeenrannan Energiaverkot', transferPrice: 4.3 },
  { id: 'etela-savo', name: 'Etelä-Savo', gridOperator: 'Järvi-Suomen Energia', transferPrice: 5.0 },
  { id: 'pohjois-savo', name: 'Pohjois-Savo', gridOperator: 'Savon Voima Verkko', transferPrice: 4.9 },
  { id: 'pohjois-karjala', name: 'Pohjois-Karjala', gridOperator: 'PKS Sähkönsiirto', transferPrice: 5.1 },
  { id: 'keski-suomi', name: 'Keski-Suomi', gridOperator: 'JE-Siirto', transferPrice: 4.6 },
  { id: 'etela-pohjanmaa', name: 'Etelä-Pohjanmaa', gridOperator: 'Elenia Verkko', transferPrice: 4.8 },
  { id: 'pohjanmaa', name: 'Pohjanmaa', gridOperator: 'Vaasan Sähköverkko', transferPrice: 4.4 },
  { id: 'keski-pohjanmaa', name: 'Keski-Pohjanmaa', gridOperator: 'Kokkolan Verkko', transferPrice: 4.5 },
  { id: 'pohjois-pohjanmaa', name: 'Pohjois-Pohjanmaa', gridOperator: 'Oulun Energia Siirto ja Jakelu', transferPrice: 4.7 },
  { id: 'kainuu', name: 'Kainuu', gridOperator: 'Loiste Sähköverkko', transferPrice: 5.2 },
  { id: 'lappi', name: 'Lappi', gridOperator: 'Rovakaira', transferPrice: 5.5 },
  { id: 'ahvenanmaa', name: 'Ahvenanmaa', gridOperator: 'Ålands Elandelslag', transferPrice: 5.0 },
];

// Major Finnish cities mapped to regions
export const cityToRegion: Record<string, string> = {
  Helsinki: 'uusimaa',
  Espoo: 'uusimaa',
  Vantaa: 'uusimaa',
  Turku: 'varsinais-suomi',
  Tampere: 'pirkanmaa',
  Oulu: 'pohjois-pohjanmaa',
  Jyväskylä: 'keski-suomi',
  Lahti: 'paijat-hame',
  Kuopio: 'pohjois-savo',
  Pori: 'satakunta',
  Joensuu: 'pohjois-karjala',
  Lappeenranta: 'etela-karjala',
  Hämeenlinna: 'kanta-hame',
  Vaasa: 'pohjanmaa',
  Seinäjoki: 'etela-pohjanmaa',
  Rovaniemi: 'lappi',
  Mikkeli: 'etela-savo',
  Kotka: 'kymenlaakso',
  Kajaani: 'kainuu',
  Kokkola: 'keski-pohjanmaa',
  Maarianhamina: 'ahvenanmaa',
};
