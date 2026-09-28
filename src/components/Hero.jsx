import { useState } from 'react'
import { profile } from '../data.js'
import { GitHub, LinkedIn, Mail, Download, Trophy, Server, Layers, Rocket } from './Icons.jsx'
import { ExternalLink, safeUrl, getEmail } from '../lib/links.jsx'

function Portrait() {
  const [failed, setFailed] = useState(false)
  const [darkFailed, setDarkFailed] = useState(false)
  if (failed || !profile.photo) {
    const initials = profile.name.split(' ').map((w) => w[0]).join('')
    return (
      <div className="portrait__fallback" aria-label={profile.name}>
        <span>{initials}</span>
      </div>
    )
  }
  const cover = profile.photoStyle !== 'cutout'
  const cls = `portrait__img ${cover ? 'portrait__img--cover' : ''}`
  return (
    <>
      <img
        className={`${cls} portrait__img--light`}
        src={profile.photo}
        alt={profile.name}
        width="1086"
        height="1448"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
      {profile.photoDark && !darkFailed && (
        // Dark-mode photo: stacked on top and cross-faded in when the theme is dark.
        <img
          className={`${cls} portrait__img--dark`}
          src={profile.photoDark}
          alt=""
          aria-hidden="true"
          width="1086"
          height="1448"
          decoding="async"
          onError={() => setDarkFailed(true)}
        />
      )}
    </>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy">
          <span className="pill-tag rise">{profile.badge}</span>
          <h1 className="hero__title rise d1">
            {profile.headline[0]}
            <br />
            <span className="hero__title-em">{profile.headline[1]}</span>
          </h1>
          <p className="hero__text rise d2">
            I'm <strong>{profile.name}</strong>, a software engineer who builds full-stack products with
            React, Next.js and Node.js, from auth systems and APIs to real-time features used by real users.
          </p>
          <div className="hero__cta rise d3">
            <a className="btn btn--dark" href="#contact">Let's Collaborate</a>
            <a className="btn btn--light" href={safeUrl(profile.resume)} download>
              <Download width={18} height={18} /> Download CV
            </a>
          </div>
          <div className="hero__socials rise d4">
            <span>Find me on</span>
            <ExternalLink href={profile.github} aria-label="GitHub"><GitHub /></ExternalLink>
            <ExternalLink href={profile.linkedin} aria-label="LinkedIn"><LinkedIn /></ExternalLink>
            <a href={`mailto:${getEmail(profile.emailParts)}`} aria-label="Email"><Mail /></a>
          </div>
        </div>

        <div className="hero__visual rise d2">
          <div className={`portrait ${profile.photo && profile.photoStyle !== 'cutout' ? 'portrait--photo' : ''}`}>
            <div className="portrait__blob" aria-hidden="true" />
            <Portrait />
          </div>

          <div className="float-card float-card--cert">
            <div className="float-card__icon float-card__icon--peach"><Trophy /></div>
            <strong>1st Place, Algo Arena 2.0</strong>
            <p>Won a coding hackathon among 1,000+ participants</p>
          </div>

          <div className="float-card float-card--work">
            <div className="float-card__row">
              <span className="float-card__avatar">SSB</span>
              <strong>SSB with ISV</strong>
              <span className="float-card__live"><i /> Live</span>
            </div>
            <p>Unified 4 MERN apps into one Next.js platform, serving <b>940+ users</b> with zero-downtime deploys.</p>
          </div>

          <div className="orb orb--1" title="Frontend"><Layers /></div>
          <div className="orb orb--2" title="Backend"><Server /></div>
          <div className="orb orb--3" title="Shipping"><Rocket /></div>
        </div>
      </div>

    </section>
  )
}
