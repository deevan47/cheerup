import { wa, MSG } from '../../lib/whatsapp';
import WaLink from '../../components/WaLink';

export default function FinalCta() {
  return (
    <section data-reveal="1" className="final">
      <div className="final__box on-dark">
        <h2 className="h-section">Not sure how to show you care?</h2>
        <div>
          <p>Tell me three things about them. I’ll turn them into something they’ll treasure.</p>
          <WaLink className="btn btn--light" href={wa(MSG.suggest)}>Chat on WhatsApp</WaLink>
        </div>
      </div>
    </section>
  );
}
