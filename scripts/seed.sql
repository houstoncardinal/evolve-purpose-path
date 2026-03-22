-- ─────────────────────────────────────────────────────────────────────────────
-- Evolve 2 Purpose — Demo Seed Data
-- Run this in the Supabase SQL Editor (bypasses RLS)
-- Safe to re-run: clears existing demo data first
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Clear existing data (re-run safe) ────────────────────────────────────────
TRUNCATE TABLE products, bundles, orders, subscribers, booking_inquiries,
               community_applications, program_enrollments, testimonials,
               community_posts, community_events, resources, speaking_topics,
               event_formats, faqs RESTART IDENTITY CASCADE;
DELETE FROM platform_settings;

-- ── Products ─────────────────────────────────────────────────────────────────
INSERT INTO products (name, short_name, price, category, status, badge, description, sales, revenue) VALUES
  ('Healing & Alignment Journal',          'Journal',    34.99,  'physical', 'active',      'Bestseller',  'A beautifully designed guided journal that walks you through the 4-Step Framework at your own pace.', 184, 6438.16),
  ('Breaking Cycles Workbook',             'Workbook',   24.99,  'physical', 'active',      NULL,          'A deep-dive workbook to identify and dismantle the inherited patterns quietly running your life.',      97,  2424.03),
  ('Declaration & Affirmation Card Deck',  'Card Deck',  19.99,  'physical', 'active',      'New',         '40 beautifully designed cards with daily declarations rooted in the Evolve 2 Purpose framework.',      63,  1259.37),
  ('Purpose Activation Masterclass',       'Masterclass',97.00,  'digital',  'active',      NULL,          'A self-paced digital course built on Step 4 of the Framework — Teach Someone Else What You Learned.',    41,  3977.00),
  ('Inner Restoration Audio Collection',   'Audio',      29.99,  'digital',  'active',      NULL,          '12 guided meditations and spoken affirmations designed to support the healing journey.',                  55,  1649.45),
  ('Anointing Oil — Restoration',          'Oil',        22.00,  'physical', 'coming_soon', 'Coming Soon', 'A hand-blended anointing oil crafted with prayer and intention for your healing practice.',              0,   0.00);

-- ── Bundles ───────────────────────────────────────────────────────────────────
INSERT INTO bundles (name, price, original_price, items, badge, description, status) VALUES
  ('The Starter Kit',      49.99,  54.98,  ARRAY['Healing & Alignment Journal','Declaration Card Deck'],                                                   'Most Popular', 'The perfect entry point. Everything you need to begin working the framework on your own.',           'active'),
  ('The Deep-Work Bundle', 64.99,  74.97,  ARRAY['Breaking Cycles Workbook','Inner Restoration Audio Collection','Declaration Card Deck'],                  'Best Value',   'For the woman who is ready to go all the way in.',                                                   'active'),
  ('The Complete Toolkit', 174.99, 206.96, ARRAY['Healing Journal','Breaking Cycles Workbook','Card Deck','Masterclass','Audio Collection'],                'All-In',       'Every physical and digital resource in one comprehensive package.',                                  'active');

-- ── Orders ────────────────────────────────────────────────────────────────────
INSERT INTO orders (customer, email, product, product_id, amount, status, created_at, notes) VALUES
  ('Keisha Thompson',  'keisha.t@gmail.com',      'Healing & Alignment Journal',          NULL, 34.99,  'fulfilled',  NOW() - INTERVAL '1 day',   NULL),
  ('Tamara Williams',  'tamara.w@icloud.com',     'Purpose Activation Masterclass',       NULL, 97.00,  'fulfilled',  NOW() - INTERVAL '2 days',  NULL),
  ('Denise Harper',    'denise.h@yahoo.com',       'The Complete Toolkit',                 NULL, 174.99, 'processing', NOW() - INTERVAL '2 days',  NULL),
  ('Angela Morris',    'angela.m@gmail.com',       'Breaking Cycles Workbook',             NULL, 24.99,  'fulfilled',  NOW() - INTERVAL '3 days',  NULL),
  ('LaShonda King',    'lashonda.k@gmail.com',     'The Starter Kit',                      NULL, 49.99,  'fulfilled',  NOW() - INTERVAL '4 days',  NULL),
  ('Monique Davis',    'monique.d@outlook.com',    'Inner Restoration Audio Collection',   NULL, 29.99,  'fulfilled',  NOW() - INTERVAL '5 days',  NULL),
  ('Brianna Scott',    'brianna.s@gmail.com',      'Declaration & Affirmation Card Deck',  NULL, 19.99,  'pending',    NOW() - INTERVAL '5 days',  NULL),
  ('Yolanda Jackson',  'yolanda.j@icloud.com',     'Healing & Alignment Journal',          NULL, 34.99,  'fulfilled',  NOW() - INTERVAL '7 days',  NULL),
  ('Crystal Reed',     'crystal.r@gmail.com',      'Purpose Activation Masterclass',       NULL, 97.00,  'fulfilled',  NOW() - INTERVAL '8 days',  NULL),
  ('Tiffany Brown',    'tiffany.b@yahoo.com',      'The Deep-Work Bundle',                 NULL, 64.99,  'fulfilled',  NOW() - INTERVAL '9 days',  NULL),
  ('Natasha Green',    'natasha.g@gmail.com',      'Breaking Cycles Workbook',             NULL, 24.99,  'fulfilled',  NOW() - INTERVAL '10 days', NULL),
  ('Simone Carter',    'simone.c@icloud.com',      'Inner Restoration Audio Collection',   NULL, 29.99,  'pending',    NOW() - INTERVAL '11 days', NULL),
  ('Renee Mitchell',   'renee.m@gmail.com',        'The Complete Toolkit',                 NULL, 174.99, 'fulfilled',  NOW() - INTERVAL '13 days', 'Gift order — please include gift note.'),
  ('Jasmine Turner',   'jasmine.t@outlook.com',    'Declaration & Affirmation Card Deck',  NULL, 19.99,  'refunded',   NOW() - INTERVAL '16 days', 'Ordered duplicate by mistake.'),
  ('Chantel Robinson', 'chantel.r@gmail.com',      'Healing & Alignment Journal',          NULL, 34.99,  'fulfilled',  NOW() - INTERVAL '18 days', NULL),
  ('Maya Washington',  'maya.w@gmail.com',         'Purpose Activation Masterclass',       NULL, 97.00,  'fulfilled',  NOW() - INTERVAL '21 days', NULL),
  ('Priya Singh',      'priya.s@icloud.com',       'The Starter Kit',                      NULL, 49.99,  'fulfilled',  NOW() - INTERVAL '24 days', NULL),
  ('Ebony Patterson',  'ebony.p@gmail.com',        'Breaking Cycles Workbook',             NULL, 24.99,  'fulfilled',  NOW() - INTERVAL '27 days', NULL);

-- ── Subscribers ──────────────────────────────────────────────────────────────
INSERT INTO subscribers (name, email, source, created_at) VALUES
  ('Keisha Thompson',  'keisha.t@gmail.com',    'free-guide', NOW() - INTERVAL '1 day'),
  ('Tamara Williams',  'tamara.w@icloud.com',   'homepage',   NOW() - INTERVAL '2 days'),
  ('Angela Morris',    'angela.m@gmail.com',    'programs',   NOW() - INTERVAL '3 days'),
  ('Denise Harper',    'denise.h@yahoo.com',    'free-guide', NOW() - INTERVAL '4 days'),
  ('LaShonda King',    'lashonda.k@gmail.com',  'footer',     NOW() - INTERVAL '5 days'),
  ('Monique Davis',    'monique.d@outlook.com', 'homepage',   NOW() - INTERVAL '6 days'),
  ('Brianna Scott',    'brianna.s@gmail.com',   'free-guide', NOW() - INTERVAL '8 days'),
  ('Yolanda Jackson',  'yolanda.j@icloud.com',  'programs',   NOW() - INTERVAL '9 days'),
  ('Crystal Reed',     'crystal.r@gmail.com',   'homepage',   NOW() - INTERVAL '10 days'),
  ('Tiffany Brown',    'tiffany.b@yahoo.com',   'shop',       NOW() - INTERVAL '11 days'),
  ('Natasha Green',    'natasha.g@gmail.com',   'free-guide', NOW() - INTERVAL '12 days'),
  ('Simone Carter',    'simone.c@icloud.com',   'footer',     NOW() - INTERVAL '13 days'),
  ('Renee Mitchell',   'renee.m@gmail.com',     'homepage',   NOW() - INTERVAL '15 days'),
  ('Jasmine Turner',   'jasmine.t@outlook.com', 'free-guide', NOW() - INTERVAL '17 days'),
  ('Chantel Robinson', 'chantel.r@gmail.com',   'programs',   NOW() - INTERVAL '19 days'),
  ('Maya Washington',  'maya.w@gmail.com',      'homepage',   NOW() - INTERVAL '21 days'),
  ('Priya Singh',      'priya.s@icloud.com',    'free-guide', NOW() - INTERVAL '23 days'),
  ('Ebony Patterson',  'ebony.p@gmail.com',     'shop',       NOW() - INTERVAL '25 days'),
  ('Vanessa Hughes',   'vanessa.h@gmail.com',   'footer',     NOW() - INTERVAL '28 days'),
  ('Tonya Barnes',     'tonya.b@icloud.com',    'homepage',   NOW() - INTERVAL '31 days'),
  ('Felicia Owens',    'felicia.o@yahoo.com',   'free-guide', NOW() - INTERVAL '34 days'),
  ('Candice Foster',   'candice.f@gmail.com',   'programs',   NOW() - INTERVAL '38 days')
ON CONFLICT (email) DO NOTHING;

-- ── Booking Inquiries ─────────────────────────────────────────────────────────
INSERT INTO booking_inquiries (name, email, organization, event_type, audience_size, event_date, details, status, submitted_at, notes) VALUES
  (
    'Pastor Veronica Cole', 'vcole@gracecommunity.org', 'Grace Community Church',
    'Women''s Conference', '250–400', CURRENT_DATE + INTERVAL '45 days',
    'We are hosting our annual Women of Purpose conference and would love for Sarah to deliver the keynote. Theme is breaking generational cycles in the family. We have budget for travel and honorarium.',
    'new', NOW() - INTERVAL '1 day', NULL
  ),
  (
    'Dr. Latoya Freeman', 'lfreeman@empowerher.org', 'EmpowerHER Summit',
    'Keynote', '800–1,200', CURRENT_DATE + INTERVAL '90 days',
    'EmpowerHER is a national conference for professional Black women. Sarah''s message on accountability and purpose aligns perfectly with our 2026 theme. Looking for a 45-minute keynote.',
    'reviewing', NOW() - INTERVAL '4 days', 'Strong lead — following up on budget approval from board.'
  ),
  (
    'Michelle Torres', 'michelle.torres@corporatewell.com', 'Corporate Wellness Partners',
    'Corporate Workshop', '50–75', CURRENT_DATE + INTERVAL '30 days',
    'Half-day wellness workshop for our HR and leadership team. Focus on emotional triggers in the workplace. Sarah''s trigger management framework is exactly what we need.',
    'confirmed', NOW() - INTERVAL '10 days', 'Contract signed. Deposit received. Send logistics form.'
  ),
  (
    'Sister Yvonne Caldwell', 'ycaldwell@newlifemin.org', 'New Life Ministries',
    'Retreat', '30–50', CURRENT_DATE + INTERVAL '60 days',
    'Annual women''s healing retreat — two days, overnight. We want Sarah to lead a session on the full 4-step framework. Small, intimate gathering of church leaders.',
    'new', NOW() - INTERVAL '2 days', NULL
  ),
  (
    'Danielle Brooks', 'dbrooks@sororityalpha.org', 'Alpha Chapter — Delta Sigma Theta',
    'Chapter Event', '100–150', CURRENT_DATE + INTERVAL '75 days',
    'Hosting a community empowerment night for members and guests. Looking for a 60-minute talk on leading in love and personal accountability. Hybrid — in person and Zoom.',
    'reviewing', NOW() - INTERVAL '7 days', 'Waiting on venue confirmation before locking in.'
  ),
  (
    'Kezia Okafor', 'kezia@risewomennetwork.com', 'RISE Women''s Network',
    'Panel + Keynote', '300–500', CURRENT_DATE + INTERVAL '120 days',
    'Annual RISE Summit. We''d love Sarah as a keynote AND to sit on a panel discussion. Reach is over 12K women across the US. Strong media coverage expected.',
    'new', NOW(), NULL
  );

-- ── Community Applications ────────────────────────────────────────────────────
INSERT INTO community_applications (name, email, reason, status, applied_at) VALUES
  ('Aaliyah Brooks',   'aaliyah.b@gmail.com',    'I have been following Sarah''s content for two years and her framework literally saved my marriage. I want to be surrounded by women who are doing the work, not just talking about it. I am ready to go deeper.',                                                    'pending',  NOW() - INTERVAL '1 day'),
  ('Courtney James',   'courtney.j@icloud.com',  'I recently completed the Purpose Clarity Session and Sarah told me the community would be the best next step. I need ongoing support as I transition out of corporate and into my calling.',                                                                        'pending',  NOW() - INTERVAL '2 days'),
  ('Brianna Scott',    'brianna.s@gmail.com',     'I have been doing the group program and I want to continue growing after it ends. The community feels like the right container to stay in accountability and connection.',                                                                                          'pending',  NOW()),
  ('Simone Carter',    'simone.c@icloud.com',     'I have been in and out of therapy for years and nothing has addressed the root. Sarah''s framework speaks to generational patterns in a way therapy never did. I want to do this work in community.',                                                              'approved', NOW() - INTERVAL '8 days'),
  ('Natasha Green',    'natasha.g@gmail.com',     'I downloaded the free guide and cried through the entire trigger map section. I know this community is where I need to be. I am a single mom healing from a toxic relationship and I need women who understand.',                                                 'approved', NOW() - INTERVAL '10 days'),
  ('Tiffany Brown',    'tiffany.b@yahoo.com',     'I have been circling the same patterns for 10 years and I am done. Sarah''s message gave me language for what I have been experiencing. I want to be held accountable in community.',                                                                              'approved', NOW() - INTERVAL '12 days'),
  ('Renee Mitchell',   'renee.m@gmail.com',       'I am a therapist who recommends Evolve 2 Purpose to my clients. I want to experience the community firsthand so I can speak to it authentically. I am also personally in a season of my own healing.',                                                             'approved', NOW() - INTERVAL '15 days'),
  ('Priya Singh',      'priya.s@icloud.com',      'As a woman of color navigating corporate spaces, I have carried a lot of unaddressed trauma around identity and worth. Sarah''s framework bridges faith and practical healing in a way that finally makes sense to me.',                                          'approved', NOW() - INTERVAL '19 days'),
  ('Destiny Wallace',  'destiny.w@gmail.com',     'I am a 22-year-old first-generation college graduate trying to figure out who I am outside of what my family needs me to be. I feel called to this community.',                                                                                                   'declined', NOW() - INTERVAL '22 days');

-- ── Program Enrollments ───────────────────────────────────────────────────────
INSERT INTO program_enrollments (name, email, program, amount, status, enrolled_at) VALUES
  ('Simone Carter',    'simone.c@icloud.com',  'Evolve 2 Purpose Group Program', 497,  'active',    NOW() - INTERVAL '5 days'),
  ('Natasha Green',    'natasha.g@gmail.com',  '1:1 Deep-Dive Coaching',         1800, 'active',    NOW() - INTERVAL '7 days'),
  ('Tiffany Brown',    'tiffany.b@yahoo.com',  'Purpose Clarity Session',        197,  'completed', NOW() - INTERVAL '14 days'),
  ('Renee Mitchell',   'renee.m@gmail.com',    'Evolve 2 Purpose Group Program', 497,  'active',    NOW() - INTERVAL '10 days'),
  ('Crystal Reed',     'crystal.r@gmail.com',  '1:1 Deep-Dive Coaching',         1800, 'active',    NOW() - INTERVAL '21 days'),
  ('Yolanda Jackson',  'yolanda.j@icloud.com', 'Healing Intensive Weekend',       997,  'completed', NOW() - INTERVAL '35 days'),
  ('Maya Washington',  'maya.w@gmail.com',     'Purpose Clarity Session',        197,  'completed', NOW() - INTERVAL '28 days'),
  ('Chantel Robinson', 'chantel.r@gmail.com',  'Evolve 2 Purpose Group Program', 497,  'active',    NOW() - INTERVAL '12 days'),
  ('Priya Singh',      'priya.s@icloud.com',   'Purpose Clarity Session',        197,  'completed', NOW() - INTERVAL '19 days'),
  ('LaShonda King',    'lashonda.k@gmail.com', 'Healing Intensive Weekend',       997,  'paused',    NOW() - INTERVAL '42 days'),
  ('Angela Morris',    'angela.m@gmail.com',   '1:1 Deep-Dive Coaching',         1800, 'active',    NOW() - INTERVAL '30 days'),
  ('Keisha Thompson',  'keisha.t@gmail.com',   'Evolve 2 Purpose Group Program', 497,  'active',    NOW() - INTERVAL '8 days');

-- ── Testimonials ──────────────────────────────────────────────────────────────
INSERT INTO testimonials (quote, name, detail, transformation, program, featured, sort_order) VALUES
  ('I came to Sarah completely shattered. Three months into working with her, something cracked open that I didn''t even know was locked. She didn''t just help me heal — she helped me find out who I actually am.',
   'Keisha L.', '1:1 Coaching Client', 'Healed from childhood abandonment and found her calling', '1:1 Deep-Dive Coaching', TRUE, 0),
  ('Sarah''s guidance helped me see what I had been carrying for years. For the first time in my life, I feel truly free to walk in my purpose.',
   'Tamara J.', 'Group Program Graduate', 'Released a 12-year toxic relationship cycle', 'Group Program', FALSE, 1),
  ('The Purpose Clarity Session alone was worth more than two years of therapy. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction.',
   'Angela M.', 'Purpose Clarity Session Client', 'Left a dead-end career and launched her own business', 'Purpose Clarity Session', FALSE, 2),
  ('I am not the same woman who enrolled in this program. I understand my triggers now. I lead in love now. I actually like who I''m becoming.',
   'Denise W.', 'Group Program Graduate', 'Restored marriage and rebuilt relationship with her daughters', 'Group Program', FALSE, 3),
  ('Working with Sarah 1:1 was the single greatest investment I''ve ever made in myself. Within 90 days my entire life had shifted — my business, my relationships, my identity.',
   'Crystal R.', '1:1 Coaching Client', 'Tripled her business revenue while healing from burnout', '1:1 Deep-Dive Coaching', FALSE, 4),
  ('I sent this guide to my sister, my mother, and two friends. It starts the conversation so many of us need to have but don''t know how. The trigger map changed everything.',
   'LaShonda K.', 'Community Member', 'Started the healing conversation in her family for the first time', 'Free Guide', FALSE, 5),
  ('The Healing Intensive weekend was the most powerful 48 hours of my life. I walked in as one woman and left as another. No exaggeration.',
   'Yolanda J.', 'Healing Intensive Graduate', 'Broke a 30-year cycle of people-pleasing and codependency', 'Healing Intensive Weekend', FALSE, 6),
  ('I was skeptical. I had done therapy, coaching, everything. But Sarah''s approach is different — it''s the root work, not the surface symptoms. Three months later I barely recognize my thought patterns.',
   'Renee M.', 'Group Program Graduate', 'Overcame chronic anxiety and stepped into leadership at work', 'Group Program', FALSE, 7);

-- ── Community Posts ───────────────────────────────────────────────────────────
INSERT INTO community_posts (content, author, type, pinned, created_at) VALUES
  ('This week I want to talk about something most people skip — the moment AFTER the breakthrough. The real work starts when the high fades and the new habit has to hold. Staying committed when the feeling is gone is what actually transforms you. Drop a 🔥 if you are in that season right now.',
   'Sarah Adams', 'announcement', TRUE, NOW() - INTERVAL '1 day'),
  ('REMINDER: Our monthly live Q&A is this Thursday at 7PM EST. Bring your hardest questions — about triggers, purpose, relationships, accountability. Nothing is off limits inside these walls. Link in the events tab. See you there 💗',
   'Sarah Adams', 'announcement', FALSE, NOW() - INTERVAL '3 days'),
  ('I finished the Breaking Cycles Workbook this week and I just need to say — the section on inherited patterns broke me open in the best way. I identified 4 patterns I never even knew came from my grandmother. Does anyone else find that the generational piece is the hardest to face?',
   'Simone C.', 'inspiration', FALSE, NOW() - INTERVAL '4 days'),
  ('NEW RESOURCE: I just uploaded a 20-minute audio teaching on The Difference Between Healing and Coping. This is something I have wanted to address directly for months. Head to the Resources tab to listen. Love you all — SA 💕',
   'Sarah Adams', 'resource', FALSE, NOW() - INTERVAL '6 days'),
  ('Quick gratitude post. One year ago I applied to this community not believing I deserved to be here. Today I just signed my first client as a life coach. The work Sarah teaches does not just heal you — it positions you. If you are wondering whether this is worth it, it IS. 🙌🏾',
   'Natasha G.', 'inspiration', FALSE, NOW() - INTERVAL '8 days');

-- ── Community Events ──────────────────────────────────────────────────────────
INSERT INTO community_events (title, description, event_date, event_time, format, link) VALUES
  ('Monthly Live Q&A with Sarah',
   'Bring your hardest questions about the framework, triggers, relationships, and purpose. Sarah goes live every month exclusively for community members.',
   CURRENT_DATE + INTERVAL '4 days', '7:00 PM EST', 'zoom', 'https://zoom.us/j/example'),
  ('Accountability Partner Kickoff — Spring Cohort',
   'Meet your accountability partner and get paired for the next 8 weeks. Come with your top 3 goals and an open heart.',
   CURRENT_DATE + INTERVAL '10 days', '6:00 PM EST', 'zoom', 'https://zoom.us/j/example2'),
  ('Framework Deep-Dive: Step 3 — Managing Your Triggers',
   'A live 90-minute teaching from Sarah going deep into trigger identification, root-cause mapping, and building new response patterns.',
   CURRENT_DATE + INTERVAL '18 days', '7:30 PM EST', 'zoom', NULL);

-- ── Resources ─────────────────────────────────────────────────────────────────
INSERT INTO resources (title, description, category, type, external_link, added_at) VALUES
  ('The Difference Between Healing and Coping',
   'A 20-minute audio teaching from Sarah on why most people are coping with pain rather than healing it — and how to tell the difference.',
   'Audio Teaching', 'audio', NULL, NOW() - INTERVAL '6 days'),
  ('4-Step Framework Reference Guide',
   'A printable one-page summary of the Lead → Accountable → Triggers → Teach framework with key prompts for each step.',
   'Workbook', 'pdf', NULL, NOW() - INTERVAL '20 days'),
  ('Trigger Map Worksheet',
   'The full trigger mapping worksheet — expanded with deeper reflection questions for community members.',
   'Workbook', 'workbook', NULL, NOW() - INTERVAL '35 days'),
  ('Recommended Reading: The Body Keeps the Score',
   'Sarah''s personal recommendation for understanding trauma in the body. Essential context for Step 3 of the framework.',
   'Reading', 'link', 'https://www.besselvanderkolk.com/resources/the-body-keeps-the-score', NOW() - INTERVAL '50 days');

-- ── Speaking Topics ───────────────────────────────────────────────────────────
INSERT INTO speaking_topics (title, description, sort_order) VALUES
  ('Lead in Love: Choosing Alignment Over Reaction',       'How leading with love — not fear or pride — transforms your relationships, decisions, and leadership presence.',              0),
  ('Breaking Generational Cycles for Good',                'A powerful session on identifying and ending the inherited patterns that have quietly shaped your family for generations.',  1),
  ('The Power of Radical Accountability',                  'Why owning your story — fully and honestly — is the most liberating thing you can do, and how to practice it daily.',       2),
  ('Managing Emotional Triggers in High-Stakes Spaces',    'Practical tools for understanding your emotional triggers, tracing them to their root, and building healthier responses.',  3),
  ('Turning Your Pain Into a Platform',                    'How your healing journey becomes your greatest leadership asset — and how to share it with impact.',                         4),
  ('Walking Fully in Purpose',                             'A closing keynote on what it looks like to stop waiting for permission and live as the fullest version of yourself.',         5);

-- ── Event Formats ─────────────────────────────────────────────────────────────
INSERT INTO event_formats (label, detail, sort_order) VALUES
  ('Keynote Address',             '45–60 minutes. Best for conferences, summits, and annual events.',                              0),
  ('Workshop / Breakout Session', '90 minutes to half-day. Interactive, participatory, and framework-based.',                      1),
  ('Panel Moderator or Panelist', 'Flexible format. Sarah is both a compelling panelist and a gifted moderator.',                  2),
  ('Retreat Facilitator',         'Full-day or multi-day. Intimate groups of 10–50 women. Deep transformational work.',            3);

-- ── FAQs ──────────────────────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, category, sort_order) VALUES
  ('What topics does Sarah speak on?',           'Sarah speaks on: Lead in Love, Breaking Generational Cycles, The Power of Accountability, Managing Emotional Triggers, Turning Your Pain into a Platform, and Walking in Purpose.',                                    'booking',   0),
  ('How far in advance should we book Sarah?',   'We recommend reaching out at least 6–8 weeks before your event. For larger conferences, 3–6 months is preferred to ensure availability.',                                                                              'booking',   1),
  ('Does Sarah speak virtually?',                'Yes. Sarah accepts both in-person and virtual engagements via Zoom or your preferred platform.',                                                                                                                         'booking',   2),
  ('How do I know which program is right for me?','The Purpose Clarity Session is the best first step. In 90 minutes, you will get clarity on where you are and which program will serve you best.',                                                                      'programs',  3),
  ('Are coaching programs available online?',    'Yes. All programs are delivered via video call and are available to women worldwide.',                                                                                                                                   'programs',  4),
  ('How do I join the community?',               'Submit an application through the Community page. Sarah personally reviews each application to ensure it is the right fit.',                                                                                            'community', 5),
  ('What is the community membership like?',     'Members get access to live monthly sessions with Sarah, exclusive content, accountability partnerships, a private discussion space, and a full resource library.',                                                       'community', 6);

-- ── Platform Settings ─────────────────────────────────────────────────────────
INSERT INTO platform_settings (contact_email, booking_email, social_instagram, social_youtube, social_facebook)
VALUES ('hello@evolve2purpose.com', 'bookings@evolve2purpose.com', 'https://instagram.com/evolve2purpose', 'https://youtube.com/@evolve2purpose', 'https://facebook.com/evolve2purpose')
ON CONFLICT DO NOTHING;
