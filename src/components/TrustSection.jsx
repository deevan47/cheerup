import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, ShieldCheck, Award, RefreshCw } from 'lucide-react';

const PROOF_SAMPLES = [
  { id: 'mug', name: 'Photo Mug', img: '/products/mug.png', msg: 'Here is your heart-handle mug design proof with your trip photo! Please check photo cropping and text formatting.' },
  { id: 'painting', name: 'Wall Canvas', img: '/products/painting.png', msg: 'Here is your acrylic canvas print preview with your anniversary date! Let me know if you want any changes.' },
  { id: 'pillow', name: 'Photo Cushion', img: '/products/pillow.png', msg: 'Here is your satin cushion cover proof with your family photo! I\'ve adjusted the colors for best print quality.' },
  { id: 'stone', name: 'Photo Stone', img: '/products/stone.png', msg: 'Here is your desk stone layout preview with your custom message! The text is centered below the photo.' },
];

export default function TrustSection() {
  const [activeProof, setActiveProof] = useState(0);

  const sample = PROOF_SAMPLES[activeProof];

  return (
    <section id="trust" style={{
      padding: '100px 0',
      background: 'var(--bg-warm)',
      position: 'relative',
    }}>
      <div className="section-inner">
        {/* Header — right-aligned this time for visual variety */}
        <div style={{
          maxWidth: 560, marginBottom: 48, textAlign: 'left',
        }} className="trust-header">
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            marginBottom: 14, textTransform: 'uppercase',
          }}>
            WhatsApp Design Preview
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 46px)',
            color: 'var(--ink)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            See it before we{' '}
            <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic' }}>print it.</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Our designer creates a custom layout and shares a preview on WhatsApp. You approve before we start printing.
          </p>
        </div>

        {/* WhatsApp Chat Simulation */}
        <div style={{
          maxWidth: 960, margin: '0 auto 32px',
          display: 'grid', gridTemplateColumns: '1fr', gap: 0,
          background: '#ffffff',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-lg)',
        }} className="proof-grid">
          
          {/* Left — Product preview */}
          <div style={{
            background: 'var(--bg-warm)',
            padding: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Product tabs */}
            <div style={{
              position: 'absolute', top: 16, left: 16, right: 16,
              display: 'flex', gap: 6, overflowX: 'auto',
            }}>
              {PROOF_SAMPLES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveProof(idx)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--r-full)',
                    background: activeProof === idx ? 'var(--ink)' : '#ffffff',
                    color: activeProof === idx ? '#ffffff' : 'var(--ink-soft)',
                    border: 'none',
                    fontSize: 12,
                    fontWeight: activeProof === idx ? 600 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-body)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div style={{
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-md)',
              maxWidth: 340,
              width: '100%',
              marginTop: 40,
            }}>
              <img
                src={sample.img}
                alt={sample.name}
                style={{ width: '100%', height: 280, objectFit: 'cover' }}
              />
              <div style={{
                background: 'var(--ink)', color: '#fff',
                padding: '8px 14px', fontSize: 11, fontWeight: 600,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                textAlign: 'center',
              }}>
                DESIGN PROOF PREVIEW
              </div>
            </div>
          </div>

          {/* Right — Chat conversation */}
          <div style={{
            padding: '32px 28px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            {/* WhatsApp badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, color: '#16a34a',
              background: '#f0fdf4', padding: '6px 14px', borderRadius: 'var(--r-full)',
              marginBottom: 20, border: '1px solid #bbf7d0', fontFamily: 'var(--font-body)',
              width: 'fit-content',
            }}>
              <MessageCircle size={14} /> WhatsApp Preview
            </div>

            <h3 style={{
              fontSize: 22, fontWeight: 600, color: 'var(--ink)',
              marginBottom: 20, fontFamily: 'var(--font-display)',
            }}>
              You're always in control.
            </h3>

            {/* Chat bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {/* Designer message */}
              <div style={{
                background: '#ffffff', border: '1px solid var(--line)',
                borderRadius: '16px 16px 16px 4px',
                padding: '12px 16px', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5,
                maxWidth: '90%',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)',
                  display: 'block', marginBottom: 4,
                }}>
                  Cheer Up Designer
                </span>
                "{sample.msg}"
              </div>

              {/* Customer reply */}
              <div style={{
                background: '#dcf8c6', border: '1px solid #c2e5a7',
                borderRadius: '16px 16px 4px 16px',
                padding: '12px 16px', fontSize: 14, color: '#111b21', lineHeight: 1.5,
                alignSelf: 'flex-end', maxWidth: '85%',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#16a34a',
                  display: 'block', marginBottom: 4,
                }}>
                  You
                </span>
                "Looks perfect! Approved for printing 🎉"
              </div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: '#16a34a',
            }}>
              <CheckCircle2 size={16} />
              We only print after your explicit approval.
            </div>
          </div>
        </div>

        {/* Trust guarantee cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 16,
          maxWidth: 960, margin: '0 auto',
        }}>
          {[
            { icon: <RefreshCw size={20} />, title: 'Unlimited Revisions', desc: 'Tweak photo cropping, text, and colors until it\'s perfect.' },
            { icon: <ShieldCheck size={20} />, title: 'Zero Surprises', desc: 'What you see in your WhatsApp preview is what arrives at your door.' },
            { icon: <Award size={20} />, title: 'Premium Quality', desc: 'Vibrant fade-resistant printing on high-grade materials, checked by hand.' },
          ].map((card) => (
            <div
              key={card.title}
              className="card-lift"
              style={{
                background: '#ffffff', borderRadius: 'var(--r-md)', padding: '24px 22px',
                border: '1px solid var(--line)',
              }}
            >
              <div style={{ color: 'var(--brand-primary)', marginBottom: 12 }}>{card.icon}</div>
              <h4 style={{
                fontSize: 16, fontWeight: 600, color: 'var(--ink)',
                marginBottom: 6, fontFamily: 'var(--font-display)',
              }}>
                {card.title}
              </h4>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .proof-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
        @media (max-width: 768px) {
          .trust-header {
            text-align: left !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
