import type { Chapter } from '@/lib/chapters'

export function StubChapter({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <p>
        这一章还没有正文。下面是它在目录里的职责，以及它对应的源码位置。
      </p>
      <p>{chapter.lede}</p>
      <p>
        源码路径：<code>{chapter.source}</code>
      </p>
      <p>待写</p>
    </>
  )
}
