import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "Lead in Love",
    desc: "Choose alignment over reaction. Peace is not passive — it's the most powerful stance you can take.",
  },
  {
    num: "02",
    title: "Take Accountability",
    desc: "Own your growth. Accountability is the bridge between where you are and who you're becoming.",
  },
  {
    num: "03",
    title: "Manage Your Triggers",
    desc: "Every trigger is a teacher. Learn the language of your wounds so they no longer run your life.",
  },
  {
    num: "04",
    title: "Teach What You Know",
    desc: "Your healing has a ripple effect. When you share your lessons, purpose comes alive.",
  },
];

const EvolePurpose = () => {
  useSEO({
    title: "The Evole 2 Purpose Movement",
    description: "Evole 2 Purpose is a personal development movement rooted in four powerful pillars: Lead in Love, Take Accountability, Manage Your Triggers, and Teach Others.",
    keywords: "evole 2 purpose movement, personal development framework, women transformation movement, purpose activation",
  });
  return (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg relative overflow-hidden text-center">
      <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">By Sarah Adams</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight letter-tight">
          <span className="neon-text">Evole 2 Purpose</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          A movement built on love, accountability, self-mastery, and service. Evole 2 Purpose is not just a framework — it's a commitment to becoming the fullest version of yourself so you can lift others along the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/framework" className="btn-neon-solid shadow-lg">
            Explore the 4 Steps <ArrowRight size={16} />
          </Link>
          <Link to="/programs" className="btn-neon-outline">
            Work With Sarah Adams
          </Link>
        </div>
      </div>
    </section>

    {/* What Is Evole 2 Purpose */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="ornament-line !w-8 !mx-0" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Mission</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl mb-8 letter-tight">
            What Is <span className="italic neon-text">Evole 2 Purpose?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            Evole 2 Purpose is a personal development brand and movement founded by Sarah Adams. It exists to help people break free from emotional cycles, heal at their roots, and step boldly into a life of meaning and service.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            The name is intentional: to "evole" is to evolve — to grow, to shed what no longer serves you, and to rise into the person you were always designed to be. And that evolution has a destination: purpose.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Through the 4-step framework, coaching programs, and community, Evole 2 Purpose equips individuals with the tools, language, and support to do the real work — and to share it with the world.
          </p>
        </div>

        {/* Quote block */}
        <div
          className="rounded-3xl p-10 text-white relative overflow-hidden"
          style={{ backgroundColor: "#0B0B0F" }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,170,0.2), transparent 70%)" }}
          />
          <p
            className="font-heading text-xs font-bold letter-luxury uppercase mb-6 relative z-10"
            style={{ color: "#FF2DAA" }}
          >
            Evole 2 Purpose
          </p>
          <blockquote className="font-heading text-2xl leading-snug text-white mb-8 relative z-10 font-semibold">
            "You were not designed to stay where pain placed you. You were designed to rise — and to reach back for someone else."
          </blockquote>
          <div className="w-10 h-px mb-4 relative z-10" style={{ background: "#FF2DAA" }} />
          <p className="text-white/60 text-sm font-semibold relative z-10">Sarah Adams</p>
          <p
            className="text-xs letter-luxury uppercase relative z-10 mt-1"
            style={{ color: "#FF2DAA" }}
          >
            Founder, Evole 2 Purpose
          </p>
        </div>
      </div>
    </section>

    {/* The 4 Pillars */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[-100px] left-[40%]" />
      <div className="container-wide relative z-10">
        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Foundation</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">The 4 Pillars</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Every transformation in the Evole 2 Purpose community is built on these four principles.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.num}
              className="step-card flex items-start gap-6 p-8"
            >
              <span
                className="font-heading text-4xl font-bold leading-none flex-shrink-0"
                style={{ color: "#FF2DAA" }}
              >
                {pillar.num}
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/framework" className="inline-flex items-center gap-2 text-primary font-semibold text-sm group">
            See the Full 4-Step Framework <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section
      className="section-padding text-center relative overflow-hidden"
      style={{ backgroundColor: "#0B0B0F" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
      />
      <div className="container-narrow relative z-10">
        <p
          className="font-heading text-xs font-bold letter-luxury uppercase mb-6"
          style={{ color: "#FF2DAA" }}
        >
          Evole 2 Purpose
        </p>
        <h2 className="font-heading text-4xl md:text-5xl mb-6 letter-tight text-white">
          Ready to Begin Your Evolution?
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Your next chapter starts with a single decision — to choose growth over comfort, love over reaction, and purpose over pain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Work With Sarah Adams <ArrowRight size={16} />
          </Link>
          <Link to="/framework" className="btn-neon-outline">
            Explore the Framework
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);
};

export default EvolePurpose;
