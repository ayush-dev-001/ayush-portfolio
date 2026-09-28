import { stats } from '../data.js'
import Reveal from './Reveal.jsx'
import CountUp from './CountUp.jsx'
import { Code, Users, Cap, Check, Trophy, Rocket, Star } from './Icons.jsx'

const icons = { code: Code, users: Users, cap: Cap, check: Check, trophy: Trophy, rocket: Rocket }

export default function Highlights() {
  return (
    <section id="highlights" className="section highlights">
      <Reveal className="highlights__intro" variant="left">
        <span className="pill-tag">Highlights</span>
        <h2>A Path of Development<br />&amp; Achievements</h2>
        <p>A quick look at what I've shipped, tested and won so far.</p>
      </Reveal>
      <div className="highlights__grid">
        {stats.map((s, i) => {
          const Icon = icons[s.icon] || Star
          return (
            <Reveal key={s.label} className="stat-card" variant="zoom" delay={i * 90}>
              <div className="stat-card__top">
                <span className={`icon-bubble icon-bubble--${s.tone}`}><Icon /></span>
                <span className="stat-card__value"><CountUp value={s.value} /></span>
              </div>
              <p className="stat-card__label">{s.label}</p>
              {s.detail && <p className="stat-card__detail">{s.detail}</p>}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
