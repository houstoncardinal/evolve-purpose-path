import { useState } from "react";
import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import { BookOpen, Heart, Sparkles, Shield, ArrowRight, Check, Download, Star } from "lucide-react";
import { store } from "@/lib/adminStore";

const guideContents = [
  {
    icon: BookOpen,
    title: "Your Self-Assessment",
    desc: "A clear diagnostic to identify exactly where you are in the 4-step journey and what type of work will move the needle most for you right now.",
  },
  {
    icon: Heart,
    title: "The Love Test",
    desc: "A powerful exercise that reveals where you are leading with love — and where you're still leading with fear, pride, or reaction.",
  },
  {
    icon: Shield,
    title: "Accountability Audit",
    desc: "A structured reflection to help you honestly identify the areas of your life where ownership has been missing — and what reclaiming it could unlock.",
  },
  {
    icon: Sparkles,
    title: "Your Trigger Map",
    desc: "Guided questions to help you trace your emotional reactions back to their roots and begin building the self-awareness to respond rather than react.",
  },
  {
    icon: Download,
    title: "Your Next-Step Roadmap",
    desc: "Personalized guidance on what your most powerful next move is — whether that's a program, a practice, or a single courageous decision.",
  },
];

const miniTestimonials = [
  {
    quote: "I downloaded this free guide skeptically and ended up crying through the self-assessment. It named something I had been carrying for years that I didn't have words for.",
    name: "Tamara J.",
    detail: "Group Program Graduate",
  },
  {
    quote: "The trigger map section alone was worth the price of a full coaching session. I printed it out and did it three times. It keeps revealing new things.",
    name: "Angela M.",
    detail: "Purpose Clarity Session Client",
  },
  {
    quote: "I sent this guide to my sister, my mother, and two of my closest friends. It starts the conversation that so many of us need to have but don't know how.",
    name: "LaShonda K.",
    detail: "Community Member",
  },
];

const FreeGuide = () => {
  useSEO({
    title: "Free Guide — 4-Step System to Transform Your Life (Download Now)",
    description: "Get Sarah Adams' free 4-Step Transformation Guide: includes a self-assessment, the love test, accountability audit, trigger map, and your personalized next-step roadmap. No credit card required.",
    keywords: "free life transformation guide download, free coaching guide women, 4 step system free PDF, Sarah Adams free guide, purpose coaching free resource, healing guide download women, free self assessment transformation, free guide break generational cycles",
    breadcrumbs: [{ name: "Free Guide", url: "/free-guide" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "DigitalDocument",
        name: "4-Step System to Transform Your Life — Free Guide by Sarah Adams",
        description: "A free working guide filled with self-assessments, reflection exercises, and a personalized roadmap to help you understand exactly where you are in the transformation journey and what to do next.",
        url: "https://evolve2purpose.com/free-guide",
        author: { "@id": "https://evolve2purpose.com/#sarah-adams" },
        publisher: { "@id": "https://evolve2purpose.com/#organization" },
        isAccessibleForFree: true,
        fileFormat: "application/pdf",
        inLanguage: "en-US",
        about: [
          "Life Transformation",
          "Generational Cycle Breaking",
          "Accountability",
          "Emotional Trigger Management",
          "Purpose Activation",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Free download — no credit card required",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the 4-Step Guide really free?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No credit card, no hidden trial, no bait-and-switch. The guide is Sarah's gift to anyone ready to start their transformation journey — just enter your email and it will be delivered to your inbox." },
          },
          {
            "@type": "Question",
            name: "What is included in the free 4-Step Transformation Guide?",
            acceptedAnswer: { "@type": "Answer", text: "The guide includes: (1) A self-assessment to identify where you are in your transformation journey, (2) The Love Test — revealing where you're leading with fear vs. love, (3) An Accountability Audit to identify areas of missing ownership, (4) A Trigger Map to trace emotional reactions to their roots, and (5) A personalized Next-Step Roadmap for your specific situation." },
          },
          {
            "@type": "Question",
            name: "How long does it take to complete the free guide?",
            acceptedAnswer: { "@type": "Answer", text: "You can read through it in about 20 minutes. To genuinely work through all the self-assessments and exercises, plan for 1–2 hours. Many people revisit the guide multiple times as they grow through each step of the framework." },
          },
          {
            "@type": "Question",
            name: "What happens after I download the free guide?",
            acceptedAnswer: { "@type": "Answer", text: "You'll receive the guide in your inbox. Sarah also shares occasional updates, encouragement, and early access to programs. You can unsubscribe at any time. If you want to go deeper after the guide, the Purpose Clarity Session ($197) is the natural next step." },
          },
        ],
      },
    ],
  });
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await store.addSubscriber({ email: email.trim(), source: "free-guide" });
    setDone(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding hero-gradient-bg relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-[-150px] right-[-100px]" />
        <div className="glow-orb w-[300px] h-[300px] bottom-[-50px] left-[-50px]" />
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left: copy + form */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold letter-luxury uppercase" style={{ borderColor: "rgba(255,45,170,0.3)", color: "#FF2DAA", background: "rgba(255,45,170,0.05)" }}>
              <Download size={11} />
              Free Download — No Credit Card
            </div>
            <h1 className="font-heading text-5xl md:text-6xl mb-6 leading-[1.1] letter-tight">
              The 4-Step System to{" "}
              <span className="italic neon-text">Transform Your Life</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              This isn't a motivational flyer. It's a working guide — filled with self-assessments, reflection exercises, and a personalized roadmap to help you understand exactly where you are and what to do next.
            </p>

            {done ? (
              <div className="bg-[#F6F6F8] rounded-2xl border border-border p-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,45,170,0.1)" }}
                >
                  <Check size={24} style={{ color: "#FF2DAA" }} />
                </div>
                <h3 className="font-heading text-2xl mb-3">Check Your Inbox!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Your free guide is on its way. While you wait, you can also download it directly below.
                </p>
                <a
                  href="/4step.pdf"
                  download="4-Step-System-Transform-Your-Life.pdf"
                  className="btn-neon-solid !text-sm shadow-md"
                >
                  <Download size={14} /> Download Now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-border rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ "--tw-ring-color": "#FF2DAA" } as React.CSSProperties}
                  />
                </div>
                <button type="submit" className="w-full btn-neon-solid !py-5 shadow-lg">
                  <Download size={16} /> Send Me the Free Guide
                </button>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-xs letter-luxury uppercase">
                  <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> Instant delivery</span>
                  <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> No spam, ever</span>
                  <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> Unsubscribe anytime</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: guide preview card */}
          <div className="relative">
            <div
              className="rounded-3xl p-10 md:p-12 text-white relative overflow-hidden"
              style={{ backgroundColor: "#0B0B0F" }}
            >
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,45,170,0.2), transparent 70%)" }}
              />
              <p
                className="font-heading text-[10px] font-bold letter-luxury uppercase mb-5 relative z-10"
                style={{ color: "#FF2DAA" }}
              >
                What's Inside the Guide
              </p>
              <div className="space-y-5 relative z-10">
                {guideContents.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,45,170,0.15)" }}
                      >
                        <Icon size={14} style={{ color: "#FF2DAA" }} />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-sm mb-1">{item.title}</p>
                        <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-8 h-px mt-8 relative z-10" style={{ background: "#FF2DAA" }} />
              <p className="text-white/30 text-xs mt-4 relative z-10">Free — no purchase required</p>
            </div>
            {/* Floating stats chip */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-white rounded-2xl border border-border shadow-lg px-5 py-4">
              <p className="neon-text font-heading text-2xl font-bold">2,500+</p>
              <p className="text-muted-foreground text-xs font-semibold letter-luxury uppercase">Guides Downloaded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-padding bg-[#F6F6F8] premium-border-top">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">What Readers Are Saying</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight">It's Free — But It's Not Light</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {miniTestimonials.map((t, i) => (
              <div key={i} className="luxury-card">
                <div className="luxury-card-inner relative">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} fill="#FF2DAA" style={{ color: "#FF2DAA" }} />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 italic text-sm relative z-10">{t.quote}</p>
                  <div className="ornament-line !w-6 !mx-0 mb-3" />
                  <p className="font-heading font-bold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.1), transparent 70%)" }}
        />
        <div className="container-wide px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
          {[
            { stat: "2,500+", label: "Guides Downloaded" },
            { stat: "500+", label: "Women Served" },
            { stat: "98%", label: "Found It Valuable" },
          ].map((s) => (
            <div key={s.label}>
              <p className="neon-text font-heading text-4xl md:text-5xl font-bold mb-2">{s.stat}</p>
              <p className="text-white/50 text-xs letter-luxury uppercase font-semibold">{s.label}</p>
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
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Questions</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl letter-tight">About the Free Guide</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is this really free?",
                a: "Yes, completely. No credit card, no hidden trial, no bait-and-switch. The guide is Sarah's gift to anyone who's curious about the framework.",
              },
              {
                q: "How is this different from a typical motivational download?",
                a: "It's built around working exercises, not passive reading. You'll be writing, reflecting, and producing actual insight about yourself — not just consuming inspiration.",
              },
              {
                q: "How long does it take to complete?",
                a: "You can read through it in 20 minutes. But to genuinely work through the self-assessment and exercises, plan for 1–2 hours. Many people revisit it multiple times as they grow.",
              },
              {
                q: "Is this a sample of a paid program?",
                a: "Not in a manipulative way. It stands alone as a complete, valuable resource. If it resonates and you want to go deeper, Sarah's programs are the natural next step — but there's no pressure.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#F6F6F8] rounded-2xl border border-border p-7">
                <h3 className="font-heading text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding text-center relative overflow-hidden bg-[#F6F6F8]">
        <div className="container-narrow relative z-10">
          <div className="ornament-line-wide mb-8" />
          <h2 className="font-heading text-3xl md:text-4xl mb-5 letter-tight">
            Ready to Go Deeper Than a Guide?
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
            The guide is the beginning. When you're ready for real, supported, lasting transformation — Sarah's programs are here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs" className="btn-neon-solid shadow-lg">
              Explore Programs <ArrowRight size={16} />
            </Link>
            <Link to="/community" className="btn-neon-outline">
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeGuide;
