import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight } from "lucide-react";

const frameworkSteps = [
  {
    num: "01",
    title: "Awareness",
    subtitle: "See What's Been Hidden",
    description: "Before you can heal, you must see. In this foundational step, we gently uncover the root wounds, inherited patterns, and unconscious beliefs that have been shaping your life from the shadows.",
    experience: "Through guided reflection, prophetic insight, and compassionate inquiry, you'll begin to identify what you've been carrying — often for decades — and understand how it has been affecting your relationships, your faith, and your sense of self.",
    outcome: "Clarity. For the first time, you'll see the full picture — not to overwhelm you, but to empower you with the truth that sets you free.",
    forWho: "Women who feel stuck in cycles they can't explain, who sense there's something deeper beneath the surface of their struggles.",
  },
  {
    num: "02",
    title: "Healing",
    subtitle: "Release the Weight You Were Never Meant to Carry",
    description: "This is where the deep, sacred work happens. Healing isn't about forgetting — it's about releasing. In this step, we move into Spirit-led inner healing work that addresses trauma at its root.",
    experience: "Through prophetic prayer, inner healing sessions, and guided restoration exercises, you'll experience the gentle but powerful hand of God reaching into the places of deepest pain and bringing restoration, peace, and wholeness.",
    outcome: "Freedom. The chains of bitterness, fear, shame, and unforgiveness begin to break. You'll feel lighter, clearer, and more spiritually alive than you have in years.",
    forWho: "Women carrying trauma — whether from childhood, relationships, loss, or systemic harm — who are ready to let God heal what the world could not.",
  },
  {
    num: "03",
    title: "Alignment",
    subtitle: "Return to Who You Were Always Created to Be",
    description: "Healing clears the path. Alignment sets the direction. In this step, we recalibrate your identity, your beliefs, and your spiritual posture to match God's original design for your life.",
    experience: "We'll work together to dismantle false identities, renew your mindset, and rebuild your spiritual foundation. You'll learn to recognize God's voice with clarity and move in sync with His timing and His plan.",
    outcome: "Peace and confidence. You'll no longer question your worth or your direction. You'll know — deep in your spirit — who you are and where you're going.",
    forWho: "Women in transition who have experienced healing but still feel disconnected from their identity, their faith, or their next steps.",
  },
  {
    num: "04",
    title: "Purpose Activation",
    subtitle: "Step Boldly Into Your Calling",
    description: "This is the moment everything has been leading to. You are healed. You are aligned. Now it's time to move. Purpose Activation is about stepping into the calling, the vision, and the life that God has been preparing you for all along.",
    experience: "Through prophetic guidance, strategic clarity, and spiritual empowerment, you'll identify your purpose, develop a plan to walk in it, and receive the spiritual covering and confidence to launch boldly.",
    outcome: "Activation. You'll leave this step not just knowing your purpose — but living it. Boldly. Unapologetically. With heaven backing every step.",
    forWho: "Women who are healed and ready — ready to lead, serve, create, and build the life and legacy they were always designed for.",
  },
];

const Framework = () => (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Signature Process</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 leading-tight letter-tight">
          The 4-Step Healing &<br />
          <span className="italic font-display gold-text">Inner Restoration</span> Framework
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          A Spirit-led, proven pathway from pain to purpose — designed to bring deep, lasting transformation to every area of your life. This is not surface-level coaching. This is root-level restoration.
        </p>
      </div>
    </section>

    {/* Steps */}
    {frameworkSteps.map((step, i) => (
      <section key={step.num} className={`section-padding relative overflow-hidden ${i % 2 === 0 ? "" : "bg-card"}`}>
        <div className="glow-orb w-[300px] h-[300px] top-[20%] right-[-50px] opacity-50" />
        <div className="container-wide max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <span className="gold-text font-display text-8xl md:text-9xl font-bold leading-none">{step.num}</span>
            <div className="pt-2 md:pt-4">
              <h2 className="font-heading text-4xl md:text-5xl letter-tight">{step.title}</h2>
              <p className="text-primary italic font-display text-xl mt-2">{step.subtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{step.description}</p>
              <div className="ornament-line !w-12 !mx-0 mb-6" />
              <h4 className="font-heading text-lg mb-3">What You'll Experience</h4>
              <p className="text-muted-foreground leading-relaxed text-base">{step.experience}</p>
            </div>
            <div className="space-y-6">
              <div className="luxury-card">
                <div className="luxury-card-inner">
                  <h4 className="font-heading text-lg mb-3">The Transformation</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.outcome}</p>
                </div>
              </div>
              <div className="luxury-card !bg-secondary">
                <div className="luxury-card-inner">
                  <h4 className="font-heading text-lg mb-3">This Step Is For You If…</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.forWho}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="section-padding text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-narrow relative z-10">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Ready to Begin Your Restoration?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          The framework is proven. The anointing is real. All that's missing is you.
        </p>
        <Link to="/programs" className="gold-gradient text-primary-foreground px-12 py-5 rounded-full font-semibold text-lg hover-scale inline-flex items-center gap-3 shadow-lg">
          Explore Programs <ArrowRight size={18} />
        </Link>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default Framework;
