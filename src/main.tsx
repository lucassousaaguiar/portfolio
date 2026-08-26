import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { ProfileProvider, applyProfileFromUrl } from './i18n/ProfileContext'
import './styles/global.css'

// `?perfil=<id>` (RF12) é consumido antes de montar o Router, para a URL já nascer limpa.
applyProfileFromUrl()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
