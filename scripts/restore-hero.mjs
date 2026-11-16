import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const expectedBytes = 39041;
const expectedSha256 = 'eb9a297e6331346985646d214d281af86d608ff49ae2d50648be4d51feed4a30';
const parts = Array.from({ length: 5 }, (_, i) => {
  const path = new URL(`../.github/hero-image-parts/part-${i}.b64`, import.meta.url);
  return readFileSync(path, 'utf8').trim();
});
const encoded = parts.join('');
if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded) || encoded.length !== 52056) {
  throw new Error('Invalid encoded HD hero image');
}
const image = Buffer.from(encoded, 'base64');
const checksum = createHash('sha256').update(image).digest('hex');
if (image.length !== expectedBytes || checksum !== expectedSha256 || image.toString('ascii', 4, 12) !== 'ftypavif') {
  throw new Error('HD hero image checksum, size or AVIF header mismatch');
}
const target = new URL('../public/media/hero-kitchen-hd.avif', import.meta.url);
mkdirSync(new URL('../public/media/', import.meta.url), { recursive: true });
writeFileSync(target, image);
console.log('Validated original-resolution hero: 1881×836 AVIF,', image.length, 'bytes; SHA-256', checksum);
