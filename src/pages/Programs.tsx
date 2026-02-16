import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight, Check } from "lucide-react";

const programs = [
  {
    title: "1:1 Healing Sessions",
    price: "Investment varies",
    description: "Deep, personalized prophetic healing work tailored to your specific wounds, patterns, and breakthrough needs. This is the most intimate and powerful pathway to transformation.",
    includes: ["Prophetic assessment & healing plan", "Guided inner healing prayer sessions", "Personalized breakthrough strategies", "Between-session support", "Prophetic insights for your journey"],
    cta: "Apply for 1:1 Sessions",
    featured: true,
  },
  {
    title: "Group Restoration Program",
    price: "Starting at $497",
    description: "Heal alongside a powerful sisterhood of women walking the same journey. Experience the 4-Step Framework in a guided group setting with community support and accountability.",
    includes: ["8-week guided group journey", "Weekly live sessions with Sarah", "Private community access", "Healing journal & workbook", "Bonus prophetic prayer sessions"],
    cta: "Join the Waitlist",
    featured: false,
  },
  {
    title: "Prophetic Guidance Session",
    price: "Starting at $150",
    description: "Receive Spirit-led prophetic insight and divine clarity for your current season. Perfect for women at a crossroads seeking directional guidance.",
    includes: ["60-minute prophetic session", "Recorded session for replay", "Written prophetic summary", "Prayer & declaration guide", "30-day follow-up support"],
    cta: "Book Your Session",
    featured: false,
  },
  {
    title: "Healing Intensive Weekend",
    price: "Starting at $997",
    description: "An immersive 2-day experience designed for women ready for accelerated breakthrough. Experience all 4 steps of the framework in an intimate, Spirit-filled environment.",
    includes: ["2-day intensive experience", "Small group (max 10 women)", "Personalized prophetic ministry", "Healing resources & materials", "60-day post-intensive support"],
    cta: "Reserve Your Spot",
    featured: false,
  },
];

const Programs = () => (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-150px] left-[20%]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Work With Sarah</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 leading-tight letter-tight">
          Your Healing Journey <span className="italic font-display gold-text">Starts Here</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every woman's path to wholeness is unique. Explore the offerings below and find the pathway that meets you exactly where you are.
        </p>
      </div>
    </section>

    {/* Programs Grid */}
    <section className="section-padding">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((p) => (
          <div key={p.title} className={`luxury-card flex flex-col ${p.featured ? "ring-1 ring-primary" : ""}`}>
            {p.featured && <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />}
            <div className="luxury-card-inner flex flex-col flex-1">
              {p.featured && (
                <span className="text-primary text-[10px] font-semibold letter-luxury uppercase mb-3 inline-flex items-center gap-2">
                  <span className="ornament-diamond !w-1.5 !h-1.5" /> Most Popular
                </span>
              )}
              <h3 className="font-heading text-2xl mb-2 letter-tight">{p.title}</h3>
              <p className="gold-text font-semibold text-lg mb-5">{p.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>
              <div className="ornament-line !w-8 !mx-0 mb-6" />
              <h4 className="font-heading text-sm letter-luxury uppercase mb-4">What's Included</h4>
              <ul className="space-y-3 mb-10 flex-1">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className={`px-6 py-3.5 rounded-full font-semibold text-sm text-center hover-scale transition-all duration-300 ${p.featured ? "gold-gradient text-primary-foreground shadow-lg" : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                {p.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] right-[-100px]" />
      <div className="container-narrow text-center relative z-10">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Not Sure Where to Start?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          If you're feeling drawn to healing but aren't sure which pathway is right for you, start with the free Healing & Alignment Guide. It will help you identify where you are and what you need most.
        </p>
        <Link to="/free-guide" className="gold-gradient text-primary-foreground px-10 py-4 rounded-full font-semibold hover-scale inline-flex items-center gap-2 shadow-lg">
          Get Your Free Guide <ArrowRight size={16} />
        </Link>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default Programs;
