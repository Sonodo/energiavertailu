import { ConsumptionProfile } from '@/types';

// Detailed consumption profiles for Finnish households
// Based on Statistics Finland and Motiva data

export const consumptionProfiles: ConsumptionProfile[] = [
  {
    type: 'apartment-small',
    label: 'Pieni kerrostaloasunto',
    annualKwh: 2000,
    description: 'Yksiö tai kaksio, 1-2 henkilöä. Ei sähkölämmitystä, ei sähkösaunaa.',
  },
  {
    type: 'apartment-medium',
    label: 'Keskikokoinen kerrostaloasunto',
    annualKwh: 3000,
    description: 'Kolmio, 2-3 henkilöä. Ei sähkölämmitystä, mahdollisesti sähkösauna.',
  },
  {
    type: 'apartment-large',
    label: 'Iso kerrostaloasunto',
    annualKwh: 4000,
    description: 'Neliö tai suurempi, 3-5 henkilöä. Sähkösauna.',
  },
  {
    type: 'rowhouse',
    label: 'Rivitalo',
    annualKwh: 5000,
    description: 'Rivitaloasunto, 80-120 m². Ei sähkölämmitystä.',
  },
  {
    type: 'detached-heat-pump',
    label: 'Omakotitalo (maalämpö)',
    annualKwh: 8000,
    description: 'Omakotitalo maalämpöpumpulla, 120-160 m².',
  },
  {
    type: 'detached-air-pump',
    label: 'Omakotitalo (ilmalämpöpumppu)',
    annualKwh: 12000,
    description: 'Omakotitalo ilmalämpöpumpulla ja lisälämmityksellä, 120-160 m².',
  },
  {
    type: 'detached-direct-electric',
    label: 'Omakotitalo (suora sähkölämmitys)',
    annualKwh: 18000,
    description: 'Omakotitalo suoralla sähkölämmityksellä, 120-160 m².',
  },
  {
    type: 'detached-large-electric',
    label: 'Iso omakotitalo (sähkölämmitys)',
    annualKwh: 25000,
    description: 'Iso omakotitalo suoralla sähkölämmityksellä, 180-250 m².',
  },
];

// Monthly consumption distribution (percentage of annual consumption per month)
// Based on typical Finnish consumption patterns
export const monthlyDistribution: Record<string, number[]> = {
  // Apartment without electric heating — fairly flat distribution
  apartment: [8.5, 8.0, 8.5, 8.0, 7.5, 7.0, 7.0, 7.0, 7.5, 8.5, 9.5, 12.0],
  // Electric heating — heavy winter bias
  electricHeating: [14.0, 13.0, 11.0, 8.0, 5.0, 3.5, 3.0, 3.5, 5.5, 8.5, 12.0, 13.0],
  // Heat pump — moderate winter bias
  heatPump: [12.0, 11.0, 10.0, 8.0, 6.0, 5.0, 4.5, 5.0, 6.5, 8.0, 11.0, 13.0],
};
