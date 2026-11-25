// Builds public/og.jpg, the 1200x630 picture WhatsApp and Google show when
// someone shares a link. Without it every share is a bare blue link, which for a
// business that lives on WhatsApp shares is the worst place to be plain.
//
//     npm run og
//
// Two things make it fiddly, both handled below:
//   1. The brand sprite is <symbol>/<use>, and ImageMagick's SVG renderer does
//      not resolve those, so the logo rendered as an empty box. flattenSprite()
//      inlines the tree itself and clips each symbol to its viewBox the way a
//      browser does.
//   2. g-word's single path holds the wordmark and the tagline glyphs, and its
//      viewBox cuts through the tagline. VIEWBOX_OVERRIDE trims it to just above.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = 'public/og.jpg';
const CREAM = '#FAF5EF';
const BRAND = '#A8461E';
const SPRITE = 'src/assets/brand-sprite.svg';
const VIEWBOX_OVERRIDE = { 'g-word': [15, 600, 1050, 231] };
// three products, cropped square-ish, down the right-hand side
const SHOTS = ['photos/polaroid-big.jpg', 'photos/mug-colour-inside.jpg', 'photos/keychain-heart.jpg'];

const magick = (args) => execFileSync('magick', args, { stdio: ['ignore', 'pipe', 'inherit'] });

function flattenSprite(symbolId) {
  const src = readFileSync(SPRITE, 'utf8');
  const syms = {};
  for (const m of src.matchAll(/<symbol id="([^"]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)) {
    syms[m[1]] = { box: m[2].split(/\s+/).map(Number), body: m[3] };
  }
  const box = (id) => VIEWBOX_OVERRIDE[id] || syms[id].box;
  const clips = [];

  const resolve = (body, depth = 0) => {
    if (depth > 6) return body;
    return body.replace(/<use\s+(?:xlink:)?href="#([^"]+)"([^/>]*)\/?>/g, (_, id, rest) => {
      if (!syms[id]) return '';
      const [vx, vy, vw, vh] = box(id);
      const a = {};
      for (const at of rest.matchAll(/(x|y|width|height)="([-\d.]+)"/g)) a[at[1]] = Number(at[2]);
      const w = a.width ?? vw;
      const h = a.height ?? vh;
      const cid = `clip${clips.length}`;
      clips.push(`<clipPath id="${cid}" clipPathUnits="userSpaceOnUse"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}"/></clipPath>`);
      const t = `translate(${a.x ?? 0} ${a.y ?? 0}) scale(${w / vw} ${h / vh}) translate(${-vx} ${-vy})`;
      return `<g transform="${t}"><g clip-path="url(#${cid})">${resolve(syms[id].body, depth + 1)}</g></g>`;
    });
  };

  const [vx, vy, vw, vh] = box(symbolId);
  const flat = resolve(syms[symbolId].body).replaceAll('currentColor', BRAND);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" width="${vw}" height="${vh}"><defs>${clips.join('')}</defs>${flat}</svg>`;
}

const tmp = mkdtempSync(join(tmpdir(), 'cheerup-og-'));
const logoSvg = join(tmp, 'logo.svg');
const logoPng = join(tmp, 'logo.png');
writeFileSync(logoSvg, flattenSprite('g-horiz-nt'));
magick(['-background', 'none', logoSvg, '-resize', '560x', logoPng]);

// the three product crops, as one strip
const strip = join(tmp, 'strip.png');
const crops = SHOTS.map((s, i) => {
  const f = join(tmp, `shot${i}.png`);
  magick([`public/${s}`, '-resize', '150x190^', '-gravity', 'center', '-extent', '150x190', f]);
  return f;
});
magick([...crops, '+append', '-background', CREAM, '-splice', '0x0', strip]);

magick([
  '-size', '1200x630', `xc:${CREAM}`,
  logoPng, '-geometry', '+80+96', '-composite',
  strip, '-gravity', 'east', '-geometry', '+70+0', '-composite',
  '-gravity', 'northwest',
  '-fill', '#3F1809', '-pointsize', '40', '-font', 'DejaVu-Serif',
  '-annotate', '+82+330', 'Personalised gifts,\ndelivered in Pune.',
  '-fill', '#6E2B10', '-pointsize', '25', '-font', 'DejaVu-Sans',
  '-annotate', '+82+470', 'cheerup.in   ·   WhatsApp +91 9505 9696 70',
  '-quality', '86', OUT,
]);

console.log(`wrote ${OUT}`);
