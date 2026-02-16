import EmailCapture from "@/components/sections/EmailCapture";
import { BookOpen, Heart, Sparkles, Shield } from "lucide-react";

const FreeGuide = () => (
  <div>
    <section className="section-padding hero-gradient-bg relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-[-100px] right-[-100px]" />
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="ornament-line !w-8 !mx-0" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Free Resource</p>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl mb-8 leading-[1.1] letter-tight">
            The Healing &<br />
            <span className="italic font-display gold-text">Alignment</span> Starter Guide
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Your first step toward freedom doesn't have to be scary. This free guide will help you identify where you are on your healing journey and give you the tools to take your very first step — with faith, clarity, and confidence.
          </p>
          <div className="mb-6">
            <EmailCapture variant="hero" />
          </div>
          <div className="flex items-center gap-6 text-muted-foreground text-xs letter-luxury uppercase">
            <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> Instant download</span>
            <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> No spam, ever</span>
            <span className="flex items-center gap-1.5"><span className="ornament-diamond !w-1 !h-1" /> Unsubscribe anytime</span>
          </div>
        </div>
        <div className="luxury-card">
          <div className="luxury-card-inner">
            <h3 className="font-heading text-2xl mb-8 letter-tight">Inside the Guide, You'll Discover:</h3>
            <div className="space-y-8">
              {[
                { icon: BookOpen, title: "Your Healing Assessment", desc: "Identify where you are in the 4-Step Framework and what type of healing you need most." },
                { icon: Heart, title: "3 Prayers for Inner Restoration", desc: "Spirit-led prayers you can use immediately to begin releasing what you've been carrying." },
                { icon: Sparkles, title: "Prophetic Declarations", desc: "Powerful declarations to speak over your life as you step into your healing season." },
                { icon: Shield, title: "Your Next Step Roadmap", desc: "Clear guidance on how to move forward — whether through our programs, resources, or community." },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Social Proof */}
    <section className="section-padding text-center premium-border-top">
      <div className="container-narrow">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Trusted By Hundreds</p>
          <div className="ornament-line !w-8" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl mb-12 letter-tight">
          Women Are <span className="italic font-display gold-text">Already Healing</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { stat: "2,500+", label: "Guides Downloaded" },
            { stat: "500+", label: "Women Served" },
            { stat: "98%", label: "Say It Changed Their Perspective" },
          ].map((s) => (
            <div key={s.label} className="py-8">
              <p className="gold-text font-display text-5xl font-bold mb-3">{s.stat}</p>
              <div className="ornament-line !w-6 mb-3" />
              <p className="text-muted-foreground text-xs letter-luxury uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default FreeGuide;
