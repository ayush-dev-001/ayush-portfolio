import { Children, useCallback, useEffect, useRef, useState } from 'react'

// Horizontal scroller: native scroll + snap, arrow buttons, drag with mouse, progress bar.
export default function HScroll({ children, label }) {
  const track = useRef(null)
  const [state, setState] = useState({ start: true, end: true, progress: 0, overflow: false, page: 1, pages: 1 })
  const count = Children.count(children)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const first = el.firstElementChild
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth
    const perView = Math.max(1, Math.round(el.clientWidth / step))
    const pages = Math.max(1, count - perView + 1)
    const page = Math.min(pages, Math.round(el.scrollLeft / step) + 1)
    setState({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      progress: max > 0 ? el.scrollLeft / max : 0,
      overflow: max > 2,
      page,
      pages,
    })
  }, [count])

  useEffect(() => {
    measure()
    const el = track.current
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const scrollByCard = (dir) => {
    const el = track.current
    const first = el.firstElementChild
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Drag to scroll with a mouse (touch/trackpad already scroll natively).
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      track.current.classList.add('is-dragging')
      track.current.setPointerCapture?.(e.pointerId)
    }
    if (d.moved) track.current.scrollLeft = d.left - dx
  }
  const justDragged = useRef(false)
  const endDrag = () => {
    const d = drag.current
    drag.current = null
    if (!d?.moved) return
    const el = track.current
    justDragged.current = true
    setTimeout(() => (justDragged.current = false), 0)
    // glide to the nearest card, then turn snapping back on
    const first = el.firstElementChild
    const step = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth
    const target = Math.round(el.scrollLeft / step) * step
    el.scrollTo({ left: target, behavior: 'smooth' })
    setTimeout(() => el.classList.remove('is-dragging'), 450)
  }
  const onClickCapture = (e) => {
    if (justDragged.current) { e.preventDefault(); e.stopPropagation() }
  }

  const cls = ['hscroll', state.overflow ? 'has-overflow' : '', state.start ? 'at-start' : '', state.end ? 'at-end' : ''].join(' ')

  return (
    <div className={cls}>
      <div
        ref={track}
        className="hscroll__track"
        tabIndex={0}
        role="region"
        aria-label={label}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {Children.map(children, (child) => <div className="hscroll__item">{child}</div>)}
      </div>

      <div className="hscroll__controls">
        <div className="hscroll__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${state.overflow ? Math.max(0.12, state.progress) : 1})` }} />
        </div>
        {state.overflow && (
          <span className="hscroll__count" aria-hidden="true">
            {String(state.page).padStart(2, '0')} / {String(state.pages).padStart(2, '0')}
          </span>
        )}
        <button className="hscroll__btn" onClick={() => scrollByCard(-1)} disabled={!state.overflow || state.start} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="hscroll__btn" onClick={() => scrollByCard(1)} disabled={!state.overflow || state.end} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  )
}
