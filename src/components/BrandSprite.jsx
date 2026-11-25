import sprite from '../assets/brand-sprite.svg?raw';

// Injects the logo symbols once (#g-eye, #g-horiz-nt, #g-stack, ...) so <use href="#g-..."> works anywhere.
export default function BrandSprite() {
  return <div id="cu-sprite" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: sprite }} />;
}
