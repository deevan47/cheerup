import { CATS, imageFor } from '../../data/products';
import { priceWithUnit } from '../../lib/money';
import { href } from '../../routes';
import ImageSlot from '../../components/ImageSlot';

/**
 * Four real products, named and priced, directly under the hero.
 *
 * It fills itself from the catalogue: the first four products that have a photo
 * set in data/products.js, in catalogue order. Right now no product photos are
 * switched on, so this section renders NOTHING rather than four empty boxes
 * under the hero. Add photos and it appears on its own.
 *
 * To choose exactly which four appear instead, replace `picks` with a fixed list:
 *   const picks = [['polaroids', 'big'], ['mugs', 'colour'], ...]
 *     .map(([c, o]) => { const cat = findCat(c); return { cat, opt: findOption(c, o) }; });
 */
export default function Showcase() {
  const picks = CATS
    .flatMap((cat) => cat.options.map((opt) => ({ cat, opt })))
    .filter(({ opt }) => opt.image)
    .slice(0, 4);

  if (picks.length < 4) return null;   // a strip of one or two looks unfinished

  return (
    <section className="showcase" aria-label="A few of the gifts">
      {picks.map(({ cat, opt }, i) => (
        <a key={`${cat.id}-${opt.id}`} className="shot" href={`${href('products')}#${cat.id}`}>
          <ImageSlot image={imageFor(cat, opt)} eager={i === 0} sizes="(max-width: 900px) 24vw, 280px" />
          <span className="shot__name">{opt.n}</span>
          <span className="shot__price">
            {opt.price != null ? priceWithUnit(opt.price, opt.unit, opt.from) : 'Price on request'}
          </span>
        </a>
      ))}
    </section>
  );
}
