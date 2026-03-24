// ─────────────────────────────────────────────────────────────────────────────
// Admin Store — Supabase v2
// All methods are async and hit the real database.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from "./supabase";

export const AUTH_KEY = "e2p_admin_auth"; // kept for legacy key reference only

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
  source:
    | "homepage"
    | "about"
    | "framework"
    | "testimonials"
    | "programs"
    | "programs-one-on-one"
    | "programs-group"
    | "programs-healing-intensive"
    | "programs-mentorship"
    | "programs-purpose-clarity"
    | "shop"
    | "free-guide"
    | "footer"
    | "manual";
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

// ─── Row mappers (DB column names → app field names) ─────────────────────────

function mapProduct(r: Record<string, unknown>): Product {
  return {
    id: r.id as string,
    name: r.name as string,
    shortName: r.short_name as string,
    price: r.price as number,
    category: r.category as Product["category"],
    status: r.status as Product["status"],
    badge: r.badge as string | undefined,
    description: r.description as string,
    sales: r.sales as number,
    revenue: r.revenue as number,
  };
}

function mapBundle(r: Record<string, unknown>): Bundle {
  return {
    id: r.id as string,
    name: r.name as string,
    price: r.price as number,
    originalPrice: r.original_price as number,
    items: r.items as string[],
    badge: r.badge as string | undefined,
    description: r.description as string,
    status: r.status as Bundle["status"],
  };
}

function mapOrder(r: Record<string, unknown>): Order {
  return {
    id: r.id as string,
    customer: r.customer as string,
    email: r.email as string,
    product: r.product as string,
    productId: (r.product_id ?? "") as string,
    amount: r.amount as number,
    status: r.status as Order["status"],
    date: (r.created_at as string)?.split("T")[0] ?? "",
    notes: r.notes as string | undefined,
  };
}

function mapSubscriber(r: Record<string, unknown>): Subscriber {
  return {
    id: r.id as string,
    email: r.email as string,
    name: (r.name ?? "") as string,
    joinedAt: (r.created_at as string)?.split("T")[0] ?? "",
    source: r.source as Subscriber["source"],
  };
}

function mapBooking(r: Record<string, unknown>): BookingInquiry {
  return {
    id: r.id as string,
    name: r.name as string,
    email: r.email as string,
    organization: r.organization as string,
    eventType: r.event_type as string,
    audienceSize: (r.audience_size ?? "") as string,
    eventDate: (r.event_date ?? "") as string,
    details: (r.details ?? "") as string,
    status: r.status as BookingInquiry["status"],
    submittedAt: (r.submitted_at as string)?.split("T")[0] ?? "",
    notes: r.notes as string | undefined,
  };
}

function mapCommunityApp(r: Record<string, unknown>): CommunityApplication {
  return {
    id: r.id as string,
    name: r.name as string,
    email: r.email as string,
    reason: (r.reason ?? "") as string,
    appliedAt: (r.applied_at as string)?.split("T")[0] ?? "",
    status: r.status as CommunityApplication["status"],
  };
}

function mapEnrollment(r: Record<string, unknown>): ProgramEnrollment {
  return {
    id: r.id as string,
    name: r.name as string,
    email: r.email as string,
    program: r.program as string,
    amount: r.amount as number,
    enrolledAt: (r.enrolled_at as string)?.split("T")[0] ?? "",
    status: r.status as ProgramEnrollment["status"],
  };
}

function mapTestimonial(r: Record<string, unknown>): Testimonial {
  return {
    id: r.id as string,
    quote: r.quote as string,
    name: r.name as string,
    detail: (r.detail ?? "") as string,
    transformation: (r.transformation ?? "") as string,
    program: (r.program ?? "") as string,
    featured: (r.featured ?? false) as boolean,
    order: (r.sort_order ?? 0) as number,
  };
}

function mapSpeakingTopic(r: Record<string, unknown>): SpeakingTopic {
  return {
    id: r.id as string,
    title: r.title as string,
    desc: (r.description ?? "") as string,
    order: (r.sort_order ?? 0) as number,
  };
}

function mapEventFormat(r: Record<string, unknown>): EventFormat {
  return {
    id: r.id as string,
    label: r.label as string,
    detail: (r.detail ?? "") as string,
    order: (r.sort_order ?? 0) as number,
  };
}

function mapFAQ(r: Record<string, unknown>): FAQ {
  return {
    id: r.id as string,
    question: r.question as string,
    answer: r.answer as string,
    category: r.category as FAQ["category"],
    order: (r.sort_order ?? 0) as number,
  };
}

function mapCommunityPost(r: Record<string, unknown>): CommunityPost {
  return {
    id: r.id as string,
    content: r.content as string,
    author: (r.author ?? "Sarah Adams") as string,
    type: r.type as CommunityPost["type"],
    pinned: (r.pinned ?? false) as boolean,
    createdAt: (r.created_at as string)?.split("T")[0] ?? "",
  };
}

function mapCommunityEvent(r: Record<string, unknown>): CommunityEvent {
  return {
    id: r.id as string,
    title: r.title as string,
    description: (r.description ?? "") as string,
    date: r.event_date as string,
    time: (r.event_time ?? "") as string,
    format: r.format as CommunityEvent["format"],
    link: r.link as string | undefined,
  };
}

function mapResource(r: Record<string, unknown>): Resource {
  return {
    id: r.id as string,
    title: r.title as string,
    description: (r.description ?? "") as string,
    category: (r.category ?? "") as string,
    externalLink: r.external_link as string | undefined,
    type: r.type as Resource["type"],
    addedAt: (r.added_at as string)?.split("T")[0] ?? "",
  };
}

// ─── no-op for backward compat (pages still call initStore) ──────────────────
export function initStore() {}

const ADMIN_KEY = "e2p_admin_auth";
const ADMIN_PASSWORD = "H34L3R2026";

// ─── Store ───────────────────────────────────────────────────────────────────

export const store = {
  // ── Auth (password-only, sessionStorage) ─────────────────────────────────
  isAuthenticated: () => {
    return sessionStorage.getItem(ADMIN_KEY) === "1";
  },
  login: (_email: string, password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, "1");
      return true;
    }
    return false;
  },
  logout: () => {
    sessionStorage.removeItem(ADMIN_KEY);
  },

  // ── Settings ─────────────────────────────────────────────────────────────
  getSettings: async (): Promise<PlatformSettings> => {
    const { data } = await supabase.from("platform_settings").select("*").limit(1).single();
    if (!data) return { contactEmail: "", bookingEmail: "", socialInstagram: "", socialYoutube: "", socialFacebook: "", adminPassword: "" };
    return {
      contactEmail: data.contact_email,
      bookingEmail: data.booking_email,
      socialInstagram: data.social_instagram,
      socialYoutube: data.social_youtube,
      socialFacebook: data.social_facebook,
      adminPassword: "",
    };
  },
  updateSettings: async (updates: Partial<PlatformSettings>) => {
    const { data: row } = await supabase.from("platform_settings").select("id").limit(1).single();
    if (!row) return;
    const patch: Record<string, unknown> = {};
    if (updates.contactEmail !== undefined) patch.contact_email = updates.contactEmail;
    if (updates.bookingEmail !== undefined) patch.booking_email = updates.bookingEmail;
    if (updates.socialInstagram !== undefined) patch.social_instagram = updates.socialInstagram;
    if (updates.socialYoutube !== undefined) patch.social_youtube = updates.socialYoutube;
    if (updates.socialFacebook !== undefined) patch.social_facebook = updates.socialFacebook;
    await supabase.from("platform_settings").update(patch).eq("id", row.id);
  },

  // ── Products ─────────────────────────────────────────────────────────────
  getProducts: async (): Promise<Product[]> => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    return (data ?? []).map(mapProduct);
  },
  addProduct: async (p: Omit<Product, "id" | "sales" | "revenue">) => {
    const { data } = await supabase.from("products").insert({
      name: p.name, short_name: p.shortName, price: p.price,
      category: p.category, status: p.status, badge: p.badge || null,
      description: p.description, sales: 0, revenue: 0,
    }).select().single();
    return data ? mapProduct(data) : null;
  },
  updateProduct: async (id: string, updates: Partial<Product>) => {
    const patch: Record<string, unknown> = {};
    if (updates.name !== undefined) patch.name = updates.name;
    if (updates.shortName !== undefined) patch.short_name = updates.shortName;
    if (updates.price !== undefined) patch.price = updates.price;
    if (updates.category !== undefined) patch.category = updates.category;
    if (updates.status !== undefined) patch.status = updates.status;
    if (updates.badge !== undefined) patch.badge = updates.badge || null;
    if (updates.description !== undefined) patch.description = updates.description;
    if (updates.sales !== undefined) patch.sales = updates.sales;
    if (updates.revenue !== undefined) patch.revenue = updates.revenue;
    await supabase.from("products").update(patch).eq("id", id);
  },
  deleteProduct: async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
  },

  // ── Bundles ───────────────────────────────────────────────────────────────
  getBundles: async (): Promise<Bundle[]> => {
    const { data } = await supabase.from("bundles").select("*").order("created_at", { ascending: true });
    return (data ?? []).map(mapBundle);
  },
  addBundle: async (b: Omit<Bundle, "id">) => {
    const { data } = await supabase.from("bundles").insert({
      name: b.name, price: b.price, original_price: b.originalPrice,
      items: b.items, badge: b.badge || null, description: b.description, status: b.status,
    }).select().single();
    return data ? mapBundle(data) : null;
  },
  updateBundle: async (id: string, updates: Partial<Bundle>) => {
    const patch: Record<string, unknown> = {};
    if (updates.name !== undefined) patch.name = updates.name;
    if (updates.price !== undefined) patch.price = updates.price;
    if (updates.originalPrice !== undefined) patch.original_price = updates.originalPrice;
    if (updates.items !== undefined) patch.items = updates.items;
    if (updates.badge !== undefined) patch.badge = updates.badge || null;
    if (updates.description !== undefined) patch.description = updates.description;
    if (updates.status !== undefined) patch.status = updates.status;
    await supabase.from("bundles").update(patch).eq("id", id);
  },
  deleteBundle: async (id: string) => {
    await supabase.from("bundles").delete().eq("id", id);
  },

  // ── Orders ────────────────────────────────────────────────────────────────
  getOrders: async (): Promise<Order[]> => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapOrder);
  },
  addOrder: async (o: Omit<Order, "id">) => {
    const { data } = await supabase.from("orders").insert({
      customer: o.customer, email: o.email, product: o.product,
      product_id: o.productId || null, amount: o.amount, status: o.status, notes: o.notes,
    }).select().single();
    return data ? mapOrder(data) : null;
  },
  updateOrderStatus: async (id: string, status: Order["status"]) => {
    await supabase.from("orders").update({ status }).eq("id", id);
  },
  updateOrderNotes: async (id: string, notes: string) => {
    await supabase.from("orders").update({ notes }).eq("id", id);
  },

  // ── Subscribers ───────────────────────────────────────────────────────────
  getSubscribers: async (): Promise<Subscriber[]> => {
    const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapSubscriber);
  },
  addSubscriber: async (s: { email: string; name?: string; source: Subscriber["source"] }) => {
    const { data } = await supabase.from("subscribers").insert({
      email: s.email, name: s.name || null, source: s.source,
    }).select().single();
    return data ? mapSubscriber(data) : null;
  },
  deleteSubscriber: async (id: string) => {
    await supabase.from("subscribers").delete().eq("id", id);
  },

  // ── Booking Inquiries ─────────────────────────────────────────────────────
  getBookings: async (): Promise<BookingInquiry[]> => {
    const { data } = await supabase.from("booking_inquiries").select("*").order("submitted_at", { ascending: false });
    return (data ?? []).map(mapBooking);
  },
  addBooking: async (b: Omit<BookingInquiry, "id" | "submittedAt" | "status">) => {
    const { data } = await supabase.from("booking_inquiries").insert({
      name: b.name, email: b.email, organization: b.organization,
      event_type: b.eventType, audience_size: b.audienceSize,
      event_date: b.eventDate || null, details: b.details, status: "new",
    }).select().single();
    return data ? mapBooking(data) : null;
  },
  updateBookingStatus: async (id: string, status: BookingInquiry["status"]) => {
    await supabase.from("booking_inquiries").update({ status }).eq("id", id);
  },
  updateBookingNotes: async (id: string, notes: string) => {
    await supabase.from("booking_inquiries").update({ notes }).eq("id", id);
  },

  // ── Community Applications ────────────────────────────────────────────────
  getCommunityApps: async (): Promise<CommunityApplication[]> => {
    const { data } = await supabase.from("community_applications").select("*").order("applied_at", { ascending: false });
    return (data ?? []).map(mapCommunityApp);
  },
  addCommunityApp: async (a: { name: string; email: string; reason: string }) => {
    const { data } = await supabase.from("community_applications").insert({
      name: a.name, email: a.email, reason: a.reason, status: "pending",
    }).select().single();
    return data ? mapCommunityApp(data) : null;
  },
  updateAppStatus: async (id: string, status: CommunityApplication["status"]) => {
    await supabase.from("community_applications").update({ status }).eq("id", id);
  },

  // ── Program Enrollments ───────────────────────────────────────────────────
  getEnrollments: async (): Promise<ProgramEnrollment[]> => {
    const { data } = await supabase.from("program_enrollments").select("*").order("enrolled_at", { ascending: false });
    return (data ?? []).map(mapEnrollment);
  },
  addEnrollment: async (e: Omit<ProgramEnrollment, "id" | "enrolledAt">) => {
    const { data } = await supabase.from("program_enrollments").insert({
      name: e.name, email: e.email, program: e.program, amount: e.amount, status: e.status,
    }).select().single();
    return data ? mapEnrollment(data) : null;
  },
  updateEnrollmentStatus: async (id: string, status: ProgramEnrollment["status"]) => {
    await supabase.from("program_enrollments").update({ status }).eq("id", id);
  },

  // ── Testimonials ──────────────────────────────────────────────────────────
  getTestimonials: async (): Promise<Testimonial[]> => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
    return (data ?? []).map(mapTestimonial);
  },
  addTestimonial: async (t: Omit<Testimonial, "id" | "order">) => {
    const { data: existing } = await supabase.from("testimonials").select("sort_order").order("sort_order", { ascending: false }).limit(1).single();
    const nextOrder = existing ? (existing.sort_order as number) + 1 : 0;
    const { data } = await supabase.from("testimonials").insert({
      quote: t.quote, name: t.name, detail: t.detail, transformation: t.transformation,
      program: t.program, featured: t.featured, sort_order: nextOrder,
    }).select().single();
    return data ? mapTestimonial(data) : null;
  },
  updateTestimonial: async (id: string, updates: Partial<Testimonial>) => {
    if (updates.featured) {
      await supabase.from("testimonials").update({ featured: false }).neq("id", id);
    }
    const patch: Record<string, unknown> = {};
    if (updates.quote !== undefined) patch.quote = updates.quote;
    if (updates.name !== undefined) patch.name = updates.name;
    if (updates.detail !== undefined) patch.detail = updates.detail;
    if (updates.transformation !== undefined) patch.transformation = updates.transformation;
    if (updates.program !== undefined) patch.program = updates.program;
    if (updates.featured !== undefined) patch.featured = updates.featured;
    if (updates.order !== undefined) patch.sort_order = updates.order;
    await supabase.from("testimonials").update(patch).eq("id", id);
  },
  deleteTestimonial: async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
  },

  // ── Speaking Topics ───────────────────────────────────────────────────────
  getSpeakingTopics: async (): Promise<SpeakingTopic[]> => {
    const { data } = await supabase.from("speaking_topics").select("*").order("sort_order", { ascending: true });
    return (data ?? []).map(mapSpeakingTopic);
  },
  addSpeakingTopic: async (t: Omit<SpeakingTopic, "id" | "order">) => {
    const { data: existing } = await supabase.from("speaking_topics").select("sort_order").order("sort_order", { ascending: false }).limit(1).single();
    const nextOrder = existing ? (existing.sort_order as number) + 1 : 0;
    await supabase.from("speaking_topics").insert({ title: t.title, description: t.desc, sort_order: nextOrder });
  },
  updateSpeakingTopic: async (id: string, updates: Partial<SpeakingTopic>) => {
    const patch: Record<string, unknown> = {};
    if (updates.title !== undefined) patch.title = updates.title;
    if (updates.desc !== undefined) patch.description = updates.desc;
    if (updates.order !== undefined) patch.sort_order = updates.order;
    await supabase.from("speaking_topics").update(patch).eq("id", id);
  },
  deleteSpeakingTopic: async (id: string) => {
    await supabase.from("speaking_topics").delete().eq("id", id);
  },

  // ── Event Formats ─────────────────────────────────────────────────────────
  getEventFormats: async (): Promise<EventFormat[]> => {
    const { data } = await supabase.from("event_formats").select("*").order("sort_order", { ascending: true });
    return (data ?? []).map(mapEventFormat);
  },
  addEventFormat: async (f: Omit<EventFormat, "id" | "order">) => {
    const { data: existing } = await supabase.from("event_formats").select("sort_order").order("sort_order", { ascending: false }).limit(1).single();
    const nextOrder = existing ? (existing.sort_order as number) + 1 : 0;
    await supabase.from("event_formats").insert({ label: f.label, detail: f.detail, sort_order: nextOrder });
  },
  updateEventFormat: async (id: string, updates: Partial<EventFormat>) => {
    const patch: Record<string, unknown> = {};
    if (updates.label !== undefined) patch.label = updates.label;
    if (updates.detail !== undefined) patch.detail = updates.detail;
    if (updates.order !== undefined) patch.sort_order = updates.order;
    await supabase.from("event_formats").update(patch).eq("id", id);
  },
  deleteEventFormat: async (id: string) => {
    await supabase.from("event_formats").delete().eq("id", id);
  },

  // ── FAQs ──────────────────────────────────────────────────────────────────
  getFAQs: async (): Promise<FAQ[]> => {
    const { data } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
    return (data ?? []).map(mapFAQ);
  },
  addFAQ: async (f: Omit<FAQ, "id" | "order">) => {
    const { data: existing } = await supabase.from("faqs").select("sort_order").order("sort_order", { ascending: false }).limit(1).single();
    const nextOrder = existing ? (existing.sort_order as number) + 1 : 0;
    await supabase.from("faqs").insert({ question: f.question, answer: f.answer, category: f.category, sort_order: nextOrder });
  },
  updateFAQ: async (id: string, updates: Partial<FAQ>) => {
    const patch: Record<string, unknown> = {};
    if (updates.question !== undefined) patch.question = updates.question;
    if (updates.answer !== undefined) patch.answer = updates.answer;
    if (updates.category !== undefined) patch.category = updates.category;
    if (updates.order !== undefined) patch.sort_order = updates.order;
    await supabase.from("faqs").update(patch).eq("id", id);
  },
  deleteFAQ: async (id: string) => {
    await supabase.from("faqs").delete().eq("id", id);
  },

  // ── Community Posts ───────────────────────────────────────────────────────
  getCommunityPosts: async (): Promise<CommunityPost[]> => {
    const { data } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapCommunityPost);
  },
  addCommunityPost: async (p: Omit<CommunityPost, "id" | "createdAt">) => {
    const { data } = await supabase.from("community_posts").insert({
      content: p.content, author: p.author, type: p.type, pinned: p.pinned,
    }).select().single();
    return data ? mapCommunityPost(data) : null;
  },
  updateCommunityPost: async (id: string, updates: Partial<CommunityPost>) => {
    const patch: Record<string, unknown> = {};
    if (updates.content !== undefined) patch.content = updates.content;
    if (updates.author !== undefined) patch.author = updates.author;
    if (updates.type !== undefined) patch.type = updates.type;
    if (updates.pinned !== undefined) patch.pinned = updates.pinned;
    await supabase.from("community_posts").update(patch).eq("id", id);
  },
  deleteCommunityPost: async (id: string) => {
    await supabase.from("community_posts").delete().eq("id", id);
  },

  // ── Community Events ──────────────────────────────────────────────────────
  getCommunityEvents: async (): Promise<CommunityEvent[]> => {
    const { data } = await supabase.from("community_events").select("*").order("event_date", { ascending: true });
    return (data ?? []).map(mapCommunityEvent);
  },
  addCommunityEvent: async (e: Omit<CommunityEvent, "id">) => {
    const { data } = await supabase.from("community_events").insert({
      title: e.title, description: e.description, event_date: e.date,
      event_time: e.time, format: e.format, link: e.link || null,
    }).select().single();
    return data ? mapCommunityEvent(data) : null;
  },
  updateCommunityEvent: async (id: string, updates: Partial<CommunityEvent>) => {
    const patch: Record<string, unknown> = {};
    if (updates.title !== undefined) patch.title = updates.title;
    if (updates.description !== undefined) patch.description = updates.description;
    if (updates.date !== undefined) patch.event_date = updates.date;
    if (updates.time !== undefined) patch.event_time = updates.time;
    if (updates.format !== undefined) patch.format = updates.format;
    if (updates.link !== undefined) patch.link = updates.link || null;
    await supabase.from("community_events").update(patch).eq("id", id);
  },
  deleteCommunityEvent: async (id: string) => {
    await supabase.from("community_events").delete().eq("id", id);
  },

  // ── Resources ─────────────────────────────────────────────────────────────
  getResources: async (): Promise<Resource[]> => {
    const { data } = await supabase.from("resources").select("*").order("added_at", { ascending: false });
    return (data ?? []).map(mapResource);
  },
  addResource: async (r: Omit<Resource, "id" | "addedAt">) => {
    const { data } = await supabase.from("resources").insert({
      title: r.title, description: r.description, category: r.category,
      external_link: r.externalLink || null, type: r.type,
    }).select().single();
    return data ? mapResource(data) : null;
  },
  updateResource: async (id: string, updates: Partial<Resource>) => {
    const patch: Record<string, unknown> = {};
    if (updates.title !== undefined) patch.title = updates.title;
    if (updates.description !== undefined) patch.description = updates.description;
    if (updates.category !== undefined) patch.category = updates.category;
    if (updates.externalLink !== undefined) patch.external_link = updates.externalLink || null;
    if (updates.type !== undefined) patch.type = updates.type;
    await supabase.from("resources").update(patch).eq("id", id);
  },
  deleteResource: async (id: string) => {
    await supabase.from("resources").delete().eq("id", id);
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  getStats: async () => {
    const [ordersRes, subsRes, bookingsRes, appsRes, enrollmentsRes] = await Promise.all([
      supabase.from("orders").select("amount, status, created_at"),
      supabase.from("subscribers").select("id", { count: "exact", head: true }),
      supabase.from("booking_inquiries").select("status"),
      supabase.from("community_applications").select("status"),
      supabase.from("program_enrollments").select("amount, status"),
    ]);

    const orders = ordersRes.data ?? [];
    const fulfilledOrders = orders.filter((o) => o.status === "fulfilled");
    const totalRevenue = fulfilledOrders.reduce((s, o) => s + (o.amount as number), 0);
    const thisMonth = new Date(); thisMonth.setDate(1);
    const monthlyRevenue = fulfilledOrders
      .filter((o) => new Date(o.created_at as string) >= thisMonth)
      .reduce((s, o) => s + (o.amount as number), 0);
    const bookings = bookingsRes.data ?? [];
    const apps = appsRes.data ?? [];
    const enrollments = enrollmentsRes.data ?? [];

    return {
      totalRevenue,
      monthlyRevenue,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      subscribers: subsRes.count ?? 0,
      newBookings: bookings.filter((b) => b.status === "new").length,
      totalBookings: bookings.length,
      pendingApps: apps.filter((a) => a.status === "pending").length,
      approvedMembers: apps.filter((a) => a.status === "approved").length,
      activeEnrollments: enrollments.filter((e) => e.status === "active").length,
      totalEnrollmentRevenue: enrollments.reduce((s, e) => s + (e.amount as number), 0),
    };
  },
};

// Revenue chart data stays static (replace with real data once orders accumulate)
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
