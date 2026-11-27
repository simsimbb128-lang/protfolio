import { useLanguage } from '../../i18n/LanguageContext'
import type { ContactChannelCopy } from '../../i18n/translations'

function ChannelIcon({ channel }: { channel: ContactChannelCopy['id'] }) {
  if (channel === 'email') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m4.2 7.2 7.8 6 7.8-6" />
      </svg>
    )
  }

  if (channel === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.2 3.8 10.5 8 8.8 9.8c1 2 2.4 3.5 4.4 4.5l1.8-1.7 4.2 2.3-.8 3c-.2.8-.9 1.3-1.7 1.2C9.9 18.4 5.6 14.1 4.7 7.3c-.1-.8.4-1.5 1.2-1.7l2.3-.8Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2 11.2a8.2 8.2 0 0 1-11.9 7.3l-4.5 1.2 1.2-4.4A8.2 8.2 0 1 1 20.2 11.2Z" />
      <path d="M9.5 7.9c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.3l.6 1.4c.1.2.1.4-.1.6l-.5.6c-.1.2-.2.3 0 .6.5.8 1.2 1.5 2 2 .3.2.4.1.6-.1l.6-.7c.2-.2.3-.2.5-.1l1.5.7c.2.1.3.2.3.4 0 .4-.1 1-.3 1.3-.3.5-1 .8-1.6.8-1 0-2.8-.9-4.1-2.1-1.2-1.2-2.2-3-2.2-4 0-.5.3-1.1.7-1.3Z" />
    </svg>
  )
}

export function ContactSlide() {
  const { copy } = useLanguage()
  const { contact } = copy

  return (
    <article className="scene contact-scene" aria-labelledby="contact-title">
      <header className="scene__header">
        <p className="section-kicker">
          <span className="section-kicker__line" aria-hidden="true" />
          {contact.eyebrow}
        </p>

        <div className="scene__heading-grid">
          <h2 className="scene__title" id="contact-title">
            {contact.title}
          </h2>
          <p className="scene__lead">{contact.lead}</p>
        </div>
      </header>

      <div className="contact-scene__body">
        <div className="contact-scene__copy">
          <p className="contact-scene__note">{contact.note}</p>

          <ul className="contact-grid" aria-label={contact.signalLabel}>
            {contact.channels.map((channel) => {
              const external = channel.id === 'whatsapp'

              return (
                <li key={channel.id}>
                  <a
                    className={`contact-card contact-card--${channel.id}`}
                    href={channel.href}
                    aria-label={channel.ariaLabel}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className="contact-card__icon">
                      <ChannelIcon channel={channel.id} />
                    </span>
                    <span className="contact-card__copy">
                      <span className="contact-card__label">{channel.label}</span>
                      <span className="contact-card__value" dir="ltr">
                        {channel.value}
                      </span>
                      <span className="contact-card__description">{channel.description}</span>
                    </span>
                    <span className="contact-card__action">
                      {channel.actionLabel}
                      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M4 9h10M10.2 5.2 14 9l-3.8 3.8M9 3h6v6" />
                      </svg>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <p className="contact-scene__external">{contact.externalNote}</p>
        </div>

        <div className="contact-visual" aria-hidden="true">
          <span className="contact-visual__halo" />
          <span className="contact-visual__orbit contact-visual__orbit--outer" />
          <span className="contact-visual__orbit contact-visual__orbit--inner" />
          <span className="contact-visual__axis" />
          <span className="contact-visual__core">
            <span>EB</span>
          </span>
          <span className="contact-visual__node contact-visual__node--one" />
          <span className="contact-visual__node contact-visual__node--two" />
          <span className="contact-visual__node contact-visual__node--three" />
          <span className="contact-visual__beam" />
          <span className="contact-visual__panel">
            <span className="contact-visual__panel-label">{contact.signalLabel}</span>
            <span className="contact-visual__panel-value">{contact.signalCaption}</span>
          </span>
          <span className="contact-visual__serial">EB · 05</span>
        </div>
      </div>
    </article>
  )
}
