import { useEffect, useMemo, useRef, useState } from 'react';
import './Products.css';
import { GROUPS, SHELF_ORDER, catNo, findCatByName, fromPrice, imageFor, lowestPrice } from '../../data/products';
import { PEOPLE } from '../../data/people';
import { href, catHref } from '../../routes';
import { price } from '../../lib/money';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';
import CatIcon from '../../components/CatIcon';
import ImageSlot from '../../components/ImageSlot';

/**
 * THE GIFTS PAGE: every kind of gift, at a glance.
 *
 * Top to bottom:
 *   1. the heading and the lowest price
 *   2. the finder: a search box and "Who's it for?" chips
 *   3. the thirteen kinds of gift as a numbered index, like the contents page of
 *      a printed catalogue: four chapters (GROUPS in data/products.js), one row
 *      per gift with its number, its drawing, its line and its price. A row
 *      opens that gift's own page (CategoryPage.jsx).
 *   4. a closing panel for anyone who still has not found it
 *
 * While searching or picking a person, the chapters give way to one list of the
 * rows that match. Search and person live in the URL (/gifts/?for=dad&q=mug),
 * so a filtered page can be shared, and the Home page links to "every gift for
 * Mum". The page is pre-rendered unfiltered; the URL is read in the browser.
 */

// The people with ideas, as chips. "Not sure yet" has none, so it is left out.
const WHO = PEOPLE.filter((p) => p.ideas.length).map((p) => ({
  ...p,
  slug: p.k.toLowerCase().replace(/\s+/g, '-'),
}));

// Lower case, no punctuation, so "T-shirt", "tshirt" and "t shirt" all meet.
const norm = (s) => String(s).toLowerCase().replace(/[’'\-–.,()“”"]/g, '').replace(/\s+/g, ' ');
// A search word has to start a word in the text: "chai" finds chai, not keychains.
const has = (text, t) => ` ${text}`.includes(` ${t}`);

export default function Products() {
  const [q, setQ] = useState('');
  const [who, setWho] = useState(null);   // a slug from WHO, or null for anyone
  const searchRef = useRef(null);
  const ready = useRef(false);

  // read ?for= and ?q= once, in the browser
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const f = p.get('for');
    if (f && WHO.some((w) => w.slug === f)) setWho(f);
    if (p.get('q')) setQ(p.get('q'));
    ready.current = true;
  }, []);

  // write them back once typing stops, so a filtered page can be shared
  useEffect(() => {
    if (!ready.current) return undefined;
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      if (who) p.set('for', who);
      if (q.trim()) p.set('q', q.trim());
      const qs = p.toString();
      const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
      if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', url);
    }, 700);
    return () => clearTimeout(t);
  }, [q, who]);

  const person = WHO.find((w) => w.slug === who);
  const found = useMemo(() => findGifts(q, person), [q, person]);
  const filtering = Boolean(q.trim() || person);
  const clear = () => { setQ(''); setWho(null); searchRef.current?.focus(); };

  return (
    <div data-screen-label="Products" className="products">
      <header className="products__head">
        <h1 className="h-page">Pick a gift. <span className="accent">Pour your heart into it.</span></h1>
        <p className="lead">
          Thirteen kinds of gift, each one made for a single person. <b className="hl">Prices from {price(lowestPrice())}.</b>
        </p>
      </header>

      <section className="finder" aria-label="Find a gift">
        <div className="finder__search">
          <label htmlFor="gift-search" className="finder__label">Search</label>
          <div className="finder__box">
            <svg className="finder__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15.5 15.5 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="gift-search"
              ref={searchRef}
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Try mug, cushion, heart…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape' && q) { e.preventDefault(); setQ(''); } }}
            />
          </div>
        </div>

        <fieldset className="finder__who">
          <legend className="finder__label">Who’s it for?</legend>
          <div className="finder__chips">
            <button type="button" className="chip chip--sm" aria-pressed={!who} onClick={() => setWho(null)}>Anyone</button>
            {WHO.map((w) => (
              <button
                key={w.slug}
                type="button"
                className="chip chip--sm"
                aria-pressed={who === w.slug}
                onClick={() => setWho(who === w.slug ? null : w.slug)}
              >
                {w.k}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="finder__count" aria-live="polite">
          {countLine(found.length, person, q)}
          {filtering && <button type="button" className="finder__clear" onClick={clear}>Show all gifts</button>}
        </p>
      </section>

      {!filtering && GROUPS.map((g, k) => (
        <section className="chapter" key={g.id} aria-labelledby={`chapter-${g.id}`}>
          <header className="chapter__head">
            <p className="chapter__no" aria-hidden="true">{ROMAN[k]}</p>
            <h2 className="chapter__name" id={`chapter-${g.id}`}>{g.name}</h2>
            <p className="chapter__line">{g.line}</p>
          </header>
          <ol className="index">
            {SHELF_ORDER.filter((c) => c.group === g.id).map((c) => <Row key={c.id} cat={c} />)}
          </ol>
        </section>
      ))}

      {filtering && found.length > 0 && (
        <ol className="index index--found">
          {found.map((f) => <Row key={f.cat.id} {...f} who={person && person.k} />)}
        </ol>
      )}

      {filtering && found.length === 0 && (
        <div className="finder__none">
          <p className="finder__none-line">Nothing called “{q.trim()}” yet.</p>
          <p>Tell me what you have in mind and I’ll make it.</p>
          <div className="finder__none-actions">
            <WaLink className="btn btn--primary" href={wa(`Hi Cheer Up, do you make ${q.trim()}?`)}>Ask on WhatsApp</WaLink>
            <button type="button" className="tlink tap" onClick={clear}>See every gift</button>
          </div>
        </div>
      )}

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

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/**
 * One kind of gift, as a row of the index. The whole row is the link.
 *   opt   the option a search pointed at: named on the row, and the link goes
 *         straight to that option's card on the gift's page
 *   note  the line written for the person picked in "Who's it for?"
 */
function Row({ cat, opt = null, note = null, who = null }) {
  const n = cat.options.length;
  const from = fromPrice(cat);
  const to = `${catHref(cat.id)}${opt ? `#${cat.id}-${opt.id}` : ''}`;
  return (
    <li className="index__item" id={cat.id}>
      <a className="row" href={to}>
        <span className="row__no">{catNo(cat)}</span>
        {/* The category's photo goes here: switch on its commented  image:  line in
            data/products.js (Mugs: public/photos/mugs.jpg). Until then, its drawing. */}
        <ImageSlot image={imageFor(cat)} sizes="120px" className="row__art">
          <CatIcon id={cat.id} />
        </ImageSlot>
        <span className="row__main">
          <span className="row__name">{cat.name}</span>
          {note
            ? <span className="row__line"><b className="row__for">For {who}.</b> {note}</span>
            : <span className="row__line">{cat.line}</span>}
          {opt && <span className="row__found">Found: <b>{opt.n}</b></span>}
        </span>
        <span className="row__meta">
          <span>{n} {n === 1 ? 'style' : cat.control === 'slider' ? 'sizes' : 'styles'}</span>
          <span className="row__price">{from != null ? `from ${price(from)}` : 'price on request'}</span>
        </span>
        <span className="row__go" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
        </span>
      </a>
    </li>
  );
}

/**
 * The rows that match a search and a person, in order.
 *
 * Every word typed has to start a word somewhere in the gift: its name, line,
 * search tags, or one of its options. When the words point at one option more
 * than the rest ("heart" in Mugs), that option is `opt`.
 * A person narrows the list to their three ideas, in the order written in
 * data/people.js, with the idea's line as `note`.
 */
function findGifts(q, person) {
  const terms = norm(q).trim().split(' ').filter(Boolean);
  const base = person
    ? person.ideas.map(([name, line]) => ({ cat: findCatByName(name), note: line })).filter((x) => x.cat)
    : SHELF_ORDER.map((cat) => ({ cat, note: null }));

  return base.flatMap(({ cat, note }) => {
    if (!terms.length) return [{ cat, note, opt: null }];
    const catText = norm(`${cat.name} ${cat.line} ${cat.tags || ''}`);
    const hits = cat.options.map((o) => terms.every((t) => has(`${catText} ${norm(`${o.n} ${o.d}`)}`, t)));
    if (!hits.some(Boolean)) return [];
    const own = cat.options.map((o, k) => (hits[k] ? terms.filter((t) => has(norm(`${o.n} ${o.d}`), t)).length : -1));
    const best = Math.max(...own);
    const opt = best > 0 && own.some((x) => x !== best) ? cat.options[own.indexOf(best)] : null;
    return [{ cat, note, opt }];
  });
}

function countLine(n, person, q) {
  const gifts = `${n} ${n === 1 ? 'kind of gift' : 'kinds of gift'}`;
  if (person && q.trim()) return `${gifts} for ${person.k} matching “${q.trim()}”`;
  if (person) return `My three favourites for ${person.k}`;
  if (q.trim()) return `${gifts} matching “${q.trim()}”`;
  return `${gifts}, in four chapters`;
}
