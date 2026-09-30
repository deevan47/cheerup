import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I send my photo?',
    a: 'You can upload your photo on our site during checkout, or simply share it with us on WhatsApp — whatever is easier for you. We accept all common formats (JPEG, PNG). The higher quality the photo, the better the print.'
  },
  {
    q: 'Will I see the gift before you print it?',
    a: 'Yes! Our designer creates a custom layout and sends you a digital preview proof on WhatsApp. You review it, request changes if needed, and approve before we start printing anything.'
  },
  {
    q: 'Can I request changes to the design?',
    a: 'Absolutely. You can ask for layout tweaks, photo re-cropping, color adjustments, or text formatting — as many times as you need. We want you to love it before we print it.'
  },
  {
    q: 'How fast is delivery across India?',
    a: 'Once you approve your design proof, we handcraft, print, and dispatch your gift within 24–48 hours. Pan-India delivery typically takes 2–3 business days after dispatch.'
  },
  {
    q: 'What products can I customize?',
    a: 'Custom mugs (heart-handle, metallic, magic, 2-tone), crystal keychains, acrylic paintings & canvas prints, satin/fur cushion covers, photo slate stones, and phone cases — all personalizable with your photo.'
  },
  {
    q: 'Do I pay full amount upfront?',
    a: 'No. You pay a small advance after approving the design proof. The remaining balance is due when the product is ready to ship. This way, you only commit after seeing exactly what you\'ll receive.'
  },
];

export default function ClarityFAQSection() {
  const [openIndex, setOpenIndex] = useState(1);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{
      padding: '100px 0',
      background: 'var(--bg-warm)',
      position: 'relative',
    }}>
      <div className="section-inner">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 48, maxWidth: 960, margin: '0 auto',
          alignItems: 'start',
        }} className="faq-layout">
          {/* Left — Header (sticky on desktop) */}
          <div className="faq-header" style={{ maxWidth: 360 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              marginBottom: 14, textTransform: 'uppercase',
            }}>
              FAQ
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: 'var(--ink)',
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: 14,
            }}>
              Got questions?
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6 }}>
              Everything you need to know about photos, design proofs, delivery, and payments.
            </p>
          </div>

          {/* Right — Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.q}
                  style={{
                    background: isOpen ? '#ffffff' : 'transparent',
                    borderRadius: 'var(--r-md)',
                    border: isOpen ? '1px solid var(--line)' : '1px solid transparent',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '18px 20px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', gap: 16,
                    }}
                  >
                    <h3 style={{
                      fontSize: 15, fontWeight: 600,
                      color: isOpen ? 'var(--ink)' : 'var(--ink-soft)',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.2s ease',
                      lineHeight: 1.4,
                    }}>
                      {faq.q}
                    </h3>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: isOpen ? 'var(--brand-primary)' : 'var(--line)',
                      color: isOpen ? '#ffffff' : 'var(--ink-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.25s ease',
                    }}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  {/* Smooth accordion — always rendered, height animated */}
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? '400px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div style={{
                      padding: '0 20px 20px',
                    }}>
                      <p style={{
                        fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7,
                        borderTop: '1px solid var(--line-soft)',
                        paddingTop: 14,
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .faq-layout {
            grid-template-columns: 0.35fr 0.65fr !important;
          }
          .faq-header {
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </section>
  );
}
