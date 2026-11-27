import { useLanguage } from '../../i18n/LanguageContext'
import type { Locale } from '../../i18n/translations'

const options: Array<{ locale: Locale; labelKey: 'arabic' | 'english'; lang: string }> = [
  { locale: 'ar', labelKey: 'arabic', lang: 'ar' },
  { locale: 'en', labelKey: 'english', lang: 'en' },
]

export function LanguageSwitch() {
  const { locale, copy, setLocale } = useLanguage()

  return (
    <div className="language-switch" role="group" aria-label={copy.a11y.language}>
      {options.map((option) => {
        const active = option.locale === locale
        const accessibleLabel =
          option.locale === 'ar' ? copy.language.switchToArabic : copy.language.switchToEnglish

        return (
          <button
            key={option.locale}
            type="button"
            className="language-switch__option"
            data-active={active}
            aria-pressed={active}
            aria-label={accessibleLabel}
            lang={option.lang}
            onClick={() => setLocale(option.locale)}
          >
            {copy.language[option.labelKey]}
          </button>
        )
      })}
    </div>
  )
}
