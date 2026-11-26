import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { CertificateDialog } from './CertificateDialog'

const pad = (value: number) => String(value).padStart(2, '0')

interface CertificatesSlideProps {
  onDialogChange: (open: boolean) => void
}

export function CertificatesSlide({ onDialogChange }: CertificatesSlideProps) {
  const { copy } = useLanguage()
  const { certificates } = copy
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    onDialogChange(activeIndex !== null)
  }, [activeIndex, onDialogChange])

  useEffect(() => {
    if (activeIndex !== null) {
      wasOpenRef.current = true
      return
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false
      window.requestAnimationFrame(() => lastFocusedRef.current?.focus())
    }
  }, [activeIndex])

  const openCertificate = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    setActiveIndex(index)
  }

  const closeCertificate = useCallback(() => setActiveIndex(null), [])

  const navigateCertificate = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, certificates.items.length - 1)))
    },
    [certificates.items.length],
  )

  return (
    <article className="scene certificates-scene" aria-labelledby="certificates-title">
      <header className="scene__header">
        <p className="section-kicker">
          <span className="section-kicker__line" aria-hidden="true" />
          {certificates.eyebrow}
        </p>

        <div className="scene__heading-grid">
          <div className="scene__title-group">
            <h2 className="scene__title" id="certificates-title">
              {certificates.title}
            </h2>
            <span className="scene__count" aria-hidden="true">
              <strong>{certificates.countValue}</strong>
              <span>{certificates.countLabel}</span>
            </span>
          </div>
          <p className="scene__lead">{certificates.lead}</p>
        </div>
      </header>

      <ul className="certificate-grid" aria-label={certificates.title}>
        {certificates.items.map((certificate, index) => (
          <li key={certificate.id}>
            <button
              type="button"
              className="certificate-card"
              onClick={() => openCertificate(index)}
              aria-haspopup="dialog"
            >
              <span className="certificate-card__media">
                <img
                  src={certificate.thumb}
                  alt={certificate.alt}
                  width={certificate.width}
                  height={certificate.height}
                  loading="eager"
                  decoding="async"
                />
                <span className="certificate-card__gloss" aria-hidden="true" />
                <span className="certificate-card__index" aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <span className="certificate-card__expand" aria-hidden="true">
                  <svg viewBox="0 0 18 18" fill="none">
                    <path d="M7 3H3v4M11 15h4v-4M3 3l4 4M15 15l-4-4" />
                  </svg>
                </span>
              </span>

              <span className="certificate-card__body" aria-hidden="true">
                <span className="certificate-card__title">{certificate.title}</span>
                <span className="certificate-card__issuer">
                  {certificate.issuer}
                  {certificate.date ? <span> · {certificate.date}</span> : null}
                </span>
              </span>

              <span className="visually-hidden">{certificates.openLabel}</span>
            </button>
          </li>
        ))}
      </ul>

      <CertificateDialog
        items={certificates.items}
        activeIndex={activeIndex}
        onClose={closeCertificate}
        onNavigate={navigateCertificate}
      />
    </article>
  )
}
