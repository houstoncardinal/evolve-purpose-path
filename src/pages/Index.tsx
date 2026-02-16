import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight, Sparkles, Star } from "lucide-react";

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
  { num: "01", title: "Awareness", desc: "Identify the root wounds, patterns, and generational ties holding you captive.", icon: "◈" },
  { num: "02", title: "Healing", desc: "Experience deep inner restoration through prophetic prayer and guided healing.", icon: "◇" },
  { num: "03", title: "Alignment", desc: "Realign your identity, beliefs, and spiritual posture with God's original design.", icon: "○" },
  { num: "04", title: "Purpose Activation", desc: "Step boldly into the calling and destiny you were always created for.", icon: "✦" },
];

const Index = () => {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center hero-gradient-bg overflow-hidden">
        {/* Decorative orbs */}
        <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px] animate-float" />
        <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] left-[-50px] animate-float-delayed" />
        <div className="glow-orb w-[300px] h-[300px] top-[30%] right-[20%] animate-pulse-slow" />
        
        {/* Subtle geometric lines */}
        <div className="absolute top-1/4 right-12 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
        <div className="absolute bottom-1/4 right-24 w-px h-48 bg-gradient-to-b from-transparent via-primary/10 to-transparent hidden lg:block" />
        <div className="absolute top-1/3 left-[60%] w-24 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent hidden lg:block" />

        <div className="relative z-10 container-wide px-6 lg:px-12 py-32">
          <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-8 animate-fade-up">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">
                Prophetic Healing & Inner Restoration
              </p>
              <div className="ornament-line !w-8 !mx-0" />
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1.05] mb-8 animate-fade-up-delay-1 letter-tight text-balance">
              Break the Cycles.{" "}
              <span className="italic font-display">Heal Deeply.</span>{" "}
              Walk Fully in Your{" "}
              <span className="gold-text">Purpose.</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up-delay-2">
              You were never meant to carry that weight forever. Through a proven 4-Step Healing Framework, discover the freedom, wholeness, and purpose God has already prepared for you.
            </p>
            
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/programs" className="gold-gradient text-primary-foreground px-10 py-4 rounded-full font-semibold text-center hover-scale inline-flex items-center justify-center gap-2 text-base shadow-lg">
                Begin Your Healing Journey <ArrowRight size={16} />
              </Link>
              <Link to="/framework" className="border border-border text-foreground px-10 py-4 rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all duration-300">
                Explore the Framework
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* TRUST BAR */}
      <section className="py-8 premium-border-top">
        <div className="container-wide px-6 flex flex-wrap items-center justify-center gap-10 text-muted-foreground text-[10px] letter-luxury uppercase font-semibold">
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Prophetic Healing</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Trauma Recovery</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Inner Restoration</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Purpose Activation</span>
          <span className="flex items-center gap-2"><span className="ornament-diamond" /> Generational Freedom</span>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative flex items-center justify-center">
            {/* Abstract decorative element instead of photo */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-6 rounded-full border border-primary/15" />
              <div className="absolute inset-12 rounded-full border border-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="text-primary mx-auto mb-4" size={32} />
                  <p className="font-display text-3xl italic text-primary/80">Sarah</p>
                  <p className="font-display text-xl italic text-primary/60">Adams</p>
                  <div className="ornament-line mt-4 !w-12" />
                  <p className="text-muted-foreground text-xs letter-luxury uppercase mt-4">Prophetic Healer</p>
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
              Hi, I'm <span className="italic font-display">Sarah Adams</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
              I know what it feels like to carry wounds you didn't ask for — the kind that echo through generations and whisper that you'll never be free. But I also know the power of God's healing hand, because He reached into my deepest pain and made me whole.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Now, through prophetic guidance and a proven inner restoration process, I help women just like you break free from trauma, silence the lies, and step into the extraordinary purpose you were created for.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 text-primary font-semibold text-sm group">
              <span>Read My Full Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4-STEP FRAMEWORK PREVIEW */}
      <section className="section-padding bg-card relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] -top-[200px] left-[30%]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Signature Process</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">The 4-Step Healing &<br className="hidden md:block" /> Inner Restoration Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A Spirit-led pathway from pain to purpose — designed to bring deep, lasting transformation to every area of your life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="luxury-card group">
                <div className="luxury-card-inner text-center">
                  <span className="gold-text font-display text-6xl font-bold block mb-2">{step.num}</span>
                  <div className="ornament-line !w-8 mb-4" />
                  <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/framework" className="gold-gradient text-primary-foreground px-10 py-4 rounded-full font-semibold hover-scale inline-flex items-center gap-2 shadow-lg">
              Discover the Full Framework <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding relative">
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
              <div key={i} className="luxury-card">
                <div className="luxury-card-inner relative">
                  <div className="gold-text font-display text-8xl absolute -top-2 left-0 opacity-15 leading-none">"</div>
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
      <section className="section-padding bg-card relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] right-[-50px]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Work With Sarah</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Find Your Path to Healing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Every journey is unique. Choose the pathway that meets you exactly where you are.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "1:1 Healing Sessions", desc: "Deep, personalized prophetic healing work tailored to your specific wounds and breakthrough needs.", cta: "Apply Now", icon: "✦" },
              { title: "Group Restoration Program", desc: "Heal alongside a sisterhood of women walking the same journey — guided, supported, transformed.", cta: "Join the Waitlist", icon: "◇" },
              { title: "Prophetic Guidance Session", desc: "Receive Spirit-led insight and prophetic clarity for your next season of life and purpose.", cta: "Book a Session", icon: "○" },
            ].map((p) => (
              <div key={p.title} className="luxury-card flex flex-col">
                <div className="luxury-card-inner flex flex-col flex-1">
                  <span className="gold-text font-display text-3xl mb-4">{p.icon}</span>
                  <h3 className="font-heading text-xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-8">{p.desc}</p>
                  <Link to="/programs" className="gold-gradient text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm text-center hover-scale shadow-md">
                    {p.cta}
                  </Link>
                </div>
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
            You are not <span className="italic font-display">broken.</span><br />
            You are being <span className="gold-text italic font-display">restored.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10">
            God didn't bring you this far to leave you. The pain you've carried has a purpose — and your healing is the doorway to everything He has for you.
          </p>
          <Link to="/programs" className="gold-gradient text-primary-foreground px-12 py-5 rounded-full font-semibold text-lg hover-scale inline-flex items-center gap-3 shadow-lg">
            Start Your Journey Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
