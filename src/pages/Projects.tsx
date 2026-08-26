import PageHeader from '../components/PageHeader'
import { ExternalIcon, ImageIcon } from '../components/Icons'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t, lang } = useLanguage()
  const ordered = [...projects].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="container">
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />

      <ol className="timeline" style={{ listStyle: 'none', margin: 0 }}>
        {ordered.map((p) => (
          <li key={p.id} className="timeline__item">
            <p className="timeline__period">{p.period}</p>
            <article className="card project">
              <div>
                <h2 className="project__title">{p.name}</h2>
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
        ))}
      </ol>
    </div>
  )
}
