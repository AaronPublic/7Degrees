import Container from '../ui/Container.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import MenuCard from '../ui/MenuCard.jsx'
import { menu } from '../../data/content.js'

// Bento placement on the 4-column desktop grid:
//   coffee  coffee | milktea milktea
//   burger  burger | silog   silog
//   fries | brownies | silog  silog
const layout = {
  coffee: { variant: 'mist', className: 'lg:col-span-2' },
  milktea: { variant: 'paper', className: 'lg:col-span-2' },
  burger: { variant: 'paper', className: 'lg:col-span-2' },
  silog: { variant: 'mist', className: 'lg:col-span-2 lg:row-span-2' },
  fries: { variant: 'mist' },
  brownies: { variant: 'paper' },
}

export default function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-6">
      <Container>
        <SectionHeader
          id="menu-title"
          align="center"
          eyebrow="Made to order"
          title="Our menu"
          description="Coffee, milktea, burgers, silog and sweets, all freshly prepared."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menu.map((category) => (
            <MenuCard key={category.id} {...category} {...layout[category.id]} />
          ))}
        </div>
      </Container>
    </section>
  )
}
