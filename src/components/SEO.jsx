import { useEffect } from 'react'
import { applyHead } from '../seo/applyHead'

/**
 * Declares which route's SEO entry (see src/seo/seo.js) a page uses.
 * At build time the same data is baked into the static HTML <head>;
 * this effect keeps the head correct when users navigate client-side.
 */
export default function SEO({ path }) {
  useEffect(() => {
    applyHead(path)
  }, [path])
  return null
}
