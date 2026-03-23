# Evolve 2 Purpose — Platform Overview & Technical Documentation
**Prepared for:** Sarah Adams
**Platform:** evolve2purpose.com
**Document Date:** March 2025
**Version:** 1.0

---

## Table of Contents

1. [Platform Summary](#1-platform-summary)
2. [Public-Facing Pages & Features](#2-public-facing-pages--features)
3. [Program Structure & The L.A.T.T. Pathway](#3-program-structure--the-latt-pathway)
4. [The Application & Enrollment System](#4-the-application--enrollment-system)
5. [Community Membership Platform](#5-community-membership-platform)
6. [Shop & E-Commerce](#6-shop--e-commerce)
7. [Stripe Payment Integration](#7-stripe-payment-integration)
8. [SEO Architecture & Schema Markup](#8-seo-architecture--schema-markup)
9. [Admin Dashboard](#9-admin-dashboard)
10. [Database Architecture](#10-database-architecture)
11. [Email Capture & Subscriber Attribution](#11-email-capture--subscriber-attribution)
12. [Infrastructure & Technical Stack](#12-infrastructure--technical-stack)
13. [Pending Configurations](#13-pending-configurations)

---

## 1. Platform Summary

The Evolve 2 Purpose platform is a full-scale digital coaching and transformation business, built from the ground up as a custom React application. It is not a page builder, template, or third-party plugin stack — every component, every page, and every data flow was architected specifically for this brand and business model.

The platform serves five distinct user journeys simultaneously:

- **The First-Time Visitor** — Discovers Sarah through content, explores the framework, and enters the email funnel
- **The Program Applicant** — Moves through a 5-step gated application and payment flow tied to real program prerequisites
- **The Community Member** — Subscribes to the $9.99/month membership or receives automatic access through a product purchase
- **The Shop Customer** — Pre-orders physical and digital products with a full cart and bundle system
- **The Admin (Sarah)** — Manages every facet of the business through a fully custom dashboard connected live to the database

**Technology:** React + TypeScript / Supabase (PostgreSQL) / Stripe / Netlify
**Total Pages:** 24 public pages + 11 admin pages
**Database Tables:** 16 tables with Row Level Security
**Payment Flows:** 2 (one-time program payments + monthly subscriptions)

---

## 2. Public-Facing Pages & Features

Every public page is wrapped in a shared Layout that includes the Announcement Bar, Navbar, and Footer. Pages outside the layout (Apply, Submit Teaching, Admin) have their own standalone design.

### Homepage (`/`)
The primary conversion and brand introduction page. Features a hero section with Sarah's core message, a social proof statistics bar, an overview of the L.A.T.T. framework, program pathway cards, featured testimonials, an email capture section, and a free guide CTA. All major user journeys originate here.

### About Sarah (`/about`)
A full brand biography page with a mobile-optimized hero that places Sarah's photo below the headline text on small screens, with a soft fade at the bottom. Covers Sarah's personal story, credentials, and transformation mission. Features a mobile image layout that sits flush at the bottom of the hero section.

### The Framework (`/framework`)
A dedicated page explaining the 4-step L.A.T.T. methodology (Learn, Apply, Teach, Transform) in full. Includes how each step works, what it produces, and how it leads to the next. Connected to the free 4-Step PDF guide.

### Programs Hub (`/programs`)
The master programs listing page. Displays all five coaching programs with pricing, descriptions, and "Apply Now" CTAs. Programs are laid out in a responsive grid with the Mentorship program featured as a full-width crown-jewel card. Includes a pathway selector that routes users to the right program based on their goals. Updated to reflect "five distinct pathways."

### Individual Program Pages
Each program has its own dedicated full-length sales page:

| Page | Price | Duration |
|------|-------|----------|
| `/programs/one-on-one` | Starting at $111 | 90 days – 6 months |
| `/programs/group` | $444 | 8 weeks |
| `/programs/purpose-clarity` | $197 | 90-minute intensive |
| `/programs/healing-intensive` | $999 | 2-day retreat |
| `/programs/mentorship` | $2,222 | 4-month crown-jewel experience |

Each page includes: hero with stats, "Is This For You" section, what's included feature grid, how it works process steps, a testimonial pull quote, FAQ accordion, and final CTA. The OneOnOne and Mentorship pages include a photo gallery section for visual depth.

### Testimonials (`/testimonials`)
A dedicated social proof page featuring client transformation stories with quotes, names, programs, and transformation descriptions. Fully managed from the admin dashboard.

### Shop (`/shop`)
Full e-commerce page featuring 6 products and 3 bundles. Includes an interactive cart system, bundle savings display, pre-order mode (active), and product guarantees section. Details below in Section 6.

### Free Guide (`/free-guide`)
A standalone landing page for the free 4-Step System PDF. Includes a direct download button and email capture. The PDF (`/4step.pdf`) is hosted directly in the public directory.

### Evolve 2 Purpose Brand Page (`/evolve-2-purpose`)
A dedicated brand page with email capture. Accessible via both `/evole-2-purpose` and `/evolve-2-purpose` (both routes resolve to the same page).

### Community (`/community`)
The membership hub. Full details in Section 5.

### Booking (`/booking`)
A speaking engagement inquiry form. Captures: name, email, organization, event type, audience size, event date, message, and speaking topic preference. Submits directly to the admin dashboard's Bookings section.

### Account (`/account`)
Authenticated user account page. Shows profile information and program/membership status.

### Apply (`/apply`)
Standalone 5-step application flow — fully detailed in Section 4.

### Submit Teaching (`/programs/submit-teaching`)
Standalone dark-themed page for 1:1 program graduates to submit their Step 4 Teaching Video as part of the L.A.T.T. pathway. Saves to the `teaching_submissions` database table.

### Privacy Policy (`/privacy-policy`) & Terms of Use (`/terms`)
Complete, professional legal pages with 12 and 15 sections respectively. Both feature a dark branded hero, sticky table of contents sidebar, numbered sections, and cross-links to each other. Covers data rights, GDPR-aligned protections, refund policies by product type, community guidelines, liability limitations, and more.

### Announcement Bar
A fixed 40px bar displayed above the navbar on every public page. Communicates the platform's recent launch, invites feedback, and links directly to hello@evolve2purpose.com. The navbar sits below it at `top: 40px` and main content is padded accordingly.

---

## 3. Program Structure & The L.A.T.T. Pathway

A defining feature of this platform is its **program prerequisite system**. Programs are not independently accessible — they follow a structured pathway that mirrors the L.A.T.T. framework itself.

### The Pathway

```
1:1 Deep-Dive Coaching  →  Submit Teaching Video  →  All Other Programs
      (Gateway)               (Step 4: Teaching)        (Unlocked Access)
```

**Step 1:** A prospective client applies for the 1:1 Deep-Dive Coaching program — the only entry point.

**Step 2:** After completing their 1:1 engagement, the client submits a video of themselves teaching someone else what they learned through the program. This is Step 4 of the L.A.T.T. framework — Teaching — and it seals the transformation.

**Step 3:** Sarah's team reviews the teaching video within 3–5 business days. Once approved, the client's pathway to the Group Program, Healing Intensive, Purpose Clarity, and Mentorship Program is unlocked.

**Step 4:** The client applies to whichever next program calls them. The application system checks the database for a completed 1:1 enrollment before allowing the application to proceed. If the prerequisite is not met, the apply page displays a locked gate with a visual pathway showing the required steps.

**One-on-One Page:** The `/programs/one-on-one` page includes a full "What Comes After 1:1" section — a 4-step visual pathway (Complete 1:1 → Submit Teaching Video → Get Approved → Access All Programs) and a direct Teaching Video CTA box.

### Group Program Special Rules
The Group Class always runs on **Thursdays at 7 PM ET**. The booking calendar in the application flow is restricted to Thursday-only date selection, and the time is pre-locked to "7:00 PM" — the user cannot select a different time.

---

## 4. The Application & Enrollment System

The Apply page (`/apply`) is one of the most technically sophisticated features of the platform. It is a standalone, full-screen, dark-themed multi-step flow that handles authentication, program questions, scheduling, payment, and database enrollment — all in one seamless experience.

### The 5 Steps

**Step 1 — Account**
New users create a Supabase-authenticated account. Returning users sign in. The form validates email format, password strength, and handles auth errors gracefully. Once authenticated, the user proceeds automatically.

**Step 2 — Application**
Program-specific questions are loaded based on the `?program=` URL parameter. Each program has 3–5 custom questions (mix of text areas and select fields). For non-1:1 programs, this step first checks the database for a valid 1:1 enrollment. If none exists, the user sees a locked gate with the pathway explained — they cannot bypass it. If the prerequisite is met, the application form loads.

**Step 3 — Schedule**
A custom calendar component (`BookingCalendar`) lets the user select a preferred date. The calendar:
- Navigates month-by-month
- Disables past dates
- Skips weekends
- For the Group Program: only allows Thursday selection
- Shows available time slots (8 AM–4 PM hourly)
- For the Group Program: time is pre-locked to 7:00 PM

**Step 4 — Payment**
The user sees an order summary with their program details. On clicking "Proceed to Payment," the page calls the Netlify `create-checkout` function, which creates a Stripe Checkout session. The selected date, time, and application answers are saved to `sessionStorage` before the redirect — so they survive the external Stripe navigation. On return from Stripe:
- The `?paid=true` URL parameter triggers the enrollment insert
- Data is restored from sessionStorage and written to `program_enrollments` (including `scheduled_date`, `scheduled_time`, `answers` as JSONB)
- The URL is replaced with `?confirmed=true` to prevent double-insertion on refresh

**Step 5 — Confirmed**
Success screen with program-specific confirmation messaging. For 1:1 completions, an additional CTA box appears directing graduates to submit their Teaching Video when ready.

### Program Configuration
Each program is defined in a single configuration object including: title, tag, price display, Stripe amount (in cents), includes list, and all question definitions. Adding or modifying a program is a single configuration change — the entire flow renders dynamically from it.

---

## 5. Community Membership Platform

### Overview
The Community page (`/community`) is the hub for the private $9.99/month membership. It is designed to both showcase what's inside and convert visitors into members.

### Page Structure
- **Hero** — "Your Private Space to Grow, Connect, and Be Seen"
- **Stats Bar** — 1,200+ Active Members, 4× Monthly Live Events, 24/7 Chat Access, 100+ Resources
- **Features Grid** — 6 feature cards: Direct Updates from Sarah, Live Events & Classes, Member Chat, Resource Library, Replay Archive, Accountability Circles
- **Community Preview** — Mock feed with posts, events calendar, and active members widget showing real community content from the admin database
- **Join / Checkout Section** — Pricing card, checkout flow, product-owner note

### Checkout Flow
When a visitor clicks "Join for $9.99/month," the platform calls the Netlify `create-subscription` function:

- **If Stripe is configured:** The user is redirected to Stripe's hosted subscription checkout. On return with `?subscribed=true`, the success screen displays.
- **If Stripe is not yet configured (demo mode):** The function returns `{ demo: true }` and the platform activates a fully designed in-page checkout — complete with order summary sidebar, email field, card number input (auto-formatted as `1234 5678 9012 3456`), name on card, expiry (auto-formatted `MM/YY`), CVV, a processing animation, and a success screen with "What Happens Next" steps.

This means the checkout experience works seamlessly for visitors today, and will automatically become a live Stripe checkout the moment the environment variables are set — **zero code changes required**.

### Product-Owner Access
Shop customers who purchase a qualifying product receive automatic community access — they do not need to subscribe. A note on the join section explains this with a link to their account.

### Admin Control
Community content is managed from two admin pages:
- `/admin/community` — Membership applications, status management, active members list
- `/admin/community-content` — Posts, events, and resources that populate the community feed

---

## 6. Shop & E-Commerce

### Products

| Product | Price | Type | Status |
|---------|-------|------|--------|
| Healing & Alignment Journal | $34.99 | Physical | Active |
| Breaking Cycles Workbook | $24.99 | Physical | Active |
| Declaration & Affirmation Card Deck | $19.99 | Physical | Active |
| Purpose Activation Masterclass | $97.00 | Digital | Active |
| Inner Restoration Audio Collection | $29.99 | Digital | Active |
| Anointing Oil — Restoration | $22.00 | Physical | Coming Soon |

### Bundles

| Bundle | Price | Savings | Items |
|--------|-------|---------|-------|
| The Starter Kit | $49.99 | $5 | Journal + Card Deck |
| The Deep-Work Bundle | $64.99 | $10 | Workbook + Audio + Card Deck |
| The Complete Toolkit | $174.99 | $32 | All 5 active products |

### Pre-Order Mode
The entire shop is currently in **pre-order mode**. All CTAs read "Pre-Order" instead of "Add to Cart," the cart label reads "X items pre-ordered," and the checkout button reads "Complete Pre-Order." A pulsing badge in the hero communicates the upcoming full launch. Switching to full order mode requires a single configuration change.

### Cart System
A full interactive cart is built into the Shop page: items are added/removed, quantities tracked, bundle savings calculated, and a checkout summary is displayed before proceeding.

### Guarantees Section
Satisfaction guarantee (replacement for damaged items), 30-day return policy for unopened items, and fast shipping (2–3 business days for physical, instant for digital).

---

## 7. Stripe Payment Integration

Two distinct payment flows are fully implemented:

### One-Time Program Payments
**Netlify Function:** `create-checkout.js`
**Triggered by:** Apply flow Step 4
**Mode:** `payment` (one-time)
**Stripe Products:** Dynamic line items created per program
**Programs covered:** All 5 ($111–$2,222)

The function accepts the program title, amount in cents, customer email, and success/cancel URLs. It creates a Stripe Checkout session and returns the hosted URL. The frontend redirects the user. On successful payment, Stripe returns to the success URL and the enrollment is written to the database.

**Required env vars:** `STRIPE_SECRET_KEY`

### Monthly Subscription
**Netlify Function:** `create-subscription.js`
**Triggered by:** Community page "Join" button
**Mode:** `subscription` (recurring monthly)
**Price:** $9.99/month
**Demo fallback:** Returns `{ demo: true }` when not configured

**Required env vars:** `STRIPE_SECRET_KEY` + `STRIPE_COMMUNITY_PRICE_ID`

### To Go Live
1. Add `STRIPE_SECRET_KEY` to Netlify environment variables
2. Create a $9.99/month recurring Price in Stripe Dashboard → copy its ID
3. Add `STRIPE_COMMUNITY_PRICE_ID` to Netlify environment variables
4. Both flows activate automatically on next deploy — no code changes needed

---

## 8. SEO Architecture & Schema Markup

Search engine optimization is implemented at an enterprise level — not as an afterthought. Every page has individual meta configuration, and structured data is injected into every page load.

### Meta Tag System
A custom `useSEO` hook dynamically manages all `<head>` content on every page change. Tags managed include:

- `<title>` — Formatted as `{Page Title} | Evolve 2 Purpose`
- `<meta name="description">` — Unique per page, 120–160 characters
- `<meta name="keywords">` — 8–12 long-tail keywords per page
- `<meta name="robots">` — Index/noindex control (legal pages set to noindex)
- `<meta name="author">` — Always "Sarah Adams — Evolve 2 Purpose"
- `<link rel="canonical">` — Auto-generated from pathname or explicitly set

### Open Graph (Social Sharing)
Every page generates full OpenGraph tags for rich previews when links are shared on Facebook, LinkedIn, and other platforms:

- `og:title`, `og:description`, `og:image` (1200×630px), `og:image:alt`
- `og:url`, `og:type` (website/article/product), `og:site_name`, `og:locale`

### Twitter Card
Full Twitter card implementation:
- `twitter:card` — `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image`
- `twitter:site` — @evolve2purpose
- `twitter:creator` — @evolve2purpose

### JSON-LD Structured Data

Every single page load injects multiple JSON-LD schema objects into the document head. This tells search engines precisely what the content is about — powering rich results, knowledge panels, and semantic search relevance.

#### Base Schemas (Present on Every Page)

**WebSite Schema**
Declares the site's identity to search engines including the site name, URL, description, and a `SearchAction` that enables Google's sitelinks search box.

**Organization Schema** (ProfessionalService)
A comprehensive organizational identity schema including:
- Full business name, logo, description, and slogan
- Founder entity linked to the Sarah Adams Person schema
- Service types: Life Coaching, Purpose Coaching, Transformation Coaching, Christian Counseling, Speaking, Group Programs, Online Community
- Contact point with email address
- Social profiles (Instagram, Facebook, YouTube)
- Aggregate rating: 5.0 stars / 500 reviews
- Full offer catalog listing all programs with prices

**Person Schema** (Sarah Adams)
A rich biographical schema for Sarah as a public figure and service provider:
- Full name, job title ("Christian Counselor, Prophetess & Transformation Coach")
- Areas of expertise: generational cycle breaking, trauma-informed healing, purpose activation, Christian counseling, trigger management, accountability, women's empowerment
- Occupations: Life Transformation Coach, Inspirational Speaker
- Social profiles and website

#### Page-Specific Schemas

**BreadcrumbList**
Automatically generated on all program and secondary pages. Enables Google's breadcrumb trail in search results, showing the full path (`Home > Programs > 1:1 Deep-Dive Coaching`).

**FAQPage**
Implemented on the Community page. Each FAQ is structured so Google can render it as an expandable Q&A result directly in search — without users needing to click through.

**Product / Store Schemas** (Shop Page)
The Shop page includes a Store schema with an OfferCatalog, and individual Product schemas for each item — including price, availability, and seller information.

### Keyword Targeting
Individual program pages each have 10–12 targeted keywords. Examples:

- 1:1 Coaching: "1:1 life coaching women," "private coaching Sarah Adams," "deep healing coaching," "generational cycle coaching"
- Group Program: "group coaching for women," "weekly group coaching community," "affordable group coaching Black women"
- Healing Intensive: "women's healing retreat," "trauma healing weekend retreat," "Christian healing retreat women"
- Community: "women empowerment community online," "private purpose community women," "accountability community women"

---

## 9. Admin Dashboard

The admin dashboard at `/admin` is a fully custom-built business management platform — not a third-party tool. It is authenticated via Supabase (email/password), and every action writes directly to the live database in real time.

### Authentication
Login at `/admin/login`. Sarah signs in with her admin email and password. The session is maintained via Supabase Auth. Any unauthorized attempt to access `/admin/*` routes redirects to the login page.

### Overview Dashboard (`/admin`)
The landing page of the admin gives a full business health snapshot at a glance:

- **Revenue Cards:** Total revenue (fulfilled orders), monthly revenue, total orders, pending orders
- **Subscriber Count:** Total email list size
- **Booking Status:** New inquiries count, total bookings
- **Community:** Pending applications, approved members
- **Programs:** Active enrollments, total enrollment revenue
- **Revenue Chart:** Area/bar chart visualization powered by Recharts
- **Recent Orders:** Latest order list with status badges
- **Quick Actions:** One-click navigation to key admin functions

### Products (`/admin/products`)
Full product and bundle management:
- Create, edit, and delete products with all fields (name, price, category, status, badge, description)
- Toggle product status (active / coming soon / inactive) with a single click
- View sales count and revenue per product
- Filter by category (physical / digital / bundle)
- Search by name
- Summary stats: total products, total revenue, total units sold

### Orders (`/admin/orders`)
Complete order management:
- View all orders with customer name, email, product, amount, status, and date
- Update order status through the full workflow: pending → processing → fulfilled → refunded
- Add/edit internal admin notes per order
- Search by customer name, email, product name, or order ID
- Filter by status
- Export filtered results to CSV (includes all fields)

### Subscribers (`/admin/subscribers`)
Email list management with deep attribution:
- Every subscriber is tagged with exactly where they signed up (see Section 11)
- "Where They Signed Up" column with human-readable page labels
- **Top Sources insight strip** — shows the top 5 highest-volume signup pages at a glance
- Grouped filter chips: General Pages / Programs / Other
- Search by name or email
- Add subscribers manually (admin-sourced)
- Delete subscribers
- Export to CSV with page attribution column

### Bookings (`/admin/bookings`)
Speaking engagement inquiry management:
- View every booking request with full details (organization, event type, audience size, event date, message)
- Move inquiries through the status workflow: new → reviewing → confirmed / declined
- Add private admin notes for follow-up tracking
- Email address is surfaced prominently for direct outreach

### Community (`/admin/community`)
Two-panel management for membership:
- **Applications:** View pending applications with reason/motivation, approve or decline, track approval date
- **Members:** View active members with their status (active / cancelled / product_granted / trial), Stripe subscription details, and billing period dates

### Programs (`/admin/programs`)
Enrollment tracking across all programs:
- View all enrolled students by program
- See enrollment date, amount paid, and contact info
- Manage enrollment status: pending → enrolled → active → completed / paused

### Testimonials (`/admin/testimonials`)
Testimonial library management:
- Add, edit, and delete testimonials
- Fields: quote, name, title/detail, transformation description, program assignment, featured toggle, sort order
- Toggling "featured" on a testimonial automatically unfeatured all others (only one featured at a time)
- Sort order controls homepage carousel sequencing

### Content Manager (`/admin/content`)
Three content modules in one page:
- **Speaking Topics** — Topics that appear in the Booking form dropdown (CRUD + sort order)
- **Event Formats** — Format options for speaking events (CRUD + sort order)
- **FAQs** — Platform FAQs organized by category: booking, programs, community, general (CRUD + sort order)

### Community Content Manager (`/admin/community-content`)
Everything that appears in the Community member feed:
- **Posts** — Create, edit, delete, and pin/unpin community posts with type tagging (announcement / inspiration / resource)
- **Events** — Manage community events with date, time, format (Zoom / in-person / both), and optional Zoom link
- **Resources** — Full resource library management with type classification (PDF / audio / video / link / workbook) and external links

### Settings (`/admin/settings`)
Platform-wide configuration:
- Contact email, booking email
- Social media URLs (Instagram, YouTube, Facebook)
- Admin password reset

---

## 10. Database Architecture

The platform is powered by **Supabase (PostgreSQL)** — a cloud-hosted, production-grade relational database with Row Level Security (RLS) built in. The database is the single source of truth for all platform data.

### Database Tables

| Table | Purpose |
|-------|---------|
| `products` | Shop product catalog |
| `bundles` | Product bundle definitions |
| `orders` | Customer purchase records |
| `subscribers` | Email list with source attribution |
| `booking_inquiries` | Speaking engagement requests |
| `community_applications` | Membership applications |
| `program_enrollments` | Student enrollment records |
| `testimonials` | Client testimonials |
| `speaking_topics` | Topics for booking form |
| `event_formats` | Event format options |
| `faqs` | Platform FAQ content |
| `community_posts` | Community feed posts |
| `community_events` | Community event calendar |
| `resources` | Community resource library |
| `teaching_submissions` | Step 4 teaching video submissions |
| `community_memberships` | Membership records + Stripe billing data |
| `platform_settings` | Global platform configuration |

### Row Level Security
RLS is enabled on security-sensitive tables. Users authenticated via Supabase Auth can only read and write their own records — they cannot access other users' data. Admins have full access. This is enforced at the database level, not just the application layer.

### Key Relationships
- `program_enrollments.user_id` → `auth.users.id`
- `teaching_submissions.user_id` → `auth.users.id`
- `community_memberships.user_id` → `auth.users.id`

### The `answers` Column
Program enrollment records include an `answers` JSONB column that stores the full application form responses as a structured JSON object. This means Sarah can see exactly what a client wrote in their application, preserved alongside their enrollment record.

### Teaching Submissions Table
The `teaching_submissions` table captures the full Step 4 experience:
- `video_url` — Link to the teaching video (YouTube, Vimeo, Google Drive)
- `taught_name` — Who they taught and their relationship
- `taught_what` — What principle or lesson they shared
- `taught_result` — The reaction or transformation in the person they taught
- `reflection` — What the experience revealed about their own healing
- `status` — pending / approved / needs_revision
- `reviewer_notes` — Sarah's private feedback

### Community Memberships Table
Tracks all membership access — both paid subscribers and product-grantees:
- `stripe_subscription_id` and `stripe_customer_id` — Links to Stripe for billing management
- `status` — active / cancelled / product_granted / trial
- `amount_cents` — 999 ($9.99) for standard subscribers
- `period_start` / `period_end` — Current billing period dates

---

## 11. Email Capture & Subscriber Attribution

Every email captured on the platform is tagged with the exact page and context where the person signed up. This is built directly into the database — not inferred or approximated.

### Source Tags

| Source Tag | Where It's Captured |
|------------|---------------------|
| `homepage` | Homepage email banner |
| `about` | About Page email banner |
| `framework` | Framework Page email banner |
| `testimonials` | Testimonials Page email banner |
| `programs` | Programs (All) email banner |
| `programs-one-on-one` | 1:1 Coaching page email banner |
| `programs-group` | Group Program page email banner |
| `programs-healing-intensive` | Healing Intensive page email banner |
| `programs-mentorship` | Mentorship Program page email banner |
| `programs-purpose-clarity` | Purpose Clarity page email banner |
| `shop` | Shop page email banner |
| `free-guide` | Free Guide / Evolve 2 Purpose page |
| `footer` | Footer email capture |
| `manual` | Manually added by admin |

### Why This Matters
Knowing where someone signed up tells you where they are in their journey. Someone who signed up on the Mentorship page is a different prospect from someone who signed up on the Homepage. This data enables personalized follow-up, targeted email sequences, and informed program promotion decisions — all without any additional tools.

### Admin View
The Subscribers admin page surfaces this data with:
- A **Top Sources** insight strip showing which pages are driving the most signups
- **Grouped filter chips** (General Pages / Programs / Other) for quick segment views
- A **"Where They Signed Up"** column with human-readable labels on every row
- **CSV export** that includes the source label for use in any email platform

---

## 12. Infrastructure & Technical Stack

### Frontend
- **React 18 + TypeScript** — Type-safe component architecture
- **React Router v6** — Client-side routing with nested layouts
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **shadcn/ui** — Accessible component primitives (modals, toasts, tooltips)
- **Recharts** — Data visualization for admin revenue charts
- **Lucide React** — Icon system used throughout the platform

### Backend & Database
- **Supabase** — PostgreSQL database + authentication + row-level security
- **Supabase Auth** — Email/password authentication for both end users and admin
- Two sets of credentials:
  - `VITE_SUPABASE_URL` — Database URL
  - `VITE_SUPABASE_ANON_KEY` — Public client key (safe for browser use; RLS enforced)

### Payments
- **Stripe** — Checkout (one-time) + Subscriptions (recurring)
- Two Netlify functions: `create-checkout.js` and `create-subscription.js`
- Environment variables: `STRIPE_SECRET_KEY` + `STRIPE_COMMUNITY_PRICE_ID`

### Hosting & Functions
- **Netlify** — Static site hosting with CDN + serverless function execution
- Automatic deploys on every GitHub push to `main`
- Functions execute server-side (Stripe keys never exposed to browser)

### State Management
- React `useState` / `useEffect` for local component state
- A custom `adminStore` abstraction layer handles all Supabase queries
- `sessionStorage` used for state persistence across Stripe payment redirects (prevents lost form data)

### SEO
- Custom `useSEO` hook dynamically manages all `<head>` content
- JSON-LD structured data injected via script tags on every page
- Canonical URLs auto-generated from pathname

---

## 13. Pending Configurations

The following items require action to fully activate all features:

### SQL Migrations (Run in Supabase Dashboard → SQL Editor)
Two migration scripts need to be executed to create the newest tables:

1. `scripts/migration_enrollments_v2.sql`
   Adds `user_id`, `scheduled_date`, `scheduled_time`, and `answers` columns to the existing `program_enrollments` table. Also updates the status constraint to include `pending` and `enrolled`.

2. `scripts/migration_v3.sql`
   Creates the `teaching_submissions` and `community_memberships` tables with their full column definitions, indexes, and RLS policies.

### Netlify Environment Variables
Set in Netlify Dashboard → Site Settings → Environment Variables:

| Variable | Value | Required For |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | All database operations |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | All database operations |
| `STRIPE_SECRET_KEY` | `sk_live_...` from Stripe | All payment flows |
| `STRIPE_COMMUNITY_PRICE_ID` | `price_...` from Stripe | $9.99/month subscription |

### Creating the Stripe Community Price
In Stripe Dashboard → Products → Add Product:
- **Name:** Community Membership
- **Pricing model:** Standard pricing
- **Price:** $9.99 / month (recurring)
- Copy the resulting Price ID → paste as `STRIPE_COMMUNITY_PRICE_ID`

### Admin Login
Create your admin login credentials in Supabase Dashboard → Authentication → Users. The email and password you create there is what you use at `/admin/login`.

---

*This document reflects the platform as built and deployed. All features described are production-ready code — not concepts or mockups.*

**For technical questions or changes:** hello@evolve2purpose.com

---

© 2025 Evolve 2 Purpose — Sarah Adams. Confidential — for internal and client use only.
