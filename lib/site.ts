export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  {
    href: "/our-team",
    label: "Our Team",
    children: [
      { href: "/our-team", label: "Our Team" },
      { href: "/careers", label: "Careers" },
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003";

export const siteName = "Maricel Beauty Center";

export const contact = {
  phone: "+971 50 123 4567",
  phoneHref: "tel:+971501234567",
  email: "info@maricelbeauty.ae",
  address: "Dubai, United Arab Emirates",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "12:00 PM – 6:00 PM" },
  ],
};

export const images = {
  heroWoman:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  aboutWoman:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1000&q=80",
  interior:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  interior2:
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
  facial:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  spaTowels:
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1400&q=80",
  massage:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  nails:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  hair: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80",
  makeup:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  lashes:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
  bridal:
    "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?auto=format&fit=crop&w=1000&q=80",
  skincare:
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
  ],
};

export const galleryCategories = [
  "All",
  "Salon Interior",
  "Hair",
  "Nails",
  "Skin Care",
  "Brows & Lashes",
  "Makeup",
  "Spa",
] as const;

export type GalleryEntry = {
  src: string;
  caption: string;
  category: string;
};

/** Fallback set shown until staff upload photos in the portal. */
export const galleryItems: GalleryEntry[] = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    caption: "Luxury Salon Interior",
    category: "Salon Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    caption: "Treatment Room",
    category: "Salon Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
    caption: "Hair Transformation",
    category: "Hair",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    caption: "Luxury Nail Care",
    category: "Nails",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    caption: "Facial Experience",
    category: "Skin Care",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    caption: "Brows & Lashes",
    category: "Brows & Lashes",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    caption: "Relaxing Spa",
    category: "Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?auto=format&fit=crop&w=800&q=80",
    caption: "Bridal Beauty",
    category: "Makeup",
  },
  {
    src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    caption: "Premium Products",
    category: "Skin Care",
  },
  {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    caption: "Elegant Waiting Area",
    category: "Salon Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    caption: "Glossy Hair Result",
    category: "Hair",
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    caption: "Flawless Makeup",
    category: "Makeup",
  },
];

export const founder = {
  name: "Maricel Domingo",
  role: "Founder & Beauty Expert",
  image:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
};

export type TeamMember = { name: string; role: string; image: string };

/**
 * Staff grouped the way the Our Team page presents them. Portraits are stock
 * placeholders — drop each person's real photo in over the `image` URL.
 */
export const teamGroups: {
  label: string;
  icon: string;
  members: TeamMember[];
}[] = [
  {
    label: "Therapists",
    icon: "lotus",
    members: [
      {
        name: "Rowena",
        role: "Massage Therapist",
        image:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Jessa",
        role: "Massage Therapist",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Lovely",
        role: "Massage Therapist",
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Catherine",
        role: "Lymphatic Specialist",
        image:
          "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Mary Grace",
        role: "Therapist",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    label: "Beauty Specialists",
    icon: "skin",
    members: [
      {
        name: "Aiza",
        role: "Skin Care Specialist",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Lyn",
        role: "Skin Care Specialist",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Shiela",
        role: "Nail Technician",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Rhea",
        role: "Nail Technician",
        image:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    label: "Support Team",
    icon: "sparkle",
    members: [
      {
        name: "Angel",
        role: "Front Desk Coordinator",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Mitch",
        role: "Front Desk Assistant",
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "April",
        role: "Housekeeping Staff",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

/** Flat list, for anything that just needs "everyone". */
export const team: TeamMember[] = teamGroups.flatMap((g) => g.members);

export const careers = {
  eyebrow: "Careers",
  title: "Join Our Team",
  body: "Be part of a team that is passionate about beauty, wellness and making every client feel their best.",
  perks: [
    {
      icon: "hands",
      title: "Supportive Team",
      desc: "A warm, collaborative environment that feels like family.",
    },
    {
      icon: "sparkle",
      title: "Growth Opportunities",
      desc: "Room to progress as the salon and your skills grow.",
    },
    {
      icon: "quality",
      title: "Training & Development",
      desc: "Ongoing training with premium brands and techniques.",
    },
    {
      icon: "crown",
      title: "Rewarding Career",
      desc: "Attractive salary, tips and performance incentives.",
    },
  ],
  openings: [
    "Hair Stylist",
    "Nail Technician",
    "Lash & Brow Artist",
    "Massage Therapist",
    "Front Desk Receptionist",
  ],
};

/** Full role listings for the dedicated /careers page. */
export const careerRoles: {
  title: string;
  icon: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
}[] = [
  {
    title: "Massage Therapist",
    icon: "lotus",
    type: "Full-time",
    experience: "2+ years",
    summary:
      "Relaxing, deep tissue and hot stone massage in a calm treatment room.",
    responsibilities: [
      "Deliver relaxing, deep tissue and hot stone treatments",
      "Adapt pressure and technique to each client's needs",
      "Keep the treatment room prepared and spotless",
    ],
  },
  {
    title: "Skin Care Specialist",
    icon: "skin",
    type: "Full-time",
    experience: "2+ years",
    summary:
      "Facials and skin treatments using GUINOT, Dr Renaud and Cellula Madre.",
    responsibilities: [
      "Assess skin type and recommend a suitable treatment plan",
      "Perform facials, peels and advanced skin treatments",
      "Advise clients on home care between appointments",
    ],
  },
  {
    title: "Nail Technician",
    icon: "nails",
    type: "Full-time / Part-time",
    experience: "1+ year",
    summary:
      "Manicures, pedicures, gel and extensions using OPI, Essie, ORLY and Bio Sculpture.",
    responsibilities: [
      "Perform manicures, pedicures, gel application and nail art",
      "Maintain strict tool sterilisation and hygiene standards",
      "Advise clients on aftercare between appointments",
    ],
  },
  {
    title: "Hair Stylist",
    icon: "hair",
    type: "Full-time / Part-time",
    experience: "2+ years",
    summary:
      "Cutting, colouring, keratin and styling for a loyal client base, working with Kemon and evo.",
    responsibilities: [
      "Consult on cut, colour and treatment suited to each client's hair",
      "Deliver colour, keratin and hair spa services to salon standard",
      "Keep up with training on new techniques and products",
    ],
  },
  {
    title: "Front Desk / Receptionist",
    icon: "personal",
    type: "Full-time / Part-time",
    experience: "Entry level welcome",
    summary:
      "The first face clients see — bookings, enquiries and keeping the day running smoothly.",
    responsibilities: [
      "Greet clients and manage the appointment diary",
      "Answer calls, WhatsApp and website enquiries",
      "Handle payments and support the team through the day",
    ],
  },
];

export const testimonials = [
  {
    name: "Amira Al Farsi",
    role: "Regular Client",
    quote:
      "Maricel Beauty Center is my monthly reset. The team is so attentive and the results always exceed what I imagined.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sofia Martinez",
    role: "Bridal Client",
    quote:
      "They did my bridal makeup and hair — I felt like the best version of myself on my wedding day. Truly grateful!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Grace Tan",
    role: "Facial & Skincare",
    quote:
      "The facials here are next level. Clean, relaxing space and products that actually work. Highly recommend.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
];

export const brands = [
  "OPI",
  "ESSIE",
  "ORLY",
  "EVO",
  "Therma Bliss",
  "HISTEMO",
  "CellulaMadre",
  "SSBB",
  "Dr. Renaud",
  "LOTUS",
  "GUINOT",
  "REFECTOCIL",
];

/**
 * Hand-drawn approximations of each brand's wordmark, not the official logo
 * files. Drop the licensed vector art into /public/brands over these when the
 * distributor supplies it — the filenames are the only contract.
 */
export const brandLogos: { name: string; src: string }[] = [
  { name: "Kemon", src: "/brands/kemon.svg" },
  { name: "OPI", src: "/brands/opi.svg" },
  { name: "Essie", src: "/brands/essie.svg" },
  { name: "ORLY", src: "/brands/orly.svg" },
  { name: "evo", src: "/brands/evo.svg" },
  { name: "Bio Sculpture", src: "/brands/bio-sculpture.svg" },
  { name: "Guinot", src: "/brands/guinot.svg" },
  { name: "Lotus Herbals", src: "/brands/lotus.svg" },
  { name: "Dr Renaud", src: "/brands/dr-renaud.svg" },
  { name: "RefectoCil", src: "/brands/refectocil.svg" },
  { name: "Therma Bliss", src: "/brands/therma-bliss.svg" },
  { name: "Histemo", src: "/brands/histemo.svg" },
  { name: "Cellula Madre", src: "/brands/cellula-madre.svg" },
  { name: "SSBB", src: "/brands/ssbb.svg" },
];
