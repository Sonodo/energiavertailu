import { neon } from '@neondatabase/serverless';

function getSQL() {
  return neon(process.env.DATABASE_URL!);
}

let initialized = false;

async function ensureTable() {
  if (!initialized) {
    const sql = getSQL();
    await sql`
      CREATE TABLE IF NOT EXISTS valitse_saved_comparisons (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES valitse_users(id) ON DELETE CASCADE,
        site VARCHAR(32) NOT NULL,
        comparison_type VARCHAR(64) NOT NULL,
        inputs JSONB NOT NULL,
        snapshot JSONB NOT NULL,
        label VARCHAR(128),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        last_viewed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS valitse_saved_comparisons_user_idx
      ON valitse_saved_comparisons(user_id, created_at DESC)
    `;
    initialized = true;
  }
}

export interface SavedComparisonRow {
  id: string;
  user_id: string;
  site: string;
  comparison_type: string;
  inputs: Record<string, unknown>;
  snapshot: unknown;
  label: string | null;
  created_at: string;
  last_viewed_at: string;
}

export interface SnapshotItem {
  providerSlug: string;
  providerName: string;
  contractId: string;
  contractName: string;
  contractType: string;
  pricePerKwh: number;
  monthlyFee: number;
  monthlyEstimate: number;
  annualEstimate: number;
  rank: number;
}

export async function insertComparison(params: {
  userId: string;
  site: string;
  comparisonType: string;
  inputs: Record<string, unknown>;
  snapshot: SnapshotItem[];
  label: string | null;
}): Promise<{ id: string }> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    INSERT INTO valitse_saved_comparisons
      (user_id, site, comparison_type, inputs, snapshot, label)
    VALUES (
      ${params.userId},
      ${params.site},
      ${params.comparisonType},
      ${JSON.stringify(params.inputs)}::jsonb,
      ${JSON.stringify(params.snapshot)}::jsonb,
      ${params.label}
    )
    RETURNING id
  `;
  return { id: (rows[0] as { id: string }).id };
}

export async function listComparisonsByUser(userId: string): Promise<SavedComparisonRow[]> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    SELECT * FROM valitse_saved_comparisons
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return rows as SavedComparisonRow[];
}

export async function getComparisonById(id: string, userId: string): Promise<SavedComparisonRow | null> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    SELECT * FROM valitse_saved_comparisons
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return (rows[0] as SavedComparisonRow) || null;
}

export async function touchComparisonLastViewed(id: string, userId: string): Promise<void> {
  await ensureTable();
  const sql = getSQL();
  await sql`
    UPDATE valitse_saved_comparisons
    SET last_viewed_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
  `;
}

export async function deleteComparison(id: string, userId: string): Promise<boolean> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    DELETE FROM valitse_saved_comparisons
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return rows.length > 0;
}
