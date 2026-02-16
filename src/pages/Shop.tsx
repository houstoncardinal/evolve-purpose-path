import EmailCapture from "@/components/sections/EmailCapture";
import { ArrowRight } from "lucide-react";

const products = [
  {
    title: "Healing & Alignment Journal",
    price: "$34.99",
    description: "A beautifully designed guided journal to walk you through the 4-Step Framework at your own pace. Includes prophetic declarations, reflection prompts, and healing exercises.",
    category: "Journal",
    badge: "Bestseller",
    icon: "📖",
  },
  {
    title: "Breaking Cycles Workbook",
    price: "$24.99",
    description: "An in-depth workbook designed to help you identify and dismantle generational patterns. Perfect as a companion to any program or as a standalone healing tool.",
    category: "Workbook",
    badge: null,
    icon: "📝",
  },
  {
    title: "Prophetic Prayer & Declaration Cards",
    price: "$19.99",
    description: "A set of 40 beautifully designed cards with Spirit-led prayers and prophetic declarations for daily use. Carry your healing with you.",
    category: "Cards",
    badge: "New",
    icon: "🃏",
  },
  {
    title: "Purpose Activation Masterclass",
    price: "$97.00",
    description: "A self-paced digital course walking you through Step 4 of the Framework — Purpose Activation. Includes video lessons, workbook, and prophetic exercises.",
    category: "Digital Course",
    badge: null,
    icon: "🎓",
  },
  {
    title: "Inner Restoration Audio Collection",
    price: "$29.99",
    description: "A curated collection of guided healing prayers, soaking music, and prophetic meditations to support your restoration journey.",
    category: "Audio",
    badge: null,
    icon: "🎧",
  },
  {
    title: "Anointing Oil — 'Restoration'",
    price: "$22.00",
    description: "A hand-blended anointing oil crafted with prayer and intention. Use during your healing practice, prayer time, or as a daily reminder of God's restoring power.",
    category: "Anointing Oil",
    badge: "Coming Soon",
    icon: "✨",
  },
];

const Shop = () => (
  <div>
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-150px] right-[10%]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Shop</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 letter-tight">
          Tools for Your <span className="italic font-display gold-text">Healing Journey</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every product is designed with intention and prayer — to support your healing, deepen your faith, and activate your purpose.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.title} className="luxury-card flex flex-col">
            <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-accent flex items-center justify-center relative">
              <span className="text-6xl opacity-60">{p.icon}</span>
              {p.badge && (
                <span className={`absolute top-4 right-4 text-[10px] font-semibold letter-luxury uppercase px-3 py-1.5 rounded-full ${
                  p.badge === "Coming Soon" ? "bg-muted text-muted-foreground" : "gold-gradient text-primary-foreground"
                }`}>
                  {p.badge}
                </span>
              )}
            </div>
            <div className="luxury-card-inner flex flex-col flex-1 !pt-6">
              <p className="text-primary text-[10px] font-semibold letter-luxury uppercase mb-2">{p.category}</p>
              <h3 className="font-heading text-lg mb-2 letter-tight">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl font-semibold">{p.price}</span>
                <button
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold hover-scale transition-all ${
                    p.badge === "Coming Soon"
                      ? "border border-border text-muted-foreground cursor-not-allowed"
                      : "gold-gradient text-primary-foreground shadow-md"
                  }`}
                  disabled={p.badge === "Coming Soon"}
                >
                  {p.badge === "Coming Soon" ? "Notify Me" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default Shop;
