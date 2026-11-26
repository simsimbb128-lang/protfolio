import { lazy, Suspense } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePageVisible } from '../../hooks/usePageVisible'
import { usePointerPosition } from '../../hooks/usePointerPosition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useWebGLSupport } from '../../hooks/useWebGLSupport'
import { useLanguage } from '../../i18n/LanguageContext'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { StaticSculpture } from './StaticSculpture'

const SpatialScene = lazy(() =>
  import('./SpatialScene').then((module) => ({ default: module.SpatialScene })),
)

export function SpatialStage() {
  const { copy } = useLanguage()
  const reducedMotion = useReducedMotion()
  const supportsWebGL = useWebGLSupport()
  const pageVisible = usePageVisible()
  const pointer = usePointerPosition()
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: '160px',
    threshold: 0,
  })

  const active = pageVisible && inView
  const fallback = <StaticSculpture />

  return (
    <figure className="stage" ref={ref} aria-labelledby="stage-description">
      <figcaption id="stage-description" className="visually-hidden">
        {copy.a11y.decorativeScene}
      </figcaption>

      <div className="stage__decor" aria-hidden="true">
        <span className="stage__glow" />
        <span className="stage__halo stage__halo--outer" />
        <span className="stage__halo stage__halo--inner" />
        <span className="stage__crosshair stage__crosshair--one" />
        <span className="stage__crosshair stage__crosshair--two" />
        <span className="stage__axis stage__axis--vertical" />
        <span className="stage__axis stage__axis--horizontal" />

        <div className="stage__canvas">
          {supportsWebGL ? (
            <SceneErrorBoundary fallback={fallback}>
              <Suspense fallback={fallback}>
                <SpatialScene
                  pointer={pointer}
                  reducedMotion={reducedMotion}
                  active={active}
                />
              </Suspense>
            </SceneErrorBoundary>
          ) : (
            fallback
          )}
        </div>

        <div className="stage__orbit-tag">
          <span className="stage__orbit-dot" />
          <span>{copy.hero.stage.orbitLabel}</span>
        </div>

        <div className="stage__panel stage__panel--one">
          <span className="stage__panel-label">{copy.hero.stage.panelOneLabel}</span>
          <span className="stage__panel-value">{copy.hero.stage.panelOneValue}</span>
          <span className="stage__panel-rule" />
        </div>

        <div className="stage__panel stage__panel--two">
          <span className="stage__panel-label">{copy.hero.stage.panelTwoLabel}</span>
          <span className="stage__panel-value">{copy.hero.stage.panelTwoValue}</span>
          <span className="stage__panel-rule" />
        </div>

        <div className="stage__panel stage__panel--three">
          <span className="stage__panel-label">{copy.hero.stage.panelThreeLabel}</span>
          <span className="stage__panel-value">{copy.hero.stage.panelThreeValue}</span>
        </div>

        <span className="stage__caption">{copy.hero.stage.caption}</span>
        <span className="stage__serial">EB · 01</span>
      </div>
    </figure>
  )
}
