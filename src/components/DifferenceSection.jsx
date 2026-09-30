import React from 'react';
import { CheckCircle2, Heart, X as XIcon } from 'lucide-react';

export default function DifferenceSection() {
  return (
    <section id="difference" style={{
      padding: '100px 0',
      background: 'var(--ink)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(168,70,30,0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 48px' }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--brand-tint-60)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            marginBottom: 14, textTransform: 'uppercase',
          }}>
            The Cheer Up Difference
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 46px)',
            color: '#ffffff',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 14,
          }}>
            Not generic stuff.<br />
            Made <span style={{ color: 'var(--brand-tint-60)', fontStyle: 'italic' }}>specifically for them.</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6,
            maxWidth: 520, margin: '0 auto',
          }}>
            We believe meaningful gifts shouldn't come from automated lines.
            Every Cheer Up gift is crafted by a dedicated designer who cares about your photos and memories.
          </p>
        </div>

        {/* Comparison Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 20, maxWidth: 900, margin: '0 auto',
        }} className="diff-grid">
          
          {/* Generic gifts */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '32px 28px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
              marginBottom: 20,
            }}>
              MASS-PRODUCED GIFTS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Generic templates anyone can buy',
                'You guess how it will look',
                'Pay 100% upfront, hope for the best',
                'Random print quality',
              ].map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 15, color: 'rgba(255,255,255,0.5)',
                }}>
                  <XIcon size={16} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cheer Up */}
          <div style={{
            background: 'rgba(168,70,30,0.15)',
            borderRadius: 'var(--r-lg)',
            border: '1.5px solid rgba(168,70,30,0.3)',
            padding: '32px 28px',
            position: 'relative',
            marginTop: 14,  /* Space for the badge on all screen sizes */
          }}>
            {/* Badge */}
            <div style={{
              position: 'absolute', top: -12, right: 24,
              background: 'var(--brand-primary)', color: '#fff',
              fontSize: 11, fontWeight: 700, padding: '5px 16px',
              borderRadius: 'var(--r-full)',
              fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
              boxShadow: 'var(--shadow-brand)',
            }}>
              CHEER UP
            </div>

            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--brand-tint-60)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
              marginBottom: 20,
            }}>
              HANDCRAFTED BY OUR DESIGNER
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                '100% customized around your photo & message',
                'See a design preview before we print',
                'Small advance after approving the design',
                'Verified quality — checked by hand',
              ].map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 15, color: '#ffffff',
                }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--brand-tint-60)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: '1px solid rgba(168,70,30,0.2)',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 600, color: 'var(--brand-tint-90)',
            }}>
              <Heart size={16} style={{ color: 'var(--brand-tint-60)' }} />
              Guaranteed to bring a genuine smile.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .diff-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
