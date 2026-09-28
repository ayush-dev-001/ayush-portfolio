import { projects } from '../data.js'
import Reveal, { SectionHeader } from './Reveal.jsx'
import HScroll from './HScroll.jsx'
import { GitHub, Arrow, Check } from './Icons.jsx'
import { ExternalLink } from '../lib/links.jsx'

const tones = ['lavender', 'peach', 'mint']

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeader eyebrow="Projects" title="Things I've built" />
      <HScroll label="Projects">
        {projects.map((p, i) => (
          <Reveal key={p.title} as="article" className="project" variant="right" delay={Math.min(i, 3) * 120}>
            <div className={`project__cover project__cover--${tones[i % tones.length]}`}>
              <span className="project__period">{p.period}</span>
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <ul className="project__stack">
                {p.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="project__body">
              <p className="project__desc">{p.description}</p>
              <ul className="checks checks--compact">
                {p.highlights.map((h, j) => (
                  <li key={h} style={{ '--i': j }}><span><Check width={12} height={12} /></span>{h}</li>
                ))}
              </ul>
              <div className="project__links">
                <ExternalLink className="btn btn--dark btn--sm" href={p.github}><GitHub width={16} height={16} /> Code</ExternalLink>
                <ExternalLink className="btn btn--light btn--sm" href={p.live}>Live demo <Arrow width={16} height={16} /></ExternalLink>
              </div>
            </div>
          </Reveal>
        ))}
      </HScroll>
    </section>
  )
}
