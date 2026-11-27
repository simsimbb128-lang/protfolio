import type { RefObject } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

interface DeckControlsProps {
  index: number
  total: number
  label: string
  onPrevious: () => void
  onNext: () => void
  onFirst: () => void
  onOpenMenu: () => void
  menuOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement | null>
  autoplay: boolean
  autoplayDisabled: boolean
  onToggleAutoplay: () => void
}

const pad = (value: number) => String(value).padStart(2, '0')

export function DeckControls({
  index,
  total,
  label,
  onPrevious,
  onNext,
  onFirst,
  onOpenMenu,
  menuOpen,
  menuButtonRef,
  autoplay,
  autoplayDisabled,
  onToggleAutoplay,
}: DeckControlsProps) {
  const { copy } = useLanguage()
  const labels = copy.presentation
  const slideNumber = index + 1
  const progress = (slideNumber / total) * 100
  const autoplayLabel = autoplayDisabled
    ? labels.autoplayUnavailable
    : autoplay
      ? labels.autoplayPause
      : labels.autoplayStart

  return (
    <nav className="deck-controls" aria-label={labels.controls}>
      <div
        className="deck-controls__progress"
        role="progressbar"
        aria-label={labels.progress}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={slideNumber}
      >
        <span className="deck-controls__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <span className="visually-hidden" id="deck-autoplay-hint">
        {labels.autoplayHint}
      </span>

      <div className="deck-controls__inner">
        <button
          type="button"
          className="deck-button deck-button--first"
          onClick={onFirst}
          disabled={index === 0}
          aria-label={labels.first}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3.5 3.5v13M16 10H7.5M11.3 5.7 16 10l-4.7 4.3" />
          </svg>
          <span className="deck-button__label">{labels.first}</span>
        </button>

        <button
          type="button"
          className="deck-button deck-button--autoplay"
          onClick={onToggleAutoplay}
          disabled={autoplayDisabled}
          aria-label={autoplayLabel}
          aria-pressed={autoplay}
          aria-describedby="deck-autoplay-hint"
          data-autoplay-toggle
          data-active={autoplay}
          title={autoplayLabel}
        >
          {autoplay ? (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6.5 4.5v11M13.5 4.5v11" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6.5 4.2 15.5 10l-9 5.8V4.2Z" />
            </svg>
          )}
          <span className="deck-button__label">
            {autoplay ? labels.autoplayPause : labels.autoplayStart}
          </span>
        </button>

        <div className="deck-controls__pager">
          <button
            type="button"
            className="deck-arrow"
            onClick={onPrevious}
            disabled={index === 0}
            aria-label={labels.previous}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12 4.5 6.5 10l5.5 5.5" />
            </svg>
          </button>

          <span className="deck-counter-block">
            <span className="deck-counter" dir="ltr">
              <strong>{pad(slideNumber)}</strong>
              <span className="deck-counter__slash" aria-hidden="true">
                /
              </span>
              <span>{pad(total)}</span>
            </span>
            <span className="deck-counter__label">{label}</span>
          </span>

          <button
            type="button"
            className="deck-arrow"
            onClick={onNext}
            disabled={index === total - 1}
            aria-label={labels.next}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8 4.5 13.5 10 8 15.5" />
            </svg>
          </button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="deck-button deck-button--menu"
          onClick={onOpenMenu}
          aria-label={labels.menu}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3.5 3.5h5v5h-5zM11.5 3.5h5v5h-5zM3.5 11.5h5v5h-5zM11.5 11.5h5v5h-5z" />
          </svg>
          <span className="deck-button__label">{labels.menu}</span>
        </button>
      </div>
    </nav>
  )
}
