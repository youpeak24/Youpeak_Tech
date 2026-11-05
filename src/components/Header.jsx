import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react'
import Logo from './Logo'
import { companyDetails } from '../data/siteData'

const links = [['Home','/'],['About Us','/about'],['Services','/services'],['Projects','/projects'],['Why Us','/why-us'],['Contact','/contact']]

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-[0_8px_30px_-24px_rgba(40,60,110,.55)] backdrop-blur-xl">
    <div className="hidden border-b border-slate-800 bg-[#071624] px-4 py-1.5 text-xs text-slate-300 sm:block">
      <div className="container-site flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-cyan-300 tracking-wider text-[11px] sm:text-xs">
          {companyDetails.legalName}
        </span>
        <div className="flex items-center gap-5 text-xs">
          <a href={companyDetails.phoneTel} className="inline-flex items-center gap-1.5 font-medium transition hover:text-white">
            <Phone size={12} className="text-cyan-400" />
            <span>{companyDetails.phoneDisplay}</span>
          </a>
          <a href={companyDetails.emailMailto} className="inline-flex items-center gap-1.5 font-medium transition hover:text-white">
            <Mail size={12} className="text-cyan-400" />
            <span>{companyDetails.email}</span>
          </a>
        </div>
      </div>
    </div>
    <div className="container-site flex h-[72px] items-center justify-between">
      <Logo />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {links.map(([label,path]) => <NavLink key={path} to={path} className={({isActive}) => `relative py-2 text-sm font-bold transition hover:text-violet-600 ${isActive ? 'text-brand-700' : 'text-slate-600'}`}>{({isActive}) => <>{label}{isActive && <span className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500" />}</>}</NavLink>)}
      </nav>
      <div className="hidden lg:flex items-center gap-4">
        <a href={companyDetails.phoneTel} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-brand-500 hover:text-brand-700 transition">
          <Phone size={14} className="text-brand-600" />
          <span>{companyDetails.phoneDisplay}</span>
        </a>
        <Link className="btn-primary !min-h-10 !px-5 !py-2.5" to="/contact">Get in Touch <ArrowUpRight size={16}/></Link>
      </div>
      <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-ink lg:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
    </div>
    <div id="mobile-menu" className={`absolute inset-x-0 top-[72px] border-b border-slate-200 bg-white shadow-xl transition-all duration-300 lg:hidden ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`}>
      <nav className="container-site flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto py-5" aria-label="Mobile navigation">
        <div className="mb-2 rounded-xl bg-slate-900 p-3.5 text-xs text-slate-300">
          <p className="font-bold text-cyan-300 text-[11px] uppercase tracking-wider">{companyDetails.legalName}</p>
          <div className="mt-2.5 flex flex-col gap-2">
            <a href={companyDetails.phoneTel} className="flex items-center gap-2 text-white font-semibold">
              <Phone size={13} className="text-cyan-400" /> {companyDetails.phoneDisplay}
            </a>
            <a href={companyDetails.emailMailto} className="flex items-center gap-2 text-white font-semibold">
              <Mail size={13} className="text-cyan-400" /> {companyDetails.email}
            </a>
          </div>
        </div>
        {links.map(([label,path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({isActive}) => `rounded-xl px-4 py-3.5 text-base font-semibold ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}>{label}</NavLink>)}
        <Link className="btn-primary mt-3" to="/contact" onClick={() => setOpen(false)}>Get in Touch <ArrowUpRight size={17}/></Link>
      </nav>
    </div>
  </header>
}
