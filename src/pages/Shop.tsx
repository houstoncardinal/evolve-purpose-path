import { useState, useEffect } from "react";
import useSEO from "@/hooks/useSEO";
import EmailCapture from "@/components/sections/EmailCapture";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Package, Star, Shield, RefreshCw, Truck } from "lucide-react";
import { store, initStore, Product, Bundle } from "@/lib/adminStore";

const guarantees = [
  { icon: Shield, label: "Satisfaction Guarantee", desc: "If a physical product arrives damaged, we'll replace it free." },
  { icon: RefreshCw, label: "30-Day Return Policy", desc: "Return unopened items within 30 days for a full refund." },
  { icon: Truck, label: "Fast Shipping", desc: "Orders ship within 2–3 business days. Digital products are instant." },
];

const categoryIcons: Record<string, string> = {
  physical: "📦",
  digital: "💻",
  bundle: "🎁",
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);

  useEffect(() => {
    initStore();
    setProducts(store.getProducts().filter((p) => p.status === "active" || p.status === "coming_soon"));
    setBundles(store.getBundles().filter((b) => b.status === "active"));
  }, []);

  useSEO({
    title: "Shop — Books, Journals & Digital Resources",
    description: "Shop purpose-driven books, healing journals, digital programs, and coaching bundles from Evolve 2 Purpose. Tools to support your transformation journey.",
    keywords: "life transformation books, healing journal, purpose coaching resources, women empowerment products, evolve 2 purpose shop, coaching digital products",
    schema: {
      "@context": "https://schema.org",
      "@type": "Store",
      name: "Evolve 2 Purpose Shop",
      url: "https://evolve2purpose.com/shop",
      description: "Purpose-driven books, journals, digital programs, and coaching bundles.",
      seller: { "@type": "Person", name: "Sarah Adams" },
    },
  });

  const addToCart = (id: string) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const activeProducts = products.filter((p) => p.status === "active");
  const comingSoonProducts = products.filter((p) => p.status === "coming_soon");

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
      {bundles.length > 0 && (
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
                  key={bundle.id}
                  className={`rounded-3xl border overflow-hidden flex flex-col ${i === bundles.length - 1 ? "border-primary/30" : "border-border bg-white"}`}
                  style={i === bundles.length - 1 ? { backgroundColor: "#0B0B0F" } : {}}
                >
                  <div className="p-8 flex-1">
                    {bundle.badge && (
                      <span
                        className="inline-block text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-5"
                        style={i === bundles.length - 1
                          ? { background: "rgba(255,45,170,0.2)", color: "#FF2DAA" }
                          : { background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }
                        }
                      >
                        {bundle.badge}
                      </span>
                    )}
                    <h3 className={`font-heading text-xl font-bold mb-2 ${i === bundles.length - 1 ? "text-white" : "text-foreground"}`}>
                      {bundle.name}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 ${i === bundles.length - 1 ? "text-white/60" : "text-muted-foreground"}`}>
                      {bundle.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {bundle.items.map((item) => (
                        <li key={item} className={`flex items-center gap-2 text-xs ${i === bundles.length - 1 ? "text-white/70" : "text-muted-foreground"}`}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#FF2DAA" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`px-8 pb-8 border-t ${i === bundles.length - 1 ? "border-white/10" : "border-border"} pt-6`}>
                    <div className="flex items-baseline justify-between mb-5">
                      <span className={`font-heading text-2xl font-bold ${i === bundles.length - 1 ? "text-white" : "text-foreground"}`}>${bundle.price.toFixed(2)}</span>
                      <span className="text-xs font-bold" style={{ color: "#FF2DAA" }}>Save ${(bundle.originalPrice - bundle.price).toFixed(0)}</span>
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
      )}

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
            {activeProducts.map((p) => (
              <div key={p.id} className="luxury-card flex flex-col">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#F6F6F8] to-white flex items-center justify-center relative border-b border-border">
                  <span className="text-6xl">{categoryIcons[p.category] || "📦"}</span>
                  {p.badge && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full text-white"
                      style={{ background: "#FF2DAA" }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="luxury-card-inner flex flex-col flex-1 !pt-6">
                  <p className="text-primary text-[10px] font-bold letter-luxury uppercase mb-2">{p.category}</p>
                  <h3 className="font-heading text-lg font-bold mb-2 letter-tight">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-heading text-xl font-bold">${p.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(p.id)}
                      className="btn-neon-solid !text-xs !px-5 !py-2.5 shadow-md"
                      style={cart.includes(p.id) ? { background: "#0B0B0F" } : {}}
                    >
                      {cart.includes(p.id) ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoonProducts.length > 0 && (
        <section className="py-14 bg-[#F6F6F8]">
          <div className="container-narrow text-center">
            <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-3">Coming Soon</p>
            <h3 className="font-heading text-2xl md:text-3xl mb-4 letter-tight">Be First to Know When It Drops</h3>
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {comingSoonProducts.map((p) => (
                <span key={p.id} className="text-sm text-muted-foreground bg-white border border-border rounded-full px-4 py-1.5">{p.name}</span>
              ))}
            </div>
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
      )}

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
            Products are tools — but if you're ready for guided, personalized transformation, Sarah's coaching programs will take you further than any book ever could.
          </p>
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Explore Coaching Programs <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <EmailCapture variant="fullwidth" />
    </div>
  );
};

export default Shop;
