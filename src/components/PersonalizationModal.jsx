import React, { useState } from 'react';
import { X, Upload, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { id: 'mug', name: 'Custom Photo Mug', img: '/products/mug.png', price: 299 },
  { id: 'keychain', name: 'Photo Keychain', img: '/products/keychain.png', price: 199 },
  { id: 'painting', name: 'Photo Painting', img: '/products/painting.png', price: 599 },
  { id: 'pillow', name: 'Photo Pillow Cover', img: '/products/pillow.png', price: 399 },
  { id: 'stone', name: 'Photo Stone', img: '/products/stone.png', price: 499 },
  { id: 'phonecase', name: 'Custom Phone Case', img: '/products/phonecase.png', price: 349 },
];

const VARIANT_MAP = {
  mug: ['Heart Handle Mug', 'Metallic Mug', 'Magic Mug', '2-Tone Mug', 'Patch Mug'],
  keychain: ['Crystal Keychain', 'Resin Keychain', 'Couple Keychain'],
  painting: ['Acrylic Photo Print', 'Hand-Painted Style Print', 'Canvas Print'],
  pillow: ['Satin Cushion', 'Fur Cushion', 'Special Shape Cushion'],
  stone: ['Rectangle Stone', 'Heart Stone', 'Oval Stone'],
  phonecase: ['Hard Case', 'Soft Case'],
};

const STEP_LABELS = ['Product', 'Variant', 'Photo', 'Message', 'Order'];

export default function PersonalizationModal({ isOpen, onClose, initialRecipient, initialProduct, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      if (initialProduct) {
        const foundCat = PRODUCT_CATEGORIES.find(c =>
          c.name.toLowerCase().includes(initialProduct.toLowerCase()) ||
          initialProduct.toLowerCase().includes(c.name.toLowerCase())
        );
        if (foundCat) {
          setSelectedCategory(foundCat);
          setSelectedVariant('');
          setStep(2);
        } else {
          for (const cat of PRODUCT_CATEGORIES) {
            const vars = VARIANT_MAP[cat.id] || [];
            const matchVar = vars.find(v => v.toLowerCase().includes(initialProduct.toLowerCase()));
            if (matchVar) {
              setSelectedCategory(cat);
              setSelectedVariant(matchVar);
              setStep(3);
              break;
            }
          }
        }
      } else {
        setStep(1);
      }
    }
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  const variants = VARIANT_MAP[selectedCategory.id] || [];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Cheer Up! 👋\n\nI'd like to order a personalized gift:\n\n📦 Product: ${selectedCategory.name}${selectedVariant ? `\n🎨 Variant: ${selectedVariant}` : ''}${message ? `\n💬 Message: ${message}` : ''}\n\nI'll share my photo here. Please send a design preview before printing! 🙏`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    onClose();
  };

  const handleFinish = () => {
    onAddToCart({
      id: `gift-${Date.now()}`,
      title: `Cheer Up ${selectedVariant || selectedCategory.name}`,
      price: selectedCategory.price,
      photo: photoPreview || selectedCategory.img,
      details: message,
    });
    onClose();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(28, 26, 23, 0.6)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        background: '#ffffff', borderRadius: 'var(--r-xl)',
        maxWidth: 640, width: '100%', overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)', position: 'relative',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        animation: 'scaleIn 0.25s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px', borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Step dots */}
            <div style={{ display: 'flex', gap: 4 }}>
              {STEP_LABELS.map((label, idx) => (
                <div
                  key={label}
                  style={{
                    width: idx + 1 === step ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: idx + 1 <= step ? 'var(--brand-primary)' : 'var(--line)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
            <span style={{
              fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)',
            }}>
              {STEP_LABELS[step - 1]}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-warm)', border: 'none', cursor: 'pointer',
              color: 'var(--ink-soft)', padding: 6, borderRadius: '50%',
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          
          {/* STEP 1: Product */}
          {step === 1 && (
            <div>
              <h3 style={{
                fontSize: 20, fontWeight: 600, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 20,
              }}>
                What are you creating?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat); setSelectedVariant(''); }}
                    style={{
                      padding: 0, borderRadius: 'var(--r-md)',
                      border: `2px solid ${selectedCategory.id === cat.id ? 'var(--brand-primary)' : 'var(--line)'}`,
                      background: selectedCategory.id === cat.id ? 'var(--brand-tint-90)' : '#ffffff',
                      cursor: 'pointer', textAlign: 'center', overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ height: 80, overflow: 'hidden' }}>
                      <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{
                      padding: '10px 6px 8px', fontSize: 12, fontWeight: 600,
                      color: selectedCategory.id === cat.id ? 'var(--brand-shade-20)' : 'var(--ink)',
                    }}>
                      {cat.name}
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)',
                      paddingBottom: 8,
                    }}>
                      ₹{cat.price}+
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Variant */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <img src={selectedCategory.img} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--line)' }} />
                <div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Creating</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{selectedCategory.name}</div>
                </div>
              </div>
              <h3 style={{
                fontSize: 18, fontWeight: 600, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 16,
              }}>
                Pick a style
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      padding: '16px 14px', borderRadius: 'var(--r-md)',
                      border: `1.5px solid ${selectedVariant === v ? 'var(--brand-primary)' : 'var(--line)'}`,
                      background: selectedVariant === v ? 'var(--brand-tint-90)' : '#ffffff',
                      color: selectedVariant === v ? 'var(--brand-shade-20)' : 'var(--ink)',
                      fontWeight: selectedVariant === v ? 700 : 500,
                      cursor: 'pointer', fontSize: 13, textAlign: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Photo */}
          {step === 3 && (
            <div>
              <h3 style={{
                fontSize: 18, fontWeight: 600, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 16,
              }}>
                Upload your photo
              </h3>
              <div style={{
                border: `2px dashed ${photoPreview ? 'var(--brand-primary)' : 'var(--line)'}`,
                borderRadius: 'var(--r-lg)',
                padding: 32, textAlign: 'center',
                background: photoPreview ? 'var(--brand-tint-90)' : 'var(--bg-warm)',
                transition: 'all 0.2s ease',
              }}>
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Uploaded"
                    style={{
                      width: 180, height: 180, objectFit: 'cover',
                      borderRadius: 'var(--r-md)', margin: '0 auto 16px',
                      border: '3px solid #fff', boxShadow: 'var(--shadow-md)',
                    }}
                  />
                ) : (
                  <div style={{
                    width: 120, height: 120, borderRadius: 'var(--r-md)', margin: '0 auto 16px',
                    background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink-muted)', fontSize: 36,
                  }}>
                    📷
                  </div>
                )}
                <label className="btn btn-secondary" style={{ fontSize: 13, cursor: 'pointer', gap: 6 }}>
                  <Upload size={14} /> {photoPreview ? 'Change Photo' : 'Choose Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    style={{ display: 'none' }}
                  />
                </label>
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 12 }}>
                  You can also share your photo on WhatsApp later
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Message */}
          {step === 4 && (
            <div>
              <h3 style={{
                fontSize: 18, fontWeight: 600, color: 'var(--ink)',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>
                Add a personal touch
              </h3>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
                Optional — add a name, date, or message to print on the gift.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Priya! — Love, your bestie 💕"
                rows={3}
                style={{
                  width: '100%', fontFamily: 'var(--font-body)',
                  fontSize: 14, padding: '14px 16px',
                  border: '1.5px solid var(--line)', borderRadius: 'var(--r-md)',
                  background: 'var(--bg-card)', color: 'var(--ink)',
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
              />
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8 }}>
                Our designer will format this beautifully on your product.
              </p>
            </div>
          )}

          {/* STEP 5: Summary */}
          {step === 5 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', background: 'var(--brand-tint-90)',
                  color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{
                  fontSize: 22, fontWeight: 600, color: 'var(--ink)',
                  fontFamily: 'var(--font-display)', marginBottom: 4,
                }}>
                  Ready to order!
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                  Review your gift details below.
                </p>
              </div>

              {/* Summary card */}
              <div style={{
                background: 'var(--bg-warm)', borderRadius: 'var(--r-md)',
                padding: '18px 20px', border: '1px solid var(--line)',
                marginBottom: 24,
              }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)' }}>
                  <img src={selectedCategory.img} alt="" style={{ width: 56, height: 56, borderRadius: 'var(--r-sm)', objectFit: 'cover', border: '1px solid var(--line)' }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{selectedVariant || selectedCategory.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--brand-primary)', fontWeight: 600 }}>₹{selectedCategory.price}+</div>
                  </div>
                </div>
                {message && (
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Message:</span> "{message}"
                  </div>
                )}
              </div>

              {/* WhatsApp primary CTA */}
              <button
                onClick={handleWhatsApp}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '15px 0', fontSize: 15, fontWeight: 700,
                  background: '#25D366', color: '#ffffff', border: 'none',
                  borderRadius: 'var(--r-full)', cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.25)',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>

              <div style={{
                textAlign: 'center', fontSize: 12, color: 'var(--ink-muted)',
                marginTop: 10,
              }}>
                Our designer will send you a preview before printing
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 28px 18px', borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn btn-ghost"
              style={{ fontSize: 13, gap: 4 }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn btn-primary"
              style={{ fontSize: 14, gap: 4 }}
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="btn btn-secondary"
              style={{ fontSize: 13 }}
            >
              Add to Cart Instead
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
