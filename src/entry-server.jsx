// Pre-render entry. Used only by scripts/prerender.mjs at build time, never in the browser.
// It re-exports the page list and the head builder so the script needs one import.
import { renderToString } from 'react-dom/server';
import { setServerPath } from './lib/router';
import App from './App';

export { ROUTES } from './routes';
export { headTags } from './lib/head';

/** Renders one page to an HTML string. `path` is a route path, e.g. '/gifts'. */
export function render(path) {
  setServerPath(path);
  return renderToString(<App />);
}
