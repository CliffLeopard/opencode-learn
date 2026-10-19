import type { ComponentType } from 'react'

export const contentLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  overview: () => import('./overview.mdx'),
  schema: () => import('./schema.mdx'),
  protocol: () => import('./protocol.mdx'),
}
