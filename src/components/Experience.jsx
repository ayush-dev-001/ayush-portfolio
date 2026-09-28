import { experience } from '../data.js'
import Reveal, { SectionHeader } from './Reveal.jsx'
import HScroll from './HScroll.jsx'
import { Arrow, Check } from './Icons.jsx'
import { ExternalLink, safeUrl } from '../lib/links.jsx'

const tones = ['mint', 'peach', 'lavender']

// Same card design as Projects: colored cover + highlights + action button.
export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader eyebrow="Work experience" title="Where I've worked" />
      <HScroll label="Work experience">
        {experience.map((job, i) => (
          <Reveal key={job.company} as="article" className="project job-card" variant="right" delay={Math.min(i, 3) * 120}>
            <div className={`project__cover project__cover--${tones[i % tones.length]}`}>
              <div className="job-card__top">
                <span className="project__period">{job.period}</span>
                {job.status && <span className="live-pill"><i /> {job.status}</span>}
              </div>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
              <ul className="project__stack">
                {job.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="project__body">
              <ul className="checks checks--compact">
                {job.points.map((p, j) => (
                  <li key={j} style={{ '--i': j }}><span><Check width={12} height={12} /></span>{p}</li>
                ))}
              </ul>
              {safeUrl(job.live) && (
                <div className="project__links">
                  <ExternalLink className="btn btn--dark btn--sm" href={job.live}>
                    Live site <Arrow width={16} height={16} />
                  </ExternalLink>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </HScroll>
    </section>
  )
}
