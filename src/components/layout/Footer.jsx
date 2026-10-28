import Container from '../ui/Container.jsx'
import LocationCard from '../sections/LocationCard.jsx'
import InquiryCard from '../sections/InquiryCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer id="visit" className="mt-6 scroll-mt-6 pb-8 md:mt-8">
      <Container>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
          <Reveal>
            <LocationCard />
          </Reveal>
          <Reveal delay={80}>
            <InquiryCard />
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 pb-[env(safe-area-inset-bottom)] text-center text-sm text-ink-muted sm:flex-row sm:text-left">
          <Logo />
          <p>© {new Date().getFullYear()} 7 Degrees Iscundu. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
