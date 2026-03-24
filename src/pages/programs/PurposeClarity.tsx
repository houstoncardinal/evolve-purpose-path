import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Zap,
  FileText,
  PlayCircle,
  MessageCircle,
  Star,
} from "lucide-react";

const phases = [
  {
    icon: FileText,
    num: "01",
    title: "Pre-Session Intake",
    desc: "Before you ever show up, you complete Sarah's intake questionnaire. This allows her to walk into your session already knowing your core tension — no wasted time, no small talk.",
  },
  {
    icon: Zap,
    num: "02",
    title: "Opening & Assessment",
    desc: "Sarah opens by naming what she sees immediately — the block, the pattern, or the lie you've been believing. Many women say this first 15 minutes alone is worth the entire investment.",
  },
  {
    icon: MessageCircle,
    num: "03",
    title: "Deep Dive & Breakthrough",
    desc: "Targeted questioning, truth-telling, and strategic challenge. Sarah will ask the question nobody else has asked. This is where the clarity actually comes — not from being told what to do, but from being helped to see.",
  },
  {
    icon: FileText,
    num: "04",
    title: "Action Plan Delivery",
    desc: "You leave this session with a written next step — not vague inspiration but a concrete, honest, personally tailored action plan that tells you exactly what to do when you log off the call.",
  },
];

const included = [
  "90-minute private video session 1:1 with Sarah Adams",
  "Pre-session intake questionnaire to maximize your time",
  "Full session recording delivered within 24 hours",
  "Written summary & personalized action plan",
  "Targeted resource and tool recommendations",
  "14-day follow-up support via email",
];

const faqs = [
  { q: "How do I prepare for the session?", a: "Complete the intake questionnaire fully and honestly — that's the only prep you need. The more candid your answers, the more powerful your session. You don't need to have a polished story or a clear agenda. You just need to show up ready to be honest." },
  { q: "What if I don't know what to ask or what I need?", a: "That's actually the most common starting point. Many women book a Purpose Clarity Session specifically because they are too close to their situation to see it clearly. Sarah's job is to cut through the fog. You don't need to know what you need — that's exactly what this session provides." },
  { q: "Will one session really be enough?", a: "For many women, yes — a single session delivers the clarity and next step that changes everything. For others, the session confirms they are ready for deeper work and becomes the entry point into the Group Program or 1:1 Coaching. Either way, you leave with something concrete." },
  { q: "What if I want to continue working with Sarah after?", a: "You can. If the session reveals you need deeper, sustained support, Sarah will walk you through your best next step — whether that's the Group Program, the Healing Intensive Weekend, or 1:1 Coaching. No pressure. Just clarity." },
];

const PURPOSE_CLARITY_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://evolve2purpose.com/programs/purpose-clarity#service",
    name: "Purpose Clarity Session — 90-Minute Breakthrough with Sarah Adams",
    description: "In 90 minutes, walk away knowing exactly what's next. Includes pre-session intake, full session recording, written action plan, and 14-day follow-up support.",
    url: "https://evolve2purpose.com/programs/purpose-clarity",
    provider: { "@id": "https://evolve2purpose.com/#organization" },
    offers: {
      "@type": "Offer",
      price: "197",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://evolve2purpose.com/programs/purpose-clarity",
    },
    serviceType: "Purpose Coaching Session",
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: { "@type": "Audience", audienceType: "Women seeking life direction and clarity" },
    serviceOutput: "Written personalized action plan and 90-minute session recording",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

const PurposeClarity = () => {
  useSEO({
    title: "Purpose Clarity Session — 90-Minute Breakthrough with Sarah Adams",
    description: "In 90 minutes, walk away knowing exactly what's next. Book a Purpose Clarity Session with Sarah Adams — starting at $197. Includes session recording and written action plan.",
    keywords: "purpose clarity coaching session, 90 minute life coaching, breakthrough session coach, clarity coaching session women, next step life coaching, Sarah Adams clarity session",
    breadcrumbs: [
      { name: "Coaching Programs", url: "/programs" },
      { name: "Purpose Clarity Session", url: "/programs/purpose-clarity" },
    ],
    schema: PURPOSE_CLARITY_SCHEMA,
  });

  return (
    <div>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-[-80px] right-[-60px] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.15), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-40px] w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programs
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8" />
            <span className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              Quickest Entry Point · 90 Minutes
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 letter-tight leading-tight">
            Purpose Clarity<br />
            <span className="neon-text italic">Session</span>
          </h1>
          <p className="text-white/60 text-xl mb-4 max-w-2xl leading-relaxed">
            In 90 minutes, walk away knowing exactly what's next.
          </p>
          <p className="text-white/40 text-sm mb-10 font-semibold letter-luxury uppercase">
            Starting at $197 · Book Today
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/apply?program=purpose-clarity" className="btn-neon-solid shadow-lg">
              Book Your Session <ArrowRight size={16} />
            </Link>
            <Link to="/programs" className="btn-neon-outline">
              View All Programs
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: Clock, label: "90 Minutes" },
              { icon: Zap, label: "1:1 with Sarah" },
              { icon: FileText, label: "Action Plan Included" },
              { icon: PlayCircle, label: "Recording Delivered" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} style={{ color: "#FF2DAA" }} />
                <p className="text-white text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This Right For You? */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Who It's For</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight" style={{ color: "#1A1A2E" }}>
              Book a Purpose Clarity Session if...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "You are standing at a crossroads — a major decision, a life transition, a fork in the road — and you cannot see clearly from where you're standing.",
              "You have been feeling stuck for months (or years), cycling through the same patterns, the same questions, the same version of a life that doesn't fully feel like yours.",
              "You need an outside perspective — someone who sees you without your history, without your blind spots, without the politeness of people who love you too much to tell you the truth.",
              "You want clarity before investing in a bigger program — this is the wisest way to know exactly what level of support you actually need.",
              "You are in a major life transition — divorce, career pivot, empty nest, health crisis, relocation — and you need a strategic partner, not just a listener.",
              "You keep asking yourself \"what's next?\" but have no real answer — and the silence is starting to cost you more than you're willing to admit.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-[#F6F6F8]">
                <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens in 90 Minutes */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Session Breakdown</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              What Happens in 90 Minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phases.map(({ icon: Icon, num, title, desc }) => (
              <div key={num} className="flex items-start gap-5 p-8 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(255,45,170,0.12)" }}>
                    <Icon size={18} style={{ color: "#FF2DAA" }} />
                  </div>
                  <span className="font-heading text-3xl font-bold block leading-none" style={{ color: "rgba(255,45,170,0.25)" }}>{num}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Everything Included</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl letter-tight" style={{ color: "#1A1A2E" }}>
              What You Walk Away With
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-border p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>Starting at $197</p>
                <p className="text-muted-foreground text-xs mt-1">Book directly online · Immediate confirmation</p>
              </div>
              <Link to="/apply?program=purpose-clarity" className="btn-neon-solid shadow-lg">
                Book Your Session <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, rgba(255,45,170,0.08), rgba(217,31,144,0.04))" }}>
        <div className="container-narrow text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FF2DAA" style={{ color: "#FF2DAA" }} className="mx-0.5" />)}
          </div>
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl letter-tight leading-snug mb-8" style={{ color: "#1A1A2E" }}>
            "The Purpose Clarity Session alone was worth more than two years of therapy. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction."
          </blockquote>
          <p className="font-bold text-sm" style={{ color: "#FF2DAA" }}>Angela M.</p>
          <p className="text-muted-foreground text-xs mt-1">Purpose Clarity Session Client</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Questions & Answers</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl letter-tight" style={{ color: "#1A1A2E" }}>What You're Wondering</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-[#F6F6F8] rounded-2xl border border-border p-7 md:p-8">
                <h3 className="font-heading text-lg font-bold mb-3" style={{ color: "#1A1A2E" }}>{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
        />
        <div className="container-narrow text-center relative z-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="ornament-line !w-8" />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Book Today</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight mb-5">
            Clarity is one session away.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Stop cycling through the same questions. One 90-minute conversation with Sarah can change the entire trajectory of what's next.
          </p>
          <Link to="/apply?program=purpose-clarity" className="btn-neon-solid shadow-lg">
            Book Your Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <EmailCapture variant="fullwidth" source="programs-purpose-clarity" />
    </div>
  );
};

export default PurposeClarity;
