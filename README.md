# Portfólio Profissional — Lucas Aguiar

> Laboratório de Desenvolvimento de Software · Engenharia de Software · PUC Minas · 2º semestre/2026
> Prof. Glender Brás — **Laboratório 1: Portfólio Profissional**

Website de portfólio profissional, **bilíngue (PT/EN)** e **responsivo**, que apresenta minha trajetória, projetos, experiências e formas de contato.

🔗 **Site publicado:** _em breve (Sprint 03)_
📦 **Repositório:** https://github.com/lucassousaaguiar/portfolio

---

## Sumário

- [Descrição do projeto](#descrição-do-projeto)
- [Status das sprints](#status-das-sprints)
- [Tecnologias](#tecnologias)
- [Dependências](#dependências)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Wireframes (média fidelidade)](#wireframes-média-fidelidade)
- [Protótipo inicial do front-end](#protótipo-inicial-do-front-end)
- [Perfis de acesso](#perfis-de-acesso)
- [Instalação e execução local](#instalação-e-execução-local)
- [Decisões de design e arquitetura](#decisões-de-design-e-arquitetura)

---

## Descrição do projeto

O sistema é um site de página única (SPA) com quatro seções acessadas por um menu de navegação:

| Seção | Rota | Conteúdo |
|---|---|---|
| **Sobre Mim** | `/` | Apresentação em português e inglês (formação, área de atuação, interesses, objetivos) e habilidades. |
| **Projetos** | `/projetos` | Linha do tempo (do mais antigo ao mais recente). Cada projeto: nome, descrição, tecnologias, link do GitHub e imagem/GIF. |
| **Experiências** | `/experiencias` | Experiências profissionais, freelas, acadêmicas e eventos: instituição, cargo/atividade, período e descrição. |
| **Contato** | `/contato` | Ícones clicáveis (e-mail, WhatsApp, LinkedIn, GitHub) e formulário (nome, e-mail, mensagem) com envio por e-mail. |

**Perfis de acesso** (Sprint 02): ao entrar, o visitante informa quem é — *Recrutador/Empresa*, *Professor/Avaliador*, *Desenvolvedor/Comunidade* ou *Visitante geral* — e o portfólio adapta o **destaque** das informações (ordem, ênfase, chamadas para ação, canais de contato). Não há login e nenhum conteúdo é ocultado. Requisitos e casos de uso em [`docs/requisitos/perfis-de-acesso.md`](docs/requisitos/perfis-de-acesso.md).

Requisitos transversais: design responsivo, interface amigável, identidade visual coerente com o perfil profissional, hospedagem gratuita em nuvem e README completo.

## Status das sprints

### ✅ Lab01S01 — Planejamento e prototipação
- [x] Repositório GitHub com README inicial
- [x] Wireframes das páginas em média fidelidade (desktop e mobile)
- [x] Protótipo inicial do front-end (React + Vite + TypeScript)
- [x] Navegação entre as seções (React Router) e layout principal (cabeçalho, rodapé e área de conteúdo)
- [x] README com imagens dos protótipos, descrição, tecnologias previstas e estrutura inicial

### 🔄 Lab01S02 — Funcionalidades principais (em andamento)
- [ ] Página "Sobre Mim" com versões PT/EN (base já implementada: troca de idioma global)
- [ ] Página "Projetos" com timeline dinâmica (dados em `src/data/projects.ts`)
- [ ] Página "Experiências" com dados organizados
- [ ] Página "Contato" com ícones e formulário funcional (envio de e-mail)
- [ ] Validações básicas e responsividade
- **Nova tarefa — Perfis de acesso** (o visitante escolhe quem é — recrutador, professor, desenvolvedor — e o portfólio muda o *destaque* das informações, sem login e sem esconder conteúdo):
  - [x] Levantamento de requisitos e casos de uso → [`docs/requisitos/perfis-de-acesso.md`](docs/requisitos/perfis-de-acesso.md)
  - [x] Wireframe da página de seleção de perfil → [`docs/wireframes/profile-desktop.png`](docs/wireframes/profile-desktop.png)
  - [x] Validação dos requisitos com o PO (decisões registradas na seção 11 do documento)
  - [x] Implementação (`ProfileContext`, `src/data/profiles.ts`, página `/perfil`, destaques nas 4 seções) — ver [Perfis de acesso](#perfis-de-acesso)

### ⏳ Lab01S03 — Hospedagem e finalização
- [ ] Deploy na Vercel
- [ ] Ajustes visuais e de usabilidade
- [ ] Imagens/GIFs dos projetos em execução
- [ ] README final com link do site publicado

## Tecnologias

| Camada | Tecnologia | Uso |
|---|---|---|
| Front-end | **React 19** + **TypeScript** | Componentes e tipagem estática |
| Build | **Vite 8** | Servidor de desenvolvimento e build de produção |
| Roteamento | **React Router 7** | Navegação entre as seções (SPA) |
| Estilo | **CSS puro** com variáveis (design tokens) | Tema, responsividade (mobile-first via media queries) |
| Internacionalização | Context API própria (`src/i18n`) | Troca PT/EN persistida em `localStorage` |
| Perfis de acesso | Context API própria (`ProfileContext`) + dados declarativos | Destaques por perfil, persistidos em `localStorage`, sem back-end |
| Fontes | Google Fonts (Inter, JetBrains Mono) | Identidade visual |
| Lint | **oxlint** | Qualidade de código |
| Envio de e-mail (previsto) | **EmailJS** ou **Formspree** | Formulário de contato sem back-end próprio |
| Hospedagem (prevista) | **Vercel** | Deploy contínuo a partir do GitHub, com preview por branch |

## Dependências

**Produção** (`dependencies`):

| Pacote | Versão | Descrição |
|---|---|---|
| `react` / `react-dom` | ^19.2 | Biblioteca de interface |
| `react-router-dom` | ^7.18 | Roteamento client-side |

**Desenvolvimento** (`devDependencies`):

| Pacote | Versão | Descrição |
|---|---|---|
| `vite` | ^8.2 | Bundler / dev server |
| `@vitejs/plugin-react` | ^6.1 | Suporte a React (Fast Refresh) |
| `typescript` | ~6.0 | Compilador TypeScript |
| `@types/react`, `@types/react-dom`, `@types/node` | — | Tipagens |
| `oxlint` | ^1.79 | Linter |
| `puppeteer-core` | — | Geração automática das capturas de tela do README e do PDF de requisitos (usa o Chrome instalado) |
| `marked` | — | Conversão Markdown → HTML para o PDF de requisitos |

## Estrutura de diretórios

```
portfolio/
├── docs/
│   ├── requisitos/         # levantamento de requisitos e casos de uso (perfis de acesso)
│   ├── screenshots/        # capturas do protótipo (geradas por scripts/screenshots.mjs)
│   └── wireframes/         # wireframes de média fidelidade (PNG) e suas fontes em HTML (src/)
├── public/
│   └── favicon.svg
├── scripts/
│   └── screenshots.mjs     # gera as imagens dos wireframes e do protótipo
├── src/
│   ├── components/         # Layout, Header, Footer, PageHeader, Icons
│   ├── data/               # conteúdo: projects.ts, experiences.ts, contacts.ts, profiles.ts (perfis de acesso)
│   ├── i18n/               # LanguageContext.tsx (PT/EN), translations.ts e ProfileContext.tsx (perfil ativo)
│   ├── pages/              # About, Projects, Experiences, Contact e ProfileSelect (/perfil)
│   ├── styles/global.css   # design tokens, layout, componentes e responsividade
│   ├── App.tsx             # definição das rotas
│   └── main.tsx            # ponto de entrada (Router + LanguageProvider)
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Wireframes (média fidelidade)

Os wireframes foram desenhados em tons de cinza para definir estrutura, hierarquia e navegação antes da identidade visual. As fontes estão em [`docs/wireframes/src/`](docs/wireframes/src/) e as imagens abaixo são exportadas de lá (desktop 1280px e mobile 390px).

| Sobre Mim | Projetos |
|---|---|
| ![Wireframe Sobre Mim](docs/wireframes/about-desktop.png) | ![Wireframe Projetos](docs/wireframes/projects-desktop.png) |

| Experiências | Contato |
|---|---|
| ![Wireframe Experiências](docs/wireframes/experiences-desktop.png) | ![Wireframe Contato](docs/wireframes/contact-desktop.png) |

**Mobile**

| Sobre Mim | Projetos | Experiências | Contato |
|---|---|---|---|
| ![](docs/wireframes/about-mobile.png) | ![](docs/wireframes/projects-mobile.png) | ![](docs/wireframes/experiences-mobile.png) | ![](docs/wireframes/contact-mobile.png) |

## Protótipo inicial do front-end

Protótipo navegável com o layout principal (cabeçalho fixo com menu, área de conteúdo e rodapé com redes), as quatro rotas e a troca de idioma PT/EN.

| Sobre Mim | Projetos |
|---|---|
| ![Sobre Mim](docs/screenshots/about-desktop.png) | ![Projetos](docs/screenshots/projects-desktop.png) |

| Experiências | Contato |
|---|---|
| ![Experiências](docs/screenshots/experiences-desktop.png) | ![Contato](docs/screenshots/contact-desktop.png) |

**Responsivo (mobile)**

| Sobre Mim | Menu aberto | Projetos | Contato |
|---|---|---|---|
| ![](docs/screenshots/about-mobile.png) | ![](docs/screenshots/menu-mobile.png) | ![](docs/screenshots/projects-mobile.png) | ![](docs/screenshots/contact-mobile.png) |

## Perfis de acesso

Funcionalidade da Sprint 02, especificada em [`docs/requisitos/perfis-de-acesso.md`](docs/requisitos/perfis-de-acesso.md) (requisitos, regras de negócio e casos de uso) **antes** da implementação. Versão em PDF: [`docs/requisitos/perfis-de-acesso.pdf`](docs/requisitos/perfis-de-acesso.pdf) (gerada com `npm run docs:pdf`).

Na primeira visita o visitante passa pela página **`/perfil`** e escolhe quem é. O site então adapta **o destaque** das informações — nunca o conteúdo:

| Perfil | Em evidência |
|---|---|
| 💼 Recrutador / Empresa | Experiências profissionais, habilidades de mercado, CTA de contato, LinkedIn primeiro, assunto "Oportunidade de vaga" |
| 🎓 Professor / Avaliador | Formação, projetos acadêmicos, fundamentos (C, Python, Git), GitHub, assunto "Avaliação do portfólio" |
| 💻 Desenvolvedor / Comunidade | Stack, projetos com código aberto, CTA para o GitHub, assunto "Colaboração em projeto" |
| 👤 Visitante geral | Layout padrão, sem marcações |

Como funciona:
- A escolha fica em `localStorage`; o cabeçalho mostra **"Vendo como: *Perfil*"** e leva de volta a `/perfil` para trocar.
- `?perfil=recrutador` (ou `professor`, `dev`, `geral`) na URL pré-seleciona o perfil — útil para enviar um link direcionado.
- A timeline de projetos continua sempre cronológica; os itens relevantes recebem a marcação **Destaque** e uma faixa "Destaques para você" com atalhos.
- Tudo é declarativo: os perfis ficam em [`src/data/profiles.ts`](src/data/profiles.ts) e os projetos/experiências carregam `tags` (`academico`, `profissional`, `freelance`, `open-source`, `evento`).

| Página de seleção (`/perfil`) | Sobre Mim — Recrutador |
|---|---|
| ![](docs/screenshots/profile-desktop.png) | ![](docs/screenshots/about-recrutador-desktop.png) |

| Projetos — Professor | Contato — Desenvolvedor |
|---|---|
| ![](docs/screenshots/projects-professor-desktop.png) | ![](docs/screenshots/contact-dev-desktop.png) |

| Projetos — Recrutador | Experiências — Recrutador |
|---|---|
| ![](docs/screenshots/projects-recrutador-desktop.png) | ![](docs/screenshots/experiences-recrutador-desktop.png) |

## Instalação e execução local

Pré-requisitos: **Node.js 20+** e **npm**.

```bash
# 1. Clonar o repositório
git clone https://github.com/lucassousaaguiar/portfolio.git
cd portfolio

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento (http://localhost:5173)
npm run dev
```

Outros comandos:

```bash
npm run build        # build de produção em dist/
npm run preview      # serve o build em http://localhost:4173
npm run lint         # lint com oxlint
npm run screenshots  # regenera docs/wireframes/*.png e docs/screenshots/*.png (requer `npm run preview` ativo)
npm run docs:pdf     # gera docs/requisitos/perfis-de-acesso.pdf a partir do markdown (com diagrama Mermaid)
```

## Decisões de design e arquitetura

- **React + Vite + TypeScript**: stack leve, rápida e amplamente usada; TypeScript dá segurança ao modelo de dados dos projetos/experiências.
- **Conteúdo separado do código** (`src/data/`): adicionar um projeto ou experiência é editar um objeto — a timeline ordena automaticamente pela data.
- **i18n própria via Context**: o requisito é apenas PT/EN, então um contexto simples com dicionário tipado evita uma dependência extra; a escolha fica salva no navegador.
- **CSS puro com design tokens**: tema escuro com acento turquesa (`--accent`), tipografia Inter + JetBrains Mono. Sem framework de CSS para manter o bundle pequeno e o controle total da identidade visual.
- **Sem back-end próprio**: o envio do formulário será feito por um serviço de e-mail (EmailJS/Formspree), o que permite hospedagem 100% estática e gratuita na Vercel.
