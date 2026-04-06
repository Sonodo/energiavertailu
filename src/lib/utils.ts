import { ELECTRICITY_VAT } from './constants';

/**
 * Format price in cents per kWh with Finnish locale
 */
export function formatPrice(cents: number, decimals = 2): string {
  return `${cents.toFixed(decimals)} c/kWh`;
}

/**
 * Format currency in euros with Finnish locale
 */
export function formatEuros(euros: number, decimals = 2): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(euros);
}

/**
 * Format a number with Finnish locale
 */
export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('fi-FI', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Add VAT to a price
 */
export function addVAT(priceExclVAT: number): number {
  return priceExclVAT * (1 + ELECTRICITY_VAT);
}

/**
 * Remove VAT from a price
 */
export function removeVAT(priceInclVAT: number): number {
  return priceInclVAT / (1 + ELECTRICITY_VAT);
}

/**
 * Calculate annual electricity cost
 * @param pricePerKwh - energy price in c/kWh
 * @param monthlyFee - monthly base fee in €
 * @param annualKwh - annual consumption in kWh
 * @param transferPrice - transfer price in c/kWh (optional)
 * @returns annual cost in euros
 */
export function calculateAnnualCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  transferPrice = 0
): number {
  const energyCost = (pricePerKwh / 100) * annualKwh;
  const transferCost = (transferPrice / 100) * annualKwh;
  const baseFees = monthlyFee * 12;
  return energyCost + transferCost + baseFees;
}

/**
 * Merge class names (simple utility, no dependency needed)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date in Finnish locale
 */
export function formatDateFi(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(d);
}

/**
 * Format a datetime in Finnish locale
 */
export function formatDateTimeFi(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Get the current hour in Finnish time (Europe/Helsinki).
 *
 * On Vercel (and other cloud platforms) `new Date().getHours()` returns UTC,
 * but spot-hinta.fi price data uses Finnish local time (EET/EEST, UTC+2/+3).
 * This utility ensures we always get the correct Finnish hour regardless of
 * the server's timezone setting.
 */
export function getFinnishHour(date?: Date): number {
  const d = date ?? new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Europe/Helsinki',
  }).formatToParts(d);
  const hourPart = parts.find((p) => p.type === 'hour');
  return hourPart ? parseInt(hourPart.value, 10) : d.getHours();
}
