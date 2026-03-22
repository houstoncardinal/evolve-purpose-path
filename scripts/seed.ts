/**
 * Demo seed script — run once to populate the Supabase database with
 * realistic sample data so the admin dashboard looks fully populated.
 *
 * Usage:  npx tsx scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const url = process.env.VITE_SUPABASE_URL!;
const key = process.env.VITE_SUPABASE_ANON_KEY!;

if (!url || !key) {
  console.error("❌  Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const sb = createClient(url, key);

// ─── helpers ──────────────────────────────────────────────────────────────────
const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const dateStr = (n: number) => daysAgo(n).split("T")[0];
const futureDate = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

async function insert(table: string, rows: object[]) {
  const { error } = await sb.from(table).insert(rows);
  if (error) {
    console.error(`  ✗ ${table}:`, error.message);
  } else {
    console.log(`  ✓ ${table} — ${rows.length} rows`);
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  Seeding Evolve 2 Purpose demo data…\n");

  // ── Products ──────────────────────────────────────────────────────────────
  await insert("products", [
    {
      name: "Healing & Alignment Journal",
      short_name: "Journal",
      price: 34.99,
      category: "physical",
      status: "active",
      badge: "Bestseller",
      description: "A beautifully designed guided journal that walks you through the 4-Step Framework at your own pace.",
      sales: 184,
      revenue: 6438.16,
    },
    {
      name: "Breaking Cycles Workbook",
      short_name: "Workbook",
      price: 24.99,
      category: "physical",
      status: "active",
      badge: null,
      description: "A deep-dive workbook to identify and dismantle the inherited patterns quietly running your life.",
      sales: 97,
      revenue: 2424.03,
    },
    {
      name: "Declaration & Affirmation Card Deck",
      short_name: "Card Deck",
      price: 19.99,
      category: "physical",
      status: "active",
      badge: "New",
      description: "40 beautifully designed cards with daily declarations rooted in the Evolve 2 Purpose framework.",
      sales: 63,
      revenue: 1259.37,
    },
    {
      name: "Purpose Activation Masterclass",
      short_name: "Masterclass",
      price: 97.00,
      category: "digital",
      status: "active",
      badge: null,
      description: "A self-paced digital course built on Step 4 of the Framework — Teach Someone Else What You Learned.",
      sales: 41,
      revenue: 3977.00,
    },
    {
      name: "Inner Restoration Audio Collection",
      short_name: "Audio",
      price: 29.99,
      category: "digital",
      status: "active",
      badge: null,
      description: "12 guided meditations and spoken affirmations designed to support the healing journey.",
      sales: 55,
      revenue: 1649.45,
    },
    {
      name: "Anointing Oil — Restoration",
      short_name: "Oil",
      price: 22.00,
      category: "physical",
      status: "coming_soon",
      badge: "Coming Soon",
      description: "A hand-blended anointing oil crafted with prayer and intention for your healing practice.",
      sales: 0,
      revenue: 0,
    },
  ]);

  // ── Bundles ───────────────────────────────────────────────────────────────
  await insert("bundles", [
    {
      name: "The Starter Kit",
      price: 49.99,
      original_price: 54.98,
      items: ["Healing & Alignment Journal", "Declaration Card Deck"],
      badge: "Most Popular",
      description: "The perfect entry point. Everything you need to begin working the framework on your own.",
      status: "active",
    },
    {
      name: "The Deep-Work Bundle",
      price: 64.99,
      original_price: 74.97,
      items: ["Breaking Cycles Workbook", "Inner Restoration Audio Collection", "Declaration Card Deck"],
      badge: "Best Value",
      description: "For the woman who is ready to go all the way in.",
      status: "active",
    },
    {
      name: "The Complete Toolkit",
      price: 174.99,
      original_price: 206.96,
      items: ["Healing Journal", "Breaking Cycles Workbook", "Card Deck", "Masterclass", "Audio Collection"],
      badge: "All-In",
      description: "Every physical and digital resource in one comprehensive package.",
      status: "active",
    },
  ]);

  // ── Orders ────────────────────────────────────────────────────────────────
  await insert("orders", [
    { customer: "Keisha Thompson", email: "keisha.t@gmail.com", product: "Healing & Alignment Journal", product_id: null, amount: 34.99, status: "fulfilled", created_at: daysAgo(1), notes: null },
    { customer: "Tamara Williams", email: "tamara.w@icloud.com", product: "Purpose Activation Masterclass", product_id: null, amount: 97.00, status: "fulfilled", created_at: daysAgo(2), notes: null },
    { customer: "Denise Harper", email: "denise.h@yahoo.com", product: "The Complete Toolkit", product_id: null, amount: 174.99, status: "processing", created_at: daysAgo(2), notes: null },
    { customer: "Angela Morris", email: "angela.m@gmail.com", product: "Breaking Cycles Workbook", product_id: null, amount: 24.99, status: "fulfilled", created_at: daysAgo(3), notes: null },
    { customer: "LaShonda King", email: "lashonda.k@gmail.com", product: "The Starter Kit", product_id: null, amount: 49.99, status: "fulfilled", created_at: daysAgo(4), notes: null },
    { customer: "Monique Davis", email: "monique.d@outlook.com", product: "Inner Restoration Audio Collection", product_id: null, amount: 29.99, status: "fulfilled", created_at: daysAgo(5), notes: null },
    { customer: "Brianna Scott", email: "brianna.s@gmail.com", product: "Declaration & Affirmation Card Deck", product_id: null, amount: 19.99, status: "pending", created_at: daysAgo(5), notes: null },
    { customer: "Yolanda Jackson", email: "yolanda.j@icloud.com", product: "Healing & Alignment Journal", product_id: null, amount: 34.99, status: "fulfilled", created_at: daysAgo(7), notes: null },
    { customer: "Crystal Reed", email: "crystal.r@gmail.com", product: "Purpose Activation Masterclass", product_id: null, amount: 97.00, status: "fulfilled", created_at: daysAgo(8), notes: null },
    { customer: "Tiffany Brown", email: "tiffany.b@yahoo.com", product: "The Deep-Work Bundle", product_id: null, amount: 64.99, status: "fulfilled", created_at: daysAgo(9), notes: null },
    { customer: "Natasha Green", email: "natasha.g@gmail.com", product: "Breaking Cycles Workbook", product_id: null, amount: 24.99, status: "fulfilled", created_at: daysAgo(10), notes: null },
    { customer: "Simone Carter", email: "simone.c@icloud.com", product: "Inner Restoration Audio Collection", product_id: null, amount: 29.99, status: "pending", created_at: daysAgo(11), notes: null },
    { customer: "Renee Mitchell", email: "renee.m@gmail.com", product: "The Complete Toolkit", product_id: null, amount: 174.99, status: "fulfilled", created_at: daysAgo(13), notes: "Gift order — please include gift note." },
    { customer: "Jasmine Turner", email: "jasmine.t@outlook.com", product: "Declaration & Affirmation Card Deck", product_id: null, amount: 19.99, status: "refunded", created_at: daysAgo(16), notes: "Ordered duplicate by mistake." },
    { customer: "Chantel Robinson", email: "chantel.r@gmail.com", product: "Healing & Alignment Journal", product_id: null, amount: 34.99, status: "fulfilled", created_at: daysAgo(18), notes: null },
    { customer: "Maya Washington", email: "maya.w@gmail.com", product: "Purpose Activation Masterclass", product_id: null, amount: 97.00, status: "fulfilled", created_at: daysAgo(21), notes: null },
    { customer: "Priya Singh", email: "priya.s@icloud.com", product: "The Starter Kit", product_id: null, amount: 49.99, status: "fulfilled", created_at: daysAgo(24), notes: null },
    { customer: "Ebony Patterson", email: "ebony.p@gmail.com", product: "Breaking Cycles Workbook", product_id: null, amount: 24.99, status: "fulfilled", created_at: daysAgo(27), notes: null },
  ]);

  // ── Subscribers ───────────────────────────────────────────────────────────
  await insert("subscribers", [
    { name: "Keisha Thompson", email: "keisha.t@gmail.com", source: "free-guide", created_at: daysAgo(1) },
    { name: "Tamara Williams", email: "tamara.w@icloud.com", source: "homepage", created_at: daysAgo(2) },
    { name: "Angela Morris", email: "angela.m@gmail.com", source: "programs", created_at: daysAgo(3) },
    { name: "Denise Harper", email: "denise.h@yahoo.com", source: "free-guide", created_at: daysAgo(4) },
    { name: "LaShonda King", email: "lashonda.k@gmail.com", source: "footer", created_at: daysAgo(5) },
    { name: "Monique Davis", email: "monique.d@outlook.com", source: "homepage", created_at: daysAgo(6) },
    { name: "Brianna Scott", email: "brianna.s@gmail.com", source: "free-guide", created_at: daysAgo(8) },
    { name: "Yolanda Jackson", email: "yolanda.j@icloud.com", source: "programs", created_at: daysAgo(9) },
    { name: "Crystal Reed", email: "crystal.r@gmail.com", source: "homepage", created_at: daysAgo(10) },
    { name: "Tiffany Brown", email: "tiffany.b@yahoo.com", source: "shop", created_at: daysAgo(11) },
    { name: "Natasha Green", email: "natasha.g@gmail.com", source: "free-guide", created_at: daysAgo(12) },
    { name: "Simone Carter", email: "simone.c@icloud.com", source: "footer", created_at: daysAgo(13) },
    { name: "Renee Mitchell", email: "renee.m@gmail.com", source: "homepage", created_at: daysAgo(15) },
    { name: "Jasmine Turner", email: "jasmine.t@outlook.com", source: "free-guide", created_at: daysAgo(17) },
    { name: "Chantel Robinson", email: "chantel.r@gmail.com", source: "programs", created_at: daysAgo(19) },
    { name: "Maya Washington", email: "maya.w@gmail.com", source: "homepage", created_at: daysAgo(21) },
    { name: "Priya Singh", email: "priya.s@icloud.com", source: "free-guide", created_at: daysAgo(23) },
    { name: "Ebony Patterson", email: "ebony.p@gmail.com", source: "shop", created_at: daysAgo(25) },
    { name: "Vanessa Hughes", email: "vanessa.h@gmail.com", source: "footer", created_at: daysAgo(28) },
    { name: "Tonya Barnes", email: "tonya.b@icloud.com", source: "homepage", created_at: daysAgo(31) },
    { name: "Felicia Owens", email: "felicia.o@yahoo.com", source: "free-guide", created_at: daysAgo(34) },
    { name: "Candice Foster", email: "candice.f@gmail.com", source: "programs", created_at: daysAgo(38) },
  ]);

  // ── Booking Inquiries ─────────────────────────────────────────────────────
  await insert("booking_inquiries", [
    {
      name: "Pastor Veronica Cole",
      email: "vcole@gracecommunity.org",
      organization: "Grace Community Church",
      event_type: "Women's Conference",
      audience_size: "250–400",
      event_date: futureDate(45),
      details: "We are hosting our annual 'Women of Purpose' conference and would love for Sarah to deliver the keynote. Theme is breaking generational cycles in the family. We have budget for travel + honorarium.",
      status: "new",
      submitted_at: daysAgo(1),
      notes: null,
    },
    {
      name: "Dr. Latoya Freeman",
      email: "lfreeman@empowerher.org",
      organization: "EmpowerHER Summit",
      event_type: "Keynote",
      audience_size: "800–1,200",
      event_date: futureDate(90),
      details: "EmpowerHER is a national conference for professional Black women. Sarah's message on accountability and purpose aligns perfectly with our 2026 theme. Looking for a 45-minute keynote.",
      status: "reviewing",
      submitted_at: daysAgo(4),
      notes: "Strong lead — following up on budget approval from board.",
    },
    {
      name: "Michelle Torres",
      email: "michelle.torres@corporatewell.com",
      organization: "Corporate Wellness Partners",
      event_type: "Corporate Workshop",
      audience_size: "50–75",
      event_date: futureDate(30),
      details: "Half-day wellness workshop for our HR and leadership team. Focus on emotional triggers in the workplace. Sarah's trigger management framework is exactly what we need.",
      status: "confirmed",
      submitted_at: daysAgo(10),
      notes: "Contract signed. Deposit received. Send logistics form.",
    },
    {
      name: "Sister Yvonne Caldwell",
      email: "ycaldwell@newlifemin.org",
      organization: "New Life Ministries",
      event_type: "Retreat",
      audience_size: "30–50",
      event_date: futureDate(60),
      details: "Annual women's healing retreat — two days, overnight. We want Sarah to lead a session on the full 4-step framework. Small, intimate gathering of church leaders.",
      status: "new",
      submitted_at: daysAgo(2),
      notes: null,
    },
    {
      name: "Danielle Brooks",
      email: "dbrooks@sororityalpha.org",
      organization: "Alpha Chapter — Delta Sigma Theta",
      event_type: "Chapter Event",
      audience_size: "100–150",
      event_date: futureDate(75),
      details: "Hosting a community empowerment night for members and guests. Looking for a 60-minute talk on leading in love and personal accountability. Hybrid — in person and Zoom.",
      status: "reviewing",
      submitted_at: daysAgo(7),
      notes: "Waiting on venue confirmation before locking in.",
    },
    {
      name: "Kezia Okafor",
      email: "kezia@risewomennetwork.com",
      organization: "RISE Women's Network",
      event_type: "Panel + Keynote",
      audience_size: "300–500",
      event_date: futureDate(120),
      details: "Annual RISE Summit. We'd love Sarah as a keynote AND to sit on a panel discussion. Reach is over 12K women across the US. Strong media coverage expected.",
      status: "new",
      submitted_at: daysAgo(0),
      notes: null,
    },
  ]);

  // ── Community Applications ────────────────────────────────────────────────
  await insert("community_applications", [
    {
      name: "Aaliyah Brooks",
      email: "aaliyah.b@gmail.com",
      reason: "I have been following Sarah's content for two years and her framework literally saved my marriage. I want to be surrounded by women who are doing the work, not just talking about it. I'm ready to go deeper.",
      status: "pending",
      applied_at: daysAgo(1),
    },
    {
      name: "Courtney James",
      email: "courtney.j@icloud.com",
      reason: "I recently completed the Purpose Clarity Session and Sarah told me the community would be the best next step for me. I need ongoing support as I transition out of corporate and into my calling.",
      status: "pending",
      applied_at: daysAgo(2),
    },
    {
      name: "Simone Carter",
      email: "simone.c@icloud.com",
      reason: "I've been in and out of therapy for years and nothing has addressed the root. Sarah's framework speaks to generational patterns in a way therapy never did. I want to do this work in community.",
      status: "approved",
      applied_at: daysAgo(8),
    },
    {
      name: "Natasha Green",
      email: "natasha.g@gmail.com",
      reason: "I downloaded the free guide and cried through the entire trigger map section. I know this community is where I need to be. I'm a single mom healing from a toxic relationship and I need women who understand.",
      status: "approved",
      applied_at: daysAgo(10),
    },
    {
      name: "Tiffany Brown",
      email: "tiffany.b@yahoo.com",
      reason: "I've been circling the same patterns for 10 years and I'm done. Sarah's message gave me language for what I've been experiencing. I want to be held accountable in community.",
      status: "approved",
      applied_at: daysAgo(12),
    },
    {
      name: "Renee Mitchell",
      email: "renee.m@gmail.com",
      reason: "I am a therapist who recommends Evolve 2 Purpose to my clients. I want to experience the community firsthand so I can speak to it authentically. I am also personally in a season of my own healing.",
      status: "approved",
      applied_at: daysAgo(15),
    },
    {
      name: "Priya Singh",
      email: "priya.s@icloud.com",
      reason: "As a woman of color navigating corporate spaces, I've carried a lot of unaddressed trauma around identity and worth. Sarah's framework bridges faith and practical healing in a way that finally makes sense to me.",
      status: "approved",
      applied_at: daysAgo(19),
    },
    {
      name: "Destiny Wallace",
      email: "destiny.w@gmail.com",
      reason: "I am a 22-year-old first-generation college graduate trying to figure out who I am outside of what my family needs me to be. I feel called to this community.",
      status: "declined",
      applied_at: daysAgo(22),
    },
    {
      name: "Brianna Scott",
      email: "brianna.s@gmail.com",
      reason: "I've been doing the group program and I want to continue growing after it ends. The community feels like the right container to stay in accountability and connection.",
      status: "pending",
      applied_at: daysAgo(0),
    },
  ]);

  // ── Program Enrollments ───────────────────────────────────────────────────
  await insert("program_enrollments", [
    { name: "Simone Carter", email: "simone.c@icloud.com", program: "Evolve 2 Purpose Group Program", amount: 497, status: "active", enrolled_at: daysAgo(5) },
    { name: "Natasha Green", email: "natasha.g@gmail.com", program: "1:1 Deep-Dive Coaching", amount: 1800, status: "active", enrolled_at: daysAgo(7) },
    { name: "Tiffany Brown", email: "tiffany.b@yahoo.com", program: "Purpose Clarity Session", amount: 197, status: "completed", enrolled_at: daysAgo(14) },
    { name: "Renee Mitchell", email: "renee.m@gmail.com", program: "Evolve 2 Purpose Group Program", amount: 497, status: "active", enrolled_at: daysAgo(10) },
    { name: "Crystal Reed", email: "crystal.r@gmail.com", program: "1:1 Deep-Dive Coaching", amount: 1800, status: "active", enrolled_at: daysAgo(21) },
    { name: "Yolanda Jackson", email: "yolanda.j@icloud.com", program: "Healing Intensive Weekend", amount: 997, status: "completed", enrolled_at: daysAgo(35) },
    { name: "Maya Washington", email: "maya.w@gmail.com", program: "Purpose Clarity Session", amount: 197, status: "completed", enrolled_at: daysAgo(28) },
    { name: "Chantel Robinson", email: "chantel.r@gmail.com", program: "Evolve 2 Purpose Group Program", amount: 497, status: "active", enrolled_at: daysAgo(12) },
    { name: "Priya Singh", email: "priya.s@icloud.com", program: "Purpose Clarity Session", amount: 197, status: "completed", enrolled_at: daysAgo(19) },
    { name: "LaShonda King", email: "lashonda.k@gmail.com", program: "Healing Intensive Weekend", amount: 997, status: "paused", enrolled_at: daysAgo(42) },
    { name: "Angela Morris", email: "angela.m@gmail.com", program: "1:1 Deep-Dive Coaching", amount: 1800, status: "active", enrolled_at: daysAgo(30) },
    { name: "Keisha Thompson", email: "keisha.t@gmail.com", program: "Evolve 2 Purpose Group Program", amount: 497, status: "active", enrolled_at: daysAgo(8) },
  ]);

  // ── Testimonials ──────────────────────────────────────────────────────────
  await insert("testimonials", [
    {
      quote: "I came to Sarah completely shattered. Three months into working with her, something cracked open that I didn't even know was locked. She didn't just help me heal — she helped me find out who I actually am.",
      name: "Keisha L.",
      detail: "1:1 Coaching Client",
      transformation: "Healed from childhood abandonment and found her calling",
      program: "1:1 Deep-Dive Coaching",
      featured: true,
      sort_order: 0,
    },
    {
      quote: "Sarah's guidance helped me see what I had been carrying for years. For the first time in my life, I feel truly free to walk in my purpose.",
      name: "Tamara J.",
      detail: "Group Program Graduate",
      transformation: "Released a 12-year toxic relationship cycle",
      program: "Group Program",
      featured: false,
      sort_order: 1,
    },
    {
      quote: "The Purpose Clarity Session alone was worth more than two years of therapy. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction.",
      name: "Angela M.",
      detail: "Purpose Clarity Session Client",
      transformation: "Left a dead-end career and launched her own business",
      program: "Purpose Clarity Session",
      featured: false,
      sort_order: 2,
    },
    {
      quote: "I am not the same woman who enrolled in this program. I understand my triggers now. I lead in love now. I actually like who I'm becoming.",
      name: "Denise W.",
      detail: "Group Program Graduate",
      transformation: "Restored marriage and rebuilt relationship with her daughters",
      program: "Group Program",
      featured: false,
      sort_order: 3,
    },
    {
      quote: "Working with Sarah 1:1 was the single greatest investment I've ever made in myself. Within 90 days my entire life had shifted — my business, my relationships, my identity.",
      name: "Crystal R.",
      detail: "1:1 Coaching Client",
      transformation: "Tripled her business revenue while healing from burnout",
      program: "1:1 Deep-Dive Coaching",
      featured: false,
      sort_order: 4,
    },
    {
      quote: "I sent this guide to my sister, my mother, and two friends. It starts the conversation so many of us need to have but don't know how. The trigger map changed everything.",
      name: "LaShonda K.",
      detail: "Community Member",
      transformation: "Started the healing conversation in her family for the first time",
      program: "Free Guide",
      featured: false,
      sort_order: 5,
    },
    {
      quote: "The Healing Intensive weekend was the most powerful 48 hours of my life. I walked in as one woman and left as another. No exaggeration.",
      name: "Yolanda J.",
      detail: "Healing Intensive Graduate",
      transformation: "Broke a 30-year cycle of people-pleasing and codependency",
      program: "Healing Intensive Weekend",
      featured: false,
      sort_order: 6,
    },
    {
      quote: "I was skeptical. I had done therapy, coaching, everything. But Sarah's approach is different — it's the root work, not the surface symptoms. Three months later I barely recognize my thought patterns.",
      name: "Renee M.",
      detail: "Group Program Graduate",
      transformation: "Overcame chronic anxiety and stepped into leadership at work",
      program: "Group Program",
      featured: false,
      sort_order: 7,
    },
  ]);

  // ── Community Posts ───────────────────────────────────────────────────────
  await insert("community_posts", [
    {
      content: "This week I want to talk about something most people skip — the moment AFTER the breakthrough. The real work starts when the high fades and the new habit has to hold. Staying committed when the feeling is gone is what actually transforms you. Drop a 🔥 if you're in that season right now.",
      author: "Sarah Adams",
      type: "announcement",
      pinned: true,
      created_at: daysAgo(1),
    },
    {
      content: "REMINDER: Our monthly live Q&A is this Thursday at 7PM EST. Bring your hardest questions — about triggers, purpose, relationships, accountability. Nothing is off limits inside these walls. Link in the events tab. See you there 💗",
      author: "Sarah Adams",
      type: "announcement",
      pinned: false,
      created_at: daysAgo(3),
    },
    {
      content: "I finished the Breaking Cycles Workbook this week and I just need to say — the section on inherited patterns broke me open in the best way. I identified 4 patterns I never even knew came from my grandmother. Does anyone else find that the generational piece is the hardest to face?",
      author: "Simone C.",
      type: "inspiration",
      pinned: false,
      created_at: daysAgo(4),
    },
    {
      content: "NEW RESOURCE: I just uploaded a 20-minute audio teaching on 'The Difference Between Healing and Coping.' This is something I've wanted to address directly for months. Head to the Resources tab to listen. Love you all — SA 💕",
      author: "Sarah Adams",
      type: "resource",
      pinned: false,
      created_at: daysAgo(6),
    },
    {
      content: "Quick gratitude post. One year ago I applied to this community not believing I deserved to be here. Today I just signed my first client as a life coach. The work Sarah teaches doesn't just heal you — it positions you. If you're wondering whether this is worth it, it IS. 🙌🏾",
      author: "Natasha G.",
      type: "inspiration",
      pinned: false,
      created_at: daysAgo(8),
    },
  ]);

  // ── Community Events ──────────────────────────────────────────────────────
  await insert("community_events", [
    {
      title: "Monthly Live Q&A with Sarah",
      description: "Bring your hardest questions about the framework, triggers, relationships, and purpose. Sarah goes live every month exclusively for community members.",
      event_date: futureDate(4),
      event_time: "7:00 PM EST",
      format: "zoom",
      link: "https://zoom.us/j/example",
    },
    {
      title: "Accountability Partner Kickoff — Spring Cohort",
      description: "Meet your accountability partner and get paired for the next 8 weeks. Come with your top 3 goals and an open heart.",
      event_date: futureDate(10),
      event_time: "6:00 PM EST",
      format: "zoom",
      link: "https://zoom.us/j/example2",
    },
    {
      title: "Framework Deep-Dive: Step 3 — Managing Your Triggers",
      description: "A live 90-minute teaching from Sarah going deep into trigger identification, root-cause mapping, and building new response patterns.",
      event_date: futureDate(18),
      event_time: "7:30 PM EST",
      format: "zoom",
      link: null,
    },
  ]);

  // ── Resources ─────────────────────────────────────────────────────────────
  await insert("resources", [
    {
      title: "The Difference Between Healing and Coping",
      description: "A 20-minute audio teaching from Sarah on why most people are coping with pain rather than healing it — and how to tell the difference.",
      category: "Audio Teaching",
      type: "audio",
      external_link: null,
      added_at: daysAgo(6),
    },
    {
      title: "4-Step Framework Reference Guide",
      description: "A printable one-page summary of the Lead → Accountable → Triggers → Teach framework with key prompts for each step.",
      category: "Workbook",
      type: "pdf",
      external_link: null,
      added_at: daysAgo(20),
    },
    {
      title: "Trigger Map Worksheet",
      description: "The full trigger mapping worksheet from the Free Guide — expanded with deeper reflection questions for community members.",
      category: "Workbook",
      type: "workbook",
      external_link: null,
      added_at: daysAgo(35),
    },
    {
      title: "Recommended Reading: 'The Body Keeps the Score'",
      description: "Sarah's personal recommendation for understanding trauma in the body. Essential context for Step 3 of the framework.",
      category: "Reading",
      type: "link",
      external_link: "https://www.besselvanderkolk.com/resources/the-body-keeps-the-score",
      added_at: daysAgo(50),
    },
  ]);

  // ── Speaking Topics ───────────────────────────────────────────────────────
  await insert("speaking_topics", [
    { title: "Lead in Love: Choosing Alignment Over Reaction", description: "How leading with love — not fear or pride — transforms your relationships, decisions, and leadership presence.", sort_order: 0 },
    { title: "Breaking Generational Cycles for Good", description: "A powerful session on identifying and ending the inherited patterns that have quietly shaped your family for generations.", sort_order: 1 },
    { title: "The Power of Radical Accountability", description: "Why owning your story — fully and honestly — is the most liberating thing you can do, and how to practice it daily.", sort_order: 2 },
    { title: "Managing Emotional Triggers in High-Stakes Spaces", description: "Practical tools for understanding your emotional triggers, tracing them to their root, and building healthier response patterns.", sort_order: 3 },
    { title: "Turning Your Pain Into a Platform", description: "How your healing journey becomes your greatest leadership asset — and how to share it with impact, not oversharing.", sort_order: 4 },
    { title: "Walking Fully in Purpose", description: "A closing keynote on what it looks like to stop waiting for permission and start living as the fullest version of yourself.", sort_order: 5 },
  ]);

  // ── Event Formats ─────────────────────────────────────────────────────────
  await insert("event_formats", [
    { label: "Keynote Address", detail: "45–60 minutes. Best for conferences, summits, and annual events.", sort_order: 0 },
    { label: "Workshop / Breakout Session", detail: "90 minutes to half-day. Interactive, participatory, and framework-based.", sort_order: 1 },
    { label: "Panel Moderator or Panelist", detail: "Flexible format. Sarah is both a compelling panelist and a gifted moderator.", sort_order: 2 },
    { label: "Retreat Facilitator", detail: "Full-day or multi-day. Intimate groups of 10–50 women. Deep transformational work.", sort_order: 3 },
  ]);

  // ── FAQs ──────────────────────────────────────────────────────────────────
  await insert("faqs", [
    { question: "What topics does Sarah speak on?", answer: "Sarah speaks on: Lead in Love, Breaking Generational Cycles, The Power of Accountability, Managing Emotional Triggers, Turning Your Pain into a Platform, and Walking in Purpose.", category: "booking", sort_order: 0 },
    { question: "How far in advance should we book Sarah?", answer: "We recommend reaching out at least 6–8 weeks before your event. For larger conferences, 3–6 months is preferred to ensure availability.", category: "booking", sort_order: 1 },
    { question: "Does Sarah speak virtually?", answer: "Yes. Sarah accepts both in-person and virtual engagements. Virtual keynotes are available via Zoom or the platform of your choice.", category: "booking", sort_order: 2 },
    { question: "How do I know which coaching program is right for me?", answer: "The Purpose Clarity Session is the best first step for most women. In 90 minutes, you'll get clarity on where you are and which program will serve you best.", category: "programs", sort_order: 3 },
    { question: "Are coaching programs available online?", answer: "Yes. All programs are delivered via video call and are available to women worldwide.", category: "programs", sort_order: 4 },
    { question: "How do I join the community?", answer: "Submit an application through the Community page. Sarah personally reviews each application to ensure it's the right fit for you and the community.", category: "community", sort_order: 5 },
    { question: "What is the community membership like?", answer: "Members get access to live monthly sessions with Sarah, exclusive content, accountability partnerships, a private discussion space, and a resource library.", category: "community", sort_order: 6 },
  ]);

  // ── Platform Settings ─────────────────────────────────────────────────────
  await insert("platform_settings", [
    {
      contact_email: "hello@evolve2purpose.com",
      booking_email: "bookings@evolve2purpose.com",
      social_instagram: "https://instagram.com/evolve2purpose",
      social_youtube: "https://youtube.com/@evolve2purpose",
      social_facebook: "https://facebook.com/evolve2purpose",
    },
  ]);

  console.log("\n✅  Seed complete! Visit /admin to see your populated dashboard.\n");
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
