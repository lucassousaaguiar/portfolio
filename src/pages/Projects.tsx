import PageHeader from '../components/PageHeader'
import { ExternalIcon, ImageIcon } from '../components/Icons'
import { projects } from '../data/projects'
import { isFeatured } from '../data/profiles'
import { useLanguage } from '../i18n/LanguageContext'
import { useProfile } from '../i18n/ProfileContext'

export default function Projects() {
  const { t, lang } = useLanguage()
  const { profile } = useProfile()

  // RN02 — sempre cronológica, em qualquer perfil
  const ordered = [...projects].sort((a, b) => a.date.localeCompare(b.date))
  // RF06 / RF07 — destaques do perfil (a ordem não muda)
  const featured = ordered.filter((p) => isFeatured(p.tags, profile))

  return (
    <div className="container">
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />

      {featured.length > 0 && (
        <nav className="featured-strip" aria-label={t.profile.featuredForYou}>
          <span className="featured-strip__label">
            <span aria-hidden="true">{profile.icon}</span> {t.profile.featuredForYou}:
          </span>
          {featured.map((p) => (
            <a key={p.id} href={`#projeto-${p.id}`} className="featured-strip__link">
              {p.name}
            </a>
          ))}
        </nav>
      )}

      <ol className="timeline" style={{ listStyle: 'none', margin: 0 }}>
        {ordered.map((p) => {
          const highlight = isFeatured(p.tags, profile)
          return (
            <li key={p.id} id={`projeto-${p.id}`} className="timeline__item">
              <p className="timeline__period">{p.period}</p>
              <article className={`card project ${highlight ? 'card--featured' : ''}`}>
                <div>
                  <div className="project__heading">
                    <h2 className="project__title">{p.name}</h2>
                    {highlight && <span className="badge">{t.profile.featured}</span>}
                  </div>
                  <p className="project__desc">{p.description[lang]}</p>
                  <div className="chips">
                    {p.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project__footer">
                    <a className="project__repo" href={p.repo} target="_blank" rel="noreferrer">
                      {t.projects.repo} <ExternalIcon />
                    </a>
                  </div>
                </div>
                <div className="project__media">
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <div>
                      <ImageIcon style={{ margin: '0 auto 8px' }} />
                      {t.projects.preview}
                    </div>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
