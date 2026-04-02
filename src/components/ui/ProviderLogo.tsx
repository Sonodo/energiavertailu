'use client';

import { cn } from '@/lib/utils';

interface ProviderLogoProps {
  name: string;
  slug: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Brand color gradients for known providers
const PROVIDER_COLORS: Record<string, { from: string; to: string }> = {
  fortum: { from: '#7C3AED', to: '#4F46E5' },       // blue-violet
  helen: { from: '#F97316', to: '#EA580C' },          // warm orange
  vattenfall: { from: '#FACC15', to: '#2563EB' },     // yellow-blue
  oomi: { from: '#22C55E', to: '#16A34A' },           // green
  vare: { from: '#06B6D4', to: '#0891B2' },           // cyan
  hehku: { from: '#F59E0B', to: '#D97706' },          // amber
  ilmatar: { from: '#38BDF8', to: '#0EA5E9' },        // sky-blue
  nivos: { from: '#14B8A6', to: '#0D9488' },          // teal
};

// Deterministic hash for unknown providers
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function getGradientColors(slug: string): { from: string; to: string } {
  const known = PROVIDER_COLORS[slug];
  if (known) return known;

  // Generate deterministic colors from slug hash
  const hash = hashSlug(slug);
  const hue1 = hash % 360;
  const hue2 = (hue1 + 30) % 360;
  return {
    from: `hsl(${hue1}, 65%, 55%)`,
    to: `hsl(${hue2}, 70%, 45%)`,
  };
}

function getInitials(name: string): string {
  const words = name.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const SIZES = {
  sm: { box: 32, text: 'text-xs', rounded: 'rounded-md' },
  md: { box: 40, text: 'text-sm', rounded: 'rounded-lg' },
  lg: { box: 56, text: 'text-lg', rounded: 'rounded-xl' },
} as const;

export default function ProviderLogo({ name, slug, size = 'md', className }: ProviderLogoProps) {
  const colors = getGradientColors(slug);
  const initials = getInitials(name);
  const s = SIZES[size];
  const gradientId = `provider-grad-${slug}-${size}`;

  return (
    <svg
      width={s.box}
      height={s.box}
      viewBox={`0 0 ${s.box} ${s.box}`}
      className={cn('shrink-0', className)}
      role="img"
      aria-label={`${name} logo`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.from} />
          <stop offset="100%" stopColor={colors.to} />
        </linearGradient>
      </defs>
      <rect
        width={s.box}
        height={s.box}
        rx={size === 'sm' ? 6 : size === 'md' ? 8 : 12}
        fill={`url(#${gradientId})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontWeight="700"
        fontSize={size === 'sm' ? 12 : size === 'md' ? 14 : 20}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
