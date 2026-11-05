import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'

export default function AOSController() {
  const { pathname } = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 720,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => AOS.refreshHard())
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
