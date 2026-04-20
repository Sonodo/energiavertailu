import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie, verifySession } from '@/lib/auth/session';
import {
  getComparisonById,
  deleteComparison,
  touchComparisonLastViewed,
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

function isUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { id } = await ctx.params;
  if (!isUUID(id)) return NextResponse.json({ error: 'invalid_id' }, { status: 400 });

  const row = await getComparisonById(id, userId);
  if (!row) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const snapshot = (row.snapshot as SnapshotItem[]) || [];
  const delta = computeDelta(snapshot, row.inputs as { annualKwh?: number; transferPrice?: number });

  // Fire-and-forget last_viewed_at update
  touchComparisonLastViewed(id, userId).catch(() => {});

  return NextResponse.json({
    id: row.id,
    comparisonType: row.comparison_type,
    site: row.site,
    label: row.label,
    inputs: row.inputs,
    snapshot,
    createdAt: row.created_at,
    lastViewedAt: row.last_viewed_at,
    delta,
  });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { id } = await ctx.params;
  if (!isUUID(id)) return NextResponse.json({ error: 'invalid_id' }, { status: 400 });

  const ok = await deleteComparison(id, userId);
  if (!ok) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
