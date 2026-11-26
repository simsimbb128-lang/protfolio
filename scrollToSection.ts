const HEADER_GAP = 16

/**
 * Scrolls a section into view below the fixed header and moves keyboard focus
 * into it, so the primary action is meaningful for keyboard and screen-reader
 * users as well as pointer users. Later chapters can reuse this helper.
 */
export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById(sectionId)
  if (!target) return false

  const root = document.documentElement
  const rootFontSize = Number.parseFloat(getComputedStyle(root).fontSize) || 16
  const headerRem = Number.parseFloat(
    getComputedStyle(root).getPropertyValue('--header-height'),
  )
  const headerHeight = Number.isFinite(headerRem) ? headerRem * rootFontSize : 0
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - headerHeight - HEADER_GAP,
  )

  target.focus({ preventScroll: true })
  window.scrollTo({ top, behavior })
  window.history.replaceState(null, '', `#${sectionId}`)
  return true
}
