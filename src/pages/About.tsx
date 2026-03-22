import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Mic, Sparkles, Shield, Heart, Users, Quote } from "lucide-react";

const outcomes = [
  { icon: Heart, text: "Heal abandonment and betrayal wounds at the root" },
  { icon: Shield, text: "Break trauma-driven relationship and behavioral cycles" },
  { icon: Sparkles, text: "Strengthen identity and self-worth in Christ" },
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

const credentials = [
  "Christian Counselor",
  "Prophetess & Seer",
  "Transformation Coach",
  "Inspirational Speaker",
];

const About = () => {
  useSEO({
    title: "About Sarah Adams — Christian Counselor & Transformation Coach",
    description:
      "Meet Sarah Adams: Christian counselor, prophetess, seer, and founder of Evolve 2 Purpose. She has helped 500+ women heal from generational cycles, abandonment wounds, and trauma — and step into God-given purpose.",
    keywords:
      "Sarah Adams Christian counselor, prophetess seer coach, generational cycle breaking, identity restoration Christ, abandonment wound healing, trauma healing coach, evolve 2 purpose founder, women's conference speaker, Christian life coach, transformation coach women, faith-based healing coach, purpose coach speaker",
    breadcrumbs: [{ name: "About Sarah Adams", url: "/about" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://evolve2purpose.com/#sarah-adams",
        name: "Sarah Adams",
        givenName: "Sarah",
        familyName: "Adams",
        jobTitle: "Christian Counselor, Prophetess & Transformation Coach",
        description:
          "Sarah Adams is a Christian counselor, prophetess, seer, transformation coach, and internationally recognized speaker. As the founder of Evolve 2 Purpose, she has helped 500+ women break generational cycles, heal from abandonment and betrayal wounds, and step into their God-given calling.",
        url: "https://evolve2purpose.com/about",
        image: "https://storage.googleapis.com/gpt-engineer-file-uploads/H8AneifdGjQ2j40rrjWnVOC9h2S2/social-images/social-1772758406705-Screenshot_2026-03-05_at_6.52.46_PM.webp",
        knowsAbout: [
          "Generational Cycle Breaking",
          "Christian Counseling and Therapy",
          "Trauma-Informed Healing",
          "Prophetic Ministry",
          "Identity Restoration in Christ",
          "Emotional Regulation and Trigger Management",
          "Abandonment and Betrayal Wound Healing",
          "Purpose Activation for Women",
          "Accountability Coaching",
          "Women's Empowerment and Leadership",
          "Faith-Based Personal Development",
        ],
        hasOccupation: [
          {
            "@type": "Occupation",
            name: "Life Transformation Coach",
            occupationLocation: { "@type": "AdministrativeArea", name: "Worldwide" },
            skills: "Trauma healing, purpose coaching, accountability, generational cycle breaking",
          },
          {
            "@type": "Occupation",
            name: "Keynote Speaker",
            occupationLocation: { "@type": "AdministrativeArea", name: "Worldwide" },
            skills: "Women's conferences, church events, corporate retreats, healing intensives",
          },
          {
            "@type": "Occupation",
            name: "Christian Counselor",
            occupationLocation: { "@type": "AdministrativeArea", name: "Worldwide" },
            skills: "Christ-centered healing, spiritual identity, emotional healing",
          },
        ],
        worksFor: {
          "@type": "Organization",
          "@id": "https://evolve2purpose.com/#organization",
          name: "Evolve 2 Purpose",
          url: "https://evolve2purpose.com",
        },
        sameAs: [
          "https://instagram.com/evolve2purpose",
          "https://facebook.com/evolve2purpose",
          "https://youtube.com/@evolve2purpose",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Sarah Adams' background and training?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sarah Adams is a Christian counselor, prophetess, and seer with over 10 years of experience in faith-based healing and transformation. She founded Evolve 2 Purpose after her own journey of breaking generational cycles and discovering the 4-Step Framework that has since transformed 500+ women's lives.",
            },
          },
          {
            "@type": "Question",
            name: "What is Sarah Adams known for as a speaker?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sarah Adams is known for her raw honesty, deep biblical insight, and practical tools that leave audiences forever changed. Her signature topics include: From Survival Mode to Divine Stability, Healing the Abandonment Wound, Discernment & Destiny, and Becoming a Lotus (rising from your past into full purpose).",
            },
          },
        ],
      },
    ],
  });

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col lg:block"
        style={{ backgroundColor: "#0B0B0F", minHeight: "100svh" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-full h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 85% 15%, rgba(255,45,170,0.18), transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 10% 90%, rgba(255,45,170,0.07), transparent 60%)" }}
        />

        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 lg:min-h-[100svh] relative z-10 flex-1">

          {/* Left — text */}
          <div className="flex flex-col justify-center px-6 pt-16 pb-8 lg:py-36 lg:pr-20">

            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px" style={{ background: "#FF2DAA" }} />
              <p className="font-semibold letter-luxury text-[10px] uppercase tracking-widest" style={{ color: "#FF2DAA" }}>
                Founder — Evolve 2 Purpose
              </p>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl xl:text-7xl text-white leading-[1.03] letter-tight mb-4">
              Sarah
              <br />
              <span className="italic" style={{ color: "#FF2DAA" }}>Adams</span>
            </h1>

            <div className="w-12 h-px mb-6" style={{ background: "rgba(255,45,170,0.4)" }} />

            <p className="font-heading text-base md:text-lg text-white/50 italic mb-8 leading-relaxed max-w-sm">
              Breaking Cycles. Restoring Identity.
              <br />
              Releasing Purpose.
            </p>

            {/* Credentials as refined tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-bold letter-luxury uppercase px-3.5 py-1.5 rounded-full border text-white/70"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/booking" className="btn-neon-solid shadow-lg">
                Book Sarah to Speak <ArrowRight size={16} />
              </Link>
              <Link
                to="/programs"
                className="btn-neon-outline !border-white/20 !text-white/70 hover:!border-white/40 hover:!bg-white/10 hover:!text-white"
              >
                Work With Sarah
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-3 mt-8">
              <div className="w-5 h-px" style={{ background: "rgba(255,45,170,0.3)" }} />
              <p className="text-white/25 text-xs font-semibold letter-luxury uppercase">500+ lives transformed</p>
            </div>
          </div>

          {/* Right — hero portrait, desktop only */}
          <div className="relative hidden lg:block overflow-hidden">
            {/* Left edge fade */}
            <div
              className="absolute inset-y-0 left-0 w-40 pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, #0B0B0F, transparent)" }}
            />
            <img
              src="/53DE7570-D7E8-4E05-A9FC-6B56FDC74685.JPG"
              alt="Sarah Adams — Founder of Evolve 2 Purpose"
              className="w-full h-full object-cover object-[center_15%]"
            />
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
              style={{ background: "linear-gradient(to top, #0B0B0F, transparent)" }}
            />
            {/* Floating Psalm reference */}
            <div
              className="absolute bottom-12 right-8 z-20 rounded-2xl px-5 py-4 border"
              style={{
                backgroundColor: "rgba(11,11,15,0.85)",
                borderColor: "rgba(255,45,170,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="text-[9px] font-bold letter-luxury uppercase mb-1.5" style={{ color: "#FF2DAA" }}>
                — Psalm 147:3
              </p>
              <p className="font-heading text-xs text-white/70 italic leading-relaxed max-w-[200px]">
                "He heals the brokenhearted and binds up their wounds."
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: portrait below text, flush at bottom of hero */}
        <div className="lg:hidden relative overflow-hidden z-10" style={{ height: "72vw", maxHeight: "420px" }}>
          <img
            src="/53DE7570-D7E8-4E05-A9FC-6B56FDC74685.JPG"
            alt="Sarah Adams"
            className="w-full h-full object-cover object-[center_15%]"
          />
          {/* Top fade — blends into the text section above */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #0B0B0F 0%, transparent 30%)" }}
          />
        </div>
      </section>

      {/* ── SCRIPTURE BANNER ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff 0%, #fdf6fa 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,170,0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,170,0.15), transparent)" }} />
        <div className="container-narrow text-center px-6">
          <Quote size={32} className="mx-auto mb-5 opacity-20" style={{ color: "#FF2DAA" }} />
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl italic text-foreground leading-relaxed letter-tight max-w-2xl mx-auto">
            "He heals the brokenhearted and binds up their wounds."
          </p>
          <p className="text-primary font-bold letter-luxury text-xs uppercase mt-6 tracking-widest">
            — Psalm 147:3
          </p>
        </div>
      </section>

      {/* ── ORIGIN STORY ────────────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-[-100px] right-[-200px]" />
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* Photo — left on desktop */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl max-w-[380px] mx-auto lg:max-w-full"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src="/638B77E1-7302-450B-9FBD-2938B450C810.JPG"
                alt="Sarah Adams"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle overlay for mood */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(11,11,15,0.4))" }}
              />
              {/* Pink ring */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,45,170,0.2)" }}
              />
            </div>

            {/* Floating quote — desktop only to avoid overlap */}
            <div
              className="hidden sm:block absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl p-5 shadow-2xl max-w-[220px] border"
              style={{ backgroundColor: "#0B0B0F", borderColor: "rgba(255,45,170,0.15)" }}
            >
              <div className="w-5 h-px mb-3" style={{ background: "#FF2DAA" }} />
              <p className="font-heading text-[11px] text-white/60 italic leading-relaxed">
                "Her authority was not built in comfort — it was built through survival and surrender."
              </p>
            </div>
          </div>

          {/* Copy — right on desktop */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Her Story</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight mb-8 leading-tight">
              Forged in the Fire.<br />
              <span className="italic neon-text">Rebuilt with Purpose.</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Sarah Adams is a Christian counselor, prophetess, seer, and the founder of EVOLVE 2 PURPOSE — a transformational healing movement dedicated to breaking generational cycles and restoring identity through Christ-centered emotional healing.
              </p>
              <p>
                After experiencing deep abandonment, sexual trauma, and betrayal by individuals who were meant to protect her, Sarah discovered how unhealed wounds silently shape identity, relationships, and decision-making. What she endured did not just cause pain — it{" "}
                <em className="text-foreground font-medium">revealed patterns repeating in her own life.</em>
              </p>
              <p>
                Instead of remaining in survival mode, she chose{" "}
                <strong className="text-foreground">intentional healing.</strong>
              </p>
              <p>
                Through biblical truth, spiritual discernment, emotional accountability, and deep self-examination, she began identifying and breaking the root patterns that once controlled her life. That journey transformed her from surviving trauma to dismantling cycles — and she has never looked back.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,45,170,0.08)" }}
              >
                <Sparkles size={16} style={{ color: "#FF2DAA" }} />
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The same wounds that nearly destroyed her became the blueprint for her calling."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE GIFT ────────────────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F6F6F8 0%, #fff 100%)" }}>
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* Copy — left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Gift She Carries</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight mb-6 leading-tight">
              Not Spectacle.<br />
              <span className="italic neon-text">Clarity.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base mb-10">
              <p>
                As a prophetess and seer, Sarah carries a rare discernment — the ability to recognize spiritual blocks, emotional wounds, and hidden patterns others often overlook. Her gift is not spectacle. It is clarity. She helps individuals finally see what has been{" "}
                <em className="text-foreground font-medium">buried</em> so they can heal it at the root.
              </p>
              <p>
                Her ministry bridges spiritual truth and emotional intelligence — a combination that brings both freedom and practical transformation. She does not just speak into your situation; she helps you understand the root beneath it and gives you the tools to dismantle it.
              </p>
            </div>

            <p className="text-[10px] font-bold letter-luxury uppercase text-muted-foreground mb-5 tracking-widest">She guides others to:</p>
            <div className="space-y-3.5">
              {outcomes.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,45,170,0.08)" }}
                  >
                    <Icon size={14} style={{ color: "#FF2DAA" }} />
                  </div>
                  <p className="text-foreground text-sm font-medium leading-snug pt-1.5">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo — right */}
          <div className="relative flex flex-col items-center">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[380px] mx-auto lg:max-w-full"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src="/8D7ABCAC-9B95-4031-88F9-172408D8AFEF.JPG"
                alt="Sarah Adams"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,45,170,0.12)" }}
              />
            </div>

            {/* Stat — below photo on mobile, absolute on desktop */}
            <div
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 bg-white rounded-2xl border border-border shadow-xl px-6 py-4"
            >
              <p className="neon-text font-heading text-3xl font-bold leading-none">500+</p>
              <p className="text-muted-foreground text-xs font-semibold letter-luxury uppercase mt-1">Lives Transformed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING: SPEAKING OPPORTUNITIES ─────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ backgroundColor: "#0B0B0F" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(255,45,170,0.12), transparent 70%)" }}
        />

        <div className="container-wide relative z-10">

          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-8 h-px" style={{ background: "rgba(255,45,170,0.4)" }} />
              <p className="font-bold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Booking Opportunities</p>
              <div className="w-8 h-px" style={{ background: "rgba(255,45,170,0.4)" }} />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight text-white mb-5">
              Book Sarah <span className="italic" style={{ color: "#FF2DAA" }}>as a Speaker</span>
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
              Sarah is available for conferences, church services, panel discussions, retreats, workshops, and virtual events. Her messages bring healing, clarity, and divine activation to every room.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Topic cards */}
            <div>
              <p className="text-[9px] font-bold letter-luxury uppercase text-white/30 mb-5 tracking-widest">Speaking Topic Overviews</p>
              <div className="space-y-4">
                {speakingTopics.map((topic) => (
                  <div
                    key={topic.num}
                    className="rounded-2xl border p-6 transition-all duration-300 hover:border-primary/30 group"
                    style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className="font-heading text-2xl font-bold leading-none flex-shrink-0 pt-0.5 transition-colors duration-300 group-hover:text-primary"
                        style={{ color: "rgba(255,45,170,0.25)" }}
                      >
                        {topic.num}
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-bold text-white mb-1.5">{topic.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed">{topic.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-7 flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="btn-neon-solid shadow-lg">
                  <Mic size={15} /> Book Sarah to Speak
                </Link>
                <Link
                  to="/booking"
                  className="btn-neon-outline !border-white/20 !text-white/60 hover:!bg-white/10 hover:!text-white hover:!border-white/30"
                >
                  Submit an Inquiry
                </Link>
              </div>
            </div>

            {/* Speaking photo */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                <img
                  src="/0F3996CA-9B2E-418F-9F61-1244D42ACB9B.JPG"
                  alt="Sarah Adams — Inspirational Speaker"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(11,11,15,0.92) 0%, rgba(11,11,15,0.1) 50%, transparent 100%)" }}
                />
                {/* Pink ring */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,45,170,0.15)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-bold letter-luxury text-[9px] uppercase mb-4" style={{ color: "#FF2DAA" }}>
                    Available For
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((e) => (
                      <span
                        key={e}
                        className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full text-white/80 border"
                        style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)" }}
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

      {/* ── MISSION CTA ─────────────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-narrow text-center relative z-10">
          <div className="ornament-line-wide mb-10" />
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Mission</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl letter-tight mb-8 leading-[1.1]">
            Heal the Root.<br />
            Break the Pattern.<br />
            <span className="italic neon-text">Evolve with Intention.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-12">
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
