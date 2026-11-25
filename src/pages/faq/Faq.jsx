import { useState } from 'react';
import './Faq.css';
import { FAQS } from '../../data/faqs';
import { wa, MSG } from '../../lib/whatsapp';
import { PlusMinusIcon } from '../../components/icons';
import { WaTextLink } from '../../components/WaLink';

/**
 * Built on <details>/<summary>, so expanding works with the keyboard, with a
 * screen reader and with JavaScript still loading, none of which was true of the
 * old pair of div and aria-expanded button.
 *
 * The icon is a plus when closed and a minus when open. The old one was the brand
 * smile arc pointing up when closed, which reads as "collapse": backwards from
 * what everyone expects.
 */
export default function Faq() {
  const [open, setOpen] = useState(() => FAQS.map((f) => !!f.open));

  return (
    <section data-screen-label="FAQ" className="faq">
      <div className="faq__intro">
        <h1 className="h-page">Fair questions. <span className="accent">Honest answers.</span></h1>
        <p>
          Still wondering?{' '}
          <WaTextLink href={wa(MSG.order)}>Just ask me on WhatsApp</WaTextLink>
        </p>
      </div>
      <div className="faq__list">
        {FAQS.map((f, i) => (
          <details
            key={f.q}
            className="faq__item"
            open={open[i]}
            /* Read .open here, not inside the updater below. React sets
               event.currentTarget back to null once the handler returns, and a
               state updater runs later, during the render: reading it there threw
               and took the whole page down with it. */
            onToggle={(e) => {
              const isOpen = e.currentTarget.open;
              setOpen((o) => o.map((v, n) => (n === i ? isOpen : v)));
            }}
          >
            <summary className="faq__q">
              <span>{f.q}</span>
              <PlusMinusIcon open={open[i]} />
            </summary>
            <div className="faq__a">
              <p>{f.a}</p>
              {f.link && <a className="tap" href={f.link}>{f.linkLabel}</a>}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
