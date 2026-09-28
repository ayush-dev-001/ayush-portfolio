// Link safety helpers.
// - Only allow safe URL schemes (https, http, mailto, in-page anchors, same-site files),
//   so a typo or a tampered data entry can never create a `javascript:` link.
// - External links always open in a new tab with rel="noopener noreferrer",
//   so the opened site can't control this tab (reverse tabnabbing) or see where the visitor came from.

const SAFE = /^(https?:|mailto:|#|\.?\/)/i

export function safeUrl(url) {
  if (typeof url !== 'string') return undefined
  const u = url.trim()
  return SAFE.test(u) ? u : undefined
}

export function ExternalLink({ href, children, ...rest }) {
  const url = safeUrl(href)
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

// The email address is stored in two parts and only joined in the browser,
// which keeps it out of simple scrapers that harvest addresses for spam.
export function getEmail(parts) {
  return Array.isArray(parts) ? parts.join('@') : ''
}
