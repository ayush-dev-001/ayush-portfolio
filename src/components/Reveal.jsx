import { useEffect, useRef, useState } from 'react'

// Animates children in every time they scroll into view.
// variant: 'up' | 'left' | 'right' | 'zoom' | 'blur'
export default function Reveal({ children, delay = 0, variant = 'up', once = false, as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setShown(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!entry.isIntersecting) {
          setShown(false) // fully out of view, so it replays on the next visit
        }
      },
      { threshold: [0, 0.12] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? 'is-shown' : ''} ${className}`}
      style={{ '--delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHeader({ eyebrow, title, text, center = false }) {
  return (
    <Reveal className={`section-header ${center ? 'section-header--center' : ''}`}>
      <span className="pill-tag sh-eyebrow">{eyebrow}</span>
      <h2 className="sh-title"><span>{title}</span></h2>
      {text && <p className="sh-text">{text}</p>}
    </Reveal>
  )
}
