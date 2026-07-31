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
    slug: "nails",
    title: "Nail Services",
    icon: "nails",
    blurb: "Manicure, Pedicure, Extensions & Nail Art",
    items: [
      { name: "Cut & File Feet or Hands (Kids)", price: "AED 15" },
      { name: "Foot Scrub & Spa (Kids)", price: "AED 20" },
      { name: "Manicure or Pedicure (Kids)", price: "AED 25" },
      { name: "Nail Polish Removal Hands or Feet", price: "AED 10" },
      { name: "Nail Polish Hands or Feet", price: "AED 20" },
      { name: "Cut & File Hands or Feet (Adult)", price: "AED 20" },
      { name: "Gel Polish Removal Hands or Feet", price: "AED 30" },
      { name: "Hands Nail Art per Finger", price: "AED 10" },
      { name: "French Tips for Hands or Feet", price: "AED 30" },
      { name: "Foot Scrub/Spa/Massage", price: "AED 30" },
      { name: "Manicure Express", price: "AED 40" },
      { name: "Manicure with NK or OPI Treatment", price: "AED 60" },
      { name: "Pedicure with NK or OPI Treatment", price: "AED 90" },
      { name: "Pedicure Express", price: "AED 45" },
      { name: "Gel Polish Hands or Feet", price: "AED 40" },
      { name: "Callus Removal", price: "AED 30" },
      { name: "Fake Nails Removal", price: "AED 20" },
      { name: "Gel Extension or Acrylic Removal", price: "AED 60" },
      { name: "Hands or Feet Ombre Art", price: "AED 60" },
      { name: "Fake Nails Extension with Polish", price: "AED 120" },
      { name: "Paraffin Hands (Therma Bliss)", price: "AED 100" },
      { name: "Paraffin Feet (Therma Bliss)", price: "AED 120" },
      { name: "Fake Nails Extension with Gel Polish", price: "AED 150" },
      { name: "Poly Gel Extension with Gel Polish", price: "AED 150" },
      {
        name: "Acrylic or Gel Extension (Tips, Silk or Foam Board)",
        price: "AED 250",
      },
    ],
    note: "Using EVO, OPI, ESSIE, and ORLY.",
  },
  {
    slug: "hair",
    title: "Hair Services",
    icon: "hair",
    blurb: "Cut, Color, Treatment & Styling",
    items: [
      { name: "Basic Hair Cut (Kids)", price: "AED 40" },
      { name: "Hair Cut with Style (Kids)", price: "AED 50" },
      { name: "Haircut with Style & Blow Dry (up to 12yrs)", price: "AED 70" },
      { name: "Hair Cut Trim or Front Cut", price: "AED 25" },
      { name: "Hair Wash with Quick Dry", price: "AED 40" },
      { name: "Hair Cut with Style", price: "AED 100" },
      { name: "Hair Root Color", price: "AED 100" },
      { name: "Hair Spa with Head Massage & Quick Dry", price: "AED 80" },
      { name: "Hair Blow Dry (Shoulder L)", price: "AED 60" },
      { name: "Hair Wash with Blow Dry (Shoulder L)", price: "AED 80" },
      { name: "Haircut with Style & Blow Dry (Shoulder L)", price: "AED 150" },
      { name: "Hair Spa with Blow Dry (Shoulder L)", price: "AED 130" },
      { name: "Hair Root Color with Hair Spa", price: "AED 170" },
      { name: "Organic Hair Treatment + Head Massage", price: "AED 100" },
      { name: "Blow Dry/Iron/Hairstyle (Shoulder L)", price: "AED 100" },
      { name: "Hair Color (Shoulder L)", price: "AED 150" },
      { name: "Hair Highlights (Shoulder L)", price: "AED 150" },
      { name: "Hair Re-Pigmentation (Shoulder L)", price: "AED 150" },
      {
        name: "Hydra-Scalp HISTEMO Korean Treatment with Head Massage",
        price: "AED 150",
      },
      {
        name: "CellulaMadre Organic Hair & Scalp Germany Treatment with Head Massage (Shoulder L)",
        price: "AED 150",
      },
      {
        name: "SSBB Hair Italian Treatment with Head Massage",
        price: "AED 150",
      },
      {
        name: "Advanced Nano Plastia Hair Spa Treatment (For Damaged Hair)",
        price: "AED 180",
      },
      { name: "Hair Color with Blow Dry (Shoulder L)", price: "AED 200" },
      { name: "Hair Extension/Pack", price: "AED 200" },
      {
        name: "Hair Balayage/Ombre Color with Hair Spa/Style & Blow Dry (Shoulder L)",
        price: "AED 300",
      },
      { name: "Hair Perming/Permanent Curly (Shoulder L)", price: "AED 350" },
      { name: "Hair Protein/Keratin/Collagen (Shoulder L)", price: "AED 400" },
      { name: "Hair Rebond (Shoulder L)", price: "AED 400" },
      { name: "Hair Botox (Shoulder L)", price: "AED 400" },
    ],
    note: "Using Kemon and evo. \"Shoulder L\" (shoulder-length) pricing shown — longer lengths on consultation.",
  },
  {
    slug: "skin",
    title: "Facial Services",
    icon: "skin",
    blurb: "Facials, Rejuvenation & Skin Therapy",
    items: [
      {
        name: "Basic Facial Wash/Cleaning (Normal Mask)",
        price: "AED 50",
      },
      { name: "Basic Facial Wash/Cleaning (Gold Mask)", price: "AED 80" },
      { name: "Basic Facial (Normal)", price: "AED 100" },
      {
        name: "Hydra-Facial Treatment (Dr. Renaud or LOTUS, all skin types)",
        price: "AED 180",
      },
      {
        name: "LOTUS Special Herbal Facial Treatment (Sensitive, Oily, Dry & Anti-Pigmentation)",
        price: "AED 250",
      },
      {
        name: "LOTUS Professional 4-Layer Facial Treatment (Anti-Aging, Botox, Lifting, Hydration)",
        price: "AED 300",
      },
      {
        name: "GUINOT Paris Professional Facial with Hydrafacial & GUINOT Machine",
        price: "AED 350",
      },
    ],
    note: "Featuring GUINOT, Dr. Renaud, and LOTUS.",
  },
  {
    slug: "korean-spa",
    title: "Korean Spa Services",
    icon: "sparkle",
    blurb: "Combined Hair, Facial, Body & Foot Rituals",
    items: [
      { name: "2-in-1 Korean Hair & Facial Spa", price: "AED 400" },
      {
        name: "3-in-1 Korean Hair, Facial & Foot Spa",
        price: "AED 500",
      },
      {
        name: "4-in-1 Korean Hair, Facial, Body & Foot Spa",
        price: "AED 600",
      },
    ],
  },
  {
    slug: "massage",
    title: "Massage Spa Services",
    icon: "lotus",
    blurb: "Relaxing Rituals & Therapeutic Touch",
    items: [
      { name: "Fifteen-Minute Massage", price: "AED 40" },
      { name: "Half-Hour Body Massage", price: "AED 80" },
      { name: "One-Hour Full Body Massage", price: "AED 150" },
      { name: "One-Hour Body Slimming Massage", price: "AED 200" },
      {
        name: "One-Hour Full Body Massage with Lava Stone or Hot Stone",
        price: "AED 200",
      },
      {
        name: "One-and-a-Half-Hour Full Body Massage with Cupping, Lava Stone or Hot Stone",
        price: "AED 250",
      },
    ],
    note: "Selected body rituals by Therma Bliss.",
  },
  {
    slug: "micro-shading",
    title: "Micro-Shading Services",
    icon: "lashes",
    blurb: "Eyeliner, Lip & Eyebrow Micro-Shading",
    items: [
      { name: "Eyeliner Micro-Shading", price: "AED 300" },
      { name: "Lip Micro-Shading", price: "AED 350" },
      { name: "Eyebrow Micro-Shading", price: "AED 500" },
    ],
    note: "By advanced booking only.",
  },
  {
    slug: "oriental-bath",
    title: "Oriental Bath Services",
    icon: "hygiene",
    blurb: "Moroccan Bath & Hammam Rituals",
    items: [
      { name: "Basic Moroccan Bath", price: "AED 100" },
      { name: "Basic Moroccan Bath + Body Bleaching", price: "AED 180" },
      {
        name: "Special Moroccan Bath with Scrub/Cream",
        price: "AED 200",
      },
      { name: "Hammam Irani with Stone", price: "AED 150" },
      {
        name: "Special Moroccan Bath with Body Polish Cream",
        price: "AED 250",
      },
      { name: "VIP Moroccan Bath with Massage", price: "AED 250" },
    ],
  },
  {
    slug: "henna",
    title: "Henna Services",
    icon: "hands",
    blurb: "Traditional Henna for Hands & Feet",
    items: [
      { name: "Henna Wrist (Kids)", price: "AED 40" },
      { name: "Henna Feet (Kids)", price: "AED 50" },
      { name: "Henna Wrist (Adult)", price: "AED 60" },
      { name: "Henna Feet (Adult)", price: "AED 80" },
    ],
  },
  {
    slug: "personal-care",
    title: "Personal Care & Beauty Services",
    icon: "makeup",
    blurb: "Lashes, Brows & Makeup",
    items: [
      { name: "Strip Eyelashes", price: "AED 20" },
      { name: "Eyebrow Color/Tint", price: "AED 30" },
      { name: "REFECTOCIL Eyebrow Color/Tint", price: "AED 60" },
      { name: "Eyelash Lifting", price: "AED 120" },
      { name: "Eyebrow Lamination", price: "AED 120" },
      { name: "Eyelash Extension", price: "AED 120" },
      { name: "Basic Make-up", price: "AED 150" },
      { name: "Party Make-up", price: "AED 250" },
      { name: "Wedding Make-up", price: "AED 500" },
    ],
    note: "Featuring REFECTOCIL.",
  },
  {
    slug: "waxing",
    title: "Waxing / Threading / Shaving / Mousse / Bleach",
    icon: "waxing",
    blurb: "Smooth, Gentle & Hygienic",
    items: [
      { name: "Eyebrow Mousse", price: "AED 10" },
      { name: "Eyebrow Threading/Wax/Bleach", price: "AED 20" },
      { name: "Upper Lip", price: "AED 10" },
      { name: "Chin/Lower Lip", price: "AED 10" },
      { name: "Forehead", price: "AED 15" },
      { name: "Cheeks", price: "AED 20" },
      { name: "Nose", price: "AED 10" },
      { name: "Front Neck or Back Neck", price: "AED 20" },
      { name: "Chest", price: "AED 20" },
      { name: "Stomach", price: "AED 25" },
      { name: "Underarm", price: "AED 25" },
      { name: "Half Arms", price: "AED 40" },
      { name: "Full Face Mousse", price: "AED 40" },
      { name: "Full-Face Wax/Threading", price: "AED 60" },
      { name: "Half Legs", price: "AED 50" },
      { name: "Full Back", price: "AED 70" },
      { name: "Full Arms", price: "AED 70" },
      { name: "Bikini Wax", price: "AED 70" },
      { name: "Full Legs", price: "AED 90" },
      { name: "Half Body", price: "AED 100" },
      { name: "Full Body Bleaching or Polishing", price: "AED 100" },
      { name: "Full Body Waxing", price: "AED 200" },
      { name: "Full Body Waxing with Bikini", price: "AED 250" },
    ],
  },
];

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
