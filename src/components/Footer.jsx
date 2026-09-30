import React from 'react';
import { Heart, MessageCircle, Mail } from 'lucide-react';

export default function Footer({ onNavigate, onWhatsApp }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'rgba(255,255,255,0.6)',
      padding: '56px 24px 28px',
    }}>
      <div className="section-inner">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 36, paddingBottom: 36,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }} className="footer-grid">

          {/* Brand */}
          <div>
            {/* Logo + Name — same crop technique as navbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              {/* Clip the whitespace padding out of the 1024×1024 PNG */}
              <div style={{
                width: 110, height: 52,
                overflow: 'hidden', flexShrink: 0, position: 'relative',
              }}>
                <img
                  src="/logo.png"
                  alt="Cheer Up"
                  style={{
                    width: 148, height: 148,
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    /* Invert orange to white for dark footer */
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.9,
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 22, color: '#ffffff',
                  lineHeight: 1, letterSpacing: '-0.03em', display: 'block',
                }}>
                  Cheer Up
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
                  color: 'var(--brand-tint-60)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', display: 'block',
                }}>
                  Photo Gifts
                </span>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 280 }}>
              We take your photo and put it on something that lasts. Custom gifts, designed by hand, shipped across India.
            </p>
          </div>


          {/* Navigation */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>
              Navigate
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Our Products', id: 'products' },
                { label: 'Gift Guide', id: 'discovery' },
                { label: 'How It Works', id: 'process' },
                { label: 'Reviews', id: 'reviews' },
                { label: 'FAQ', id: 'faq' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  style={{
                    background: 'none', border: 'none', fontSize: 14,
                    color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                    textAlign: 'left', padding: 0,
                    transition: 'color 0.2s', fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <button
                onClick={() => onWhatsApp()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: '#25D366', background: 'none', border: 'none',
                  cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)',
                  textAlign: 'left',
                }}
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </button>
              <a
                href="mailto:hello@cheerup.in"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                }}
              >
                <Mail size={16} />
                hello@cheerup.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, gap: 12,
        }}>
          <span>© {currentYear} Cheer Up. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.35)' }}>
            Made with care in India
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.2fr 0.8fr 0.8fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
