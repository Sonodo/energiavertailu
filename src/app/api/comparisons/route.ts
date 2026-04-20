import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie, verifySession } from '@/lib/auth/session';
import {
  insertComparison,
  listComparisonsByUser,
  type SnapshotItem,
} from '@/lib/auth/saved-comparisons';
import { computeDelta } from '@/lib/comparisons/delta';

export const runtime = 'nodejs';

async function requireUserId(): Promise<string | null> {
  const token = await getSessionCookie();
  if (!token) return null;
  const session = await verifySession(token);
  return session?.uid ?? null;
}

export async function POST(req: NextRequest) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: {
    comparisonType?: string;
    inputs?: Record<string, unknown>;
    snapshot?: SnapshotItem[];
    label?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const comparisonType = (body.comparisonType || '').toString().slice(0, 64);
  if (!comparisonType) {
    return NextResponse.json({ error: 'comparison_type_required' }, { status: 400 });
  }
  if (!body.inputs || typeof body.inputs !== 'object') {
    return NextResponse.json({ error: 'inputs_required' }, { status: 400 });
  }
  if (!Array.isArray(body.snapshot) || body.snapshot.length === 0) {
    return NextResponse.json({ error: 'snapshot_required' }, { status: 400 });
  }

  // Cap snapshot size to keep JSONB rows small
  const snapshot = body.snapshot.slice(0, 200);
  const label =
    typeof body.label === 'string' && body.label.trim().length > 0
      ? body.label.trim().slice(0, 128)
      : null;

  const { id } = await insertComparison({
    userId,
    site: 'sahko',
    comparisonType,
    inputs: body.inputs,
    snapshot,
    label,
  });

  return NextResponse.json({ id });
}

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const rows = await listComparisonsByUser(userId);
  const enriched = rows.map((row) => {
    const snapshot = (row.snapshot as SnapshotItem[]) || [];
    const delta = computeDelta(snapshot, row.inputs as { annualKwh?: number; transferPrice?: number });
    return {
      id: row.id,
      comparisonType: row.comparison_type,
      site: row.site,
      label: row.label,
      inputs: row.inputs,
      createdAt: row.created_at,
      lastViewedAt: row.last_viewed_at,
      itemCount: snapshot.length,
      delta: {
        cheapestNowSlug: delta.cheapestNowSlug,
        cheapestNowContractName: delta.cheapestNowContractName,
        cheapestNowMonthlyEstimate: delta.cheapestNowMonthlyEstimate,
        wasCheapestSlug: delta.wasCheapestSlug,
        wasCheapestContractName: delta.wasCheapestContractName,
        wasCheapestMonthlyEstimate: delta.wasCheapestMonthlyEstimate,
        nowCheaperByPercent: delta.nowCheaperByPercent,
        firstSavingsPercent: delta.firstSavingsPercent,
        cheapestRetired: delta.cheapestRetired,
      },
    };
  });

  return NextResponse.json({ comparisons: enriched });
}
