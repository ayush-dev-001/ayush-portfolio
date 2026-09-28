import { useEffect, useState } from 'react'
import { Sun, Moon } from './Icons.jsx'

const KEY = 'theme'

// Light mode by default. A visitor's own choice (saved when they use the toggle) wins.
function initialTheme() {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme)

  // Apply the theme to <html> so the CSS variables switch.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(KEY, next) } catch {}
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="i-sun" />
      <Moon className="i-moon" />
    </button>
  )
}
