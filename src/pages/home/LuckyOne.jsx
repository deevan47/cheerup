import { useRef } from 'react';
import { useApp } from '../../AppContext';
import { PEOPLE } from '../../data/people';
import { findCatByName, imageFor } from '../../data/products';
import { wa, MSG } from '../../lib/whatsapp';
import { rise } from '../../lib/motion';
import { href } from '../../routes';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import WaLink from '../../components/WaLink';
import Photo from '../../components/Photo';

// The idea's category, for its link and its thumbnail. The thumbnail is the
// category's photo once there is one; until then the row simply has no picture
// and its layout closes up (see .idea:not(:has(.idea__thumb)) in Home.css).
const catFor = (name) => findCatByName(name) || { id: 'mugs', name };

export default function LuckyOne() {
  const { person: i, setPerson } = useApp();
  const person = PEOPLE[i];
  const tabs = useRef([]);

  useUpdateEffect(() => { rise('[data-idea]', 70); }, [i]);

  /**
   * Arrow keys move between the people, which is what a screen reader promises
   * when it announces a tab list. Only the selected tab is in the Tab order
   * (a "roving tabindex"), so Tab does not have to step through all eight.
   */
  const onKeyDown = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + PEOPLE.length) % PEOPLE.length;
    setPerson(next);
    const el = tabs.current[next];
    if (el) el.focus();
  };

  return (
    <section className="lucky">
      <div className="lucky__inner">
        <div data-reveal="1" className="lucky__head">
          <p className="eyebrow">Who’s it for</p>
          <h2 className="h-section">Who’s on your <span className="accent">mind right now?</span></h2>
          <p className="lead">Pick a person. See what I’d make.</p>
        </div>
        <div className="lucky__body">
          <div role="tablist" aria-label="Who are you thinking of" onKeyDown={onKeyDown} data-reveal="1" className="who">
            {PEOPLE.map((p, idx) => (
              <button
                key={p.k}
                id={`who-tab-${idx}`}
                ref={(el) => { tabs.current[idx] = el; }}
                role="tab"
                className="who__item"
                aria-selected={idx === i}
                aria-controls="who-panel"
                tabIndex={idx === i ? 0 : -1}
                onClick={() => setPerson(idx)}
              >
                {p.k}
              </button>
            ))}
          </div>

          <div id="who-panel" role="tabpanel" aria-labelledby={`who-tab-${i}`} tabIndex={-1}>
            {person.ideas.length > 0 && (
              <div className="lucky__ideas">
                {person.ideas.map(([cat, line]) => {
                  const c = catFor(cat);
                  const img = imageFor(c);
                  return (
                  <div key={cat + line} data-idea="1" className="idea">
                    {img && (
                      <Photo
                        className="idea__thumb"
                        src={img.src}
                        alt=""              /* decorative: the text beside it names the gift */
                        ratio="4/5"
                        sizes="72px"
                      />
                    )}
                    <div className="idea__main">
                      <span className="eyebrow idea__cat">{cat}</span>
                      <p className="idea__line">{line}</p>
                    </div>
                    <div className="idea__actions">
                      <WaLink className="btn btn--primary btn--sm" href={wa(MSG.idea(person.k, cat, line))}>
                        Order this on WhatsApp
                      </WaLink>
                      <a className="tlink tap idea__more" href={`${href('products')}#${c.id}`}>
                        See all {cat.toLowerCase()}
                      </a>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}

            {person.ideas.length === 0 && (
              <div data-idea="1" className="lucky__help">
                <p>Tell me three things about them. I’ll find the feeling.</p>
                <WaLink className="btn btn--light" href={wa(MSG.suggest)}>Chat on WhatsApp</WaLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
