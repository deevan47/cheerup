// "The deal": a ledger of the three promises. [big figure, small unit, heading, text]
//
// Row 2 used to show a 96px "30%" over the heading "Just 30% at the door.", with
// the 70% advance only in the small print. It read as if you pay 30% in total, so
// the real split arrived as a surprise in the chat.
import { href } from '../../routes';

const ROWS = [
  ['Free', '', 'Love it first. Pay later.', 'A free design preview, every single time. You say yes only when your heart does.'],
  ['70/30', '', '70% after you approve. 30% at the door.', 'No online checkout. You pay on WhatsApp once you love the preview, and the rest when it’s in your hands.'],
  ['24', 'h', 'Say yes today. See them smile tomorrow.', 'I check every piece myself and hand-deliver it across Pune within 24 hours. Your photos are deleted after.'],
];

// What happens if something goes wrong. Each line is a promise already made on a
// policy page; nothing here is new. Change the policy and this together.
const NET = [
  ['Arrives damaged, or not as approved?', 'Send a photo within 24 hours. I reprint it or refund it.', 'refund', 'Refund policy'],
  ['Changed your mind?', 'Cancel any time before printing for a full refund.', 'refund', 'Refund policy'],
  ['Worried about scams?', 'I never ask for card details or OTPs. You pay only after you’ve seen your design.', 'terms', 'Terms'],
];

export default function Promises() {
  return (
    <section className="ledger on-dark">
      <div className="ledger__inner">
        <p className="eyebrow">The deal</p>
        <div data-reveal="1" className="ledger__rows">
          {ROWS.map(([n, u, h, p]) => (
            <div key={h} className="ledger__row">
              <div className="ledger__num"><b>{n}</b>{u && <small>{u}</small>}</div>
              <div className="ledger__txt">
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </div>
          ))}
        </div>
        <div data-reveal="1" className="net">
          <h3 className="net__head">And if something goes wrong</h3>
          <ul className="net__list">
            {NET.map(([q, a, policy, label]) => (
              <li key={q}><b>{q}</b> {a} <a className="net__link" href={href(policy)}>{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
