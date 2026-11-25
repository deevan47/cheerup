// Per-page <head>: title, description, canonical, Open Graph and structured data.
//
// Two users of this file:
//   - the browser, via applyHead() on every page change
//   - scripts/prerender.mjs, via headTags() to write the same tags into the static HTML
// Keep it pure: headTags() must not touch the DOM.
import { CATS, catPath, imageFor, lowestPrice } from '../data/products';
import { ROUTES } from '../routes';
import { SITE } from '../data/site';

export const ORIGIN = 'https://cheerup.in';
const OG_IMAGE = `${ORIGIN}/og.jpg`;

/** Everything Google needs to tie the site to one real shop in Pune. */
function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${ORIGIN}/#business`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    slogan: SITE.tagline,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/favicon.svg`,
    image: OG_IMAGE,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    // Read from the catalogue rather than typed in, so it cannot go stale. Only a
    // floor: most prices are still to be set, and the top end would be a guess.
    priceRange: `From ₹${lowestPrice()}`,
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: 'Maharashtra', addressCountry: 'IN' },
    areaServed: { '@type': 'City', name: SITE.city },
  };
}

/**
 * The site's name for Google. This is what Google reads to show "Cheer Up" as the
 * site name above the result, and what ties searches for "cheerup" or "cheer up
 * pune" to cheerup.in. Home page only, as Google asks.
 */
function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: `${ORIGIN}/`,
    publisher: { '@id': `${ORIGIN}/#business` },
  };
}

/**
 * One Product per option that has a price, for the Gifts page.
 *
 * Options without a price are left out entirely: an Offer with no price is
 * invalid structured data, and Google would flag the page for it. They join the
 * listing on their own as soon as a price is set in data/products.js. Same for
 * the image: included only once a real photo has been added.
 */
function productsJsonLd(cats = CATS) {
  return cats.flatMap((c) =>
    c.options
      .filter((o) => o.price != null)
      .map((o) => {
        const img = imageFor(c, o);
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: o.n,
          category: c.name,
          description: o.d,
          ...(img ? { image: `${ORIGIN}/${img.src}` } : {}),
          brand: { '@type': 'Brand', name: SITE.name },
          offers: {
            '@type': 'Offer',
            price: o.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            areaServed: SITE.city,
            url: `${ORIGIN}${catPath(c)}/`,
          },
        };
      }),
  );
}

/**
 * The tags for one page, as plain data.
 *   { title, meta: [{name|property, content}], canonical, jsonLd: [...] }
 */
export function headTags(key) {
  const r = ROUTES.find((x) => x.key === key) || ROUTES[0];
  // Trailing slash on purpose: GitHub Pages serves /gifts/index.html and 301s
  // /gifts -> /gifts/, so the canonical has to be the URL that actually answers.
  const url = `${ORIGIN}${r.path === '/' ? '/' : `${r.path}/`}`;
  const jsonLd = [localBusinessJsonLd()];
  if (key === 'home') jsonLd.unshift(websiteJsonLd());
  if (key === 'products') jsonLd.push(...productsJsonLd());
  const gift = key.startsWith('gift-') && CATS.find((c) => `gift-${c.id}` === key);
  if (gift) {
    jsonLd.push(...productsJsonLd([gift]));
    // "Cheer Up > Gifts > Mugs" under the result, instead of the bare URL
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Cheer Up', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Gifts', item: `${ORIGIN}/gifts/` },
        { '@type': 'ListItem', position: 3, name: gift.name, item: url },
      ],
    });
  }
  return {
    title: r.title,
    canonical: url,
    meta: [
      { name: 'description', content: r.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:title', content: r.title },
      { property: 'og:description', content: r.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: r.title },
      { name: 'twitter:description', content: r.description },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    jsonLd,
  };
}

/** Writes the tags for `key` into the live document, replacing the previous page's. */
export function applyHead(key) {
  if (typeof document === 'undefined') return;
  const t = headTags(key);
  document.title = t.title;

  const set = (selector, make) => {
    let el = document.head.querySelector(selector);
    if (!el) { el = make(); document.head.appendChild(el); }
    return el;
  };

  t.meta.forEach((m) => {
    const attr = m.name ? 'name' : 'property';
    const value = m.name || m.property;
    const el = set(`meta[${attr}="${value}"]`, () => {
      const n = document.createElement('meta');
      n.setAttribute(attr, value);
      return n;
    });
    el.setAttribute('content', m.content);
  });

  set('link[rel="canonical"]', () => {
    const n = document.createElement('link');
    n.setAttribute('rel', 'canonical');
    return n;
  }).setAttribute('href', t.canonical);

  // one script tag holds every block, so swapping pages can't leave stale data behind
  set('script[data-jsonld]', () => {
    const n = document.createElement('script');
    n.type = 'application/ld+json';
    n.setAttribute('data-jsonld', '');
    return n;
  }).textContent = JSON.stringify(t.jsonLd.length === 1 ? t.jsonLd[0] : t.jsonLd);
}
