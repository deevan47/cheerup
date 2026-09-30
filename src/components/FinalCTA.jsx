import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FinalCTA({ onWhatsApp }) {
  return (
    <section style={{
      padding: '80px 0',
      background: 'var(--bg)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle warm glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,70,30,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-inner" style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Smile arc */}
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <svg width="100%" height="16" viewBox="0 0 80 16" fill="none" style={{ maxWidth: 120 }}>
            <path d="M4 3 Q40 15 76 3" stroke="var(--brand-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <h2 style={{
          fontSize: 'clamp(30px, 4.5vw, 48px)',
          fontWeight: 600,
          color: 'var(--ink)',
          lineHeight: 1.1,
          marginBottom: 14,
          fontFamily: 'var(--font-display)',
        }}>
          The gift isn't the product.
        </h2>

        <p style={{
          fontSize: 'clamp(17px, 2vw, 21px)', color: 'var(--brand-primary)',
          lineHeight: 1.4, fontFamily: 'var(--font-display)', fontWeight: 500,
          marginBottom: 14,
        }}>
          It's the moment they see their photo on it.
        </p>

        <p style={{
          fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.65,
          maxWidth: 420, margin: '0 auto 36px',
        }}>
          Tell us who it's for, share your photo, and we'll handle the rest — 
          design, printing, and delivery to their door.
        </p>

        <button
          onClick={() => onWhatsApp()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '16px 40px', fontSize: 15, fontWeight: 600,
            background: '#25D366', color: '#ffffff', border: 'none',
            borderRadius: 'var(--r-full)', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.25)'; }}
        >
          <MessageCircle size={18} />
          Start on WhatsApp
        </button>

        <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16, lineHeight: 1.5 }}>
          No app required. Just send us a message.
        </p>
      </div>
    </section>
  );
}
