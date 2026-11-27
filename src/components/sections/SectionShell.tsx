import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  labelId: string
  children: ReactNode
  className?: string
  focusable?: boolean
}

/**
 * Shared section frame. New portfolio chapters can be added as sibling
 * sections without changing the page shell or language architecture.
 */
export function SectionShell({
  id,
  labelId,
  children,
  className = '',
  focusable = false,
}: SectionShellProps) {
  return (
    <section
      className={`section ${className}`.trim()}
      id={id}
      aria-labelledby={labelId}
      tabIndex={focusable ? -1 : undefined}
    >
      <div className="container">{children}</div>
    </section>
  )
}
