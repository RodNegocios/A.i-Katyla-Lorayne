import { readFile, readdir, rename, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const output = resolve('dist');
const source = join(output, 'index.dev.html');
const html = await readFile(source, 'utf8');

function verify(message, condition) {
  if (!condition) throw new Error('Invalid production build: ' + message);
}

verify('HTML still references Vite development JSX', !html.includes('/src/main.jsx'));
verify('missing bundled JavaScript', /<script\b[^>]*\bsrc="\/assets\/[^"]+\.js"[^>]*><\/script>/.test(html));
verify('missing bundled CSS', /\bhref="\/assets\/[^"]+\.css"/.test(html));
verify('missing root mount', html.includes('id="root"'));

for (const path of [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1])) {
  const asset = resolve(output, '.' + path);
  verify('missing asset ' + path, (await stat(asset)).isFile());
}

const assets = await readdir(join(output, 'assets'));
verify('no JavaScript bundle emitted', assets.some(name => name.endsWith('.js')));
verify('no CSS bundle emitted', assets.some(name => name.endsWith('.css')));
for (const filename of ['portrait.png', 'ambiente-01.png', 'ambiente-02.png', 'ambiente-03.png', 'before.png', 'after.png', 'film-01.mp4', 'film-02.mp4', 'film-03.mp4']) {
  verify('missing media/' + filename, (await stat(join(output, 'media', filename))).size > 0);
}

await rename(source, join(output, 'index.html'));
console.log('Production build validated: dist/index.html, bundled JS/CSS and media.');
