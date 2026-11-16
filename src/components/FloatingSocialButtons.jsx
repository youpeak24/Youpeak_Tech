import { socialLinks } from '../data/siteData'

const channelStyles = {
  Instagram: {
    bgClass: 'bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]',
    shadowClass: 'shadow-[0_10px_22px_-4px_rgba(221,42,123,0.48)] hover:shadow-[0_14px_28px_-2px_rgba(221,42,123,0.72)]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  YouTube: {
    bgClass: 'bg-gradient-to-tr from-[#cc0000] via-[#e60000] to-[#ff1a1a]',
    shadowClass: 'shadow-[0_10px_22px_-4px_rgba(230,0,0,0.48)] hover:shadow-[0_14px_28px_-2px_rgba(230,0,0,0.72)]',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  Facebook: {
    bgClass: 'bg-gradient-to-tr from-[#0866FF] to-[#1877F2]',
    shadowClass: 'shadow-[0_10px_22px_-4px_rgba(24,119,242,0.48)] hover:shadow-[0_14px_28px_-2px_rgba(24,119,242,0.72)]',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
}

export default function FloatingSocialButtons() {
  return (
    <aside
      aria-label="Social media quick links"
      className="fixed bottom-[5.5rem] right-[1.375rem] sm:bottom-[6.25rem] sm:right-[1.875rem] z-40 flex flex-col items-end gap-3 print:hidden"
    >
      {socialLinks.map((item) => {
        const style = channelStyles[item.name] || {}
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full text-white border border-white/25 ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 ${style.bgClass || ''} ${style.shadowClass || ''}`}
          >
            {/* Tooltip on desktop hover */}
            <span className="pointer-events-none absolute right-full mr-3 hidden items-center whitespace-nowrap rounded-xl border border-slate-700/60 bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 sm:inline-flex">
              {item.label}
              <span
                className="absolute left-full top-1/2 -ml-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900/95"
                aria-hidden="true"
              />
            </span>

            {/* Icon with playful hover rotation */}
            <span className="grid place-items-center transition-transform duration-300 group-hover:rotate-6">
              {style.icon}
            </span>
          </a>
        )
      })}
    </aside>
  )
}
