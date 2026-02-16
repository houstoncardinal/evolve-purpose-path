import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import sarahPortrait from "@/assets/sarah-portrait.jpg";

const testimonials = [
  {
    quote: "Sarah's prophetic guidance helped me see what I'd been carrying for years. For the first time, I feel free to walk in my purpose.",
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
  { num: "01", title: "Awareness", desc: "Identify the root wounds, patterns, and generational ties holding you captive." },
  { num: "02", title: "Healing", desc: "Experience deep inner restoration through prophetic prayer and guided healing." },
  { num: "03", title: "Alignment", desc: "Realign your identity, beliefs, and spiritual posture with God's original design." },
  { num: "04", title: "Purpose Activation", desc: "Step boldly into the calling and destiny you were always created for." },
];

const Index = () => {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Woman standing in golden divine light with arms open" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative z-10 container-wide px-6 lg:px-12 py-24">
          <div className="max-w-2xl">
            <p className="text-gold font-semibold tracking-[0.25em] text-xs uppercase mb-6 animate-fade-up">
              Prophetic Healing & Inner Restoration
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6 animate-fade-up-delay-1">
              Break the Cycles.<br />
              <span className="italic font-display">Heal Deeply.</span><br />
              Walk Fully in Your <span className="text-gold">Purpose.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg animate-fade-up-delay-2">
              You were never meant to carry that weight forever. Through a proven 4-Step Healing Framework, discover the freedom, wholeness, and purpose God has already prepared for you.
            </p>
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
              <Link to="/programs" className="gold-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold text-center hover-scale">
                Begin Your Healing Journey
              </Link>
              <Link to="/framework" className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full font-semibold text-center hover:bg-primary-foreground/10 transition-colors">
                Explore the Framework
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-card py-6 border-b border-border">
        <div className="container-wide px-6 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-xs tracking-widest uppercase font-semibold">
          <span>✦ Prophetic Healing</span>
          <span>✦ Trauma Recovery</span>
          <span>✦ Inner Restoration</span>
          <span>✦ Purpose Activation</span>
          <span>✦ Generational Freedom</span>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img src={sarahPortrait} alt="Sarah Adams, prophetic healer and founder" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full gold-gradient opacity-20 blur-2xl" />
          </div>
          <div>
            <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Meet Your Guide</p>
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Hi, I'm <span className="italic font-display">Sarah Adams</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I know what it feels like to carry wounds you didn't ask for — the kind that echo through generations and whisper that you'll never be free. But I also know the power of God's healing hand, because He reached into my deepest pain and made me whole.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Now, through prophetic guidance and a proven inner restoration process, I help women just like you break free from trauma, silence the lies, and step into the extraordinary purpose you were created for.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              Read My Full Story <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-STEP FRAMEWORK PREVIEW */}
      <section className="section-padding bg-card">
        <div className="container-wide text-center mb-16">
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">The Signature Process</p>
          <h2 className="font-heading text-3xl md:text-4xl mb-4">The 4-Step Healing & Inner Restoration Framework</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Spirit-led pathway from pain to purpose — designed to bring deep, lasting transformation to every area of your life.
          </p>
        </div>
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <span className="gold-text font-display text-5xl font-bold">{step.num}</span>
              <h3 className="font-heading text-xl mt-4 mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/framework" className="gold-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold hover-scale inline-block">
            Discover the Full Framework
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container-wide text-center mb-16">
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Transformations</p>
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Lives Changed Through Healing</h2>
        </div>
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-2xl p-8 border border-border relative">
              <div className="gold-text font-display text-6xl absolute -top-4 left-6 opacity-30">"</div>
              <p className="text-foreground leading-relaxed mb-6 relative z-10 italic">{t.quote}</p>
              <div>
                <p className="font-heading font-semibold">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="section-padding bg-card">
        <div className="container-wide text-center mb-16">
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Work With Sarah</p>
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Find Your Path to Healing</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every journey is unique. Choose the pathway that meets you exactly where you are.</p>
        </div>
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "1:1 Healing Sessions", desc: "Deep, personalized prophetic healing work tailored to your specific wounds and breakthrough needs.", cta: "Apply Now" },
            { title: "Group Restoration Program", desc: "Heal alongside a sisterhood of women walking the same journey — guided, supported, transformed.", cta: "Join the Waitlist" },
            { title: "Prophetic Guidance Session", desc: "Receive Spirit-led insight and prophetic clarity for your next season of life and purpose.", cta: "Book a Session" },
          ].map((p) => (
            <div key={p.title} className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-border flex flex-col">
              <h3 className="font-heading text-xl mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{p.desc}</p>
              <Link to="/programs" className="gold-gradient text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm text-center hover-scale">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <EmailCapture variant="fullwidth" />

      {/* TRANSFORMATION PROMISE */}
      <section className="section-padding text-center">
        <div className="container-narrow">
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">The Promise</p>
          <h2 className="font-heading text-3xl md:text-5xl mb-6 leading-tight">
            You are not <span className="italic font-display">broken.</span><br />
            You are being <span className="text-primary italic font-display">restored.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-8">
            God didn't bring you this far to leave you. The pain you've carried has a purpose — and your healing is the doorway to everything He has for you.
          </p>
          <Link to="/programs" className="gold-gradient text-primary-foreground px-10 py-4 rounded-full font-semibold text-lg hover-scale inline-block">
            Start Your Journey Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
