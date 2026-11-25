import { useState } from 'react';
import { useApp } from '../../AppContext';
import { imageFor } from '../../data/products';
import { priceWithUnit } from '../../lib/money';
import { wa, MSG } from '../../lib/whatsapp';
import { WaTextLink } from '../../components/WaLink';
import ImageSlot from '../../components/ImageSlot';

/**
 * ONE CATEGORY, AS ONE CARD.
 *
 * Thirteen categories with thirty-odd options between them would be a wall of
 * near-identical cards (three mugs, four keychains, ten frame sizes). So each
 * category is a single card, and the visitor chooses within it:
 *
 *   image space    the chosen option's photo, else the category's, else empty
 *   name + line    the category and its one line of feeling
 *   chooser        chips for a handful of options (style, shape, finish), or a
 *                  slider for Photo frames, where ten sizes are a range
 *   detail         that option's own line, and its price
 *   actions        "Personalise this" opens the order sheet already set to the
 *                  chosen option; "Ask about this" opens WhatsApp about it
 *
 * Changing the option re-keys the detail block, so its text fades in afresh
 * (.gift__detail in Products.css) instead of snapping.
 *
 * Used on a gift's own page (CategoryPage.jsx) for Photo frames, where ten sizes
 * are one card with a slider. `bare` leaves out the name and line, because the
 * page header above already says them.
 */
export default function GiftCard({ cat, no, first = false, bare = false }) {
  const { setSheet, sheetOpener } = useApp();
  // Frames open on 12 in (the middle of the range); everything else on its first option.
  const startAt = cat.control === 'slider' ? Math.max(0, cat.options.findIndex((o) => o.size === 12)) : 0;
  const [i, setI] = useState(startAt);
  const opt = cat.options[i];
  const many = cat.options.length > 1;

  // remember the button that opened the sheet, so closing it hands focus back
  const personalise = (e) => {
    sheetOpener.current = e.currentTarget;
    setSheet({ cat: cat.name, n: opt.n });
  };

  return (
    <article className="gift" id={cat.id} aria-labelledby={`${cat.id}-name`}>
      <ImageSlot
        image={imageFor(cat, opt)}
        eager={first}
        sizes="(max-width: 700px) 92vw, (max-width: 1099px) 46vw, 380px"
      >
        {/* Shown only until this gift has a photo: the choice, drawn. */}
        {!bare && <span className="slot__no" aria-hidden="true">{String(no).padStart(2, '0')}</span>}
        {cat.control === 'slider'
          ? <FrameScale size={opt.size} max={cat.options[cat.options.length - 1].size} />
          : SHAPES[opt.id] && cat.pick === 'Shape' && <ShapeMark key={opt.id} shape={opt.id} />}
        <p className="slot__line gift__slot-name" key={`n-${opt.id}`} aria-hidden="true">{opt.n}</p>
      </ImageSlot>

      <div className="gift__body">
        <h2 className={bare ? 'sr-only' : 'gift__name'} id={`${cat.id}-name`}>{cat.name}</h2>
        {!bare && <p className="gift__line">{cat.line}</p>}

        {many && cat.control === 'slider' && (
          <SizeSlider cat={cat} index={i} onChange={setI} />
        )}

        {many && cat.control !== 'slider' && (
          // Radios, not buttons: it is one choice out of several, and that is
          // what a screen reader should announce ("Shape, radio group, 1 of 3").
          <fieldset className="gift__opts">
            <legend className="gift__legend">{cat.pick}</legend>
            <div className="gift__chips">
              {cat.options.map((o, n) => (
                <label key={o.id} className={`chip chip--sm${n === i ? ' chip--on' : ''}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`${cat.id}-option`}
                    value={o.id}
                    checked={n === i}
                    onChange={() => setI(n)}
                  />
                  {shortName(o.n, cat)}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* re-keyed on every change, so it fades in fresh */}
        <div className="gift__detail" key={opt.id}>
          <p className="gift__desc">{opt.d}</p>
          <p className="gift__price">
            {opt.price != null ? priceWithUnit(opt.price, opt.unit, opt.from) : <span className="gift__ask">Price on request</span>}
          </p>
        </div>

        <div className="gift__actions">
          <button className="btn btn--primary" onClick={personalise}>Personalise this</button>
          <WaTextLink className="tlink tap gift__q" href={wa(MSG.question(opt.n, cat.name))}>Ask about this</WaTextLink>
        </div>
      </div>
    </article>
  );
}

/**
 * The frame-size slider. Ten fixed sizes, so the slider moves in steps of one
 * index (0 to 9) and the label shows the size in inches. Screen readers hear
 * "12 inches", not "4".
 */
function SizeSlider({ cat, index, onChange }) {
  const id = `${cat.id}-size`;
  const opt = cat.options[index];
  return (
    <div className="gift__size">
      <div className="gift__size-head">
        <label htmlFor={id} className="gift__legend">{cat.pick}</label>
        <output htmlFor={id} className="gift__size-val">{opt.size} in</output>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={0}
        max={cat.options.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${opt.size} inches`}
        // the filled part of the track, as a percentage, for the CSS
        style={{ '--fill': `${(index / (cat.options.length - 1)) * 100}%` }}
      />
      <div className="gift__ticks" aria-hidden="true">
        <span>{cat.options[0].size} in</span>
        <span>{cat.options[cat.options.length - 1].size} in</span>
      </div>
    </div>
  );
}

/**
 * Chip labels without the repeated category word: inside the Mugs card,
 * "Classic mug" is just "Classic". The full name is still used everywhere else.
 */
function shortName(n, cat) {
  const drop = {
    mugs: / mug$/i, magnets: / magnet$/i, pillows: / pillow$/i,
    calendars: / calendar$/i, keychains: / keychain$/i,
  }[cat.id];
  return drop ? n.replace(drop, '') : n;
}

/**
 * The frame size, drawn to scale: an outline that grows from desk size to wall
 * size as the slider moves, so "32 in" means something before there is a photo.
 */
function FrameScale({ size, max }) {
  return (
    <div className="frame-viz" aria-hidden="true">
      <div className="frame-viz__frame" style={{ '--k': size / max }}>
        <span>{size}″</span>
      </div>
    </div>
  );
}

// Outline paths in a 100x100 box, for the Shape choices that have a simple shape.
export const SHAPES = {
  heart: 'M50 86 C22 66 8 50 8 33 C8 20 18 11 30 11 C39 11 46 16 50 24 C54 16 61 11 70 11 C82 11 92 20 92 33 C92 50 78 66 50 86 Z',
  square: 'M14 14 H86 V86 H14 Z',
  circle: 'M50 10 A40 40 0 1 1 49.9 10 Z',
};

export function ShapeMark({ shape }) {
  return (
    <svg className="shape-viz" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={SHAPES[shape]} />
    </svg>
  );
}
