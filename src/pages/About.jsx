import { BadgeCheck, Eye, Gem, Lightbulb, Scale, RefreshCw, Layers3, Building2, MapPin, Mail, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { PageHero, SectionTitle, IconCard, CTA, CheckList } from '../components/UI'
import { services, companyDetails } from '../data/siteData'

export default function About() {
  const tones = ['blue','violet','green','coral','amber','cyan']
  const values = [
    {title:'Quality',icon:BadgeCheck,text:'Focus on building dependable and well-designed solutions.'},{title:'Simplicity',icon:Layers3,text:'Keep technology easy to understand and easy to use.'},{title:'Transparency',icon:Eye,text:'Maintain clear communication throughout the project.'},{title:'Innovation',icon:Lightbulb,text:'Use modern ideas to solve practical business problems.'},{title:'Responsibility',icon:Scale,text:'Treat every project carefully and professionally.'},{title:'Improvement',icon:RefreshCw,text:'Continuously improve products, processes and solutions.'}
  ]
  return <><SEO title="About Us | Youpeak Tech" description="Learn how YOUPEAK TECHNOLOGIES PRIVATE LIMITED creates reliable, modern and user-friendly digital products for businesses."/><PageHero eyebrow="About Youpeak Tech" title="Building Technology for Better Business" text="Youpeak Tech is a technology solutions company focused on creating reliable, modern and user-friendly digital products for businesses."/>
    <section className="section-space"><div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20"><div><SectionTitle eyebrow="Who we are" title="Practical Technology, Thoughtfully Built"/><div data-aos="fade-up" data-aos-delay="100"><p className="body-copy mt-5">We combine thoughtful design and practical development to create solutions that help businesses improve their digital presence and operations.</p><p className="mt-4 leading-7 text-muted">Our approach is simple — understand the requirement, plan carefully, build properly and create a solution that is easy to use and maintain.</p></div></div><div data-aos="fade-left" className="rounded-[2rem] border border-violet-100 bg-gradient-to-br from-brand-50 via-white to-violet-50 p-7 shadow-soft sm:p-9"><h2 className="gradient-text text-xl font-extrabold">What We Do</h2><p className="mt-3 text-sm leading-6 text-muted">Youpeak Tech works with businesses looking to build websites, mobile applications, software and other digital solutions.</p><CheckList items={services.map(s=>s.title)}/></div></div></section>
    <section className="section-wash section-space"><div className="container-site grid gap-6 md:grid-cols-2"><article data-aos="fade-right" className="card relative overflow-hidden p-8 sm:p-10"><span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-violet-500"/><span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-lg"><Gem/></span><p className="eyebrow mt-7">Our Mission</p><h2 className="gradient-text text-2xl font-extrabold">Make technology genuinely useful</h2><p className="mt-4 leading-7 text-muted">To provide practical and reliable digital solutions that help businesses use technology effectively.</p></article><article data-aos="fade-left" data-aos-delay="100" className="card relative overflow-hidden p-8 sm:p-10"><span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 to-cyan-500"/><span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-accent-600 to-cyan-500 text-white shadow-lg"><Eye/></span><p className="eyebrow mt-7">Our Vision</p><h2 className="gradient-text text-2xl font-extrabold">Support meaningful growth</h2><p className="mt-4 leading-7 text-muted">To help businesses grow through simple, modern and meaningful technology solutions.</p></article></div></section>
    <section className="section-space"><div className="container-site"><SectionTitle eyebrow="Our Values" title="Principles Behind Our Work" align="center"/><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{values.map((v,i)=><IconCard key={v.title} {...v} tone={tones[i]} delay={(i%3)*80}/>)}</div></div></section>
    
    {/* Registered Corporate Entity Information */}
    <section className="section-wash section-space">
      <div className="container-site">
        <div data-aos="fade-up" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
          <SectionTitle eyebrow="Corporate Entity" title="Official Company Details" text="Youpeak Tech operates as an incorporated enterprise with registered details and tax identifications:" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Legal Entity Name</p>
              <p className="mt-2 text-base font-extrabold text-ink">{companyDetails.legalName}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Corporate Identification (CIN)</p>
              <p className="mt-2 font-mono text-base font-extrabold text-brand-700">{companyDetails.cin}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Tax Identifiers</p>
              <p className="mt-2 font-mono text-sm font-extrabold text-ink">
                PAN: <span className="text-brand-600">{companyDetails.pan}</span>
                <span className="mx-2 text-slate-300">|</span>
                TAN: <span className="text-brand-600">{companyDetails.tan}</span>
              </p>
            </div>
            <div className="sm:col-span-2 lg:col-span-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Registered Office Address</p>
              <p className="mt-2 text-sm leading-6 font-bold text-slate-700">{companyDetails.address}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Official Communications</p>
              <p className="mt-2 text-sm font-bold text-slate-700">
                Phone: <a href={companyDetails.phoneTel} className="text-brand-600 hover:underline">{companyDetails.phoneDisplay}</a>
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">
                Email: <a href={companyDetails.emailMailto} className="text-brand-600 hover:underline">{companyDetails.email}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <CTA/></>
}
