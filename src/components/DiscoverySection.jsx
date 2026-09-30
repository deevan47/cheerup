import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const RECIPIENTS = [
  { id: 'mom', label: 'Mom', sub: 'Family photos, framed or printed' },
  { id: 'dad', label: 'Dad', sub: 'Desk keepsakes he will actually use' },
  { id: 'bestfriend', label: 'Best Friend', sub: 'Shared memories, made physical' },
  { id: 'partner', label: 'Partner', sub: 'A photo gift that feels personal' },
  { id: 'classmate', label: 'Classmate', sub: 'Group photo souvenirs' },
  { id: 'roommate', label: 'Roommate', sub: 'Hostel memories to keep' },
  { id: 'senior', label: 'Senior', sub: 'Farewell gifts that say it properly' },
  { id: 'teacher', label: 'Teacher', sub: 'A thank you worth keeping' },
];

const PRODUCT_RECS = {
  'mom': {
    product: 'Acrylic Photo Print',
    why: 'A sharp, gallery-quality print of your family photo. She can hang it in the living room and see it every day.',
    img: '/products/painting.png',
    price: 'From ₹599',
  },
  'dad': {
    product: 'Photo Slate Stone',
    why: 'A solid desk stone with a family photo printed on it. Sits well next to his laptop or on a bookshelf — understated but meaningful.',
    img: '/products/stone.png',
    price: 'From ₹499',
  },
  'bestfriend': {
    product: 'Heart Handle Mug',
    why: 'A mug with your trip photo on it. Every morning coffee or tea becomes a small reminder of that trip.',
    img: '/products/mug.png',
    price: 'From ₹349',
  },
  'partner': {
    product: 'Satin Photo Cushion',
    why: 'A soft cushion printed with your photo. The kind of thing that ends up on the sofa and stays there.',
    img: '/products/pillow.png',
    price: 'From ₹399',
  },
  'classmate': {
    product: 'Crystal Photo Keychain',
    why: 'A small, clear crystal keychain with your group photo inside. Light enough to carry, personal enough to matter.',
    img: '/products/keychain.png',
    price: 'From ₹249',
  },
  'roommate': {
    product: 'Magic Mug',
    why: 'The photo is invisible when the mug is cold. When they pour chai or coffee, the photo slowly appears. Worth the look on their face.',
    img: '/products/mug.png',
    price: 'From ₹449',
  },
  'senior': {
    product: 'Photo Slate Stone',
    why: 'An elegant stone with the batch photo printed on it. The kind of desk piece a person actually keeps for years.',
    img: '/products/stone.png',
    price: 'From ₹499',
  },
  'teacher': {
    product: 'Acrylic Photo Print',
    why: 'A well-printed photo of the class or a meaningful moment. Something worth putting up on a wall, not just a shelf.',
    img: '/products/painting.png',
    price: 'From ₹599',
  },
};

export default function DiscoverySection({ onWhatsApp }) {
  const [recipient, setRecipient] = useState(null);  // null = no selection yet

  const rec = recipient ? PRODUCT_RECS[recipient.id] : null;

  return (
    <section id="discovery" style={{
      padding: '100px 0',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, var(--line) 20%, var(--line) 80%, transparent 100%)',
      }} />

      <div className="section-inner">
        {/* Header */}
        <div style={{ maxWidth: 520, marginBottom: 40 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            marginBottom: 14, textTransform: 'uppercase',
          }}>
            Gift Guide
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: 'var(--ink)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12,
          }}>
            Not sure what to get?{' '}
            <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic' }}>Tell us who it's for.</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.65 }}>
            Pick the person you're gifting and we'll show you exactly what works — and why.
          </p>
        </div>

        {/* Recipient selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          {RECIPIENTS.map((r) => {
            const isSelected = recipient?.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRecipient(r)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--r-md)',
                  background: isSelected ? 'var(--ink)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--ink)',
                  border: `1.5px solid ${isSelected ? 'var(--ink)' : 'var(--line)'}`,
                  fontFamily: 'var(--font-body)',
                  fontSize: 14, fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 6px 20px rgba(28,26,23,0.12)' : 'none',
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Recommendation Card or Empty Prompt */}
        {!recipient ? (
          /* Empty state — nudge user to select */
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--r-xl)',
            border: '2px dashed var(--line)',
            padding: '56px 36px',
            textAlign: 'center',
            animation: 'fadeIn 0.25s ease',
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🎁</div>
            <h3 style={{
              fontSize: 22, fontWeight: 600, color: 'var(--ink)',
              fontFamily: 'var(--font-display)', marginBottom: 10,
            }}>
              Who are you gifting?
            </h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
              Select the person above and we'll show you exactly what to get — and why it works.
            </p>
          </div>
        ) : (
          /* Recommendation Card — fades in when recipient is selected */
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr',
            background: '#ffffff',
            borderRadius: 'var(--r-xl)',
            border: '1px solid var(--line)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 0.3s ease',
          }} className="rec-layout">
            {/* Image */}
            <div className="img-zoom" style={{ minHeight: 260, overflow: 'hidden', position: 'relative' }}>
              <img
                src={rec.img}
                alt={rec.product}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)',
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.07em',
                background: 'var(--brand-tint-90)', padding: '4px 12px', borderRadius: 'var(--r-full)',
                marginBottom: 14, display: 'inline-block', width: 'fit-content',
              }}>
                For {recipient.label}
              </div>

              <h3 style={{
                fontSize: 26, fontWeight: 600, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 10,
              }}>
                {rec.product}
              </h3>

              <p style={{
                color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.7, marginBottom: 12, maxWidth: 420,
              }}>
                {rec.why}
              </p>

              <div style={{
                fontSize: 18, fontWeight: 700, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 24,
              }}>
                {rec.price}
              </div>

              <button
                onClick={() => onWhatsApp(`${rec.product} for ${recipient.label}`)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', fontSize: 14, fontWeight: 600,
                  background: '#25D366', color: '#ffffff', border: 'none',
                  borderRadius: 'var(--r-full)', cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                  transition: 'all 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.77.463 3.432 1.27 4.873L2.05 21.95l5.198-1.364A9.954 9.954 0 0012.004 22c5.526 0 10.004-4.478 10.004-10.004C22.008 6.478 17.53 2 12.004 2z"/></svg>
                Ask about this on WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 700px) {
          .rec-layout {
            grid-template-columns: 0.45fr 0.55fr !important;
          }
          .rec-layout .img-zoom {
            min-height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
}
