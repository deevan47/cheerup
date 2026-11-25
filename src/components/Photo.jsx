import { picture } from '../lib/img';

/**
 * A product photo.
 *
 * There is no placeholder state on purpose. The dashed peach boxes this used to
 * draw read as a broken page (the Reviews gallery was 1,400px of them, and the
 * founder slot showed one on the Home and My story pages). If there is no file
 * yet, nothing is drawn and the layout closes up around it.
 *
 * It renders a <picture> so WebP goes to browsers that take it and the original
 * JPEG to the rest. `width`/`height` come from the real file via lib/img.js, so
 * the box is the right shape before the bytes land and nothing jumps.
 *
 * `sizes` is how wide the image will actually be drawn, and it is worth getting
 * right: it is what stops a phone downloading an 800px file for a 160px thumbnail.
 * `eager` is for the one image above the fold.
 */
export default function Photo({
  src, alt = '', sizes = '100vw', ratio, className = '', style, eager = false,
}) {
  if (!src) return null;
  const { src: jpg, webp, w, h } = picture(src);
  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        className={`photo-img ${className}`}
        src={jpg}
        sizes={sizes}
        alt={alt}
        width={w || undefined}
        height={h || undefined}
        loading={eager ? 'eager' : 'lazy'}
        // React 18 passes this through only in lowercase
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
        style={ratio ? { aspectRatio: ratio, ...style } : style}
      />
    </picture>
  );
}
