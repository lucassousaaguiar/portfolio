/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from './translations'

interface LanguageContextValue {
  lang: Lang
  t: Translation
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    /* localStorage indisponível */
  }
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* localStorage indisponível */
    }
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    t: translations[lang] as Translation,
    toggleLang: () => setLang((l) => (l === 'pt' ? 'en' : 'pt')),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
