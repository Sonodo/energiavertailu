import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Valitse Sähkö — Vertaa ja valitse sopiva sähkösopimus';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #162540 50%, #0066FF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <span
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          Valitse Sähkö
        </span>
        <span
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
          }}
        >
          Vertaa ja valitse sopiva sähkösopimus
        </span>
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
            <span style={{ fontSize: '40px', fontWeight: 700 }}>37</span>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
              Sähköyhtiötä
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
            <span style={{ fontSize: '40px', fontWeight: 700 }}>92</span>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
              Sopimusta
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
            <span style={{ fontSize: '40px', fontWeight: 700 }}>Ilmainen</span>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
              Vertailupalvelu
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
