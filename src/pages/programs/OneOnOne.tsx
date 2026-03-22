import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Users,
  Zap,
  Star,
  Shield,
  MessageCircle,
  Heart,
  BookOpen,
} from "lucide-react";

const includes = [
  { icon: BookOpen, title: "Comprehensive Intake & Healing Assessment", desc: "Before your first session, Sarah studies who you are — your wounds, your patterns, your history — so nothing is wasted." },
  { icon: Zap, title: "Fully Customized Transformation Roadmap", desc: "No cookie-cutter plans. Your roadmap is built around your specific roots, triggers, and purpose calling." },
  { icon: Clock, title: "Weekly 60-Minute Private Sessions", desc: "Deep, uninterrupted time with Sarah every single week — not rushed, not templated. Real work." },
  { icon: MessageCircle, title: "Unlimited WhatsApp Support Between Sessions", desc: "Life doesn't pause for your next session. Sarah is in your corner between calls for real-time support." },
  { icon: Heart, title: "Personalized Resources, Exercises & Tools", desc: "Journaling prompts, healing exercises, and handpicked resources tailored to where you are in the framework." },
  { icon: Shield, title: "Real-Time Accountability & Course Correction", desc: "When you slip back into old patterns, Sarah catches it. She holds the mirror even when it's uncomfortable." },
  { icon: Star, title: "Priority Access to New Programs & Content", desc: "As a 1:1 client, you're first in line for everything new — retreats, intensives, resources, cohorts." },
  { icon: Users, title: "Post-Program Integration Session", desc: "A dedicated closing session to seal your transformation, map your next chapter, and make it stick." },
];

const steps = [
  { num: "01", title: "Apply & Intake", desc: "Submit your application and complete Sarah's in-depth intake form. This is where Sarah starts learning your story — your patterns, your pain points, and what's been keeping you stuck." },
  { num: "02", title: "Discovery Call", desc: "You and Sarah connect 1:1 to ensure this is the right fit. This is a two-way conversation — honest, unhurried, and zero pressure. If it's meant to be, you'll both know." },
  { num: "03", title: "Custom Roadmap", desc: "Sarah builds your personalized transformation roadmap — rooted in your specific history, your healing needs, and the purpose that's been calling your name." },
  { num: "04", title: "Weekly Sessions & Ongoing Support", desc: "You show up. You do the work. Sarah walks with you every step — in sessions, between sessions, through the breakthroughs and the hard days both." },
];

const faqs = [
  { q: "What's the investment?", a: "1:1 coaching starts at $111 and scales based on the length and scope of your program. 90-day and 6-month engagements are available. Full investment details are shared after your discovery call — Sarah's commitment is that the structure always matches what your transformation actually requires." },
  { q: "How long does the program last?", a: "Most clients engage for 90 days to 6 months. The timeline is determined by the depth of your goals, the roots being healed, and the pace that serves your real life. There's no rush — and no shortcuts." },
  { q: "Is it conducted online?", a: "Yes. All 1:1 sessions are conducted via video call, making Sarah fully accessible wherever you are in the world. Many clients have worked with Sarah from the US, UK, Canada, and beyond." },
  { q: "What makes this different from therapy?", a: "Therapy is invaluable — and this isn't therapy. Sarah doesn't diagnose; she dismantles. Where therapy often explores the past, Sarah's coaching moves you from insight into identity and action. Many of her clients come from therapy because they want someone who will challenge them, hold them accountable, and call them higher — not just hold space." },
];

const OneOnOne = () => {
  useSEO({
    title: "1:1 Deep-Dive Coaching — Private Transformation with Sarah Adams",
    description: "The most intimate, powerful coaching Sarah Adams offers. Weekly private sessions, unlimited support, and a fully custom transformation roadmap. Starting at $111. Application required.",
    keywords: "1:1 life coaching women, private coaching Sarah Adams, personal transformation coaching, deep healing coaching, generational cycle coaching, purpose coaching one on one",
    breadcrumbs: [
      { name: "Coaching Programs", url: "/programs" },
      { name: "1:1 Deep-Dive Coaching", url: "/programs/one-on-one" },
    ],
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
          className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.08), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programs
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8" />
            <span className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              Most Transformative
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 letter-tight leading-tight">
            1:1 Deep-Dive<br />
            <span className="neon-text italic">Coaching</span>
          </h1>
          <p className="text-white/60 text-xl md:text-2xl mb-4 max-w-2xl leading-relaxed">
            This is the most powerful work Sarah does.
          </p>
          <p className="text-white/40 text-sm mb-10 font-semibold letter-luxury uppercase">
            Starting at $111 · Application Required
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/apply?program=one-on-one" className="btn-neon-solid shadow-lg">
              Apply Now <ArrowRight size={16} />
            </Link>
            <Link to="/programs" className="btn-neon-outline">
              View All Programs
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { label: "Weekly Sessions" },
              { label: "Unlimited Support" },
              { label: "Custom Roadmap" },
              { label: "Max 6 Clients" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-white text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This You? */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Who It's For</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight" style={{ color: "#1A1A2E" }}>
              This program is built for you if...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "You are ready for deep, root-level change — not surface-level motivation that fades by next week.",
              "You are in a pivotal life transition and need more than platitudes — you need truth, strategy, and someone fully in your corner.",
              "You've tried therapy but feel like you need someone to not just hold space, but challenge you and call you forward.",
              "You are actively breaking generational patterns — cycles of abandonment, fear, anger, or self-sabotage — and you're done doing it alone.",
              "You want a coach who is fully invested in your transformation, not just available for your weekly call.",
              "You want real, lasting results — not insights that sit in a journal but shifts that change how you live, love, and lead.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-[#F6F6F8]">
                <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Everything Included</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              When You Go 1:1 with Sarah
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {includes.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5 p-7 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,45,170,0.12)" }}>
                  <Icon size={16} style={{ color: "#FF2DAA" }} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white mb-1">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>The Process</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight" style={{ color: "#1A1A2E" }}>
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-white rounded-2xl border border-border p-7">
                <span className="font-heading text-5xl font-bold block mb-4 leading-none" style={{ color: "#FF2DAA" }}>
                  {step.num}
                </span>
                <h3 className="font-heading text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
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
            "Working with Sarah 1:1 was the single greatest investment I've ever made in myself. Within 90 days my entire life had shifted — my business, my relationships, my identity."
          </blockquote>
          <p className="font-bold text-sm" style={{ color: "#FF2DAA" }}>Denise W.</p>
          <p className="text-muted-foreground text-xs mt-1">1:1 Coaching Client · Purpose-Activated Entrepreneur</p>
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
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Apply Today</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight mb-5">
            Ready to do the deepest<br />work of your life?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Sarah takes a maximum of 6 private clients at a time. This is intimate by design — because your transformation deserves her full attention.
          </p>
          <Link to="/apply?program=one-on-one" className="btn-neon-solid shadow-lg">
            Apply for 1:1 Coaching <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <EmailCapture variant="fullwidth" />
    </div>
  );
};

export default OneOnOne;
