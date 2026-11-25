import './About.css';
import { SITE } from '../../data/site';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';

const WHY = [
  ['One human. Start to finish.', 'The person who reads your message is the person who makes your gift.'],
  ['Made for one. Never mass-made.', 'Nothing comes off a shelf. Every piece is made for one person you love.'],
  // The heading promises checking, so the body has to be about checking.
  ['Checked by hand. Every time.', 'Every piece is checked against the design you approved before it leaves. Not right? It doesn’t go.'],
  ['Clueless? Perfect.', 'Tell me about them. I’ll find the gift that says it for you.'],
];

/**
 * PHOTO NOTE (owner): see pages/home/FounderTeaser.jsx. The old markup pointed at
 * /pi/founder.jpeg, which is not in the build, so this page opened with a broken
 * image in a 460x575 box showing the alt text "Photo: Deevan, ideally at work on
 * an order" — a note to self, on screen, at the top of the page on phones.
 */
export default function About() {
  return (
    <>
      <section data-screen-label="About" className="about">
        <div className="about__text">
          <h1 className="h-page">Hi, I’m <span className="accent">{SITE.founderName}.</span></h1>
          <p className="about__tagline">For the moment someone opens a gift, goes quiet, and realises you really thought about them.</p>
          <div className="about__body">
            <p>Tell me who it’s for and what they love. I’ll turn that into something made only for them, send you a preview, and deliver it once you approve.</p>
            <p>It’s quick, and priced so <strong className="hl">students can afford it</strong>, because showing you care shouldn’t cost a fortune.</p>
            <p>Cheer Up is small on purpose, so your gift gets my full attention.</p>
            <p className="about__em">My only aim is to deliver the smile you want to see.<span data-underline="1" aria-hidden="true" /></p>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="why__inner">
          <h2 data-reveal="1" className="h-section">Why one person who cares <span className="accent">beats an app.</span></h2>
          <div data-reveal="1" className="why__grid">
            {/* A rule and a heading, not four copies of the same icon: repeating one
                mark four times reads as a template, and the brand eye already does
                its job once, in the hero. */}
            {WHY.map(([h, p]) => (
              <div key={h} className="why__item">
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal="1" className="about-cta">
        <p>Now you know me. Tell me about them.</p>
        <WaLink href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
      </section>
    </>
  );
}
