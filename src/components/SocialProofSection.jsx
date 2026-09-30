import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1, name: 'Priya Sharma', occasion: 'Best Friend Birthday', product: 'Heart Handle Mug',
    img: '/products/mug.png',
    comment: 'Ordered a heart-handle mug with our trip photo for my bestie. The WhatsApp design preview was really reassuring — I could see exactly how it would look before they printed it. She absolutely loved it.',
    note: 'Goa Trip — Custom Mug', date: '2 days ago'
  },
  {
    id: 2, name: 'Arjun Mehta', occasion: 'Anniversary Surprise', product: 'Acrylic Photo Canvas',
    img: '/products/painting.png',
    comment: 'Got a large acrylic canvas print of our wedding photo. The glossy finish looks museum-quality on our living room wall. Way better than I expected for the price.',
    note: 'Wedding Anniversary — Acrylic Print', date: '1 week ago'
  },
  {
    id: 3, name: 'Sneha Roy', occasion: 'Farewell Keepsake', product: 'Photo Slate Stone',
    img: '/products/stone.png',
    comment: 'Gave my senior a photo stone with our batch photo as a farewell gift. He keeps it on his office desk. It\'s the kind of thing you actually keep, not just put away.',
    note: 'Farewell — Batch Photo Stone', date: '2 weeks ago'
  },
  {
    id: 4, name: 'Rohit Desai', occasion: "Mom's Birthday", product: 'Satin Pillow Cover',
    img: '/products/pillow.png',
    comment: 'Got a satin cushion with our family photo for mom\'s birthday. She keeps it on the sofa and shows it off to everyone who comes over. One of the better gifts I\'ve given.',
    note: "Mom's Birthday — Family Cushion", date: '3 weeks ago'
  },
];


export default function SocialProofSection() {
  const [activeReview, setActiveReview] = useState(0);

  return (
    <section id="reviews" style={{
      padding: '100px 0',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1, background: 'linear-gradient(90deg, transparent 0%, var(--line) 20%, var(--line) 80%, transparent 100%)',
      }} />

      <div className="section-inner">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            marginBottom: 14, textTransform: 'uppercase',
          }}>
            Customer Stories
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 46px)',
            color: 'var(--ink)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            Real gifts, real{' '}
            <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic' }}>smiles.</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>
            Over 2,400 custom photo gifts handcrafted & delivered across India.
          </p>
        </div>

        {/* Featured Review — Large */}
        <div style={{
          maxWidth: 960, margin: '0 auto 28px',
          display: 'grid', gridTemplateColumns: '1fr', gap: 0,
          background: '#ffffff',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-lg)',
        }} className="review-featured-grid">
          {/* Product Image */}
          <div className="img-zoom" style={{
            height: 300,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={REVIEWS[activeReview].img}
              alt={REVIEWS[activeReview].product}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: 14, left: 14,
              background: 'rgba(28,26,23,0.85)', backdropFilter: 'blur(8px)',
              color: '#fff', padding: '6px 14px', borderRadius: 'var(--r-full)',
              fontSize: 12, fontWeight: 600,
            }}>
              {REVIEWS[activeReview].note}
            </div>
          </div>

          {/* Review Content */}
          <div
            key={activeReview}  /* key forces fadeIn animation on every swap (#12) */
            style={{
              padding: '36px 32px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            {/* Quote */}
            <div style={{ position: 'relative', marginBottom: 24 }}>
              <Quote size={28} style={{
                color: 'var(--brand-tint-90)',
                position: 'absolute', top: -8, left: -4,
              }} />
              <p style={{
                fontSize: 17, color: 'var(--ink)', lineHeight: 1.6,
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontStyle: 'italic', paddingLeft: 28,
              }}>
                {REVIEWS[activeReview].comment}
              </p>
            </div>

            {/* Author */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              paddingTop: 16, borderTop: '1px solid var(--line-soft)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--brand-tint-90)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: 'var(--brand-primary)',
                flexShrink: 0,
              }}>
                {REVIEWS[activeReview].name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15, fontWeight: 600, color: 'var(--ink)',
                }}>
                  {REVIEWS[activeReview].name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 1 }}>
                  {REVIEWS[activeReview].occasion} &bull; {REVIEWS[activeReview].product}
                </div>
              </div>
              {/* WhatsApp verified badge — more credible than a checkmark */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 'var(--r-full)', padding: '4px 10px',
                fontSize: 11, fontWeight: 700, color: '#16a34a',
                flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.478 2 2 6.478 2 12c0 1.77.463 3.432 1.27 4.873L2.05 21.95l5.198-1.364A9.954 9.954 0 0012 22c5.522 0 10-4.478 10-10S17.522 2 12 2z"/></svg>
                Ordered via WhatsApp
              </div>
            </div>
          </div>
        </div>

        {/* Review Selector Thumbnails */}
        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {REVIEWS.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setActiveReview(idx)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 18px',
                borderRadius: 'var(--r-full)',
                background: activeReview === idx ? 'var(--ink)' : '#ffffff',
                color: activeReview === idx ? '#ffffff' : 'var(--ink-soft)',
                border: `1.5px solid ${activeReview === idx ? 'var(--ink)' : 'var(--line)'}`,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: activeReview === idx ? 600 : 500,
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
              }}
            >
              <img
                src={r.img}
                alt=""
                style={{
                  width: 24, height: 24, borderRadius: '50%', objectFit: 'cover',
                  border: activeReview === idx ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--line)',
                }}
              />
              {r.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .review-featured-grid {
            grid-template-columns: 0.45fr 0.55fr !important;
          }
          .review-featured-grid .img-zoom {
            height: auto !important;
            min-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
