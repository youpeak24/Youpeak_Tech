import { Link } from 'react-router-dom'
import { ArrowRight, Search, PencilRuler, HeartHandshake, Building2, Boxes, Workflow, ShoppingCart } from 'lucide-react'
import SEO from '../components/SEO'
import HeroVisual from '../components/HeroVisual'
import { SectionTitle, IconCard, CTA } from '../components/UI'
import { services, advantages, projectsData } from '../data/siteData'
import { ProjectCard } from './Projects'

export default function Home() {
  const tones = ['blue','violet','green','coral','amber','cyan']
  return <>
    <SEO title="YOUPEAK TECHNOLOGIES PRIVATE LIMITED | Web, App & Software Solutions" description="YOUPEAK TECHNOLOGIES PRIVATE LIMITED creates modern websites, applications, software and digital solutions designed to help businesses work smarter and grow with confidence."/>
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-violet-50/70 py-16 sm:py-20 lg:py-24">
      <div className="dot-grid absolute inset-y-0 left-0 w-1/3 opacity-40 [mask-image:linear-gradient(to_right,black,transparent)]"/>
      <div className="absolute left-[-10rem] top-[-8rem] h-80 w-80 rounded-full bg-cyan-100/80 blur-3xl"/>
      <div className="absolute bottom-[-12rem] right-[18%] h-80 w-80 rounded-full bg-violet-100/70 blur-3xl"/>
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
        <div data-aos="fade-right"><p className="eyebrow">Smart digital solutions</p><h1 className="max-w-2xl text-4xl font-black leading-[1.06] tracking-[-.055em] text-ink sm:text-5xl lg:text-[3.85rem]">Technology That Helps Your <span className="gradient-text-bright">Business Grow</span></h1><p className="body-copy mt-6 max-w-xl">Youpeak Tech creates modern websites, applications, software and digital solutions designed to help businesses work smarter and grow with confidence.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link className="btn-primary" to="/contact">Get Started <ArrowRight size={17}/></Link><Link className="btn-secondary" to="/services">Explore Services</Link></div><div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500"><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-accent-500"/>Business-focused</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-violet-500"/>Responsive by design</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-cyan-500"/>Clear communication</span></div></div>
        <div data-aos="fade-left" data-aos-delay="120"><HeroVisual/></div>
      </div>
    </section>

    <section className="section-space"><div className="container-site grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><SectionTitle eyebrow="About Youpeak Tech" title="Building Better Digital Experiences" text="Youpeak Tech helps businesses turn ideas into practical digital solutions. We focus on creating modern, reliable and user-friendly websites, applications and software that support real business needs."/><div className="grid gap-4 sm:grid-cols-3">{[
      [Search,'Understand','We understand your business requirements before starting the project.'],[PencilRuler,'Create','We design and develop solutions focused on simplicity, usability and quality.'],[HeartHandshake,'Support','We help maintain and improve digital solutions as your business grows.']
    ].map(([Icon,title,text],i)=><div key={title} data-aos="fade-up" data-aos-delay={i*90} className={`rounded-2xl border p-6 ${i===0?'border-blue-100 bg-brand-50/70':i===1?'border-violet-100 bg-violet-50/70':'border-emerald-100 bg-accent-50/70'}`}><span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${i===0?'bg-brand-600':i===1?'bg-violet-600':'bg-accent-600'}`}><Icon size={20}/></span><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}</div><div className="lg:col-start-1" data-aos="fade-up"><Link to="/about" className="btn-secondary">About Us <ArrowRight size={16}/></Link></div></div></section>

    <section className="section-wash section-space"><div className="container-site"><SectionTitle eyebrow="Our Services" title="Digital Solutions for Modern Businesses" align="center"/><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((s,i)=><IconCard key={s.title} {...s} tone={tones[i%tones.length]} delay={(i%3)*80}/>)}</div><div className="mt-10 text-center" data-aos="fade-up"><Link to="/services" className="btn-primary">View All Services <ArrowRight size={17}/></Link></div></div></section>

    <section className="section-space"><div className="container-site"><SectionTitle eyebrow="Why Youpeak Tech" title="Technology Built Around Your Business" align="center"/><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{advantages.map((a,i)=><IconCard key={a.title} {...a} tone={tones[(i+2)%tones.length]} delay={(i%3)*80}/>)}</div></div></section>

    {/* Previous Projects Section */}
    <section className="section-wash section-space">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle 
            eyebrow="Our Portfolio" 
            title="Previous Projects" 
            text="Explore verified websites, digital platforms and applications delivered for businesses across sectors."
          />
          <div data-aos="fade-up">
            <Link to="/projects" className="btn-secondary !min-h-11 !px-5 !py-2.5">
              View All Projects <ArrowRight size={16}/>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 6).map((project, idx) => (
            <ProjectCard key={project.title + project.year} project={project} delay={(idx % 3) * 80} />
          ))}
        </div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <Link to="/projects" className="btn-primary">
            Explore All 15+ Previous Projects <ArrowRight size={17}/>
          </Link>
        </div>
      </div>
    </section>

    <section className="section-space relative overflow-hidden bg-gradient-to-br from-[#0c263c] via-[#123d61] to-[#322469] text-white"><div className="dot-grid absolute inset-0 opacity-[.08]"/><div className="container-site relative"><div className="max-w-xl" data-aos="fade-up"><p className="mb-3 text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">How we work</p><h2 className="text-3xl font-black tracking-[-.045em] sm:text-4xl">Simple Process. <span className="text-cyan-300">Better Results.</span></h2></div><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{[
      ['01','Understand','Understand the business, project requirements and goals.'],['02','Plan & Design','Plan the project structure and create a clean user experience.'],['03','Develop','Build the solution carefully with responsive and maintainable development.'],['04','Launch','Test the project properly and prepare it for launch.']
    ].map(([num,title,text],i)=><article key={num} data-aos="fade-up" data-aos-delay={i*90} className="bg-[#0c263c]/90 p-7 transition hover:bg-white/10 lg:min-h-56"><span className={`inline-flex rounded-full px-3 py-1 text-sm font-extrabold ${i===0?'bg-cyan-400/15 text-cyan-300':i===1?'bg-violet-400/15 text-violet-200':i===2?'bg-green-400/15 text-green-300':'bg-amber-400/15 text-amber-300'}`}>{num}</span><h3 className="mt-9 text-lg font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{text}</p></article>)}</div></div></section>

    <section className="section-wash section-space"><div className="container-site"><SectionTitle eyebrow="Business Solutions" title="Solutions Designed for Different Business Needs" align="center"/><div className="mt-10 grid gap-5 sm:grid-cols-2">{[
      [Building2,'Build Your Online Presence','Professional websites and digital branding for businesses that want to establish themselves online.'],[Boxes,'Build a Digital Product','Web applications and mobile apps for businesses launching new digital services.'],[Workflow,'Improve Business Operations','Custom software and automation solutions for simplifying everyday business operations.'],[ShoppingCart,'Grow Your Digital Business','E-commerce and scalable digital solutions designed to support business growth.']
    ].map(([icon,title,text],i)=><IconCard key={title} icon={icon} title={title} text={text} tone={tones[(i+1)%tones.length]} delay={(i%2)*90}/>)}</div></div></section>
    <CTA/>
  </>
}
