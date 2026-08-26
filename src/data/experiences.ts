import type { ContentTag } from './profiles'

export interface Experience {
  id: string
  organization: string
  role: { pt: string; en: string }
  period: { pt: string; en: string }
  description: { pt: string; en: string }
  type: 'job' | 'freelance' | 'academic' | 'event'
  /** Tags usadas pelos perfis de acesso para marcar destaques (RN05). */
  tags: ContentTag[]
}

// Do mais recente ao mais antigo.
export const experiences: Experience[] = [
  {
    id: 'publicamed',
    organization: 'PublicaMED',
    role: { pt: 'Desenvolvedor Web (freelance)', en: 'Web Developer (freelance)' },
    period: { pt: 'Jun 2026 — atual', en: 'Jun 2026 — present' },
    description: {
      pt: 'Desenvolvimento e manutenção do sistema interno de gestão da empresa: migração para React + Supabase, autenticação, módulos de vendas e financeiro e deploy contínuo.',
      en: "Development and maintenance of the company's internal management system: migration to React + Supabase, authentication, sales and finance modules and continuous deployment.",
    },
    type: 'freelance',
    tags: ['profissional', 'freelance'],
  },
  {
    id: 'ortogonblender',
    organization: 'OrtogOnBlender',
    role: { pt: 'Desenvolvedor Python (add-on Blender)', en: 'Python Developer (Blender add-on)' },
    period: { pt: '2026', en: '2026' },
    description: {
      pt: 'Implementação de add-on para geração automatizada de relatórios de planejamento cirúrgico virtual a partir da cena 3D.',
      en: 'Implementation of an add-on that automatically generates virtual surgical planning reports from the 3D scene.',
    },
    type: 'freelance',
    tags: ['profissional', 'freelance'],
  },
  {
    id: 'puc-minas',
    organization: 'PUC Minas',
    role: { pt: 'Graduando em Engenharia de Software', en: 'Software Engineering Undergraduate' },
    period: { pt: '2024 — atual', en: '2024 — present' },
    description: {
      pt: 'Disciplinas de algoritmos, estruturas de dados, engenharia de software e laboratórios de desenvolvimento com projetos práticos em equipe.',
      en: 'Courses on algorithms, data structures, software engineering and development labs with hands-on team projects.',
    },
    type: 'academic',
    tags: ['academico'],
  },
]
