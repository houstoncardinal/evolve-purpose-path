import EmailCapture from "@/components/sections/EmailCapture";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Sarah's prophetic guidance helped me see what I'd been carrying for years. For the first time in my life, I feel truly free to walk in my purpose. My family can feel the difference.",
    name: "Tamara J.",
    detail: "Healed from 15 years of unforgiveness",
    transformation: "From bitterness to radical freedom",
  },
  {
    quote: "I didn't know healing could feel this safe. Through the 4-Step Framework, I finally broke the cycle that had haunted three generations of my family. My daughters will not carry what I carried.",
    name: "Michelle R.",
    detail: "Mother of 3, generational cycle breaker",
    transformation: "From generational trauma to generational blessing",
  },
  {
    quote: "Working with Sarah changed everything. I went from barely surviving to thriving — spiritually, emotionally, and in my calling. I launched my ministry within 6 months of completing the program.",
    name: "Denise W.",
    detail: "Purpose-activated entrepreneur & minister",
    transformation: "From survival mode to purpose activation",
  },
  {
    quote: "I came to Sarah completely broken after my divorce. She didn't try to fix me — she walked with me into the pain and let God do what only He can do. I am not the same woman I was a year ago.",
    name: "Keisha L.",
    detail: "Restored after divorce",
    transformation: "From devastation to divine restoration",
  },
  {
    quote: "The prophetic guidance session alone was worth more than two years of therapy I'd been through. Sarah spoke things over my life that only God could have revealed. I finally have direction.",
    name: "Angela M.",
    detail: "Found clarity and divine direction",
    transformation: "From confusion to prophetic clarity",
  },
  {
    quote: "I was skeptical at first, but something in my spirit wouldn't let me ignore the pull. After going through the Healing Intensive, I released 20 years of pain in 2 days. I didn't even know I was carrying that much.",
    name: "Priscilla T.",
    detail: "Healing Intensive graduate",
    transformation: "From hidden pain to visible freedom",
  },
];

const Testimonials = () => (
  <div>
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-150px] left-[30%]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Real Stories, Real Healing</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 letter-tight">
          Lives <span className="italic font-display gold-text">Transformed</span> Through Healing
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          These are real women who chose to say yes to their healing. Their stories are proof that God's restoration power is real — and available to you, too.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="luxury-card">
            <div className="luxury-card-inner relative">
              <div className="gold-text font-display text-8xl absolute -top-2 left-0 opacity-10 leading-none">"</div>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-8 relative z-10 italic text-lg">{t.quote}</p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="ornament-line !w-6 !mx-0 mb-3" />
                  <p className="font-heading font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.detail}</p>
                </div>
                <span className="text-primary text-[10px] font-semibold letter-luxury bg-secondary px-4 py-2 rounded-full hidden sm:block">
                  {t.transformation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-card text-center relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-narrow relative z-10">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Your Story Could Be Next</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          Healing is not reserved for the "special few." It's for every woman willing to say yes. Are you ready?
        </p>
        <Link to="/programs" className="gold-gradient text-primary-foreground px-12 py-5 rounded-full font-semibold text-lg hover-scale inline-flex items-center gap-3 shadow-lg">
          Begin Your Journey <ArrowRight size={18} />
        </Link>
      </div>
    </section>

    <EmailCapture variant="fullwidth" />
  </div>
);

export default Testimonials;
