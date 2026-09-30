import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar({ onNavigate, onWhatsApp }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Products', id: 'products' },
    { label: 'How It Works', id: 'process' },
    { label: 'Why Us', id: 'difference' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled
        ? 'rgba(253,252,250,0.96)'
        : 'rgba(253,252,250,0.88)',
      backdropFilter: 'blur(20px) saturate(1.6)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'rgba(231,226,216,0.5)'}`,
      boxShadow: scrolled ? '0 4px 24px rgba(28,26,23,0.08), 0 1px 4px rgba(28,26,23,0.04)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="section-inner" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 80,
      }}>

        {/* Brand — Logo + Name */}
        <button
          onClick={() => handleNavClick('hero')}
          aria-label="Cheer Up — Home"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          {/*
            The logo PNG is 1024×1024 with ~20% padding on every side.
            The actual orange artwork sits roughly in the centre 60% of the image.
            Strategy: render the img at a large intrinsic size (120px wide)
            then clip the container to the artwork area only, cropping the whitespace.
            The logo mark is wide (~2:1), so we crop ~12% from each side vertically
            and ~8% from top/bottom to expose only the orange graphic.
          */}
          <div style={{
            width: 110,
            height: 52,
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
          }}>
            <img
              src="/logo.png"
              alt="Cheer Up"
              style={{
                /* Render bigger than the container so the padded whitespace gets cropped */
                width: 148,
                height: 148,
                objectFit: 'cover',
                position: 'absolute',
                /* Pull image up & left to centre the orange artwork in the container */
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          {/* Brand Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 26,
              background: 'linear-gradient(135deg, var(--ink) 0%, #3d3830 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              display: 'block',
            }}>
              Cheer Up
            </span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--brand-primary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              opacity: 0.9,
            }}>
              Photo Gifts
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14, fontWeight: 500,
                color: 'var(--ink-soft)',
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 0',
                letterSpacing: '0.01em',
                transition: 'color 0.18s ease',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--brand-primary)';
                e.target.style.borderBottomColor = 'var(--brand-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--ink-soft)';
                e.target.style.borderBottomColor = 'transparent';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right — CTA + mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => onWhatsApp()}
            className="btn btn-primary hide-mobile"
            style={{ padding: '11px 22px', fontSize: 14, gap: 7, boxShadow: '0 4px 16px rgba(168,70,30,0.28)' }}
          >
            <MessageCircle size={14} />
            Enquire on WhatsApp
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--ink)', padding: 6, lineHeight: 0,
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '8px 24px 24px',
          background: 'var(--bg)',
          borderTop: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', gap: 0,
          animation: 'fadeIn 0.18s ease',
        }}>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
                color: 'var(--ink)', background: 'none', border: 'none',
                textAlign: 'left', padding: '13px 0', cursor: 'pointer',
                borderBottom: '1px solid var(--line-soft)',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileMenuOpen(false); onWhatsApp(); }}
            className="btn btn-primary"
            style={{ marginTop: 16, width: '100%', padding: '14px 0', justifyContent: 'center', gap: 8 }}
          >
            <MessageCircle size={15} />
            Enquire on WhatsApp
          </button>
        </div>
      )}
    </header>
  );
}
