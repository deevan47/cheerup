// Generic UI icons. Brand marks live in BrandSprite / Logo and must not change.

/**
 * A plain speech bubble. It goes on every link that leaves the site for WhatsApp,
 * so nobody taps "Chat on WhatsApp" without knowing a chat is about to open.
 * Deliberately generic, not WhatsApp's own logo, which we have no licence to redraw.
 */
export function ChatIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M10 2.4c-4.2 0-7.6 2.9-7.6 6.5 0 2 1.1 3.9 2.8 5.1.1 1-.2 2.2-.8 3.1 1.4-.2 2.8-.8 3.8-1.6.6.1 1.2.2 1.8.2 4.2 0 7.6-2.9 7.6-6.5S14.2 2.4 10 2.4Z"
        fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Closed = plus, open = minus. Points the way people expect, unlike the old arc. */
export function PlusMinusIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="pm-icon">
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {!open && <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />}
    </svg>
  );
}
