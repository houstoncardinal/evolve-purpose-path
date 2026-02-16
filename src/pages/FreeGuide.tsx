import EmailCapture from "@/components/sections/EmailCapture";
import { BookOpen, Heart, Sparkles, Shield } from "lucide-react";

const FreeGuide = () => (
  <div>
    <section className="section-padding bg-card">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Free Resource</p>
          <h1 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">
            The Healing &<br />
            <span className="italic font-display">Alignment</span> Starter Guide
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Your first step toward freedom doesn't have to be scary. This free guide will help you identify where you are on your healing journey and give you the tools to take your very first step — with faith, clarity, and confidence.
          </p>
          <div className="mb-8">
            <EmailCapture variant="hero" />
          </div>
          <p className="text-muted-foreground text-xs">
            ✦ Instant download &nbsp; ✦ No spam, ever &nbsp; ✦ Unsubscribe anytime
          </p>
        </div>
        <div className="bg-secondary rounded-2xl p-10 md:p-12">
          <h3 className="font-heading text-2xl mb-6">Inside the Guide, You'll Discover:</h3>
          <div className="space-y-6">
            {[
              { icon: BookOpen, title: "Your Healing Assessment", desc: "Identify where you are in the 4-Step Framework and what type of healing you need most." },
              { icon: Heart, title: "3 Prayers for Inner Restoration", desc: "Spirit-led prayers you can use immediately to begin releasing what you've been carrying." },
              { icon: Sparkles, title: "Prophetic Declarations", desc: "Powerful declarations to speak over your life as you step into your healing season." },
              { icon: Shield, title: "Your Next Step Roadmap", desc: "Clear guidance on how to move forward — whether through our programs, resources, or community." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
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
    </section>

    {/* Social Proof */}
    <section className="section-padding text-center">
      <div className="container-narrow">
        <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Trusted By Hundreds</p>
        <h2 className="font-heading text-3xl md:text-4xl mb-8">
          Women Are <span className="italic font-display">Already Healing</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: "2,500+", label: "Guides Downloaded" },
            { stat: "500+", label: "Women Served" },
            { stat: "98%", label: "Say It Changed Their Perspective" },
          ].map((s) => (
            <div key={s.label} className="py-6">
              <p className="gold-text font-display text-4xl font-bold mb-1">{s.stat}</p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default FreeGuide;
