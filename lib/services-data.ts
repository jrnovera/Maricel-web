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

export const packages = [
  {
    name: "Bridal Radiance",
    price: "AED 1,450",
    desc: "Bridal makeup, hair styling, premium facial, gel manicure and pedicure — everything for your day.",
    includes: [
      "Bridal Makeup",
      "Hair Styling",
      "Premium Guinot Facial",
      "Gel Manicure & Pedicure",
    ],
    image: "bridal",
    featured: true,
  },
  {
    name: "Glow & Restore",
    price: "AED 620",
    desc: "A reset for tired skin and tired shoulders — hydrating facial paired with a relaxing massage.",
    includes: [
      "Hydrating Facial",
      "Relaxing Massage (60 min)",
      "Wash & Blow Dry",
    ],
    image: "facial",
  },
  {
    name: "Hair Revival",
    price: "AED 780",
    desc: "Colour, condition and finish — for hair that feels as good as it looks.",
    includes: ["Root Color", "Hair Spa Treatment", "Wash & Blow Dry"],
    image: "hair",
  },
  {
    name: "Nails & Lashes Duo",
    price: "AED 420",
    desc: "The everyday polish — gel nails paired with lifted, tinted lashes.",
    includes: ["Gel Manicure", "Gel Pedicure", "Lash Lift", "Lash Tint"],
    image: "nails",
  },
  {
    name: "Pure Smooth",
    price: "AED 330",
    desc: "Full-body waxing with threading, done gently and hygienically.",
    includes: ["Full Body Wax", "Eyebrow Threading", "Upper Lip Threading"],
    image: "skincare",
  },
  {
    name: "Weekend Unwind",
    price: "AED 540",
    desc: "Two hours to yourself — hot stone therapy, express facial and a classic pedicure.",
    includes: ["Hot Stone Therapy", "Express Facial", "Classic Pedicure"],
    image: "massage",
  },
];
