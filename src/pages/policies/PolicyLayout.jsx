import './Policy.css';
import { POLICIES } from '../../routes';
import { SITE } from '../../data/site';

// Shared frame for every policy page: eyebrow, title, body, and links to the other
// policies. The link labels come from routes.jsx, so they read the same here, in
// the footer and in the FAQ.
export default function PolicyLayout({ current, title, children }) {
  return (
    <section data-screen-label="Policy" className="policy">
      <div className="policy__inner">
        <p className="eyebrow">Policy, last updated {SITE.policiesUpdated}</p>
        <h1>{title}</h1>
        <div className="policy__body">{children}</div>
        <nav className="policy__others" aria-label="Other policies">
          <span>Other policies</span>
          {POLICIES.filter((r) => r.key !== current).map((r) => (
            <a key={r.key} className="tap" href={r.path}>{r.label}</a>
          ))}
        </nav>
      </div>
    </section>
  );
}
