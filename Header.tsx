import type { MouseEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitch } from '../ui/LanguageSwitch'

type NavSlideId = 'about' | 'projects' | 'certificates' | 'contact'

interface HeaderProps {
  theme: 'light' | 'dark'
  onHome: () => void
  onNavigate: (slide: NavSlideId) => void
}

export function Header({ theme, onHome, onNavigate }: HeaderProps) {
  const { copy } = useLanguage()

  const links: Array<{ id: NavSlideId; index: string; label: string }> = [
    { id: 'about', index: '02', label: copy.nav.about },
    { id: 'projects', index: '03', label: copy.nav.projects },
    { id: 'certificates', index: '04', label: copy.presentation.slides.certificates },
    { id: 'contact', index: '05', label: copy.nav.contact },
  ]

  const handleHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onHome()
  }

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: NavSlideId) => {
    event.preventDefault()
    onNavigate(id)
  }

  return (
    <header className="site-header" data-theme={theme}>
      <div className="site-header__inner">
        <a className="brand" href="#slide-opening" aria-label={copy.brand.name} onClick={handleHome}>
          <span className="brand__mark" aria-hidden="true">
            <span className="brand__mark-inner">EB</span>
          </span>
          <span className="brand__text">
            <span className="brand__name">{copy.brand.name}</span>
            <span className="brand__descriptor">{copy.brand.descriptor}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label={copy.a11y.primaryNav}>
          {links.map((link) => (
            <a
              key={link.id}
              className="site-nav__link"
              href={`#slide-${link.id}`}
              onClick={(event) => handleNavigate(event, link.id)}
            >
              <span className="site-nav__index">{link.index}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  )
}
