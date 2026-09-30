import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const SHOWCASE_PRODUCTS = [
  { name: 'Photo Mug', img: '/products/mug.png', label: 'Custom Printed Mug', price: 'From ₹299' },
  { name: 'Photo Keychain', img: '/products/keychain.png', label: 'Crystal Photo Keychain', price: 'From ₹199' },
  { name: 'Acrylic Painting', img: '/products/painting.png', label: 'Wall Art & Canvas Prints', price: 'From ₹599' },
  { name: 'Photo Pillow', img: '/products/pillow.png', label: 'Cushion Cover', price: 'From ₹399' },
  { name: 'Photo Stone', img: '/products/stone.png', label: 'Desk Photo Stone', price: 'From ₹499' },
  { name: 'Phone Case', img: '/products/phonecase.png', label: 'Custom Phone Cover', price: 'From ₹349' },
];

export default function HeroSection({ onNavigate, onWhatsApp }) {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveProduct((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
        setIsTransitioning(false);
      }, 320);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = SHOWCASE_PRODUCTS[activeProduct];

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Rich layered background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(150deg, #FDFCFA 0%, #FFF5EC 28%, #F6F3EE 60%, #F0EBE3 100%)',
      }} />
      {/* Warm glow blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,70,30,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-8%', left: '-8%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(222,138,87,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(168,70,30,0.045) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 90, paddingBottom: 70 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 56,
          alignItems: 'center',
        }}>

          {/* Left — Copy */}
          <div style={{ maxWidth: 600 }}>
            {/* Pill label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(168,70,30,0.07)', border: '1px solid rgba(168,70,30,0.16)',
              borderRadius: 'var(--r-full)', padding: '7px 18px', marginBottom: 28,
              animation: 'fadeInUp 0.65s ease both',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--brand-primary)', display: 'inline-block',
                boxShadow: '0 0 6px rgba(168,70,30,0.5)',
                animation: 'pulse-glow 2.5s ease infinite',
              }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)', letterSpacing: '0.05em' }}>
                Hand-crafted in India · Shipped pan-India
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(40px, 5.8vw, 68px)',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: 'var(--ink)',
              marginBottom: 22,
              fontFamily: 'var(--font-display)',
              animation: 'fadeInUp 0.65s ease 0.1s both',
            }}>
              Your photo,{' '}
              <br className="hide-mobile" />
              on something{' '}
              <br className="hide-mobile" />
              <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic', position: 'relative', display: 'inline-block' }}>
                they'll keep forever.
                <svg viewBox="0 0 240 10" fill="none"
                  style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', height: 10 }}>
                  <path d="M3 7 Q120 1 237 7" stroke="var(--brand-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: 'var(--ink-soft)',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 500,
              animation: 'fadeInUp 0.65s ease 0.2s both',
            }}>
              Send us your photo — we design it, show you a preview on WhatsApp, and ship a printed gift to their door.
              Mugs, keychains, canvas prints, cushions, stones and phone cases.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
              animation: 'fadeInUp 0.65s ease 0.3s both',
            }}>
              <button
                onClick={() => onNavigate('products')}
                className="btn btn-primary"
                style={{ padding: '15px 36px', fontSize: 15 }}
              >
                See All Products <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onWhatsApp()}
                className="btn btn-secondary"
                style={{ padding: '15px 26px', fontSize: 14, gap: 8 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.478 2 2 6.478 2 12c0 1.77.463 3.432 1.27 4.873L2.05 21.95l5.198-1.364A9.954 9.954 0 0012 22c5.522 0 10-4.478 10-10S17.522 2 12 2z"/>
                </svg>
                WhatsApp Us
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 0, marginTop: 44,
              paddingTop: 28, borderTop: '1px solid var(--line-soft)',
              animation: 'fadeInUp 0.65s ease 0.4s both',
            }}>
              {[
                { num: '2,400+', label: 'Gifts delivered' },
                { num: '4.9 / 5', label: 'Customer rating' },
                { num: '2–3 days', label: 'Delivery' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  flex: 1,
                  paddingLeft: i === 0 ? 0 : 24,
                  borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
                }}>
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: 'var(--ink)',
                    fontFamily: 'var(--font-display)', lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-muted)', fontWeight: 600, marginTop: 4, letterSpacing: '0.02em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Showcase Card */}
          <div style={{ position: 'relative', animation: 'fadeInUp 0.8s ease 0.15s both' }}>
            {/* Decorative glow behind card */}
            <div style={{
              position: 'absolute', inset: -24,
              background: 'radial-gradient(ellipse at center, rgba(168,70,30,0.09) 0%, transparent 70%)',
              borderRadius: 'var(--r-2xl)',
              pointerEvents: 'none',
            }} />

            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--r-2xl)',
              border: '1px solid rgba(231,226,216,0.8)',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(28,26,23,0.14), 0 8px 24px rgba(28,26,23,0.06)',
              position: 'relative',
            }}>
              {/* Image area */}
              <div style={{ height: 380, background: 'var(--bg-warm)', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={current.img}
                  alt={current.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'scale(1.06)' : 'scale(1)',
                    transition: 'opacity 0.32s ease, transform 0.32s ease',
                  }}
                />
                {/* Gradient overlay bottom */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(28,26,23,0.35) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }} />
                {/* Top-left badge */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'linear-gradient(135deg, rgba(168,70,30,0.95), rgba(192,85,32,0.95))',
                  backdropFilter: 'blur(12px)',
                  color: '#fff', padding: '7px 16px', borderRadius: 'var(--r-full)',
                  fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-body)',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 16px rgba(168,70,30,0.3)',
                }}>
                  📷 Your photo on this
                </div>
                {/* Bottom-left price */}
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: 'rgba(28,26,23,0.88)', backdropFilter: 'blur(12px)',
                  color: '#fff', padding: '8px 16px', borderRadius: 'var(--r-full)',
                  fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}>
                  {current.price}
                </div>
              </div>

              {/* Product info row */}
              <div style={{ padding: '18px 24px 10px', background: '#fff' }}>
                <div style={{
                  fontSize: 17, fontWeight: 600, color: 'var(--ink)',
                  fontFamily: 'var(--font-display)', letterSpacing: '-0.01em',
                }}>
                  {current.name}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 3, fontWeight: 500 }}>
                  {current.label}
                </div>
              </div>

              {/* Dot nav */}
              <div style={{ padding: '10px 24px 18px', display: 'flex', gap: 6, alignItems: 'center' }}>
                {SHOWCASE_PRODUCTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => { setActiveProduct(idx); setIsTransitioning(false); }, 160);
                    }}
                    style={{
                      width: activeProduct === idx ? 28 : 8,
                      height: 8, borderRadius: 4,
                      background: activeProduct === idx
                        ? 'linear-gradient(90deg, var(--brand-primary), var(--brand-tint-60))'
                        : 'var(--line)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', padding: 0,
                      boxShadow: activeProduct === idx ? 'var(--shadow-brand)' : 'none',
                    }}
                    aria-label={`View ${SHOWCASE_PRODUCTS[idx].name}`}
                  />
                ))}
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-muted)', fontWeight: 600 }}>
                  {activeProduct + 1} / {SHOWCASE_PRODUCTS.length}
                </span>
              </div>
            </div>

            {/* Side thumbnails — only on wide desktop to avoid overflow */}
            <div className="hero-thumbs" style={{
              position: 'absolute', top: 28, right: -60,
              display: 'flex', flexDirection: 'column', gap: 9,
            }}>
              {SHOWCASE_PRODUCTS.slice(0, 4).map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => { setActiveProduct(idx); setIsTransitioning(false); }, 160);
                  }}
                  style={{
                    width: 54, height: 54, borderRadius: 'var(--r-md)',
                    overflow: 'hidden',
                    border: activeProduct === idx ? '2.5px solid var(--brand-primary)' : '2px solid var(--line)',
                    cursor: 'pointer', padding: 0,
                    boxShadow: activeProduct === idx ? 'var(--shadow-brand)' : 'var(--shadow-md)',
                    transition: 'all 0.25s ease',
                    animation: `fadeInUp 0.55s ease ${0.35 + idx * 0.09}s both`,
                    transform: activeProduct === idx ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.1fr 0.9fr !important; }
        }
        .hero-thumbs { display: none !important; }
        @media (min-width: 1160px) {
          .hero-thumbs { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
