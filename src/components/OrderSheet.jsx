import { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext';
import { wa, MSG } from '../lib/whatsapp';
import WaLink from './WaLink';
import './OrderSheet.css';

/**
 * The "Personalise this" panel.
 *
 * It renders only while it is open. It used to sit in the DOM on all twelve pages
 * with an empty <h2>, so every page's heading outline ended with a blank heading
 * and the closed panel's fields were still reachable by Tab.
 *
 * While open it is a real modal: focus moves to the title, Tab cycles inside it,
 * Escape closes it (handled in App.jsx) and focus returns to the button that
 * opened it.
 */
export default function OrderSheet() {
  const { sheet, setSheet, sheetOpener } = useApp();
  const [form, setForm] = useState({ who: '', what: '', when: '', area: '' });
  const panel = useRef(null);
  const title = useRef(null);

  const open = !!sheet;

  // focus in on open, and back to the trigger on close
  useEffect(() => {
    if (!open) {
      if (sheetOpener.current) { sheetOpener.current.focus(); sheetOpener.current = null; }
      return;
    }
    setForm({ who: '', what: '', when: '', area: '' });   // a fresh panel per product
    if (title.current) title.current.focus();
  }, [open, sheetOpener]);

  // keep Tab inside the panel while it is open
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Tab' || !panel.current) return;
      const stops = panel.current.querySelectorAll('a[href], button, input, textarea, [tabindex="0"]');
      if (!stops.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  // the value is read now, not inside the updater: see the note in pages/faq/Faq.jsx
  const set = (k) => (e) => { const { value } = e.target; setForm((f) => ({ ...f, [k]: value })); };
  const close = () => setSheet(null);

  return (
    <>
      <div className="sheet-backdrop" onClick={close} />
      <aside
        ref={panel}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
      >
        <div className="sheet__bar">
          <span className="eyebrow sheet__eyebrow">Personalise it</span>
          <button className="sheet__close" onClick={close}>Close</button>
        </div>
        <div>
          <h2 id="sheet-title" ref={title} tabIndex={-1} className="sheet__title">{sheet.n}</h2>
          <p className="sheet__cat">{sheet.cat}</p>
        </div>

        <div className="field">
          <label htmlFor="sheet-who">Who’s it for?</label>
          <input id="sheet-who" value={form.who} onChange={set('who')} autoComplete="off" placeholder="Their name, and who they are to you" />
        </div>
        <div className="field">
          <label htmlFor="sheet-what">What should it say or show?</label>
          <textarea id="sheet-what" value={form.what} onChange={set('what')} rows={3} placeholder="A name, a line, a photo idea. Or “surprise me”" />
        </div>
        <div className="sheet__row">
          <div className="field">
            <label htmlFor="sheet-date">Delivery date</label>
            <input id="sheet-date" type="date" value={form.when} onChange={set('when')} min={new Date().toISOString().slice(0, 10)} />
          </div>
          <div className="field">
            <label htmlFor="sheet-area">Area in Pune</label>
            <input id="sheet-area" value={form.area} onChange={set('area')} autoComplete="address-level3" placeholder="e.g. Kothrud" />
          </div>
        </div>

        <p className="sheet__note">Send your photos in the chat. You’ll see a free preview before you pay anything, and your photos are deleted after delivery.</p>
        <WaLink className="btn btn--primary sheet__send" href={wa(MSG.sheet(sheet, form))}>Send on WhatsApp</WaLink>
      </aside>
    </>
  );
}
