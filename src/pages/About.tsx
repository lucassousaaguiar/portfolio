import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { skills } from '../data/contacts'

export default function About() {
  const { t } = useLanguage()

  const cards = [
    { title: t.about.education, text: t.about.educationText },
    { title: t.about.area, text: t.about.areaText },
    { title: t.about.interests, text: t.about.interestsText },
    { title: t.about.goals, text: t.about.goalsText },
  ]

  return (
    <div className="container">
      <section className="hero">
        <div>
          <p className="hero__greeting">{t.about.greeting}</p>
          <h1 className="hero__name">Lucas Aguiar</h1>
          <p className="hero__role">{t.about.role}</p>
          <p className="hero__intro">{t.about.intro}</p>
          <div className="hero__actions">
            <Link to="/projetos" className="btn btn--primary">
              {t.about.ctaProjects}
            </Link>
            <Link to="/contato" className="btn btn--ghost">
              {t.about.ctaContact}
            </Link>
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
          {skills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
