import { Bean, CakeSlice, Coffee, CupSoda, EggFried, Flame, Hamburger, Leaf, Popcorn, Timer } from 'lucide-react'

// Icon colours: fg = icon stroke, bg = soft circle behind it
const tints = {
  coffee: { fg: '#7a4a2a', bg: '#f3e6da' },
  milktea: { fg: '#7d5aa6', bg: '#eee6f6' },
  burger: { fg: '#b5541f', bg: '#fbe6d6' },
  silog: { fg: '#b8860b', bg: '#fbf0cf' },
  fries: { fg: '#c0392b', bg: '#fbe1dd' },
  brownies: { fg: '#5c3a26', bg: '#efe3da' },
  leaf: { fg: '#4f7a3a', bg: '#e3f0da' },
}

export const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Visit', href: '#visit' },
]

export const hero = {
  title: 'Brewed in Faith,',
  titleAccent: 'served with love.',
  subtitle: 'Cafe and Silog Menus + Coffee Cart for events!',
  stats: [
    { value: '2 – 9 PM', label: 'Store hours' },
    { value: 'Iscundu', label: 'Masantol' },
  ],
}

export const features = [
  {
    icon: Bean,
    tint: tints.coffee,
    title: 'Single-origin beans',
    body: 'Traceable lots from twelve partner farms, bought direct at above-market prices.',
  },
  {
    icon: Flame,
    tint: tints.burger,
    title: 'Roasted in-house',
    body: 'Small batches every Tuesday, so nothing on our shelf is older than a week.',
  },
  {
    icon: Leaf,
    tint: tints.leaf,
    title: 'Plant milks, no upcharge',
    body: 'Oat, almond or soy in any drink, always at the same price.',
  },
  {
    icon: Timer,
    tint: tints.silog,
    title: 'Ready in 5 minutes',
    body: 'Order ahead online and grab your cup from the pickup shelf.',
  },
]

/**
 * Menu categories. Each card can show any of:
 *  - `options` + shared `price`/`size`   (pick a flavor, one price)
 *  - `items`                             (each with its own price)
 *  - `sizes`                             (price per size)
 *  - `addOns`
 * `art` picks an illustration for the card.
 */
export const menu = [
  {
    id: 'coffee',
    title: 'Coffee',
    icon: Coffee,
    tint: tints.coffee,
    prompt: 'Choose your coffee',
    options: ['Americano', 'Brown Sugar Latte', 'Caramel Macchiato', 'Spanish Latte'],
    size: '16 oz',
    price: 80,
    art: { type: 'cup', liquid: '#a0693f', foam: '#f6e7d2', pattern: 'heart' },
  },
  {
    id: 'milktea',
    title: 'Milktea',
    icon: CupSoda,
    tint: tints.milktea,
    prompt: 'Choose your milktea flavor',
    options: ['Chocolate', 'Matcha', 'Okinawa', 'Taro', 'Wintermelon'],
    size: '16 oz',
    price: 50,
    art: { type: 'glass', layers: [{ color: '#c8a27c', size: 1 }], pearls: true },
  },
  {
    id: 'burger',
    title: 'Burger',
    icon: Hamburger,
    tint: tints.burger,
    prompt: 'Choose your burger',
    items: [
      { name: 'Classic Burger', description: 'Sandwich + Patty + Special Sauce', price: 40 },
      { name: 'Cheeseburger', description: 'Sandwich + Patty + Cheese + Special Sauce', price: 55 },
      {
        name: 'Burger Deluxe',
        description: 'Sandwich + Patty + Cheese + Special Sauce + Vegetables (Onion, Lettuce, Tomato)',
        price: 80,
      },
    ],
    addOns: [
      { name: 'Cheese', price: 10 },
      { name: 'Patty', price: 25 },
      { name: 'Egg', price: 15 },
    ],
  },
  {
    id: 'silog',
    title: 'Silog',
    icon: EggFried,
    tint: tints.silog,
    prompt: 'Choose your silog',
    items: [
      { name: 'Hotsilog', price: 65 },
      { name: 'Longsilog', price: 75 },
      { name: 'Shanghaisilog', price: 75 },
      { name: 'Tapsilog', price: 95 },
      { name: 'Nuggetsilog', price: 80 },
      { name: 'Hungarian Sausage', price: 95 },
    ],
  },
  {
    id: 'fries',
    title: 'Fries',
    icon: Popcorn,
    tint: tints.fries,
    prompt: 'Choose your fries flavor',
    options: ['Cheese', 'Barbecue'],
    sizes: [
      { name: 'Small', price: 35 },
      { name: 'Medium', price: 45 },
      { name: 'Large', price: 55 },
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    icon: CakeSlice,
    tint: tints.brownies,
    prompt: 'Choose your brownie flavor',
    items: [
      { name: 'Classic Chocolate', price: 25 },
      { name: 'Cashew Nuts', price: 30 },
    ],
  },
]

export const coffeeCart = {
  eyebrow: 'For events',
  title: 'Coffee Cart for events!',
  description:
    'Bring 7 Degrees to your next celebration. Our coffee cart serves your favorite drinks right where your guests are.',
}

export const location = {
  name: '7 Degrees Iscundu',
  address: ['BNG Gas Station', 'Iscundu, Masantol'],
  mapsUrl: 'https://maps.google.com/?q=BNG+Gas+Station+Iscundu+Masantol',
  hours: '2:00 PM – 9:00 PM',
}
