import type { Product } from "./types";

/**
 * Starter catalogue so the site isn't empty on day one. Photos are free
 * Pexels images (Pexels licence: free commercial use, no attribution
 * required). Every piece is flagged `sample` so the owner knows to replace it
 * with real photos of Mehal's own work.
 */
const now = "2026-11-20T00:00:00.000Z";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "seed-shahi",
    slug: "shahi-tufted-sofa",
    name: "Shahi tufted sofa",
    category: "sofa",
    summary: "Deep button tufting, rolled arms and slim gold legs.",
    description:
      "Our signature three-seater. Every button is set by hand into a high-density seat, so the tufts stay crisp for years. Choose the length, arm shape, leg finish and any fabric from our swatch wall.",
    materials: [
      { part: "Frame", material: "Kiln-dried sheesham and deodar" },
      { part: "Seat", material: "High-density foam over pocket springs" },
      { part: "Upholstery", material: "Cream velvet, any colour on request" },
      { part: "Legs", material: "Brass-finish steel" },
    ],
    leadTimeWeeks: 4,
    images: ["/seed/30380637.jpg", "/seed/10410097.jpg"],
    designBase: "sofa",
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-noor",
    slug: "noor-corner-lounge",
    name: "Noor corner lounge",
    category: "sofa",
    summary: "An L-shaped lounge sized to your room, down to the inch.",
    description:
      "Built in modules, so we can make it as long as your wall and turn the corner on whichever side you need. Loose scatter cushions in contrasting velvet.",
    materials: [
      { part: "Frame", material: "Seasoned deodar" },
      { part: "Seat", material: "Molty high-resilience foam" },
      { part: "Upholstery", material: "Ivory linen blend" },
      { part: "Cushions", material: "Velvet, piped edges" },
    ],
    leadTimeWeeks: 5,
    images: ["/seed/20035998.jpg"],
    designBase: "sofa",
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-riwayat",
    slug: "riwayat-velvet-sofa",
    name: "Riwayat velvet sofa",
    category: "sofa",
    summary: "Low, long and channel-stitched in deep russet velvet.",
    description:
      "A relaxed modern shape with a low back and a deep seat. Looks best in strong colours: russet, bottle green or midnight blue.",
    materials: [
      { part: "Frame", material: "Seasoned deodar" },
      { part: "Upholstery", material: "Russet velvet" },
      { part: "Legs", material: "Hidden plinth" },
    ],
    leadTimeWeeks: 4,
    images: ["/seed/37988079.jpg"],
    designBase: "sofa",
    featured: false,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-khwab",
    slug: "khwab-upholstered-bed",
    name: "Khwab upholstered bed",
    category: "bedroom",
    summary: "A tall tufted headboard on a solid wood base.",
    description:
      "King or queen, with a headboard as tall as you like. Design it in 3D first, then we build it in our workshop. Add a storage base for bedding.",
    materials: [
      { part: "Frame", material: "Sheesham with ply slats" },
      { part: "Headboard", material: "Tufted velvet over foam" },
      { part: "Legs", material: "Turned wood or gold metal" },
    ],
    leadTimeWeeks: 4,
    images: [],
    designBase: "bed",
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-zarnigar",
    slug: "zarnigar-wingback-chair",
    name: "Zarnigar wingback chair",
    category: "chairs",
    summary: "A high-backed reading chair in jewel-toned velvet.",
    description:
      "Tall wings, a deep tufted back and a seat you can sink into. Comes in any velvet from our swatch wall.",
    materials: [
      { part: "Frame", material: "Sheesham" },
      { part: "Upholstery", material: "Plum velvet, button tufted" },
      { part: "Legs", material: "Walnut-stained hardwood" },
    ],
    leadTimeWeeks: 3,
    images: ["/seed/10567019.jpg", "/seed/6434621.jpg"],
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-sheesh",
    slug: "sheesh-mahal-dining-table",
    name: "Sheesh Mahal dining table",
    category: "dining",
    summary: "A grey veined marble top for eight, on a sculpted base.",
    description:
      "A statement table for big family dinners. The marble slab is chosen with you, and the base is finished to match your chairs.",
    materials: [
      { part: "Top", material: "Grey veined marble, sealed" },
      { part: "Base", material: "Lacquered hardwood" },
    ],
    leadTimeWeeks: 6,
    images: ["/seed/6587894.jpg"],
    designBase: "table",
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-bagh",
    slug: "bagh-dining-chairs",
    name: "Bagh dining chairs",
    category: "dining",
    summary: "Bottle-green velvet chairs with curved, painted legs.",
    description:
      "Sold in sets of four, six or eight. Pair them with any of our dining tables or bring your own.",
    materials: [
      { part: "Frame", material: "Painted hardwood" },
      { part: "Upholstery", material: "Bottle-green velvet" },
    ],
    leadTimeWeeks: 3,
    images: ["/seed/7195591.jpg"],
    featured: false,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-darbar",
    slug: "darbar-dining-set",
    name: "Darbar dining set",
    category: "dining",
    summary: "A solid wood table and six chairs for everyday use.",
    description:
      "Simple, strong joinery in solid wood. Choose the stain, the table length and the number of chairs.",
    materials: [
      { part: "Table", material: "Solid sheesham" },
      { part: "Chairs", material: "Sheesham with woven seats" },
      { part: "Finish", material: "Hand-rubbed oil" },
    ],
    leadTimeWeeks: 5,
    images: ["/seed/11011890.jpg"],
    designBase: "table",
    featured: false,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-taqi",
    slug: "taqi-marble-nest-tables",
    name: "Taqi marble nest tables",
    category: "tables",
    summary: "Two round marble tops that tuck into each other.",
    description:
      "A pair of coffee tables in green-veined marble on dark steel frames. Slide them apart when guests arrive.",
    materials: [
      { part: "Tops", material: "Green-veined marble" },
      { part: "Frames", material: "Powder-coated steel" },
    ],
    leadTimeWeeks: 3,
    images: ["/seed/15253318.jpg"],
    designBase: "table",
    featured: true,
    sample: true,
    createdAt: now,
  },
  {
    id: "seed-sunehri",
    slug: "sunehri-side-table",
    name: "Sunehri side table",
    category: "tables",
    summary: "A gold wire drum with a polished stone top.",
    description: "A small table with a big presence. Sits beside any armchair or sofa end.",
    materials: [
      { part: "Base", material: "Gold-finish steel wire" },
      { part: "Top", material: "Polished red onyx" },
    ],
    leadTimeWeeks: 2,
    images: ["/seed/6394545.jpg"],
    featured: false,
    sample: true,
    createdAt: now,
  },
];
