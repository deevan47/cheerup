import './Products.css';
import { useApp } from '../../AppContext';
import { CATS, GROUPS, SHELF_ORDER, catNo, fromPrice, imageFor } from '../../data/products';
import { href, catHref } from '../../routes';
import { price, priceWithUnit } from '../../lib/money';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink, { WaTextLink } from '../../components/WaLink';
import ImageSlot from '../../components/ImageSlot';
import CatIcon from '../../components/CatIcon';
import GiftCard, { SHAPES, ShapeMark } from './GiftCard';

/**
 * ONE KIND OF GIFT, ON ITS OWN PAGE: /gifts/mugs, /gifts/photo-frames, ...
 *
 *   1. "All gifts / chapter" so it is always clear where you are
 *   2. a header with its catalogue number, drawing, line and price
 *   3. every style as its own card, with its own price and buttons. Photo
 *      frames are the exception: ten sizes are one card with a slider.
 *   4. "Not sure which?" on WhatsApp
 *   5. the previous and next kind of gift, and back to all of them
 */
export default function CategoryPage({ cat }) {
  const at = SHELF_ORDER.indexOf(cat);
  const prev = SHELF_ORDER[(at - 1 + SHELF_ORDER.length) % SHELF_ORDER.length];
  const next = SHELF_ORDER[(at + 1) % SHELF_ORDER.length];
  const shelf = GROUPS.find((g) => g.id === cat.group);
  const n = cat.options.length;
  const from = fromPrice(cat);
  const wide = cat.control === 'slider' || n === 1;

  return (
    <div data-screen-label={cat.name} className="cat-page">
      <nav className="crumbs" aria-label="You are here">
        <a href={href('products')}>All gifts</a>
        <span aria-hidden="true">/</span>
        <span>{shelf.name}</span>
      </nav>

      <header className="cat-hero">
        <div className="cat-hero__text">
          <p className="cat-hero__no">No. {catNo(cat)} <span>of {SHELF_ORDER.length}</span></p>
          <h1 className="h-page cat-hero__name">{cat.name}</h1>
          <p className="lead">{cat.line}</p>
          <p className="cat-hero__meta">
            {n} {n === 1 ? 'style' : cat.control === 'slider' ? 'sizes' : 'styles'}
            <span aria-hidden="true"> · </span>
            {from != null ? `from ${price(from)}` : 'price on request'}
            <span aria-hidden="true"> · </span>
            free preview before you pay
          </p>
        </div>
        <div className="cat-hero__art"><CatIcon id={cat.id} /></div>
      </header>

      {cat.control === 'slider'
        ? <div className="opts opts--wide"><GiftCard cat={cat} no={CATS.indexOf(cat) + 1} first bare /></div>
        : (
          <div className={`opts${wide ? ' opts--wide' : ''}`}>
            {cat.options.map((o, k) => <OptionCard key={o.id} cat={cat} opt={o} first={k === 0} />)}
          </div>
        )}

      <div className="cat-ask">
        <p>Not sure which {n > 1 ? 'one' : 'way'}? Tell me who it’s for. I’ll help you pick.</p>
        <WaLink href={wa(`Hi Cheer Up, I’m looking at your ${cat.name.toLowerCase()}. Which one would you suggest?`)}>Ask about {cat.name.toLowerCase()}</WaLink>
      </div>

      <nav className="cat-pager" aria-label="More gifts">
        <a className="cat-pager__link" href={catHref(prev.id)}>
          <span className="cat-pager__dir">← {catNo(prev)}</span>
          <span className="cat-pager__name">{prev.name}</span>
        </a>
        <a className="cat-pager__all tlink tap" href={href('products')}>All gifts</a>
        <a className="cat-pager__link cat-pager__link--next" href={catHref(next.id)}>
          <span className="cat-pager__dir">{catNo(next)} →</span>
          <span className="cat-pager__name">{next.name}</span>
        </a>
      </nav>
    </div>
  );
}

/** One style of the gift, as its own card. */
function OptionCard({ cat, opt, first }) {
  const { setSheet, sheetOpener } = useApp();
  const personalise = (e) => {
    sheetOpener.current = e.currentTarget;
    setSheet({ cat: cat.name, n: opt.n });
  };
  const shape = cat.pick === 'Shape' && SHAPES[opt.id];

  return (
    <article className="opt" id={`${cat.id}-${opt.id}`} aria-labelledby={`${cat.id}-${opt.id}-name`}>
      <ImageSlot image={imageFor(cat, opt)} eager={first} sizes="(max-width: 700px) 92vw, (max-width: 1099px) 46vw, 380px">
        {/* Shown only until this style has a photo: its shape, or the gift's drawing. */}
        {shape ? <ShapeMark shape={opt.id} /> : <CatIcon id={cat.id} className="opt__icon" />}
      </ImageSlot>
      <div className="opt__body">
        <h2 className="opt__name" id={`${cat.id}-${opt.id}-name`}>{opt.n}</h2>
        <p className="opt__desc">{opt.d}</p>
        <p className="gift__price">
          {opt.price != null ? priceWithUnit(opt.price, opt.unit, opt.from) : <span className="gift__ask">Price on request</span>}
        </p>
        <div className="gift__actions">
          <button className="btn btn--primary" onClick={personalise}>Personalise this</button>
          <WaTextLink className="tlink tap gift__q" href={wa(MSG.question(opt.n, cat.name))}>Ask about this</WaTextLink>
        </div>
      </div>
    </article>
  );
}
