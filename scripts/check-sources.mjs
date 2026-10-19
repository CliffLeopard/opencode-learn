import { access } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const opencode = path.resolve(root, '../opencode')
const { chapters } = await import(pathToFileURL(path.join(root, 'src/lib/chapters.ts')).href)

const missing = []
for (const chapter of chapters) {
  const relative = chapter.source.replace(/^opencode\/?/, '')
  const target = relative === '' ? opencode : path.join(opencode, relative)
  try {
    await access(target)
  } catch {
    missing.push(`${chapter.slug} -> ${target}`)
  }
}

if (missing.length > 0) {
  console.error(missing.join('\n'))
  process.exit(1)
}

console.log(`sources: ${chapters.length} paths exist under ${opencode}`)
