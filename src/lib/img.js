// Turns 'photos/mug-white.jpg' into everything an <img> needs: the real pixel
// size (so the box is reserved before the file arrives) and a WebP srcset.
import { IMAGES } from '../data/images';
import { asset } from './assets';

/**
 * @param {string} src  a path under /public, e.g. 'photos/mug-white.jpg'
 * @returns {{src:string, webp:string|null, w:number|null, h:number|null}}
 *   `webp` is a srcset string, or null for a file the generator has not seen.
 */
export function picture(src) {
  const meta = IMAGES[src];
  if (!meta) return { src: asset(src), webp: null, w: null, h: null };
  const base = src.replace(/\.jpe?g$/i, '');
  const webp = meta.widths
    .map((x) => `${asset(x === meta.w ? `${base}.webp` : `${base}-${x}.webp`)} ${x}w`)
    .join(', ');
  return { src: asset(src), webp, w: meta.w, h: meta.h };
}
