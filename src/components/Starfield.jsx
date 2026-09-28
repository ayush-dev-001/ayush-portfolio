import { useEffect, useRef } from 'react'

// Animated space background: twinkling stars in 3 parallax layers + shooting stars.
// Only runs while the dark theme is active.
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, stars = [], meteors = [], raf = 0, running = false, nextMeteor = 0

    const isDark = () => document.documentElement.dataset.theme === 'dark'

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 2600)
      const tints = ['255,255,255', '200,210,255', '255,236,214', '190,240,255']
      stars = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.6 ? 0 : Math.random() < 0.75 ? 1 : 2
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: [0.5, 0.9, 1.4][layer] * (0.7 + Math.random() * 0.6),
          layer,
          speed: [0.04, 0.09, 0.16][layer],
          base: 0.35 + Math.random() * 0.55,
          tw: 0.6 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
          tint: tints[Math.random() < 0.75 ? 0 : 1 + Math.floor(Math.random() * 3)],
        }
      })
    }

    const spawnMeteor = (t) => {
      const fromLeft = Math.random() < 0.5
      meteors.push({
        x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
        y: Math.random() * h * 0.4,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 5),
        vy: 3 + Math.random() * 2.5,
        life: 0,
        max: 55 + Math.random() * 30,
      })
      nextMeteor = t + 3500 + Math.random() * 6000
    }

    let offset = null
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const target = window.scrollY
      // ease toward the scroll position so the stars glide smoothly
      offset = offset == null || reduce ? target : offset + (target - offset) * 0.06
      const scroll = offset

      for (const s of stars) {
        const y = (((s.y - scroll * s.speed) % h) + h) % h
        const a = reduce ? s.base : s.base * (0.55 + 0.45 * Math.sin(t / 1000 * s.tw + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.tint},${a})`
        ctx.fill()
        if (s.layer === 2 && a > 0.6) {
          // soft glow on the brightest stars
          ctx.beginPath()
          ctx.arc(s.x, y, s.r * 3.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.tint},${a * 0.12})`
          ctx.fill()
        }
      }

      if (!reduce) {
        if (t > nextMeteor) spawnMeteor(t)
        meteors = meteors.filter((m) => m.life < m.max)
        for (const m of meteors) {
          m.life++
          m.x += m.vx
          m.y += m.vy
          const fade = Math.sin((m.life / m.max) * Math.PI)
          const tailX = m.x - m.vx * 12, tailY = m.y - m.vy * 12
          const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          g.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`)
          g.addColorStop(0.3, `rgba(180,200,255,${0.4 * fade})`)
          g.addColorStop(1, 'rgba(180,200,255,0)')
          ctx.strokeStyle = g
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
        }
      }
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const sync = () => {
      const should = isDark() && !document.hidden
      canvas.style.opacity = isDark() ? '1' : '0'
      if (should && !running) {
        running = true
        nextMeteor = performance.now() + 1500
        if (reduce) {
          draw(0)
          const onScroll = () => draw(0)
          window.addEventListener('scroll', onScroll, { passive: true })
          canvas._off = () => window.removeEventListener('scroll', onScroll)
        } else raf = requestAnimationFrame(loop)
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(raf)
        canvas._off?.()
      }
    }

    build()
    sync()
    const onResize = () => { build(); if (reduce && running) draw(0) }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', sync)
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      canvas._off?.()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', sync)
      mo.disconnect()
    }
  }, [])

  return (
    <div className="space" aria-hidden="true">
      <div className="space__nebula" />
      <canvas ref={ref} className="space__stars" />
    </div>
  )
}
