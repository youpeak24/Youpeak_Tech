import { useState } from 'react'
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react'
import SEO from '../components/SEO'
import { PageHero, CTA } from '../components/UI'
import { projectsData, statusColors, companyDetails } from '../data/siteData'

export default function Projects() {
  const [selectedYear, setSelectedYear] = useState('All')

  const years = ['All', ...new Set(projectsData.map(p => p.year))].sort((a, b) => {
    if (a === 'All') return -1
    if (b === 'All') return 1
    return b.localeCompare(a)
  })

  const filteredProjects = selectedYear === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.year === selectedYear)

  return (
    <>
      <SEO 
        title={`Previous Projects & Portfolio | ${companyDetails.legalName}`} 
        description="Explore our portfolio of previous projects across web applications, corporate websites, e-commerce stores, and software solutions built by Youpeak Tech."
      />

      <PageHero 
        eyebrow="Our Previous Projects" 
        title="Proven Work We Have Built" 
        text="A showcase of real-world websites, web applications, and digital solutions delivered for our clients across various industries."
      />

      <section className="section-space">
        <div className="container-site">
          {/* Year filter bar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6" data-aos="fade-up">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Layers size={17} />
              </span>
              <p className="text-sm font-bold text-slate-700">
                Showing <span className="text-brand-700 font-extrabold">{filteredProjects.length}</span> Delivered Projects
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {years.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition duration-200 ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-brand-700 to-violet-600 text-white shadow-md shadow-brand-500/20'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-slate-50'
                  }`}
                >
                  {yr === 'All' ? 'All Years' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.title + project.year} project={project} delay={(idx % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export function ProjectCard({ project, delay = 0 }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0c263c] to-brand-800 text-white">
            <span className="font-extrabold tracking-wide text-cyan-200 text-lg">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        
        {/* Badges */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-extrabold text-cyan-300 shadow backdrop-blur-md">
            {project.year}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur-md ${statusColors[project.status] || 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-black tracking-tight text-ink transition group-hover:text-brand-700">
          {project.title}
        </h3>
        
        <p className="mt-2.5 flex-1 text-xs leading-6 text-muted line-clamp-3">
          {project.desc}
        </p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map(tech => (
            <span
              key={tech}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-700 transition hover:text-violet-600"
            >
              <span>Visit Live Website</span>
              <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

