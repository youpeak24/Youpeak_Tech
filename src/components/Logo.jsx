import { Link } from 'react-router-dom'

// The display derivative is trimmed to the visible artwork (512x282 px)
// preserving the mountain symbol, navy lettering, and gold facets with transparent background.
const sizes = {
  header: {
    width: 512,
    height: 282,
    imgClassName: 'h-10 w-auto sm:h-12 object-contain',
    linkClassName: 'inline-flex shrink-0 items-center transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
  },
  footer: {
    width: 512,
    height: 282,
    imgClassName: 'h-14 w-auto sm:h-16 object-contain',
    linkClassName: 'inline-flex shrink-0 items-center transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
  },
}

export default function Logo({ variant = 'header' }) {
  const { width, height, imgClassName, linkClassName } = sizes[variant] || sizes.header
  return (
    <Link to="/" aria-label="Youpeak Tech home" className={linkClassName}>
      <img
        src="/youpeak-technologies-logo-512.png"
        srcSet="/youpeak-technologies-logo-512.png 512w, /youpeak-technologies-logo.png 1003w"
        sizes={variant === 'footer' ? '(min-width: 640px) 130px, 116px' : '(min-width: 640px) 96px, 80px'}
        alt="Youpeak Tech logo"
        width={width}
        height={height}
        decoding="async"
        className={imgClassName}
      />
    </Link>
  )
}

