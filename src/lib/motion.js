// All the imperative animation from the original site lives here:
// scroll reveals, the home logo draw-in, the "how it works" line, list "rise" effects.
// They find elements by data-attributes (data-reveal, data-underline, data-draw, ...),
// so components only need to carry the attribute.
const EASE = 'cubic-bezier(.2,.7,.2,1)';
let io = null;
let blinking = false;

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fade/slide a set of elements in (used when a tab/choice changes). */
export function rise(selector, stagger = 0) {
  if (reducedMotion()) return;
  document.querySelectorAll(selector).forEach((el, i) =>
    el.animate(
      [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
      { duration: 520, delay: i * stagger, easing: EASE, fill: 'backwards' }
    )
  );
}

/** Home logo: the smile draws from the C to the U, then the eyes settle on top. hover = quicker replay. */
export function intro(hover) {
  if (reducedMotion() || (hover && blinking)) return;
  const path = document.querySelector('[data-draw]');
  const eyes = document.querySelector('[data-eyes]');
  const tag = document.querySelector('[data-tag]');
  if (!path || !eyes) return;
  blinking = true;
  const k = hover ? 0.62 : 1;
  const lead = hover ? 0 : 250;
  path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
    duration: 1500 * k, delay: lead, easing: 'cubic-bezier(.55,.1,.35,1)', fill: 'backwards',
  });
  const e = eyes.animate(
    [
      { opacity: 0, transform: 'translateY(-60px)' },
      { opacity: 1, transform: 'translateY(6px)', offset: 0.6 },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 700 * (hover ? 0.8 : 1), delay: lead + 1400 * k, easing: EASE, fill: 'backwards' }
  );
  e.onfinish = () => { blinking = false; };
  if (tag && !hover) {
    tag.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
      { duration: 600, delay: 2150, easing: EASE, fill: 'backwards' });
  }
}

/** "How it works": the vertical line + dots fill as you scroll. */
export function drawLine() {
  const wrap = document.querySelector('[data-steps]');
  const line = document.querySelector('[data-line]');
  if (!wrap || !line) return;
  const rm = reducedMotion();
  const r = wrap.getBoundingClientRect();
  const mark = window.innerHeight * 0.62;
  const p = rm ? 1 : Math.max(0, Math.min(1, (mark - r.top - 24) / (r.height - 64)));
  line.style.transform = 'scaleY(' + p.toFixed(4) + ')';
  wrap.querySelectorAll('[data-dot]').forEach((d) => {
    const on = rm || d.getBoundingClientRect().top + 24 < mark;
    d.style.backgroundColor = on ? '#A8461E' : '#FAF5EF';
    d.style.color = on ? '#FAF5EF' : '#A8461E';
  });
}

/** Runs after every page change: logo intro, scroll-reveals, underline draw, step line. */
export function enter(page) {
  if (io) io.disconnect();
  if (page === 'home') intro(false);
  if (reducedMotion()) {
    document.querySelectorAll('[data-underline]').forEach((el) => { el.style.transform = 'none'; });
    drawLine();
    return;
  }
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      if (el.hasAttribute('data-underline')) {
        el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: 350, easing: EASE, fill: 'forwards' });
      } else {
        el.style.opacity = '';
        el.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 640, easing: EASE });
      }
    }),
    { rootMargin: '0px 0px -8% 0px' }
  );
  const vh = window.innerHeight;
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > vh * 0.92) { el.style.opacity = '0'; io.observe(el); }
  });
  document.querySelectorAll('[data-underline]').forEach((el) => io.observe(el));
  drawLine();
}

export function stopObserving() { if (io) io.disconnect(); }
