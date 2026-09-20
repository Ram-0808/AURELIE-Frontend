// Centralized content for the AURÉLIE demo.
// Imagery uses royalty-free Unsplash photos (source: https://unsplash.com/license).

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  year: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  metal: string;
  stone: string;
  image: string;
  hoverImage: string;
  description: string;
}

export interface JournalEntry {
  id: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const collections: Collection[] = [
  {
    id: "lumiere",
    name: "Lumière",
    tagline: "Light, made wearable",
    description:
      "A study in brilliance — diamonds set to catch and scatter every ray, as if daylight itself were cut and polished.",
    image: img("1515562141207-7a88fb7ce338", 1600),
    year: "N° 01",
  },
  {
    id: "reverie",
    name: "Rêverie",
    tagline: "Dreams cast in gold",
    description:
      "Soft, sculptural forms in warm gold — inspired by the quiet hour between waking and dreaming.",
    image: img("1611652022419-a9419f74343d", 1600),
    year: "N° 02",
  },
  {
    id: "noirceur",
    name: "Noirceur",
    tagline: "The elegance of shadow",
    description:
      "Black diamonds and blackened gold — a collection for those who find beauty in depth and contrast.",
    image: img("1599643478518-a784e5dc4c8f", 1600),
    year: "N° 03",
  },
  {
    id: "flora",
    name: "Flora Eterna",
    tagline: "Nature, held forever",
    description:
      "Botanical motifs rendered in emerald, sapphire and rose gold — a garden that never fades.",
    image: img("1535632066927-ab7c9ab60908", 1600),
    year: "N° 04",
  },
];

export const categories: Category[] = [
  { id: "rings", name: "Rings", image: img("1605100804763-247f67b3557e", 900), count: 48 },
  { id: "necklaces", name: "Necklaces", image: img("1599643478518-a784e5dc4c8f", 900), count: 32 },
  { id: "earrings", name: "Earrings", image: img("1535632066927-ab7c9ab60908", 900), count: 41 },
  { id: "bracelets", name: "Bracelets", image: img("1611591437281-460bfbe1220a", 900), count: 27 },
];

export const products: Product[] = [
  {
    id: "aurora-solitaire",
    name: "Aurora Solitaire Ring",
    collection: "Lumière",
    category: "rings",
    price: 4850,
    metal: "18k White Gold",
    stone: "1.2ct Round Diamond",
    image: img("1605100804763-247f67b3557e", 1000),
    hoverImage: img("1602751584552-8ba73aad10e1", 1000),
    description:
      "A single, flawless round diamond raised on a whisper-thin band. The Aurora is built around light — every facet cut to return brilliance to the eye.",
  },
  {
    id: "reverie-pendant",
    name: "Rêverie Drop Pendant",
    collection: "Rêverie",
    category: "necklaces",
    price: 2650,
    metal: "18k Yellow Gold",
    stone: "Baguette Diamonds",
    image: img("1599643478518-a784e5dc4c8f", 1000),
    hoverImage: img("1611652022419-a9419f74343d", 1000),
    description:
      "A sculptural gold drop suspended on a fine chain, edged with baguette diamonds that trace the curve of the form.",
  },
  {
    id: "flora-hoops",
    name: "Flora Eterna Hoops",
    collection: "Flora Eterna",
    category: "earrings",
    price: 3200,
    metal: "18k Rose Gold",
    stone: "Emerald & Diamond",
    image: img("1535632066927-ab7c9ab60908", 1000),
    hoverImage: img("1596944924616-7b38e7cfac36", 1000),
    description:
      "Botanical hoops in rose gold, each leaf set with a cabochon emerald and a scatter of pavé diamonds.",
  },
  {
    id: "noirceur-band",
    name: "Noirceur Eternity Band",
    collection: "Noirceur",
    category: "rings",
    price: 3950,
    metal: "Blackened 18k Gold",
    stone: "Black Diamonds",
    image: img("1602751584552-8ba73aad10e1", 1000),
    hoverImage: img("1605100804763-247f67b3557e", 1000),
    description:
      "An unbroken circle of black diamonds in blackened gold — restrained, modern, quietly powerful.",
  },
  {
    id: "lumiere-tennis",
    name: "Lumière Tennis Bracelet",
    collection: "Lumière",
    category: "bracelets",
    price: 6400,
    metal: "18k White Gold",
    stone: "Line of Diamonds",
    image: img("1611591437281-460bfbe1220a", 1000),
    hoverImage: img("1515562141207-7a88fb7ce338", 1000),
    description:
      "A continuous line of matched diamonds, articulated to move like water across the wrist.",
  },
  {
    id: "reverie-studs",
    name: "Rêverie Petal Studs",
    collection: "Rêverie",
    category: "earrings",
    price: 1850,
    metal: "18k Yellow Gold",
    stone: "Diamond Center",
    image: img("1596944924616-7b38e7cfac36", 1000),
    hoverImage: img("1535632066927-ab7c9ab60908", 1000),
    description:
      "Petal-form gold studs cradling a single brilliant-cut diamond — an everyday piece with quiet presence.",
  },
];

export const journal: JournalEntry[] = [
  {
    id: "craft",
    kicker: "The Atelier",
    title: "The Hands Behind Every Setting",
    excerpt:
      "Inside our atelier, where a single ring can pass through eleven pairs of hands before it is ready to be worn.",
    image: img("1617038220319-276d3cfab638", 1200),
  },
  {
    id: "sourcing",
    kicker: "Provenance",
    title: "Stones With a Story",
    excerpt:
      "How we trace every diamond and gemstone from origin to setting — beauty you can wear with a clear conscience.",
    image: img("1573408301185-9146fe634ad0", 1200),
  },
  {
    id: "muse",
    kicker: "The Muse",
    title: "Designing Rêverie",
    excerpt:
      "The dreamlike collection began with a single sketch made at dawn. A conversation with its designer.",
    image: img("1633934542430-0905ccb5f050", 1200),
  },
];

export const heroSlides = [
  {
    id: "lumiere",
    kicker: "The New Collection",
    line1: "Lumière",
    line2: "",
    subtitle: "Light, cut and polished into something you can wear.",
    image: img("1515562141207-7a88fb7ce338", 2000),
    to: "/collections/lumiere",
  },
];
