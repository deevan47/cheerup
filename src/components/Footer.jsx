import { NAV, POLICIES, href } from '../routes';
import { SITE } from '../data/site';
import { wa, MSG } from '../lib/whatsapp';
import { Logo } from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <a href={href('home')} className="site-footer__logo" aria-label={`${SITE.name}, back to home`}>
            <Logo variant="stack" label={`${SITE.name}, ${SITE.tagline}`} />
          </a>
          {/* a statement, not a link: it used to sit in the links column styled like one */}
          <p className="site-footer__where">Delivering smiles across {SITE.city}</p>
        </div>
        <nav aria-label="Footer" className="site-footer__col">
          <span className="site-footer__head">Pages</span>
          {NAV.map((r) => <a key={r.key} href={r.path}>{r.label}</a>)}
        </nav>
        <nav aria-label="Policies" className="site-footer__col">
          <span className="site-footer__head">Policies</span>
          {POLICIES.map((r) => <a key={r.key} href={r.path}>{r.label}</a>)}
        </nav>
        <nav aria-label="Contact" className="site-footer__col">
          <span className="site-footer__head">Talk to me</span>
          <a href={wa(MSG.order)} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </nav>
      </div>
      <div className="site-footer__legal">© {SITE.year} {SITE.name}. {SITE.tagline}.</div>
    </footer>
  );
}
