import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// An optional, playful UFO. Hidden until the visitor calls it with the button.
// It flies around the space background on its own (behind the page content),
// reacts to scrolling, watches and dodges the cursor, comments on each section,
// and beams things when clicked or when you pause.

const SECTION_LINES = {
  top: ['Greetings, earthling.', 'Nice landing page!'],
  highlights: ['940+ users? Impressive, human.', 'Numbers look good up here.'],
  about: ['Scanning human… CGPA 9.00 detected.', 'This one ships to production.'],
  experience: ['Two live products. Noted.', 'Recording work history…'],
  projects: ['Ooh, FlagFlow looks shiny.', 'Real-time sockets? We use those too.'],
  skills: ['Scanning skills… impressive.', 'Next.js? Even aliens use it.'],
  awards: ['1st place out of 1,000+!', 'Adding to the galactic records.'],
  contact: ['Hire this human!', 'Take me to your recruiter.'],
}
const CLICK_LINES = [
  'Beep boop! Resume uploaded to mothership.',
  'Abducting bugs… 0 found.',
  'Probing… 100% hireable.',
  'Hey! That tickles.',
  'Scanning… React skills: over 9000.',
  'We come in peace. And with job offers.',
]
const IDLE_LINES = ['Scanning…', 'Still here, human?', 'Collecting samples…']
const IDS = Object.keys(SECTION_LINES)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function UfoIcon(props) {
  return (
    <svg viewBox="0 0 64 40" width="26" height="18" aria-hidden="true" {...props}>
      <ellipse cx="32" cy="16" rx="12" ry="10" fill="currentColor" opacity=".45" />
      <ellipse cx="32" cy="24" rx="30" ry="9" fill="currentColor" />
      <circle cx="16" cy="24" r="2.4" fill="var(--ufo-icon-light, #fff)" />
      <circle cx="32" cy="26" r="2.4" fill="var(--ufo-icon-light, #fff)" />
      <circle cx="48" cy="24" r="2.4" fill="var(--ufo-icon-light, #fff)" />
    </svg>
  )
}

export default function Ufo() {
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [say, setSay] = useState(null)
  const [beam, setBeam] = useState(false)
  const [spin, setSpin] = useState(false)
  const [backLayer, setBackLayer] = useState(null)

  const shipRef = useRef(null)   // positioned wrapper (behind content)
  const craftRef = useRef(null)  // tilt + depth scale
  const bubbleRef = useRef(null) // speech bubble (above content)
  const pupils = useRef([])
  const sayTimer = useRef(0)
  const beamTimer = useRef(0)
  const actions = useRef({})

  // The ship is drawn in a layer between the starfield and the page content.
  useEffect(() => { setBackLayer(document.getElementById('ufo-back')) }, [])

  const speak = useCallback((text, ms = 3200) => {
    clearTimeout(sayTimer.current)
    setSay(text)
    sayTimer.current = setTimeout(() => setSay(null), ms)
  }, [])

  const doBeam = useCallback((ms = 2400) => {
    clearTimeout(beamTimer.current)
    setBeam(true)
    beamTimer.current = setTimeout(() => setBeam(false), ms)
  }, [])

  const poke = useCallback(() => {
    setSpin(true)
    setTimeout(() => setSpin(false), 900)
    doBeam(2600)
    speak(pick(CLICK_LINES), 3400)
    actions.current.pause?.(2600)
  }, [doBeam, speak])

  const toggle = () => {
    if (on) {
      setOn(false)
      setLeaving(true)
      setSay(null)
      setBeam(false)
      setTimeout(() => { setMounted(false); setLeaving(false) }, 900)
    } else {
      setOn(true)
      setMounted(true)
      setLeaving(false)
      setTimeout(() => speak(pick(SECTION_LINES.top), 3000), 1200)
    }
  }

  // Flight loop: wanders around the screen on its own, reacts to scroll and cursor.
  useEffect(() => {
    if (!mounted || !backLayer) return
    const ship = shipRef.current
    const craft = craftRef.current
    if (!ship || !craft) return
    const reduce = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let w = window.innerWidth, h = window.innerHeight
    const small = () => w < 640
    const rand = (a, b) => a + Math.random() * (b - a)

    // state
    const pos = { x: rand(0.3, 0.7) * w, y: -120, z: 0.9 }
    const vel = { x: 0, y: 0 }
    let target = null
    let holdUntil = 0
    let nextDash = performance.now() + rand(14000, 22000)
    let dashing = false
    let lastScroll = window.scrollY
    let mouse = { x: -9999, y: -9999, active: false }
    let lastUserScroll = performance.now()
    let lastIdleScan = 0
    let section = null
    let prevT = performance.now()
    let raf = 0

    const newTarget = () => {
      const mx = small() ? 0.12 : 0.08
      target = { x: rand(mx, 1 - mx) * w, y: rand(0.14, 0.78) * h, z: rand(0.55, 1.05) }
    }
    newTarget()
    actions.current.pause = (ms) => { holdUntil = performance.now() + ms }

    const onResize = () => { w = window.innerWidth; h = window.innerHeight }
    const onMouse = (e) => { mouse = { x: e.clientX, y: e.clientY, active: true } }
    const onLeave = () => { mouse.active = false }
    const onScroll = () => { lastUserScroll = performance.now() }
    // Clicking the ship: it sits behind the page, so detect clicks on its area.
    const onClick = (e) => {
      if (e.target.closest?.('a, button, input, textarea, select, label')) return
      const r = craft.getBoundingClientRect()
      const pad = 12
      if (e.clientX > r.left - pad && e.clientX < r.right + pad && e.clientY > r.top - pad && e.clientY < r.bottom + pad) poke()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', onClick)

    const tick = (t) => {
      const dt = Math.min(3, (t - prevT) / 16.67) // frames at 60fps
      prevT = t

      // scrolling pushes the ship (parallax)
      const s = window.scrollY
      const ds = s - lastScroll
      lastScroll = s
      vel.y -= ds * 0.06 * pos.z

      // occasional dash across the screen
      if (!reduce && !dashing && t > nextDash && t > holdUntil) {
        dashing = true
        const goRight = pos.x < w / 2
        target = { x: goRight ? w + 260 : -260, y: rand(0.15, 0.6) * h, z: rand(0.6, 0.9), dash: true }
      }

      // steering toward the target
      const maxSpeed = (dashing ? 16 : reduce ? 1.6 : small() ? 3.2 : 4.2) * (0.6 + pos.z * 0.5)
      const dx = target.x - pos.x, dy = target.y - pos.y
      const dist = Math.hypot(dx, dy)
      const holding = t < holdUntil
      if (!holding) {
        const slow = dashing ? 1 : Math.min(1, dist / 180) // arrive gently
        const desiredX = (dx / (dist || 1)) * maxSpeed * slow
        const desiredY = (dy / (dist || 1)) * maxSpeed * slow
        const steer = dashing ? 0.06 : 0.035
        vel.x += (desiredX - vel.x) * steer * dt
        vel.y += (desiredY - vel.y) * steer * dt
      } else {
        vel.x *= 0.92; vel.y *= 0.92
      }

      // shy: dodge the cursor
      if (mouse.active) {
        const mx = pos.x - mouse.x, my = pos.y - mouse.y
        const d = Math.hypot(mx, my)
        const R = 170 * pos.z
        if (d < R) {
          const k = (R - d) / R
          vel.x += (mx / (d || 1)) * k * 1.6 * dt
          vel.y += (my / (d || 1)) * k * 1.2 * dt
          if (k > 0.6 && Math.random() < 0.01) speak(pick(['Hey, personal space!', 'Too close, human!', 'Catch me if you can.']), 1800)
        }
      }

      pos.x += vel.x * dt
      pos.y += vel.y * dt
      pos.z += (target.z - pos.z) * 0.01 * dt

      // wrap after a dash, re-enter from the other side
      if (dashing && (pos.x > w + 200 || pos.x < -200)) {
        dashing = false
        pos.x = pos.x > w ? -180 : w + 180
        vel.x = 0
        nextDash = t + rand(16000, 26000)
        newTarget()
      }
      // keep it on screen vertically
      if (pos.y < 60) vel.y += 0.4 * dt
      if (pos.y > h - 80) vel.y -= 0.4 * dt

      // reached the waypoint: sometimes hover and scan, then pick a new one
      if (!dashing && dist < 30 && !holding) {
        if (Math.random() < 0.35) {
          holdUntil = t + rand(1500, 3000)
          if (Math.random() < 0.5) doBeam(holdUntil - t)
        }
        newTarget()
      }

      // draw
      const tilt = Math.max(-24, Math.min(24, vel.x * 3))
      const bob = reduce ? 0 : Math.sin(t / 420) * 5
      const scale = 0.55 + pos.z * 0.55
      ship.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${(pos.y + bob).toFixed(1)}px, 0)`
      craft.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(1)}deg)`
      craft.style.opacity = (0.55 + pos.z * 0.45).toFixed(2)
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${(pos.y + bob - 58 * scale).toFixed(1)}px, 0) translate(-50%, -100%)`
      }

      // eyes follow the cursor (or the direction of travel)
      const lookX = mouse.active ? mouse.x : pos.x + vel.x * 30
      const lookY = mouse.active ? mouse.y : pos.y + vel.y * 30 + 40
      const ang = Math.atan2(lookY - pos.y, lookX - pos.x)
      const ox = Math.cos(ang) * 2.2, oy = Math.sin(ang) * 1.8
      for (const p of pupils.current) if (p) p.setAttribute('transform', `translate(${ox.toFixed(2)} ${oy.toFixed(2)})`)

      // comment on the section in view
      let current = section
      for (const id of IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < h * 0.5) current = id
      }
      if (current !== section) {
        if (section !== null) speak(pick(SECTION_LINES[current] || IDLE_LINES))
        section = current
      }

      // when the visitor pauses, scan the page
      if (!reduce && t - lastUserScroll > 6000 && t - lastIdleScan > 12000) {
        lastIdleScan = t
        holdUntil = t + 2400
        doBeam(2400)
        speak(pick(IDLE_LINES), 2400)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [mounted, backLayer, speak, doBeam, poke])

  useEffect(() => () => { clearTimeout(sayTimer.current); clearTimeout(beamTimer.current) }, [])

  const ship = mounted && (
    <div ref={shipRef} className="ufo" aria-hidden="true">
      <div ref={craftRef} className="ufo__craft">
        <div className={`ufo__body ${leaving ? 'is-leaving' : 'is-arriving'}`}>
          <div className={`ufo__beam ${beam ? 'is-on' : ''}`} />
          <div className={`ufo__ship ${spin ? 'is-spinning' : ''}`}>
            <svg viewBox="0 0 140 90" width="140" height="90">
              <defs>
                <linearGradient id="ufoHull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e9ecf5" />
                  <stop offset=".55" stopColor="#a9b0c6" />
                  <stop offset="1" stopColor="#6d7591" />
                </linearGradient>
                <linearGradient id="ufoRim" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#5b5fa8" />
                  <stop offset=".5" stopColor="#8e86f0" />
                  <stop offset="1" stopColor="#5b5fa8" />
                </linearGradient>
                <radialGradient id="ufoGlass" cx=".4" cy=".35" r=".8">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
                  <stop offset=".45" stopColor="#bfe9ff" stopOpacity=".45" />
                  <stop offset="1" stopColor="#7cc4ff" stopOpacity=".25" />
                </radialGradient>
              </defs>
              <g className="ufo__alien">
                <ellipse cx="70" cy="36" rx="15" ry="16" fill="#7ee0a8" />
                <path d="M60 22 L55 12 M80 22 L85 12" stroke="#7ee0a8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="55" cy="11" r="2.8" fill="#b6f5cf" />
                <circle cx="85" cy="11" r="2.8" fill="#b6f5cf" />
                <ellipse cx="64" cy="34" rx="5" ry="6" fill="#fff" />
                <ellipse cx="76" cy="34" rx="5" ry="6" fill="#fff" />
                <g ref={(el) => (pupils.current[0] = el)}><circle cx="64" cy="35" r="2.6" fill="#10202a" /><circle cx="65" cy="33.8" r=".8" fill="#fff" /></g>
                <g ref={(el) => (pupils.current[1] = el)}><circle cx="76" cy="35" r="2.6" fill="#10202a" /><circle cx="77" cy="33.8" r=".8" fill="#fff" /></g>
                <path d="M66 44 Q70 47 74 44" stroke="#2f7d55" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </g>
              <path d="M42 50 Q42 14 70 14 Q98 14 98 50 Z" fill="url(#ufoGlass)" stroke="rgba(255,255,255,.7)" strokeWidth="1.2" />
              <path d="M52 28 Q58 19 68 18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity=".8" />
              <ellipse cx="70" cy="54" rx="64" ry="16" fill="url(#ufoHull)" />
              <ellipse cx="70" cy="50" rx="46" ry="8" fill="#ffffff" opacity=".35" />
              <ellipse cx="70" cy="60" rx="58" ry="9" fill="url(#ufoRim)" />
              {[18, 38, 58, 82, 102, 122].map((x, i) => (
                <circle key={x} className="ufo__light" style={{ animationDelay: `${i * 0.15}s` }} cx={x} cy={i === 0 || i === 5 ? 58 : 62} r="3.6" />
              ))}
              <ellipse cx="70" cy="70" rx="16" ry="4" fill="#9ff3c9" opacity=".7" className="ufo__underglow" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        className={`ufo-toggle ${on ? 'is-on' : ''}`}
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Send the UFO home' : 'Call the UFO'}
      >
        <UfoIcon />
        <span className="ufo-toggle__label">{on ? 'Send it home' : 'Call the UFO'}</span>
      </button>

      {/* speech bubble sits above the page so it's always readable */}
      {mounted && (
        <div ref={bubbleRef} className="ufo-bubble" aria-live="polite">
          {say && <div className="ufo__say" key={say}>{say}</div>}
        </div>
      )}

      {/* the ship itself flies behind the page content */}
      {backLayer && ship && createPortal(ship, backLayer)}
    </>
  )
}
