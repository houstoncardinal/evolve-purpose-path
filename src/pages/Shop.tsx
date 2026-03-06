import { useState } from "react";
import useSEO from "@/hooks/useSEO";
import EmailCapture from "@/components/sections/EmailCapture";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Package, Star, Shield, RefreshCw, Truck } from "lucide-react";

const products = [
  {
    id: "journal",
    title: "Healing & Alignment Journal",
    price: "$34.99",
    priceNum: 34.99,
    description:
      "A beautifully designed guided journal that walks you through the 4-Step Framework at your own pace. Each section includes reflection prompts, declaration exercises, and healing activities designed to move you from awareness to action.",
    category: "Journal",
    badge: "Bestseller",
    features: ["132 guided pages", "4-Step Framework structure", "Daily reflection prompts", "Prophetic declaration pages", "Lay-flat binding"],
    color: "from-[#F6F6F8] to-white",
    icon: "📖",
    comingSoon: false,
  },
  {
    id: "workbook",
    title: "Breaking Cycles Workbook",
    price: "$24.99",
    priceNum: 24.99,
    description:
      "A deep-dive workbook designed to help you identify and dismantle the inherited patterns quietly running your life. Perfect as a standalone tool or a powerful companion to any of Sarah's programs.",
    category: "Workbook",
    badge: null,
    features: ["96 structured pages", "Pattern identification exercises", "Trigger mapping worksheets", "Cycle-breaking action plans", "Progress tracking"],
    color: "from-[#F6F6F8] to-white",
    icon: "📝",
    comingSoon: false,
  },
  {
    id: "cards",
    title: "Declaration & Affirmation Card Deck",
    price: "$19.99",
    priceNum: 19.99,
    description:
      "40 beautifully designed cards with daily declarations and affirmations rooted in the Evole 2 Purpose framework. Carry your healing with you — into your car, your office, your mirror, your daily ritual.",
    category: "Card Deck",
    badge: "New",
    features: ["40 premium card deck", "4 themed categories", "Matte finish, durable stock", "Keepsake box included", "Digital companion PDF"],
    color: "from-[#F6F6F8] to-white",
    icon: "🃏",
    comingSoon: false,
  },
  {
    id: "masterclass",
    title: "Purpose Activation Masterclass",
    price: "$97.00",
    priceNum: 97.00,
    description:
      "A self-paced digital course built on Step 4 of the Framework — Teach Someone Else What You Learned. Discover how to identify your message, find your audience, and turn your personal growth into genuine purpose-driven impact.",
    category: "Digital Course",
    badge: null,
    features: ["5 video modules", "Companion workbook PDF", "Lifetime access", "Community discussion access", "Certificate of completion"],
    color: "from-[#F6F6F8] to-white",
    icon: "🎓",
    comingSoon: false,
  },
  {
    id: "audio",
    title: "Inner Restoration Audio Collection",
    price: "$29.99",
    priceNum: 29.99,
    description:
      "A curated collection of guided meditations, breathing exercises, and spoken affirmations specifically designed to support the healing journey. Listen during your morning routine, before sleep, or any time you need to reset.",
    category: "Audio",
    badge: null,
    features: ["12 guided audio tracks", "60+ minutes of content", "MP3 + streaming access", "Accompanying reflection guide", "Instant digital delivery"],
    color: "from-[#F6F6F8] to-white",
    icon: "🎧",
    comingSoon: false,
  },
  {
    id: "oil",
    title: "Anointing Oil — 'Restoration'",
    price: "$22.00",
    priceNum: 22.00,
    description:
      "A hand-blended anointing oil crafted with prayer and intention. Use during your healing practice, morning prayer, or as a daily sensory reminder that you are in a season of restoration and becoming.",
    category: "Wellness",
    badge: "Coming Soon",
    features: ["Hand-blended formula", "Natural essential oils", "1 oz amber glass bottle", "Blessing card included", "Limited batch production"],
    color: "from-[#F6F6F8] to-white",
    icon: "✨",
    comingSoon: true,
  },
];

const bundles = [
  {
    title: "The Starter Kit",
    desc: "The perfect entry point. Everything you need to begin working the framework on your own.",
    includes: ["Healing & Alignment Journal", "Declaration Card Deck"],
    price: "$49.99",
    savings: "Save $5",
    tag: "Most Popular",
  },
  {
    title: "The Deep-Work Bundle",
    desc: "For the woman who is ready to go all the way in. Combines the most powerful print tools with the audio collection.",
    includes: ["Breaking Cycles Workbook", "Inner Restoration Audio Collection", "Declaration Card Deck"],
    price: "$64.99",
    savings: "Save $10",
    tag: "Best Value",
  },
  {
    title: "The Complete Toolkit",
    desc: "Every physical and digital resource in one comprehensive package. The full Evole 2 Purpose resource library.",
    includes: ["Healing Journal", "Breaking Cycles Workbook", "Card Deck", "Masterclass", "Audio Collection"],
    price: "$174.99",
    savings: "Save $32",
    tag: "All-In",
  },
];

const guarantees = [
  { icon: Shield, label: "Satisfaction Guarantee", desc: "If a physical product arrives damaged, we'll replace it free." },
  { icon: RefreshCw, label: "30-Day Return Policy", desc: "Return unopened items within 30 days for a full refund." },
  { icon: Truck, label: "Fast Shipping", desc: "Orders ship within 2–3 business days. Digital products are instant." },
];

const Shop = () => {
  useSEO({
    title: "Shop — Books, Journals & Digital Resources",
    description: "Shop purpose-driven books, healing journals, digital programs, and coaching bundles from Evole 2 Purpose. Tools to support your transformation journey.",
    keywords: "life transformation books, healing journal, purpose coaching resources, women empowerment products, evole 2 purpose shop, coaching digital products",
    schema: {
      "@context": "https://schema.org",
      "@type": "Store",
      name: "Evole 2 Purpose Shop",
      url: "https://evole2purpose.com/shop",
      description: "Purpose-driven books, journals, digital programs, and coaching bundles.",
      seller: { "@type": "Person", name: "Sarah Adams" },
    },
  });
  const [cart, setCart] = useState<string[]>([]);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);

  const addToCart = (id: string) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[-150px] right-[10%]" />
        <div className="container-narrow relative z-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Shop</p>
            <div className="ornament-line !w-8" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl mb-6 letter-tight">
            Tools for Your <span className="italic neon-text">Transformation</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Every resource in this shop was created with one purpose: to meet you where you are and give you exactly what you need to move forward. Practical. Intentional. Powerful.
          </p>
          {cart.length > 0 && (
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,45,170,0.1)", color: "#FF2DAA" }}
            >
              <ShoppingBag size={14} />
              {cart.length} item{cart.length > 1 ? "s" : ""} in cart
            </div>
          )}
        </div>
      </section>

      {/* Bundles */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Save More Together</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Curated Bundles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Stack the tools that work best together and save. Each bundle is intentionally paired for maximum impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => (
              <div
                key={bundle.title}
                className={`rounded-3xl border overflow-hidden flex flex-col ${i === 2 ? "border-primary/30" : "border-border bg-white"}`}
                style={i === 2 ? { backgroundColor: "#0B0B0F" } : {}}
              >
                <div className="p-8 flex-1">
                  <span
                    className="inline-block text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-5"
                    style={
                      i === 2
                        ? { background: "rgba(255,45,170,0.2)", color: "#FF2DAA" }
                        : { background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }
                    }
                  >
                    {bundle.tag}
                  </span>
                  <h3 className={`font-heading text-xl font-bold mb-2 ${i === 2 ? "text-white" : "text-foreground"}`}>
                    {bundle.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${i === 2 ? "text-white/60" : "text-muted-foreground"}`}>
                    {bundle.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {bundle.includes.map((item) => (
                      <li key={item} className={`flex items-center gap-2 text-xs ${i === 2 ? "text-white/70" : "text-muted-foreground"}`}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`px-8 pb-8 border-t ${i === 2 ? "border-white/10" : "border-border"} pt-6`}>
                  <div className="flex items-baseline justify-between mb-5">
                    <span className={`font-heading text-2xl font-bold ${i === 2 ? "text-white" : "text-foreground"}`}>{bundle.price}</span>
                    <span className="text-xs font-bold" style={{ color: "#FF2DAA" }}>{bundle.savings}</span>
                  </div>
                  <button className="w-full btn-neon-solid !py-3 !text-xs shadow-md">
                    Add Bundle to Cart <Package size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual products */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[-100px] left-[40%]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Individual Products</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight">Shop by Product</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="luxury-card flex flex-col">
                {/* Product image area */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.color} flex items-center justify-center relative border-b border-border`}>
                  <span className="text-6xl">{p.icon}</span>
                  {p.badge && (
                    <span
                      className={`absolute top-4 right-4 text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full ${
                        p.badge === "Coming Soon"
                          ? "bg-[#F6F6F8] text-muted-foreground border border-border"
                          : "text-white"
                      }`}
                      style={p.badge !== "Coming Soon" ? { background: "#FF2DAA" } : {}}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="luxury-card-inner flex flex-col flex-1 !pt-6">
                  <p className="text-primary text-[10px] font-bold letter-luxury uppercase mb-2">{p.category}</p>
                  <h3 className="font-heading text-lg font-bold mb-2 letter-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-3">What's Inside</p>
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#FF2DAA" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-heading text-xl font-bold">{p.price}</span>
                    {p.comingSoon ? (
                      <span className="text-xs text-muted-foreground font-semibold border border-border px-4 py-2 rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="btn-neon-solid !text-xs !px-5 !py-2.5 shadow-md"
                        style={cart.includes(p.id) ? { background: "#0B0B0F" } : {}}
                      >
                        {cart.includes(p.id) ? "✓ Added" : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify me for coming soon */}
      <section className="py-14 bg-[#F6F6F8]">
        <div className="container-narrow text-center">
          <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-3">Anointing Oil — Coming Soon</p>
          <h3 className="font-heading text-2xl md:text-3xl mb-4 letter-tight">Be First to Know When It Drops</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            The Restoration Anointing Oil is hand-blended in limited batches. Drop your email to get early access.
          </p>
          {notifyDone ? (
            <p className="font-heading font-semibold text-primary">You're on the list! We'll notify you at launch.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setNotifyDone(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white border border-border rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#FF2DAA" } as React.CSSProperties}
              />
              <button type="submit" className="btn-neon-solid !py-3 !text-xs flex-shrink-0">
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Guarantees */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl letter-tight">Shop With Confidence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.label} className="text-center p-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(255,45,170,0.08)" }}
                  >
                    <Icon size={24} style={{ color: "#FF2DAA" }} />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{g.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-sell CTA */}
      <section className="py-16 bg-[#F6F6F8] text-center">
        <div className="container-narrow">
          <div className="ornament-line-wide mb-8" />
          <h2 className="font-heading text-3xl md:text-4xl mb-5 letter-tight">
            Want Deeper Transformation?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            These resources are powerful — but nothing replaces working directly with Sarah. Explore her coaching programs to go deeper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs" className="btn-neon-solid shadow-lg">
              Explore Programs <ArrowRight size={16} />
            </Link>
            <Link to="/booking" className="btn-neon-outline">
              Book Sarah to Speak
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture variant="fullwidth" />
    </div>
  );
};

export default Shop;
