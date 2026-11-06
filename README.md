# Youpeak Tech Website

A responsive company website built with React, Vite, Tailwind CSS, React Router and Lucide icons.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

Before launch, replace the clearly marked contact placeholders and connect the contact form to a secure backend or form service.

## SEO

All SEO lives in **`src/seo/seo.js`** (domain, per-page titles/descriptions, JSON-LD, sitemap priorities). Edit it there and
everything else follows.

`npm run build` does three things: builds the client, builds a server bundle, then runs `scripts/prerender.mjs`, which:

- pre-renders every route to static HTML (`dist/<route>/index.html`) with its own title, description, canonical, hreflang,
  Open Graph / Twitter tags and JSON-LD, so crawlers that don't run JavaScript still see the content (the browser then hydrates it);
- writes `dist/404.html` (`noindex`; Vercel serves it with a real 404 status), `dist/sitemap.xml` and `dist/llms.txt`;
- **fails the build** on duplicate or over-long titles/descriptions, a missing/duplicate `<h1>`, an `<img>` without `alt`, or invalid JSON-LD.

`public/robots.txt` and `public/site.webmanifest` are static files. `public/og-image.png` (1200x630) is the default share image.

**Adding a page:** add the route in `src/App.jsx`, add an entry to `PAGES` in `src/seo/seo.js`, and render `<SEO path="/your-path" />` in the page.
**Changing the domain:** update `SITE.url` in `src/seo/seo.js` and the `Sitemap:` line in `public/robots.txt`. The canonical host is `https://www.youpeaktech.com` (Vercel's primary domain; the apex redirects to it).

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel, or run `vercel` from this directory.
2. Keep Vercel's detected settings: build command `npm run build` and output directory `dist`.
3. `vercel.json` handles clean URLs, a 301 from `/previous-projects` to `/projects`, security headers and asset caching.
   There is intentionally **no catch-all rewrite**: unknown URLs return the real `404.html`.

After deploying, submit `https://www.youpeaktech.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

No environment variables are currently required. Add them only when connecting the contact form to a backend or third-party form provider.
