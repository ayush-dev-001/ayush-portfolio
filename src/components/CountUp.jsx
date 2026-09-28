import { useEffect, useRef, useState } from 'react'

// Animates a value like "140+" or "9.00" from 0 when it scrolls into view.
export default function CountUp({ value, duration = 1400 }) {
  const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/)
  const ref = useRef(null)
  const [display, setDisplay] = useState(match ? match[1] + (0).toFixed((match[2].split('.')[1] || '').length) + match[3] : value)

  useEffect(() => {
    if (!match) return
    const [, pre, num, post] = match
    const target = parseFloat(num)
    const decimals = (num.split('.')[1] || '').length
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    let raf = 0

    const run = () => {
      if (reduce) return setDisplay(value)
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(pre + (target * eased).toFixed(decimals) + post)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    if (!el || !('IntersectionObserver' in window)) { setDisplay(value); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>
}
