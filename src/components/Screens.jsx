import { useEffect, useRef } from 'react'
import ScrollUI from './ScrollUI.jsx'

// Renders each section as an equal-height "screen" with natural scrolling.
// On desktop, a screen's content gently shrinks and fades while it scrolls away (never locks scrolling).
export default function Screens({ screens }) {
  const refs = useRef([])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia?.('(min-width: 900px)')
    let frame = 0

    const clear = () => {
      for (const el of refs.current) {
        const inner = el?.firstElementChild
        if (inner) { inner.style.transform = ''; inner.style.opacity = '' }
      }
    }

    const update = () => {
      frame = 0
      if (reduce?.matches || !desktop?.matches) return clear()
      for (const el of refs.current) {
        const inner = el?.firstElementChild
        if (!inner) continue
        const r = el.getBoundingClientRect()
        const p = r.top < 0 ? Math.min(1, -r.top / r.height) : 0
        // Only transform while the screen is actually leaving, so text stays crisp at rest.
        if (p > 0.001 && r.bottom > 0) {
          inner.style.transform = `scale(${(1 - p * 0.06).toFixed(4)})`
          inner.style.opacity = (1 - p * 0.8).toFixed(3)
        } else if (inner.style.transform) {
          inner.style.transform = ''
          inner.style.opacity = ''
        }
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    desktop?.addEventListener('change', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      desktop?.removeEventListener('change', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <ScrollUI />
      {screens.map((s, i) => (
        <div key={s.id} ref={(el) => (refs.current[i] = el)} className={`screen screen--${s.id}`}>
          <div className="screen__inner">{s.content}</div>
        </div>
      ))}
    </>
  )
}
