import { Eye } from '../../components/Logo';
import { intro } from '../../lib/motion';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';
import { href } from '../../routes';

const TRUST = ['See it first, free', 'Pay only once you love it', 'No online payment. Just a chat.', 'Your photos deleted after delivery'];

export default function Hero() {
  return (
    <section data-screen-label="Home" className="hero">
      <div className="hero__copy">
        <p className="eyebrow">Made for one person · Pune</p>
        <h1 className="hero__title">Give them the <span className="accent">“you remembered” moment.</span></h1>
        <p className="hero__lead">
          That tiny pause when they open it, go quiet, and realise you really thought of them? I make that happen. Their photo, their name, your inside joke.{' '}
          <b className="hl">At their door in Pune within 24 hours.</b>
        </p>
        <div className="hero__cta">
          {/* The main action is the chat. The old primary button sent everyone to
              the off-catalogue request form instead, which is the opposite of what
              the headline promises. */}
          <WaLink href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
          <a className="btn btn--outline" href={href('products')}>See the gifts</a>
        </div>
        <ul className="hero__trust">
          {TRUST.map((t) => <li key={t}><Eye />{t}</li>)}
        </ul>
      </div>
      <div className="hero__art">
        <HeroLogo />
      </div>
    </section>
  );
}

// The animated logo: smile draws in via a mask, eyes drop on top, tagline fades in. See lib/motion.js (intro).
// LOCKED: shapes, colours, size and the animation. Do not touch.
function HeroLogo() {
  return (
    <svg className="hero__logo" viewBox="0 0 800 480" onMouseEnter={() => intro(true)} role="img" aria-label="Cheer Up, Smile Delivered">
      <defs>
        <mask id="cu-draw" maskUnits="userSpaceOnUse" x="-20" y="-20" width="840" height="400">
          <path
            data-draw="1" transform="translate(-140 -155)"
            d="M308 296 L290 258 L255 246 L205 262 L176 320 L205 382 L262 390 L300 382 L345 410 L440 466 L520 482 L600 469 L690 420 L745 355 L768 290 L792 246 L822 266 L818 315 L816 360 L840 403 L878 396 L898 345 L906 285 L910 228"
            fill="none" stroke="#fff" strokeWidth="86" strokeLinecap="round" strokeLinejoin="round"
            pathLength="1" strokeDasharray="1 2" strokeDashoffset="0"
          />
        </mask>
      </defs>
      <use href="#g-smile" width="800" height="355" mask="url(#cu-draw)" />
      <use data-eyes="1" href="#g-eyes" width="800" height="355" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }} />
      <use data-tag="1" href="#g-tag" x="62.5" y="400" width="675" height="78" />
    </svg>
  );
}
