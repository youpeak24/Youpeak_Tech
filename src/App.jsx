import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AOSController from './components/AOSController'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import WhyUs from './pages/WhyUs'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import { PrivacyPolicy, Terms } from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return <div className="flex min-h-screen flex-col"><ScrollToTop/><AOSController/><Header/><main className="flex-1"><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/projects" element={<Projects/>}/><Route path="/previous-projects" element={<Projects/>}/><Route path="/why-us" element={<WhyUs/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<PrivacyPolicy/>}/><Route path="/terms" element={<Terms/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></div>
}
