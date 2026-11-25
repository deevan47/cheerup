import './How.css';
import { STEPS } from '../../data/steps';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';

export default function How() {
  return (
    <>
      <section data-screen-label="How it works" className="how-hero">
        <h1 className="h-page">From a feeling to <span className="accent">their doorbell.</span></h1>
        {/* The Home page promises three steps. This page says seven, so it has to
            say whose they are, or the shorter promise looks like a fib. */}
        <p className="lead">Seven steps. You only do four of them, all on WhatsApp. <b className="hl">Not a rupee until you’ve seen the design and loved it.</b></p>
      </section>

      <section className="how-steps-section">
        {/* data-steps / data-line / data-dot are used by lib/motion.js (drawLine) */}
        <ol data-steps="1" className="steps">
          <div className="steps__track" />
          <div data-line="1" className="steps__fill" />
          {STEPS.map(([t, d, yours]) => (
            <li key={t} className="step">
              <span data-dot="1" className="step__dot" aria-hidden="true" />
              <h2>
                {t}
                {yours && <span className="step__tag">You</span>}
              </h2>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section data-reveal="1" className="how-cta">
        <div className="how-cta__box on-dark">
          <p>The first step costs nothing. Just say hi.</p>
          <WaLink className="btn btn--light" href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
        </div>
      </section>
    </>
  );
}
