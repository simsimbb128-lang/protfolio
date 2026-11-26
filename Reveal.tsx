import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08,
    once: true,
  })

  const style = {
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-revealed={inView}
      style={style}
    >
      {children}
    </div>
  )
}
