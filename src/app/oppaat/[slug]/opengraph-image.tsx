import { ImageResponse } from 'next/og';
import { guides } from '@/data/guides';

export const alt = 'Energiavertailu — Opas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  const title = guide?.title ?? 'Opas';
  const category = guide?.category ?? '';
  const readTime = guide?.readTime ?? 5;

  // Truncate title if very long
  const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0A1628 0%, #0044AA 50%, #0066FF 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
          }}
        />

        {/* Top: badges */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '18px',
              fontWeight: 600,
              color: '#FFFFFF',
              gap: '8px',
            }}
          >
            <span>📚</span>
            <span>Opas</span>
          </div>
          {category && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '100px',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.65)',
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '100px',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            🕐 {readTime} min lukuaika
          </div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: displayTitle.length > 60 ? '38px' : '48px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              display: 'flex',
              maxWidth: '1000px',
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                fontSize: '24px',
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'flex',
              }}
            >
              Energiavertailu
            </div>
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'flex',
            }}
          >
            energiavertailu.fi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
