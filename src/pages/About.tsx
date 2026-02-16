import sarahPortrait from "@/assets/sarah-portrait.jpg";
import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";

const About = () => (
  <div>
    {/* Hero */}
    <section className="section-padding bg-card">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">About Sarah Adams</p>
          <h1 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">
            Called to <span className="italic font-display">Heal.</span><br />
            Anointed to <span className="text-primary italic font-display">Restore.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sarah Adams is a prophetic healer, trauma recovery guide, and inner restoration coach who helps women break free from generational cycles and step into their God-given purpose.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Her journey didn't begin in a classroom — it began in the fire. After walking through her own season of deep wounding, loss, and spiritual warfare, Sarah encountered the transformative power of prophetic healing that changed the trajectory of her life forever.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, she carries that same anointing into the lives of women around the world through her signature 4-Step Healing & Inner Restoration Framework, 1:1 sessions, group programs, and prophetic guidance.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img src={sarahPortrait} alt="Sarah Adams" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full gold-gradient opacity-15 blur-3xl" />
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding">
      <div className="container-narrow text-center">
        <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">The Mission</p>
        <h2 className="font-heading text-3xl md:text-4xl mb-6">
          "I believe every woman deserves to know the truth of who she is — <span className="italic font-display">healed, whole, and walking in purpose.</span>"
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
          Sarah's mission is rooted in the conviction that healing is not a luxury — it's a birthright. Every woman who walks through her doors is met with compassion, spiritual authority, and a safe space to uncover, process, and release what has been holding her back.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Through prophetic insight and evidence-informed practices, Sarah guides her clients from survival mode into a life of alignment, clarity, and activated purpose.
        </p>
      </div>
    </section>

    {/* Credibility */}
    <section className="section-padding bg-card">
      <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { stat: "500+", label: "Women Served" },
          { stat: "10+", label: "Years in Ministry & Healing" },
          { stat: "4-Step", label: "Proven Framework" },
        ].map((item) => (
          <div key={item.label} className="py-8">
            <p className="gold-text font-display text-5xl font-bold mb-2">{item.stat}</p>
            <p className="text-muted-foreground font-semibold text-sm tracking-wide uppercase">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Heart */}
    <section className="section-padding">
      <div className="container-narrow">
        <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3 text-center">Her Heart</p>
        <h2 className="font-heading text-3xl md:text-4xl mb-8 text-center">Why This Work Matters</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            "I spent years watching women — brilliant, anointed, called women — live beneath their potential because of wounds they didn't know how to heal. I watched mothers pass down pain they'd inherited, not because they wanted to, but because no one ever showed them another way."
          </p>
          <p>
            "That's why I do what I do. I don't just coach women — I walk with them into the places they've been too afraid to go alone. I hold the lantern while God does the surgery. And I stand as a witness when they rise up, whole and free, for the very first time."
          </p>
          <p className="text-foreground font-semibold italic text-lg">
            "If you're reading this and something in your spirit is stirring — that's not coincidence. That's an invitation."
          </p>
        </div>
        <div className="text-center mt-12">
          <Link to="/programs" className="gold-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold hover-scale inline-block">
            Work With Sarah
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default About;
