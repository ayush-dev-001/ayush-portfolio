import { profile, education } from '../data.js'
import Reveal, { SectionHeader } from './Reveal.jsx'
import { Cap } from './Icons.jsx'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="about">
        <div>
          <SectionHeader eyebrow="About me" title="Engineer who ships to production" />
          <Reveal className="about__text" variant="left">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>
        </div>
        <Reveal className="card edu" variant="right" delay={150}>
          <h3 className="card-title"><span className="icon-bubble icon-bubble--lavender icon-bubble--sm"><Cap /></span> Education</h3>
          <ol className="edu__list">
            {education.map((e, i) => (
              <li key={e.school} style={{ '--i': i }}>
                <div className="edu__top">
                  <strong>{e.school}</strong>
                  <span className="edu__score">{e.score}</span>
                </div>
                <p>{e.degree}</p>
                <p className="muted small">{e.place} · {e.period}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
