import type { MouseEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

interface FooterProps {
  onReturn: () => void
}

export function Footer({ onReturn }: FooterProps) {
  const { copy } = useLanguage()

  const handleReturn = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onReturn()
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <a className="site-footer__top-link" href="#slide-opening" onClick={handleReturn}>
            <span className="site-footer__arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 16V4M4.8 9.2 10 4l5.2 5.2" />
              </svg>
            </span>
            <span>{copy.footer.returnLabel}</span>
          </a>
          <span className="site-footer__edition">{copy.footer.edition}</span>
        </div>

        <p className="site-footer__kicker">{copy.footer.thanks}</p>
        <p className="site-footer__statement">{copy.footer.statement}</p>

        <div className="site-footer__identity" aria-hidden="true">
          <span className="site-footer__arabic" lang="ar" dir="rtl">
            {copy.hero.nameAr}
          </span>
          <span className="site-footer__latin">{copy.hero.nameEn}</span>
        </div>

        <div className="site-footer__bottom">
          <span>{copy.footer.copyright}</span>
          <span className="site-footer__mark">
            <span aria-hidden="true">EB</span>
            <span aria-hidden="true">/</span>
            <span>01</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
