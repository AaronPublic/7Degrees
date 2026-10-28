import { CakeSlice, Coffee, CupSoda, Droplet, EggFried, Hamburger, Popcorn, Sprout, Waves } from 'lucide-react'

// Icon colours: fg = icon stroke, bg = soft circle behind it
const tints = {
  coffee: { fg: '#7a4a2a', bg: '#f3e6da' },
  milktea: { fg: '#7d5aa6', bg: '#eee6f6' },
  burger: { fg: '#b5541f', bg: '#fbe6d6' },
  silog: { fg: '#b8860b', bg: '#fbf0cf' },
  fries: { fg: '#c0392b', bg: '#fbe1dd' },
  brownies: { fg: '#5c3a26', bg: '#efe3da' },
}

export const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#brew' },
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

export const brewing = {
  eyebrow: 'Brewed fresh',
  title: 'Every cup, brewed to order',
  description: 'From the first pour to the last drop, this is how your coffee comes together.',
  steps: [
    { icon: Sprout, title: 'Bloom', body: 'A first splash of hot water wakes up the grounds.' },
    { icon: Waves, title: 'Pour', body: 'A slow, steady pour draws out the flavor.' },
    { icon: Droplet, title: 'Drip', body: 'Coffee filters through, drop by drop.' },
    { icon: Coffee, title: 'Serve', body: 'Poured hot and handed to you with a smile.' },
  ],
}

/**
 * Exploded-view recipes for the "What's inside" section. Each drink lists its
 * layer slots top to bottom (shapes live in ExplodedCup.jsx); `common` layers
 * are in every flavor, and each flavor fills in the rest. A slot a flavor
 * leaves out is drawn as an empty outline. Flavor names match `menu` options.
 */
const espresso = { label: 'Espresso', note: 'Freshly pulled shots', color: '#4a2a17' }
const freshMilk = { label: 'Fresh milk', note: 'Cold and creamy', color: '#f4ede1' }

export const recipes = {
  eyebrow: 'Recipe breakdown',
  title: "What's inside your cup",
  description: 'Every flavor, layer by layer. Swipe or pick a flavor to take a closer look.',
  drinks: [
    {
      id: 'coffee',
      slots: ['lid', 'topping', 'espresso', 'ice', 'base', 'sweetener', 'cup'],
      common: {
        lid: { label: 'Lid', note: 'Sip-ready' },
        ice: { label: 'Ice', note: 'Keeps it cold to the last sip' },
        cup: { label: '16 oz cup' },
      },
      flavors: {
        Americano: {
          espresso,
          base: { label: 'Cold water', note: 'Opens up the espresso', color: '#b98a5e' },
        },
        'Brown Sugar Latte': {
          espresso,
          base: freshMilk,
          sweetener: { label: 'Brown sugar syrup', note: 'Deep, toasty sweetness', color: '#8b4a1c' },
        },
        'Caramel Macchiato': {
          topping: { label: 'Caramel drizzle', note: 'Finished on top', color: '#c27c2c' },
          espresso,
          base: freshMilk,
          sweetener: { label: 'Vanilla syrup', note: 'Smooth and mellow', color: '#ead9b0' },
        },
        'Spanish Latte': {
          espresso,
          base: freshMilk,
          sweetener: { label: 'Condensed milk', note: 'Rich and creamy-sweet', color: '#f3e3bf' },
        },
      },
    },
    {
      id: 'milktea',
      slots: ['lid', 'tea', 'milk', 'ice', 'pearls', 'cup'],
      common: {
        lid: { label: 'Sealed top', note: 'Poke a straw through' },
        milk: { label: 'Milk', note: 'For a creamy finish', color: '#f4ede1' },
        ice: { label: 'Ice', note: 'Shaken in to chill' },
        pearls: { label: 'Tapioca pearls', note: 'Chewy and sweet' },
        cup: { label: '16 oz cup' },
      },
      flavors: {
        Chocolate: { tea: { label: 'Chocolate tea', note: 'Rich cocoa blend', color: '#6b4226' } },
        Matcha: { tea: { label: 'Matcha', note: 'Earthy green tea', color: '#7fa650' } },
        Okinawa: { tea: { label: 'Okinawa tea', note: 'Roasted brown sugar notes', color: '#a8714a' } },
        Taro: { tea: { label: 'Taro', note: 'Nutty and creamy', color: '#a98bc9' } },
        Wintermelon: { tea: { label: 'Wintermelon tea', note: 'Light caramel sweetness', color: '#c9a46a' } },
      },
    },
  ],
}

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
