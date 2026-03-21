import { Link } from "react-router-dom";
import { useEffect } from "react";
import useSEO from "@/hooks/useSEO";
import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight, Sparkles, Star, Download } from "lucide-react";

const testimonials = [
  {
    quote: "Sarah's guidance helped me see what I'd been carrying for years. For the first time, I feel free to walk in my purpose.",
    name: "Tamara J.",
    detail: "Healed from 15 years of unforgiveness",
  },
  {
    quote: "I didn't know healing could feel this safe. Through the 4-Step Framework, I finally broke the cycle that had haunted three generations of my family.",
    name: "Michelle R.",
    detail: "Generational cycle breaker",
  },
  {
    quote: "Working with Sarah changed everything. I went from surviving to thriving — spiritually, emotionally, and in my calling.",
    name: "Denise W.",
    detail: "Purpose-activated entrepreneur",
  },
];

const steps = [
  {
    num: "01",
    title: "Lead in Love",
    desc: "When you choose love over reaction, you step into divine alignment instead of emotional chaos. Leading in love doesn't mean weakness — it means trusting that peace will protect what pride would destroy.",
    takeaway: "Choose peace over pride.",
  },
  {
    num: "02",
    title: "Take Accountability for Your Action",
    desc: "Growth begins when you stop pointing fingers and start taking ownership. Accountability isn't about guilt — it's about maturity, healing, and the courage to see where you can evolve.",
    takeaway: "Ownership unlocks your next level.",
  },
  {
    num: "03",
    title: "Learn from Your Actions & Manage Your Triggers",
    desc: "Every reaction reveals a wound that still needs your attention. When you learn from your mistakes and manage your triggers, you break the cycles that once controlled you.",
    takeaway: "Every trigger is a teacher.",
  },
  {
    num: "04",
    title: "Teach Someone Else What You Just Learned",
    desc: "Healing becomes wisdom when it's shared. The lessons you've lived through can become someone else's breakthrough — that's how purpose is born.",
    takeaway: "Your story is someone else's breakthrough.",
  },
];

const philosophyBullets = [
  {
    num: "01",
    title: "Lead in Love",
    text: "Choose peace over pride. Love is not passive — it's the most powerful force for lasting change.",
  },
  {
    num: "02",
    title: "Own Your Growth",
    text: "Accountability is the foundation of every breakthrough. Take ownership and unlock your next level.",
  },
  {
    num: "03",
    title: "Break the Cycle",
    text: "Understand your triggers and master them. Every wound is a doorway to deeper healing.",
  },
  {
    num: "04",
    title: "Share What You Know",
    text: "Purpose is fulfilled when your healing becomes a gift. Your story is someone else's breakthrough.",
  },
];

const faqItems = [
  {
    q: "What does it mean to 'lead in love'?",
    a: "Leading in love means choosing a response rooted in peace and intention rather than reacting from pain or pride. It's a daily practice of aligning your actions with your highest values — even when it's hard.",
  },
  {
    q: "How is accountability different from blame or guilt?",
    a: "Accountability is forward-facing. It asks: 'What can I learn from this?' rather than 'How could I have been so wrong?' It's a mature, empowering stance that drives growth instead of shame.",
  },
  {
    q: "What are emotional triggers and why do they matter?",
    a: "Triggers are emotional reactions tied to unhealed wounds. When something hits a sore spot, it's usually pointing to a deeper experience that still needs attention. Managing your triggers means understanding those wounds and reducing their hold on your responses.",
  },
  {
    q: "Do I need to have everything figured out before I can teach others?",
    a: "Not at all. Teaching others doesn't require perfection — it requires honesty. Sharing what you've learned in real time, even while still growing, is one of the most powerful ways to create impact and solidify your own transformation.",
  },
  {
    q: "How does this framework connect to finding my purpose?",
    a: "Each step of the Evolve 2 Purpose framework builds on the last. When you lead with love, take ownership, heal your wounds, and share your lessons — you naturally step into the life you were designed to live. Purpose isn't found; it's revealed through the process.",
  },
];

const INDEX_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://evolve2purpose.com/#webpage",
    url: "https://evolve2purpose.com/",
    name: "Evolve 2 Purpose — Life Transformation Coaching with Sarah Adams",
    isPartOf: { "@id": "https://evolve2purpose.com/#website" },
    about: { "@id": "https://evolve2purpose.com/#organization" },
    description: "Break generational cycles, heal your roots, and step into your God-given purpose. Sarah Adams' proven 4-Step Transformation Framework has helped 500+ women live with love, accountability, and lasting purpose.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://evolve2purpose.com" }],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Evolve 2 Purpose 4-Step Transformation Framework?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 4-Step System is Sarah Adams' proven framework for lasting life transformation: Step 1 — Lead in Love (choose alignment and peace over pride and reaction), Step 2 — Take Accountability (own your growth and stop the blame cycle), Step 3 — Manage Your Triggers (understand emotional roots and break reactive patterns), Step 4 — Teach Others (turn your healing into purpose by serving someone else with your story).",
        },
      },
      {
        "@type": "Question",
        name: "Who is Evolve 2 Purpose coaching designed for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evolve 2 Purpose serves women who are ready to break generational cycles, heal from abandonment, betrayal, and trauma, and step into their God-given purpose. Programs range from 1:1 deep-dive coaching to group programs, healing intensives, and the free 4-Step Guide.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the transformation process take with Sarah Adams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many clients experience significant mindset shifts within the first session. The full 1:1 coaching journey is typically 3–6 months. The 8-week group program delivers concentrated transformation in two months. Healing Intensive Weekends offer accelerated breakthroughs in just a weekend.",
        },
      },
      {
        "@type": "Question",
        name: "Is coaching available online or does it require in-person attendance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All programs are available online via video call, making them fully accessible worldwide. Sarah works with clients across the US, UK, Canada, and internationally. In-person intensives may be available in select locations for special retreats.",
        },
      },
      {
        "@type": "Question",
        name: "What is a generational cycle and how does coaching help break it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A generational cycle is a repeated pattern of behavior, trauma response, or belief system that is passed down through families — often unconsciously. Through Sarah's 4-Step Framework, clients learn to identify their inherited patterns, heal the root wound, and consciously choose new responses so the cycle stops with them.",
        },
      },
      {
        "@type": "Question",
        name: "How can I start my journey with Evolve 2 Purpose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can start for free by downloading Sarah's 4-Step Guide at evolve2purpose.com/free-guide. From there, you can explore coaching programs at evolve2purpose.com/programs, or book a Purpose Clarity Session to get personalized guidance in 90 minutes.",
        },
      },
    ],
  },
];

const Index = () => {
  useSEO({
    title: "Break Generational Cycles & Walk in Purpose",
    description:
      "Sarah Adams' proven 4-Step Transformation Framework has helped 500+ women break generational cycles, heal at the root, and step into God-given purpose. Start your free journey today.",
    keywords:
      "life transformation coaching, 4 step transformation framework, purpose coaching for women, Sarah Adams coach, break generational cycles, evolve 2 purpose, healing coaching for women, women empowerment coach, Christian life coach, generational trauma healing, accountability coaching, purpose activation women",
    schema: INDEX_SCHEMA,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center hero-gradient-bg overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px] animate-float" />
        <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] left-[-50px] animate-float-delayed" />
        <div className="glow-orb w-[300px] h-[300px] top-[30%] right-[20%] animate-pulse-slow" />

        <div className="absolute top-1/4 right-12 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
        <div className="absolute bottom-1/4 right-24 w-px h-48 bg-gradient-to-b from-transparent via-primary/10 to-transparent hidden lg:block" />
        <div className="absolute top-1/3 left-[60%] w-24 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent hidden lg:block" />

        <div className="relative z-10 container-wide px-6 lg:px-12 py-32">
          <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-8 animate-fade-up">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">
                Evolve 2 Purpose
              </p>
              <div className="ornament-line !w-8 !mx-0" />
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1.05] mb-8 animate-fade-up-delay-1 letter-tight text-balance">
              Break the Cycles.{" "}
              <span className="italic">Heal Deeply.</span>{" "}
              Walk Fully in Your{" "}
              <span className="neon-text">Purpose.</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up-delay-2">
              True transformation begins when you choose love, embrace accountability, and turn your lessons into a legacy that lifts others.
            </p>

            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/programs" className="btn-neon-solid shadow-lg">
                Begin Your Journey <ArrowRight size={16} />
              </Link>
              <Link to="/framework" className="border border-border text-foreground px-10 py-4 rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all duration-300">
                Explore the Framework
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* PDF DOWNLOAD STRIP */}
      <section className="py-4" style={{ backgroundColor: "#0B0B0F" }}>
        <div className="container-wide px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
              style={{ background: "rgba(255,45,170,0.15)" }}
            >
              <Download size={14} style={{ color: "#FF2DAA" }} />
            </span>
            <p className="text-white text-sm font-semibold">
              Free Download:{" "}
              <span style={{ color: "#FF2DAA" }}>
                4 Step System to Transform Your Life
              </span>
            </p>
          </div>
          <a
            href="/4step.pdf"
            download="4-Step-System-Transform-Your-Life.pdf"
            className="flex items-center gap-2 flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold letter-luxury uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,170,0.5)] hover:-translate-y-px"
            style={{ background: "#FF2DAA", color: "#fff" }}
          >
            <Download size={11} />
            Download Free PDF
          </a>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-8 premium-border-top">
        <div className="container-wide px-6 flex flex-wrap items-center justify-center gap-10 text-muted-foreground text-[10px] letter-luxury uppercase font-semibold">
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Lead in Love</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Take Accountability</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Manage Your Triggers</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Teach What You Know</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Evolve 2 Purpose</span>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-6 rounded-full border border-primary/15" />
              <div className="absolute inset-12 rounded-full border border-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="text-primary mx-auto mb-4" size={32} />
                  <p className="font-heading text-3xl font-bold italic text-primary/80">Sarah</p>
                  <p className="font-heading text-xl italic text-primary/60">Adams</p>
                  <div className="ornament-line mt-4 !w-12" />
                  <p className="text-muted-foreground text-xs letter-luxury uppercase mt-4">Purpose Coach</p>
                  <p className="text-muted-foreground text-xs letter-luxury uppercase">& Restoration Guide</p>
                </div>
              </div>
              <div className="glow-orb w-[200px] h-[200px] top-0 right-0" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Meet Your Guide</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-8 letter-tight">
              Hi, I'm <span className="italic">Sarah Adams</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
              I know what it feels like to carry wounds you didn't ask for — the kind that echo through generations and whisper that you'll never be free. But I also know that healing is possible, because I've lived it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Through the Evolve 2 Purpose framework — rooted in love, accountability, and radical self-awareness — I help women just like you break free from cycles, face their truth, and step into the extraordinary purpose they were created for.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 text-primary font-semibold text-sm group">
              <span>Read My Full Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">What We Stand For</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Our Philosophy</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Four timeless principles that form the foundation of every transformation we walk alongside.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyBullets.map((item, i) => (
              <div
                key={item.num}
                className="scroll-reveal bg-white rounded-2xl border border-border p-8 text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="neon-text font-heading text-4xl font-bold block mb-3">{item.num}</span>
                <div className="ornament-line !w-8 mb-4" />
                <h3 className="font-heading text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORM YOUR LIFE IN 4 STEPS */}
      <section className="section-padding relative overflow-hidden" id="transform">
        <div className="glow-orb w-[500px] h-[500px] -top-[200px] left-[30%]" />
        <div className="container-wide relative z-10">

          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-muted-foreground font-semibold text-[10px] letter-luxury uppercase mb-2">By Sarah Adams</p>
            <p className="neon-text font-bold text-sm letter-luxury uppercase mb-5">Evolve 2 Purpose</p>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight mb-5">Transform Your Life in 4 Steps</h2>
            <div className="ornament-line-wide" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: inspirational quote block */}
            <div className="lg:sticky lg:top-32">
              <div
                className="rounded-3xl p-10 md:p-12 text-white relative overflow-hidden"
                style={{ backgroundColor: "#0B0B0F" }}
              >
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,45,170,0.2), transparent 70%)" }}
                />
                <div
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
                />

                <p
                  className="font-heading text-xs font-bold letter-luxury uppercase mb-8 relative z-10"
                  style={{ color: "#FF2DAA" }}
                >
                  Evolve 2 Purpose
                </p>
                <blockquote className="font-heading text-2xl md:text-3xl leading-snug text-white mb-8 relative z-10 font-semibold">
                  "Your healing is not just for you — it's the light that guides someone else home."
                </blockquote>
                <div
                  className="w-10 h-px mb-5 relative z-10"
                  style={{ background: "#FF2DAA" }}
                />
                <p className="text-white/60 text-sm font-semibold relative z-10">Sarah Adams</p>
                <p
                  className="text-xs letter-luxury uppercase relative z-10 mt-1"
                  style={{ color: "#FF2DAA" }}
                >
                  Author & Purpose Coach
                </p>
              </div>
            </div>

            {/* Right: stacked step cards */}
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="step-card scroll-reveal"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="flex items-start gap-6 p-7 md:p-8">
                    <span
                      className="font-heading text-4xl font-bold leading-none flex-shrink-0 pt-1"
                      style={{ color: "#FF2DAA" }}
                    >
                      {step.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.desc}</p>
                      <p
                        className="text-[10px] font-bold letter-luxury uppercase"
                        style={{ color: "#FF2DAA" }}
                      >
                        Key Takeaway — {step.takeaway}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Link to="/evolve-2-purpose" className="btn-neon-outline">
              Explore Evolve 2 Purpose
            </Link>
            <Link to="/programs" className="btn-neon-solid shadow-lg">
              Work With Sarah Adams <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding relative bg-[#F6F6F8]">
        <div className="container-wide">
          <div className="text-center mb-20">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Transformations</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight">Lives Changed Through Healing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="luxury-card scroll-reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="luxury-card-inner relative">
                  <div className="neon-text font-heading text-8xl absolute -top-2 left-0 opacity-10 leading-none">"</div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-8 relative z-10 italic text-base">{t.quote}</p>
                  <div className="ornament-line !w-8 !mx-0 mb-4" />
                  <p className="font-heading font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-primary font-semibold text-sm group">
              Read More Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] right-[-50px]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Work With Sarah</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Find Your Path to Purpose</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Every journey is unique. Choose the pathway that meets you exactly where you are.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "1:1 Healing Sessions", desc: "Deep, personalized healing work tailored to your specific wounds and breakthrough needs.", cta: "Apply Now", icon: "◆" },
              { title: "Group Restoration Program", desc: "Heal alongside a sisterhood of women walking the same journey — guided, supported, transformed.", cta: "Join the Waitlist", icon: "◇" },
              { title: "Purpose Guidance Session", desc: "Receive clarity, direction, and strategic insight for your next season of life and purpose.", cta: "Book a Session", icon: "○" },
            ].map((p) => (
              <div key={p.title} className="luxury-card flex flex-col">
                <div className="luxury-card-inner flex flex-col flex-1">
                  <span className="neon-text font-heading text-3xl mb-4">{p.icon}</span>
                  <h3 className="font-heading text-xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-8">{p.desc}</p>
                  <Link
                    to="/programs"
                    className="btn-neon-solid !text-sm !px-6 !py-3 text-center shadow-md"
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Common Questions</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="scroll-reveal bg-white rounded-2xl border border-border p-7 md:p-8"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <EmailCapture variant="fullwidth" />

      {/* TRANSFORMATION PROMISE */}
      <section className="section-padding text-center relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container-narrow relative z-10">
          <div className="ornament-line-wide mb-8" />
          <h2 className="font-heading text-4xl md:text-6xl mb-8 leading-tight letter-tight">
            You are not <span className="italic">broken.</span><br />
            You are being <span className="neon-text italic">restored.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Every lesson you've lived through has been preparing you for this moment. The pain you've carried has a purpose — and your healing is the doorway to the life you were always designed for.
          </p>
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Start Your Journey Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
