import { useState } from 'react'
import { profile } from '../data.js'
import Reveal from './Reveal.jsx'
import { GitHub, LinkedIn, Mail } from './Icons.jsx'
import { ExternalLink, getEmail } from '../lib/links.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = getEmail(profile.emailParts)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <section id="contact" className="section">
      <Reveal className="cta-banner" variant="zoom">
        <div className="cta-banner__glow" aria-hidden="true" />
        <span className="pill-tag pill-tag--on-dark">Open to opportunities</span>
        <h2>Have a project or role in mind?<br />Let's build it together.</h2>
        <p>I'm open to SDE internships, full-time roles and freelance work. My inbox is always open.</p>
        <div className="cta-banner__actions">
          <a className="btn btn--white" href={`mailto:${email}`}><Mail width={18} height={18} /> Say hello</a>
          <button className="btn btn--outline-light" onClick={copy}>{copied ? '✓ Email copied' : email}</button>
        </div>
        <div className="cta-banner__socials">
          <ExternalLink href={profile.github} aria-label="GitHub"><GitHub /></ExternalLink>
          <ExternalLink href={profile.linkedin} aria-label="LinkedIn"><LinkedIn /></ExternalLink>
        </div>
      </Reveal>
    </section>
  )
}
