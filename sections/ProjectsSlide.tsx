import { useLanguage } from '../../i18n/LanguageContext'

const pad = (value: number) => String(value).padStart(2, '0')

export function ProjectsSlide() {
  const { copy } = useLanguage()
  const { projects } = copy

  return (
    <article className="scene projects-scene" aria-labelledby="projects-title">
      <header className="scene__header">
        <p className="section-kicker">
          <span className="section-kicker__line" aria-hidden="true" />
          {projects.eyebrow}
        </p>

        <div className="scene__heading-grid">
          <div className="scene__title-group">
            <h2 className="scene__title" id="projects-title">
              {projects.title}
            </h2>
            <span className="scene__count" aria-hidden="true">
              <strong>{projects.countValue}</strong>
              <span>{projects.countLabel}</span>
            </span>
          </div>
          <p className="scene__lead">{projects.lead}</p>
        </div>
      </header>

      <ul className="project-grid" aria-label={projects.title}>
        {projects.items.map((project, index) => (
          <li key={project.id}>
            <a
              className="project-card"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${projects.visit} (${copy.a11y.opensNewTab})`}
            >
              <span className="project-card__media">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={800}
                  height={520}
                  loading="eager"
                  decoding="async"
                />
                <span className="project-card__sheen" aria-hidden="true" />
                <span className="project-card__index" aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <span className="project-card__tag">{project.tag}</span>
              </span>

              <span className="project-card__body">
                <span className="project-card__title">{project.title}</span>
                <span className="project-card__description">{project.description}</span>
                <span className="project-card__footer">
                  <span className="project-card__visit">
                    {projects.visit}
                    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 9h10M10.2 5.2 14 9l-3.8 3.8M9 3h6v6" />
                    </svg>
                  </span>
                  <span className="project-card__host" dir="ltr">
                    {project.host}
                  </span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="scene__footer scene__footer--compact">
        <p className="scene__note">{projects.artworkNote}</p>
        <span className="scene__serial" aria-hidden="true">
          PROJECTS / 04
        </span>
      </footer>
    </article>
  )
}
