import React, { useState } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'mug',
    name: 'Photo Mugs',
    tagline: 'Your memory, every morning.',
    price: 'From ₹299',
    desc: 'Premium ceramic mugs with your photo printed on them. Choose the style that suits your person.',
    img: '/products/mug.png',
    variants: [
      {
        name: 'Heart Handle Mug',
        price: '₹349',
        desc: 'White ceramic mug with a heart-shaped handle. A quiet way to say something warm. Available in green, yellow, white, or full-heart handle.',
        options: ['Green Handle', 'Yellow Handle', 'White Handle', 'Full Heart'],
      },
      {
        name: 'Metallic Mug',
        price: '₹399',
        desc: 'Shimmering metallic finish that catches the light. The photo sits on a surface that feels premium in the hand.',
        options: ['Gold', 'Silver', 'Pink'],
      },
      {
        name: 'Magic Mug',
        price: '₹449',
        desc: 'When cold it looks plain black. When you pour hot liquid in, the photo slowly appears. Always a surprise.',
        options: ['Black (single style)'],
      },
      {
        name: '2-Tone Mug',
        price: '₹299',
        desc: 'White exterior with a solid colored interior. Clean, modern look. Photo wraps around the outside.',
        options: ['Green', 'Pink', 'Black', 'Orange', 'Yellow'],
      },
      {
        name: 'Patch Mug',
        price: '₹299',
        desc: 'Photo is printed in a defined rectangular patch area on a white mug. Precise and tidy look.',
        options: ['Standard'],
      },
    ],
  },
  {
    id: 'keychain',
    name: 'Photo Keychains',
    tagline: 'A memory they carry everywhere.',
    price: 'From ₹199',
    desc: 'Crystal, acrylic and resin keychains with your photo printed inside. Lightweight, durable, personal.',
    img: '/products/keychain.png',
    variants: [
      {
        name: 'Crystal Keychain',
        price: '₹249',
        desc: 'Clear crystal glass with your photo embedded inside. Catches light beautifully. Available in multiple shapes.',
        options: ['Round', 'Heart', 'Rectangle', 'Oval'],
      },
      {
        name: 'Resin Keychain',
        price: '₹199',
        desc: 'Durable resin casing with photo print. Lightweight and scratch-resistant for everyday use.',
        options: ['Square', 'Circle', 'Custom Shape'],
      },
      {
        name: 'Couple Keychain',
        price: '₹299',
        desc: 'A pair of matching keychains — one for each person. The two pieces fit together like a puzzle.',
        options: ['Heart Split', 'Puzzle Piece'],
      },
    ],
  },
  {
    id: 'painting',
    name: 'Photo Paintings & Prints',
    tagline: 'Wall art that means something.',
    price: 'From ₹599',
    desc: 'Acrylic photo prints and canvas wall art that turn a photo into something worth hanging up.',
    img: '/products/painting.png',
    variants: [
      {
        name: 'Acrylic Photo Print',
        price: '₹599',
        desc: 'Your photo printed behind clear acrylic glass. The result is sharp, vivid and looks like a gallery piece. Available in four sizes.',
        options: ['12×8 inch', '16×12 inch', '20×16 inch', '24×18 inch'],
      },
      {
        name: 'Hand-Painted Style Print',
        price: '₹799',
        desc: 'Your photo hand-interpreted into a painterly canvas print with rich textures and tones — not a filter, a genuine artistic treatment by our designer.',
        options: ['Portrait', 'Landscape', 'Family'],
      },
      {
        name: 'Canvas Print',
        price: '₹699',
        desc: 'Photo printed on gallery-wrapped canvas. Stretched over a wooden frame, ready to hang straight out of the package.',
        options: ['Small', 'Medium', 'Large'],
      },
    ],
  },
  {
    id: 'pillow',
    name: 'Photo Pillow Covers',
    tagline: 'Something soft, something personal.',
    price: 'From ₹399',
    desc: 'Cushion covers with your photo printed on them. Soft enough for the sofa, meaningful enough to keep.',
    img: '/products/pillow.png',
    variants: [
      {
        name: 'Satin Cushion',
        price: '₹399',
        desc: 'Smooth satin fabric with full photo print. The photo looks clean and vivid. Comes in square and rectangle.',
        options: ['Square', 'Rectangle'],
      },
      {
        name: 'Fur Cushion',
        price: '₹499',
        desc: 'Soft fur fabric with photo printed on the front. Feels great in the hand. Available in heart and square shapes.',
        options: ['Heart — Pink', 'Heart — Blue', 'Square — Red'],
      },
      {
        name: 'Special Shape Cushion',
        price: '₹449',
        desc: 'Cushions in unique shapes with photo printed on them. Great for gifting to someone with specific interests.',
        options: ['Button', 'Pompom Square', 'Teddy Shape'],
      },
    ],
  },
  {
    id: 'stone',
    name: 'Photo Stones',
    tagline: 'A desk piece that stays.',
    price: 'From ₹499',
    desc: 'Natural slate stone with your photo printed directly onto the surface. Comes with a small display stand.',
    img: '/products/stone.png',
    variants: [
      {
        name: 'Rectangle Stone',
        price: '₹499',
        desc: 'The classic shape. Works well for group photos, couple photos, or family shots. Choose the size.',
        options: ['Small — 15×10 cm', 'Medium — 20×15 cm', 'Large — 40×25 cm'],
      },
      {
        name: 'Heart Stone',
        price: '₹549',
        desc: 'Heart-shaped slate stone. The photo is printed inside the heart outline — works especially well for close portraits.',
        options: ['Small', 'Medium'],
      },
      {
        name: 'Oval Stone',
        price: '₹529',
        desc: 'A rounded oval stone with a smooth edge. Sits comfortably on a desk or shelf.',
        options: ['Standard size'],
      },
    ],
  },
  {
    id: 'phonecase',
    name: 'Custom Phone Cases',
    tagline: 'Their photo, every time they pick up.',
    price: 'From ₹349',
    desc: 'Phone cases with your photo printed in vibrant, fade-resistant ink. Available for all popular phone models.',
    img: '/products/phonecase.png',
    variants: [
      {
        name: 'Hard Case',
        price: '₹349',
        desc: 'Rigid polycarbonate shell with full photo print. Slim and protective. Available in glossy or matte finish.',
        options: ['Glossy Finish', 'Matte Finish'],
      },
      {
        name: 'Soft Case',
        price: '₹399',
        desc: 'Flexible silicone case with photo printed on the back. Slightly grippy and shock-absorbing.',
        options: ['Clear Back', 'Full Color Back'],
      },
    ],
  },
];

export default function ProductCatalog({ onWhatsApp }) {
  // Which product category is open (full width expanded)
  const [activeCategory, setActiveCategory] = useState(null);
  // Which variant is selected within the open category
  const [activeVariant, setActiveVariant] = useState({});

  const openCategory = (catId) => {
    if (activeCategory === catId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(catId);
      // Default to first variant
      const cat = CATEGORIES.find(c => c.id === catId);
      if (cat) {
        setActiveVariant(prev => ({ ...prev, [catId]: cat.variants[0] }));
      }
    }
  };

  const selectVariant = (catId, variant) => {
    setActiveVariant(prev => ({ ...prev, [catId]: variant }));
  };

  return (
    <section id="products" style={{
      padding: '100px 0',
      background: 'var(--bg-warm)',
    }}>
      <div className="section-inner">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 20, marginBottom: 48,
        }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              marginBottom: 14, textTransform: 'uppercase',
            }}>
              What We Make
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: 'var(--ink)', fontWeight: 600, lineHeight: 1.1,
            }}>
              Six products, your photo,{' '}
              <span style={{ color: 'var(--brand-primary)', fontStyle: 'italic' }}>infinite combinations.</span>
            </h2>
          </div>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 320, lineHeight: 1.65 }}>
            Every product is printed with your photo. Click any item below to see the full range of styles available.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}>
          {CATEGORIES.map((cat) => {
            const isOpen = activeCategory === cat.id;
            const currentVariant = activeVariant[cat.id] || cat.variants[0];

            return (
              <div
                key={cat.id}
                style={{
                  // When open, span full grid width on desktop
                  gridColumn: isOpen ? '1 / -1' : 'auto',
                  background: '#ffffff',
                  borderRadius: 'var(--r-lg)',
                  border: `1.5px solid ${isOpen ? 'var(--brand-primary)' : 'var(--line)'}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  boxShadow: isOpen ? '0 16px 48px rgba(168,70,30,0.1)' : 'var(--shadow-sm)',
                }}
              >
                {/* Card Header — always visible, click to expand */}
                <button
                  onClick={() => openCategory(cat.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 0,
                    width: '100%', background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0, textAlign: 'left',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 96, height: 96, flexShrink: 0,
                    overflow: 'hidden', position: 'relative',
                  }}>
                    <img
                      src={cat.img}
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ padding: '16px 18px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: 'var(--brand-primary)',
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                      marginBottom: 4, fontFamily: 'var(--font-body)',
                    }}>
                      {cat.tagline}
                    </div>
                    <div style={{
                      fontSize: 17, fontWeight: 600, color: 'var(--ink)',
                      fontFamily: 'var(--font-display)', marginBottom: 2,
                    }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                      {cat.variants.length} styles available · {cat.price}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div style={{
                    padding: '0 20px',
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center',
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: isOpen ? 'var(--brand-primary)' : 'var(--bg-warm)',
                      border: isOpen ? 'none' : '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      color: isOpen ? '#fff' : 'var(--ink-muted)',
                      fontSize: 18, lineHeight: 1,
                      fontWeight: 300,
                    }}>
                      {isOpen ? '−' : '+'}
                    </div>
                  </div>
                </button>

                {/* Expanded Panel — variant explorer */}
                {isOpen && (
                      <div style={{
                        animation: 'fadeIn 0.25s ease',
                        borderTop: '1px solid var(--line)',
                      }}>
                    {/* Product description */}
                    <div style={{
                      padding: '18px 24px 0',
                    }}>
                      <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65, maxWidth: 720 }}>
                        {cat.desc}
                      </p>
                    </div>

                    {/* Variant Explorer — tab nav on left, detail on right */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '220px 1fr',
                      gap: 0,
                      margin: '20px 0 0',
                    }} className="variant-explorer">
                      {/* Left — Variant List */}
                      <div style={{
                        borderRight: '1px solid var(--line)',
                        padding: '4px 0',
                      }}>
                        {cat.variants.map((variant, idx) => {
                          const isSelected = currentVariant.name === variant.name;
                          return (
                            <button
                              key={variant.name}
                              onClick={() => selectVariant(cat.id, variant)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                width: '100%', padding: '14px 20px',
                                background: isSelected ? 'var(--brand-tint-90)' : 'transparent',
                                border: 'none',
                                borderLeft: isSelected ? '3px solid var(--brand-primary)' : '3px solid transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <div>
                                <div style={{
                                  fontSize: 14, fontWeight: isSelected ? 600 : 500,
                                  color: isSelected ? 'var(--brand-shade-20)' : 'var(--ink)',
                                  fontFamily: 'var(--font-body)',
                                  lineHeight: 1.3,
                                }}>
                                  {variant.name}
                                </div>
                                <div style={{
                                  fontSize: 12, color: isSelected ? 'var(--brand-primary)' : 'var(--ink-muted)',
                                  fontWeight: 600, marginTop: 2,
                                }}>
                                  {variant.price}
                                </div>
                              </div>
                              {isSelected && (
                                <ArrowRight size={14} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Right — Variant Detail */}
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{
                          display: 'flex', alignItems: 'flex-start',
                          justifyContent: 'space-between', gap: 20,
                          flexWrap: 'wrap',
                        }}>
                          <div style={{ flex: 1, minWidth: 240 }}>
                            <h4 style={{
                              fontSize: 20, fontWeight: 600, color: 'var(--ink)',
                              fontFamily: 'var(--font-display)', marginBottom: 6,
                            }}>
                              {currentVariant.name}
                            </h4>
                            <div style={{
                              fontSize: 15, fontWeight: 700, color: 'var(--brand-primary)',
                              marginBottom: 12,
                            }}>
                              {currentVariant.price}
                            </div>
                            <p style={{
                              fontSize: 15, color: 'var(--ink-soft)',
                              lineHeight: 1.7, marginBottom: 20, maxWidth: 460,
                            }}>
                              {currentVariant.desc}
                            </p>

                            {/* Options as clean tags */}
                            <div style={{ marginBottom: 20 }}>
                              <div style={{
                                fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)',
                                textTransform: 'uppercase', letterSpacing: '0.07em',
                                marginBottom: 10, fontFamily: 'var(--font-mono)',
                              }}>
                                Available options
                              </div>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {currentVariant.options.map((opt) => (
                                  <span
                                    key={opt}
                                    style={{
                                      fontSize: 13, padding: '6px 14px',
                                      borderRadius: 'var(--r-full)',
                                      background: 'var(--bg-warm)',
                                      color: 'var(--ink)',
                                      border: '1px solid var(--line)',
                                      fontWeight: 500,
                                      fontFamily: 'var(--font-body)',
                                    }}
                                  >
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Product image — variant view */}
                          <div style={{
                            width: 160, height: 160, flexShrink: 0,
                            borderRadius: 'var(--r-md)', overflow: 'hidden',
                            border: '1px solid var(--line)',
                          }}>
                            <img
                              src={cat.img}
                              alt={currentVariant.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <button
                          onClick={() => onWhatsApp(`${currentVariant.name} (${cat.name})`)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', fontSize: 14, fontWeight: 600,
                            background: '#25D366', color: '#ffffff', border: 'none',
                            borderRadius: 'var(--r-full)', cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <MessageCircle size={16} />
                          Enquire about this on WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .variant-explorer {
            grid-template-columns: 1fr !important;
          }
          .variant-explorer > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--line);
            display: flex;
            flex-wrap: wrap;
            gap: 0;
          }
          .variant-explorer > div:first-child button {
            width: auto;
            flex: 1;
            min-width: 140px;
            border-left: none !important;
            border-bottom: 2px solid transparent;
          }
        }
      `}</style>
    </section>
  );
}
