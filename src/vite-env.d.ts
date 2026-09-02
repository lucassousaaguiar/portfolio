/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Chave de acesso do Web3Forms (formulário de contato). Definida em .env.local */
  readonly VITE_WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
