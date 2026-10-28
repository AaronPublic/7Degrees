import Container from '../ui/Container.jsx'
import LocationCard from '../sections/LocationCard.jsx'
import NewsletterCard from '../sections/NewsletterCard.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer id="visit" className="mt-6 scroll-mt-6 pb-8 md:mt-8">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <LocationCard />
          <NewsletterCard />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-sm text-ink-muted sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} 7 Degrees Iscundu. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
