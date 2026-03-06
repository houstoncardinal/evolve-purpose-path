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

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  productId: string;
  amount: number;
  status: "pending" | "processing" | "fulfilled" | "refunded";
  date: string;
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

export interface AdminStoreData {
  products: Product[];
  orders: Order[];
  subscribers: Subscriber[];
  bookings: BookingInquiry[];
  communityApps: CommunityApplication[];
  enrollments: ProgramEnrollment[];
  adminPassword: string;
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
  { id: "p7", name: "The Starter Kit", shortName: "Starter Kit", price: 49.99, category: "bundle", status: "active", badge: "Bundle", description: "Journal + Card Deck bundle. Save $5.", sales: 55, revenue: 2749.45 },
  { id: "p8", name: "The Deep-Work Bundle", shortName: "Deep-Work Bundle", price: 64.99, category: "bundle", status: "active", badge: "Best Value", description: "Journal + Workbook + Card Deck. Save $10.", sales: 39, revenue: 2534.61 },
  { id: "p9", name: "The Complete Toolkit", shortName: "Complete Toolkit", price: 174.99, category: "bundle", status: "active", badge: "All-In", description: "All 5 digital & physical items. Save $32.", sales: 18, revenue: 3149.82 },
];

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
  product: SEED_PRODUCTS[i % 9].name,
  productId: SEED_PRODUCTS[i % 9].id,
  amount: SEED_PRODUCTS[i % 9].price,
  status: (["fulfilled", "fulfilled", "fulfilled", "processing", "pending", "refunded"][i % 6]) as Order["status"],
  date: daysAgo(i * 3),
}));

const allNames = [
  ...names,
  ["Faith Morgan", "faith.m@gmail.com"],
  ["Hope Thomas", "hope.t@yahoo.com"],
  ["Grace Evans", "grace.e@gmail.com"],
  ["Joy Simmons", "joy.s@icloud.com"],
  ["Love Patterson", "love.p@gmail.com"],
  ["Peace Howard", "peace.h@outlook.com"],
  ["Truth Murphy", "truth.m@gmail.com"],
  ["Wisdom Collins", "wisdom.c@yahoo.com"],
  ["Glory Sanders", "glory.s@gmail.com"],
  ["Praise Jenkins", "praise.j@icloud.com"],
  ["Miracle Powell", "miracle.p@gmail.com"],
  ["Blessing Rogers", "blessing.r@yahoo.com"],
  ["Eden Perry", "eden.p@gmail.com"],
  ["Zara Bell", "zara.b@outlook.com"],
  ["Lyra Hughes", "lyra.h@gmail.com"],
  ["Nova Griffin", "nova.g@icloud.com"],
  ["Stella Diaz", "stella.d@gmail.com"],
  ["Luna Hayes", "luna.h@yahoo.com"],
  ["Aurora Price", "aurora.p@gmail.com"],
  ["Celeste Myers", "celeste.m@outlook.com"],
  ["Ivy Long", "ivy.l@gmail.com"],
  ["Lily Butler", "lily.b@icloud.com"],
  ["Rose Kelly", "rose.k@gmail.com"],
  ["Violet Simmons", "violet.s@yahoo.com"],
  ["Iris Turner", "iris.t@gmail.com"],
  ["Daisy Phillips", "daisy.p@outlook.com"],
  ["Poppy Torres", "poppy.t@gmail.com"],
  ["Sage Henderson", "sage.h@icloud.com"],
  ["River Coleman", "river.c@gmail.com"],
  ["Skye Powell", "skye.p@yahoo.com"],
  ["Ocean Gray", "ocean.g@gmail.com"],
  ["Meadow James", "meadow.j@outlook.com"],
  ["Haven Watson", "haven.w@gmail.com"],
  ["Eden Brooks", "eden.b@icloud.com"],
  ["Ember Sullivan", "ember.s@gmail.com"],
  ["Wren Foster", "wren.f@yahoo.com"],
  ["Fern Barnes", "fern.b@gmail.com"],
  ["Dawn Mitchell", "dawn.m@outlook.com"],
  ["Aria Thompson", "aria.t@gmail.com"],
  ["Cleo Harrison", "cleo.h@icloud.com"],
  ["Nora Washington", "nora.w@gmail.com"],
  ["Luna Adams", "luna.a@yahoo.com"],
  ["Jade Jackson", "jade.j@gmail.com"],
  ["Ivy Carter", "ivy.c@outlook.com"],
  ["Mia Evans", "mia.e@gmail.com"],
  ["Zoe Lewis", "zoe.l@icloud.com"],
  ["Ella Robinson", "ella.r@gmail.com"],
  ["Ava Walker", "ava.w@yahoo.com"],
  ["Lily Hall", "lily.h@gmail.com"],
  ["Chloe Young", "chloe.y@outlook.com"],
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
    products: [],
    orders: [],
    subscribers: [],
    bookings: [],
    communityApps: [],
    enrollments: [],
    adminPassword: ADMIN_PASSWORD,
    initialized: false,
  };
}

function save(data: AdminStoreData) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function initStore() {
  const data = load();
  if (data.initialized) return;
  data.products = SEED_PRODUCTS;
  data.orders = SEED_ORDERS;
  data.subscribers = SEED_SUBSCRIBERS;
  data.bookings = SEED_BOOKINGS;
  data.communityApps = SEED_COMMUNITY;
  data.enrollments = SEED_ENROLLMENTS;
  data.adminPassword = ADMIN_PASSWORD;
  data.initialized = true;
  save(data);
}

export const store = {
  // Auth
  isAuthenticated: () => localStorage.getItem(AUTH_KEY) === "true",
  login: (password: string) => {
    const data = load();
    const pw = data.adminPassword || ADMIN_PASSWORD;
    if (password === pw) {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem(AUTH_KEY),
  updatePassword: (newPw: string) => {
    const data = load();
    data.adminPassword = newPw;
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

  // Orders
  getOrders: (): Order[] => load().orders,
  updateOrderStatus: (id: string, status: Order["status"]) => {
    const data = load();
    data.orders = data.orders.map((o) => (o.id === id ? { ...o, status } : o));
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
  addBooking: (booking: Omit<BookingInquiry, "id">) => {
    const data = load();
    const newB: BookingInquiry = { ...booking, id: `BKG-${Date.now()}` };
    data.bookings.unshift(newB);
    save(data);
    return newB;
  },

  // Community Applications
  getCommunityApps: (): CommunityApplication[] => load().communityApps,
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

  // Stats
  getStats: () => {
    const data = load();
    const totalRevenue = data.orders
      .filter((o) => o.status === "fulfilled")
      .reduce((sum, o) => sum + o.amount, 0);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyRevenue = data.orders
      .filter((o) => o.status === "fulfilled" && new Date(o.date) >= thisMonth)
      .reduce((sum, o) => sum + o.amount, 0);
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
      totalEnrollmentRevenue: data.enrollments.reduce((sum, e) => sum + e.amount, 0),
    };
  },
};
