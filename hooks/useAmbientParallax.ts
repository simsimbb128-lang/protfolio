import { useEffect, type RefObject } from 'react'

/**
 * Publishes small normalised pointer coordinates as CSS variables on the deck
 * viewport. The atmosphere layers in the CSS use these values for restrained
 * parallax; content never moves and the effect is disabled for reduced motion.
 */
export function useAmbientParallax(
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const reset = () => {
      target.style.setProperty('--ambient-x', '0')
      target.style.setProperty('--ambient-y', '0')
    }

    if (!enabled || !window.matchMedia('(pointer: fine)').matches) {
      reset()
      return
    }

    let frame = 0
    let nextX = 0
    let nextY = 0

    const apply = () => {
      frame = 0
      target.style.setProperty('--ambient-x', nextX.toFixed(3))
      target.style.setProperty('--ambient-y', nextY.toFixed(3))
    }

    const handlePointerMove = (event: PointerEvent) => {
      nextX = (event.clientX / window.innerWidth) * 2 - 1
      nextY = (event.clientY / window.innerHeight) * 2 - 1

      if (frame === 0) frame = window.requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', reset)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', reset)
      if (frame !== 0) window.cancelAnimationFrame(frame)
      reset()
    }
  }, [enabled, targetRef])
}
