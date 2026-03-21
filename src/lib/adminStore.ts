// ─────────────────────────────────────────────────────────────────────────────
// Admin Store — localStorage v1 (Supabase-ready interface)
// To migrate to Supabase: replace store.* implementations below.
// All type interfaces and calling code stay identical.
// ─────────────────────────────────────────────────────────────────────────────

export const ADMIN_PASSWORD = "evolve2025";
export const AUTH_KEY = "e2p_admin_auth";
export const STORE_KEY = "e2p_admin_store";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  shortName: string;
  price: number;
  category: "physical" | "digital" | "bundle";
  status: "active" | "coming_soon" | "inactive";
  badge?: string;
  description: string;
  sales: number;
  revenue: number;
}

export interface Bundle {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  items: string[];
  badge?: string;
  description: string;
  status: "active" | "inactive";
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  productId: string;
  amount: number;
  status: "pending" | "processing" | "fulfilled" | "refunded";
  date: string;
  notes?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  joinedAt: string;
  source: "homepage" | "free-guide" | "programs" | "footer" | "shop" | "manual";
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  eventType: string;
  audienceSize: string;
  eventDate: string;
  details: string;
  status: "new" | "reviewing" | "confirmed" | "declined";
  submittedAt: string;
  notes?: string;
}

export interface CommunityApplication {
  id: string;
  name: string;
  email: string;
  reason: string;
  appliedAt: string;
  status: "pending" | "approved" | "declined";
}

export interface ProgramEnrollment {
  id: string;
  name: string;
  email: string;
  program: string;
  amount: number;
  enrolledAt: string;
  status: "active" | "completed" | "paused";
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
  transformation: string;
  program: string;
  featured: boolean;
  order: number;
}

export interface SpeakingTopic {
  id: string;
  title: string;
  desc: string;
  order: number;
}

export interface EventFormat {
  id: string;
  label: string;
  detail: string;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "programs" | "community" | "general";
  order: number;
}

export interface CommunityPost {
  id: string;
  content: string;
  author: string;
  type: "announcement" | "inspiration" | "resource";
  pinned: boolean;
  createdAt: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  format: "zoom" | "in-person" | "both";
  link?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  externalLink?: string;
  type: "pdf" | "audio" | "video" | "link" | "workbook";
  addedAt: string;
}

export interface PlatformSettings {
  contactEmail: string;
  bookingEmail: string;
  socialInstagram: string;
  socialYoutube: string;
  socialFacebook: string;
  adminPassword: string;
}

export interface AdminStoreData {
  products: Product[];
  bundles: Bundle[];
  orders: Order[];
  subscribers: Subscriber[];
  bookings: BookingInquiry[];
  communityApps: CommunityApplication[];
  enrollments: ProgramEnrollment[];
  testimonials: Testimonial[];
  speakingTopics: SpeakingTopic[];
  eventFormats: EventFormat[];
  faqs: FAQ[];
  communityPosts: CommunityPost[];
  communityEvents: CommunityEvent[];
  resources: Resource[];
  settings: PlatformSettings;
  initialized: boolean;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
  { id: "p1", name: "Healing & Alignment Journal", shortName: "H&A Journal", price: 34.99, category: "physical", status: "active", badge: "Bestseller", description: "A guided journal for deep healing and spiritual alignment.", sales: 142, revenue: 4968.58 },
  { id: "p2", name: "Breaking Cycles Workbook", shortName: "Cycles Workbook", price: 24.99, category: "physical", status: "active", description: "Practical exercises to identify and break recurring life patterns.", sales: 98, revenue: 2449.02 },
  { id: "p3", name: "Declaration & Affirmation Card Deck", shortName: "Card Deck", price: 19.99, category: "physical", status: "active", badge: "New", description: "52 affirmation cards rooted in scripture and purpose.", sales: 74, revenue: 1479.26 },
  { id: "p4", name: "Purpose Activation Masterclass", shortName: "Masterclass", price: 97.00, category: "digital", status: "active", description: "5-module digital course for purpose-driven transformation.", sales: 61, revenue: 5917.00 },
  { id: "p5", name: "Inner Restoration Audio Collection", shortName: "Audio Collection", price: 29.99, category: "digital", status: "active", description: "12 guided audio tracks for healing and restoration.", sales: 83, revenue: 2489.17 },
  { id: "p6", name: "Anointing Oil 'Restoration'", shortName: "Anointing Oil", price: 22.00, category: "physical", status: "coming_soon", description: "Hand-crafted anointing oil for intentional prayer rituals.", sales: 0, revenue: 0 },
];

const SEED_BUNDLES: Bundle[] = [
  { id: "b1", name: "The Starter Kit", price: 49.99, originalPrice: 54.98, items: ["Healing & Alignment Journal", "Declaration & Affirmation Card Deck"], badge: "Bundle", description: "Journal + Card Deck bundle. Save $5.", status: "active" },
  { id: "b2", name: "The Deep-Work Bundle", price: 64.99, originalPrice: 74.97, items: ["Healing & Alignment Journal", "Breaking Cycles Workbook", "Declaration & Affirmation Card Deck"], badge: "Best Value", description: "Journal + Workbook + Card Deck. Save $10.", status: "active" },
  { id: "b3", name: "The Complete Toolkit", price: 174.99, originalPrice: 206.96, items: ["Healing & Alignment Journal", "Breaking Cycles Workbook", "Declaration & Affirmation Card Deck", "Purpose Activation Masterclass", "Inner Restoration Audio Collection"], badge: "All-In", description: "All 5 digital & physical items. Save $32.", status: "active" },
];

const SEED_TESTIMONIALS: Testimonial[] = [
  { id: "t0", quote: "I came to Sarah completely shattered. I had built what everyone thought was a successful life — but inside I was hollow. Three months into working with her, something cracked open that I didn't even know was locked. She didn't just help me heal. She helped me find out who I actually am. I don't know who I would be without this work.", name: "Keisha L.", detail: "1:1 Coaching — 6-Month Journey", transformation: "From functioning but empty, to fully alive and leading", program: "1:1 Deep-Dive Coaching", featured: true, order: 0 },
  { id: "t1", quote: "Sarah's guidance helped me see what I'd been carrying for years. For the first time in my life, I feel truly free to walk in my purpose. My family can feel the difference.", name: "Tamara J.", detail: "Healed from 15 years of unforgiveness", transformation: "From bitterness to radical freedom", program: "Group Program", featured: false, order: 1 },
  { id: "t2", quote: "I didn't know healing could feel this safe. Through the 4-Step Framework, I finally broke the cycle that had haunted three generations of my family. My daughters will not carry what I carried.", name: "Michelle R.", detail: "Mother of 3, generational cycle breaker", transformation: "From generational trauma to generational blessing", program: "Healing Intensive", featured: false, order: 2 },
  { id: "t3", quote: "Working with Sarah changed everything. I went from barely surviving to thriving — emotionally, professionally, and in my relationships. I launched my business within 6 months of completing the program.", name: "Denise W.", detail: "Purpose-activated entrepreneur", transformation: "From survival mode to purpose activation", program: "1:1 Coaching", featured: false, order: 3 },
  { id: "t4", quote: "The Purpose Clarity Session alone was worth more than two years of therapy I'd been through. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction.", name: "Angela M.", detail: "Found clarity and a new sense of direction", transformation: "From confusion to decisive clarity", program: "Purpose Clarity Session", featured: false, order: 4 },
  { id: "t5", quote: "I was skeptical. After going through the Healing Intensive, I released 20 years of pain in 2 days. I didn't even know I was carrying that much weight until it was gone.", name: "Priscilla T.", detail: "Healing Intensive graduate", transformation: "From hidden pain to visible freedom", program: "Healing Intensive", featured: false, order: 5 },
  { id: "t6", quote: "Sarah never let me hide in my story. She pushed me — with love — to own my part and stop waiting for someone else to fix what only I could fix. That accountability changed my life.", name: "Renee B.", detail: "Accountability transformed her relationships", transformation: "From victimhood to ownership", program: "Group Program", featured: false, order: 6 },
  { id: "t7", quote: "The community that surrounds Sarah's work is unlike anything I've ever experienced. I came for coaching and left with a sisterhood that still holds me accountable today.", name: "Tanya M.", detail: "Still an active community member after 2 years", transformation: "From isolation to deep community", program: "Group Program", featured: false, order: 7 },
  { id: "t8", quote: "I never understood why I kept blowing up the good things in my life until Sarah helped me see my triggers. That single insight — understanding where my reactions were coming from — flipped everything.", name: "Cynthia A.", detail: "Broke a decade-long pattern of self-sabotage", transformation: "From reactive to intentional", program: "1:1 Coaching", featured: false, order: 8 },
  { id: "t9", quote: "I applied everything Sarah taught me — and then I started teaching it to others. I now lead a small group in my community using the same 4 steps. My pain became my platform.", name: "LaShonda K.", detail: "Now a community group leader", transformation: "From student to teacher", program: "Group Program", featured: false, order: 9 },
];

const SEED_SPEAKING_TOPICS: SpeakingTopic[] = [
  { id: "st1", title: "Lead in Love", desc: "How choosing love over reaction transforms relationships, leadership, and personal outcomes.", order: 0 },
  { id: "st2", title: "The Accountability Advantage", desc: "Why taking radical ownership is the fastest path to freedom, healing, and next-level growth.", order: 1 },
  { id: "st3", title: "Mastering Your Triggers", desc: "Understanding the emotional wounds beneath reactive behavior — and practical tools to break the cycle.", order: 2 },
  { id: "st4", title: "From Hurt to Helper", desc: "How your deepest wounds become your greatest gift when you learn to share what you've survived.", order: 3 },
  { id: "st5", title: "Evolve 2 Purpose", desc: "The full 4-step transformation framework as a keynote or workshop experience for your audience.", order: 4 },
  { id: "st6", title: "Healing Generational Cycles", desc: "Breaking the inherited patterns that silently shape behavior, relationships, and destiny.", order: 5 },
];

const SEED_EVENT_FORMATS: EventFormat[] = [
  { id: "ef1", label: "Keynote Address", detail: "45 – 90 minutes", order: 0 },
  { id: "ef2", label: "Workshop / Breakout", detail: "2 – 4 hours", order: 1 },
  { id: "ef3", label: "Full-Day Retreat", detail: "6 – 8 hours", order: 2 },
  { id: "ef4", label: "Panel / Fireside Chat", detail: "30 – 60 minutes", order: 3 },
  { id: "ef5", label: "Corporate Training", detail: "Half or full day", order: 4 },
  { id: "ef6", label: "Virtual / Livestream", detail: "Any format", order: 5 },
];

const SEED_FAQS: FAQ[] = [
  { id: "faq1", question: "What types of events does Sarah speak at?", answer: "Sarah speaks at women's conferences, corporate leadership retreats, church events, university programs, community summits, and private organizational gatherings. If it involves transformation, growth, and purpose — she's the right fit.", category: "booking", order: 0 },
  { id: "faq2", question: "How far in advance should we book?", answer: "We recommend submitting an inquiry at least 6–8 weeks before your event date. For major conferences or signature events, 3–6 months ahead is ideal to ensure availability.", category: "booking", order: 1 },
  { id: "faq3", question: "Does Sarah offer virtual presentations?", answer: "Yes. Sarah delivers powerful virtual keynotes and workshops via Zoom, Teams, or your platform of choice — with the same energy and impact as in-person.", category: "booking", order: 2 },
  { id: "faq4", question: "Can we customize the topic for our audience?", answer: "Absolutely. Sarah works closely with event organizers to tailor her message to your audience's specific needs, industry context, and desired outcomes.", category: "booking", order: 3 },
];

const SEED_COMMUNITY_POSTS: CommunityPost[] = [
  { id: "cp1", content: "Good morning, purpose family! Starting this week with a reminder: your healing is not just for you. Every step forward you take creates a path for someone behind you. Walk boldly.", author: "Sarah Adams", type: "inspiration", pinned: true, createdAt: new Date(Date.now() - 86400000).toISOString().split("T")[0] },
  { id: "cp2", content: "NEW RESOURCE DROPPED: The Trigger Mapping Worksheet is now available in the library. This tool changed my life and I know it will shift yours too. Go get it!", author: "Sarah Adams", type: "resource", pinned: false, createdAt: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0] },
  { id: "cp3", content: "Monthly accountability circles are now forming for April. Drop a comment if you want to be matched. Limited to groups of 5.", author: "Sarah Adams", type: "announcement", pinned: false, createdAt: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0] },
];

const SEED_COMMUNITY_EVENTS: CommunityEvent[] = [
  { id: "ce1", title: "Monthly Live Q&A with Sarah", description: "Bring your questions, your struggles, and your wins. We go live every first Tuesday.", date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0], time: "7:00 PM EST", format: "zoom", link: "https://zoom.us/j/example" },
  { id: "ce2", title: "Healing Workshop: Managing Triggers", description: "Deep-dive workshop on the 4-step trigger management process with live coaching.", date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0], time: "6:00 PM EST", format: "zoom" },
  { id: "ce3", title: "Accountability Circle Kickoff", description: "New circles forming this month. Meet your accountability sisters and get started.", date: new Date(Date.now() + 21 * 86400000).toISOString().split("T")[0], time: "5:00 PM EST", format: "zoom" },
];

const SEED_RESOURCES: Resource[] = [
  { id: "r1", title: "Trigger Mapping Worksheet", description: "Identify your core triggers and trace them to their root wounds.", category: "Healing Tools", type: "pdf", addedAt: "2025-10-01" },
  { id: "r2", title: "Morning Alignment Ritual Guide", description: "A 7-minute daily practice to start every day in alignment.", category: "Daily Practices", type: "pdf", addedAt: "2025-10-15" },
  { id: "r3", title: "Accountability Partner Agreement Template", description: "A structured template for your accountability circle commitments.", category: "Community Tools", type: "workbook", addedAt: "2025-11-01" },
  { id: "r4", title: "Healing Meditation: Releasing Unforgiveness", description: "25-minute guided audio meditation for releasing bitterness and wounds.", category: "Meditations", type: "audio", addedAt: "2025-11-15" },
  { id: "r5", title: "Framework Deep Dive: Lead in Love", description: "Extended teaching on Step 1 — choosing love over reaction.", category: "Framework Teachings", type: "video", addedAt: "2025-12-01" },
];

const SEED_SETTINGS: PlatformSettings = {
  contactEmail: "hello@evolve2purpose.com",
  bookingEmail: "bookings@evolve2purpose.com",
  socialInstagram: "https://instagram.com/evolve2purpose",
  socialYoutube: "https://youtube.com/@evolve2purpose",
  socialFacebook: "https://facebook.com/evolve2purpose",
  adminPassword: ADMIN_PASSWORD,
};

const names = [
  ["Amara Johnson", "amara.j@gmail.com"],
  ["Keisha Williams", "keishawill@yahoo.com"],
  ["Destiny Thompson", "destiny.t@gmail.com"],
  ["Brianna Davis", "briannad@outlook.com"],
  ["Monique Harris", "moni.harris@gmail.com"],
  ["Latoya Wilson", "latoyaw@icloud.com"],
  ["Simone Martinez", "simonem@gmail.com"],
  ["Jasmine Anderson", "jasmine.a@yahoo.com"],
  ["Tasha Brown", "tashabrown@gmail.com"],
  ["Crystal Jackson", "crystalj@outlook.com"],
  ["Michelle Moore", "mmichelle@gmail.com"],
  ["Nadia Taylor", "nadia.t@icloud.com"],
  ["Priya Patel", "priyap@gmail.com"],
  ["Shanice Lewis", "shanice.l@yahoo.com"],
  ["Raven Clark", "ravenc@gmail.com"],
  ["Gabrielle Robinson", "gabby.r@gmail.com"],
  ["Aisha Walker", "aishawalker@icloud.com"],
  ["Dominique Hall", "dom.hall@gmail.com"],
  ["Tiffany Young", "tiff.young@yahoo.com"],
  ["Vanessa Allen", "vanessa.a@gmail.com"],
  ["Chantel Wright", "chantelw@gmail.com"],
  ["Nicole King", "nicoleking@outlook.com"],
  ["Tamara Scott", "tamara.s@gmail.com"],
  ["Kayla Green", "kaylag@icloud.com"],
  ["Serena Baker", "serena.b@gmail.com"],
  ["Alicia Foster", "alicia.f@gmail.com"],
  ["Maya Richardson", "maya.r@yahoo.com"],
  ["Danielle Cooper", "danielle.c@gmail.com"],
  ["Imani Reeves", "imani.r@icloud.com"],
  ["Zoe Campbell", "zoe.c@gmail.com"],
];

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

const SEED_ORDERS: Order[] = names.slice(0, 30).map((n, i) => ({
  id: `ORD-${1000 + i}`,
  customer: n[0],
  email: n[1],
  product: SEED_PRODUCTS[i % 6].name,
  productId: SEED_PRODUCTS[i % 6].id,
  amount: SEED_PRODUCTS[i % 6].price,
  status: (["fulfilled", "fulfilled", "fulfilled", "processing", "pending", "refunded"][i % 6]) as Order["status"],
  date: daysAgo(i * 3),
}));

const allNames = [
  ...names,
  ["Faith Morgan", "faith.m@gmail.com"], ["Hope Thomas", "hope.t@yahoo.com"],
  ["Grace Evans", "grace.e@gmail.com"], ["Joy Simmons", "joy.s@icloud.com"],
  ["Love Patterson", "love.p@gmail.com"], ["Peace Howard", "peace.h@outlook.com"],
  ["Truth Murphy", "truth.m@gmail.com"], ["Wisdom Collins", "wisdom.c@yahoo.com"],
  ["Glory Sanders", "glory.s@gmail.com"], ["Praise Jenkins", "praise.j@icloud.com"],
  ["Miracle Powell", "miracle.p@gmail.com"], ["Blessing Rogers", "blessing.r@yahoo.com"],
  ["Eden Perry", "eden.p@gmail.com"], ["Zara Bell", "zara.b@outlook.com"],
  ["Lyra Hughes", "lyra.h@gmail.com"], ["Nova Griffin", "nova.g@icloud.com"],
  ["Stella Diaz", "stella.d@gmail.com"], ["Luna Hayes", "luna.h@yahoo.com"],
  ["Aurora Price", "aurora.p@gmail.com"], ["Celeste Myers", "celeste.m@outlook.com"],
  ["Ivy Long", "ivy.l@gmail.com"], ["Lily Butler", "lily.b@icloud.com"],
  ["Rose Kelly", "rose.k@gmail.com"], ["Violet Simmons", "violet.s@yahoo.com"],
  ["Iris Turner", "iris.t@gmail.com"], ["Daisy Phillips", "daisy.p@outlook.com"],
  ["Poppy Torres", "poppy.t@gmail.com"], ["Sage Henderson", "sage.h@icloud.com"],
  ["River Coleman", "river.c@gmail.com"], ["Skye Powell", "skye.p@yahoo.com"],
  ["Ocean Gray", "ocean.g@gmail.com"], ["Meadow James", "meadow.j@outlook.com"],
  ["Haven Watson", "haven.w@gmail.com"], ["Eden Brooks", "eden.b@icloud.com"],
  ["Ember Sullivan", "ember.s@gmail.com"], ["Wren Foster", "wren.f@yahoo.com"],
  ["Fern Barnes", "fern.b@gmail.com"], ["Dawn Mitchell", "dawn.m@outlook.com"],
  ["Aria Thompson", "aria.t@gmail.com"], ["Cleo Harrison", "cleo.h@icloud.com"],
  ["Nora Washington", "nora.w@gmail.com"], ["Luna Adams", "luna.a@yahoo.com"],
  ["Jade Jackson", "jade.j@gmail.com"], ["Ivy Carter", "ivy.c@outlook.com"],
  ["Mia Evans", "mia.e@gmail.com"], ["Zoe Lewis", "zoe.l@icloud.com"],
  ["Ella Robinson", "ella.r@gmail.com"], ["Ava Walker", "ava.w@yahoo.com"],
  ["Lily Hall", "lily.h@gmail.com"], ["Chloe Young", "chloe.y@outlook.com"],
];

const sources: Subscriber["source"][] = ["homepage", "free-guide", "programs", "footer", "shop"];
const SEED_SUBSCRIBERS: Subscriber[] = allNames.slice(0, 80).map((n, i) => ({
  id: `SUB-${i + 1}`,
  name: n[0],
  email: n[1],
  joinedAt: daysAgo(Math.floor(Math.random() * 120)),
  source: sources[i % 5],
}));

const eventOrgs = [
  ["Women of Faith Conference", "Annual Women's Summit"],
  ["Tabernacle Community Church", "Sunday Services Weekend"],
  ["Inspire Her Corporate Initiative", "Leadership Development Day"],
  ["Kingdom Women Arise", "Annual Retreat"],
  ["Grace & Glory Ministries", "Evening of Healing"],
  ["Black Women Lead Forum", "Opening Keynote"],
  ["New Season Church", "Women's Conference"],
  ["Purpose & Power Summit", "Main Stage Speaker"],
  ["Heal & Rise Collective", "Workshop Session"],
  ["Corporate Wellness Summit", "Breakout Speaker"],
  ["CrossRoads Fellowship", "Revival Weekend"],
  ["Unstoppable Women Network", "Gala Dinner Keynote"],
];

const SEED_BOOKINGS: BookingInquiry[] = eventOrgs.map((org, i) => ({
  id: `BKG-${i + 1}`,
  name: allNames[i][0],
  email: allNames[i][1],
  organization: org[0],
  eventType: ["Women's Conference", "Corporate Training", "Church Workshop", "Keynote", "Retreat"][i % 5],
  audienceSize: ["50-100", "100-250", "250-500", "500+", "25-50"][i % 5],
  eventDate: daysAgo(-(30 + i * 14)),
  details: org[1] + ". We would love to have Sarah speak on transformation and purpose. Please let us know your availability and fees.",
  status: (["new", "reviewing", "confirmed", "new", "reviewing", "confirmed", "new", "reviewing", "declined", "new", "confirmed", "reviewing"][i]) as BookingInquiry["status"],
  submittedAt: daysAgo(i * 5 + 2),
}));

const reasons = [
  "I've been struggling with breaking cycles in my relationships and I know I need community around me to grow.",
  "Sarah's content on Instagram changed my life. I want to be part of a community of women who are serious about healing.",
  "I've been in therapy but I need more — I want spiritual community and accountability with other women on this journey.",
  "I'm a single mother trying to break generational patterns and I believe this community is the support I need.",
  "I've followed Sarah for two years. Her framework gave me language for what I was experiencing. I'm ready to go deeper.",
  "I went through a painful divorce and I'm rebuilding. I need women who understand healing from the inside out.",
  "I'm a pastor's wife and I feel isolated. I need a safe space where I can be honest about my own struggles.",
  "I've done the free guide three times. I need accountability and real community to keep going.",
  "God put it on my heart to join. I've been praying about this for three months and I feel this is my yes.",
  "I'm in ministry and I feel burned out. I believe this community will help me pour back into myself.",
  "I just got out of a toxic relationship and I'm doing the work. I want to surround myself with women doing the same.",
  "My counselor recommended Sarah's work and I've consumed everything. Joining feels like the next right step.",
  "I'm a healthcare worker and I've been running on empty for years. I need healing and community desperately.",
  "I've been isolating since my trauma and I know community is part of my healing path.",
  "I want to be held accountable as I work through the 4-step framework. I can't do this alone anymore.",
  "Sarah speaks my language. I've never felt seen like this before and I want to be around more women like me.",
  "I'm coming out of depression and I believe community will be my lifeline.",
  "I'm a coach myself and I want to model the healing work I encourage others to do.",
  "After losing my mother I found Sarah's content. I believe this community will help me find myself again.",
  "I've been on the outside looking in at this community for a year. I'm finally ready to say yes.",
];

const SEED_COMMUNITY: CommunityApplication[] = allNames.slice(0, 20).map((n, i) => ({
  id: `APP-${i + 1}`,
  name: n[0],
  email: n[1],
  reason: reasons[i],
  appliedAt: daysAgo(i * 3 + 1),
  status: (["pending", "approved", "approved", "declined", "pending", "approved", "pending", "approved", "pending", "approved", "pending", "approved", "declined", "pending", "approved", "pending", "approved", "pending", "pending", "approved"][i]) as CommunityApplication["status"],
}));

const PROGRAMS = [
  "1:1 Deep-Dive Coaching",
  "Evolve 2 Purpose Group Program",
  "Purpose Clarity Session",
  "Healing Intensive Weekend",
];
const programPrices = [0, 497, 197, 997];

const SEED_ENROLLMENTS: ProgramEnrollment[] = allNames.slice(0, 25).map((n, i) => ({
  id: `ENR-${i + 1}`,
  name: n[0],
  email: n[1],
  program: PROGRAMS[i % 4],
  amount: i % 4 === 0 ? [1500, 2000, 2500, 1800][i % 4] : programPrices[i % 4],
  enrolledAt: daysAgo(i * 4 + 3),
  status: (["active", "active", "completed", "active", "paused"][i % 5]) as ProgramEnrollment["status"],
}));

export const REVENUE_CHART = [
  { month: "Apr", revenue: 820 },
  { month: "May", revenue: 1140 },
  { month: "Jun", revenue: 1390 },
  { month: "Jul", revenue: 1820 },
  { month: "Aug", revenue: 2050 },
  { month: "Sep", revenue: 2340 },
  { month: "Oct", revenue: 2780 },
  { month: "Nov", revenue: 3120 },
  { month: "Dec", revenue: 3850 },
  { month: "Jan", revenue: 3420 },
  { month: "Feb", revenue: 3980 },
  { month: "Mar", revenue: 4230 },
];

// ─── Store (localStorage CRUD) ────────────────────────────────────────────────

function load(): AdminStoreData {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as AdminStoreData;
  } catch {}
  return {
    products: [], bundles: [], orders: [], subscribers: [], bookings: [],
    communityApps: [], enrollments: [], testimonials: [], speakingTopics: [],
    eventFormats: [], faqs: [], communityPosts: [], communityEvents: [],
    resources: [], settings: SEED_SETTINGS, initialized: false,
  };
}

function save(data: AdminStoreData) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function initStore() {
  const data = load();
  if (data.initialized) {
    // Migrate: fill any newly added collections that are missing
    if (!data.bundles?.length) data.bundles = SEED_BUNDLES;
    if (!data.testimonials?.length) data.testimonials = SEED_TESTIMONIALS;
    if (!data.speakingTopics?.length) data.speakingTopics = SEED_SPEAKING_TOPICS;
    if (!data.eventFormats?.length) data.eventFormats = SEED_EVENT_FORMATS;
    if (!data.faqs?.length) data.faqs = SEED_FAQS;
    if (!data.communityPosts?.length) data.communityPosts = SEED_COMMUNITY_POSTS;
    if (!data.communityEvents?.length) data.communityEvents = SEED_COMMUNITY_EVENTS;
    if (!data.resources?.length) data.resources = SEED_RESOURCES;
    if (!data.settings) data.settings = SEED_SETTINGS;
    save(data);
    return;
  }
  Object.assign(data, {
    products: SEED_PRODUCTS, bundles: SEED_BUNDLES, orders: SEED_ORDERS,
    subscribers: SEED_SUBSCRIBERS, bookings: SEED_BOOKINGS,
    communityApps: SEED_COMMUNITY, enrollments: SEED_ENROLLMENTS,
    testimonials: SEED_TESTIMONIALS, speakingTopics: SEED_SPEAKING_TOPICS,
    eventFormats: SEED_EVENT_FORMATS, faqs: SEED_FAQS,
    communityPosts: SEED_COMMUNITY_POSTS, communityEvents: SEED_COMMUNITY_EVENTS,
    resources: SEED_RESOURCES, settings: SEED_SETTINGS, initialized: true,
  });
  save(data);
}

export const store = {
  // Auth
  isAuthenticated: () => localStorage.getItem(AUTH_KEY) === "true",
  login: (password: string) => {
    const data = load();
    const pw = data.settings?.adminPassword || ADMIN_PASSWORD;
    if (password === pw) { localStorage.setItem(AUTH_KEY, "true"); return true; }
    return false;
  },
  logout: () => localStorage.removeItem(AUTH_KEY),

  // Settings
  getSettings: (): PlatformSettings => load().settings || SEED_SETTINGS,
  updateSettings: (updates: Partial<PlatformSettings>) => {
    const data = load();
    data.settings = { ...data.settings, ...updates };
    save(data);
  },

  // Products
  getProducts: (): Product[] => load().products,
  updateProduct: (id: string, updates: Partial<Product>) => {
    const data = load();
    data.products = data.products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    save(data);
  },
  addProduct: (product: Omit<Product, "id" | "sales" | "revenue">) => {
    const data = load();
    const newP: Product = { ...product, id: `p${Date.now()}`, sales: 0, revenue: 0 };
    data.products.push(newP);
    save(data);
    return newP;
  },
  deleteProduct: (id: string) => {
    const data = load();
    data.products = data.products.filter((p) => p.id !== id);
    save(data);
  },

  // Bundles
  getBundles: (): Bundle[] => load().bundles || [],
  updateBundle: (id: string, updates: Partial<Bundle>) => {
    const data = load();
    data.bundles = (data.bundles || []).map((b) => (b.id === id ? { ...b, ...updates } : b));
    save(data);
  },
  addBundle: (bundle: Omit<Bundle, "id">) => {
    const data = load();
    if (!data.bundles) data.bundles = [];
    const newB: Bundle = { ...bundle, id: `b${Date.now()}` };
    data.bundles.push(newB);
    save(data);
    return newB;
  },
  deleteBundle: (id: string) => {
    const data = load();
    data.bundles = (data.bundles || []).filter((b) => b.id !== id);
    save(data);
  },

  // Orders
  getOrders: (): Order[] => load().orders,
  updateOrderStatus: (id: string, status: Order["status"]) => {
    const data = load();
    data.orders = data.orders.map((o) => (o.id === id ? { ...o, status } : o));
    save(data);
  },
  updateOrderNotes: (id: string, notes: string) => {
    const data = load();
    data.orders = data.orders.map((o) => (o.id === id ? { ...o, notes } : o));
    save(data);
  },
  addOrder: (order: Omit<Order, "id">) => {
    const data = load();
    const newO: Order = { ...order, id: `ORD-${Date.now()}` };
    data.orders.unshift(newO);
    save(data);
    return newO;
  },

  // Subscribers
  getSubscribers: (): Subscriber[] => load().subscribers,
  addSubscriber: (sub: Omit<Subscriber, "id">) => {
    const data = load();
    const newS: Subscriber = { ...sub, id: `SUB-${Date.now()}` };
    data.subscribers.unshift(newS);
    save(data);
    return newS;
  },
  deleteSubscriber: (id: string) => {
    const data = load();
    data.subscribers = data.subscribers.filter((s) => s.id !== id);
    save(data);
  },

  // Bookings
  getBookings: (): BookingInquiry[] => load().bookings,
  updateBookingStatus: (id: string, status: BookingInquiry["status"]) => {
    const data = load();
    data.bookings = data.bookings.map((b) => (b.id === id ? { ...b, status } : b));
    save(data);
  },
  updateBookingNotes: (id: string, notes: string) => {
    const data = load();
    data.bookings = data.bookings.map((b) => (b.id === id ? { ...b, notes } : b));
    save(data);
  },
  addBooking: (booking: Omit<BookingInquiry, "id">) => {
    const data = load();
    const newB: BookingInquiry = { ...booking, id: `BKG-${Date.now()}` };
    data.bookings.unshift(newB);
    save(data);
    return newB;
  },

  // Community Applications
  getCommunityApps: (): CommunityApplication[] => load().communityApps,
  addCommunityApp: (app: Omit<CommunityApplication, "id">) => {
    const data = load();
    data.communityApps.push({ ...app, id: `APP-${Date.now()}` });
    save(data);
  },
  updateAppStatus: (id: string, status: CommunityApplication["status"]) => {
    const data = load();
    data.communityApps = data.communityApps.map((a) => (a.id === id ? { ...a, status } : a));
    save(data);
  },

  // Enrollments
  getEnrollments: (): ProgramEnrollment[] => load().enrollments,
  updateEnrollmentStatus: (id: string, status: ProgramEnrollment["status"]) => {
    const data = load();
    data.enrollments = data.enrollments.map((e) => (e.id === id ? { ...e, status } : e));
    save(data);
  },
  addEnrollment: (enrollment: Omit<ProgramEnrollment, "id">) => {
    const data = load();
    const newE: ProgramEnrollment = { ...enrollment, id: `ENR-${Date.now()}` };
    data.enrollments.unshift(newE);
    save(data);
    return newE;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => (load().testimonials || []).sort((a, b) => a.order - b.order),
  addTestimonial: (t: Omit<Testimonial, "id" | "order">) => {
    const data = load();
    if (!data.testimonials) data.testimonials = [];
    const newT: Testimonial = { ...t, id: `t${Date.now()}`, order: data.testimonials.length };
    data.testimonials.push(newT);
    save(data);
    return newT;
  },
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => {
    const data = load();
    if (updates.featured) {
      data.testimonials = data.testimonials.map((t) => ({ ...t, featured: false }));
    }
    data.testimonials = data.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t));
    save(data);
  },
  deleteTestimonial: (id: string) => {
    const data = load();
    data.testimonials = data.testimonials.filter((t) => t.id !== id);
    save(data);
  },

  // Speaking Topics
  getSpeakingTopics: (): SpeakingTopic[] => (load().speakingTopics || []).sort((a, b) => a.order - b.order),
  addSpeakingTopic: (topic: Omit<SpeakingTopic, "id" | "order">) => {
    const data = load();
    if (!data.speakingTopics) data.speakingTopics = [];
    const newT: SpeakingTopic = { ...topic, id: `st${Date.now()}`, order: data.speakingTopics.length };
    data.speakingTopics.push(newT);
    save(data);
  },
  updateSpeakingTopic: (id: string, updates: Partial<SpeakingTopic>) => {
    const data = load();
    data.speakingTopics = data.speakingTopics.map((t) => (t.id === id ? { ...t, ...updates } : t));
    save(data);
  },
  deleteSpeakingTopic: (id: string) => {
    const data = load();
    data.speakingTopics = data.speakingTopics.filter((t) => t.id !== id);
    save(data);
  },

  // Event Formats
  getEventFormats: (): EventFormat[] => (load().eventFormats || []).sort((a, b) => a.order - b.order),
  addEventFormat: (format: Omit<EventFormat, "id" | "order">) => {
    const data = load();
    if (!data.eventFormats) data.eventFormats = [];
    const newF: EventFormat = { ...format, id: `ef${Date.now()}`, order: data.eventFormats.length };
    data.eventFormats.push(newF);
    save(data);
  },
  updateEventFormat: (id: string, updates: Partial<EventFormat>) => {
    const data = load();
    data.eventFormats = data.eventFormats.map((f) => (f.id === id ? { ...f, ...updates } : f));
    save(data);
  },
  deleteEventFormat: (id: string) => {
    const data = load();
    data.eventFormats = data.eventFormats.filter((f) => f.id !== id);
    save(data);
  },

  // FAQs
  getFAQs: (): FAQ[] => (load().faqs || []).sort((a, b) => a.order - b.order),
  addFAQ: (faq: Omit<FAQ, "id" | "order">) => {
    const data = load();
    if (!data.faqs) data.faqs = [];
    const newF: FAQ = { ...faq, id: `faq${Date.now()}`, order: data.faqs.length };
    data.faqs.push(newF);
    save(data);
  },
  updateFAQ: (id: string, updates: Partial<FAQ>) => {
    const data = load();
    data.faqs = data.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f));
    save(data);
  },
  deleteFAQ: (id: string) => {
    const data = load();
    data.faqs = data.faqs.filter((f) => f.id !== id);
    save(data);
  },

  // Community Posts
  getCommunityPosts: (): CommunityPost[] => load().communityPosts || [],
  addCommunityPost: (post: Omit<CommunityPost, "id">) => {
    const data = load();
    if (!data.communityPosts) data.communityPosts = [];
    const newP: CommunityPost = { ...post, id: `cp${Date.now()}` };
    data.communityPosts.unshift(newP);
    save(data);
    return newP;
  },
  updateCommunityPost: (id: string, updates: Partial<CommunityPost>) => {
    const data = load();
    data.communityPosts = data.communityPosts.map((p) => (p.id === id ? { ...p, ...updates } : p));
    save(data);
  },
  deleteCommunityPost: (id: string) => {
    const data = load();
    data.communityPosts = data.communityPosts.filter((p) => p.id !== id);
    save(data);
  },

  // Community Events
  getCommunityEvents: (): CommunityEvent[] => load().communityEvents || [],
  addCommunityEvent: (event: Omit<CommunityEvent, "id">) => {
    const data = load();
    if (!data.communityEvents) data.communityEvents = [];
    const newE: CommunityEvent = { ...event, id: `ce${Date.now()}` };
    data.communityEvents.unshift(newE);
    save(data);
    return newE;
  },
  updateCommunityEvent: (id: string, updates: Partial<CommunityEvent>) => {
    const data = load();
    data.communityEvents = data.communityEvents.map((e) => (e.id === id ? { ...e, ...updates } : e));
    save(data);
  },
  deleteCommunityEvent: (id: string) => {
    const data = load();
    data.communityEvents = data.communityEvents.filter((e) => e.id !== id);
    save(data);
  },

  // Resources
  getResources: (): Resource[] => load().resources || [],
  addResource: (resource: Omit<Resource, "id">) => {
    const data = load();
    if (!data.resources) data.resources = [];
    const newR: Resource = { ...resource, id: `r${Date.now()}` };
    data.resources.unshift(newR);
    save(data);
    return newR;
  },
  updateResource: (id: string, updates: Partial<Resource>) => {
    const data = load();
    data.resources = data.resources.map((r) => (r.id === id ? { ...r, ...updates } : r));
    save(data);
  },
  deleteResource: (id: string) => {
    const data = load();
    data.resources = data.resources.filter((r) => r.id !== id);
    save(data);
  },

  // Stats
  getStats: () => {
    const data = load();
    const totalRevenue = data.orders.filter((o) => o.status === "fulfilled").reduce((s, o) => s + o.amount, 0);
    const thisMonth = new Date(); thisMonth.setDate(1);
    const monthlyRevenue = data.orders.filter((o) => o.status === "fulfilled" && new Date(o.date) >= thisMonth).reduce((s, o) => s + o.amount, 0);
    return {
      totalRevenue,
      monthlyRevenue,
      totalOrders: data.orders.length,
      pendingOrders: data.orders.filter((o) => o.status === "pending").length,
      subscribers: data.subscribers.length,
      newBookings: data.bookings.filter((b) => b.status === "new").length,
      totalBookings: data.bookings.length,
      pendingApps: data.communityApps.filter((a) => a.status === "pending").length,
      approvedMembers: data.communityApps.filter((a) => a.status === "approved").length,
      activeEnrollments: data.enrollments.filter((e) => e.status === "active").length,
      totalEnrollmentRevenue: data.enrollments.reduce((s, e) => s + e.amount, 0),
    };
  },
};
