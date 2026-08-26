import type { FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '../components/Icons'
import { contacts } from '../data/contacts'
import { useLanguage } from '../i18n/LanguageContext'

const icons = { email: MailIcon, whatsapp: WhatsAppIcon, linkedin: LinkedInIcon, github: GitHubIcon }

export default function Contact() {
  const { t } = useLanguage()

  // Sprint 02: integrar envio de e-mail (ex.: EmailJS / Formspree / função serverless).
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="contact">
        <div className="contact-links">
          {contacts.map((c) => {
            const Icon = icons[c.id]
            return (
              <a key={c.id} className="card contact-link" href={c.href} target="_blank" rel="noreferrer">
                <span className="contact-link__icon">
                  <Icon />
                </span>
                <span>
                  <div className="contact-link__label">{c.label}</div>
                  <div className="contact-link__value">{c.value}</div>
                </span>
              </a>
            )
          })}
        </div>

        <form className="card form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label htmlFor="name">{t.contact.name}</label>
            <input id="name" name="name" type="text" placeholder={t.contact.namePlaceholder} required />
          </div>
          <div className="form__field">
            <label htmlFor="email">{t.contact.email}</label>
            <input id="email" name="email" type="email" placeholder={t.contact.emailPlaceholder} required />
          </div>
          <div className="form__field">
            <label htmlFor="message">{t.contact.message}</label>
            <textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} required />
          </div>
          <button type="submit" className="btn btn--primary" style={{ justifySelf: 'start' }}>
            {t.contact.send}
          </button>
          <p className="form__note">{t.contact.note}</p>
        </form>
      </div>
    </div>
  )
}
