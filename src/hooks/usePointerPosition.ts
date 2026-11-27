import { useEffect, useRef } from 'react'

export interface PointerPosition {
  x: number
  y: number
}

export function usePointerPosition() {
  const pointer = useRef<PointerPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const resetPointer = () => {
      pointer.current.x = 0
      pointer.current.y = 0
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', resetPointer)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  return pointer
}
