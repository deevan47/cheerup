import { useApp } from '../AppContext';
import { NAV } from '../routes';
import { wa, MSG } from '../lib/whatsapp';
import WaLink from './WaLink';
import './MobileMenu.css';

/**
 * The menu starts at the header's real bottom edge, which App.jsx measures into
 * --hdr-bottom when it opens. It used to be pinned at a hard-coded 80px, so when
 * the strip above the header was on screen the first item was cut in half.
 *
 * App.jsx also marks the page behind it inert while it is open and hands focus to
 * the first link, so Tab cannot wander behind the menu.
 */
export default function MobileMenu() {
  const { page, menu, setMenu } = useApp();
  return (
    <div id="mobile-menu" className={`mobile-menu${menu ? ' is-open' : ''}`}>
      <nav aria-label="Mobile">
        {NAV.map((r) => (
          <a key={r.key} href={r.path} className={here(page, r.key) ? 'is-active' : undefined} aria-current={here(page, r.key) ? 'page' : undefined} onClick={() => setMenu(false)}>
            {r.label}
          </a>
        ))}
      </nav>
      {/* the main action has to stay reachable once the menu covers the header */}
      <WaLink className="btn btn--primary mobile-menu__cta" href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
    </div>
  );
}

// A gift's own page (/gifts/mugs) counts as being on Gifts.
const here = (page, key) => page === key || (key === 'products' && page.startsWith('gift-'));
