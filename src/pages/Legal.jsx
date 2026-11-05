import SEO from '../components/SEO'
import { PageHero } from '../components/UI'
import { companyDetails } from '../data/siteData'

const privacy = [
  ['Introduction','This Privacy Policy explains how information may be collected and used when you visit the Youpeak Tech website or send an enquiry.'],
  ['Information Collected','We may collect information you choose to provide and limited technical data generated when you use the website.'],
  ['Contact Form Information','When you submit the contact form, the information may include your name, email address, phone number, company name, selected service and project details.'],
  ['How Information Is Used','Information may be used to respond to enquiries, discuss requested services, improve the website and maintain appropriate business records.'],
  ['Cookies','This website may use essential cookies or similar technologies for basic operation. Any non-essential analytics or marketing cookies should be disclosed and managed appropriately if added.'],
  ['Third-Party Services','Service providers may be used for hosting, form processing or website analytics. Their handling of information is governed by their own terms and privacy practices.'],
  ['Data Security','Reasonable measures may be used to protect submitted information. However, no internet transmission or storage method can be guaranteed to be completely secure.'],
  ['External Links','The website may contain links to third-party websites. Youpeak Tech is not responsible for the content or privacy practices of those websites.'],
  ['User Rights',`Depending on applicable law, you may have rights regarding your personal information. You may contact ${companyDetails.legalName} to ask about information submitted through this website.`],
  ['Policy Updates','This policy may be updated when the website, services or applicable requirements change. The latest version will be published on this page.'],
  ['Corporate & Contact Information', `${companyDetails.legalName}\n\n(Address): ${companyDetails.address}\n\n(Email): ${companyDetails.email}\n(Phone): ${companyDetails.phoneDisplay}\n\n(CIN): ${companyDetails.cin}\n(PAN): ${companyDetails.pan}\n(TAN): ${companyDetails.tan}`]
]
const terms = [
  ['Website Usage',`You may use this website for lawful purposes and to learn about or enquire about ${companyDetails.brandName} services. Do not misuse, disrupt or attempt unauthorized access to the website.`],
  ['Services','Descriptions on this website provide general information. The scope, timeline, deliverables and other terms for any service will be agreed separately for each engagement.'],
  ['Intellectual Property',`Unless stated otherwise, the website content, visual design and brand elements belong to ${companyDetails.legalName} or their respective licensors and may not be copied or reused without permission.`],
  ['Project Enquiries','Submitting an enquiry does not create a service agreement or guarantee that a project will be accepted. Any engagement begins only after both parties agree to its terms.'],
  ['Client Responsibilities','Clients are responsible for providing accurate requirements, necessary content, timely feedback and permission to use any materials they supply.'],
  ['Third-Party Services','Some projects may depend on third-party platforms, hosting providers, software or payment services. Their own terms, availability and charges may apply.'],
  ['External Links',`Links to external websites are provided for convenience. ${companyDetails.brandName} does not control and is not responsible for external content or services.`],
  ['Website Availability','Reasonable efforts may be made to keep the website available, but uninterrupted or error-free access is not guaranteed.'],
  ['Limitations',`Information on this website is general and may change. To the extent permitted by applicable law, ${companyDetails.legalName} is not responsible for losses caused solely by reliance on general website content.`],
  ['Changes to Terms','These terms may be updated from time to time. The current version will be published on this page.'],
  ['Corporate & Contact Information', `${companyDetails.legalName}\n\n(Address): ${companyDetails.address}\n\n(Email): ${companyDetails.email}\n(Phone): ${companyDetails.phoneDisplay}\n\n(CIN): ${companyDetails.cin}\n(PAN): ${companyDetails.pan}\n(TAN): ${companyDetails.tan}`]
]

export function PrivacyPolicy(){ return <LegalPage type="Privacy Policy" intro={`A clear overview of how information is handled by ${companyDetails.legalName}.`} sections={privacy}/> }
export function Terms(){ return <LegalPage type="Terms & Conditions" intro={`General terms for using the ${companyDetails.brandName} website and making service enquiries with ${companyDetails.legalName}.`} sections={terms}/> }
function LegalPage({type,intro,sections}) { return <><SEO title={`${type} | Youpeak Tech`} description={`${type} for ${companyDetails.legalName}.`}/><PageHero eyebrow="Legal" title={type} text={intro}/><section className="section-space"><div className="container-site"><div className="mx-auto max-w-3xl"><div className="space-y-5">{sections.map(([title,text],i)=><section data-aos="fade-up" data-aos-delay={(i%3)*50} key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"><h2 className="gradient-text text-xl font-extrabold">{title}</h2><p className="mt-3 leading-7 text-muted whitespace-pre-line">{text}</p></section>)}</div></div></div></section></> }
