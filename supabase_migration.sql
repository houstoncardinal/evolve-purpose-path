-- ============================================================
-- Evolve 2 Purpose — Full Database Migration
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Drop tables (clean slate if re-running) ─────────────────
drop table if exists resources cascade;
drop table if exists community_events cascade;
drop table if exists community_posts cascade;
drop table if exists faqs cascade;
drop table if exists event_formats cascade;
drop table if exists speaking_topics cascade;
drop table if exists testimonials cascade;
drop table if exists program_enrollments cascade;
drop table if exists community_applications cascade;
drop table if exists booking_inquiries cascade;
drop table if exists subscribers cascade;
drop table if exists orders cascade;
drop table if exists bundles cascade;
drop table if exists products cascade;
drop table if exists platform_settings cascade;
drop table if exists admin_users cascade;

-- ============================================================
-- TABLES
-- ============================================================

-- ─── Admin Users ─────────────────────────────────────────────
create table admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz default now()
);

-- ─── Platform Settings ───────────────────────────────────────
create table platform_settings (
  id uuid primary key default uuid_generate_v4(),
  contact_email text not null default 'hello@evolve2purpose.com',
  booking_email text not null default 'bookings@evolve2purpose.com',
  social_instagram text default 'https://instagram.com/evolve2purpose',
  social_youtube text default 'https://youtube.com/@evolve2purpose',
  social_facebook text default 'https://facebook.com/evolve2purpose',
  updated_at timestamptz default now()
);

-- ─── Products ────────────────────────────────────────────────
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short_name text not null,
  price numeric(10,2) not null,
  category text not null check (category in ('physical', 'digital', 'bundle')),
  status text not null default 'active' check (status in ('active', 'coming_soon', 'inactive')),
  badge text,
  description text,
  sales integer not null default 0,
  revenue numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

-- ─── Bundles ─────────────────────────────────────────────────
create table bundles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric(10,2) not null,
  original_price numeric(10,2) not null,
  items text[] not null default '{}',
  badge text,
  description text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

-- ─── Orders ──────────────────────────────────────────────────
create table orders (
  id text primary key,
  customer text not null,
  email text not null,
  product text not null,
  product_id uuid references products(id) on delete set null,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'fulfilled', 'refunded')),
  notes text,
  created_at timestamptz default now()
);

-- ─── Subscribers ─────────────────────────────────────────────
create table subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text,
  source text not null default 'homepage' check (source in ('homepage', 'free-guide', 'programs', 'footer', 'shop', 'manual')),
  created_at timestamptz default now()
);

-- ─── Booking Inquiries ───────────────────────────────────────
create table booking_inquiries (
  id text primary key,
  name text not null,
  email text not null,
  organization text not null,
  event_type text not null,
  audience_size text,
  event_date date,
  details text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'confirmed', 'declined')),
  notes text,
  submitted_at timestamptz default now()
);

-- ─── Community Applications ──────────────────────────────────
create table community_applications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  applied_at timestamptz default now()
);

-- ─── Program Enrollments ─────────────────────────────────────
create table program_enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  program text not null,
  amount numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'enrolled', 'active', 'completed', 'paused')),
  scheduled_date date,
  scheduled_time text,
  answers jsonb default '{}'::jsonb,
  enrolled_at timestamptz default now()
);

-- ─── Testimonials ────────────────────────────────────────────
create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  name text not null,
  detail text,
  transformation text,
  program text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- ─── Speaking Topics ─────────────────────────────────────────
create table speaking_topics (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  sort_order integer not null default 0
);

-- ─── Event Formats ───────────────────────────────────────────
create table event_formats (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  detail text,
  sort_order integer not null default 0
);

-- ─── FAQs ────────────────────────────────────────────────────
create table faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  category text not null default 'general' check (category in ('booking', 'programs', 'community', 'general')),
  sort_order integer not null default 0
);

-- ─── Community Posts ─────────────────────────────────────────
create table community_posts (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  author text not null default 'Sarah Adams',
  type text not null default 'inspiration' check (type in ('announcement', 'inspiration', 'resource')),
  pinned boolean not null default false,
  created_at timestamptz default now()
);

-- ─── Community Events ────────────────────────────────────────
create table community_events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  format text not null default 'zoom' check (format in ('zoom', 'in-person', 'both')),
  link text,
  created_at timestamptz default now()
);

-- ─── Resources ───────────────────────────────────────────────
create table resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text,
  external_link text,
  type text not null default 'pdf' check (type in ('pdf', 'audio', 'video', 'link', 'workbook')),
  added_at timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index on orders(status);
create index on orders(created_at desc);
create index on subscribers(source);
create index on subscribers(created_at desc);
create index on booking_inquiries(status);
create index on community_applications(status);
create index on program_enrollments(status);
create index on program_enrollments(user_id);
create index on program_enrollments(email);
create index on testimonials(featured);
create index on testimonials(sort_order);
create index on community_posts(pinned);
create index on community_events(event_date);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
alter table admin_users enable row level security;
alter table platform_settings enable row level security;
alter table products enable row level security;
alter table bundles enable row level security;
alter table orders enable row level security;
alter table subscribers enable row level security;
alter table booking_inquiries enable row level security;
alter table community_applications enable row level security;
alter table program_enrollments enable row level security;
alter table testimonials enable row level security;
alter table speaking_topics enable row level security;
alter table event_formats enable row level security;
alter table faqs enable row level security;
alter table community_posts enable row level security;
alter table community_events enable row level security;
alter table resources enable row level security;

-- Public read policies (safe to read publicly)
create policy "Public can read products"         on products         for select using (true);
create policy "Public can read bundles"          on bundles          for select using (true);
create policy "Public can read testimonials"     on testimonials     for select using (true);
create policy "Public can read speaking_topics"  on speaking_topics  for select using (true);
create policy "Public can read event_formats"    on event_formats    for select using (true);
create policy "Public can read faqs"             on faqs             for select using (true);
create policy "Public can read community_posts"  on community_posts  for select using (true);
create policy "Public can read community_events" on community_events for select using (true);
create policy "Public can read resources"        on resources        for select using (true);

-- Public insert policies (forms)
create policy "Public can subscribe"               on subscribers             for insert with check (true);
create policy "Public can submit booking"          on booking_inquiries       for insert with check (true);
create policy "Public can apply to community"      on community_applications  for insert with check (true);
create policy "Public can enroll in program"       on program_enrollments     for insert with check (true);

-- Admin full access (authenticated users only)
create policy "Admins full access products"            on products            for all using (auth.role() = 'authenticated');
create policy "Admins full access bundles"             on bundles             for all using (auth.role() = 'authenticated');
create policy "Admins full access orders"              on orders              for all using (auth.role() = 'authenticated');
create policy "Admins full access subscribers"         on subscribers         for all using (auth.role() = 'authenticated');
create policy "Admins full access booking_inquiries"   on booking_inquiries   for all using (auth.role() = 'authenticated');
create policy "Admins full access community_apps"      on community_applications for all using (auth.role() = 'authenticated');
create policy "Admins full access enrollments"         on program_enrollments for all using (auth.role() = 'authenticated');
create policy "Admins full access testimonials"        on testimonials        for all using (auth.role() = 'authenticated');
create policy "Admins full access speaking_topics"     on speaking_topics     for all using (auth.role() = 'authenticated');
create policy "Admins full access event_formats"       on event_formats       for all using (auth.role() = 'authenticated');
create policy "Admins full access faqs"                on faqs                for all using (auth.role() = 'authenticated');
create policy "Admins full access community_posts"     on community_posts     for all using (auth.role() = 'authenticated');
create policy "Admins full access community_events"    on community_events    for all using (auth.role() = 'authenticated');
create policy "Admins full access resources"           on resources           for all using (auth.role() = 'authenticated');
create policy "Admins full access settings"            on platform_settings   for all using (auth.role() = 'authenticated');
create policy "Admins full access admin_users"         on admin_users         for all using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- Platform settings (single row)
insert into platform_settings (contact_email, booking_email, social_instagram, social_youtube, social_facebook)
values (
  'hello@evolve2purpose.com',
  'bookings@evolve2purpose.com',
  'https://instagram.com/evolve2purpose',
  'https://youtube.com/@evolve2purpose',
  'https://facebook.com/evolve2purpose'
);

-- Products
insert into products (name, short_name, price, category, status, badge, description, sales, revenue) values
  ('Healing & Alignment Journal',          'H&A Journal',       34.99, 'physical', 'active',      'Bestseller', 'A guided journal for deep healing and spiritual alignment.',                               142, 4968.58),
  ('Breaking Cycles Workbook',             'Cycles Workbook',   24.99, 'physical', 'active',      null,         'Practical exercises to identify and break recurring life patterns.',                      98,  2449.02),
  ('Declaration & Affirmation Card Deck',  'Card Deck',         19.99, 'physical', 'active',      'New',        '52 affirmation cards rooted in scripture and purpose.',                                   74,  1479.26),
  ('Purpose Activation Masterclass',       'Masterclass',       97.00, 'digital',  'active',      null,         '5-module digital course for purpose-driven transformation.',                              61,  5917.00),
  ('Inner Restoration Audio Collection',   'Audio Collection',  29.99, 'digital',  'active',      null,         '12 guided audio tracks for healing and restoration.',                                     83,  2489.17),
  ('Anointing Oil ''Restoration''',        'Anointing Oil',     22.00, 'physical', 'coming_soon', null,         'Hand-crafted anointing oil for intentional prayer rituals.',                              0,   0.00);

-- Bundles
insert into bundles (name, price, original_price, items, badge, description, status) values
  ('The Starter Kit',      49.99, 54.98,  array['Healing & Alignment Journal', 'Declaration & Affirmation Card Deck'],                                                                                          'Bundle',     'Journal + Card Deck bundle. Save $5.',                  'active'),
  ('The Deep-Work Bundle', 64.99, 74.97,  array['Healing & Alignment Journal', 'Breaking Cycles Workbook', 'Declaration & Affirmation Card Deck'],                                                              'Best Value', 'Journal + Workbook + Card Deck. Save $10.',             'active'),
  ('The Complete Toolkit', 174.99,206.96, array['Healing & Alignment Journal', 'Breaking Cycles Workbook', 'Declaration & Affirmation Card Deck', 'Purpose Activation Masterclass', 'Inner Restoration Audio Collection'], 'All-In', 'All 5 digital & physical items. Save $32.',  'active');

-- Testimonials
insert into testimonials (quote, name, detail, transformation, program, featured, sort_order) values
  ('I came to Sarah completely shattered. I had built what everyone thought was a successful life — but inside I was hollow. Three months into working with her, something cracked open that I didn''t even know was locked. She didn''t just help me heal. She helped me find out who I actually am. I don''t know who I would be without this work.',
   'Keisha L.', '1:1 Coaching — 6-Month Journey', 'From functioning but empty, to fully alive and leading', '1:1 Deep-Dive Coaching', true, 0),
  ('Sarah''s guidance helped me see what I''d been carrying for years. For the first time in my life, I feel truly free to walk in my purpose. My family can feel the difference.',
   'Tamara J.', 'Healed from 15 years of unforgiveness', 'From bitterness to radical freedom', 'Group Program', false, 1),
  ('I didn''t know healing could feel this safe. Through the 4-Step Framework, I finally broke the cycle that had haunted three generations of my family. My daughters will not carry what I carried.',
   'Michelle R.', 'Mother of 3, generational cycle breaker', 'From generational trauma to generational blessing', 'Healing Intensive', false, 2),
  ('Working with Sarah changed everything. I went from barely surviving to thriving — emotionally, professionally, and in my relationships. I launched my business within 6 months of completing the program.',
   'Denise W.', 'Purpose-activated entrepreneur', 'From survival mode to purpose activation', '1:1 Coaching', false, 3),
  ('The Purpose Clarity Session alone was worth more than two years of therapy I''d been through. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction.',
   'Angela M.', 'Found clarity and a new sense of direction', 'From confusion to decisive clarity', 'Purpose Clarity Session', false, 4),
  ('I was skeptical. After going through the Healing Intensive, I released 20 years of pain in 2 days. I didn''t even know I was carrying that much weight until it was gone.',
   'Priscilla T.', 'Healing Intensive graduate', 'From hidden pain to visible freedom', 'Healing Intensive', false, 5),
  ('Sarah never let me hide in my story. She pushed me — with love — to own my part and stop waiting for someone else to fix what only I could fix. That accountability changed my life.',
   'Renee B.', 'Accountability transformed her relationships', 'From victimhood to ownership', 'Group Program', false, 6),
  ('The community that surrounds Sarah''s work is unlike anything I''ve ever experienced. I came for coaching and left with a sisterhood that still holds me accountable today.',
   'Tanya M.', 'Still an active community member after 2 years', 'From isolation to deep community', 'Group Program', false, 7),
  ('I never understood why I kept blowing up the good things in my life until Sarah helped me see my triggers. That single insight — understanding where my reactions were coming from — flipped everything.',
   'Cynthia A.', 'Broke a decade-long pattern of self-sabotage', 'From reactive to intentional', '1:1 Coaching', false, 8),
  ('I applied everything Sarah taught me — and then I started teaching it to others. I now lead a small group in my community using the same 4 steps. My pain became my platform.',
   'LaShonda K.', 'Now a community group leader', 'From student to teacher', 'Group Program', false, 9);

-- Speaking Topics
insert into speaking_topics (title, description, sort_order) values
  ('Lead in Love',               'How choosing love over reaction transforms relationships, leadership, and personal outcomes.',                              0),
  ('The Accountability Advantage','Why taking radical ownership is the fastest path to freedom, healing, and next-level growth.',                            1),
  ('Mastering Your Triggers',    'Understanding the emotional wounds beneath reactive behavior — and practical tools to break the cycle.',                   2),
  ('From Hurt to Helper',        'How your deepest wounds become your greatest gift when you learn to share what you''ve survived.',                        3),
  ('Evolve 2 Purpose',           'The full 4-step transformation framework as a keynote or workshop experience for your audience.',                          4),
  ('Healing Generational Cycles','Breaking the inherited patterns that silently shape behavior, relationships, and destiny.',                               5);

-- Event Formats
insert into event_formats (label, detail, sort_order) values
  ('Keynote Address',        '45 – 90 minutes', 0),
  ('Workshop / Breakout',    '2 – 4 hours',     1),
  ('Full-Day Retreat',       '6 – 8 hours',     2),
  ('Panel / Fireside Chat',  '30 – 60 minutes', 3),
  ('Corporate Training',     'Half or full day',4),
  ('Virtual / Livestream',   'Any format',      5);

-- FAQs
insert into faqs (question, answer, category, sort_order) values
  ('What types of events does Sarah speak at?',
   'Sarah speaks at women''s conferences, corporate leadership retreats, church events, university programs, community summits, and private organizational gatherings. If it involves transformation, growth, and purpose — she''s the right fit.',
   'booking', 0),
  ('How far in advance should we book?',
   'We recommend submitting an inquiry at least 6–8 weeks before your event date. For major conferences or signature events, 3–6 months ahead is ideal to ensure availability.',
   'booking', 1),
  ('Does Sarah offer virtual presentations?',
   'Yes. Sarah delivers powerful virtual keynotes and workshops via Zoom, Teams, or your platform of choice — with the same energy and impact as in-person.',
   'booking', 2),
  ('Can we customize the topic for our audience?',
   'Absolutely. Sarah works closely with event organizers to tailor her message to your audience''s specific needs, industry context, and desired outcomes.',
   'booking', 3);

-- Community Posts
insert into community_posts (content, author, type, pinned, created_at) values
  ('Good morning, purpose family! Starting this week with a reminder: your healing is not just for you. Every step forward you take creates a path for someone behind you. Walk boldly.',
   'Sarah Adams', 'inspiration', true, now() - interval '1 day'),
  ('NEW RESOURCE DROPPED: The Trigger Mapping Worksheet is now available in the library. This tool changed my life and I know it will shift yours too. Go get it!',
   'Sarah Adams', 'resource', false, now() - interval '3 days'),
  ('Monthly accountability circles are now forming for April. Drop a comment if you want to be matched. Limited to groups of 5.',
   'Sarah Adams', 'announcement', false, now() - interval '7 days');

-- Community Events
insert into community_events (title, description, event_date, event_time, format, link) values
  ('Monthly Live Q&A with Sarah',       'Bring your questions, your struggles, and your wins. We go live every first Tuesday.',                     (current_date + interval '7 days')::date,  '7:00 PM EST', 'zoom', 'https://zoom.us/j/example'),
  ('Healing Workshop: Managing Triggers','Deep-dive workshop on the 4-step trigger management process with live coaching.',                          (current_date + interval '14 days')::date, '6:00 PM EST', 'zoom', null),
  ('Accountability Circle Kickoff',      'New circles forming this month. Meet your accountability sisters and get started.',                        (current_date + interval '21 days')::date, '5:00 PM EST', 'zoom', null);

-- Resources
insert into resources (title, description, category, type, added_at) values
  ('Trigger Mapping Worksheet',              'Identify your core triggers and trace them to their root wounds.',          'Healing Tools',       'pdf',      '2025-10-01'),
  ('Morning Alignment Ritual Guide',         'A 7-minute daily practice to start every day in alignment.',               'Daily Practices',     'pdf',      '2025-10-15'),
  ('Accountability Partner Agreement Template','A structured template for your accountability circle commitments.',       'Community Tools',     'workbook', '2025-11-01'),
  ('Healing Meditation: Releasing Unforgiveness','25-minute guided audio meditation for releasing bitterness and wounds.','Meditations',         'audio',    '2025-11-15'),
  ('Framework Deep Dive: Lead in Love',      'Extended teaching on Step 1 — choosing love over reaction.',              'Framework Teachings', 'video',    '2025-12-01');

-- ============================================================
-- DONE
-- ============================================================
-- All tables, RLS policies, indexes, and seed data are ready.
-- Next step: Set up your admin user in Supabase Auth
--   Dashboard → Authentication → Users → Add User
--   Use the email you want to log in with as admin.
-- ============================================================
