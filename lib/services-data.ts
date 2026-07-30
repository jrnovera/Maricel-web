export type PriceItem = { name: string; price: string };

export type ServiceGroup = {
  slug: string;
  title: string;
  icon: string;
  items: PriceItem[];
  note?: string;
  /** Short blurb used on the home page service grid */
  blurb: string;
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "hair",
    title: "Hair Services",
    icon: "hair",
    blurb: "Cut, Color, Treatment & Styling",
    items: [
      { name: "Hair Cut", price: "AED 80" },
      { name: "Wash & Blow Dry", price: "AED 120" },
      { name: "Root Color", price: "AED 180" },
      { name: "Full Hair Color", price: "AED 250" },
      { name: "Hair Spa Treatment", price: "AED 220" },
      { name: "Keratin Treatment", price: "AED 650" },
    ],
    note: "Using EVO professional hair care.",
  },
  {
    slug: "nails",
    title: "Nail Care",
    icon: "nails",
    blurb: "Manicure, Pedicure & Nail Art",
    items: [
      { name: "Classic Manicure", price: "AED 60" },
      { name: "Classic Pedicure", price: "AED 80" },
      { name: "Gel Manicure", price: "AED 120" },
      { name: "Gel Pedicure", price: "AED 140" },
      { name: "Nail Extension", price: "AED 220" },
      { name: "Nail Art", price: "From AED 25" },
    ],
    note: "Using OPI, ESSIE, and ORLY.",
  },
  {
    slug: "skin",
    title: "Skin Care / Facials",
    icon: "skin",
    blurb: "Facials, Rejuvenation & Skin Therapy",
    items: [
      { name: "Express Facial", price: "AED 150" },
      { name: "Deep Cleansing Facial", price: "AED 220" },
      { name: "Hydrating Facial", price: "AED 250" },
      { name: "Anti-Aging Facial", price: "AED 320" },
      { name: "Brightening Facial", price: "AED 280" },
      { name: "Premium Guinot Facial", price: "AED 380" },
    ],
    note: "Featuring GUINOT, Dr. Renaud, LOTUS, HISTEMO, CellulaMadre, and SSBB.",
  },
  {
    slug: "brows-lashes",
    title: "Brows & Lashes",
    icon: "lashes",
    blurb: "Shaping, Tinting & Extensions",
    items: [
      { name: "Eyebrow Threading", price: "AED 35" },
      { name: "Upper Lip Threading", price: "AED 20" },
      { name: "Brow Tint", price: "AED 60" },
      { name: "Lash Tint", price: "AED 60" },
      { name: "Lash Lift", price: "AED 180" },
      { name: "Brow Lamination", price: "AED 200" },
      { name: "Eyelash Extension", price: "AED 250" },
    ],
    note: "Using REFECTOCIL.",
  },
  {
    slug: "waxing",
    title: "Waxing",
    icon: "waxing",
    blurb: "Smooth, Gentle & Hygienic",
    items: [
      { name: "Underarms", price: "AED 35" },
      { name: "Half Arms", price: "AED 50" },
      { name: "Full Arms", price: "AED 80" },
      { name: "Half Legs", price: "AED 70" },
      { name: "Full Legs", price: "AED 120" },
      { name: "Full Body Wax", price: "From AED 280" },
    ],
  },
  {
    slug: "makeup",
    title: "Makeup & Styling",
    icon: "makeup",
    blurb: "Bridal, Occasion & Glam Looks",
    items: [
      { name: "Hair Styling", price: "AED 150" },
      { name: "Party Makeup", price: "AED 250" },
      { name: "Soft Glam Makeup", price: "AED 350" },
      { name: "Bridal Makeup", price: "From AED 850" },
    ],
  },
];

export const bodyMassage: ServiceGroup = {
  slug: "body-massage",
  title: "Body & Massage",
  icon: "lotus",
  blurb: "Relaxing rituals & therapeutic touch",
  items: [
    { name: "Relaxing Massage (60 min)", price: "AED 180" },
    { name: "Deep Tissue Massage (60 min)", price: "AED 220" },
    { name: "Hot Oil Massage (60 min)", price: "AED 220" },
    { name: "Hot Stone Therapy", price: "AED 260" },
  ],
  note: "Selected body rituals by Therma Bliss.",
};

export type BeautyPackage = {
  name: string;
  icon: string;
  includes: string[];
  duration: string;
  price: string;
};

export const packages: BeautyPackage[] = [
  {
    name: "Signature Glow",
    icon: "skin",
    includes: ["Facial", "Blow Dry", "Manicure"],
    duration: "2 hrs",
    price: "AED 299",
  },
  {
    name: "Pamper & Polish",
    icon: "nails",
    includes: ["Manicure", "Pedicure", "Foot Spa"],
    duration: "2.5 hrs",
    price: "AED 349",
  },
  {
    name: "Hair Revival",
    icon: "hair",
    includes: ["Hair Spa", "Trim", "Blow Dry"],
    duration: "2 hrs",
    price: "AED 399",
  },
  {
    name: "Bridal Radiance",
    icon: "makeup",
    includes: ["Makeup", "Hairstyle", "Facial Prep"],
    duration: "4 hrs",
    price: "AED 899",
  },
  {
    name: "Relax & Renew",
    icon: "lotus",
    includes: ["Massage", "Facial", "Body Care"],
    duration: "3 hrs",
    price: "AED 449",
  },
  {
    name: "VIP Beauty Day",
    icon: "sparkle",
    includes: ["Hair", "Nails", "Facial", "Massage"],
    duration: "3 hrs",
    price: "AED 1199",
  },
];

export const bridalLuxury = {
  name: "Bridal Luxury Package",
  price: "AED 1299",
  duration: "6+ Hours",
  desc: "Our most exclusive bridal experience crafted to make you look and feel absolutely radiant on your special day.",
  features: [
    "Complete Bridal Makeover",
    "Premium Products",
    "Personalized Attention",
    "Lasting Radiance",
  ],
};
