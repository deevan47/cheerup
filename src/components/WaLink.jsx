import { ChatIcon } from './icons';

/**
 * Every link that opens WhatsApp. It always carries the chat icon, so the label
 * never has to be the only clue that you are about to leave the site.
 *
 * The labels are a fixed set, on purpose. One action used to wear nine different
 * names ("Start their moment", "Tell me who it's for", "This is the one", ...),
 * so nobody could tell the buttons did the same thing:
 *
 *   'Chat on WhatsApp'           header, sticky bar, hero, every closing panel
 *   'Order this on WhatsApp'     an idea row on the Home page
 *   'Send on WhatsApp'           the order sheet's submit
 *   'Send request on WhatsApp'   the Request page's submit
 *   'Ask about this'             a question about one product (icon carries the rest)
 *
 * Pick one of those. Adding a tenth label is the bug this component exists to stop.
 */
export default function WaLink({ href, children, className = 'btn btn--primary', ...rest }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener" {...rest}>
      <ChatIcon />
      <span>{children}</span>
    </a>
  );
}

/** The same thing as an underlined text link rather than a button. */
export function WaTextLink({ href, children, className = 'tlink', ...rest }) {
  return (
    <a className={`wa-text ${className}`} href={href} target="_blank" rel="noopener" {...rest}>
      <ChatIcon />
      <span>{children}</span>
    </a>
  );
}
