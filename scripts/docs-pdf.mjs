/**
 * Converte um documento Markdown de docs/ em PDF (A4), renderizando
 * diagramas Mermaid. Usa o Chrome/Edge instalado via puppeteer-core.
 *
 * Uso:
 *   npm run docs:pdf                       # docs/requisitos/perfis-de-acesso.md
 *   node scripts/docs-pdf.mjs docs/x.md    # outro arquivo
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'
import puppeteer from 'puppeteer-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const input = path.resolve(root, process.argv[2] ?? 'docs/requisitos/perfis-de-acesso.md')
const output = input.replace(/\.md$/i, '.pdf')

const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]
const executablePath = process.env.CHROME_PATH ?? candidates.find((p) => fs.existsSync(p))
if (!executablePath) {
  console.error('Chrome/Edge não encontrado. Defina CHROME_PATH.')
  process.exit(1)
}

// Blocos ```mermaid viram <pre class="mermaid"> para o mermaid.js renderizar.
const renderer = new marked.Renderer()
const baseCode = renderer.code.bind(renderer)
renderer.code = function (arg, lang, escaped) {
  const text = typeof arg === 'object' ? arg.text : arg
  const language = typeof arg === 'object' ? arg.lang : lang
  if (language === 'mermaid') return `<pre class="mermaid">${text}</pre>`
  return baseCode(arg, lang, escaped)
}
marked.use({ renderer, gfm: true })

const md = fs.readFileSync(input, 'utf8')
const title = (md.match(/^#\s+(.+)$/m)?.[1] ?? path.basename(input)).replace(/[*_`]/g, '')
const body = marked.parse(md)

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", Inter, Arial, Helvetica, sans-serif;
    font-size: 10.5pt; line-height: 1.5; color: #1f2937; margin: 0;
  }
  h1 { font-size: 20pt; margin: 0 0 6pt; color: #0f172a; letter-spacing: -0.01em; }
  h2 { font-size: 14pt; margin: 22pt 0 8pt; padding-bottom: 4pt; border-bottom: 2px solid #14b8a6; color: #0f172a; break-after: avoid; }
  h3 { font-size: 11.5pt; margin: 16pt 0 6pt; color: #0f766e; break-after: avoid; }
  p { margin: 0 0 8pt; }
  blockquote { margin: 0 0 12pt; padding: 6pt 12pt; border-left: 3px solid #14b8a6; background: #f0fdfa; color: #334155; font-size: 9.5pt; }
  blockquote p { margin: 0; }
  table { width: 100%; border-collapse: collapse; margin: 6pt 0 12pt; font-size: 9pt; break-inside: auto; }
  th, td { border: 1px solid #cbd5e1; padding: 4pt 6pt; vertical-align: top; text-align: left; }
  th { background: #e6fffa; color: #0f172a; font-weight: 600; }
  tr { break-inside: avoid; }
  tbody tr:nth-child(even) td { background: #f8fafc; }
  code { font-family: Consolas, "JetBrains Mono", monospace; font-size: 8.8pt; background: #f1f5f9; padding: 1px 4px; border-radius: 3px; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10pt; font-size: 8.5pt; overflow: hidden; white-space: pre-wrap; break-inside: avoid; }
  pre code { background: none; padding: 0; }
  pre.mermaid { background: #fff; border: 1px solid #e2e8f0; text-align: center; padding: 8pt; }
  pre.mermaid svg { max-width: 100%; height: auto; }
  img { max-width: 100%; border: 1px solid #e2e8f0; border-radius: 6px; break-inside: avoid; }
  ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
  li { margin-bottom: 2pt; }
  hr { border: 0; border-top: 1px solid #e2e8f0; margin: 14pt 0; }
  input[type=checkbox] { margin-right: 6pt; }
  strong { color: #0f172a; }
</style>
</head>
<body>
${body}
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'
  mermaid.initialize({ startOnLoad: false, theme: 'neutral', flowchart: { htmlLabels: false } })
  try {
    await mermaid.run()
  } catch (e) {
    document.body.dataset.error = String(e?.message ?? e?.str ?? JSON.stringify(e))
  }
  document.body.dataset.ready = '1'
</script>
</body>
</html>`

const tmp = path.join(path.dirname(input), `.${path.basename(input, '.md')}.tmp.html`)
fs.writeFileSync(tmp, html)

try {
  const browser = await puppeteer.launch({ executablePath, headless: true })
  const page = await browser.newPage()
  page.on('pageerror', (err) => console.warn('erro na página:', err.message))
  page.on('console', (msg) => msg.type() === 'error' && console.warn('console:', msg.text()))
  await page.goto('file:///' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle0' })
  await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 }).catch(() => {
    console.warn('aviso: mermaid não sinalizou conclusão; gerando mesmo assim')
  })
  await page.evaluate(() => document.fonts.ready)
  const mermaidError = await page.evaluate(() => document.body.dataset.error)
  if (mermaidError) console.warn('erro no mermaid:', mermaidError)
  if (process.env.DOCS_PDF_PREVIEW) {
    await page.setViewport({ width: 900, height: 1200 })
    const sel = process.env.DOCS_PDF_PREVIEW_SELECTOR
    const target = sel ? await page.$(sel) : null
    if (target) await target.screenshot({ path: process.env.DOCS_PDF_PREVIEW })
    else await page.screenshot({ path: process.env.DOCS_PDF_PREVIEW, fullPage: true })
  }
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="width:100%;font-size:7.5pt;color:#64748b;padding:0 16mm;display:flex;justify-content:space-between;">
        <span>${title}</span><span>Lucas Aguiar · Portfólio Profissional</span></div>`,
    footerTemplate: `<div style="width:100%;font-size:7.5pt;color:#64748b;padding:0 16mm;text-align:center;">
        Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>`,
    margin: { top: '18mm', right: '16mm', bottom: '20mm', left: '16mm' },
  })
  await browser.close()
  console.log('ok', path.relative(root, output))
} finally {
  fs.rmSync(tmp, { force: true })
}
