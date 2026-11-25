import { SITE } from '../../data/site';
import { href } from '../../routes';
import { wa, MSG } from '../../lib/whatsapp';

/**
 * PHOTO NOTE (owner): there is no founder photo on the site. The old markup
 * pointed at /pi/founder.jpeg, which does not exist in the build, so the section
 * about a real person who cares rendered a broken image in a 556x695 box.
 *
 * To put it back: add the file as public/photos/founder.jpg (4:5, 1200x1500 or
 * larger), run `npm run images`, then render it here and in pages/about/About.jsx
 * with alt="Deevan, founder of Cheer Up, packing a gift".
 */
export default function FounderTeaser() {
  return (
    <section className="founder">
      <div data-reveal="1" className="founder__text">
        <p className="eyebrow">The person</p>
        <p className="founder__big">No call centre. No warehouse. <span className="accent">Just someone who truly cares.</span></p>
        <p className="founder__sub">I design it, check it and deliver it myself. Your gift carries your feelings, and I treat it that way.</p>
        <p className="founder__name">{SITE.founderName}, founder</p>
        <a className="tlink tap founder__link" href={href('about')}>Meet the person behind it</a>
      </div>

      {/* A gift tag with the real ways to reach me: a person you can ask before you pay. */}
      <aside data-reveal="1" className="tag" aria-label={`A note from ${SITE.founderName}`}>
        <span className="tag__hole" aria-hidden="true" />
        <p className="tag__to">A note from me</p>
        <p className="tag__msg">Every message is read by me, on my phone. Ask me anything before you pay a rupee.</p>
        <p className="tag__sign">{SITE.founderName}</p>
        <dl className="tag__ways">
          <div><dt>WhatsApp</dt><dd><a href={wa(MSG.order)} target="_blank" rel="noopener">{SITE.phoneDisplay}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
          <div><dt>Based in</dt><dd>{SITE.city}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
