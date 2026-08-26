export interface Project {
  id: string
  name: string
  period: string // exibido na timeline (ex.: "2024")
  date: string // ISO para ordenação
  description: { pt: string; en: string }
  technologies: string[]
  repo: string
  image?: string // caminho para imagem/GIF (Sprint 03)
}

// Ordenado do mais antigo ao mais recente (a página também ordena por `date`).
export const projects: Project[] = [
  {
    id: 'olimpiadas',
    name: 'Olimpíadas',
    period: 'Jun 2024',
    date: '2024-06-19',
    description: {
      pt: 'Sistema em C para cadastro e classificação de países e medalhas, desenvolvido na disciplina de Algoritmos e Estruturas de Dados I.',
      en: 'C program to register countries and medals and rank them, developed for the Algorithms and Data Structures I course.',
    },
    technologies: ['C', 'Structs', 'Arquivos'],
    repo: 'https://github.com/lucassousaaguiar/olimpiadas',
  },
  {
    id: 'hotel-descanso-garantido',
    name: 'Hotel Descanso Garantido',
    period: 'Jul 2024',
    date: '2024-07-02',
    description: {
      pt: 'Sistema de gerenciamento de hotel (clientes, funcionários, quartos e estadias) com persistência em arquivos, feito em C como trabalho prático de AEDs I.',
      en: 'Hotel management system (guests, staff, rooms and stays) with file persistence, written in C as the AEDs I practical assignment.',
    },
    technologies: ['C', 'Structs', 'Arquivos', 'Ponteiros'],
    repo: 'https://github.com/lucassousaaguiar/Hotel-Descanso-Garantido-AEDsI',
  },
  {
    id: 'publicamed',
    name: 'PublicaMED · Sistema de Gestão',
    period: 'Jun 2026',
    date: '2026-06-18',
    description: {
      pt: 'Painel interno de gestão (vendas, clientes, trabalhos e financeiro) migrado para uma aplicação multiusuário com autenticação e banco central na nuvem.',
      en: 'Internal management panel (sales, clients, jobs and finance) migrated to a multi-user app with authentication and a central cloud database.',
    },
    technologies: ['React', 'Vite', 'Supabase', 'Cloudflare Pages'],
    repo: 'https://github.com/lucassousaaguiar/publicamed',
  },
  {
    id: 'addon-relatorios',
    name: 'Add-on de Relatórios Cirúrgicos (Blender)',
    period: '2026',
    date: '2026-07-01',
    description: {
      pt: 'Add-on em Python para o Blender (OrtogOnBlender) que calcula movimentos de segmentos ósseos e gera relatórios de planejamento cirúrgico em HTML.',
      en: 'Python add-on for Blender (OrtogOnBlender) that computes bone segment movements and generates surgical planning reports in HTML.',
    },
    technologies: ['Python', 'Blender API', 'HTML/CSS'],
    repo: 'https://github.com/viniciusoramos/ADDON_RELATORIOS',
  },
  {
    id: 'portfolio',
    name: 'Portfólio Profissional',
    period: 'Ago 2026',
    date: '2026-08-26',
    description: {
      pt: 'Este site: portfólio bilíngue, responsivo, com timeline de projetos e formulário de contato, desenvolvido no Laboratório de Desenvolvimento de Software.',
      en: 'This website: a bilingual, responsive portfolio with a project timeline and contact form, built for the Software Development Lab course.',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'React Router'],
    repo: 'https://github.com/lucassousaaguiar/portfolio',
  },
]
