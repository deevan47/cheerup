import { useApp } from '../AppContext';
import { NAV, href } from '../routes';
import { SITE } from '../data/site';
import { wa, MSG } from '../lib/whatsapp';
import { Logo } from './Logo';
import WaLink from './WaLink';
import './Header.css';

/**
 * Six links and one button. There used to be eight links, an outlined
 * "Request a gift" pill and a filled "Start their moment" button all in the same
 * 80px strip, with "Request a gift" also repeated in the bar above it, so two
 * buttons competed for the same click.
 *
 * Both layouts are always in the markup and CSS decides which one shows. That way
 * the pre-rendered HTML is correct at any screen width, with no flash of the wrong
 * header while the JavaScript loads.
 */
export default function Header() {
  const { page, menu, setMenu, closeMenu, menuBtn } = useApp();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href={href('home')} className="site-header__logo" aria-label={`${SITE.name}, back to home`}>
          <Logo variant="horiz-nt" />
        </a>
        <nav aria-label="Main" className="site-nav">
          {NAV.map((r) => (
            <a key={r.key} href={r.path} className={page === r.key ? 'is-active' : undefined} aria-current={page === r.key ? 'page' : undefined}>
              {r.label}
            </a>
          ))}
        </nav>
        <WaLink className="btn btn--primary btn--sm site-header__cta" href={wa(MSG.order)}>Chat on WhatsApp</WaLink>
        <button
          ref={menuBtn}
          className="menu-toggle"
          onClick={() => (menu ? closeMenu() : setMenu(true))}
          aria-expanded={menu}
          aria-controls="mobile-menu"
        >
          {menu ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
