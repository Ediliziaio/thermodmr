import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { catalogueStructuredData } from '../src/lib/catalogueStructuredData.ts';
import { blogTranslations, canonicalBlogPath, translatedBlogPath } from '../src/data/blogTranslations.ts';

test('every published article has a reciprocal translated URL and legacy aliases', () => {
  const source = readFileSync(new URL('../src/data/blogPosts.ts', import.meta.url), 'utf8');
  const posts = [...source.matchAll(/slug: "([^"]+)",\s*lang: "(it|ro)"/g)];
  const paths = new Set(posts.map(([, slug, lang]) => `${lang === 'ro' ? '/ro' : ''}/blog/${slug}`));
  assert.equal(paths.size, 30);
  assert.equal(blogTranslations.length, 15);
  for (const [it, ro] of blogTranslations) {
    assert.ok(paths.has(it) && paths.has(ro));
    assert.equal(translatedBlogPath(it, 'ro'), ro);
    assert.equal(translatedBlogPath(ro, 'it'), it);
    assert.equal(canonicalBlogPath('/ro' + it), ro);
    assert.equal(canonicalBlogPath(ro.replace(/^\/ro/, '')), it);
    assert.equal(canonicalBlogPath(it + '/'), it);
  }
  assert.equal(canonicalBlogPath('/blog/non-existent'), undefined);
});

test('quote-only product metadata uses page identity without fabricated offers', () => {
  const product = { '@type': 'Product', name: 'DMR', description: 'Window', url: '/prodotti/dmr', offers: { '@type': 'Offer', priceCurrency: 'EUR' } };
  const result = catalogueStructuredData({ '@graph': [product] });
  assert.equal(result['@graph'][0]['@type'], 'WebPage');
  assert.equal(result['@graph'][0].name, 'DMR');
  assert.equal(result['@graph'][0].offers, undefined);
  const priced = { ...product, offers: { '@type': 'Offer', price: 125, priceCurrency: 'EUR' } };
  assert.deepEqual(catalogueStructuredData(priced), priced);
  assert.equal(catalogueStructuredData({ ...product, offers: { price: '' } })['@type'], 'WebPage');
  const template = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(!/"@type"\s*:\s*"(?:Product|Offer)"/.test(template));
  assert.ok(template.includes('MARYSORYNA'));
});

test('edge routes redirect broken language URLs and preserve real unknown-page 404', async () => {
  const bundle = await build({ entryPoints: [new URL('../functions/_middleware.ts', import.meta.url).pathname], bundle: true, write: false, format: 'esm', platform: 'browser' });
  const { onRequest } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
  const corrected = await onRequest({ request: new Request('https://thermodmr.com/ro/blog/finestre-pvc-prezzi?utm_source=test'), next: () => { throw new Error('should redirect before loading assets'); } });
  assert.equal(corrected.status, 301);
  assert.equal(corrected.headers.get('location'), 'https://thermodmr.com/ro/blog/ferestre-pvc-preturi?utm_source=test');
  const missing = await onRequest({ request: new Request('https://thermodmr.com/blog/not-a-post'), next: async () => new Response('<html></html>', { headers: { 'content-type': 'text/html' } }) });
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('x-robots-tag'), 'noindex, follow');
});

test('all edge metadata images resolve to public image files', () => {
  const source = readFileSync(new URL('../functions/_middleware.ts', import.meta.url), 'utf8');
  const paths = new Set([...source.matchAll(/\$\{B\}(\/images\/[^`"\s]+)/g)].map(match => match[1].split("?")[0]));
  assert.ok(paths.size >= 4);
  for (const path of paths) {
    const data = readFileSync(new URL('../public' + path, import.meta.url));
    assert.ok(data.length > 100, `${path} must contain image data`);
    assert.ok(!data.subarray(0,100).toString().includes('<!doctype html'), `${path} must not be an HTML fallback`);
  }
});
