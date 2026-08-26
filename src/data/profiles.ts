import type { Lang } from '../i18n/translations'
import type { ContactLink } from './contacts'

/** Perfis de acesso — ver docs/requisitos/perfis-de-acesso.md */
export type ProfileId = 'geral' | 'recrutador' | 'professor' | 'dev'

/** Tags de conteúdo usadas em projetos e experiências (RN05). */
export type ContentTag = 'academico' | 'profissional' | 'freelance' | 'open-source' | 'evento'

export type Localized = Record<Lang, string>
export type AboutCard = 'education' | 'area' | 'interests' | 'goals'
export type CtaTarget = 'projects' | 'contact' | 'github'

export interface Profile {
  id: ProfileId
  icon: string
  label: Localized
  description: Localized
  /** Frase de destaque exibida no hero (vazia = nenhuma). */
  headline: Localized
  primaryCta: CtaTarget
  aboutCardsOrder: AboutCard[]
  /** Habilidades que sobem para o início da lista. */
  featuredSkills: string[]
  /** Projetos/experiências com estas tags recebem a marcação "Destaque". */
  highlightTags: ContentTag[]
  contactOrder: ContactLink['id'][]
  /** Assunto pré-preenchido no formulário de contato (editável). */
  contactSubject: Localized
}

export const profiles: Profile[] = [
  {
    id: 'recrutador',
    icon: '💼',
    label: { pt: 'Recrutador / Empresa', en: 'Recruiter / Company' },
    description: {
      pt: 'Experiências, habilidades e contato rápido em evidência.',
      en: 'Experience, skills and quick contact up front.',
    },
    headline: {
      pt: 'Busco oportunidades de estágio ou vaga júnior em desenvolvimento web — confira minhas experiências e habilidades.',
      en: 'Looking for internship or junior web development opportunities — check out my experience and skills.',
    },
    primaryCta: 'contact',
    aboutCardsOrder: ['area', 'goals', 'education', 'interests'],
    featuredSkills: ['React', 'TypeScript', 'Node.js', 'SQL', 'Git/GitHub'],
    highlightTags: ['profissional', 'freelance'],
    contactOrder: ['linkedin', 'email', 'whatsapp', 'github'],
    contactSubject: { pt: 'Oportunidade de vaga', en: 'Job opportunity' },
  },
  {
    id: 'professor',
    icon: '🎓',
    label: { pt: 'Professor / Avaliador', en: 'Professor / Evaluator' },
    description: {
      pt: 'Formação, projetos acadêmicos e repositórios em evidência.',
      en: 'Education, academic projects and repositories up front.',
    },
    headline: {
      pt: 'Graduando em Engenharia de Software na PUC Minas — veja os projetos acadêmicos e o código-fonte no GitHub.',
      en: 'Software Engineering undergraduate at PUC Minas — see the academic projects and source code on GitHub.',
    },
    primaryCta: 'projects',
    aboutCardsOrder: ['education', 'interests', 'area', 'goals'],
    featuredSkills: ['C', 'Python', 'Git/GitHub', 'SQL'],
    highlightTags: ['academico', 'evento'],
    contactOrder: ['email', 'github', 'linkedin', 'whatsapp'],
    contactSubject: { pt: 'Avaliação do portfólio', en: 'Portfolio evaluation' },
  },
  {
    id: 'dev',
    icon: '💻',
    label: { pt: 'Desenvolvedor / Comunidade', en: 'Developer / Community' },
    description: {
      pt: 'Stack, GitHub e projetos com código aberto em evidência.',
      en: 'Stack, GitHub and open-source projects up front.',
    },
    headline: {
      pt: 'Trabalho com React, TypeScript, Node.js e Python — os repositórios públicos estão no GitHub.',
      en: 'I work with React, TypeScript, Node.js and Python — public repositories are on GitHub.',
    },
    primaryCta: 'github',
    aboutCardsOrder: ['area', 'interests', 'goals', 'education'],
    featuredSkills: ['TypeScript', 'React', 'Node.js', 'Python'],
    highlightTags: ['open-source', 'freelance'],
    contactOrder: ['github', 'email', 'linkedin', 'whatsapp'],
    contactSubject: { pt: 'Colaboração em projeto', en: 'Project collaboration' },
  },
  {
    id: 'geral',
    icon: '👤',
    label: { pt: 'Visitante geral', en: 'General visitor' },
    description: { pt: 'Visão equilibrada do portfólio.', en: 'A balanced view of the portfolio.' },
    headline: { pt: '', en: '' },
    primaryCta: 'projects',
    aboutCardsOrder: ['education', 'area', 'interests', 'goals'],
    featuredSkills: [],
    highlightTags: [],
    contactOrder: ['email', 'whatsapp', 'linkedin', 'github'],
    contactSubject: { pt: '', en: '' },
  },
]

export const DEFAULT_PROFILE: ProfileId = 'geral'

export function isProfileId(value: unknown): value is ProfileId {
  return typeof value === 'string' && profiles.some((p) => p.id === value)
}

export function getProfile(id: ProfileId | null | undefined): Profile {
  return profiles.find((p) => p.id === id) ?? profiles.find((p) => p.id === DEFAULT_PROFILE)!
}

/** Um item é destaque quando alguma de suas tags está entre as tags destacadas do perfil (RN05). */
export function isFeatured(tags: ContentTag[], profile: Profile): boolean {
  return profile.highlightTags.length > 0 && tags.some((t) => profile.highlightTags.includes(t))
}
