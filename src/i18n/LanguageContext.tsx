import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  dictionaries,
  localeDirection,
  type Dictionary,
  type Direction,
  type Locale,
} from './translations'

const STORAGE_KEY = 'ebtisam.locale'

interface LanguageContextValue {
  locale: Locale
  dir: Direction
  copy: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }

  return navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)
  const dir = localeDirection[locale]
  const copy = dictionaries[locale]

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
    root.dataset.locale = locale
    document.title = copy.meta.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    description?.setAttribute('content', copy.meta.description)

    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Language still works for the session when storage is unavailable.
    }
  }, [copy.meta.description, copy.meta.title, dir, locale])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, dir, copy, setLocale }),
    [copy, dir, locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
