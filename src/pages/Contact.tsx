import { useState, type FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '../components/Icons'
import { contacts } from '../data/contacts'
import { useLanguage } from '../i18n/LanguageContext'
import { useProfile } from '../i18n/ProfileContext'

const icons = { email: MailIcon, whatsapp: WhatsAppIcon, linkedin: LinkedInIcon, github: GitHubIcon }

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldErrors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t, lang } = useLanguage()
  const { profile } = useProfile()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  // RF09 — canais reordenados por relevância para o perfil (todos continuam visíveis)
  const ordered = [...contacts].sort(
    (a, b) => profile.contactOrder.indexOf(a.id) - profile.contactOrder.indexOf(b.id),
  )
  const suggestedSubject = profile.contactSubject[lang]

  const validate = (data: FormData): FieldErrors => {
    const errs: FieldErrors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name) errs.name = t.contact.required
    if (!email) errs.email = t.contact.required
    else if (!EMAIL_RE.test(email)) errs.email = t.contact.emailInvalid
    if (!message) errs.message = t.contact.required
    else if (message.length < 10) errs.message = t.contact.messageMin
    return errs
  }

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot anti-spam: humanos não veem/preenchem este campo
    if (data.get('botcheck')) return

    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const first = ['name', 'email', 'message'].find((f) => errs[f as keyof FieldErrors])
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }

    if (!ACCESS_KEY) {
      console.warn('VITE_WEB3FORMS_KEY não configurada (.env.local)')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: 'Portfólio — Lucas Aguiar',
          name: String(data.get('name')).trim(),
          email: String(data.get('email')).trim(),
          subject: String(data.get('subject') ?? '').trim() || 'Contato pelo portfólio',
          message: String(data.get('message')).trim(),
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container">
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="contact">
        <div className="contact-links">
          {ordered.map((c, i) => {
            const Icon = icons[c.id]
            const preferred = profile.id !== 'geral' && i === 0
            return (
              <a
                key={c.id}
                className={`card contact-link ${preferred ? 'card--featured' : ''}`}
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-link__icon">
                  <Icon />
                </span>
                <span>
                  <div className="contact-link__label">
                    {c.label}
                    {preferred && <span className="badge badge--inline">{t.profile.featured}</span>}
                  </div>
                  <div className="contact-link__value">{c.value}</div>
                </span>
              </a>
            )
          })}
        </div>

        {status === 'success' ? (
          <div className="card form-status" role="status">
            <span className="form-status__icon" aria-hidden="true">
              ✓
            </span>
            <h2 className="form-status__title">{t.contact.successTitle}</h2>
            <p className="form-status__text">{t.contact.successText}</p>
            <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
              {t.contact.sendAnother}
            </button>
          </div>
        ) : (
          <form className="card form" onSubmit={handleSubmit} noValidate>
            <input type="checkbox" name="botcheck" className="form__botcheck" tabIndex={-1} aria-hidden="true" />

            <div className="form__field">
              <label htmlFor="name">{t.contact.name} *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t.contact.namePlaceholder}
                className={errors.name ? 'invalid' : ''}
                aria-invalid={!!errors.name}
                onInput={() => clearError('name')}
              />
              {errors.name && <p className="form__error">{errors.name}</p>}
            </div>

            <div className="form__field">
              <label htmlFor="email">{t.contact.email} *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                className={errors.email ? 'invalid' : ''}
                aria-invalid={!!errors.email}
                onInput={() => clearError('email')}
              />
              {errors.email && <p className="form__error">{errors.email}</p>}
            </div>

            <div className="form__field">
              <label htmlFor="subject">{t.profile.subject}</label>
              {/* Decisão 5(a): assunto sugerido pelo perfil, editável. `key` reinicia o valor ao trocar perfil/idioma. */}
              <input
                key={`${profile.id}-${lang}`}
                id="subject"
                name="subject"
                type="text"
                defaultValue={suggestedSubject}
                placeholder={t.profile.subjectPlaceholder}
              />
            </div>

            <div className="form__field">
              <label htmlFor="message">{t.contact.message} *</label>
              <textarea
                id="message"
                name="message"
                placeholder={t.contact.messagePlaceholder}
                className={errors.message ? 'invalid' : ''}
                aria-invalid={!!errors.message}
                onInput={() => clearError('message')}
              />
              {errors.message && <p className="form__error">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              style={{ justifySelf: 'start' }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t.contact.sending : t.contact.send}
            </button>
            {status === 'error' && (
              <p className="form__error form__error--global" role="alert">
                {t.contact.errorText}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
