import { skills } from '../data.js'
import Reveal, { SectionHeader } from './Reveal.jsx'

const tones = ['peach', 'lavender', 'mint', 'peach', 'lavender', 'mint']

export default function Skills() {
  return (
    <section id="skills" className="section section--tint">
      <div className="section__inner">
        <SectionHeader center eyebrow="Skills" title="My toolkit" text="Languages, frameworks and fundamentals I use to take products from idea to production." />
        <div className="skills">
          {skills.map((g, i) => (
            <Reveal key={g.group} className={`card skill skill--${tones[i]}`} variant="blur" delay={i * 90}>
              <h3>{g.group}</h3>
              <ul className="chips">
                {g.items.map((s, j) => <li key={s} className="chip" style={{ '--i': j }}>{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
