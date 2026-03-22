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
  Heart,
  Star,
  Shield,
  Crown,
} from "lucide-react";

const curriculum = [
  { weeks: "Weeks 1–4", title: "Foundation: Lead in Love", desc: "We establish the core container. You learn how to lead yourself — your emotions, your boundaries, your narrative — from a place of love rather than fear. This is the root of everything." },
  { weeks: "Weeks 5–8", title: "Accountability Mastery", desc: "We break the cycle of self-blame and other-blame. You develop radical personal accountability — the kind that doesn't punish, but empowers. You stop waiting for others to change." },
  { weeks: "Weeks 9–12", title: "Triggers, Roots & Release", desc: "The deepest phase. We map your emotional triggers back to their origin — generational patterns, defining moments, inherited beliefs — and we do the actual work of release and reprogramming." },
  { weeks: "Weeks 13–16", title: "Teaching & Legacy Activation", desc: "Your healing has a mission. In the final phase, we activate the Teaching pillar — turning your transformation into purpose, and your purpose into a life that serves others and honors your calling." },
];

const included = [
  "3-day immersive retreat experience with Sarah Adams",
  "16 weeks of live group classes (full L.A.T.T. curriculum)",
  "5 private 1:1 sessions with Sarah (personal strategy and breakthrough work)",
  "Small cohort setting — maximum 10 women for deep intimacy",
  "Full L.A.T.T. framework workbook and all course materials",
  "Weekly accountability check-ins with your cohort partner",
  "Private mentorship portal access for the full 16 weeks",
  "Lifetime alumni community access",
  "Personalized legacy action plan at program close",
];

const retreat = [
  { day: "Day 1", title: "Arrival, Grounding & Foundation Work", desc: "We open the container with intention-setting, deep introductions, and your first immersive session on leading in love. The evening closes with community, reflection, and sacred space." },
  { day: "Day 2", title: "Accountability, Triggers & Root Cause Intensive", desc: "The most powerful day of the retreat. We move through Accountability and Triggers in an intensive format — real breakthroughs, real release. This is the day your whole life can shift." },
  { day: "Day 3", title: "Purpose Activation & Legacy Planning", desc: "We close the retreat by activating Teaching — connecting your healed story to your calling. Every woman leaves with a clear, personalized legacy mission and a plan to live it." },
];

const faqs = [
  { q: "How is Mentorship different from the other programs?", a: "Mentorship is Sarah's most comprehensive offering. It combines the in-person intensity of the Healing Intensive with 16 weeks of deep curriculum, private 1:1 coaching sessions, and the intimacy of a maximum 10-person cohort. This is not just a program — it is a full transformation experience with Sarah as your personal guide over four months." },
  { q: "When does the retreat take place?", a: "Retreat dates are announced with each cohort cycle. You will receive full location and logistics details upon acceptance. Cohort sizes are capped at 10 women, so spots fill quickly once announced." },
  { q: "What do the 5 private sessions with Sarah cover?", a: "Your 1:1 sessions are scheduled at strategic points throughout the 16 weeks — typically at the retreat, after key curriculum milestones, and at program close. These sessions are tailored entirely to your specific situation, patterns, and breakthroughs as they unfold through the group work." },
  { q: "What is the refund policy?", a: "Mentorship Program registrations are non-refundable. However, in the event that you are unable to begin the program, your enrollment may be transferred to a future cohort at no additional cost. We honor your commitment to this journey — and we simply ask that you reschedule rather than cancel." },
  { q: "Is this right for me if I've never worked with a coach before?", a: "The Mentorship Program is best suited for women who are ready to go all-in on their transformation — whether this is your first experience with coaching or you've done prior work and are ready to go deeper. The 16-week structure and small cohort size mean Sarah and your peers will support you fully at every step." },
  { q: "How do I apply?", a: "Click 'Apply for Mentorship' below to begin your application. Because cohort sizes are capped at 10, applications are reviewed on a rolling basis and Sarah personally reviews each one. You will hear back within 48–72 hours of submission." },
];

const Mentorship = () => {
  useSEO({
    title: "Mentorship Program — 16-Week Immersive Coaching + Retreat with Sarah Adams",
    description: "Sarah Adams' most comprehensive transformation experience. 3-day retreat, 16 weeks of classes, 5 private 1:1 sessions. Maximum 10 women. $2,222 investment.",
    keywords: "mentorship program women, women's mentorship coaching, healing retreat mentorship, 16 week coaching program, Sarah Adams mentorship, transformational mentorship women, life coaching mentorship program",
    breadcrumbs: [
      { name: "Coaching Programs", url: "/programs" },
      { name: "Mentorship Program", url: "/programs/mentorship" },
    ],
  });

  return (
    <div>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#08080C" }}>
        <div
          className="absolute top-[-100px] right-[-80px] w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.18), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-40px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.08), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programs
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8" />
            <span className="inline-flex items-center gap-2 text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              <Crown size={11} /> Crown-Jewel Experience
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 letter-tight leading-tight">
            The Mentorship<br />
            <span className="neon-text italic">Program</span>
          </h1>
          <p className="text-white/60 text-xl mb-4 max-w-2xl leading-relaxed">
            Sarah's most immersive, comprehensive transformation experience. A 3-day retreat, 16 weeks of live curriculum, and 5 private sessions — with a maximum of 10 women.
          </p>
          <p className="text-white/40 text-sm mb-10 font-semibold letter-luxury uppercase">
            $2,222 · Max 10 Women Per Cohort
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/apply?program=mentorship" className="btn-neon-solid shadow-lg">
              Apply for Mentorship <ArrowRight size={16} />
            </Link>
            <Link to="/programs" className="btn-neon-outline">
              View All Programs
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: Calendar, label: "3-Day Retreat" },
              { icon: Clock, label: "16 Weeks" },
              { icon: Heart, label: "5 Private Sessions" },
              { icon: Users, label: "Max 10 Women" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} style={{ color: "#FF2DAA" }} />
                <p className="text-white text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This For You? */}
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
              "You're done doing surface-level work. You're ready for the deepest transformation available and you want the full container — retreat, curriculum, and private coaching — to get there.",
              "You want to be seen, known, and held by a small circle of women who are going all-in on their healing at the same level you are. No spectators. Just ten women doing the real work together.",
              "You need both the structure of a 16-week curriculum and the flexibility of private 1:1 sessions — work that is comprehensive and custom at the same time.",
              "You've tried other programs and hit a ceiling. The next level of your transformation requires a more intensive, immersive, longer-form container — and you know it.",
              "Your healing is connected to a calling. You're not just healing for yourself — you're healing to lead, serve, and leave a legacy. This program activates both.",
              "You are ready to invest in yourself at the level your transformation deserves. You are not looking for a bargain — you are looking for a breakthrough.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-[#F6F6F8]">
                <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Retreat */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>The Retreat</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              Your 3-Day Immersive Retreat
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              The program opens with three days of sacred, intensive work in an intimate retreat setting. This is where your transformation begins in full force.
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {retreat.map(({ day, title, desc }) => (
              <div key={day} className="flex gap-6 p-7 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex-shrink-0 w-20 hidden sm:block">
                  <span className="text-[10px] font-bold letter-luxury uppercase leading-tight block" style={{ color: "#FF2DAA" }}>{day}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold letter-luxury uppercase leading-tight block mb-1 sm:hidden" style={{ color: "#FF2DAA" }}>{day}</span>
                  <h3 className="font-heading text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16-Week Curriculum */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>The Curriculum</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight" style={{ color: "#1A1A2E" }}>
              16 Weeks of Deep Transformation
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
              The full L.A.T.T. framework — Lead in Love, Accountability, Triggers, Teaching — spread across four phases with depth and intention.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {curriculum.map(({ weeks, title, desc }, i) => (
              <div key={weeks} className="bg-white rounded-2xl border border-border p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-heading text-3xl font-bold leading-none"
                    style={{ color: "#FF2DAA" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold letter-luxury uppercase px-2.5 py-1 rounded-full" style={{ background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }}>
                    {weeks}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-3" style={{ color: "#1A1A2E" }}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.1), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Everything Included</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl text-white letter-tight">
              Your Full Investment
            </h2>
          </div>
          <div className="rounded-3xl border border-white/10 p-10 md:p-14" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="space-y-4 mb-10">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                  <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>$2,222</p>
                <p className="text-white/40 text-xs mt-1">Maximum 10 women per cohort · Payment plans available</p>
              </div>
              <Link to="/apply?program=mentorship" className="btn-neon-solid shadow-lg">
                Apply for Mentorship <ArrowRight size={16} />
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
            "The Mentorship Program wasn't just coaching. It was a complete reconstruction of who I am. Sarah didn't just guide me — she walked with me through every wall I hit."
          </blockquote>
          <p className="font-bold text-sm" style={{ color: "#FF2DAA" }}>Monique R.</p>
          <p className="text-muted-foreground text-xs mt-1">Mentorship Program Graduate · Cohort I</p>
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
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#08080C" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.15), transparent 70%)" }}
        />
        <div className="container-narrow text-center relative z-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="ornament-line !w-8" />
            <span className="inline-flex items-center gap-2 text-[10px] font-bold letter-luxury uppercase" style={{ color: "#FF2DAA" }}>
              <Crown size={11} /> Only 10 Spots
            </span>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight mb-5">
            This is the most comprehensive<br />
            transformation Sarah offers.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            A 3-day retreat. Sixteen weeks of live curriculum. Five private sessions. Ten women who refuse to stay where they are. This is where lives change completely.
          </p>
          <Link to="/apply?program=mentorship" className="btn-neon-solid shadow-lg">
            Apply for Mentorship <ArrowRight size={16} />
          </Link>
          <p className="text-white/30 text-xs mt-6">Applications reviewed within 48–72 hours · Cohort capped at 10 women</p>
        </div>
      </section>

      <EmailCapture variant="fullwidth" />
    </div>
  );
};

export default Mentorship;
