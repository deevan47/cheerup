// Turns 'photos/mug.jpg' (a file in /public) into a URL that works on GitHub Pages too.
export const asset = (p) => (p ? import.meta.env.BASE_URL + p.replace(/^\//, '') : '');