import { achievements, certificates } from '../data.js'
import Reveal, { SectionHeader } from './Reveal.jsx'
import { Trophy, Badge } from './Icons.jsx'

export default function Awards() {
  return (
    <section id="awards" className="section">
      <SectionHeader eyebrow="Recognition" title="Achievements & certifications" />
      <div className="awards">
        <Reveal className="card" variant="left">
          <h3 className="card-title"><span className="icon-bubble icon-bubble--peach icon-bubble--sm"><Trophy /></span> Achievements</h3>
          <ul className="list">
            {achievements.map((a, i) => (
              <li key={a.title} style={{ '--i': i }}>
                <div>
                  <strong>{a.title}</strong>
                  <p className="muted small">{a.detail}</p>
                </div>
                <span className="date-pill">{a.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="card" variant="right" delay={150}>
          <h3 className="card-title"><span className="icon-bubble icon-bubble--mint icon-bubble--sm"><Badge /></span> Certifications</h3>
          <ul className="list">
            {certificates.map((c, i) => (
              <li key={c.title} style={{ '--i': i }}>
                <div>
                  <strong>{c.title}</strong>
                  <p className="muted small">{c.issuer}</p>
                </div>
                <span className="date-pill">{c.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
