import { useApp } from '../AppContext';
import { href } from '../routes';
import './RequestBar.css';

/**
 * One line above the header pointing at the Request page.
 *
 * It is hidden on phones: at 375px it wrapped to two lines and 65px, and together
 * with the header and the sticky bar it ate a quarter of the screen before any
 * content. The same offer still appears under the gift grid on the Home page.
 */
export default function RequestBar() {
  const { page } = useApp();
  if (page === 'request') return null;
  return (
    <div className="req-bar">
      <span>Not in the catalogue? I’ll make it.</span>{' '}
      <a href={href('request')}>Request a gift <span aria-hidden="true">→</span></a>
    </div>
  );
}
