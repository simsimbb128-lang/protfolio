import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export interface SlideMenuEntry {
  id: string
  label: string
}

interface SlideMenuProps {
  open: boolean
  slides: SlideMenuEntry[]
  activeIndex: number
  onSelect: (index: number) => void
  onClose: () => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

const pad = (value: number) => String(value).padStart(2, '0')

export function SlideMenu({
  open,
  slides,
  activeIndex,
  onSelect,
  onClose,
  returnFocusRef,
}: SlideMenuProps) {
  const { copy } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const handleDialogClose = () => {
    onClose()
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  return (
    <dialog
      ref={dialogRef}
      className="slide-menu"
      aria-labelledby="slide-menu-title"
      onClose={handleDialogClose}
      onClick={handleBackdrop}
    >
      <div className="slide-menu__panel">
        <div className="slide-menu__header">
          <div>
            <p className="slide-menu__kicker">{copy.presentation.label}</p>
            <h2 className="slide-menu__title" id="slide-menu-title">
              {copy.presentation.menuTitle}
            </h2>
          </div>
          <button
            type="button"
            className="slide-menu__close"
            onClick={onClose}
            aria-label={copy.presentation.closeMenu}
            autoFocus
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>

        <ol className="slide-menu__list">
          {slides.map((slide, index) => (
            <li key={slide.id}>
              <button
                type="button"
                className="slide-menu__item"
                aria-label={`${copy.presentation.slide} ${pad(index + 1)} — ${slide.label}`}
                aria-current={index === activeIndex ? 'step' : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="slide-menu__index">{pad(index + 1)}</span>
                <span className="slide-menu__label">{slide.label}</span>
                <span className="slide-menu__marker" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <p className="slide-menu__hint">{copy.presentation.keyboardHint}</p>
      </div>
    </dialog>
  )
}
