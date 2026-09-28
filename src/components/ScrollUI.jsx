import { useEffect, useState } from 'react'

export const SECTIONS = [
  ['top', 'Home'],
  ['highlights', 'Highlights'],
  ['about', 'About'],
  ['experience', 'Work'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['awards', 'Awards'],
  ['contact', 'Contact'],
]

// Progress bar, side section dots and back-to-top button.
export default function ScrollUI() {
  const [active, setActive] = useState('top')
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setShowTop(window.scrollY > window.innerHeight * 0.8)
      let current = 'top'
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = id
      }
      if (max - window.scrollY < 4) current = SECTIONS[SECTIONS.length - 1][0]
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const current = active
  const prog = progress
  const top = showTop

  return (
    <div className="scroll-ui">
      <div className="progress" style={{ transform: `scaleX(${prog})` }} aria-hidden="true" />

      <nav className="dots" aria-label="Section navigation">
        {SECTIONS.map(([id, label], i) => (
          <a key={id} href={`#${id}`} className={current === id ? 'is-active' : ''} aria-label={label} aria-current={current === id ? 'true' : undefined}>
            <span className="dots__label">{label}</span>
          </a>
        ))}
      </nav>

      <a href="#top" className={`to-top ${top ? 'is-visible' : ''}`} aria-label="Back to top" tabIndex={top ? 0 : -1}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>
    </div>
  )
}
