import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'aos/dist/aos.css'

const app = <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>
const root = document.getElementById('root')

// Production pages are prerendered (see scripts/prerender.mjs), so hydrate them.
// In `vite dev` the root is empty, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
