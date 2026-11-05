import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail, MapPin, Building } from 'lucide-react'
import Logo from './Logo'
import { companyDetails } from '../data/siteData'

const company = [['Home','/'],['About Us','/about'],['Services','/services'],['Previous Projects','/projects'],['Why Us','/why-us'],['Contact','/contact']]
const serviceLinks = ['Web Development','Software Development','Mobile App Development','UI/UX Design','E-Commerce','AI & Automation']

export default function Footer() {
  return <footer className="relative overflow-hidden bg-gradient-to-br from-[#091f32] via-[#102f4a] to-[#281f58] text-white">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-400"/>
    <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"/>
    
    <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1.2fr] lg:gap-12 lg:py-16">
      <div>
        <Logo variant="footer"/>
        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-cyan-300">
          {companyDetails.legalName}
        </p>
        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
          Youpeak Tech creates modern websites, applications, software and digital solutions for businesses.
        </p>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white transition">
          Start a conversation <ArrowRight size={16}/>
        </Link>
      </div>

      <FooterGroup title="Company">
        {company.map(([x,p]) => <Link key={p} to={p}>{x}</Link>)}
      </FooterGroup>

      <FooterGroup title="Services">
        {serviceLinks.map(x => <Link key={x} to="/services">{x}</Link>)}
      </FooterGroup>

      <FooterGroup title="Contact">
        <a href={companyDetails.phoneTel} className="flex items-center gap-2 text-slate-300 hover:text-white transition">
          <Phone size={15} className="text-cyan-400 shrink-0" />
          <span>{companyDetails.phoneDisplay}</span>
        </a>
        <a href={companyDetails.emailMailto} className="flex items-center gap-2 text-slate-300 hover:text-white transition">
          <Mail size={15} className="text-cyan-400 shrink-0" />
          <span>{companyDetails.email}</span>
        </a>
        <div className="flex items-start gap-2 text-slate-300">
          <MapPin size={15} className="text-cyan-400 shrink-0 mt-1" />
          <span className="text-xs leading-5">{companyDetails.address}</span>
        </div>
      </FooterGroup>
    </div>

    {/* Corporate Information Strip */}
    <div className="border-t border-white/10 bg-black/20 py-6">
      <div className="container-site">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300">
                <Building size={18}/>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white tracking-wide">{companyDetails.legalName}</p>
                <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-5">
                  <strong className="text-slate-200">(Address):</strong> {companyDetails.address}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 border border-white/10">
                <strong className="text-cyan-300 mr-1">(CIN):</strong> {companyDetails.cin}
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 border border-white/10">
                <strong className="text-cyan-300 mr-1">(PAN):</strong> {companyDetails.pan}
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 border border-white/10">
                <strong className="text-cyan-300 mr-1">(TAN):</strong> {companyDetails.tan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container-site flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {companyDetails.legalName}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
}

function FooterGroup({ title, children }) { return <div><h2 className="mb-4 text-sm font-bold">{title}</h2><div className="flex flex-col gap-3 text-sm text-slate-300 [&>*]:transition [&>a:hover]:text-white">{children}</div></div> }
