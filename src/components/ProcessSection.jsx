import React, { useState } from 'react';

const STAGES = [
  {
    num: '01',
    title: 'Pick a Product',
    desc: 'Choose from mugs, keychains, wall art, pillows, stones or phone cases. Any of them can carry your photo.',
    icon: '🛍️',
  },
  {
    num: '02',
    title: 'Send Your Photo',
    desc: 'Share your photo and any message or name you want printed. WhatsApp makes this simple.',
    icon: '📷',
  },
  {
    num: '03',
    title: 'Review the Design',
    desc: 'Our designer lays out the product and sends you a preview. You approve before anything is printed.',
    icon: '✅',
  },
  {
    num: '04',
    title: 'Delivered to the Door',
    desc: 'Printed with care, packed properly, and shipped pan-India within 2–3 days of dispatch.',
    icon: '📦',
  },
];

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="process" style={{
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
            How It Works
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 46px)',
            color: 'var(--ink)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            From your photo to{' '}
            <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic' }}>their smile.</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>
            Four simple steps — no complicated setup, zero surprises.
          </p>
        </div>

        {/* Steps with visual connectors */}
        <div className="process-steps-wrap" style={{ position: 'relative', marginBottom: 0 }}>
          {/* Horizontal connector line — desktop only, rendered behind the steps */}
          <div className="process-connector-line" style={{
            position: 'absolute',
            top: 28, left: '12.5%', right: '12.5%',
            height: 2,
            background: 'linear-gradient(90deg, var(--line) 0%, var(--brand-tint-90) 50%, var(--line) 100%)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            position: 'relative',
            zIndex: 1,
          }} className="process-steps-grid">
            {STAGES.map((s, idx) => {
              const isActive = activeStage === idx;
              const isCompleted = idx < activeStage;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStage(idx)}
                  style={{
                    padding: '0 16px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {/* Numbered circle badge */}
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: isActive ? 'var(--brand-primary)' : isCompleted ? 'var(--brand-tint-90)' : '#ffffff',
                    border: isActive
                      ? '3px solid var(--brand-primary)'
                      : isCompleted
                      ? '3px solid var(--brand-tint-60)'
                      : '3px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                    boxShadow: isActive ? 'var(--shadow-brand)' : 'var(--shadow-sm)',
                    transition: 'all 0.3s ease',
                    fontSize: 22,
                    zIndex: 2,
                    position: 'relative',
                  }}>
                    {isCompleted ? (
                      <span style={{ fontSize: 20 }}>✓</span>
                    ) : (
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <div style={{
                    fontSize: 10, fontWeight: 700,
                    color: isActive ? 'var(--brand-primary)' : 'var(--ink-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: 6,
                    letterSpacing: '0.08em',
                    transition: 'color 0.3s ease',
                  }}>
                    STEP {s.num}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 16, fontWeight: 600,
                    color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                    marginBottom: 8, fontFamily: 'var(--font-display)',
                    transition: 'color 0.3s ease',
                    lineHeight: 1.2,
                  }}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 13,
                    color: isActive ? 'var(--ink-soft)' : 'var(--ink-muted)',
                    lineHeight: 1.55,
                    transition: 'color 0.3s ease',
                    maxWidth: 200,
                  }}>
                    {s.desc}
                  </p>

                  {/* Active indicator at top (replaces the old borderTop approach) */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: '20%', right: '20%',
                      height: 3, background: 'var(--brand-primary)',
                      borderRadius: '3px 3px 0 0',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual demo — Product transformation showcase */}
        <div style={{
          marginTop: 40,
          background: '#ffffff',
          borderRadius: 'var(--r-xl)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr', gap: 0,
          }} className="process-demo-grid">
            {/* Before — Raw photo */}
            <div style={{
              padding: 32,
              background: 'var(--bg-warm)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                marginBottom: 16,
              }}>
                📱 YOUR PHOTO (RAW)
              </div>
              <div style={{
                width: 200, height: 200, borderRadius: 'var(--r-md)',
                overflow: 'hidden', border: '3px solid var(--line)',
                boxShadow: 'var(--shadow-md)',
                transform: 'rotate(-3deg)',
              }}>
                <img
                  src="/products/mug.png"
                  alt="Customer raw photo"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'grayscale(40%) sepia(20%) brightness(0.88) contrast(0.9)',
                  }}
                />
              </div>
              <div style={{
                marginTop: 14, fontSize: 12, color: 'var(--ink-muted)',
                fontFamily: 'var(--font-body)', fontStyle: 'italic',
              }}>
                Any photo you share on WhatsApp
              </div>
            </div>

            {/* Arrow */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--brand-primary)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, boxShadow: 'var(--shadow-brand)',
              }}>
                →
              </div>
            </div>

            {/* After — Final product */}
            <div style={{
              padding: 32,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                marginBottom: 16,
              }}>
                🎁 FINISHED PRODUCT
              </div>
              <div style={{
                width: 200, height: 200, borderRadius: 'var(--r-md)',
                overflow: 'hidden', border: '3px solid var(--brand-primary)',
                boxShadow: 'var(--shadow-brand)',
                transform: 'rotate(2deg)',
              }}>
                <img
                  src="/products/mug.png"
                  alt="Final printed mug"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'saturate(1.15) contrast(1.05) brightness(1.02)',
                  }}
                />
              </div>
              <div style={{
                marginTop: 14, fontSize: 12, color: 'var(--brand-primary)',
                fontFamily: 'var(--font-body)', fontWeight: 600,
              }}>
                Vibrant · Printed · Delivered in 2–3 days
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .process-demo-grid {
            grid-template-columns: 1fr auto 1fr !important;
          }
        }
        /* On mobile, show steps in 2×2 grid, hide connector line */
        @media (max-width: 640px) {
          .process-steps-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .process-connector-line {
            display: none !important;
          }
        }
        @media (min-width: 641px) {
          .process-steps-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
