import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Features from './components/sections/Features.jsx'
import Menu from './components/sections/Menu.jsx'
import CoffeeCartSection from './components/sections/CoffeeCartSection.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink px-4 py-2 text-paper-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex flex-col gap-6 md:gap-8">
        <Hero />
        <Features />
        <Menu />
        <CoffeeCartSection />
      </main>
      <Footer />
    </>
  )
}
