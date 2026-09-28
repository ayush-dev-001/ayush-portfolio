import Nav from './components/Nav.jsx'
import ScrollUI from './components/ScrollUI.jsx'
import Starfield from './components/Starfield.jsx'
import Screens from './components/Screens.jsx'
import Ufo from './components/Ufo.jsx'
import Hero from './components/Hero.jsx'
import Highlights from './components/Highlights.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Awards from './components/Awards.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data.js'

const screens = [
  { id: 'top', content: <><Nav /><Hero /></> },
  { id: 'highlights', content: <Highlights /> },
  { id: 'about', content: <About /> },
  { id: 'experience', content: <Experience /> },
  { id: 'projects', content: <Projects /> },
  { id: 'skills', content: <Skills /> },
  { id: 'awards', content: <Awards /> },
  {
    id: 'contact',
    content: (
      <>
        <Contact />
        <footer className="footer">
          <a href="#top" className="footer__brand">Ayush<span>.</span></a>
          <span>© {new Date().getFullYear()} {profile.name}. Built with React.</span>
        </footer>
      </>
    ),
  },
]

export default function App() {
  return (
    <>
      <Starfield />
      <div id="ufo-back" className="ufo-back" />
      <div className="app">
        <Screens screens={screens} />
        <Ufo />
      </div>
    </>
  )
}
