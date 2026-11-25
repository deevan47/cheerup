// Real customer reviews only.
//
// There used to be three sample reviews here, written for the template, each shown
// with a badge reading "Sample review, replace with a real customer quote" and an
// author of "Customer name, mug for a birthday". The only social proof on the site
// announced that it was invented, which reads worse than having none.
//
// To add a real one, with the customer's permission:
//   { q: 'what they said', who: 'First name, area', product: 'Mug' }
// At three or more, put Reviews back in the nav: in routes.jsx change the reviews
// route's  group: 'extra'  to  group: 'main'.
export const REVIEWS = [];

// Real photos of delivered gifts, for the gallery on the Reviews page.
//   { src: 'photos/file.jpg', alt: 'what it shows' }   then run `npm run images`
// Empty means the section is not rendered at all; it used to draw six dashed
// placeholder boxes, about 1,400px of empty frames titled "Delivered. Smiled at."
export const DELIVERED = [];
