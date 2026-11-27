import { useEffect, useState } from 'react'

export function usePageVisible() {
  const [visible, setVisible] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden,
  )

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return visible
}
