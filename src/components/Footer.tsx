import { useLanguage } from '../i18n/LanguageContext'
import { contacts } from '../data/contacts'
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from './Icons'

const icons = { email: MailIcon, whatsapp: WhatsAppIcon, linkedin: LinkedInIcon, github: GitHubIcon }

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          © {year} Lucas Aguiar. {t.footer.rights}
        </p>
        <div className="footer__social">
          {contacts.map((c) => {
            const Icon = icons[c.id]
            return (
              <a key={c.id} href={c.href} target="_blank" rel="noreferrer" aria-label={c.label} title={c.label}>
                <Icon width={20} height={20} />
              </a>
            )
          })}
        </div>
        <p className="footer__text footer__text--muted">{t.footer.madeWith}</p>
      </div>
    </footer>
  )
}
