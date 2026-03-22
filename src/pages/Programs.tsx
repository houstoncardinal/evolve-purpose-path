import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Check, Star, Clock, Users, Zap, Shield } from "lucide-react";

const programs = [
  {
    id: "one-on-one",
    tag: "Most Transformative",
    title: "1:1 Deep-Dive Coaching",
    subtitle: "Private, Personalized Transformation",
    price: "Custom Investment",
    priceNote: "Application required — limited availability",
    learnMore: "/programs/one-on-one",
    description:
      "The most powerful and intimate pathway Sarah offers. This is reserved for women who are serious about deep, lasting change — not surface-level shifts. You get Sarah's full attention, custom strategy, and ongoing support.",
    includes: [
      "Comprehensive intake & healing assessment",
      "Fully customized transformation roadmap",
      "Weekly 60-minute private sessions",
      "Unlimited WhatsApp support between sessions",
      "Personalized resources, exercises & tools",
      "Real-time accountability and course correction",
      "Priority access to new programs and content",
      "Post-program integration session",
    ],
    cta: "Apply for 1:1 Coaching",
    ctaLink: "/booking",
    featured: true,
    color: "#0B0B0F",
    testimonial: {
      quote: "Working with Sarah 1:1 was the single greatest investment I've ever made in myself. Within 90 days my entire life had shifted.",
      name: "Denise W.",
      detail: "Purpose-activated entrepreneur",
    },
  },
  {
    id: "group",
    tag: "Best Value",
    title: "The Evolve 2 Purpose Group Program",
    subtitle: "8-Week Guided Transformation Journey",
    price: "Starting at $497",
    priceNote: "Payment plans available",
    description:
      "Walk the full 4-step framework in a powerful, supportive group environment led personally by Sarah. You'll experience deep healing, build real relationships, and grow alongside women who get it.",
    includes: [
      "8 weeks of live group sessions with Sarah",
      "Full 4-Step Framework curriculum",
      "Private community access (members portal)",
      "Weekly accountability partner matching",
      "Healing journal & workbook included",
      "Session recordings for lifetime replay",
      "Live Q&A sessions each week",
      "Graduation & next-steps planning session",
    ],
    cta: "Join the Waitlist",
    ctaLink: "/community",
    featured: false,
    learnMore: "/programs/group",
  },
  {
    id: "guidance",
    tag: "Quickest Entry Point",
    title: "Purpose Clarity Session",
    subtitle: "90-Minute Breakthrough Intensive",
    price: "Starting at $197",
    priceNote: "Book directly online",
    description:
      "If you're at a crossroads, feeling stuck, or need rapid clarity on your next move — this session delivers. In 90 minutes, Sarah helps you cut through the noise and identify exactly what's holding you back and what your next step is.",
    includes: [
      "90-minute private video session with Sarah",
      "Pre-session intake questionnaire",
      "Full session recording delivered within 24hrs",
      "Written summary & personalized action plan",
      "Targeted resource recommendations",
      "14-day follow-up support via email",
    ],
    cta: "Book a Session",
    ctaLink: "/booking",
    featured: false,
    learnMore: "/programs/purpose-clarity",
  },
  {
    id: "intensive",
    tag: "Accelerated Breakthrough",
    title: "Healing Intensive Weekend",
    subtitle: "2-Day Immersive Experience",
    price: "Starting at $997",
    priceNote: "Maximum 12 women per cohort",
    description:
      "For women who want to compress months of healing into a single transformative weekend. This is an intimate, high-touch experience that moves through all 4 steps of the framework in a sacred, focused environment.",
    includes: [
      "2 full days of immersive healing work",
      "Small group (max 12 women) for depth and safety",
      "Direct access to Sarah throughout the weekend",
      "All materials, resources & tools included",
      "Personalized breakthrough action plan",
      "60-day post-intensive group support",
      "Exclusive alumni community access",
    ],
    cta: "Reserve Your Spot",
    ctaLink: "/booking",
    featured: false,
    learnMore: "/programs/healing-intensive",
  },
];

const process = [
  {
    num: "01",
    title: "Submit Your Application",
    desc: "Fill out a short intake form so Sarah can understand where you are, what you're carrying, and what kind of support will serve you best.",
  },
  {
    num: "02",
    title: "Discovery Conversation",
    desc: "For 1:1 and Intensive programs, you'll have a brief call to ensure it's the right fit. This is a two-way conversation — no pressure, just clarity.",
  },
  {
    num: "03",
    title: "Custom Roadmap & Kickoff",
    desc: "Once accepted, you receive your personalized roadmap, welcome materials, and a confirmed start date. Your transformation begins here.",
  },
  {
    num: "04",
    title: "Do the Work. Transform.",
    desc: "Show up fully. Do the inner work. Trust the process. Sarah will be with you every step of the way — not just as a coach, but as a witness to your becoming.",
  },
];

const faqs = [
  {
    q: "How do I know which program is right for me?",
    a: "The best starting point depends on your goal and readiness. If you want the deepest, fastest transformation and can invest in yourself — 1:1 Coaching is unmatched. If you want community and structure at an accessible price point, the Group Program is perfect. If you need clarity quickly, start with a Purpose Clarity Session.",
  },
  {
    q: "Do I need to have experience with coaching or therapy?",
    a: "Not at all. Many of Sarah's clients have never worked with a coach before. The only requirement is a genuine desire to grow and a willingness to do honest inner work. Sarah meets you exactly where you are.",
  },
  {
    q: "Is there a payment plan option?",
    a: "Yes. Payment plans are available for the Group Program and Healing Intensive Weekend. Details are provided during the application process. Sarah's heart is for this work to be accessible to women who are truly called to it.",
  },
  {
    q: "What if I start and it doesn't feel like the right fit?",
    a: "Sarah's commitment to your transformation is non-negotiable. If at any point something isn't working, she adjusts. For the Purpose Clarity Session specifically, if you feel the session didn't deliver value, Sarah will personally offer a complimentary follow-up.",
  },
  {
    q: "How quickly will I see results?",
    a: "Many women report significant shifts after just the first session. Real, lasting transformation unfolds over weeks and months — but the clarity, hope, and momentum begin almost immediately when you commit to the process.",
  },
  {
    q: "Are these programs faith-based?",
    a: "Sarah's work is rooted in her personal faith, and spiritual principles are woven throughout her approach. However, her framework — Love, Accountability, Triggers, Teaching — is universal and has transformed women from all backgrounds and belief systems.",
  },
];

const Programs = () => {
  useSEO({
    title: "Coaching Programs — 1:1, Group, Clarity Sessions & Healing Intensives",
    description: "Transform your life through Sarah Adams' coaching programs: private 1:1 Deep-Dive Coaching, 8-Week Group Program from $497, 90-min Purpose Clarity Sessions from $197, and Healing Intensive Weekends.",
    keywords: "life coaching programs for women, 1 on 1 life coaching, group coaching program women, healing intensive weekend, purpose clarity coaching session, transformation coaching packages, Sarah Adams coaching programs, women empowerment programs, faith-based coaching, generational cycle coaching, online life coach women",
    breadcrumbs: [{ name: "Coaching Programs", url: "/programs" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Evolve 2 Purpose Coaching Programs",
        description: "Four transformational coaching programs by Sarah Adams to help women break generational cycles and step into purpose.",
        url: "https://evolve2purpose.com/programs",
        numberOfItems: 4,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Service",
              name: "1:1 Deep-Dive Coaching",
              description: "The most powerful and intimate pathway Sarah offers — private, personalized transformation with weekly sessions, unlimited support, and a fully custom roadmap.",
              url: "https://evolve2purpose.com/programs",
              provider: { "@id": "https://evolve2purpose.com/#organization" },
              serviceType: "1-on-1 Life Coaching",
              areaServed: "Worldwide",
              availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://evolve2purpose.com/booking", serviceType: "Online Video Call" },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Service",
              name: "Evolve 2 Purpose Group Program",
              description: "8-week guided transformation journey walking the full 4-Step Framework in a powerful, supportive group environment led personally by Sarah Adams.",
              url: "https://evolve2purpose.com/programs",
              provider: { "@id": "https://evolve2purpose.com/#organization" },
              serviceType: "Group Coaching",
              offers: { "@type": "Offer", price: "497", priceCurrency: "USD", availability: "https://schema.org/InStock", description: "Payment plans available" },
              areaServed: "Worldwide",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Service",
              name: "Purpose Clarity Session",
              description: "90-minute breakthrough intensive with Sarah Adams to cut through the noise, identify what's holding you back, and get your personalized next-step action plan.",
              url: "https://evolve2purpose.com/programs",
              provider: { "@id": "https://evolve2purpose.com/#organization" },
              serviceType: "Coaching Session",
              offers: { "@type": "Offer", price: "197", priceCurrency: "USD", availability: "https://schema.org/InStock" },
              areaServed: "Worldwide",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Service",
              name: "Healing Intensive Weekend",
              description: "A focused, deep-dive weekend healing experience for women who are ready for accelerated breakthrough and transformation.",
              url: "https://evolve2purpose.com/programs",
              provider: { "@id": "https://evolve2purpose.com/#organization" },
              serviceType: "Healing Retreat",
              areaServed: "Worldwide",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Sarah Adams coaching available online or in person?",
            acceptedAnswer: { "@type": "Answer", text: "All programs are available online via video call, making them fully accessible worldwide. Sarah works with clients across the US, UK, Canada, and internationally. In-person intensives and healing retreats may be available in select locations." },
          },
          {
            "@type": "Question",
            name: "How do I know which Evolve 2 Purpose program is right for me?",
            acceptedAnswer: { "@type": "Answer", text: "The best starting point is a Purpose Clarity Session — a 90-minute intensive that helps you identify exactly where you are and what kind of support will move the needle most for your specific situation. From there, Sarah can recommend the right next step." },
          },
          {
            "@type": "Question",
            name: "What results can I expect from Sarah Adams coaching?",
            acceptedAnswer: { "@type": "Answer", text: "98% of clients report lasting change. Common outcomes include breaking toxic behavioral patterns, healing from abandonment and betrayal, greater emotional regulation, improved relationships, clarity of purpose, and the confidence to step into your calling." },
          },
          {
            "@type": "Question",
            name: "How much does coaching with Sarah Adams cost?",
            acceptedAnswer: { "@type": "Answer", text: "The Purpose Clarity Session starts at $197. The 8-Week Group Program starts at $497 with payment plans available. 1:1 Deep-Dive Coaching is a custom investment based on your specific goals and program length — apply through the booking page for details." },
          },
          {
            "@type": "Question",
            name: "Are there payment plans available?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, payment plans are available for the Group Program. Payment plan options for other programs can be discussed during your Purpose Clarity Session or through the booking inquiry form." },
          },
        ],
      },
    ],
  });
  return (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] top-[-150px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] left-[-50px]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Work With Sarah</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight letter-tight">
          Choose Your Path to{" "}
          <span className="neon-text italic">Transformation</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Every woman's journey is different. Sarah offers four distinct pathways — each one designed to meet you exactly where you are and take you exactly where you're meant to go.
        </p>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
          {[
            { icon: Shield, label: "Results-Guaranteed Approach" },
            { icon: Star, label: "500+ Women Served" },
            { icon: Clock, label: "10+ Years Experience" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon size={14} style={{ color: "#FF2DAA" }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Quick path selector */}
    <section className="py-14 bg-[#F6F6F8] premium-border-top">
      <div className="container-wide px-6">
        <p className="text-center text-xs font-bold letter-luxury uppercase text-muted-foreground mb-8">Find your starting point</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { need: "I need deep, root-level healing", result: "1:1 Coaching", link: "#one-on-one" },
            { need: "I want community and structure", result: "Group Program", link: "#group" },
            { need: "I need clarity on my next step", result: "Clarity Session", link: "#guidance" },
          ].map((item) => (
            <a
              key={item.need}
              href={item.link}
              className="bg-white border border-border rounded-2xl p-6 text-center hover:border-primary transition-all duration-300 group"
            >
              <p className="text-muted-foreground text-sm mb-3 leading-snug">"{item.need}"</p>
              <p className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center justify-center gap-1">
                <ArrowRight size={12} /> {item.result}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="section-padding">
      <div className="container-wide space-y-8">

        {/* Featured 1:1 Program */}
        {programs.filter((p) => p.featured).map((p) => (
          <div
            key={p.id}
            id={p.id}
            className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left: dark */}
            <div
              className="p-10 md:p-14 text-white relative overflow-hidden"
              style={{ backgroundColor: "#0B0B0F" }}
            >
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,45,170,0.18), transparent 70%)" }}
              />
              <span
                className="inline-block text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-6 relative z-10"
                style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}
              >
                {p.tag}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 relative z-10 letter-tight">{p.title}</h2>
              <p className="text-white/50 text-sm mb-6 relative z-10">{p.subtitle}</p>
              <p className="text-white/70 text-base leading-relaxed mb-8 relative z-10">{p.description}</p>
              <div className="w-10 h-px mb-6 relative z-10" style={{ background: "#FF2DAA" }} />
              {p.testimonial && (
                <div className="relative z-10">
                  <p className="text-white/60 italic text-sm leading-relaxed mb-4">"{p.testimonial.quote}"</p>
                  <p className="font-heading font-bold text-sm text-white">{p.testimonial.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{p.testimonial.detail}</p>
                </div>
              )}
            </div>
            {/* Right: white */}
            <div className="bg-white border-y border-r border-border p-10 md:p-14 flex flex-col">
              <div className="mb-6">
                <p
                  className="font-heading text-3xl font-bold mb-1"
                  style={{ color: "#FF2DAA" }}
                >
                  {p.price}
                </p>
                <p className="text-muted-foreground text-xs">{p.priceNote}</p>
              </div>
              <h4 className="font-heading text-xs font-bold letter-luxury uppercase text-foreground mb-5">Everything Included</h4>
              <ul className="space-y-3.5 flex-1 mb-10">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={p.ctaLink}
                  className="btn-neon-solid !py-4 text-center shadow-lg flex-1"
                >
                  {p.cta} <ArrowRight size={16} />
                </Link>
                {p.learnMore && (
                  <Link
                    to={p.learnMore}
                    className="btn-neon-outline !py-4 text-center"
                  >
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Other programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.filter((p) => !p.featured).map((p) => (
            <div key={p.id} id={p.id} className="luxury-card flex flex-col">
              <div className="luxury-card-inner flex flex-col flex-1">
                <span
                  className="inline-block text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-4 self-start"
                  style={{ background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }}
                >
                  {p.tag}
                </span>
                <h3 className="font-heading text-xl font-bold mb-1 letter-tight">{p.title}</h3>
                <p className="text-muted-foreground text-xs mb-4">{p.subtitle}</p>
                <p className="font-heading text-xl font-bold mb-1" style={{ color: "#FF2DAA" }}>{p.price}</p>
                <p className="text-muted-foreground text-xs mb-5">{p.priceNote}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.description}</p>
                <div className="ornament-line !w-8 !mx-0 mb-5" />
                <h4 className="font-heading text-xs font-bold letter-luxury uppercase text-foreground mb-4">What's Included</h4>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <Link
                    to={p.ctaLink}
                    className="btn-neon-outline !py-3.5 !text-xs text-center"
                  >
                    {p.cta} <ArrowRight size={13} />
                  </Link>
                  {p.learnMore && (
                    <Link
                      to={p.learnMore}
                      className="text-center text-[10px] font-bold letter-luxury uppercase transition-colors py-2"
                      style={{ color: "#FF2DAA" }}
                    >
                      Learn More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What Happens Next — process */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Process</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">What Happens After You Apply</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            No guessing. No waiting in the dark. Here's exactly what the process looks like from inquiry to transformation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, i) => (
            <div key={step.num} className="relative">
              {i < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                  style={{ background: "linear-gradient(90deg, rgba(255,45,170,0.3), transparent)" }}
                />
              )}
              <div className="bg-white rounded-2xl border border-border p-7 relative z-10 h-full">
                <span
                  className="font-heading text-5xl font-bold block mb-4 leading-none"
                  style={{ color: "#FF2DAA" }}
                >
                  {step.num}
                </span>
                <h3 className="font-heading text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Social proof strip */}
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,170,0.1), transparent 70%)" }}
      />
      <div className="container-wide px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        {[
          { stat: "500+", label: "Women Transformed" },
          { stat: "98%", label: "Report Life-Changing Results" },
          { stat: "10+", label: "Years of Experience" },
          { stat: "4-Step", label: "Proven Framework" },
        ].map((item) => (
          <div key={item.label}>
            <p className="neon-text font-heading text-4xl md:text-5xl font-bold mb-2">{item.stat}</p>
            <p className="text-white/50 text-xs letter-luxury uppercase font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[-100px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Questions & Answers</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">Everything You're Wondering</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-[#F6F6F8] rounded-2xl border border-border p-7 md:p-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-6">Still have questions? Sarah's team is here to help.</p>
          <Link to="/booking" className="btn-neon-solid shadow-lg">
            Talk to Someone <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);
};

export default Programs;
