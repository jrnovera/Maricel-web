-- Maricel Beauty Center — blog posts
--
-- Same project as Artisan Salon, so this table is prefixed `mbc_` like the
-- rest of MBC's tables (see 0001_mbc.sql).

create table if not exists public.mbc_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  published_at date not null default current_date,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists mbc_blog_posts_published_idx
  on public.mbc_blog_posts (is_active, published_at desc, sort_order);

alter table public.mbc_blog_posts enable row level security;

drop policy if exists "mbc blog posts are publicly readable" on public.mbc_blog_posts;
create policy "mbc blog posts are publicly readable" on public.mbc_blog_posts
  for select using (is_active = true);

-- ---------------------------------------------------------------------------
-- Seed posts
-- ---------------------------------------------------------------------------
insert into public.mbc_blog_posts
  (slug, category, title, excerpt, content, image, published_at, sort_order) values
  (
    'skincare-tips-for-healthy-glowing-skin',
    'Skincare',
    '5 Skincare Tips for Healthy, Glowing Skin',
    'Discover simple yet effective skincare tips that can help you achieve radiant, healthy skin every day.',
    E'Great skin starts with consistency, not complicated routines. Here are five habits our estheticians recommend to every client:\n\n1. Cleanse both morning and night with a formula suited to your skin type — over-cleansing strips the barrier just as much as under-cleansing.\n2. Never skip SPF, even indoors. UV exposure through windows is the single biggest driver of premature aging we see.\n3. Introduce actives (retinol, vitamin C, acids) one at a time so you can tell what is working.\n4. Book a professional facial every four to six weeks to keep pores clear between at-home routines.\n5. Hydrate from the inside — skin is often the last organ to receive water, so drink more than you think you need.\n\nOur Skin Care & Facials menu is built around these same principles — ask your therapist which treatment matches your skin goals at your next visit.',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
    '2024-05-12',
    1
  ),
  (
    'best-hair-treatments-for-strong-shiny-hair',
    'Hair Care',
    'Best Hair Treatments for Strong, Shiny Hair',
    'Explore the best hair treatments that nourish, strengthen, and bring out the natural shine in your hair.',
    E'Whether your hair is color-treated, heat-styled, or naturally dry, the right treatment can transform its texture within a single visit.\n\nKeratin treatments smooth the cuticle and cut down on frizz for months at a time. Hair spa treatments use deep-conditioning masks to rebuild strength strand by strand. And a simple wash-and-blow finish with the right products can bring back shine lost to hard water or sun exposure.\n\nOur stylists assess porosity and damage before recommending a treatment, so you get a result suited to your hair rather than a one-size-fits-all fix.',
    'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80',
    '2024-05-10',
    2
  ),
  (
    'benefits-of-regular-massage-for-body-and-mind',
    'Wellness',
    'Benefits of Regular Massage for Body & Mind',
    'Learn how regular massage can reduce stress, ease tension, and improve your overall well-being.',
    E'Massage is one of the few treatments that benefits both body and mind in the same session. Regular sessions have been shown to lower cortisol, ease muscle tension built up from desk work or travel, and improve circulation.\n\nWe recommend a relaxing massage every two to four weeks as maintenance, with deep tissue or hot stone sessions added when you are carrying more tension than usual — after a stressful work week, a long flight, or an intense workout block.\n\nEven one session leaves most clients sleeping better that night, which is reason enough to make it a habit rather than an occasional treat.',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    '2024-05-08',
    3
  ),
  (
    'nail-care-101-keep-your-nails-healthy-and-beautiful',
    'Nail Care',
    'Nail Care 101: Keep Your Nails Healthy & Beautiful',
    'Essential nail care tips to keep your nails strong, polished, and beautiful all the time.',
    E'Healthy nails are the foundation of any manicure, gel or otherwise. A few habits go a long way: moisturize your cuticles daily, take a short break between gel applications so nails can breathe, and always let a professional remove gel rather than peeling it off at home — peeling takes several layers of nail with it.\n\nIf your nails are peeling or brittle, a course of nail-strengthening treatments alongside a biotin-rich diet usually shows results within a few weeks.',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
    '2024-05-06',
    4
  ),
  (
    'how-to-maintain-your-brows-and-lashes-perfectly',
    'Brows & Lashes',
    'How to Maintain Your Brows & Lashes Perfectly',
    'Tips and tricks to keep your brows full and lashes long for a naturally stunning look.',
    E'Brows and lashes frame the whole face, and a little upkeep between salon visits keeps results looking sharp.\n\nBrush brows upward daily to train the hairs and check shape every two to three weeks with a quick tidy-up. For lashes, a lash lift and tint gives you definition without extensions, while extensions themselves last longest when you avoid oil-based makeup removers near the lash line.\n\nBook a tint or lamination roughly every six weeks to keep both looking fresh between fuller treatments.',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    '2024-05-04',
    5
  ),
  (
    'self-care-rituals-for-a-more-confident-you',
    'Beauty Tips',
    'Self-Care Rituals for a More Confident You',
    'Simple self-care rituals that help you relax, recharge, and feel confident inside and out.',
    E'Self-care is less about grand gestures and more about small rituals you can keep up with. Light a candle during your evening skincare routine, take ten quiet minutes with a cup of tea before bed, or book one recurring appointment a month that is just for you.\n\nClients who treat their beauty routine as a ritual rather than a chore report feeling calmer and more confident day to day — the treatment itself is only part of the benefit.',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    '2024-05-02',
    6
  ),
  (
    'bridal-beauty-timeline-what-to-book-and-when',
    'Beauty Tips',
    'Bridal Beauty Timeline: What to Book and When',
    'A month-by-month guide to booking facials, hair and makeup trials so you look effortless on the day.',
    E'Start six months out with a skincare consultation so any treatments needing recovery time (peels, facials with actives) are well finished before the big day. Book your hair and makeup trial two to three months ahead, alongside any color or keratin treatment. In the final week, keep it simple: a manicure, a light facial, and an early night — the trial run should have already ironed out the details.',
    'https://images.unsplash.com/photo-1523268755815-fe7c372a0349?auto=format&fit=crop&w=900&q=80',
    '2024-04-28',
    7
  ),
  (
    'guinot-vs-dr-renaud-choosing-your-facial',
    'Skincare',
    'GUINOT vs Dr. Renaud: Choosing Your Facial',
    'Two premium facial brands, two different strengths — here is how to pick between them.',
    E'GUINOT facials focus on hydro-radiance and lifting techniques that give an immediate glow, ideal before an event. Dr. Renaud leans into results-driven, active-ingredient formulas better suited to ongoing concerns like pigmentation or acne-prone skin.\n\nIf you are treating a specific, longer-term concern, Dr. Renaud is usually the better starting point; if you want an instant refresh, GUINOT delivers that same-day radiance.',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    '2024-04-22',
    8
  ),
  (
    'waxing-aftercare-avoiding-irritation',
    'Beauty Tips',
    'Waxing Aftercare: Avoiding Irritation',
    'A few simple steps after your wax appointment keep skin smooth and bump-free for longer.',
    E'Skip hot showers, saunas, and tight clothing for the first 24 hours after waxing — heat and friction are the main causes of post-wax irritation. Exfoliate gently a few days later to prevent ingrown hairs, and moisturize daily in between visits. Most clients see the smoothest results by keeping to a regular four-week cycle rather than waxing sporadically.',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
    '2024-04-15',
    9
  )
on conflict (slug) do nothing;
