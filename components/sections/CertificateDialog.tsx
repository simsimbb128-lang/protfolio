import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { CertificateCopy } from '../../i18n/translations'

interface CertificateDialogProps {
  items: CertificateCopy[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

const pad = (value: number) => String(value).padStart(2, '0')

export function CertificateDialog({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: CertificateDialogProps) {
  const { copy } = useLanguage()
  const labels = copy.certificates
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = activeIndex !== null
  const item = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation()

    if (activeIndex === null) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onNavigate(activeIndex - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      onNavigate(activeIndex + 1)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="certificate-dialog"
      aria-labelledby="certificate-dialog-title"
      onClose={onClose}
      onClick={handleBackdrop}
      onKeyDown={handleKeyDown}
    >
      {item && activeIndex !== null ? (
        <div className="certificate-dialog__panel">
          <header className="certificate-dialog__header">
            <div className="certificate-dialog__heading">
              <p className="certificate-dialog__kicker">{labels.dialogLabel}</p>
              <h2 className="certificate-dialog__title" id="certificate-dialog-title">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              className="certificate-dialog__close"
              onClick={onClose}
              aria-label={labels.closeLabel}
              autoFocus
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </header>

          <div className="certificate-dialog__stage">
            <img
              key={item.id}
              className="certificate-dialog__image"
              src={item.image}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
            />
          </div>

          <footer className="certificate-dialog__footer">
            <div className="certificate-dialog__meta">
              <p>
                <span>{labels.issuerLabel}</span>
                {item.issuer}
              </p>
              {item.date ? <p className="certificate-dialog__date">{item.date}</p> : null}
            </div>

            <div className="certificate-dialog__nav">
              <button
                type="button"
                className="certificate-dialog__arrow"
                onClick={() => onNavigate(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label={labels.previous}
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12 4.5 6.5 10l5.5 5.5" />
                </svg>
              </button>
              <span className="certificate-dialog__counter" dir="ltr">
                {pad(activeIndex + 1)} / {pad(items.length)}
              </span>
              <button
                type="button"
                className="certificate-dialog__arrow"
                onClick={() => onNavigate(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                aria-label={labels.next}
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M8 4.5 13.5 10 8 15.5" />
                </svg>
              </button>
            </div>
          </footer>

          <p className="certificate-dialog__hint">{labels.dialogHint}</p>
        </div>
      ) : null}
    </dialog>
  )
}
