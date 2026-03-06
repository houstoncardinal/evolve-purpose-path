import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Sparkles, Heart, Target, Users, Mic } from "lucide-react";

const timeline = [
  {
    year: "The Beginning",
    title: "Raised in the Weight of Silence",
    desc: "Sarah grew up in a household where pain was inherited, not spoken. The cycles of hurt, silence, and suppressed emotion that surrounded her became the first wounds she would one day learn to heal.",
  },
  {
    year: "The Breaking Point",
    title: "When Everything Fell Apart",
    desc: "In her mid-twenties, everything Sarah had built — relationships, identity, a sense of safety — collapsed. She found herself in the darkest season of her life, without a roadmap or a voice that could reach her.",
  },
  {
    year: "The Turning",
    title: "A Decision That Changed Everything",
    desc: "It was in that darkness that something shifted. Not in a single dramatic moment, but in the quiet — she began to understand that her wounds were not sentences. They were invitations. She chose to answer.",
  },
  {
    year: "The Work",
    title: "Building the Framework",
    desc: "Through years of deep personal work, mentorship, and pouring into others, the 4-step Evole 2 Purpose framework began to take shape — not from a textbook, but from Sarah's own scars and victories.",
  },
  {
    year: "The Mission",
    title: "Reaching Back for Others",
    desc: "Having walked through the fire, Sarah knew she couldn't keep the map to herself. She began coaching women formally, and over 10 years has walked alongside 500+ clients from wounding into wholeness.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Love First, Always",
    desc: "Every strategy, session, and piece of advice Sarah gives is filtered through one lens: does this lead with love? Not tolerance. Not passivity. Radical, intentional, transformative love.",
  },
  {
    icon: Target,
    title: "Truth Over Comfort",
    desc: "Real transformation requires honest conversations. Sarah will always choose your long-term freedom over your short-term comfort — with deep compassion, never harshness.",
  },
  {
    icon: Users,
    title: "Nobody Heals Alone",
    desc: "Community and accountability are not optional extras. They are essential ingredients. Sarah builds spaces where people can be fully seen and fully supported.",
  },
  {
    icon: Mic,
    title: "Share What You Know",
    desc: "Every person Sarah works with is encouraged to become a teacher. Your healing was never just for you — it was always meant to become someone else's breakthrough.",
  },
];

const credentials = [
  "Certified Life & Transformation Coach",
  "10+ years in personal development and purpose coaching",
  "Founder of the Evole 2 Purpose movement and community",
  "Creator of the 4-Step Transform Your Life Framework",
  "500+ individual clients served across the globe",
  "Speaker at women's conferences, churches, and corporate events",
  "Author of the '4 Step System to Transform Your Life' guide",
  "Host of the Evole 2 Purpose community (1,200+ active members)",
];

const About = () => {
  useSEO({
    title: "About Sarah Adams",
    description: "Meet Sarah Adams — certified life coach, speaker, and founder of Evole 2 Purpose. Discover the story, framework, and mission behind 500+ transformed lives.",
    keywords: "Sarah Adams life coach, about evole 2 purpose, purpose coach biography, transformation coach founder",
  });
  return (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-100px] right-[-100px]" />
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="ornament-line !w-8 !mx-0" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">About Sarah Adams</p>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl mb-8 leading-[1.1] letter-tight">
            She Didn't Find Her Purpose.{" "}
            <span className="neon-text italic">She Fought for It.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            Sarah Adams is a purpose coach, speaker, and the founder of the Evole 2 Purpose movement — a framework built not in a classroom, but in the crucible of her own healing journey.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            Her work is rooted in a simple but radical conviction: that every person carries wounds that, when properly healed, become the very tools they need to transform their life and serve the world.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
            Over 10 years and 500+ clients later, Sarah has refined a 4-step approach — Lead in Love, Take Accountability, Manage Your Triggers, Teach Others — that has unlocked new seasons of life for people across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/programs" className="btn-neon-solid shadow-lg">
              Work With Sarah <ArrowRight size={16} />
            </Link>
            <Link to="/booking" className="btn-neon-outline">
              Book Her to Speak
            </Link>
          </div>
        </div>

        {/* Portrait placeholder */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4]">
            <div className="absolute inset-0 rounded-3xl border border-primary/10" />
            <div className="absolute inset-4 rounded-3xl border border-primary/15" />
            <div className="absolute inset-8 rounded-3xl bg-[#F6F6F8] flex items-center justify-center">
              <div className="text-center px-6">
                <Sparkles className="text-primary mx-auto mb-6" size={36} />
                <p className="font-heading text-4xl italic neon-text mb-2">Sarah Adams</p>
                <div className="ornament-line my-4" />
                <p className="text-muted-foreground text-xs letter-luxury uppercase">Purpose Coach</p>
                <p className="text-muted-foreground text-xs letter-luxury uppercase">Speaker & Author</p>
                <p className="text-muted-foreground text-xs letter-luxury uppercase mt-1">Founder, Evole 2 Purpose</p>
              </div>
            </div>
            <div className="glow-orb w-[200px] h-[200px] bottom-[-50px] left-[-30px]" />
          </div>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding relative bg-[#F6F6F8]">
      <div className="container-narrow text-center">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-3xl md:text-5xl mb-8 letter-tight leading-tight">
          "I believe every person deserves to know the truth of who they are —{" "}
          <span className="italic neon-text">healed, whole, and walking in purpose.</span>"
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-5 text-lg">
          Sarah's mission is rooted in the conviction that healing is not a luxury — it is a birthright. Every person who works with her is met with radical honesty, deep compassion, and a safe space to face what has been holding them back.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-5 text-lg">
          Through evidence-informed practices and deep inner work, Sarah guides her clients from survival mode into a life of alignment, clarity, and activated purpose.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
          At the heart of Evole 2 Purpose is a simple but powerful belief: when you choose love over reaction, take ownership of your growth, understand your triggers, and share what you've learned — you unlock a life of genuine alignment and lasting purpose. This is not a program. It's a way of being.
        </p>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[20%] right-[-100px]" />
      <div className="container-wide max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Her Story</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">The Road That Built Her</h2>
        </div>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start`}
            >
              {i % 2 === 0 ? (
                <>
                  <div className="bg-[#F6F6F8] rounded-2xl border border-border p-8">
                    <p className="font-heading text-[10px] font-bold letter-luxury uppercase mb-4" style={{ color: "#FF2DAA" }}>
                      {item.year}
                    </p>
                    <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center pt-8">
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#FF2DAA", background: "#FF2DAA" }} />
                    <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,45,170,0.2)" }} />
                  </div>
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <div className="hidden md:block" />
                  <div className="hidden md:flex flex-col items-center pt-8">
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#FF2DAA", background: "#FF2DAA" }} />
                    <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,45,170,0.2)" }} />
                  </div>
                  <div className="bg-[#F6F6F8] rounded-2xl border border-border p-8">
                    <p className="font-heading text-[10px] font-bold letter-luxury uppercase mb-4" style={{ color: "#FF2DAA" }}>
                      {item.year}
                    </p>
                    <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Credibility */}
    <section className="section-padding bg-[#F6F6F8] premium-border-top">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            {[
              { stat: "500+", label: "Clients Served" },
              { stat: "10+", label: "Years Experience" },
              { stat: "1,200+", label: "Community Members" },
              { stat: "4-Step", label: "Proven Framework" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-border p-8 text-center">
                <p className="neon-text font-heading text-4xl font-bold mb-2">{item.stat}</p>
                <div className="ornament-line !w-8 mb-3" />
                <p className="text-muted-foreground text-xs font-bold letter-luxury uppercase">{item.label}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="ornament-line !w-8 !mx-0" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Credentials & Experience</p>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl mb-8 letter-tight">Why People Trust Sarah</h2>
            <ul className="space-y-4">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-100px] left-[30%]" />
      <div className="container-wide relative z-10">
        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">What Drives Her</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">Her Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="luxury-card">
                <div className="luxury-card-inner">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,45,170,0.08)" }}>
                    <Icon size={20} style={{ color: "#FF2DAA" }} />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Heart — personal quote */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">In Her Own Words</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">Why This Work Matters</h2>
        </div>
        <div className="rounded-3xl p-10 md:p-14 text-white relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,170,0.18), transparent 70%)" }}
          />
          <div className="space-y-6 text-white/70 leading-relaxed text-lg relative z-10">
            <p>
              "I spent years watching people — brilliant, gifted, called people — live beneath their potential because of wounds they didn't know how to heal. I watched the same patterns pass from parent to child, generation to generation, not from malice, but from a lack of tools."
            </p>
            <p>
              "That's why I do what I do. I don't just coach people — I walk with them into the places they've been too afraid to go alone. I hold space while the real work happens. And I stand as a witness when they rise up, whole and free, for the very first time."
            </p>
            <div className="ornament-line-wide !my-8" />
            <p className="font-heading text-xl font-bold text-white text-center">
              "If you're reading this and something in you is stirring — that's not coincidence. That's an invitation."
            </p>
          </div>
        </div>
        <div className="text-center mt-14">
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Work With Sarah <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);
};

export default About;
