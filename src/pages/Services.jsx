import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { PageHero, CheckList } from '../components/UI'
import { services } from '../data/siteData'

export default function Services() {
  const accentStyles = [
    ['from-brand-600 to-cyan-500','from-brand-50 to-cyan-50','text-brand-700'],
    ['from-violet-600 to-fuchsia-500','from-violet-50 to-fuchsia-50','text-violet-600'],
    ['from-accent-600 to-emerald-400','from-accent-50 to-emerald-50','text-accent-600'],
    ['from-coral-600 to-orange-400','from-coral-50 to-orange-50','text-coral-600'],
    ['from-amberx-600 to-yellow-400','from-amberx-50 to-yellow-50','text-amberx-600'],
    ['from-cyan-600 to-sky-400','from-cyan-50 to-sky-50','text-cyan-600'],
  ]
  return <><SEO title="Services | Youpeak Tech" description="Explore web, software, mobile app, design, e-commerce, automation, cloud, branding and technical services from Youpeak Tech."/><PageHero eyebrow="Our Services" title="Digital Services for Your Business" text="From websites and mobile applications to custom software and automation, Youpeak Tech provides digital solutions built around real business requirements."/>
    <section className="section-space"><div className="container-site space-y-6">{services.map(({title,text,items,icon:Icon},i)=>{ const accent=accentStyles[i%accentStyles.length]; return <article data-aos={i%2?'fade-left':'fade-right'} key={title} className="card grid overflow-hidden lg:grid-cols-[.78fr_1.22fr]"><div className={`relative bg-gradient-to-br p-7 sm:p-9 ${accent[1]}`}><span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent[0]}`}/><span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${accent[0]}`}><Icon/></span><h2 className="gradient-text mt-6 text-2xl font-extrabold tracking-tight">{title}</h2><p className="mt-4 leading-7 text-muted">{text}</p></div><div className="p-7 sm:p-9"><p className={`text-xs font-extrabold uppercase tracking-[.16em] ${accent[2]}`}>Can include</p><CheckList items={items}/></div></article>})}</div></section>
    <section className="pb-20 sm:pb-24"><div className="container-site"><div data-aos="zoom-in-up" className="color-shadow relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-800 via-violet-600 to-cyan-600 px-7 py-12 text-center text-white sm:px-12"><div className="dot-grid absolute inset-0 opacity-10"/><div className="relative"><h2 className="text-3xl font-black">Need a Solution for Your Business?</h2><p className="mx-auto mt-4 max-w-xl text-blue-50">Tell us what you need. We&apos;ll help you explore a clear, practical way forward.</p><Link to="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-xl">Let&apos;s Talk <ArrowRight size={17}/></Link></div></div></div></section>
  </>
}
