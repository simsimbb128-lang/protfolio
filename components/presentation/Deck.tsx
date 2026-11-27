import { useCallback, useEffect, useRef, useState } from 'react'
import { useAmbientParallax } from '../../hooks/useAmbientParallax'
import { usePageVisible } from '../../hooks/usePageVisible'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLanguage } from '../../i18n/LanguageContext'
import { Hero } from '../hero/Hero'
import { Footer } from '../layout/Footer'
import { Header } from '../layout/Header'
import { AboutSlide } from '../sections/AboutSlide'
import { CertificatesSlide } from '../sections/CertificatesSlide'
import { ContactSlide } from '../sections/ContactSlide'
import { ProjectsSlide } from '../sections/ProjectsSlide'
import { DeckControls } from './DeckControls'
import { SlideAtmosphere } from './SlideAtmosphere'
import { SlideMenu, type SlideMenuEntry } from './SlideMenu'

const slideIds = ['opening', 'about', 'projects', 'certificates', 'contact', 'closing'] as const
type SlideId = (typeof slideIds)[number]
type NavSlideId = Extract<SlideId, 'about' | 'projects' | 'certificates' | 'contact'>
type Direction = 'initial' | 'next' | 'previous'
type SlideState = 'active' | 'leaving'

const TRANSITION_MS = 460
const SWIPE_THRESHOLD = 48
const AUTOPLAY_MS = 11_000

interface TouchStart {
  x: number
  y: number
}

const pad = (value: number) => String(value).padStart(2, '0')

export function Deck() {
  const { copy } = useLanguage()
  const labels = copy.presentation
  const reducedMotion = useReducedMotion()
  const pageVisible = usePageVisible()
  const [activeIndex, setActiveIndex] = useState(0)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<Direction>('initial')
  const [menuOpen, setMenuOpen] = useState(false)
  const [certificateOpen, setCertificateOpen] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  const [focusToken, setFocusToken] = useState(0)

  const transitionTimer = useRef<number | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<TouchStart | null>(null)
  const mountedRef = useRef(false)

  useAmbientParallax(viewportRef, !reducedMotion)

  const activeId = slideIds[activeIndex]
  const activeLabel = labels.slides[activeId]
  const total = slideIds.length

  const menuSlides: SlideMenuEntry[] = slideIds.map((id) => ({
    id,
    label: labels.slides[id],
  }))

  const focusActiveSlide = useCallback(() => {
    window.requestAnimationFrame(() => {
      const slide = viewportRef.current?.querySelector<HTMLElement>(
        '[data-slide-state="active"]',
      )
      slide?.focus({ preventScroll: true })
    })
  }, [])

  const goTo = useCallback(
    (target: number, options: { focusSlide?: boolean } = {}) => {
      const nextIndex = Math.max(0, Math.min(target, slideIds.length - 1))

      if (nextIndex === activeIndex) {
        if (options.focusSlide) focusActiveSlide()
        return
      }

      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current)
      }

      setDirection(nextIndex > activeIndex ? 'next' : 'previous')
      setLeavingIndex(activeIndex)
      setActiveIndex(nextIndex)

      if (options.focusSlide) {
        setFocusToken((token) => token + 1)
      }

      transitionTimer.current = window.setTimeout(() => {
        setLeavingIndex(null)
        transitionTimer.current = null
      }, TRANSITION_MS)
    },
    [activeIndex, focusActiveSlide],
  )

  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goFirst = useCallback(() => goTo(0), [goTo])
  const goLast = useCallback(() => goTo(slideIds.length - 1), [goTo])

  const goToNavSlide = useCallback(
    (target: NavSlideId) => {
      goTo(slideIds.indexOf(target), { focusSlide: true })
    },
    [goTo],
  )

  const handleDialogChange = useCallback((open: boolean) => {
    setCertificateOpen(open)
  }, [])

  const toggleAutoplay = useCallback(() => {
    if (reducedMotion) return

    if (!autoplay && activeIndex === total - 1) {
      goTo(0)
    }

    setAutoplay((current) => !current)
  }, [activeIndex, autoplay, goTo, reducedMotion, total])

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    if (focusToken > 0) {
      focusActiveSlide()
      return
    }

    const activeElement = document.activeElement as HTMLElement | null
    const focusWasInLeavingSlide = activeElement?.closest('[data-slide-state="leaving"]')
    if (!activeElement || activeElement === document.body || focusWasInLeavingSlide) {
      focusActiveSlide()
    }
  }, [activeIndex, focusToken, focusActiveSlide])

  useEffect(() => {
    if (!autoplay) return

    const pauseForInteraction = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-autoplay-toggle]')) return
      setAutoplay(false)
    }

    window.addEventListener('pointerdown', pauseForInteraction, true)
    window.addEventListener('keydown', pauseForInteraction, true)

    return () => {
      window.removeEventListener('pointerdown', pauseForInteraction, true)
      window.removeEventListener('keydown', pauseForInteraction, true)
    }
  }, [autoplay])

  useEffect(() => {
    if (!autoplay || reducedMotion || menuOpen || certificateOpen || !pageVisible) {
      return
    }

    if (activeIndex >= total - 1) {
      setAutoplay(false)
      return
    }

    const timer = window.setTimeout(() => {
      goTo(activeIndex + 1)
    }, AUTOPLAY_MS)

    return () => window.clearTimeout(timer)
  }, [
    activeIndex,
    autoplay,
    certificateOpen,
    goTo,
    menuOpen,
    pageVisible,
    reducedMotion,
    total,
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        menuOpen ||
        certificateOpen ||
        document.querySelector('dialog[open]') ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return
      }

      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
          event.preventDefault()
          goPrevious()
          break
        case 'Home':
          event.preventDefault()
          goFirst()
          break
        case 'End':
          event.preventDefault()
          goLast()
          break
        case 'Escape':
          event.preventDefault()
          goFirst()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [certificateOpen, goFirst, goLast, goNext, goPrevious, menuOpen])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        touchStartRef.current = null
        return
      }

      const target = event.target as HTMLElement | null
      if (
        target?.closest(
          'a, button, input, textarea, select, dialog, [role="button"], [data-no-swipe]',
        )
      ) {
        touchStartRef.current = null
        return
      }

      const touch = event.changedTouches[0]
      if (!touch) return
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current
      touchStartRef.current = null
      if (!start) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
        return
      }

      const isRtl = document.documentElement.dir === 'rtl'
      const forward = isRtl ? deltaX > 0 : deltaX < 0
      if (forward) {
        goNext()
      } else {
        goPrevious()
      }
    }

    const handleTouchCancel = () => {
      touchStartRef.current = null
    }

    viewport.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true })
    viewport.addEventListener('touchend', handleTouchEnd, { capture: true, passive: true })
    viewport.addEventListener('touchcancel', handleTouchCancel, { capture: true, passive: true })

    return () => {
      viewport.removeEventListener('touchstart', handleTouchStart, { capture: true })
      viewport.removeEventListener('touchend', handleTouchEnd, { capture: true })
      viewport.removeEventListener('touchcancel', handleTouchCancel, { capture: true })
    }
  }, [goNext, goPrevious])

  const renderSlide = (id: SlideId) => {
    switch (id) {
      case 'opening':
        return (
          <Hero
            onExplore={() => goTo(2, { focusSlide: true })}
            onContinue={goNext}
          />
        )
      case 'about':
        return (
          <div className="slide-frame">
            <SlideAtmosphere index="02" />
            <AboutSlide />
          </div>
        )
      case 'projects':
        return (
          <div className="slide-frame">
            <SlideAtmosphere index="03" />
            <ProjectsSlide />
          </div>
        )
      case 'certificates':
        return (
          <div className="slide-frame">
            <SlideAtmosphere index="04" />
            <CertificatesSlide onDialogChange={handleDialogChange} />
          </div>
        )
      case 'contact':
        return (
          <div className="slide-frame">
            <SlideAtmosphere index="05" />
            <ContactSlide />
          </div>
        )
      case 'closing':
        return <Footer onReturn={goFirst} />
    }
  }

  const visibleSlides = leavingIndex === null ? [activeIndex] : [leavingIndex, activeIndex]
  const headerTheme = activeId === 'closing' ? 'dark' : 'light'

  return (
    <>
      <Header theme={headerTheme} onHome={goFirst} onNavigate={goToNavSlide} />

      <main className="deck" id="main-content" tabIndex={-1}>
        <div
          ref={viewportRef}
          className="deck__viewport"
          role="region"
          aria-roledescription={labels.carousel}
          aria-label={labels.label}
        >
          {visibleSlides.map((slideIndex) => {
            const id = slideIds[slideIndex]
            const state: SlideState = slideIndex === activeIndex ? 'active' : 'leaving'

            return (
              <div
                key={id}
                id={`slide-${id}`}
                className={`deck__slide deck__slide--${id}`}
                data-slide-state={state}
                data-slide-id={id}
                data-direction={direction}
                role="group"
                aria-roledescription={labels.slideRole}
                aria-label={`${pad(slideIndex + 1)} ${labels.of} ${pad(total)} — ${labels.slides[id]}`}
                aria-hidden={state === 'leaving' ? true : undefined}
                inert={state === 'leaving' ? true : undefined}
                tabIndex={state === 'active' ? -1 : undefined}
              >
                {renderSlide(id)}
              </div>
            )
          })}
        </div>

        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {`${labels.slide} ${pad(activeIndex + 1)} ${labels.of} ${pad(total)} — ${activeLabel}`}
        </p>

        <DeckControls
          index={activeIndex}
          total={total}
          label={activeLabel}
          onPrevious={goPrevious}
          onNext={goNext}
          onFirst={goFirst}
          onOpenMenu={() => setMenuOpen(true)}
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          autoplay={autoplay}
          autoplayDisabled={reducedMotion}
          onToggleAutoplay={toggleAutoplay}
        />
      </main>

      <SlideMenu
        open={menuOpen}
        slides={menuSlides}
        activeIndex={activeIndex}
        onSelect={(index) => {
          setMenuOpen(false)
          goTo(index)
        }}
        onClose={() => setMenuOpen(false)}
        returnFocusRef={menuButtonRef}
      />
    </>
  )
}
