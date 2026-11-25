import { useApp } from '../AppContext';
import { wa, MSG } from '../lib/whatsapp';
import WaLink from './WaLink';
import './StickyBar.css';

/**
 * Phone-only WhatsApp bar that slides up once you have scrolled a bit.
 *
 * App.jsx decides when it may show (`showBar`): never on the Request or Contact
 * pages, where it covered the form and duplicated its submit button, and never
 * while a field has focus, where it sat on top of what you were typing.
 */
export default function StickyBar() {
  const { barUp, showBar, sheet } = useApp();
  return (
    <div className={`sticky-bar${showBar && barUp && !sheet ? ' is-up' : ''}`}>
      <WaLink className="btn btn--primary" href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
    </div>
  );
}
