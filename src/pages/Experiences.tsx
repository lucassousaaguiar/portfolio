import PageHeader from '../components/PageHeader'
import { experiences } from '../data/experiences'
import { isFeatured } from '../data/profiles'
import { useLanguage } from '../i18n/LanguageContext'
import { useProfile } from '../i18n/ProfileContext'

export default function Experiences() {
  const { t, lang } = useLanguage()
  const { profile } = useProfile()

  return (
    <div className="container">
      <PageHeader title={t.experiences.title} subtitle={t.experiences.subtitle} />

      <div className="experiences">
        {experiences.map((e) => {
          // RF08 — marcação de destaque, ordem inalterada
          const highlight = isFeatured(e.tags, profile)
          return (
            <article key={e.id} className={`card experience ${highlight ? 'card--featured' : ''}`}>
              <div>
                <div className="experience__period">{e.period[lang]}</div>
                <span className="experience__type">{t.experiences.types[e.type]}</span>
              </div>
              <div>
                <div className="project__heading">
                  <h2 className="experience__role">{e.role[lang]}</h2>
                  {highlight && <span className="badge">{t.profile.featured}</span>}
                </div>
                <p className="experience__org">{e.organization}</p>
                <p className="experience__desc">{e.description[lang]}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
