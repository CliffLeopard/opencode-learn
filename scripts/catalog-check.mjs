/**
 * @param {{ chapters: { slug: string, status: string }[], mdxSlugs: Set<string>, registrySlugs: Set<string> }} input
 * @returns {string[]}
 */
export function checkCatalog({ chapters, mdxSlugs, registrySlugs }) {
  const errors = []
  const written = new Set()
  const stubs = new Set()

  for (const chapter of chapters) {
    if (chapter.status === 'written') written.add(chapter.slug)
    else if (chapter.status === 'stub') stubs.add(chapter.slug)
    else errors.push(`${chapter.slug} has unknown status ${chapter.status}`)
  }

  for (const slug of written) {
    if (!mdxSlugs.has(slug)) errors.push(`written chapter ${slug} is missing mdx`)
    if (!registrySlugs.has(slug)) errors.push(`written chapter ${slug} is missing a registry entry`)
  }

  for (const slug of stubs) {
    if (mdxSlugs.has(slug)) errors.push(`stub chapter ${slug} must not have mdx`)
    if (registrySlugs.has(slug)) errors.push(`stub chapter ${slug} must not have a registry entry`)
  }

  for (const slug of mdxSlugs) {
    if (!written.has(slug) && !stubs.has(slug)) errors.push(`mdx ${slug} is not a written chapter`)
  }

  for (const slug of registrySlugs) {
    if (!written.has(slug) && !stubs.has(slug)) {
      errors.push(`registry entry ${slug} is not a written chapter`)
    }
  }

  return errors
}
