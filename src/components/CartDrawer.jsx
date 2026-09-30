import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Plus, Minus } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onProceedToCheckout }) {
  const [promo, setPromo] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [quantities, setQuantities] = useState({});

  if (!isOpen) return null;

  const getQty = (id) => quantities[id] || 1;

  const handleQtyChange = (id, delta) => {
    const current = getQty(id);
    const updated = current + delta;
    if (updated <= 0) {
      onRemoveItem(id);
    } else {
      setQuantities((prev) => ({ ...prev, [id]: updated }));
    }
  };

  const subtotal = cartItems.reduce((a, i) => a + (i.price * getQty(i.id)), 0);
  const discount = discounted ? 50 : 0;
  const shipping = subtotal >= 799 || !cartItems.length ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(28,26,23,0.5)', backdropFilter: 'blur(6px)' }} />
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 420,
        background: 'var(--bg)', borderLeft: '1px solid var(--line)',
        height: '100%', display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="var(--brand-primary)" />
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Your Cart</h2>
              <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{cartItems.length} item(s)</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', padding: 4 }}><X size={20} /></button>
        </div>

        {/* Shipping bar */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--line-soft)', fontSize: 12, background: 'var(--bg-warm)' }}>
          {subtotal >= 799 ? (
            <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>🎉 Free shipping unlocked!</span>
          ) : (
            <div style={{ color: 'var(--ink-soft)' }}>
              Add <strong style={{ color: 'var(--brand-primary)' }}>₹{799 - subtotal}</strong> more for free shipping
              <div style={{ width: '100%', height: 5, background: 'var(--line)', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--brand-primary)', borderRadius: 3, width: `${Math.min(100, (subtotal / 799) * 100)}%`, transition: 'width 0.3s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <ShoppingBag size={40} color="var(--ink-muted)" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Cart is empty</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>Create a gift to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cartItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div key={item.id} style={{
                    display: 'flex', gap: 12, alignItems: 'center', padding: 14,
                    background: '#ffffff', border: '1px solid var(--line)',
                    borderRadius: 'var(--r-md)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ width: 56, height: 56, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--line)' }}>
                      <img src={item.photo} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-primary)' }}>₹{item.price * qty}</span>
                      
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <button
                          onClick={() => handleQtyChange(item.id, -1)}
                          style={{
                            width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--line)',
                            background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--ink)'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', minWidth: 16, textAlign: 'center' }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.id, 1)}
                          style={{
                            width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--line)',
                            background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--ink)'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', padding: 4 }}><Trash2 size={16} /></button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: 20, borderTop: '1px solid var(--line)', background: '#ffffff' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={14} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--ink-muted)' }} />
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="input-clean"
                  style={{ paddingLeft: 34, fontSize: 13, textTransform: 'uppercase' }}
                />
              </div>
              <button onClick={() => {
                if (promo.trim().toUpperCase() === 'SMILE50') setDiscounted(true);
                else alert('Try "SMILE50" for ₹50 off!');
              }} className="btn btn-secondary" style={{ fontSize: 13, padding: '10px 18px' }}>Apply</button>
            </div>

            <div style={{ fontSize: 13, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-soft)', marginBottom: 6 }}><span>Subtotal</span><span>₹{subtotal}</span></div>
              {discounted && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-primary)', marginBottom: 6 }}><span>Discount</span><span>−₹50</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-soft)', marginBottom: 8 }}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, paddingTop: 10, borderTop: '1px solid var(--line)', color: 'var(--ink)' }}>
                <span>Total</span><span style={{ fontFamily: 'var(--font-display)' }}>₹{total}</span>
              </div>
            </div>

            <button onClick={onProceedToCheckout} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15 }}>
              Checkout <ArrowRight size={16} />
            </button>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: 'var(--ink-soft)', marginTop: 12 }}>
              <ShieldCheck size={14} color="var(--brand-primary)" /> Secure checkout • 100% satisfaction
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

