import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profiles, type ProfileId } from '../data/profiles'
import { useLanguage } from '../i18n/LanguageContext'
import { useProfile } from '../i18n/ProfileContext'

/**
 * Página de seleção de perfil de acesso (UC01, UC02, UC03).
 * Exibida antes do site na primeira visita e ao clicar em "Trocar perfil".
 */
export default function ProfileSelect() {
  const { t, lang, toggleLang } = useLanguage()
  const { profileId, setProfile } = useProfile()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [selected, setSelected] = useState<ProfileId>(profileId ?? 'geral')

  const confirm = () => {
    setProfile(selected)
    navigate(from, { replace: true })
  }

  // UC02 — pular: sem perfil salvo aplica `geral`; com perfil salvo, volta sem alterar (UC03).
  const skip = () => {
    if (!profileId) setProfile('geral')
    navigate(from, { replace: true })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && skip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, from])

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="container profile-header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark">LA</span>
            <span className="brand__name">Lucas Aguiar</span>
          </Link>
          <button type="button" className="lang-toggle" onClick={toggleLang} title={t.header.switchLang}>
            <span className={lang === 'pt' ? 'lang-toggle__on' : ''}>PT</span>
            <span className="lang-toggle__sep">/</span>
            <span className={lang === 'en' ? 'lang-toggle__on' : ''}>EN</span>
          </button>
        </div>
      </header>

      <main className="container profile-main">
        <h1 className="profile-title">{t.profile.pageTitle}</h1>
        <p className="profile-subtitle">{t.profile.pageSubtitle}</p>

        <div className="profile-options" role="radiogroup" aria-label={t.profile.pageTitle}>
          {profiles.map((p) => {
            const active = p.id === selected
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`profile-option ${active ? 'profile-option--selected' : ''}`}
                onClick={() => setSelected(p.id)}
                onDoubleClick={confirm}
              >
                <span className="profile-option__icon" aria-hidden="true">
                  {p.icon}
                </span>
                <span>
                  <span className="profile-option__label">{p.label[lang]}</span>
                  <span className="profile-option__desc">{p.description[lang]}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="profile-actions">
          <button type="button" className="profile-skip" onClick={skip}>
            {profileId ? t.profile.back : t.profile.skip}
          </button>
          <button type="button" className="btn btn--primary" onClick={confirm}>
            {t.profile.confirm}
          </button>
        </div>
        <p className="profile-hint">{t.profile.hint}</p>
      </main>

      <footer className="profile-footer">
        <p className="footer__text footer__text--muted">
          © {new Date().getFullYear()} Lucas Aguiar · {t.footer.madeWith}
        </p>
      </footer>
    </div>
  )
}
