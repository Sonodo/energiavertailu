import { providers, AVERAGE_SPOT_PRICE } from '@/data/providers';
import { ELECTRICITY_VAT, ELECTRICITY_TAX } from '@/lib/constants';
import type { SnapshotItem } from '@/lib/auth/saved-comparisons';

export interface SnapshotRowWithDelta extends SnapshotItem {
  status: 'active' | 'retired';
  currentPricePerKwh: number | null;
  currentMonthlyEstimate: number | null;
  deltaPercent: number | null;
}

export interface ComparisonDelta {
  items: SnapshotRowWithDelta[];
  cheapestNowSlug: string | null;
  cheapestNowContractId: string | null;
  cheapestNowContractName: string | null;
  cheapestNowMonthlyEstimate: number | null;
  wasCheapestSlug: string | null;
  wasCheapestContractId: string | null;
  wasCheapestContractName: string | null;
  wasCheapestMonthlyEstimate: number | null;
  nowCheaperByPercent: number | null;    // how much cheaper the current winner is vs then-winner (same user's snapshot)
  cheapestRetired: boolean;
  firstSavingsPercent: number | null;    // savings % between cheapest-NOW and the row that WAS #1 at save time
}

/**
 * Cost calculation mirrors ResultsList.calculateCost but scoped to one contract.
 * Keeps logic local to avoid cross-module import gymnastics.
 */
function calculateMonthlyCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  contractType: string,
  transferPriceCentsPerKwh: number
): { monthlyCost: number; annualCost: number } {
  let effectivePricePerKwh: number;
  if (contractType === 'spot') {
    effectivePricePerKwh = (AVERAGE_SPOT_PRICE + pricePerKwh) * (1 + ELECTRICITY_VAT);
  } else {
    effectivePricePerKwh = pricePerKwh * (1 + ELECTRICITY_VAT);
  }
  const monthlyFeeInclVAT = monthlyFee * (1 + ELECTRICITY_VAT);
  const annualEnergyCost = (effectivePricePerKwh / 100) * annualKwh + monthlyFeeInclVAT * 12;

  const annualTransmissionCost = (transferPriceCentsPerKwh / 100) * annualKwh;
  const taxPerKwhInclVAT = ELECTRICITY_TAX * (1 + ELECTRICITY_VAT);
  const annualTaxCost = (taxPerKwhInclVAT / 100) * annualKwh;
  const annualCost = annualEnergyCost + annualTransmissionCost + annualTaxCost;
  return { monthlyCost: annualCost / 12, annualCost };
}

/**
 * Given a saved snapshot + inputs (kWh + transferPrice), computes current price + delta for each row.
 * Inputs may include: annualKwh, transferPrice.
 */
export function computeDelta(
  snapshot: SnapshotItem[],
  inputs: { annualKwh?: number; transferPrice?: number }
): ComparisonDelta {
  const annualKwh = typeof inputs.annualKwh === 'number' ? inputs.annualKwh : 5000;
  const transferPrice = typeof inputs.transferPrice === 'number' ? inputs.transferPrice : 4.5;

  const items: SnapshotRowWithDelta[] = snapshot.map((row) => {
    const provider = providers.find((p) => p.slug === row.providerSlug);
    const contract = provider?.contracts.find((c) => c.id === row.contractId);
    if (!contract) {
      return {
        ...row,
        status: 'retired',
        currentPricePerKwh: null,
        currentMonthlyEstimate: null,
        deltaPercent: null,
      };
    }
    const { monthlyCost: currentMonthly } = calculateMonthlyCost(
      contract.pricePerKwh,
      contract.monthlyFee,
      annualKwh,
      contract.type,
      transferPrice
    );
    const deltaPercent =
      row.monthlyEstimate > 0
        ? ((currentMonthly - row.monthlyEstimate) / row.monthlyEstimate) * 100
        : null;
    return {
      ...row,
      status: 'active',
      currentPricePerKwh: contract.pricePerKwh,
      currentMonthlyEstimate: currentMonthly,
      deltaPercent,
    };
  });

  // cheapest NOW (among active only)
  const active = items.filter((i) => i.status === 'active' && i.currentMonthlyEstimate !== null);
  let cheapestNow: SnapshotRowWithDelta | null = null;
  for (const it of active) {
    if (!cheapestNow || (it.currentMonthlyEstimate! < cheapestNow.currentMonthlyEstimate!)) {
      cheapestNow = it;
    }
  }

  // was cheapest at save time (rank 1 in snapshot)
  const wasCheapest = items.find((i) => i.rank === 1) ?? null;

  const cheapestRetired = wasCheapest ? wasCheapest.status === 'retired' : false;

  // nowCheaperByPercent: how much the CURRENT winner is cheaper vs what user saw at save time (then-cheapest)
  let nowCheaperByPercent: number | null = null;
  if (cheapestNow && wasCheapest && wasCheapest.monthlyEstimate > 0) {
    nowCheaperByPercent =
      ((wasCheapest.monthlyEstimate - cheapestNow.currentMonthlyEstimate!) / wasCheapest.monthlyEstimate) * 100;
  }

  // firstSavingsPercent: current price of the then-winner vs current cheapest
  let firstSavingsPercent: number | null = null;
  if (cheapestNow && wasCheapest && wasCheapest.status === 'active' && wasCheapest.currentMonthlyEstimate! > 0) {
    firstSavingsPercent =
      ((wasCheapest.currentMonthlyEstimate! - cheapestNow.currentMonthlyEstimate!) / wasCheapest.currentMonthlyEstimate!) * 100;
  }

  return {
    items,
    cheapestNowSlug: cheapestNow?.providerSlug ?? null,
    cheapestNowContractId: cheapestNow?.contractId ?? null,
    cheapestNowContractName: cheapestNow?.contractName ?? null,
    cheapestNowMonthlyEstimate: cheapestNow?.currentMonthlyEstimate ?? null,
    wasCheapestSlug: wasCheapest?.providerSlug ?? null,
    wasCheapestContractId: wasCheapest?.contractId ?? null,
    wasCheapestContractName: wasCheapest?.contractName ?? null,
    wasCheapestMonthlyEstimate: wasCheapest?.monthlyEstimate ?? null,
    nowCheaperByPercent,
    cheapestRetired,
    firstSavingsPercent,
  };
}
