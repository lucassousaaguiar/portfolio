import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import Layout from './components/Layout'
import About from './pages/About'
import Projects from './pages/Projects'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'
import ProfileSelect from './pages/ProfileSelect'
import { useProfile } from './i18n/ProfileContext'

/** RF01 — sem perfil salvo, o visitante passa primeiro pela página de seleção. */
function RequireProfile({ children }: { children: ReactNode }) {
  const { profileId } = useProfile()
  const { pathname } = useLocation()
  if (!profileId) return <Navigate to="/perfil" replace state={{ from: pathname }} />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="perfil" element={<ProfileSelect />} />
      <Route
        element={
          <RequireProfile>
            <Layout />
          </RequireProfile>
        }
      >
        <Route index element={<About />} />
        <Route path="projetos" element={<Projects />} />
        <Route path="experiencias" element={<Experiences />} />
        <Route path="contato" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
