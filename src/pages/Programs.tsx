import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";

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
    <section className="section-padding bg-card text-center">
      <div className="container-narrow">
        <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Work With Sarah</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">
          Your Healing Journey <span className="italic font-display">Starts Here</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every woman's path to wholeness is unique. Explore the offerings below and find the pathway that meets you exactly where you are.
        </p>
      </div>
    </section>

    {/* Programs Grid */}
    <section className="section-padding">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((p) => (
          <div key={p.title} className={`rounded-2xl p-8 md:p-10 flex flex-col border ${p.featured ? "border-primary bg-card shadow-lg relative overflow-hidden" : "border-border bg-card"}`}>
            {p.featured && <div className="absolute top-0 left-0 right-0 h-1 gold-gradient" />}
            {p.featured && <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">Most Popular</span>}
            <h3 className="font-heading text-2xl mb-2">{p.title}</h3>
            <p className="text-primary font-semibold mb-4">{p.price}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{p.description}</p>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-3">What's Included</h4>
            <ul className="space-y-2 mb-8 flex-1">
              {p.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className={`px-6 py-3 rounded-full font-semibold text-sm text-center hover-scale ${p.featured ? "gold-gradient text-primary-foreground" : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"}`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding bg-card">
      <div className="container-narrow text-center">
        <h2 className="font-heading text-3xl mb-4">Not Sure Where to Start?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          If you're feeling drawn to healing but aren't sure which pathway is right for you, start with the free Healing & Alignment Guide. It will help you identify where you are and what you need most.
        </p>
        <Link to="/free-guide" className="gold-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold hover-scale inline-block">
          Get Your Free Guide
        </Link>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default Programs;
