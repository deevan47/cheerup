import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/global.css';
import './styles/ui.css';
import App from './App';

const root = document.getElementById('root');

// The build pre-renders every page to real HTML (scripts/prerender.mjs), so in
// production there is already markup to hydrate. In `vite dev` there is not.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
