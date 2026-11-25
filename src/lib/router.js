// Path-based routing (/gifts, /my-story, ...) with no router dependency.
//
// Why paths and not '#/gifts': everything behind a '#' is one URL to Google and to
// WhatsApp link previews, so no inner page could ever rank or be shared on its own.
//
// Two things make this work when the site is hosted on GitHub Pages:
//   1. public/404.html is a copy of index.html, so a deep link like /gifts still
//      loads the app instead of GitHub's 404 page (see scripts/prerender.mjs).
//   2. Old '#/gifts' links are rewritten to the new path on load, below.
import { DEFAULT_PAGE, ROUTES, findRoute } from '../routes';

/** Old hash keys -> page keys. Keeps links shared before the move working. */
const LEGACY_KEYS = {
  home: 'home', products: 'products', request: 'request', how: 'how', about: 'about',
  reviews: 'reviews', faq: 'faq', contact: 'contact', refund: 'refund',
  shipping: 'shipping', privacy: 'privacy', terms: 'terms',
};

let serverPath = null;   // set while pre-rendering, where there is no location

/** Pre-render only: tells the router which page it is building. */
export const setServerPath = (p) => { serverPath = p; };

const normalise = (p) => {
  const clean = (p || '/').split('?')[0].split('#')[0].replace(/\/index\.html$/, '/');
  const trimmed = clean.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

/** '/gifts' -> 'products'. Unknown paths fall back to the home page. */
export function pathToKey(pathname) {
  const p = normalise(pathname);
  const hit = ROUTES.find((r) => r.path === p);
  return hit ? hit.key : DEFAULT_PAGE;
}

/** The page key for the URL we are on (or pre-rendering). */
export function parsePage() {
  if (typeof window === 'undefined') return pathToKey(serverPath || '/');
  return pathToKey(window.location.pathname);
}

/**
 * Rewrites a legacy '#/gifts' URL to '/gifts' before the app renders.
 * Returns true if it redirected.
 */
export function redirectLegacyHash() {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash || '';
  if (!hash.startsWith('#/')) return false;
  const key = LEGACY_KEYS[hash.replace(/^#\/?/, '').split(/[?/]/)[0]];
  if (!key) return false;
  window.history.replaceState(null, '', findRoute(key).path);
  return true;
}

/**
 * Turns every in-site <a href="/..."> into a client-side navigation, so one
 * document-level listener replaces an onClick on every link.
 *
 * Leaves alone: new tabs, modified clicks, downloads, external links, bare '#foo'
 * anchors and a link to a section of the page you are already on, so the browser's
 * own anchor jump keeps working.
 *
 * `onNavigate(key, hash)` gets the page to show and any '#section' to scroll to.
 */
export function interceptLinks(onNavigate) {
  const handler = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const raw = a.getAttribute('href');
    if (!raw || raw.startsWith('#')) return;             // an anchor on this page
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return;   // off-site
    const key = pathToKey(url.pathname);
    if (findRoute(key).path !== normalise(url.pathname)) return;   // not one of our pages
    if (normalise(url.pathname) === normalise(window.location.pathname)) return;  // same page
    e.preventDefault();
    // title first: Google Analytics records the page view at the moment of pushState
    document.title = findRoute(key).title;
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
    onNavigate(key, url.hash);
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}
