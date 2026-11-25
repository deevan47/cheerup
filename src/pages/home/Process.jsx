import { useEffect, useRef, useState } from 'react';
import { href } from '../../routes';
import { SITE } from '../../data/site';
import { Eye } from '../../components/Logo';
import { reducedMotion } from '../../lib/motion';

// The 3-step summary. The full seven steps live on the How it works page, and the
// heading has to agree with it.
const STEPS = [
  ['Tell me about them.', 'A photo, a name, or just “help, it’s their birthday.” Start with the feeling. I’ll handle the rest.'],
  ['I send you a free preview.', 'Change anything until it feels exactly right. Then pay 70%.'],
  ['Ding-dong. Smile unlocked.', 'At their door within 24 hours. Pay the last 30% when it’s in your hands.'],
];

/**
 * AN EXAMPLE CHAT, beside the steps: how an order actually goes, played message
 * by message when the section scrolls into view. The step it has reached lights
 * up on the left. It is labelled as an example on screen; it is not a customer.
 *
 * [who, text, step]   who: 'you' or 'me'   step: which of STEPS it belongs to
 * A message with `preview` draws a small design preview inside the bubble.
 */
const CHAT = [
  ['you', 'Hi! My best friend’s birthday is tomorrow. Help?', 0],
  ['me', 'Happy to. Tell me three things about them.', 0],
  ['you', 'Chai addict. Always late. Our Goa trip photo is their favourite.', 0],
  ['me', 'A magic mug: the Goa photo appears when the chai goes in. Here’s your free preview.', 1, 'Still late. Still loved.'],
  ['you', 'I love it. Can the words be bigger?', 1],
  ['me', 'Done. Pay 70% once you’re happy. Nothing prints before that.', 1],
  ['you', 'Paid. Thank you!', 2],
  ['me', 'At their door tomorrow. The last 30% is paid when it arrives.', 2],
];

export default function Process() {
  const [shown, setShown] = useState(CHAT.length);   // the server renders the whole chat
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);                 // bump to play it again
  const [animated, setAnimated] = useState(false);   // false on the server and with reduced motion
  const box = useRef(null);
  const done = shown >= CHAT.length;
  const step = shown === 0 ? 0 : CHAT[Math.min(shown, CHAT.length) - 1][2];

  // Empty the chat, wait for it to be on screen, then play it.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    setAnimated(true);
    setShown(0);
    let timer = 0;
    const play = (n) => {
      if (n >= CHAT.length) { setTyping(false); return; }
      const mine = CHAT[n][0] === 'me';
      setTyping(mine);   // "typing…" before each of my replies
      timer = setTimeout(() => { setTyping(false); setShown(n + 1); timer = setTimeout(() => play(n + 1), 350); }, mine ? 1300 : 900);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      play(0);
    }, { threshold: 0.45 });
    io.observe(box.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [run]);

  return (
    <section className="process">
      <div className="process__inner">
        <div className="process__text">
          <p className="eyebrow">How it works</p>
          <h2 data-reveal="1" className="h-section">Three steps. <span className="accent">One happy doorbell.</span></h2>
          <ol className="steps3">
            {STEPS.map(([h, p], i) => (
              <li key={h} className={`step3${i === step ? ' is-on' : ''}${i < step || done ? ' is-past' : ''}`}>
                <span className="step3__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="tlink tap process__link" href={href('how')}>See every step</a>
        </div>

        <figure className="chat" ref={box}>
          <div className="chat__phone">
            <div className="chat__top">
              <span className="chat__avatar"><Eye /></span>
              <span><b>{SITE.founderName}, {SITE.name}</b><small>{SITE.city}</small></span>
            </div>
            {/* the animation is for eyes; screen readers get the transcript below */}
            <ol className="chat__log" aria-hidden="true">
              {CHAT.slice(0, shown).map(([who, text, , preview]) => (
                <li key={text} className={`bubble bubble--${who}`}>
                  {preview && <span className="bubble__preview"><span>Free preview</span>{preview}</span>}
                  {text}
                </li>
              ))}
              {typing && <li className="bubble bubble--me bubble--typing"><i /><i /><i /></li>}
            </ol>
            <ol className="sr-only">
              {CHAT.map(([who, text]) => <li key={text}>{who === 'me' ? SITE.founderName : 'You'}: {text}</li>)}
            </ol>
          </div>
          <figcaption className="chat__cap">
            An example of how an order goes.
            {done && animated && <button type="button" className="chat__again" onClick={() => setRun((r) => r + 1)}>Play it again</button>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
