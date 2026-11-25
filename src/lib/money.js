// Prices used to render as bare numbers: "269", "35". A shopper seeing "35" on a
// Polaroid cannot tell whether that is one print or a pack, and will not message
// to ask. Everything goes through here instead.
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});

/** 269 -> '₹269'. Indian digit grouping, no paise. */
export const price = (n) => inr.format(n);

/**
 * 35 + 'per print' -> '₹35 per print'. The unit is optional.
 * With `from` set, the price is the bottom of a range: 'From ₹649'.
 */
export const priceWithUnit = (n, unit, from = false) => {
  const base = unit ? `${price(n)} ${unit}` : price(n);
  return from ? `From ${base}` : base;
};
