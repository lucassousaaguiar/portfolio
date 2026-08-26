/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { getProfile, isProfileId, type Profile, type ProfileId } from '../data/profiles'

const STORAGE_KEY = 'profile'

interface ProfileContextValue {
  /** Perfil salvo (null = visitante ainda não escolheu). */
  profileId: ProfileId | null
  /** Perfil resolvido (cai no padrão `geral` quando não há escolha). */
  profile: Profile
  setProfile: (id: ProfileId) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function readStored(): ProfileId | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isProfileId(stored) ? stored : null
  } catch {
    return null
  }
}

function store(id: ProfileId) {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* localStorage indisponível (RNF08): segue só em memória */
  }
}

/**
 * RF12 / RN04 — `?perfil=<id>` pré-seleciona um perfil com precedência sobre o salvo.
 * Deve rodar ANTES de montar o Router, para que a URL já esteja limpa.
 * Retorna o id aplicado (ou null se não havia parâmetro válido).
 */
export function applyProfileFromUrl(): ProfileId | null {
  try {
    const url = new URL(window.location.href)
    const param = url.searchParams.get('perfil')
    if (param === null) return null
    url.searchParams.delete('perfil')
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
    if (!isProfileId(param)) return null // valor inválido é ignorado
    store(param)
    return param
  } catch {
    return null
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileId, setProfileId] = useState<ProfileId | null>(readStored)

  const value: ProfileContextValue = {
    profileId,
    profile: getProfile(profileId),
    setProfile: (id) => {
      store(id)
      setProfileId(id)
    },
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider')
  return ctx
}
