/**
 * Single source of truth for all SEO output.
 *
 * Used by:
 *   - <SEO/> (client)           -> keeps <head> correct on in-app navigation
 *   - scripts/prerender.mjs     -> bakes <head> + page HTML into every route at build time
 *   - scripts/prerender.mjs     -> generates sitemap.xml and llms.txt
 *
 * This file must stay free of DOM / Node APIs so it runs in both places.
 */
import { companyDetails, services, projectsData } from '../data/siteData'

export const SITE = {
  url: 'https://www.youpeaktech.com', // canonical origin = Vercel's primary domain (apex 308-redirects to www). https, no trailing slash
  name: 'Youpeak Tech',
  legalName: companyDetails.legalName,
  alternateName: 'YouPeak Technologies',
  locale: 'en_IN',
  hreflang: 'en-IN',
  themeColor: '#0f4c81',
  logo: '/youpeak-technologies-logo.png',
  logoWidth: 1003,
  logoHeight: 552,
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Youpeak Tech - websites, mobile apps and custom software company in Bangalore',
  description:
    'Youpeak Tech (YOUPEAK TECHNOLOGIES PRIVATE LIMITED) is a Bangalore-based technology company building websites, web and mobile apps, custom software, e-commerce and automation for businesses.',
  region: 'IN-KA',
  placename: 'Bangalore',
}

const STREET = 'Unit 101, Oxford Towers, 139/88, Hal Old Airport, H.A.L II Stage, Bangalore North'

/**
 * Per-route SEO. `sources` = files whose last git change drives <lastmod> in the sitemap.
 * Keep titles <= ~60 chars and descriptions <= ~158 chars (checked at build time).
 */
export const PAGES = {
  '/': {
    title: 'Website, App & Software Company in Bangalore | Youpeak Tech',
    description:
      'Youpeak Tech is a Bangalore technology company building websites, web & mobile apps, custom software, e-commerce and automation for growing businesses.',
    breadcrumb: 'Home',
    schemaType: 'WebPage',
    changefreq: 'weekly',
    priority: 1.0,
    sources: ['src/pages/Home.jsx', 'src/data/siteData.js', 'src/data/projectsData.js'],
  },
  '/services': {
    title: 'Web, App & Software Development Services | Youpeak Tech',
    description:
      'Web development, custom software, mobile apps, UI/UX, e-commerce, AI automation, cloud, branding and technical services from Youpeak Tech, Bangalore.',
    breadcrumb: 'Services',
    schemaType: 'CollectionPage',
    changefreq: 'monthly',
    priority: 0.9,
    sources: ['src/pages/Services.jsx', 'src/data/siteData.js'],
  },
  '/projects': {
    title: "Portfolio: Websites & Web Apps We've Built | Youpeak Tech",
    description: `Browse ${projectsData.length} websites and web platforms delivered by Youpeak Tech for clients across education, solar, retail, telecom, wellness and more.`,
    breadcrumb: 'Projects',
    schemaType: 'CollectionPage',
    changefreq: 'monthly',
    priority: 0.8,
    sources: ['src/pages/Projects.jsx', 'src/data/projectsData.js'],
  },
  '/about': {
    title: 'About Youpeak Tech | Technology Solutions Company, Bangalore',
    description:
      'Meet Youpeak Tech, a Bangalore technology company creating reliable, modern and user-friendly digital products. Our mission, vision, values and company details.',
    breadcrumb: 'About Us',
    schemaType: 'AboutPage',
    changefreq: 'monthly',
    priority: 0.7,
    sources: ['src/pages/About.jsx', 'src/data/siteData.js'],
  },
  '/why-us': {
    title: 'Why Choose Youpeak Tech | Business-Focused Tech Partner',
    description:
      'Why businesses choose Youpeak Tech: we understand before building, keep solutions simple, communicate clearly and support you after launch.',
    breadcrumb: 'Why Us',
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: 0.6,
    sources: ['src/pages/WhyUs.jsx'],
  },
  '/contact': {
    title: 'Contact Youpeak Tech | Start Your Website or App Project',
    description:
      'Contact Youpeak Tech in Bangalore to discuss your website, app or software project. Call +91 9087615708, email or send an enquiry. Mon-Sat, 9 AM-6 PM IST.',
    breadcrumb: 'Contact',
    schemaType: 'ContactPage',
    changefreq: 'yearly',
    priority: 0.8,
    sources: ['src/pages/Contact.jsx', 'src/data/siteData.js'],
  },
  '/privacy': {
    title: 'Privacy Policy | Youpeak Tech',
    description:
      'How YOUPEAK TECHNOLOGIES PRIVATE LIMITED collects, uses and protects information submitted through the Youpeak Tech website and contact form.',
    breadcrumb: 'Privacy Policy',
    schemaType: 'WebPage',
    changefreq: 'yearly',
    priority: 0.3,
    sources: ['src/pages/Legal.jsx'],
  },
  '/terms': {
    title: 'Terms & Conditions | Youpeak Tech',
    description:
      'Terms for using the Youpeak Tech website and making service enquiries with YOUPEAK TECHNOLOGIES PRIVATE LIMITED.',
    breadcrumb: 'Terms & Conditions',
    schemaType: 'WebPage',
    changefreq: 'yearly',
    priority: 0.3,
    sources: ['src/pages/Legal.jsx'],
  },
}

/** Never indexed, never in the sitemap. Served as /404.html with a real 404 status. */
export const NOT_FOUND = {
  title: 'Page Not Found | Youpeak Tech',
  description: 'The page you are looking for does not exist or may have been moved.',
  noindex: true,
}

export const getPage = (path) => PAGES[path] || NOT_FOUND
export const indexablePaths = () => Object.keys(PAGES)
export const absUrl = (path = '/') => `${SITE.url}${path === '/' ? '/' : path}`

/* -------------------------------------------------------------------------- */
/* Structured data (JSON-LD)                                                  */
/* -------------------------------------------------------------------------- */

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

function organizationNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.alternateName,
    url: absUrl('/'),
    description: SITE.description,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE.url}/#logo`,
      url: absUrl(SITE.logo),
      contentUrl: absUrl(SITE.logo),
      width: SITE.logoWidth,
      height: SITE.logoHeight,
      caption: SITE.name,
    },
    image: absUrl(SITE.ogImage),
    email: companyDetails.email,
    telephone: '+919087615708',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET,
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560008',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+919087615708',
        email: companyDetails.email,
        areaServed: 'IN',
        availableLanguage: ['English'],
      },
    ],
    areaServed: { '@type': 'Country', name: 'India' },
    identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: companyDetails.cin },
    knowsAbout: services.map((s) => s.title),
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: absUrl('/'),
    name: SITE.name,
    alternateName: SITE.legalName,
    inLanguage: SITE.hreflang,
    publisher: { '@id': ORG_ID },
  }
}

function breadcrumbNode(path, page) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(path)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: absUrl(path) },
    ],
  }
}

function servicesListNode() {
  return {
    '@type': 'ItemList',
    '@id': `${absUrl('/services')}#services`,
    name: 'Youpeak Tech services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        serviceType: s.title,
        description: s.text,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'India' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${s.title} services`,
          itemListElement: s.items.map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
          })),
        },
      },
    })),
  }
}

function projectsListNode() {
  return {
    '@type': 'ItemList',
    '@id': `${absUrl('/projects')}#projects`,
    name: 'Websites and platforms built by Youpeak Tech',
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.desc,
        url: p.link,
        image: absUrl(p.image),
        dateCreated: p.year,
        keywords: p.tech.join(', '),
        creator: { '@id': ORG_ID },
      },
    })),
  }
}

export function buildJsonLd(path) {
  const page = PAGES[path]
  if (!page) return null // 404: no structured data

  const webPage = {
    '@type': page.schemaType,
    '@id': `${absUrl(path)}#webpage`,
    url: absUrl(path),
    name: page.title,
    description: page.description,
    inLanguage: SITE.hreflang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absUrl(SITE.ogImage),
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
    },
  }
  if (path !== '/') webPage.breadcrumb = { '@id': `${absUrl(path)}#breadcrumb` }
  if (path === '/services') webPage.mainEntity = { '@id': `${absUrl('/services')}#services` }
  if (path === '/projects') webPage.mainEntity = { '@id': `${absUrl('/projects')}#projects` }
  if (path === '/contact' || path === '/about') webPage.mainEntity = { '@id': ORG_ID }

  const graph = [organizationNode(), websiteNode(), webPage]
  if (path !== '/') graph.push(breadcrumbNode(path, page))
  if (path === '/services') graph.push(servicesListNode())
  if (path === '/projects') graph.push(projectsListNode())

  return { '@context': 'https://schema.org', '@graph': graph }
}

/* -------------------------------------------------------------------------- */
/* <head> tags                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Returns { title, tags } where every tag is { key, tag, attrs, text? }.
 * `key` lets the client update/remove exactly the tags this module owns.
 */
export function buildHead(path) {
  const page = getPage(path)
  const noindex = Boolean(page.noindex)
  const url = absUrl(path)
  const image = absUrl(SITE.ogImage)
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const meta = (name, content) => ({ key: `meta:${name}`, tag: 'meta', attrs: { name, content } })
  const prop = (property, content) => ({ key: `meta:${property}`, tag: 'meta', attrs: { property, content } })

  const tags = [
    meta('description', page.description),
    meta('robots', robots),
    meta('author', SITE.legalName),
    meta('application-name', SITE.name),
    meta('apple-mobile-web-app-title', SITE.name),
    meta('geo.region', SITE.region),
    meta('geo.placename', SITE.placename),
  ]

  if (!noindex) {
    tags.push(
      { key: 'link:canonical', tag: 'link', attrs: { rel: 'canonical', href: url } },
      { key: 'link:hreflang', tag: 'link', attrs: { rel: 'alternate', hreflang: SITE.hreflang, href: url } },
      { key: 'link:x-default', tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
    )
  }

  tags.push(
    prop('og:type', 'website'),
    prop('og:site_name', SITE.name),
    prop('og:locale', SITE.locale),
    prop('og:title', page.title),
    prop('og:description', page.description),
    prop('og:url', url),
    prop('og:image', image),
    prop('og:image:secure_url', image),
    prop('og:image:type', 'image/png'),
    prop('og:image:width', String(SITE.ogImageWidth)),
    prop('og:image:height', String(SITE.ogImageHeight)),
    prop('og:image:alt', SITE.ogImageAlt),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', page.title),
    meta('twitter:description', page.description),
    meta('twitter:image', image),
    meta('twitter:image:alt', SITE.ogImageAlt),
  )

  const jsonLd = buildJsonLd(path)
  if (jsonLd) {
    tags.push({ key: 'jsonld', tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(jsonLd) })
  }

  return { title: page.title, tags }
}

const escAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialises buildHead() output to HTML for the prerender step. */
export function renderHeadHtml(head) {
  const out = [`<title data-seo-key="title">${escText(head.title)}</title>`]
  for (const { key, tag, attrs, text } of head.tags) {
    const a = Object.entries(attrs)
      .map(([k, v]) => `${k}="${escAttr(v)}"`)
      .join(' ')
    if (tag === 'script') {
      // "<" is escaped so page content can never terminate the script element early.
      out.push(`<script ${a} data-seo-key="${key}">${text.replace(/</g, '\\u003c')}</script>`)
    } else {
      out.push(`<${tag} ${a} data-seo-key="${key}" />`)
    }
  }
  return out.join('\n    ')
}

/* -------------------------------------------------------------------------- */
/* sitemap.xml / llms.txt                                                     */
/* -------------------------------------------------------------------------- */

const xmlEsc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

/** lastmods: { [path]: 'YYYY-MM-DD' } */
export function buildSitemap(lastmods = {}) {
  const urls = indexablePaths().map((path) => {
    const page = PAGES[path]
    let images = ''
    if (path === '/projects') {
      images = projectsData
        .map(
          (p) =>
            `\n    <image:image>\n      <image:loc>${xmlEsc(absUrl(p.image))}</image:loc>\n      <image:title>${xmlEsc(p.title)}</image:title>\n      <image:caption>${xmlEsc(p.desc)}</image:caption>\n    </image:image>`,
        )
        .join('')
    }
    if (path === '/') {
      images = `\n    <image:image>\n      <image:loc>${xmlEsc(absUrl(SITE.ogImage))}</image:loc>\n      <image:title>${xmlEsc(SITE.name)}</image:title>\n    </image:image>`
    }
    const lastmod = lastmods[path] ? `\n    <lastmod>${lastmods[path]}</lastmod>` : ''
    return `  <url>\n    <loc>${xmlEsc(absUrl(path))}</loc>${lastmod}\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>${images}\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`
}

/** https://llmstxt.org - a concise, link-rich summary for AI search / answer engines. */
export function buildLlmsTxt() {
  const link = (path, label, note) => `- [${label}](${absUrl(path)})${note ? `: ${note}` : ''}`
  return `# ${SITE.name}

> ${SITE.description}

${SITE.legalName} is based at ${companyDetails.address}. Business hours: ${companyDetails.hours}. Phone: ${companyDetails.phoneDisplay}. Email: ${companyDetails.email}.

## Pages
${link('/', 'Home', 'overview of Youpeak Tech')}
${link('/services', 'Services', services.map((s) => s.title).join(', '))}
${link('/projects', 'Projects', `${projectsData.length} websites and platforms delivered for clients`)}
${link('/about', 'About', 'mission, vision, values and registered company details')}
${link('/why-us', 'Why Us', 'our working principles and approach')}
${link('/contact', 'Contact', 'phone, email, WhatsApp and enquiry form')}

## Services
${services.map((s) => `- ${s.title}: ${s.text}`).join('\n')}

## Selected projects
${projectsData.map((p) => `- [${p.title}](${p.link}) (${p.year}): ${p.desc}`).join('\n')}

## Legal
${link('/privacy', 'Privacy Policy')}
${link('/terms', 'Terms & Conditions')}
`
}
