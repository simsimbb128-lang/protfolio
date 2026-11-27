import { useEffect, useState } from 'react'

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
