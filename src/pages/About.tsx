import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight, Sparkles } from "lucide-react";

const About = () => (
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
            Called to <span className="italic font-display">Heal.</span><br />
            Anointed to <span className="gold-text italic font-display">Restore.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            Sarah Adams is a prophetic healer, trauma recovery guide, and inner restoration coach who helps women break free from generational cycles and step into their God-given purpose.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
            Her journey didn't begin in a classroom — it began in the fire. After walking through her own season of deep wounding, loss, and spiritual warfare, Sarah encountered the transformative power of prophetic healing that changed the trajectory of her life forever.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Today, she carries that same anointing into the lives of women around the world through her signature 4-Step Healing & Inner Restoration Framework, 1:1 sessions, group programs, and prophetic guidance.
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4]">
            <div className="absolute inset-0 rounded-3xl border border-primary/10" />
            <div className="absolute inset-4 rounded-3xl border border-primary/15" />
            <div className="absolute inset-8 rounded-3xl bg-card/50 flex items-center justify-center">
              <div className="text-center px-6">
                <Sparkles className="text-primary mx-auto mb-6" size={36} />
                <p className="font-display text-4xl italic gold-text mb-2">Sarah Adams</p>
                <div className="ornament-line my-4" />
                <p className="text-muted-foreground text-xs letter-luxury uppercase">Prophetic Healer</p>
                <p className="text-muted-foreground text-xs letter-luxury uppercase">Inner Restoration Coach</p>
                <p className="text-muted-foreground text-xs letter-luxury uppercase mt-1">Speaker & Author</p>
              </div>
            </div>
            <div className="glow-orb w-[200px] h-[200px] bottom-[-50px] left-[-30px]" />
          </div>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding relative">
      <div className="container-narrow text-center">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-3xl md:text-5xl mb-8 letter-tight leading-tight">
          "I believe every woman deserves to know the truth of who she is — <span className="italic font-display gold-text">healed, whole, and walking in purpose.</span>"
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4 text-lg">
          Sarah's mission is rooted in the conviction that healing is not a luxury — it's a birthright. Every woman who walks through her doors is met with compassion, spiritual authority, and a safe space to uncover, process, and release what has been holding her back.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
          Through prophetic insight and evidence-informed practices, Sarah guides her clients from survival mode into a life of alignment, clarity, and activated purpose.
        </p>
      </div>
    </section>

    {/* Credibility */}
    <section className="section-padding bg-card premium-border-top">
      <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { stat: "500+", label: "Women Served" },
          { stat: "10+", label: "Years in Ministry & Healing" },
          { stat: "4-Step", label: "Proven Framework" },
        ].map((item, i) => (
          <div key={item.label} className="py-10">
            <p className="gold-text font-display text-6xl font-bold mb-3">{item.stat}</p>
            <div className="ornament-line !w-8 mb-3" />
            <p className="text-muted-foreground font-semibold text-xs letter-luxury uppercase">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Heart */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[20%] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Her Heart</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">Why This Work Matters</h2>
        </div>
        <div className="luxury-card">
          <div className="luxury-card-inner space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              "I spent years watching women — brilliant, anointed, called women — live beneath their potential because of wounds they didn't know how to heal. I watched mothers pass down pain they'd inherited, not because they wanted to, but because no one ever showed them another way."
            </p>
            <p>
              "That's why I do what I do. I don't just coach women — I walk with them into the places they've been too afraid to go alone. I hold the lantern while God does the surgery. And I stand as a witness when they rise up, whole and free, for the very first time."
            </p>
            <div className="ornament-line-wide !my-8" />
            <p className="text-foreground font-semibold italic text-xl text-center">
              "If you're reading this and something in your spirit is stirring — that's not coincidence. That's an invitation."
            </p>
          </div>
        </div>
        <div className="text-center mt-14">
          <Link to="/programs" className="gold-gradient text-primary-foreground px-10 py-4 rounded-full font-semibold hover-scale inline-flex items-center gap-2 shadow-lg">
            Work With Sarah <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default About;
