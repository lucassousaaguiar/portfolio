import PageHeader from '../components/PageHeader'
import { experiences } from '../data/experiences'
import { useLanguage } from '../i18n/LanguageContext'

export default function Experiences() {
  const { t, lang } = useLanguage()

  return (
    <div className="container">
      <PageHeader title={t.experiences.title} subtitle={t.experiences.subtitle} />

      <div className="experiences">
        {experiences.map((e) => (
          <article key={e.id} className="card experience">
            <div>
              <div className="experience__period">{e.period[lang]}</div>
              <span className="experience__type">{t.experiences.types[e.type]}</span>
            </div>
            <div>
              <h2 className="experience__role">{e.role[lang]}</h2>
              <p className="experience__org">{e.organization}</p>
              <p className="experience__desc">{e.description[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
