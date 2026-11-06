import { buildHead } from './seo'

/**
 * Syncs document.head with the SEO tags for `path` on client-side navigation.
 * Tags rendered by the prerender step carry data-seo-key, so they are updated
 * in place (no duplicates); tags that no longer apply (e.g. canonical on the 404 page) are removed.
 */
export function applyHead(path) {
  const { title, tags } = buildHead(path)
  document.title = title

  const existing = new Map()
  document.head.querySelectorAll('[data-seo-key]').forEach((el) => existing.set(el.getAttribute('data-seo-key'), el))

  const wanted = new Set(['title'])
  for (const { key, tag, attrs, text } of tags) {
    wanted.add(key)
    let el = existing.get(key)
    if (!el) {
      el = document.createElement(tag)
      el.setAttribute('data-seo-key', key)
      document.head.appendChild(el)
    }
    for (const [name, value] of Object.entries(attrs)) {
      if (el.getAttribute(name) !== value) el.setAttribute(name, value)
    }
    if (text !== undefined && el.textContent !== text) el.textContent = text
  }

  for (const [key, el] of existing) {
    if (!wanted.has(key)) el.remove()
  }
}
