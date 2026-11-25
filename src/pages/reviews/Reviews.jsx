import './Reviews.css';
import { DELIVERED, REVIEWS } from '../../data/reviews';
import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';
import Photo from '../../components/Photo';

/**
 * Honest about being new.
 *
 * All three reviews on this page were samples, labelled as samples on screen, and
 * the gallery under them was six dashed placeholder boxes. Until there are real
 * quotes, the page says so and asks for one. Reviews is also out of the nav while
 * this is the case (see routes.jsx).
 */
export default function Reviews() {
  const empty = REVIEWS.length === 0;

  return (
    <>
      <section data-screen-label="Reviews" className="reviews-hero">
        {empty ? (
          <>
            <h1 className="h-page">Reviews are <span className="accent">on their way.</span></h1>
            <p className="lead">Cheer Up is new. Real reviews from real customers go up here, with their permission.</p>
          </>
        ) : (
          <>
            <h1 className="h-page">Don’t take <span className="accent">my word</span> for it.</h1>
            <p className="lead">Every order so far came from a friend of a friend. Here’s what they felt.</p>
          </>
        )}
        <p className="reviews-hero__ask">
          <WaLink href={wa(MSG.review)}>Send me your photo on WhatsApp</WaLink>
        </p>
      </section>

      {/* All of them, stacked. Behind tabs, only one review was ever read. */}
      {!empty && (
        <section className="reviews-list">
          {REVIEWS.map((r) => (
            <figure key={r.q} className="review">
              <blockquote>“{r.q}”</blockquote>
              <figcaption>{r.who}</figcaption>
            </figure>
          ))}
        </section>
      )}

      {DELIVERED.length > 0 && (
        <section className="delivered">
          <div data-reveal="1" className="delivered__head">
            <h2 className="h-section">Delivered. <span className="accent">Smiled at.</span></h2>
          </div>
          <div data-reveal="1" className="delivered__masonry">
            {DELIVERED.map((p) => (
              <Photo key={p.src} src={p.src} alt={p.alt} sizes="(max-width: 700px) 92vw, 260px" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
