import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

export function SectionTitle({ eyebrow, title, text, align='left' }) {
  return <div data-aos="fade-up" className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center [&_.eyebrow]:justify-center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2 className="heading gradient-text">{title}</h2>{text && <p className="body-copy mt-5">{text}</p>}</div>
}

export function PageHero({ eyebrow, title, text }) {
  return <section className="section-wash relative overflow-hidden border-b border-slate-200 py-16 sm:py-20 lg:py-24"><div className="dot-grid absolute inset-y-0 right-0 w-1/3 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"/><div className="absolute right-[-8rem] top-[-10rem] h-80 w-80 rounded-full bg-violet-100/70 blur-3xl"/><div className="absolute bottom-[-7rem] left-[12%] h-48 w-48 rounded-full bg-cyan-100 blur-3xl"/><div className="container-site relative" data-aos="fade-up"><p className="eyebrow">{eyebrow}</p><h1 className="gradient-text max-w-3xl text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl lg:text-[3.65rem]">{title}</h1><p className="body-copy mt-6 max-w-2xl">{text}</p></div></section>
}

const toneMap = {
  blue: 'from-brand-600 to-cyan-500 shadow-blue-200/60',
  violet: 'from-violet-600 to-fuchsia-500 shadow-violet-200/60',
  green: 'from-accent-600 to-emerald-400 shadow-emerald-200/60',
  coral: 'from-coral-600 to-orange-400 shadow-rose-200/60',
  amber: 'from-amberx-600 to-yellow-400 shadow-amber-200/60',
  cyan: 'from-cyan-600 to-sky-400 shadow-cyan-200/60',
}

export function IconCard({ icon: Icon, title, text, tone='blue', delay=0 }) {
  return <article data-aos="fade-up" data-aos-delay={delay} className="card group relative overflow-hidden p-6 sm:p-7"><span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${toneMap[tone]}`}/><span className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition duration-300 group-hover:rotate-3 group-hover:scale-110 ${toneMap[tone]}`}><Icon size={22}/></span><h3 className="text-lg font-extrabold tracking-tight text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p><span className={`absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-[.07] transition group-hover:scale-125 group-hover:opacity-[.12] ${toneMap[tone]}`}/></article>
}

export function CTA() {
  return <section className="section-space"><div className="container-site"><div data-aos="zoom-in-up" className="color-shadow relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-violet-600 to-cyan-600 px-6 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:px-16"><div className="dot-grid absolute inset-0 opacity-10"/><div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[40px] border-white/10"/><div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"/><div className="relative max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-cyan-100">Start a conversation</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Have an Idea? Let&apos;s Build It Together.</h2><p className="mt-4 leading-7 text-blue-50">Tell us what you&apos;re planning and let&apos;s discuss how Youpeak Tech can help turn your idea into a practical digital solution.</p></div><div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:ml-8 lg:mt-0 lg:flex-col"><Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5 hover:shadow-lg">Start Your Project <ArrowRight size={17}/></Link><Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Contact Us</Link></div></div></div></section>
}

export function CheckList({ items }) { return <ul className="mt-6 grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600"><Check size={14}/></span>{item}</li>)}</ul> }
