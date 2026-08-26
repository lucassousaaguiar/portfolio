/**
 * Gera as imagens usadas no README:
 *   - docs/wireframes/*.png  (a partir de docs/wireframes/src/*.html)
 *   - docs/screenshots/*.png (a partir do site rodando em PREVIEW_URL)
 *
 * Uso:
 *   npm run build && npm run preview   (em outro terminal)
 *   npm run screenshots
 *
 * Usa o Chrome/Edge já instalado (puppeteer-core não baixa navegador).
 * Defina CHROME_PATH se o navegador estiver em outro caminho e
 * PREVIEW_URL se o site não estiver em http://127.0.0.1:4173.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173'

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

const DESKTOP = { width: 1280, height: 800 }
const MOBILE = { width: 390, height: 844, isMobile: true, hasTouch: true }

// Wireframes (docs/wireframes/src/<nome>.html)
const wireframes = ['about', 'projects', 'experiences', 'contact', 'profile']

// Protótipo: [nome, rota, mobile?]. `?perfil=` fixa o perfil de acesso da captura (RF12).
const shots = [
  ['profile', '/perfil', true],
  ['about', '/?perfil=geral', true],
  ['projects', '/projetos?perfil=geral', true],
  ['experiences', '/experiencias?perfil=geral', true],
  ['contact', '/contato?perfil=geral', true],
  ['about-recrutador', '/?perfil=recrutador', false],
  ['projects-recrutador', '/projetos?perfil=recrutador', false],
  ['about-professor', '/?perfil=professor', false],
  ['projects-professor', '/projetos?perfil=professor', false],
  ['experiences-recrutador', '/experiencias?perfil=recrutador', false],
  ['contact-dev', '/contato?perfil=dev', false],
]

const browser = await puppeteer.launch({ executablePath, headless: true })

async function shoot(url, out, viewport, before) {
  const page = await browser.newPage()
  await page.setViewport({ deviceScaleFactor: 1, ...viewport })
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  if (before) await before(page)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  await page.screenshot({ path: out, fullPage: true })
  await page.close()
  console.log('ok', path.relative(root, out))
}

// 1) Wireframes (arquivos locais)
for (const name of wireframes) {
  const file = path.join(root, 'docs', 'wireframes', 'src', `${name}.html`)
  const url = 'file:///' + file.replace(/\\/g, '/')
  await shoot(url, path.join(root, 'docs', 'wireframes', `${name}-desktop.png`), DESKTOP)
  await shoot(url, path.join(root, 'docs', 'wireframes', `${name}-mobile.png`), MOBILE)
}

// 2) Protótipo (servidor de preview)
for (const [name, route, mobile] of shots) {
  await shoot(base + route, path.join(root, 'docs', 'screenshots', `${name}-desktop.png`), DESKTOP)
  if (mobile) await shoot(base + route, path.join(root, 'docs', 'screenshots', `${name}-mobile.png`), MOBILE)
}

// 3) Menu mobile aberto
await shoot(base + '/?perfil=geral', path.join(root, 'docs', 'screenshots', 'menu-mobile.png'), MOBILE, async (page) => {
  await page.click('.menu-btn')
  await new Promise((r) => setTimeout(r, 400))
})

await browser.close()
