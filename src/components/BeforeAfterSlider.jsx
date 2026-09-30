import React, { useState } from 'react';

export default function BeforeAfterSlider({ 
  beforeImage = "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", 
  afterImage = "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", 
  beforeLabel = "Raw Photo", 
  afterLabel = "Cheer Up Finish" 
}) {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      minHeight: '340px',
      overflow: 'hidden', 
      borderRadius: 'var(--r-md)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
    }}>
      {/* After Image (Background) - with a warmth/saturation bump to show the Cheer Up Finish */}
      <img src={afterImage} alt="After" style={{ 
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        filter: 'saturate(1.2) contrast(1.05) sepia(0.1)'
      }} />
      <div style={{ 
        position: 'absolute', top: 16, right: 16, 
        background: 'rgba(28,26,23,0.75)', color: 'white', padding: '6px 14px', 
        borderRadius: 20, fontSize: 12, fontWeight: 600, backdropFilter: 'blur(6px)',
        fontFamily: 'var(--font-body)', letterSpacing: '0.04em'
      }}>
        {afterLabel}
      </div>

      {/* Before Image (Foreground overlay) */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        clipPath: `inset(0 ${100 - sliderVal}% 0 0)` // Clips from right
      }}>
        <img src={beforeImage} alt="Before" style={{ 
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'grayscale(15%) contrast(0.9) brightness(0.95)' 
        }} />
        <div style={{ 
          position: 'absolute', top: 16, left: 16, 
          background: 'rgba(28,26,23,0.75)', color: 'white', padding: '6px 14px', 
          borderRadius: 20, fontSize: 12, fontWeight: 600, backdropFilter: 'blur(6px)',
          fontFamily: 'var(--font-body)', letterSpacing: '0.04em'
        }}>
          {beforeLabel}
        </div>
      </div>

      {/* Slider Visuals */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${sliderVal}%`,
        width: 3, background: '#ffffff', transform: 'translateX(-50%)',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)', pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          width: 36, height: 36, background: '#ffffff', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          color: 'var(--brand-primary)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 17l-5-5 5-5 M13 17l5-5-5-5" />
          </svg>
        </div>
      </div>

      {/* Invisible Range Input */}
      <input 
        type="range" 
        min="0" max="100" 
        value={sliderVal} 
        onChange={(e) => setSliderVal(e.target.value)}
        aria-label="Before and after slider"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0, cursor: 'ew-resize', margin: 0, touchAction: 'pan-y'
        }}
      />
    </div>
  );
}
