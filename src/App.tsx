import { Deck } from './components/presentation/Deck'
import { useLanguage } from './i18n/LanguageContext'

export function App() {
  const { copy } = useLanguage()

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.a11y.skip}
      </a>
      <Deck />
    </>
  )
}
