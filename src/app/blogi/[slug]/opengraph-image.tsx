import { ImageResponse } from 'next/og';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';

export const alt = 'Valitse Sähkö blogi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = post?.title ?? 'Artikkeli';
  const categoryId = post?.category ?? '';
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.id === categoryId)?.label ?? 'Blogi';

  // Truncate title if too long
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
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
          }}
        />

        {/* Top section: category badge */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              {categoryLabel}
            </div>
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
              📖 {post?.readTime ?? 5} min lukuaika
            </div>
          </div>
        </div>

        {/* Middle: Title */}
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
