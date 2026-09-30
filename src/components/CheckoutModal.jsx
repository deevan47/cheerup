import React, { useState } from 'react';
import { X, CheckCircle, Lock, Truck, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  const [step, setStep] = useState('form');
  const [payment, setPayment] = useState('upi');
  const [tracking, setTracking] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' });
  if (!isOpen) return null;
  const total = cartItems.reduce((a, i) => a + i.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      const code = 'CU-' + Math.floor(100000 + Math.random() * 900000);
      setTracking(code);
      setStep('success');
      try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#A8461E', '#DE8A57', '#F3DCCC', '#FFD700'] }); } catch (_) {}
      onClearCart();
    }, 2000);
  };

  const inputStyle = {
    width: '100%', fontFamily: 'var(--font-body)', fontSize: 14,
    padding: '12px 16px', border: '1.5px solid var(--line)',
    borderRadius: 'var(--r-md)', background: '#ffffff',
    color: 'var(--ink)', outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && step !== 'processing') onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, background: 'rgba(28,26,23,0.6)', backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 480,
        background: '#ffffff', border: '1px solid var(--line)',
        borderRadius: 'var(--r-xl)', padding: '32px 28px',
        boxShadow: 'var(--shadow-xl)',
        animation: 'scaleIn 0.25s ease',
      }}>
        {step !== 'processing' && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'var(--bg-warm)', border: 'none', color: 'var(--ink-soft)',
              cursor: 'pointer', width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)',
                background: 'var(--brand-tint-90)', padding: '4px 12px', borderRadius: 'var(--r-full)',
                marginBottom: 10, fontFamily: 'var(--font-mono)',
              }}>
                <Lock size={10} /> SECURE CHECKOUT
              </div>
              <h2 style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 600 }}>Complete your order</h2>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
                Total: <strong style={{ color: 'var(--brand-primary)', fontSize: 16 }}>₹{total}</strong> — {cartItems.length} item(s)
              </p>
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>Delivery Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input style={inputStyle} placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
              <input style={inputStyle} placeholder="WhatsApp number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
            </div>
            <input style={inputStyle} placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
            <input style={inputStyle} placeholder="Full address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input style={inputStyle} placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
              <input style={inputStyle} placeholder="PIN Code" required value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'} />
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4, fontFamily: 'var(--font-mono)' }}>Payment Method</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[{ id: 'upi', label: 'UPI' }, { id: 'card', label: 'Card' }, { id: 'cod', label: 'COD' }].map((m) => (
                <button key={m.id} type="button" onClick={() => setPayment(m.id)} style={{
                  padding: '12px 0', borderRadius: 'var(--r-md)',
                  border: `2px solid ${payment === m.id ? 'var(--brand-primary)' : 'var(--line)'}`,
                  background: payment === m.id ? 'var(--brand-tint-90)' : '#ffffff',
                  color: payment === m.id ? 'var(--brand-primary)' : 'var(--ink-soft)',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                }}>{m.label}</button>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" style={{
              width: '100%', justifyContent: 'center', padding: '15px 0', fontSize: 15, marginTop: 8,
            }}>
              Pay ₹{total} & Place Order
            </button>
          </form>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{
              width: 48, height: 48, border: '3px solid var(--brand-primary)',
              borderTopColor: 'transparent', borderRadius: '50%',
              margin: '0 auto 20px', animation: 'spin 0.8s linear infinite',
            }} />
            <h2 style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 600 }}>Creating your smile…</h2>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>Processing your personalized order.</p>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle size={52} color="var(--brand-primary)" />
            <h2 style={{ fontSize: 24, fontFamily: 'var(--font-display)', fontWeight: 600, marginTop: 12 }}>
              Smile incoming! 🎉
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, marginBottom: 20 }}>
              Your personalized gift is entering production.
            </p>
            <div style={{
              background: 'var(--bg-warm)', border: '1px solid var(--line)',
              borderRadius: 'var(--r-md)', padding: 16, maxWidth: 240,
              margin: '0 auto 16px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', fontSize: 10,
                color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6,
              }}>
                <span>TRACKING</span>
                <span style={{ color: 'var(--brand-primary)' }}>EXPRESS</span>
              </div>
              <div style={{
                fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)',
                fontFamily: 'var(--font-mono)',
              }}>
                {tracking}
              </div>
            </div>
            <p style={{
              fontSize: 12, color: 'var(--ink-muted)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16,
            }}>
              <Truck size={14} color="var(--brand-primary)" /> Updates on WhatsApp
            </p>
            <button onClick={onClose} className="btn btn-primary" style={{ fontSize: 14 }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
