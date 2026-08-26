import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { CloseIcon, MenuIcon } from './Icons'

export default function Header() {
  const { t, lang, toggleLang } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: t.nav.about, end: true },
    { to: '/projetos', label: t.nav.projects },
    { to: '/experiencias', label: t.nav.experiences },
    { to: '/contato', label: t.nav.contact },
  ]

  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">LA</span>
          <span className="brand__name">Lucas Aguiar</span>
        </NavLink>

        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <button type="button" className="lang-toggle" onClick={toggleLang} title={t.header.switchLang}>
            <span className={lang === 'pt' ? 'lang-toggle__on' : ''}>PT</span>
            <span className="lang-toggle__sep">/</span>
            <span className={lang === 'en' ? 'lang-toggle__on' : ''}>EN</span>
          </button>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-label={t.header.toggleMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
