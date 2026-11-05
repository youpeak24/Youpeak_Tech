import { useState } from 'react'
import { Mail, MapPin, Phone, Clock3, MessageCircle, Send, CheckCircle2, AlertCircle, Building } from 'lucide-react'
import SEO from '../components/SEO'
import { PageHero, SectionTitle } from '../components/UI'
import { services, companyDetails } from '../data/siteData'

const initial = { name:'', email:'', phone:'', company:'', service:'', details:'' }

export default function Contact() {
  const [form,setForm] = useState(initial)
  const [errors,setErrors] = useState({})
  const [status,setStatus] = useState('idle')
  const update = e => setForm({...form,[e.target.name]:e.target.value})
  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone)) next.phone = 'Please enter a valid phone number.'
    if (!form.service) next.service = 'Please select a service.'
    if (!form.details.trim()) next.details = 'Please tell us about your project.'
    return next
  }
  const submit = async e => {
    e.preventDefault(); setStatus('idle')
    const next = validate(); setErrors(next)
    if (Object.keys(next).length) return
    setStatus('loading')
    try {
      await new Promise(resolve => window.setTimeout(resolve, 900))
      setStatus('success'); setForm(initial)
    } catch {
      setStatus('error')
    }
  }
  const contact = [
    { Icon: Phone, label: 'Phone', value: companyDetails.phoneDisplay, href: companyDetails.phoneTel },
    { Icon: Mail, label: 'Email', value: companyDetails.email, href: companyDetails.emailMailto },
    { Icon: MessageCircle, label: 'WhatsApp', value: companyDetails.whatsappNumber, href: companyDetails.whatsappUrl },
    { Icon: MapPin, label: 'Registered Address', value: companyDetails.address, href: null },
    { Icon: Clock3, label: 'Business Hours', value: companyDetails.hours, href: null }
  ]
  return <><SEO title="Contact Us | Youpeak Tech" description="Contact YOUPEAK TECHNOLOGIES PRIVATE LIMITED to discuss a website, application, software product or other digital solution."/><PageHero eyebrow="Contact Us" title="Let's Talk About Your Project" text="Have a website, application, software or digital idea? Share your requirements with Youpeak Tech and let's discuss the right solution."/>
    <section className="section-space"><div className="container-site grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      <div data-aos="fade-right"><SectionTitle eyebrow="Send an enquiry" title="Tell Us What You Need" text="Fill in the form below and share a few details about your project."/>
        <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" name="name" value={form.name} error={errors.name} onChange={update} required/>
          <Field label="Email Address" type="email" name="email" value={form.email} error={errors.email} onChange={update} required/>
          <Field label="Phone Number" type="tel" name="phone" value={form.phone} error={errors.phone} onChange={update} required/>
          <Field label="Company Name" name="company" value={form.company} onChange={update}/>
          <div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold" htmlFor="service">Service Required <span className="text-red-600">*</span></label><select id="service" name="service" value={form.service} onChange={update} aria-invalid={!!errors.service} aria-describedby={errors.service?'service-error':undefined} className={`min-h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 ${errors.service?'border-red-400':'border-slate-300'}`}><option value="">Select a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Other</option></select>{errors.service&&<ErrorText id="service-error">{errors.service}</ErrorText>}</div>
          <div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold" htmlFor="details">Project Details <span className="text-red-600">*</span></label><textarea id="details" name="details" rows="6" value={form.details} onChange={update} aria-invalid={!!errors.details} aria-describedby={errors.details?'details-error':undefined} placeholder="Tell us about your idea, requirements or goals..." className={`w-full resize-y rounded-xl border px-4 py-3 text-sm placeholder:text-slate-400 ${errors.details?'border-red-400':'border-slate-300'}`}/>{errors.details&&<ErrorText id="details-error">{errors.details}</ErrorText>}</div>
          <div className="sm:col-span-2"><button type="submit" disabled={status==='loading'} className="btn-primary w-full sm:w-auto disabled:cursor-wait disabled:opacity-70">{status==='loading'?'Sending...':<>Send Enquiry <Send size={16}/></>}</button>
          {status==='success'&&<div role="status" className="mt-4 flex max-w-xl gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"><CheckCircle2 className="shrink-0" size={20}/><p><strong>Form submitted successfully.</strong> Thank you for contacting us. We will get back to you shortly.</p></div>}
          {status==='error'&&<div role="alert" className="mt-4 flex max-w-xl gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle className="shrink-0" size={20}/><p>Your enquiry could not be sent. Please try again or reach out to us directly at {companyDetails.email}.</p></div>}</div>
        </form>
      </div>
      <aside data-aos="fade-left" data-aos-delay="120">
        <div className="color-shadow relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0c263c] via-brand-800 to-violet-600 p-7 text-white sm:p-9">
          <div className="dot-grid absolute inset-0 opacity-10"/>
          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">Contact details</p>
            <h2 className="mt-3 text-2xl font-black">We&apos;re Ready to Listen</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Reach out directly via phone or email, or drop by our office. Our official corporate entity details are provided below.
            </p>
            <div className="mt-7 space-y-3">
              {contact.map(({Icon,label,value,href},i)=><div key={label} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/10">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white ${i%3===0?'bg-cyan-500':i%3===1?'bg-violet-500':'bg-accent-500'}`}><Icon size={19}/></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-300">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-sm font-bold text-white hover:text-cyan-300 transition break-words">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-white break-words leading-relaxed">{value}</p>
                  )}
                </div>
              </div>)}
            </div>

            {/* Corporate Registration Info Box */}
            <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-300">
                <Building size={16} />
                <p className="text-xs font-bold uppercase tracking-wider">Official Registration Info</p>
              </div>
              <p className="mt-2 text-sm font-extrabold text-white">{companyDetails.legalName}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs">
                <div className="rounded-lg bg-white/10 p-2.5">
                  <span className="text-slate-400 block font-medium">CIN</span>
                  <span className="font-bold text-white font-mono tracking-wide">{companyDetails.cin}</span>
                </div>
                <div className="rounded-lg bg-white/10 p-2.5">
                  <span className="text-slate-400 block font-medium">PAN</span>
                  <span className="font-bold text-white font-mono tracking-wide">{companyDetails.pan}</span>
                </div>
                <div className="rounded-lg bg-white/10 p-2.5">
                  <span className="text-slate-400 block font-medium">TAN</span>
                  <span className="font-bold text-white font-mono tracking-wide">{companyDetails.tan}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div></section>
  </>
}

function Field({label,name,type='text',value,error,onChange,required}) { return <div><label className="mb-2 block text-sm font-semibold" htmlFor={name}>{label} {required&&<span className="text-red-600">*</span>}</label><input id={name} name={name} type={type} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error?`${name}-error`:undefined} className={`min-h-12 w-full rounded-xl border px-4 text-sm ${error?'border-red-400':'border-slate-300'}`}/>{error&&<ErrorText id={`${name}-error`}>{error}</ErrorText>}</div> }
function ErrorText({id,children}) { return <p id={id} className="mt-2 flex items-center gap-1.5 text-xs text-red-600"><AlertCircle size={13}/>{children}</p> }
