import { useLanguage } from '../../i18n/LanguageContext'

export function AboutSlide() {
  const { copy } = useLanguage()
  const { about } = copy
  const name = copy.hero.nameLines.join(' ')

  return (
    <article className="scene about-scene" aria-labelledby="about-title">
      <header className="scene__header">
        <p className="section-kicker">
          <span className="section-kicker__line" aria-hidden="true" />
          {about.eyebrow}
        </p>

        <div className="scene__heading-grid">
          <h2 className="scene__title" id="about-title">
            {about.title}
          </h2>
          <p className="scene__lead">{about.lead}</p>
        </div>
      </header>

      <div className="about-scene__body">
        <section className="about-profile" aria-label={name}>
          <div className="about-profile__monogram" aria-hidden="true">
            <span className="about-profile__orbit about-profile__orbit--outer" />
            <span className="about-profile__orbit about-profile__orbit--inner" />
            <span className="about-profile__core">EB</span>
            <span className="about-profile__node about-profile__node--one" />
            <span className="about-profile__node about-profile__node--two" />
            <span className="about-profile__scan" />
          </div>

          <div className="about-profile__copy">
            <p className="about-profile__name">{name}</p>
            <p className="about-profile__descriptor">{copy.brand.descriptor}</p>
            <p className="about-profile__text">{about.body}</p>
          </div>
        </section>

        <ul className="interest-grid" aria-label={about.title}>
          {about.interests.map((interest) => (
            <li key={interest.id}>
              <article className="interest-card">
                <span className="interest-card__index">{interest.index}</span>
                <h3 className="interest-card__title">{interest.title}</h3>
                <p className="interest-card__text">{interest.text}</p>
                <span className="interest-card__signal" aria-hidden="true">
                  <span />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <footer className="scene__footer">
        <p className="scene__note">{about.note}</p>
        <ul className="scene__metrics" aria-label={about.metricsLabel}>
          {about.metrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}
