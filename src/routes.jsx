// THE PAGE REGISTRY.
// To add a page: create the file in src/pages/, then add one line below.
//   group 'main'   -> shows in the header nav + footer "Pages" list (and mobile menu)
//   group 'policy' -> shows in the footer "Policies" list and the policy pages
//   group 'extra'  -> a real page with its own URL, but not in the nav
//   path           -> the real, crawlable URL (see lib/router.js). Change it and old
//                     links break, so add a redirect in LEGACY_PATHS if you do.
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import How from './pages/how/How';
import About from './pages/about/About';
import Reviews from './pages/reviews/Reviews';
import Faq from './pages/faq/Faq';
import Contact from './pages/contact/Contact';
import Request from './pages/request/Request';
import Refund from './pages/policies/Refund';
import Shipping from './pages/policies/Shipping';
import Privacy from './pages/policies/Privacy';
import Terms from './pages/policies/Terms';

// `title` and `description` go in the <head> per page (see lib/head.js).
// Keep descriptions at 155 characters or fewer.
export const ROUTES = [
  {
    key: 'home', label: 'Home', group: 'main', path: '/', Page: Home,
    title: 'Cheer Up | Personalised gifts in Pune, delivered in 24 hours',
    description: 'Personalised mugs, frames, pillows, calendars, magazines and more, made for one person and hand-delivered across Pune in 24 hours. Free preview first.',
  },
  {
    key: 'products', label: 'Gifts', group: 'main', path: '/gifts', Page: Products,
    title: 'Personalised mugs, frames, pillows and more | Cheer Up Pune',
    description: 'Thirteen kinds of personalised gift: mugs, frames, Polaroids, magnets, pillows, calendars, magazines, magic mirrors and more. From ₹35, in Pune.',
  },
  {
    key: 'request', label: 'Request a gift', group: 'main', path: '/request', Page: Request,
    title: 'Request a custom gift | Cheer Up Pune',
    description: 'Not in the catalogue? Describe the gift you want and I will make it and deliver it in Pune. Team orders, wedding favours and one-off ideas welcome.',
  },
  {
    key: 'how', label: 'How it works', group: 'main', path: '/how-it-works', Page: How,
    title: 'How ordering works | Cheer Up',
    description: 'Seven steps from your first message to their doorbell. A free design preview, 70% after you approve, 30% at the door. All on WhatsApp.',
  },
  {
    key: 'about', label: 'My story', group: 'main', path: '/my-story', Page: About,
    title: 'Meet Deevan, founder | Cheer Up',
    description: 'Cheer Up is one person in Pune. I read your message, design your gift, check it by hand and deliver it myself. Small on purpose.',
  },
  {
    key: 'faq', label: 'Questions', group: 'main', path: '/questions', Page: Faq,
    title: 'Questions about orders, payment and delivery | Cheer Up',
    description: 'How payment works, how fast delivery is, what happens to your photos, and whether you can cancel. Honest answers about ordering from Cheer Up.',
  },
  {
    key: 'contact', label: 'Contact', group: 'main', path: '/contact', Page: Contact,
    title: 'Contact Cheer Up on WhatsApp',
    description: 'Message Cheer Up on WhatsApp at +91 9505 9696 70 for personalised gifts in Pune. Orders, questions and half-formed ideas all welcome.',
  },
  // Not in the nav until there are real customer reviews to show (see data/reviews.js).
  {
    key: 'reviews', label: 'Reviews', group: 'extra', path: '/reviews', Page: Reviews,
    title: 'Reviews | Cheer Up',
    description: 'Cheer Up is new. Real reviews from real customers in Pune go up here, with their permission.',
  },
  {
    key: 'refund', label: 'Cancellation & refunds', group: 'policy', path: '/refunds', Page: Refund,
    title: 'Cancellation & refunds | Cheer Up',
    description: 'Cancel before printing starts for a full refund of your advance. Damaged or wrong order? Tell me within 24 hours with a photo.',
  },
  {
    key: 'shipping', label: 'Delivery', group: 'policy', path: '/delivery', Page: Shipping,
    title: 'Delivery | Cheer Up',
    description: 'Cheer Up delivers within Pune only, usually within 24 hours of you approving the design, with WhatsApp updates at every step.',
  },
  {
    key: 'privacy', label: 'Privacy', group: 'policy', path: '/privacy', Page: Privacy,
    title: 'Privacy | Cheer Up',
    description: 'What Cheer Up collects to make your gift, who it is shared with, and when your photos and details are deleted.',
  },
  {
    key: 'terms', label: 'Terms', group: 'policy', path: '/terms', Page: Terms,
    title: 'Terms of service | Cheer Up',
    description: 'The terms you order under: a free preview first, 70% on approval, 30% on delivery, all confirmed over WhatsApp.',
  },
];

export const NAV = ROUTES.filter((r) => r.group === 'main');
export const POLICIES = ROUTES.filter((r) => r.group === 'policy');
export const DEFAULT_PAGE = 'home';

export const findRoute = (key) => ROUTES.find((r) => r.key === key) || ROUTES[0];
/** The URL for a page key: href('products') -> '/gifts'. Use this for every internal link. */
export const href = (key) => findRoute(key).path;
