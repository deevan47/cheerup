// THE CATALOGUE. Thirteen kinds of gift, in the order the owner listed them.
//
// ─── ADDING PHOTOS ────────────────────────────────────────────────────────────
// Every product has an empty image space on the site right now, on purpose.
// To fill one:
//   1. Put the file in  public/photos/  (any name; the comment beside each
//      product suggests one, so the folder stays tidy).
//   2. Change that product's  image: null  to  image: 'photos/your-file.jpg'
//   3. Write a short  alt:  describing what the photo shows, for people who
//      cannot see it ("White mug printed with a couple's photo").
//   4. Run  npm run images  so the site gets the fast, resized versions.
// A photo set on the CATEGORY (the `image` next to `name`) is used on the Home
// page tile, and for any product in that category that has no photo of its own.
// Portrait photos at 4:5 fit the space exactly; anything else is cropped to fit.
//
// The ten photos already in public/photos are noted beside the product they
// belong to. They are not switched on because they show the Cheer Up logo
// printed on the product instead of a customer's photo or name.
// ──────────────────────────────────────────────────────────────────────────────
//
// Shape of one category:
//   id       anchor on the Gifts page (/gifts#mugs) and the key everything links by
//   name     what the visitor reads
//   line     one sentence of feeling. Sell the moment, not the material.
//   pick     the word for what the visitor is choosing: 'Style', 'Shape', 'Size'
//   control  'chips' (default) or 'slider' (Photo frames only: ten sizes is a
//            range, not a row of buttons)
//   options  what can be ordered. Each one:
//     id     short key
//     n      the name on the card and in the WhatsApp message
//     d      one line about this option
//     price  rupees as a plain number, or null. null shows "Price on request";
//            it is never guessed. lib/money.js adds the ₹.
//     unit   optional, for anything not sold one at a time ('per print')
//     from   optional, true when `price` is the lowest of a range ("From ₹649")
//
// OWNER TO SUPPLY: every  price: null  below.

export const CATS = [
  {
    id: 'mugs',
    name: 'Mugs',
    image: null, alt: '',            // public/photos/mugs.jpg
    line: 'Their name in their hands, every single morning.',
    pick: 'Style',
    options: [
      { id: 'classic', n: 'Classic mug', price: 269,
        image: null, alt: '',        // public/photos/mugs-classic.jpg   (existing: photos/mug-white.jpg)
        d: 'Your photo, wrapped all the way round white ceramic.' },
      { id: 'colour', n: 'Colour-inside mug', price: 329,
        image: null, alt: '',        // public/photos/mugs-colour.jpg    (existing: photos/mug-colour-inside.jpg)
        d: 'White outside, a burst of colour inside and on the handle.' },
      // Added by the owner in CHEERUP-EXPLAINED.md: the handle is a heart.
      { id: 'heart', n: 'Heart holder mug', price: 559,
        image: null, alt: '',        // public/photos/mugs-heart.jpg
        d: 'The handle is a heart. Every time they pick it up, they are holding yours.' },
      { id: 'tea', n: 'Tea mug', price: null,
        image: null, alt: '',        // public/photos/mugs-tea.jpg
        d: 'Sized for chai, for the one who never says no to a cup.' },
      { id: 'magic', n: 'Magic mug', price: 539,
        image: null, alt: '',        // public/photos/mugs-magic.jpg     (existing: photos/mug-magic.jpg)
        d: 'Plain and dark until the chai goes in. Then the memory appears.' },
    ],
  },
  {
    id: 'frames',
    name: 'Photo frames',
    image: null, alt: '',            // public/photos/frames.jpg  (used for every size)
    line: 'The photo you keep going back to, given a wall of its own.',
    pick: 'Size',
    control: 'slider',
    // One option per size, 4 in to 32 in. The line under the slider changes with
    // the size band, so moving it tells you where the frame would live.
    options: [4, 6, 8, 10, 12, 16, 20, 24, 28, 32].map((s) => ({
      id: String(s),
      n: `${s} in photo frame`,
      size: s,
      price: null,
      image: null, alt: '',
      d: s <= 8 ? 'Desk size. Sits beside them while they work.'
        : s <= 16 ? 'Shelf size. The one every guest picks up.'
          : 'Wall size. The photo the whole room is about.',
    })),
  },
  {
    id: 'polaroids',
    name: 'Polaroids',
    image: null, alt: '',            // public/photos/polaroids.jpg
    line: 'Your camera roll, finally something they can hold.',
    pick: 'Size',
    options: [
      // OWNER TO CONFIRM: priced per print. If these are sold in packs, change
      // `unit` to 'per pack of 10' (or whatever it is) and set the pack price.
      { id: 'small', n: 'Mini Snaps', price: 35, unit: 'per print',
        image: null, alt: '',        // public/photos/polaroids-small.jpg  (existing: photos/polaroid-mini.jpg)
        d: 'Pocket-sized. For a stack, a wallet, or tucked into a letter.' },
      { id: 'big', n: 'Big Snaps', price: 45, unit: 'per print',
        image: null, alt: '',        // public/photos/polaroids-big.jpg    (existing: photos/polaroid-big.jpg)
        d: 'For fridges, walls, and the inside of a gift box.' },
    ],
  },
  {
    id: 'magnets',
    name: 'Fridge magnets',
    image: null, alt: '',            // public/photos/magnets.jpg
    line: 'The first thing they see every time they open the fridge.',
    pick: 'Shape',
    options: [
      { id: 'heart', n: 'Heart magnet', price: null,
        image: null, alt: '',        // public/photos/magnets-heart.jpg
        d: 'For the fridge of someone you love out loud.' },
      { id: 'square', n: 'Square magnet', price: null,
        image: null, alt: '',        // public/photos/magnets-square.jpg
        d: 'Clean edges, the whole photo, nothing cropped.' },
      { id: 'circle', n: 'Round magnet', price: null,
        image: null, alt: '',        // public/photos/magnets-round.jpg
        d: 'A little round window into a good day.' },
    ],
  },
  {
    id: 'cases',
    name: 'Phone cases',
    image: null, alt: '',            // public/photos/cases.jpg
    line: 'Seen a hundred times a day. Felt every time.',
    pick: 'Finish',
    options: [
      { id: 'soft', n: 'Soft case', price: 369,
        image: null, alt: '',        // public/photos/cases-soft.jpg  (existing: photos/case-glossy.jpg)
        d: 'One photo, edge to edge, with a glossy finish.' },
      { id: 'hard', n: 'Hard case', price: 329,
        image: null, alt: '',        // public/photos/cases-hard.jpg  (existing: photos/case-matte.jpg)
        d: 'A name or initials on a clean, matte colour.' },
    ],
  },
  {
    id: 'pillows',
    name: 'Pillows',
    image: null, alt: '',            // public/photos/pillows.jpg
    line: 'Something soft to hold on the nights you are not there.',
    pick: 'Shape',
    options: [
      { id: 'heart', n: 'Heart pillow', price: null,
        image: null, alt: '',        // public/photos/pillows-heart.jpg
        d: 'For a partner, an anniversary, a long distance.' },
      { id: 'square', n: 'Square pillow', price: null,
        image: null, alt: '',        // public/photos/pillows-square.jpg
        d: 'For the sofa, with a photo everyone sits beside.' },
    ],
  },
  {
    id: 'calendars',
    name: 'Calendars',
    image: null, alt: '',            // public/photos/calendars.jpg
    line: 'Twelve months of them, one page at a time.',
    pick: 'Style',
    options: [
      { id: 'one', n: 'One-sided calendar', price: null,
        image: null, alt: '',        // public/photos/calendars-one.jpg
        d: 'A photo for every month, on their desk all year.' },
      { id: 'two', n: 'Two-sided calendar', price: null,
        image: null, alt: '',        // public/photos/calendars-two.jpg
        d: 'Printed on both sides, so there are twice the photos.' },
    ],
  },
  {
    id: 'keychains',
    name: 'Keychains',
    image: null, alt: '',            // public/photos/keychains.jpg
    line: 'The smallest way to stay close.',
    pick: 'Shape',
    options: [
      { id: 'heart', n: 'Heart keychain', price: 159,
        image: null, alt: '',        // public/photos/keychains-heart.jpg  (existing: photos/keychain-heart.jpg)
        d: 'A favourite memory, always on their keys.' },
      { id: 'violin', n: 'Violin keychain', price: null,
        image: null, alt: '',        // public/photos/keychains-violin.jpg
        d: 'For the one who plays, or the one who listens.' },
      { id: 'square', n: 'Square keychain', price: null,
        image: null, alt: '',        // public/photos/keychains-square.jpg
        d: 'Clean and simple. The photo does the talking.' },
      { id: 'circle', n: 'Round keychain', price: null,
        image: null, alt: '',        // public/photos/keychains-round.jpg
        d: 'A small round memory that goes everywhere they go.' },
    ],
  },
  {
    id: 'glass',
    name: 'Glass frames',
    image: null, alt: '',            // public/photos/glass.jpg   (existing: photos/print-glass-frame.jpg)
    line: 'A photo printed on glass, with the light coming through it.',
    pick: 'Style',
    options: [
      { id: 'standing', n: 'Glass photo frame', price: null,
        image: null, alt: '',
        d: 'Stands on a desk or a shelf and catches the window light.' },
    ],
  },
  {
    id: 'mirror',
    name: 'Magic mirror',
    image: null, alt: '',            // public/photos/mirror.jpg
    line: 'A mirror, until the light comes on. Then it is them.',
    pick: 'Style',
    options: [
      { id: 'standing', n: 'Magic mirror', price: null,
        image: null, alt: '',
        d: 'Looks like an ordinary mirror. Switch it on and the photo glows through.' },
    ],
  },
  {
    id: 'cube',
    name: 'Cube box',
    image: null, alt: '',            // public/photos/cube.jpg
    line: 'Lift the lid, and there they are.',
    pick: 'Style',
    options: [
      { id: 'box', n: 'Cube box', price: null,
        image: null, alt: '',
        d: 'A small box that opens on photos, a note, and a name.' },
    ],
  },
  {
    id: 'magazines',
    name: 'Magazines',
    image: null, alt: '',            // public/photos/magazines.jpg
    line: 'A whole magazine about one person. They are the cover story.',
    pick: 'Style',
    options: [
      { id: 'issue', n: 'Personal magazine', price: null,
        image: null, alt: '',
        d: 'Their photos, their stories, their name across the top.' },
    ],
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: null, alt: '',            // public/photos/clothing.jpg
    line: 'A gift they will wear close, not fold away.',
    pick: 'Style',
    options: [
      // From ₹649 (words tee) to ₹679 (photo tee), per the owner's prices, so
      // the card says "From ₹649" rather than claiming one fixed price.
      { id: 'tee', n: 'T-shirt', price: 649, from: true,
        image: null, alt: '',        // public/photos/clothing-tee.jpg     (existing: photos/tee-white.jpg)
        d: 'Their photo or your inside joke, printed on soft cotton.' },
      { id: 'hoodie', n: 'Hoodie', price: null,
        image: null, alt: '',        // public/photos/clothing-hoodie.jpg
        d: 'Warm, heavy, and the next best thing to a hug.' },
      { id: 'polo', n: 'Polo T-shirt', price: null,
        image: null, alt: '',        // public/photos/clothing-polo.jpg
        d: 'A name stitched small on the chest. Quietly theirs.' },
    ],
  },
];

/** A category by id: findCat('mugs'). */
export const findCat = (id) => CATS.find((c) => c.id === id);

/** A category by its display name: findCatByName('Mugs'). Used by people.js ideas. */
export const findCatByName = (name) => CATS.find((c) => c.name === name);

/** One option inside a category: findOption('mugs', 'magic'). */
export const findOption = (catId, optId) => {
  const c = findCat(catId);
  return c && c.options.find((o) => o.id === optId);
};

/**
 * The photo to show for an option: its own, else its category's, else null
 * (the card then shows the empty image space).
 */
export const imageFor = (cat, opt) => {
  if (opt && opt.image) return { src: opt.image, alt: opt.alt || `${cat.name}: ${opt.n}` };
  if (cat.image) return { src: cat.image, alt: cat.alt || cat.name };
  return null;
};

/** The lowest known price in a category, or null if none is set yet. */
export const fromPrice = (cat) => {
  const known = cat.options.map((o) => o.price).filter((p) => p != null);
  return known.length ? Math.min(...known) : null;
};

/** The lowest known price anywhere in the catalogue (the "From ₹35" line). */
export const lowestPrice = () => Math.min(...CATS.map(fromPrice).filter((p) => p != null));
