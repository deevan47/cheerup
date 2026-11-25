import { useState } from 'react';
import './Request.css';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';

// What kind of request is it? One choice, so these are radios, not toggles.
const KINDS = ['A new product', 'A gift for a specific need', 'A bulk or team order', 'A change to something you make', 'A suggestion for you'];
// Tap-to-fill starting points. Three, not six: eleven buttons before the visitor
// had typed a word was a wall of choices, not a nudge.
const STARTERS = [
  'A gift for the whole team',
  'Something for their desk',
  'A tote bag with an inside joke',
];

const today = () => new Date().toISOString().slice(0, 10);

export default function Request() {
  const [f, setF] = useState({ name: '', kind: KINDS[0], what: '', qty: '', when: '', area: '', budget: '' });
  // the value is read now, not inside the updater: see the note in pages/faq/Faq.jsx
  const set = (k) => (e) => { const { value } = e.target; setF((v) => ({ ...v, [k]: value })); };
  const fill = (text) => setF((v) => ({ ...v, what: v.what ? `${v.what.trim()} ${text}` : text }));

  return (
    <section data-screen-label="Request" className="request">
      <div className="request__head">
        <h1 className="h-page">Request a <span className="accent">custom gift.</span></h1>
        <p className="lead">Not in the catalogue? Tell me what you want and <b className="hl">I’ll make it and deliver it in Pune.</b> I read every request myself.</p>
      </div>

      <div className="request__grid">
        <form className="request__form" onSubmit={(e) => e.preventDefault()}>
          {/* A fieldset and radios, because this is one choice out of five. As five
              aria-pressed buttons a screen reader announced five unrelated on/off
              switches and never read the question. */}
          <fieldset className="req__kinds">
            <legend>What kind of request is it?</legend>
            <div className="req__chips">
              {KINDS.map((k) => (
                <label key={k} className={`chip${f.kind === k ? ' chip--on' : ''}`}>
                  <input
                    type="radio"
                    name="kind"
                    className="sr-only"
                    value={k}
                    checked={f.kind === k}
                    onChange={() => setF((v) => ({ ...v, kind: k }))}
                  />
                  {k}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="req-what">Tell me about it</label>
            <textarea
              id="req-what" value={f.what} onChange={set('what')} rows={5}
              placeholder="What is it, who’s it for, and what should it say or show? A rough idea is fine."
            />
          </div>
          <div className="req__starters">
            <span>Need a nudge?</span>
            {STARTERS.map((s) => (
              <button key={s} type="button" className="chip req__starter" onClick={() => fill(s)}>{s}</button>
            ))}
          </div>

          <div className="req__row">
            <div className="field">
              <label htmlFor="req-qty">How many?</label>
              <input id="req-qty" value={f.qty} onChange={set('qty')} inputMode="numeric" placeholder="1" />
            </div>
            <div className="field">
              <label htmlFor="req-budget">Budget (optional)</label>
              <input id="req-budget" value={f.budget} onChange={set('budget')} inputMode="numeric" placeholder="e.g. ₹500" />
            </div>
          </div>

          {/* Two answers, two fields. One "Date and area" box got half-filled every
              time, and the rest had to be asked again on WhatsApp. */}
          <div className="req__row">
            <div className="field">
              <label htmlFor="req-date">Delivery date</label>
              <input id="req-date" type="date" value={f.when} onChange={set('when')} min={today()} />
            </div>
            <div className="field">
              <label htmlFor="req-area">Area in Pune</label>
              <input id="req-area" value={f.area} onChange={set('area')} autoComplete="address-level3" placeholder="e.g. Kothrud" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="req-name">Your name (optional)</label>
            <input id="req-name" value={f.name} onChange={set('name')} autoComplete="name" placeholder="So I know who’s asking" />
          </div>

          <div className="req__send">
            <WaLink href={wa(MSG.request(f))}>Send request on WhatsApp</WaLink>
            <p className="field__hint">You can share photos or a sketch in the chat.</p>
          </div>
        </form>

        <aside className="request__side">
          <h2>What happens next</h2>
          <ol>
            <li><b>I read it myself</b> and reply on WhatsApp.</li>
            <li><b>I confirm the details</b> and the price with you.</li>
            <li><b>You get a free preview</b> first. Nothing is printed, and you pay nothing, until you’ve approved it.</li>
          </ol>
          <p className="request__note">Delivering in Pune only for now. Your photos are deleted after delivery.</p>
        </aside>
      </div>
    </section>
  );
}
