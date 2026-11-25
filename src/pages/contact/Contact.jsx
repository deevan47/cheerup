import { useEffect, useRef, useState } from 'react';
import './Contact.css';
import { SITE } from '../../data/site';
import { href } from '../../routes';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyNumber = () => {
    try {
      const pr = navigator.clipboard && navigator.clipboard.writeText(SITE.phoneCopy);
      if (pr && pr.catch) pr.catch(() => {});
    } catch (e) { /* clipboard not available */ }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section data-screen-label="Contact" className="contact">
      <div className="contact__head">
        {/* Two lines, not four: the number used to start about 800px down, below the
            first screen, on the one page whose job is to show the number. */}
        <h1 className="h-page">Someone’s about to feel special. <span className="accent">Message me.</span></h1>
        <p className="lead">Orders, questions, half-formed ideas. <b className="hl">Every message lands on my phone, not a team’s.</b></p>
      </div>

      <div className="contact__grid">
        <div className="contact__main">
          <p className="eyebrow">WhatsApp</p>
          <a className="contact__number" href={wa(MSG.order)} target="_blank" rel="noopener">{SITE.phoneDisplay}</a>
          <div className="contact__actions">
            <WaLink href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
            <button className="contact__copy" onClick={copyNumber}>{copied ? 'Copied' : 'Copy number'}</button>
          </div>
        </div>
        <div className="contact__side">
          <div>
            <p className="eyebrow">Email</p>
            <a className="contact__email" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div>
            <p className="eyebrow">Where</p>
            <p>{SITE.city}. Ordered on WhatsApp, delivered to their door.</p>
          </div>
          <div>
            <p className="eyebrow">Your photos</p>
            <p>Yours alone, and deleted right after delivery. <a href={href('privacy')}>Privacy</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
