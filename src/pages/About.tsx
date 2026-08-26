import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useProfile } from '../i18n/ProfileContext'
import { contacts, skills } from '../data/contacts'
import type { AboutCard, CtaTarget } from '../data/profiles'

export default function About() {
  const { t, lang } = useLanguage()
  const { profile } = useProfile()

  const cardsById: Record<AboutCard, { title: string; text: string }> = {
    education: { title: t.about.education, text: t.about.educationText },
    area: { title: t.about.area, text: t.about.areaText },
    interests: { title: t.about.interests, text: t.about.interestsText },
    goals: { title: t.about.goals, text: t.about.goalsText },
  }
  // RF05 — ordem dos cards e das habilidades conforme o perfil
  const cards = profile.aboutCardsOrder.map((id) => cardsById[id])
  const featured = profile.featuredSkills.filter((s) => skills.includes(s))
  const orderedSkills = [...featured, ...skills.filter((s) => !featured.includes(s))]
  const headline = profile.headline[lang]

  // RF05 — CTA primário conforme o perfil; o secundário é o outro atalho interno
  const github = contacts.find((c) => c.id === 'github')!.href
  const primary = profile.primaryCta
  const secondary: CtaTarget = primary === 'projects' ? 'contact' : 'projects'
  const cta = (target: CtaTarget, className: string) => {
    if (target === 'github')
      return (
        <a href={github} target="_blank" rel="noreferrer" className={className}>
          {t.about.ctaGithub}
        </a>
      )
    if (target === 'contact')
      return (
        <Link to="/contato" className={className}>
          {t.about.ctaContact}
        </Link>
      )
    return (
      <Link to="/projetos" className={className}>
        {t.about.ctaProjects}
      </Link>
    )
  }

  return (
    <div className="container">
      <section className="hero">
        <div>
          <p className="hero__greeting">{t.about.greeting}</p>
          <h1 className="hero__name">Lucas Aguiar</h1>
          <p className="hero__role">{t.about.role}</p>
          <p className="hero__intro">{t.about.intro}</p>
          {headline && (
            <p className="hero__highlight">
              <span aria-hidden="true">{profile.icon}</span> {headline}
            </p>
          )}
          <div className="hero__actions">
            {cta(primary, 'btn btn--primary')}
            {cta(secondary, 'btn btn--ghost')}
          </div>
        </div>
        <div className="hero__avatar" aria-hidden="true">
          LA
        </div>
      </section>

      <section className="info-grid">
        {cards.map((c) => (
          <article key={c.title} className="card info-card">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="section-title">{t.about.skills}</h2>
        <div className="chips">
          {orderedSkills.map((s) => (
            <span key={s} className={`chip ${featured.includes(s) ? 'chip--featured' : ''}`}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
