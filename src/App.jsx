import { usePauseOffscreen } from './hooks/usePauseOffscreen.js'
import IntroLoader from './components/layout/IntroLoader.jsx'
import Mascot from './components/layout/Mascot.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Brewing from './components/sections/Brewing.jsx'
import Recipes from './components/sections/Recipes.jsx'
import Menu from './components/sections/Menu.jsx'
import CoffeeCartSection from './components/sections/CoffeeCartSection.jsx'

export default function App() {
  usePauseOffscreen()

  return (
    <>
      <IntroLoader />
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink px-4 py-2 text-paper-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      {/* Sections set their own spacing so the brewing band can sit flush under the hero */}
      <main id="main" className="flex flex-col">
        <Hero />
        <Brewing />
        <Recipes />
        <Menu />
        <CoffeeCartSection />
      </main>
      <Footer />
      <Mascot />
    </>
  )
}
