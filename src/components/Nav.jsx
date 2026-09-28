import { useRef, useState } from 'react'
import { Menu, Close, Arrow } from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { profile } from '../data.js'

const links = [
  ['top', 'Home'],
  ['about', 'About'],
  ['experience', 'Work'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null) // { left, width } of the hovered link
  const listRef = useRef(null)

  const moveTo = (e) => {
    const list = listRef.current
    if (!list) return
    const a = e.currentTarget.getBoundingClientRect()
    const l = list.getBoundingClientRect()
    // measured in screen pixels; convert to the list's own scale
    const scale = l.width / list.offsetWidth || 1
    setHover({ left: (a.left - l.left) / scale, width: a.width / scale })
  }

  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className={`nav__pill ${open ? 'is-open' : ''}`}>
        <a href="#top" className="nav__brand" onClick={close} aria-label={`${profile.name}, home`}>
          <span className="nav__logo" aria-hidden="true">{initials}</span>
          <span className="nav__name">
            {profile.name.split(' ')[0]}<span className="nav__dot">.</span>
          </span>
        </a>

        <nav className="nav__links" ref={listRef} onMouseLeave={() => setHover(null)}>
          <span
            className={`nav__hover ${hover ? 'is-visible' : ''}`}
            style={hover ? { transform: `translateX(${hover.left}px)`, width: hover.width } : undefined}
            aria-hidden="true"
          />
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close} onMouseEnter={moveTo} onFocus={moveTo}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <ThemeToggle />
          <a href="#contact" className="nav__cta" onClick={close}>
            <span className="nav__status" aria-hidden="true" />
            Let's chat
            <span className="nav__cta-arrow" aria-hidden="true"><Arrow width={14} height={14} /></span>
          </a>
          <button className="nav__toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
