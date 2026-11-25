import { useEffect, useRef, useState } from 'react';
import './Products.css';
import { CATS, lowestPrice } from '../../data/products';
import { href } from '../../routes';
import { price } from '../../lib/money';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';
import GiftCard from './GiftCard';

/**
 * THE GIFTS PAGE.
 *
 * Top to bottom:
 *   1. the heading and the lowest price
 *   2. a sticky row of thirteen chips, one per category, that jumps to it
 *   3. thirteen cards, one per category (see GiftCard.jsx)
 *   4. a closing panel for anyone who still has not found it
 *
 * The chip row is not just a menu. As you scroll, the chip for the category on
 * screen lights up, and on a phone the row slides sideways to keep that chip in
 * view. So the row also tells you where you are on a long page.
 */
export default function Products() {
  const [active, pin] = useActiveCategory();
  const rowRef = useRef(null);

  // keep the lit chip visible inside the sideways-scrolling row (phones)
  useEffect(() => {
    const row = rowRef.current;
    const chip = row && row.querySelector(`[data-cat="${active}"]`);
    if (!chip) return;
    const left = chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2;
    row.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <div data-screen-label="Products" className="products">
      <header className="products__head">
        <h1 className="h-page">Pick a gift. <span className="accent">Pour your heart into it.</span></h1>
        <p className="lead">
          Thirteen kinds of gift, each one made for a single person. <b className="hl">Prices from {price(lowestPrice())}.</b>
        </p>
      </header>

      <nav className="cat-jump" aria-label="Jump to a gift type" ref={rowRef}>
        {CATS.map((c) => (
          <a
            key={c.id}
            data-cat={c.id}
            className={`chip chip--sm${active === c.id ? ' chip--on' : ''}`}
            href={`#${c.id}`}
            aria-current={active === c.id ? 'true' : undefined}
            onClick={() => pin(c.id)}
          >
            {c.name}
          </a>
        ))}
      </nav>

      <div className="gifts">
        {CATS.map((c, n) => <GiftCard key={c.id} cat={c} no={n + 1} first={n === 0} />)}
      </div>

      <div className="products__foot">
        <div className="products__help">
          <p>Can’t decide? Tell me about them. I’ll find the feeling.</p>
          <WaLink href={wa(MSG.suggest)}>Chat on WhatsApp</WaLink>
        </div>
        <p className="products__new">
          Not in the catalogue? I’ll make it. <a className="tlink" href={href('request')}>Request a gift</a>
        </p>
      </div>
    </div>
  );
}

/**
 * Which category card is on screen.
 *
 * Watches a thin band across the upper middle of the viewport and keeps a set of
 * the cards currently crossing it. On a phone that is one card. On a desktop a
 * whole row of three crosses the band at once, so the active one is the EARLIEST
 * in catalogue order, which is the left-hand card of the row: the one the eye
 * reads first, and the one a visitor would say they are "on".
 */
function useActiveCategory() {
  const [active, setActive] = useState(CATS[0].id);
  // A clicked chip wins for a moment. Jumping to the third card in a row puts
  // the whole row in the band, and without this the first card would take over.
  const pinnedUntil = useRef(0);
  const pin = (id) => { pinnedUntil.current = Date.now() + 900; setActive(id); };

  useEffect(() => {
    const inBand = new Set();
    const order = CATS.map((c) => c.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id)));
        if (Date.now() < pinnedUntil.current) return;
        const first = order.find((id) => inBand.has(id));
        if (first) setActive(first);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    CATS.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return [active, pin];
}
