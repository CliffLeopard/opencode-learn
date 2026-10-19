import assert from 'node:assert/strict'
import test from 'node:test'
import { checkCatalog } from './catalog-check.mjs'

test('written chapters need mdx and a registry entry', () => {
  const errors = checkCatalog({
    chapters: [{ slug: 'overview', status: 'written' }],
    mdxSlugs: new Set(),
    registrySlugs: new Set(),
  })
  assert.ok(errors.some((error) => error.includes('overview') && error.includes('mdx')))
  assert.ok(errors.some((error) => error.includes('overview') && error.includes('registry')))
})

test('stub chapters reject mdx and registry entries', () => {
  const errors = checkCatalog({
    chapters: [{ slug: 'ai', status: 'stub' }],
    mdxSlugs: new Set(['ai']),
    registrySlugs: new Set(['ai']),
  })
  assert.equal(errors.length, 2)
})

test('an mdx file outside the written set is an error', () => {
  const errors = checkCatalog({
    chapters: [{ slug: 'overview', status: 'written' }],
    mdxSlugs: new Set(['overview', 'cordis']),
    registrySlugs: new Set(['overview']),
  })
  assert.ok(errors.some((error) => error.includes('cordis')))
})

test('a matching written chapter produces no errors', () => {
  const errors = checkCatalog({
    chapters: [
      { slug: 'overview', status: 'written' },
      { slug: 'ai', status: 'stub' },
    ],
    mdxSlugs: new Set(['overview']),
    registrySlugs: new Set(['overview']),
  })
  assert.deepEqual(errors, [])
})
