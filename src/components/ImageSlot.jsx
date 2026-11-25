import Photo from './Photo';
import './ImageSlot.css';

/**
 * The space a product photo sits in.
 *
 * With an image ({ src, alt }, from imageFor() in data/products.js) it shows the
 * photo, cropped to fill. Without one it shows the sand panel at the same 4:5
 * size, so adding a photo later moves nothing around it.
 *
 * While there is no photo, the panel can carry a note instead (`children`): the
 * gift's one line on the Home shelf, the chosen shape or frame size on the Gifts
 * page. Never "Photo coming soon": a note reads as designed, a placeholder label
 * reads as unfinished. Once a photo is set the note is simply not drawn.
 *
 *   sizes   how wide the photo is drawn, for the browser's srcset choice
 *   eager   load immediately (only for the first photo on a page)
 *   ratio   the space's shape; 4:5 everywhere unless there is a reason
 */
export default function ImageSlot({ image, sizes, eager = false, ratio = '4 / 5', className = '', children }) {
  const note = !image && children;
  return (
    <div
      className={`slot${image ? '' : ' slot--empty'} ${className}`}
      // a CSS variable rather than an inline aspect-ratio, so a stylesheet can
      // still override the shape (the Home strip crops shorter on phones)
      style={{ '--ratio': ratio }}
      aria-hidden={image || note ? undefined : 'true'}
    >
      {image && <Photo src={image.src} alt={image.alt} sizes={sizes} eager={eager} />}
      {note && <div className="slot__note">{children}</div>}
    </div>
  );
}
