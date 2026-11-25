// Logo variants from the brand sprite.
const SIZES = {
  'horiz-nt': [1500, 355],   // header
  'stack': [1060, 770],      // footer
};

export function Logo({ variant, className, style, label = 'Cheer Up' }) {
  const [w, h] = SIZES[variant];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} style={style} role="img" aria-label={label}>
      <use href={`#g-${variant}`} width={w} height={h} />
    </svg>
  );
}

// The small "eye" mark used as bullet / icon / tab arrow.
export function Eye({ className, style }) {
  return (
    <svg viewBox="0 0 145 92" aria-hidden="true" className={className} style={style}>
      <use href="#g-eye" width="145" height="92" />
    </svg>
  );
}
