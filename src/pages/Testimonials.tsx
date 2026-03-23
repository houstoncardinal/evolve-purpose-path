import { useEffect, useState } from "react";
import EmailCapture from "@/components/sections/EmailCapture";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Star, ArrowRight, Quote } from "lucide-react";
import { store, Testimonial } from "@/lib/adminStore";

const stats = [
  { stat: "500+", label: "Lives Transformed" },
  { stat: "10+", label: "Years of Impact" },
  { stat: "98%", label: "Report Lasting Change" },
  { stat: "4-Step", label: "Proven Framework" },
];

const Testimonials = () => {
  const [featured, setFeatured] = useState<Testimonial | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    store.getTestimonials().then((all) => {
      setFeatured(all.find((t) => t.featured) ?? all[0] ?? null);
      setTestimonials(all.filter((t) => !t.featured));
    });
  }, []);

  useSEO({
    title: "Client Transformation Stories — 500+ Women Healed & Purposeful",
    description: "Read real transformation stories from 500+ women who broke generational cycles, healed from abandonment and trauma, and stepped fully into purpose through Sarah Adams' coaching programs.",
    keywords: "life coaching testimonials women, transformation stories healing, healing coaching results, purpose coaching reviews, Sarah Adams client results, generational cycle breaking testimonials, women coaching success stories, life transformation reviews, coaching program testimonials, break generational cycles stories",
    breadcrumbs: [{ name: "Transformation Stories", url: "/testimonials" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Client Transformation Reviews — Evolve 2 Purpose",
        description: "Real testimonials from women who transformed their lives through Sarah Adams' 4-Step Framework, coaching programs, and healing intensives.",
        url: "https://evolve2purpose.com/testimonials",
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Review",
              author: { "@type": "Person", name: "Keisha L." },
              reviewBody: "I came to Sarah completely shattered. Three months into working with her, something cracked open that I didn't even know was locked. She didn't just help me heal. She helped me find out who I actually am.",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
              itemReviewed: { "@id": "https://evolve2purpose.com/#organization" },
              datePublished: "2025-06-01",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Review",
              author: { "@type": "Person", name: "Tamara J." },
              reviewBody: "Sarah's guidance helped me see what I had been carrying for years. For the first time in my life, I feel truly free to walk in my purpose.",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
              itemReviewed: { "@id": "https://evolve2purpose.com/#organization" },
              datePublished: "2025-07-01",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Review",
              author: { "@type": "Person", name: "Angela M." },
              reviewBody: "The Purpose Clarity Session alone was worth more than two years of therapy. Sarah spoke truth over my life that I had been avoiding for years. I finally have direction.",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
              itemReviewed: { "@id": "https://evolve2purpose.com/#organization" },
              datePublished: "2025-08-01",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://evolve2purpose.com/#organization",
        name: "Evolve 2 Purpose",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "500",
          reviewCount: "500",
        },
      },
    ],
  });
  return (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-150px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Real Stories, Real Healing</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 letter-tight">
          Lives <span className="italic neon-text">Transformed</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          These are real people who chose to do the inner work. Their stories are not curated highlights — they are honest accounts of what happens when you lead with love, own your growth, and commit to becoming.
        </p>
      </div>
    </section>

    {/* Stats bar */}
    <section className="py-12 bg-[#F6F6F8] premium-border-top">
      <div className="container-wide px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="neon-text font-heading text-4xl font-bold mb-1">{s.stat}</p>
            <p className="text-muted-foreground text-xs letter-luxury uppercase font-semibold">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured testimonial */}
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[-100px] left-[40%]" />
      <div className="container-narrow relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Featured Story</p>
            <div className="ornament-line !w-8" />
          </div>
        </div>
        {featured && (
        <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          {/* Dark left block */}
          <div
            className="lg:col-span-2 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden"
            style={{ backgroundColor: "#0B0B0F" }}
          >
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,45,170,0.2), transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="#FF2DAA" style={{ color: "#FF2DAA" }} />
                ))}
              </div>
              <p className="font-heading text-lg font-bold text-white mb-1">{featured.name}</p>
              <p className="text-white/50 text-xs mb-4">{featured.detail}</p>
              <div className="w-8 h-px mb-4" style={{ background: "#FF2DAA" }} />
              <span
                className="inline-block text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}
              >
                {featured.program}
              </span>
            </div>
            <div className="relative z-10 mt-8">
              <p className="text-white/40 text-xs leading-relaxed italic">{featured.transformation}</p>
            </div>
          </div>
          {/* White right block */}
          <div className="lg:col-span-3 bg-white border-y border-r border-border p-10 md:p-12 flex flex-col justify-center">
            <Quote size={40} className="mb-6 opacity-10" style={{ color: "#FF2DAA" }} />
            <p className="text-foreground text-lg md:text-xl leading-relaxed italic font-heading">
              {featured.quote}
            </p>
          </div>
        </div>
        )}
      </div>
    </section>

    {/* Testimonials grid */}
    <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">More Stories</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl letter-tight">The Transformation Continues</h2>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="luxury-card break-inside-avoid mb-6">
              <div className="luxury-card-inner relative">
                <div className="neon-text font-heading text-6xl absolute -top-2 left-6 opacity-10 leading-none select-none">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} fill="#FF2DAA" style={{ color: "#FF2DAA" }} />
                  ))}
                </div>
                <span
                  className="inline-block text-[9px] font-bold letter-luxury uppercase px-2.5 py-1 rounded-full mb-4"
                  style={{ background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }}
                >
                  {t.program}
                </span>
                <p className="text-foreground leading-relaxed mb-6 relative z-10 italic text-sm">{t.quote}</p>
                <div className="ornament-line !w-6 !mx-0 mb-4" />
                <p className="font-heading font-bold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5 mb-3">{t.detail}</p>
                <p
                  className="text-[10px] font-bold letter-luxury uppercase"
                  style={{ color: "#FF2DAA" }}
                >
                  {t.transformation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="section-padding text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-narrow relative z-10">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Your Story Could Be Next</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          Every person you just read about was exactly where you are right now — wondering if change was really possible. They chose to find out. Will you?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Begin Your Journey <ArrowRight size={16} />
          </Link>
          <Link to="/framework" className="btn-neon-outline">
            See the Framework
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" source="testimonials" />
  </div>
);
};

export default Testimonials;
