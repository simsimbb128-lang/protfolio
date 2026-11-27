import { useMemo } from 'react'

export function useWebGLSupport() {
  return useMemo(() => {
    if (typeof window === 'undefined' || !window.WebGLRenderingContext) return false

    try {
      const canvas = document.createElement('canvas')
      const context =
        canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl')

      if (!context) return false

      const loseContext = (context as WebGLRenderingContext).getExtension('WEBGL_lose_context')
      loseContext?.loseContext()
      return true
    } catch {
      return false
    }
  }, [])
}
