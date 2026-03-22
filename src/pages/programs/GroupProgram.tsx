import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Users,
  Calendar,
  PlayCircle,
  MessageCircle,
  Star,
} from "lucide-react";

const weeks = [
  { week: "Week 1", title: "Foundation & Intake", desc: "We build the container — establish trust, vulnerability, and the rules of engagement that make transformation possible." },
  { week: "Week 2", title: "Lead in Love — Breaking Reaction Patterns", desc: "The L in L.A.T.T.: learn what it truly means to lead yourself and others from love rather than fear, trauma, or pride." },
  { week: "Week 3", title: "Accountability Deep Dive", desc: "Radical ownership isn't punishment — it's power. This week we dismantle every excuse that has kept you from your next level." },
  { week: "Week 4", title: "Trigger Mapping", desc: "You cannot heal what you refuse to name. We map your emotional triggers to their roots and interrupt the cycles at the source." },
  { week: "Week 5", title: "Healing Your Emotional Roots", desc: "We go deep into the soil — the childhood wounds, relational patterns, and inherited beliefs holding your present life hostage." },
  { week: "Week 6", title: "Breaking Generational Cycles", desc: "The patterns you didn't choose but are currently living out. This week we call them by name and begin the work of breaking them for good." },
  { week: "Week 7", title: "Stepping Into Purpose", desc: "Your healing isn't just for you. This week we connect your wounds to your calling and begin the activation of your God-given purpose." },
  { week: "Week 8", title: "Graduation & What's Next", desc: "You arrived as one woman and you're leaving as another. We close, celebrate, and map a clear path for the next season of your life." },
];

const included = [
  "8 weeks of live group sessions led personally by Sarah",
  "Full L.A.T.T. framework curriculum — all 4 steps in depth",
  "Private community access for the cohort and beyond",
  "Weekly accountability partner matching within the group",
  "Healing journal & workbook mailed or delivered digitally",
  "Full session recordings for lifetime replay",
  "Live Q&A with Sarah each week — real answers, real time",
  "Graduation & next-steps planning session in Week 8",
];

const faqs = [
  { q: "When does the next cohort start?", a: "Cohorts form seasonally — join the waitlist to be first notified of the exact start date, early access pricing, and any bonuses available to founding members. Spots fill fast, especially for women who've been waiting." },
  { q: "What if I miss a live session?", a: "Life happens. Every single session is recorded and delivered to your portal within 24 hours. You won't fall behind — and you'll still do the work even if you catch the replay. What matters is that you show up to the material." },
  { q: "Is it really worth $444?", a: "The question is what staying exactly where you are is costing you. $444 is Sarah's most accessible offering — and it includes 8 weeks of live coaching, a full curriculum, community, accountability, and lifetime recordings. Women have paid thousands for less. Payment plans are available." },
  { q: "How is this different from other group programs?", a: "Most group programs are pre-recorded courses with a Facebook group bolted on. This is live, intimate, led personally by Sarah every week, and rooted in a proven framework specifically designed for women breaking generational cycles. It is not a content library — it is a guided transformation experience." },
];

const GroupProgram = () => {
  useSEO({
    title: "Evolve 2 Purpose Group Program — 8-Week Coaching Journey",
    description: "Walk the full L.A.T.T. framework in an 8-week live group coaching program led by Sarah Adams. Community, accountability, and transformation $444.",
    keywords: "group coaching program women, 8 week transformation program, Sarah Adams group coaching, healing group program, generational cycles group coaching, affordable life coaching women",
    breadcrumbs: [
      { name: "Coaching Programs", url: "/programs" },
      { name: "Group Program", url: "/programs/group" },
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
          className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programs
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8" />
            <span className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              Best Value · 8 Weeks
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-5 letter-tight leading-tight">
            The Evolve 2 Purpose<br />
            <span className="neon-text italic">Group Program</span>
          </h1>
          <p className="text-white/60 text-xl mb-4 max-w-2xl leading-relaxed">
            Walk the full framework surrounded by women who get it.
          </p>
          <p className="text-white/40 text-sm mb-10 font-semibold letter-luxury uppercase">
            $444 · Payment Plans Available
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/apply?program=group" className="btn-neon-solid shadow-lg">
              Join the Waitlist <ArrowRight size={16} />
            </Link>
            <Link to="/programs" className="btn-neon-outline">
              View All Programs
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: Clock, label: "8 Weeks" },
              { icon: PlayCircle, label: "Live Sessions" },
              { icon: Star, label: "$444" },
              { icon: Users, label: "Community Access" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} style={{ color: "#FF2DAA" }} />
                <p className="text-white text-sm font-semibold">{label}</p>
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
              This program is for you if...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "You want transformation AND community — because you know you don't heal in isolation.",
              "You've been doing this work alone for too long — carrying the weight of your healing without anyone who truly understands.",
              "You want to be held accountable — by Sarah, by a structured framework, and by women who are in it alongside you.",
              "You learn best alongside others — hearing other women's stories unlocks something in your own that solo work never reaches.",
              "You want an accessible price point — without sacrificing quality, depth, or access to Sarah herself.",
              "You are genuinely ready to do the work in a group setting — not watch, not observe, but show up fully every single week.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-[#F6F6F8]">
                <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-Week Journey */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.06), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>The Curriculum</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              The 8-Week Journey
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              Each week is intentional. Each step builds on the last. By Week 8, you are not the same woman who enrolled.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeks.map(({ week, title, desc }) => (
              <div key={week} className="flex items-start gap-5 p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex-shrink-0 w-14 text-center">
                  <span className="text-[10px] font-bold letter-luxury uppercase block" style={{ color: "#FF2DAA" }}>{week}</span>
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
              What You Get Inside the Program
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-border p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>$444</p>
                <p className="text-muted-foreground text-xs mt-1">Payment plans available · Cohort-based enrollment</p>
              </div>
              <Link to="/apply?program=group" className="btn-neon-solid shadow-lg">
                Join the Waitlist <ArrowRight size={16} />
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
            "I am not the same woman who enrolled in this program. I understand my triggers now. I lead in love now. I actually like who I'm becoming."
          </blockquote>
          <p className="font-bold text-sm" style={{ color: "#FF2DAA" }}>Tamara J.</p>
          <p className="text-muted-foreground text-xs mt-1">Group Program Graduate</p>
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
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Limited Availability</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight mb-5">
            The next cohort is forming now.<br />Seats are limited.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join the waitlist today for early access, early-bird pricing, and first notification when enrollment opens.
          </p>
          <Link to="/apply?program=group" className="btn-neon-solid shadow-lg">
            Join the Waitlist <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <EmailCapture variant="fullwidth" />
    </div>
  );
};

export default GroupProgram;
