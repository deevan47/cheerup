import { useEffect, useRef, useState } from 'react';
import { CATS, fromPrice, imageFor } from '../../data/products';
import { href } from '../../routes';
import { price } from '../../lib/money';
import ImageSlot from '../../components/ImageSlot';

/**
 * "Thirteen ways": every category on one sideways-scrolling shelf.
 *
 * Thirteen tiles in a grid would be seven rows on a phone, most of the Home page.
 * On a shelf they take one row at every width: swipe on a phone, the arrows (or
 * a trackpad) on a computer. Each tile goes straight to its card on the Gifts
 * page.
 *
 * The arrows know where the shelf is. At the start the back arrow is disabled,
 * at the end the forward one is, so they never offer a move that does nothing.
 */
export default function Categories() {
  const shelf = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  // re-check the ends whenever the shelf scrolls or the window resizes
  useEffect(() => {
    const el = shelf.current;
    if (!el) return undefined;
    const check = () => setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4,
    });
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);

  /** Move most of a screen's width, so one tile stays in view for context. */
  const move = (dir) => {
    const el = shelf.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="ways">
      <div className="ways__head" data-reveal="1">
        <div>
          <p className="eyebrow">The gifts</p>
          <h2 className="h-section">Thirteen ways to say <span className="accent">“you matter to me.”</span></h2>
        </div>
        <div className="ways__nav">
          <button className="ways__arrow" onClick={() => move(-1)} disabled={edge.start} aria-label="Show earlier gifts">
            <Chevron dir="left" />
          </button>
          <button className="ways__arrow" onClick={() => move(1)} disabled={edge.end} aria-label="Show more gifts">
            <Chevron dir="right" />
          </button>
          <a className="tlink tap ways__all" href={href('products')}>See them all</a>
        </div>
      </div>

      <ul className="shelf" ref={shelf}>
        {CATS.map((c, n) => {
          const from = fromPrice(c);
          return (
            <li key={c.id} className="shelf__item">
              <a className="tile" href={`${href('products')}#${c.id}`}>
                {/* until there is a photo, the tile shows the gift's one line, like a note card */}
                <ImageSlot image={imageFor(c)} sizes="240px">
                  <span className="slot__no" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
                  <p className="slot__line">{c.line}</p>
                </ImageSlot>
                <span className="tile__name">{c.name}</span>
                <span className="tile__price">{from != null ? `From ${price(from)}` : 'Price on request'}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* The one place on the Home page that offers the off-catalogue route. */}
      <p className="ways__more" data-reveal="1">
        Not in the catalogue? I’ll make it. <a className="tlink" href={href('request')}>Request a gift</a>
      </p>
    </section>
  );
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M12.5 4 6.5 10l6 6' : 'M7.5 4l6 6-6 6'}
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
