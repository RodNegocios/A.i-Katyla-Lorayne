import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const app = read('src/App.jsx');
const accordion = read('src/components/AccordionGallery/AccordionGallery.jsx');
const css = read('src/styles.css');
const accordionCss = read('src/components/AccordionGallery/AccordionGallery.css');

test('Portrait and kitchen images are swapped correctly', () => {
  assert.match(app, /const studioPhoto = media\('ambiente-02\.png'\)/);
  assert.match(app, /image: media\('portrait\.png'\), label: 'Design de interiores'/);
  assert.match(app, /<img src=\{studioPhoto\} alt="Retrato da arquiteta/);
});
test('Gallery supports image-specific no-crop rendering', () => {
  assert.match(app, /'Projetos arquitetônicos'[^\n]*fit: 'contain'/);
  assert.match(accordion, /objectFit: item\.fit \|\| 'cover'/);
  assert.match(accordion, /ag-panel__blur/);
  assert.match(accordionCss, /\.ag-panel__media \.ag-panel__photo/);
});
test('Katyla portrait remains completely visible inside frame', () => {
  assert.match(css, /\.about__image img\s*\{[^}]*object-fit:\s*contain/s);
});
test('Both production media assets have nonzero size', () => {
  for (const name of ['portrait.png', 'ambiente-02.png']) {
    const path = new URL('../public/media/' + name, import.meta.url);
    assert.ok(existsSync(path), 'Missing ' + name);
    assert.ok(statSync(path).size > 10000, 'Suspicious media size: ' + name);
  }
});
