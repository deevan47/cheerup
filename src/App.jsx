import { useCallback, useEffect, useRef, useState } from 'react';
import { AppContext } from './AppContext';
import { findRoute } from './routes';
import { interceptLinks, parsePage, redirectLegacyHash } from './lib/router';
import { applyHead } from './lib/head';
import useNarrow from './hooks/useNarrow';
import { drawLine, enter, reducedMotion, stopObserving } from './lib/motion';
import BrandSprite from './components/BrandSprite';
import RequestBar from './components/RequestBar';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import StickyBar from './components/StickyBar';
import Footer from './components/Footer';
import OrderSheet from './components/OrderSheet';

const PAGE_FADE_MS = 240;
// Pages whose own form is the main action, so the sticky WhatsApp bar would just
// cover the fields and duplicate the submit button.
const NO_STICKY_BAR = ['request', 'contact'];

export default function App() {
  const [page, setPage] = useState(parsePage);
  const [shown, setShown] = useState(true);       // main content fade between pages
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(null);       // product being personalised, or null
  const [barUp, setBarUp] = useState(false);      // mobile WhatsApp bar visible
  const [typing, setTyping] = useState(false);    // a field has focus: get out of the way
  // the one choice that survives moving between pages: who you picked on the Home page
  const [person, setPerson] = useState(0);
  const narrow = useNarrow();

  const pageRef = useRef(page);
  const timer = useRef(0);
  const menuBtn = useRef(null);     // so closing the menu can hand focus back
  const sheetOpener = useRef(null); // the button that opened the order sheet

  /** Scroll to the top, or to the '#section' the link asked for. */
  const land = (hash) => {
    const target = hash && document.querySelector(hash);
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  };

  /** Fade out, swap the page, fade in. */
  const go = useCallback((p, hash = '') => {
    if (p === pageRef.current) {
      land(hash);
      return;
    }
    setMenu(false);
    setSheet(null);
    clearTimeout(timer.current);
    if (reducedMotion()) {
      pageRef.current = p;
      setPage(p);
      requestAnimationFrame(() => land(hash));
      return;
    }
    setShown(false);
    timer.current = setTimeout(() => {
      pageRef.current = p;
      setPage(p);
      setShown(true);
      requestAnimationFrame(() => land(hash));
    }, PAGE_FADE_MS);
  }, []);

  // one-time: rewrite an old '#/gifts' link to '/gifts', then honour a '#section'
  // in a deep link now that the page it points into exists
  useEffect(() => {
    if (redirectLegacyHash()) { go(parsePage()); return; }
    const hash = window.location.hash;
    if (hash) requestAnimationFrame(() => land(hash));
  }, [go]);

  useEffect(() => {
    const onPop = () => go(parsePage(), window.location.hash);
    const onScroll = () => { drawLine(); setBarUp(window.scrollY > 420); };
    const onFocusIn = (e) => {
      const el = e.target;
      setTyping(!!(el && el.matches && el.matches('input, textarea, select')));
    };
    const onFocusOut = () => setTyping(false);
    const stopIntercept = interceptLinks(go);
    window.addEventListener('popstate', onPop);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      stopIntercept();
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      clearTimeout(timer.current);
      stopObserving();
    };
  }, [go]);

  /** Closing the menu by Escape or by the toggle puts focus back on the toggle. */
  const closeMenu = useCallback(() => {
    setMenu(false);
    if (menuBtn.current) menuBtn.current.focus();
  }, []);

  /** Escape closes the order sheet first, then the mobile menu, and restores focus. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (sheet) { setSheet(null); return; }   // OrderSheet returns focus to its trigger
      if (menu) closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheet, menu, closeMenu]);

  // leaving mobile layout closes the menu
  useEffect(() => { setMenu(false); }, [narrow]);

  // title, description, canonical, Open Graph and structured data for this page
  useEffect(() => { applyHead(page); }, [page]);

  /**
   * While the mobile menu is open, the page behind it must not be reachable by Tab
   * or readable by a screen reader, and the menu must start where the header ends.
   */
  useEffect(() => {
    const main = document.getElementById('main');
    const footer = document.querySelector('.site-footer');
    const behind = [main, footer].filter(Boolean);
    if (menu) {
      const header = document.querySelector('.site-header');
      if (header) {
        const bottom = Math.round(header.getBoundingClientRect().bottom);
        document.documentElement.style.setProperty('--hdr-bottom', `${bottom}px`);
      }
      behind.forEach((el) => { el.inert = true; el.setAttribute('aria-hidden', 'true'); });
      const first = document.querySelector('.mobile-menu a');
      if (first) first.focus();
    } else {
      behind.forEach((el) => { el.inert = false; el.removeAttribute('aria-hidden'); });
    }
    return () => { behind.forEach((el) => { el.inert = false; el.removeAttribute('aria-hidden'); }); };
  }, [menu]);

  // after every page change: run entrance animations (first load waits a beat)
  const firstLoad = useRef(true);
  useEffect(() => {
    let raf = 0;
    let t = 0;
    if (firstLoad.current) {
      firstLoad.current = false;
      t = setTimeout(() => enter(page), 30);
    } else {
      raf = requestAnimationFrame(() => enter(page));
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [page]);

  const { Page } = findRoute(page);
  const showBar = narrow && !NO_STICKY_BAR.includes(page) && !typing;
  const ctx = {
    page, narrow, menu, setMenu, closeMenu, menuBtn, sheet, setSheet, sheetOpener,
    barUp, showBar, person, setPerson,
  };

  return (
    <AppContext.Provider value={ctx}>
      <a className="skip" href="#main">Skip to content</a>
      <BrandSprite />
      <RequestBar />
      <Header />
      <MobileMenu />
      <StickyBar />
      <main id="main" tabIndex={-1} style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(10px)' }}>
        <Page />
      </main>
      <Footer />
      <OrderSheet />
    </AppContext.Provider>
  );
}
