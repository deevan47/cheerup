import './CatIcon.css';

/**
 * A line drawing for each kind of gift, so the tiles and pages can be told
 * apart at a glance while there are no product photos. Drawn in a 48x48 box
 * with the current text colour. Decorative: the gift's name is always beside it.
 */
const ICONS = {
  mugs: (
    <>
      <path d="M9 16h23v18a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7Z" />
      <path d="M32 20h3.5a5.5 5.5 0 0 1 0 11H32" />
      <path d="M16 6c-2 2.5 2 4 0 7M23 6c-2 2.5 2 4 0 7" />
    </>
  ),
  frames: (
    <>
      <rect x="8" y="5" width="32" height="38" rx="1.5" />
      <rect x="14" y="11" width="20" height="26" />
      <path d="M14 32l7-8 5 5 3-3 5 6" />
    </>
  ),
  polaroids: (
    <>
      <path d="M16 5h24v30" />
      <rect x="8" y="11" width="26" height="32" rx="1.5" />
      <rect x="12" y="15" width="18" height="18" />
    </>
  ),
  magnets: (
    <>
      <path d="M12 8h8v16a4 4 0 0 0 8 0V8h8v16a12 12 0 0 1-24 0Z" />
      <path d="M12 15h8M28 15h8" />
    </>
  ),
  cases: (
    <>
      <rect x="13" y="4" width="22" height="40" rx="5" />
      <circle cx="19.5" cy="11" r="2.5" />
      <path d="M22 26c-3-3 1-7 2-3 1-4 5 0 2 3l-2 2Z" />
    </>
  ),
  pillows: (
    <>
      <path d="M8 11q16-6 32 0-5 13 0 26-16 6-32 0 5-13 0-26Z" />
      <path d="M24 30c-5-4-6-6-6-8a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 2-1 4-6 8Z" />
    </>
  ),
  calendars: (
    <>
      <rect x="7" y="9" width="34" height="33" rx="2" />
      <path d="M7 18h34M16 5v8M32 5v8" />
      <path d="M14 25h4M22 25h4M30 25h4M14 32h4M22 32h4" />
    </>
  ),
  keychains: (
    <>
      <circle cx="14" cy="14" r="9" />
      <circle cx="14" cy="14" r="3" />
      <path d="M20.5 20.5L41 41M33 33l-4 4M37.5 37.5l-4 4" />
    </>
  ),
  glass: (
    <>
      <path d="M12 6h24v29H12Z" />
      <path d="M16 15l7-6M16 23l13-12" />
      <path d="M8 42h32M17 35v7M31 35v7" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="24" cy="20" rx="12" ry="15" />
      <path d="M24 35v6M16 42h16" />
      <path d="M5 11l4 2M43 11l-4 2M4 22h5M44 22h-5" />
    </>
  ),
  cube: (
    <>
      <path d="M24 5l17 8.5v21L24 43 7 34.5v-21Z" />
      <path d="M7 13.5L24 22l17-8.5M24 22v21" />
      <path d="M15.5 9.2l17 8.5" />
    </>
  ),
  magazines: (
    <>
      <path d="M9 5h24a5 5 0 0 1 5 5v33H14a5 5 0 0 1-5-5Z" />
      <path d="M15 12h17M15 19h11" />
      <rect x="15" y="25" width="17" height="11" />
    </>
  ),
  clothing: (
    <path d="M17 6l-11 6 4 9 5-3v24h18V18l5 3 4-9-11-6c-1 3-4 5-7 5s-6-2-7-5Z" />
  ),
};

export default function CatIcon({ id, className = '' }) {
  return (
    <svg className={`cat-icon ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {ICONS[id] || <circle cx="24" cy="24" r="16" />}
    </svg>
  );
}
