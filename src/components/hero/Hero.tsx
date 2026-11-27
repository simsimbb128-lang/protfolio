import type { CSSProperties, MouseEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { SpatialStage } from './SpatialStage'

interface HeroProps {
  onExplore: () => void
  onContinue: () => void
}

export function Hero({ onExplore, onContinue }: HeroProps) {
  const { copy } = useLanguage()

  const handleExplore = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onExplore()
  }

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <span className="hero__orb hero__orb--blue" />
        <span className="hero__orb hero__orb--rose" />
        <span className="hero__grid" />
        <span className="hero__grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow hero-enter" style={{ '--enter-delay': '80ms' } as CSSProperties}>
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {copy.hero.eyebrow}
          </p>

          <h1 className="hero__title hero-enter" style={{ '--enter-delay': '170ms' } as CSSProperties}>
            <span className="visually-hidden">
              {copy.hero.nameAr} — {copy.hero.nameEn}
            </span>
            <span className="hero__name-ar" dir="rtl" lang="ar" aria-hidden="true">
              <span className="hero__name-line hero__name-line--first">{copy.hero.nameLines[0]}</span>
              <span className="hero__name-line hero__name-line--second">
                {copy.hero.nameLines[1]}
              </span>
            </span>
            <span className="hero__name-en" aria-hidden="true">
              {copy.hero.nameEn}
            </span>
          </h1>

          <p className="hero__subtitle hero-enter" style={{ '--enter-delay': '280ms' } as CSSProperties}>
            {copy.hero.subtitle}
          </p>

          <div className="hero__action-row hero-enter" style={{ '--enter-delay': '390ms' } as CSSProperties}>
            <a className="primary-action" href="#slide-projects" onClick={handleExplore}>
              <span>{copy.hero.cta}</span>
              <span className="primary-action__icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9h10M9.4 4.9 13.5 9l-4.1 4.1" />
                </svg>
              </span>
            </a>
            <span className="hero__cta-note">{copy.hero.chapter}</span>
          </div>
        </div>

        <div className="hero__stage-wrap hero-enter" style={{ '--enter-delay': '240ms' } as CSSProperties}>
          <SpatialStage />
        </div>
      </div>

      <div className="hero__footer">
        <button
          className="scroll-cue"
          type="button"
          aria-label={copy.presentation.next}
          onClick={onContinue}
        >
          <span className="scroll-cue__line" aria-hidden="true">
            <span className="scroll-cue__dot" />
          </span>
          <span>{copy.hero.continue}</span>
        </button>

        <span className="hero__footer-note">{copy.hero.sideNote}</span>

        <span className="hero__edition">
          <span aria-hidden="true">EB</span>
          <span>{copy.hero.chapter}</span>
        </span>
      </div>
    </section>
  )
}
