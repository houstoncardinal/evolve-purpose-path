import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Users,
  Calendar,
  Heart,
  Star,
  Shield,
} from "lucide-react";

const schedule = [
  { time: "Day 1 · Morning", title: "Foundation: Lead in Love & Accountability Deep Dive", desc: "We open the container, establish sacred ground rules, and immediately move into the first two pillars of the L.A.T.T. framework — Lead in Love and Accountability." },
  { time: "Day 1 · Afternoon", title: "Trigger Mapping & Root Cause Work", desc: "The afternoon goes deep. We map each woman's emotional triggers back to their actual source — not the surface story, but the root-level event or belief driving the pattern." },
  { time: "Day 1 · Evening", title: "Integration & Community Bonding", desc: "Day One closes with space to breathe, integrate, and connect with the other women in the room. Some of the most powerful healing in this weekend happens in these conversations." },
  { time: "Day 2 · Morning", title: "Breaking Generational Cycles", desc: "The hardest and most necessary work. We name the cycles inherited from our mothers, grandmothers, and beyond — and we begin the intentional process of breaking the pattern for ourselves and those who come after us." },
  { time: "Day 2 · Afternoon", title: "Purpose Activation & Teaching Others", desc: "Your healing isn't just for you. We take the T in L.A.T.T. — Teaching — and activate your calling. You begin to see clearly how your wounds are directly connected to your purpose." },
  { time: "Day 2 · Close", title: "Action Plans & Graduation", desc: "Every woman leaves with a personalized written breakthrough plan. We close in prayer, celebration, and commitment. You do not leave the same woman who arrived." },
];

const included = [
  "2 full days of immersive healing work with Sarah Adams",
  "Small group setting (maximum 16 women) for depth and safety",
  "Full L.A.T.T. framework delivered across both days",
  "All workbooks, materials, and tools included",
  "Personalized breakthrough action plan for each participant",
  "60-day post-intensive group support access",
  "Exclusive alumni community for ongoing connection and accountability",
];

const faqs = [
  { q: "Is the Healing Intensive in person or virtual?", a: "The Healing Intensive Weekend is an intimate, in-person experience designed for maximum depth and connection. Location details are shared upon registration. Virtual attendance is not available — the in-room energy is an irreplaceable part of what makes this weekend transformative." },
  { q: "How many spots are left?", a: "Spots are capped at 16 women per cohort. This is intentional — Sarah refuses to water down the depth by filling a room. Once 16 spots are filled, the cohort closes. Reserve your spot early to avoid missing the next cohort." },
  { q: "What should I bring and what should I expect?", a: "Come ready to be honest, to cry, to laugh, and to be changed. Bring a journal, an open heart, and the version of yourself that's tired of where you've been. All workbooks and materials are provided. Clear your full schedule for the weekend — this is not a drop-in experience." },
  { q: "Is the $999 all-inclusive?", a: "The $999 investment covers both days of the intensive, all workbooks and materials, and 60 days of post-intensive group support. Travel and accommodation are the responsibility of the participant." },
  { q: "What is the refund policy?", a: "Retreat registrations are non-refundable. However, if something comes up and you cannot attend, your registration can be transferred to a future cohort date at no additional cost. We honor your investment and your commitment — we simply ask that you reschedule rather than cancel." },
];

const retreatPhotos = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", label: "Circle of Healing", large: true },
  { src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80", label: "Guided Meditation", large: false },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80", label: "Retreat in Nature", large: false },
  { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80", label: "Breathwork & Release", large: false },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80", label: "Sound Bath Healing", large: false },
  { src: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80", label: "Forest Reflection Walk", large: false },
];

const HealingIntensive = () => {
  useSEO({
    title: "Healing Intensive Weekend — 2-Day Immersive Breakthrough with Sarah Adams",
    description: "Compress months of healing into one transformative weekend. Small group (max 16), full L.A.T.T. framework, in-person. $999. Led by Sarah Adams.",
    keywords: "healing intensive weekend women, 2 day healing retreat, women's healing intensive, generational healing retreat, transformation weekend women, Sarah Adams healing intensive",
    breadcrumbs: [
      { name: "Coaching Programs", url: "/programs" },
      { name: "Healing Intensive Weekend", url: "/programs/healing-intensive" },
    ],
  });

  return (
    <div>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-[-80px] right-[-60px] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.15), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
            <ArrowLeft size={14} /> All Programs
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div className="ornament-line !w-8" />
            <span className="text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              Accelerated Breakthrough · 2 Days
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 letter-tight leading-tight">
            Healing Intensive<br />
            <span className="neon-text italic">Weekend</span>
          </h1>
          <p className="text-white/60 text-xl mb-4 max-w-2xl leading-relaxed">
            Compress months of healing into one transformative weekend.
          </p>
          <p className="text-white/40 text-sm mb-10 font-semibold letter-luxury uppercase">
            $999 · Max 16 Women
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/apply?program=healing-intensive" className="btn-neon-solid shadow-lg">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/programs" className="btn-neon-outline">
              View All Programs
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: Calendar, label: "2 Full Days" },
              { icon: Users, label: "Max 16 Women" },
              { icon: Heart, label: "Full Framework" },
              { icon: Shield, label: "60-Day Support" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} style={{ color: "#FF2DAA" }} />
                <p className="text-white text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This For You? */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Who It's For</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight" style={{ color: "#1A1A2E" }}>
              This weekend is for you if...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "You want accelerated results — you don't have months to slowly work through this. You need a concentrated, powerful breakthrough and you need it now.",
              "You are tired of slow progress — weekly calls that feel like they're circling the same mountain. You want to go deep, go fast, and come out transformed.",
              "You need focused, uninterrupted time dedicated entirely to your healing — away from your routine, your responsibilities, and the noise that keeps you stuck.",
              "You thrive in small, intimate group settings — you want the depth of personal attention in a space where every woman in the room is all-in.",
              "You want to build deep connections with like-minded women — the kind of relationships forged in shared vulnerability that last far beyond the weekend itself.",
              "You are ready for the full framework in an intensive format — Lead in Love, Accountability, Triggers, and Teaching — delivered in two complete, powerful days.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-[#F6F6F8]">
                <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Weekend Experience */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.06), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>The Experience</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              The Weekend, Hour by Hour
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              Nothing is random. Every block of time is designed to move you from where you are to where you're called to be.
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {schedule.map(({ time, title, desc }) => (
              <div key={time} className="flex gap-6 p-7 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex-shrink-0 w-32 hidden sm:block">
                  <span className="text-[10px] font-bold letter-luxury uppercase leading-tight block" style={{ color: "#FF2DAA" }}>{time}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold letter-luxury uppercase leading-tight block mb-1 sm:hidden" style={{ color: "#FF2DAA" }}>{time}</span>
                  <h3 className="font-heading text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Everything Included</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl letter-tight" style={{ color: "#1A1A2E" }}>
              What's Included in Your Investment
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-border p-10 md:p-14">
            <div className="space-y-4 mb-10">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-1" style={{ color: "#FF2DAA" }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>$999</p>
                <p className="text-muted-foreground text-xs mt-1">Maximum 16 women per cohort · Payment plans available</p>
              </div>
              <Link to="/apply?program=healing-intensive" className="btn-neon-solid shadow-lg">
                Reserve Your Spot <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
        />
        <div className="container-wide relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Inside the Retreat</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight">
              What Transformation Looks Like
            </h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto text-base leading-relaxed">
              Healing happens in circle, in nature, and in community. A glimpse into the sacred space we create.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Large featured image */}
            <div className="col-span-2 md:col-span-2 row-span-1 md:row-span-2 relative overflow-hidden rounded-2xl group" style={{ minHeight: "280px" }}>
              <img
                src={retreatPhotos[0].src}
                alt={retreatPhotos[0].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "280px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-xs font-bold letter-luxury uppercase">{retreatPhotos[0].label}</span>
            </div>
            {/* Smaller images */}
            {retreatPhotos.slice(1).map((photo) => (
              <div key={photo.src} className="relative overflow-hidden rounded-2xl group" style={{ minHeight: "180px" }}>
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "180px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold letter-luxury uppercase">{photo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, rgba(255,45,170,0.08), rgba(217,31,144,0.04))" }}>
        <div className="container-narrow text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FF2DAA" style={{ color: "#FF2DAA" }} className="mx-0.5" />)}
          </div>
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl letter-tight leading-snug mb-8" style={{ color: "#1A1A2E" }}>
            "The Healing Intensive weekend was the most powerful 48 hours of my life. I walked in as one woman and left as another. No exaggeration."
          </blockquote>
          <p className="font-bold text-sm" style={{ color: "#FF2DAA" }}>Yolanda J.</p>
          <p className="text-muted-foreground text-xs mt-1">Healing Intensive Graduate</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Questions & Answers</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl letter-tight" style={{ color: "#1A1A2E" }}>What You're Wondering</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-[#F6F6F8] rounded-2xl border border-border p-7 md:p-8">
                <h3 className="font-heading text-lg font-bold mb-3" style={{ color: "#1A1A2E" }}>{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
        />
        <div className="container-narrow text-center relative z-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="ornament-line !w-8" />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Limited Spots</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-white letter-tight mb-5">
            The next Healing Intensive<br />is forming now. Only 16 spots.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            This is not a conference. This is not a workshop. This is two days of sacred, intimate, life-altering work — and only 16 women will be in that room.
          </p>
          <Link to="/apply?program=healing-intensive" className="btn-neon-solid shadow-lg">
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <EmailCapture variant="fullwidth" source="programs-healing-intensive" />
    </div>
  );
};

export default HealingIntensive;
