import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Mic, BookOpen, Sparkles, Shield, Heart, Users } from "lucide-react";

const outcomes = [
  { icon: Heart, text: "Heal abandonment and betrayal wounds" },
  { icon: Shield, text: "Break trauma-driven relationship cycles" },
  { icon: Sparkles, text: "Strengthen identity in Christ" },
  { icon: Users, text: "Develop emotional regulation and spiritual maturity" },
  { icon: ArrowRight, text: "Move from survival mode into divine stability" },
];

const speakingTopics = [
  {
    num: "01",
    title: "From Survival Mode to Divine Stability",
    desc: "Breaking the grip of trauma responses and stepping into the steady, grounded life God designed for you.",
  },
  {
    num: "02",
    title: "Healing the Abandonment Wounds",
    desc: "Addressing the deep root of rejection, abandonment, and betrayal — and how Christ restores what was broken.",
  },
  {
    num: "03",
    title: "Discernment & Destiny",
    desc: "How spiritual clarity, self-awareness, and emotional healing unlock the path to your God-given purpose.",
  },
  {
    num: "04",
    title: "Becoming a Lotus",
    desc: "Rising from the mud of your past into the full bloom of your identity, calling, and purpose in Christ.",
  },
];

const eventTypes = [
  "Conferences",
  "Church Services",
  "Panel Discussions",
  "Retreats",
  "Workshops",
  "Virtual Events",
];

const About = () => {
  useSEO({
    title: "About Sarah Adams",
    description:
      "Sarah Adams is a Christian counselor, prophetess, seer, and founder of Evole 2 Purpose — a healing movement dedicated to breaking generational cycles and restoring identity through Christ-centered emotional healing.",
    keywords:
      "Sarah Adams Christian counselor, prophetess seer coach, generational cycle breaking, identity restoration Christ, abandonment wound healing, trauma healing coach, evole 2 purpose founder, becoming a lotus book",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://evole2purpose.com/#sarah-adams",
      name: "Sarah Adams",
      jobTitle: "Christian Counselor, Prophetess & Transformation Coach",
      description:
        "Sarah Adams is a Christian counselor, prophetess, seer, and the founder of EVOLVE 2 PURPOSE — a transformational healing movement dedicated to breaking generational cycles and restoring identity through Christ-centered emotional healing.",
      url: "https://evole2purpose.com/about",
      knowsAbout: [
        "Generational Cycle Breaking",
        "Christian Counseling",
        "Trauma Healing",
        "Prophetic Ministry",
        "Identity Restoration",
        "Emotional Regulation",
        "Abandonment Wound Healing",
      ],
      sameAs: [
        "https://instagram.com/evole2purpose",
        "https://facebook.com/evole2purpose",
        "https://youtube.com/@evole2purpose",
      ],
    },
  });
  return (
  <div>

    {/* ── HERO ──────────────────────────────────────────────────── */}
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B0B0F", minHeight: "90vh" }}
    >
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,45,170,0.16), transparent 65%)" }}
      />

      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] relative z-10">

        {/* Left — text */}
        <div className="flex flex-col justify-center px-6 py-20 lg:py-32 lg:pr-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#FF2DAA" }} />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>
              Founder — Evole 2 Purpose
            </p>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] letter-tight mb-5">
            Sarah<br />
            <span className="italic" style={{ color: "#FF2DAA" }}>Adams</span>
          </h1>

          <p className="font-heading text-lg md:text-xl text-white/55 italic mb-9 leading-relaxed">
            Breaking Cycles. Restoring Identity.<br />Releasing Purpose.
          </p>

          <div className="flex flex-col gap-2.5 mb-10">
            {[
              "Christian Counselor",
              "Prophetess & Seer",
              "Transformation Coach & Speaker",
              "Author — Becoming a Lotus",
            ].map((title) => (
              <div key={title} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#FF2DAA" }} />
                <span className="text-white/60 text-sm font-semibold">{title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="btn-neon-solid shadow-lg">
              Book Sarah to Speak <ArrowRight size={16} />
            </Link>
            <Link
              to="/programs"
              className="btn-neon-outline"
              style={{ color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Work With Sarah
            </Link>
          </div>
        </div>

        {/* Right — hero portrait */}
        <div className="relative hidden lg:flex items-end justify-center overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, #0B0B0F, transparent)" }}
          />
          <img
            src="/53DE7570-D7E8-4E05-A9FC-6B56FDC74685.JPG"
            alt="Sarah Adams — Founder of Evole 2 Purpose"
            className="w-full h-full object-cover object-top"
            style={{ maxHeight: "90vh" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, #0B0B0F, transparent)" }}
          />
        </div>
      </div>
    </section>

    {/* ── SCRIPTURE ─────────────────────────────────────────────── */}
    <section className="py-14 bg-[#F6F6F8] premium-border-top">
      <div className="container-narrow text-center">
        <p className="font-heading text-2xl md:text-3xl italic text-foreground leading-relaxed">
          "He heals the brokenhearted and binds up their wounds."
        </p>
        <p className="text-primary font-bold letter-luxury text-xs uppercase mt-4 tracking-widest">
          — Psalm 147:3
        </p>
      </div>
    </section>

    {/* ── ORIGIN STORY ─────────────────────────────────────────── */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-100px] right-[-150px]" />
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Photo */}
        <div className="relative order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:max-w-full" style={{ aspectRatio: "3/4" }}>
            <img
              src="/638B77E1-7302-450B-9FBD-2938B450C810.JPG"
              alt="Sarah Adams"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,45,170,0.2)" }}
            />
          </div>
          {/* Floating quote */}
          <div
            className="absolute -bottom-5 -right-2 lg:-right-6 rounded-2xl p-5 shadow-xl max-w-[210px]"
            style={{ backgroundColor: "#0B0B0F" }}
          >
            <div className="w-5 h-px mb-3" style={{ background: "#FF2DAA" }} />
            <p className="font-heading text-xs text-white/60 italic leading-relaxed">
              "Her authority was not built in comfort. It was built through survival — and surrender."
            </p>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8 !mx-0" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Her Story</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight mb-8 leading-tight">
            Forged in the Fire.<br />
            <span className="italic neon-text">Rebuilt with Purpose.</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Sarah Adams is a Christian counselor, prophetess, seer, and the founder of EVOLVE 2 PURPOSE — a transformational healing movement dedicated to breaking generational cycles and restoring identity through Christ-centered emotional healing.
            </p>
            <p>
              After experiencing deep abandonment, sexual trauma, and betrayal by individuals who were meant to protect her, Sarah discovered how unhealed wounds silently shape identity, relationships, and decision-making. What she endured did not just cause pain — it{" "}
              <em className="text-foreground">revealed patterns repeating in her own life.</em>
            </p>
            <p>
              Instead of remaining in survival mode, she chose{" "}
              <strong className="text-foreground">intentional healing.</strong>
            </p>
            <p>
              Through biblical truth, spiritual discernment, emotional accountability, and deep self-examination, she began identifying and breaking the root patterns that once controlled her life. That journey transformed her from surviving trauma to dismantling cycles — and she has never looked back.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── THE GIFT ──────────────────────────────────────────────── */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Copy */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8 !mx-0" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Gift She Carries</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight mb-8 leading-tight">
            Not Spectacle.<br />
            <span className="italic neon-text">Clarity.</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed mb-10">
            <p>
              As a prophetess and seer, Sarah carries a strong discernment to recognize spiritual blocks, emotional wounds, and hidden patterns others often overlook. Her gift is not spectacle — it is clarity. She helps individuals see what has been <em className="text-foreground">buried</em> so they can finally heal it.
            </p>
            <p>
              Her ministry bridges spiritual truth and emotional intelligence — a rare combination that brings both freedom and practical transformation. She does not just speak into your situation; she helps you understand the root beneath it.
            </p>
          </div>

          <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-4">She guides others to:</p>
          <div className="space-y-3">
            {outcomes.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,45,170,0.1)" }}
                >
                  <Icon size={13} style={{ color: "#FF2DAA" }} />
                </div>
                <p className="text-foreground text-sm font-medium leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="relative">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:max-w-full"
            style={{ aspectRatio: "1/1" }}
          >
            <img
              src="/8D7ABCAC-9B95-4031-88F9-172408D8AFEF.JPG"
              alt="Sarah Adams"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,45,170,0.15)" }}
            />
          </div>
          <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl border border-border shadow-xl px-5 py-4">
            <p className="neon-text font-heading text-2xl font-bold">500+</p>
            <p className="text-muted-foreground text-xs font-semibold letter-luxury uppercase">Lives Transformed</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── BOOK: BECOMING A LOTUS ───────────────────────────────── */}
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0B0B0F" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(255,45,170,0.1), transparent 70%)" }}
      />
      <div className="container-narrow text-center relative z-10">
        <div className="flex items-center gap-3 justify-center mb-5">
          <div className="w-8 h-px" style={{ background: "rgba(255,45,170,0.4)" }} />
          <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>
            Published Author
          </p>
          <div className="w-8 h-px" style={{ background: "rgba(255,45,170,0.4)" }} />
        </div>
        <div className="inline-flex items-center gap-2 mb-5">
          <BookOpen size={15} style={{ color: "rgba(255,45,170,0.5)" }} />
          <p className="text-white/30 text-xs font-bold letter-luxury uppercase">Evole 2 Purpose Presents</p>
        </div>
        <h2 className="font-heading text-5xl md:text-7xl text-white letter-tight mb-6 leading-tight">
          Becoming<br />a <span className="italic" style={{ color: "#FF2DAA" }}>Lotus</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          A transformational guide to emotional and spiritual restoration. Like the lotus flower — which rises from muddy water into breathtaking bloom — this book walks you through the journey from wounding to wholeness, from survival to purpose.
        </p>
        <div className="w-16 h-px mx-auto mb-10" style={{ background: "rgba(255,45,170,0.35)" }} />
        <blockquote className="font-heading text-xl md:text-2xl text-white/60 italic leading-relaxed">
          "Her mission is simple:<br />
          <span className="text-white font-bold not-italic">Heal the root. Break the pattern. Evolve with intention.</span>"
        </blockquote>
      </div>
    </section>

    {/* ── SPEAKING TOPICS ──────────────────────────────────────── */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-50px] left-[-100px]" />
      <div className="container-wide relative z-10">

        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Speaking Ministry</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">
            Book Sarah <span className="italic neon-text">to Speak</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Topics */}
          <div className="space-y-5">
            {speakingTopics.map((topic) => (
              <div key={topic.num} className="luxury-card hover:-translate-y-1 transition-transform duration-200">
                <div className="luxury-card-inner">
                  <div className="flex items-start gap-5">
                    <span
                      className="font-heading text-3xl font-bold leading-none flex-shrink-0 pt-1"
                      style={{ color: "rgba(255,45,170,0.3)" }}
                    >
                      {topic.num}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold mb-2">{topic.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{topic.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link to="/booking" className="btn-neon-solid shadow-lg">
                <Mic size={16} /> Submit a Speaking Request
              </Link>
            </div>
          </div>

          {/* Speaking photo + event types */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
              <img
                src="/0F3996CA-9B2E-418F-9F61-1244D42ACB9B.JPG"
                alt="Sarah Adams — Speaker"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(11,11,15,0.85) 0%, rgba(11,11,15,0.1) 50%, transparent 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-bold letter-luxury text-[10px] uppercase mb-4" style={{ color: "#FF2DAA" }}>
                  Available For
                </p>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((e) => (
                    <span
                      key={e}
                      className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full text-white border"
                      style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── MISSION CTA ───────────────────────────────────────────── */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-narrow text-center relative z-10">
        <div className="ornament-line-wide mb-10" />
        <div className="flex items-center gap-3 justify-center mb-5">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Mission</p>
          <div className="ornament-line !w-8" />
        </div>
        <h2 className="font-heading text-4xl md:text-6xl letter-tight mb-8 leading-tight">
          Heal the Root.<br />
          Break the Pattern.<br />
          <span className="italic neon-text">Evolve with Intention.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Every person Sarah works with carries wounds that — when properly healed through Christ-centered truth and emotional accountability — become the very tools needed to transform their life and free the generations that follow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Work With Sarah <ArrowRight size={16} />
          </Link>
          <Link to="/free-guide" className="btn-neon-outline">
            Get the Free Guide
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
  );
};

export default About;
