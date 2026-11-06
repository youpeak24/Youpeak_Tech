/**
 * Post-build step (see "build" in package.json):
 *   1. Renders every route to static HTML with the real React app (SSR build in dist-ssr/).
 *   2. Injects per-page <head> SEO tags + JSON-LD into dist/<route>/index.html.
 *   3. Writes dist/404.html (noindex), sitemap.xml and llms.txt (robots.txt lives in public/).
 *   4. Fails the build on common SEO mistakes (duplicate/oversized titles, missing <h1>, bad JSON-LD).
 *
 * Crawlers that do not run JavaScript (Bing, social scrapers, AI crawlers) now see real content,
 * and the browser hydrates the same markup.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const MAX_TITLE = 65
const MAX_DESC = 160
const HEAD_MARK = '<!--seo-head-->'
const APP_MARK = '<!--app-html-->'

const fail = (msg) => {
  console.error(`\n✖ prerender: ${msg}\n`)
  process.exit(1)
}

/* ---- load the SSR bundle ------------------------------------------------ */
const entryFile = ['entry-server.js', 'entry-server.mjs'].map((f) => path.join(ssrDir, f)).find(existsSync)
if (!entryFile) fail('SSR bundle not found in dist-ssr/. Run `npm run build` (not `vite build` alone).')
const ssr = await import(pathToFileURL(entryFile).href)
const { render, PAGES, NOT_FOUND, SITE, buildHead, renderHeadHtml, buildSitemap, buildLlmsTxt } = ssr

const template = readFileSync(path.join(dist, 'index.html'), 'utf8').replace(/<!--\s*Per-page <title>[\s\S]*?-->\s*/, '')
if (!template.includes(HEAD_MARK)) fail(`index.html is missing the ${HEAD_MARK} placeholder.`)
if (!template.includes(APP_MARK)) fail(`index.html is missing the ${APP_MARK} placeholder.`)

/* ---- helpers ------------------------------------------------------------ */
const outFile = (route) => (route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html'))

const today = () => new Date().toISOString().slice(0, 10)

function lastModified(sources) {
  const files = sources.filter((f) => existsSync(path.join(root, f)))
  try {
    // Uncommitted edits to the page's sources => it is "modified today".
    const dirty = execFileSync('git', ['status', '--porcelain', '--', ...files], { cwd: root, encoding: 'utf8' }).trim()
    if (dirty) return today()
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, encoding: 'utf8' }).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d
  } catch {
    /* not a git checkout - fall through */
  }
  const newest = Math.max(...files.map((f) => statSync(path.join(root, f)).mtimeMs))
  return new Date(newest).toISOString().slice(0, 10)
}

function write(file, content) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
}

/* ---- render pages ------------------------------------------------------- */
const problems = []
const seenTitles = new Map()
const seenDescs = new Map()

function check(route, page, html) {
  const where = `${route}`
  if (page.title.length > MAX_TITLE) problems.push(`${where}: title is ${page.title.length} chars (max ${MAX_TITLE})`)
  if (page.description.length > MAX_DESC) problems.push(`${where}: description is ${page.description.length} chars (max ${MAX_DESC})`)
  if (page.description.length < 70) problems.push(`${where}: description is only ${page.description.length} chars (min 70)`)
  if (seenTitles.has(page.title)) problems.push(`${where}: duplicate title (also ${seenTitles.get(page.title)})`)
  if (seenDescs.has(page.description)) problems.push(`${where}: duplicate description (also ${seenDescs.get(page.description)})`)
  seenTitles.set(page.title, route)
  seenDescs.set(page.description, route)

  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) problems.push(`${where}: expected exactly one <h1>, found ${h1}`)
  if (/<img\b(?![^>]*\balt=)[^>]*>/.test(html)) problems.push(`${where}: <img> without alt attribute`)
  if (html.length < 800) problems.push(`${where}: rendered body looks empty`)
}

function assemble(route) {
  const head = buildHead(route)
  const body = render(route)
  const html = template.replace(HEAD_MARK, () => renderHeadHtml(head)).replace(APP_MARK, () => body)

  for (const t of head.tags.filter((x) => x.tag === 'script')) {
    try {
      JSON.parse(t.text)
    } catch (e) {
      problems.push(`${route}: invalid JSON-LD (${e.message})`)
    }
  }
  return { html, body, head }
}

const routes = Object.keys(PAGES)
for (const route of routes) {
  const { html, body } = assemble(route)
  check(route, PAGES[route], body)
  write(outFile(route), html)
}

// 404 page: real 404 status is provided by the host (Vercel serves dist/404.html for unknown URLs).
{
  const { html, body } = assemble('/404')
  if ((body.match(/<h1[\s>]/g) || []).length !== 1) problems.push('/404: expected exactly one <h1>')
  if (!html.includes('noindex')) problems.push('/404: missing noindex')
  write(path.join(dist, '404.html'), html)
}

/* ---- sitemap / robots / llms -------------------------------------------- */
const lastmods = Object.fromEntries(routes.map((r) => [r, lastModified(PAGES[r].sources)]))
write(path.join(dist, 'sitemap.xml'), buildSitemap(lastmods))
const robots = readFileSync(path.join(dist, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`)) problems.push('robots.txt must reference the sitemap URL')
write(path.join(dist, 'llms.txt'), buildLlmsTxt())

/* ---- report ------------------------------------------------------------- */
rmSync(ssrDir, { recursive: true, force: true })

if (problems.length) fail(`SEO checks failed:\n  - ${problems.join('\n  - ')}`)

const files = readdirSync(dist)
console.log(`\n✔ prerendered ${routes.length} routes + 404 for ${SITE.url}`)
for (const r of routes) console.log(`   ${r.padEnd(10)} ${String(PAGES[r].title.length).padStart(2)}c title  ${String(PAGES[r].description.length).padStart(3)}c desc  lastmod ${lastmods[r]}`)
console.log(`✔ sitemap.xml + llms.txt written, robots.txt verified (${files.length} entries in dist/)\n`)
