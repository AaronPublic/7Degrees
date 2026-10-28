import Container from '../ui/Container.jsx'
import FeatureItem from '../ui/FeatureItem.jsx'
import { features } from '../../data/content.js'

export default function Features() {
  return (
    <section id="about" aria-labelledby="features-title" className="scroll-mt-6">
      <Container>
        <h2 id="features-title" className="sr-only">
          Why 7 Degrees
        </h2>
        <ul className="grid gap-8 border-y border-ink/10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
