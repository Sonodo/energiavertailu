import { ImageResponse } from 'next/og';
import { providers } from '@/data/providers';

export const alt = 'Valitse Sähkö — Sähköyhtiö';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  const name = provider?.name ?? 'Sähköyhtiö';
  const contractCount = provider?.contracts.length ?? 0;
  const headquarters = provider?.headquarters;

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
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
          }}
        />

        {/* Top: Page type label */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.85)',
              alignSelf: 'flex-start',
            }}
          >
            Sähköyhtiö
          </div>
        </div>

        {/* Middle: Provider name and info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: name.length > 20 ? '52px' : '64px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              display: 'flex',
            }}
          >
            {name}
          </div>

          {/* Info pills */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
            }}
          >
            {contractCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                {contractCount} sopimusta
              </div>
            )}
            {headquarters && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  gap: '8px',
                }}
              >
                <span>📍</span>
                <span>{headquarters}</span>
              </div>
            )}
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
              Valitse Sähkö
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
            valitsesahko.fi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
