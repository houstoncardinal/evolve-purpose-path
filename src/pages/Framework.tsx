import { Link } from "react-router-dom";
import EmailCapture from "@/components/sections/EmailCapture";
import useSEO from "@/hooks/useSEO";
import { ArrowRight } from "lucide-react";

const frameworkSteps = [
  {
    num: "01",
    title: "Lead in Love",
    subtitle: "Choose Alignment Over Reaction",
    description: "When you choose love over reaction, you step into divine alignment instead of emotional chaos. Leading in love doesn't mean weakness — it means trusting that peace will protect what pride would destroy.",
    experience: "Through guided reflection and intentional practice, you'll discover how to respond from a place of grounded love rather than reactive emotion. You'll identify the patterns that have caused you to lead with pride or fear, and begin replacing them with responses rooted in peace and purpose.",
    outcome: "Alignment. You'll find that the right relationships, opportunities, and clarity flow naturally when you stop forcing and start leading with love. What once felt like conflict begins to transform into genuine connection.",
    forWho: "Anyone who finds themselves constantly reacting — to others, to circumstances, to their own emotions — and is ready to break the cycle by leading from a place of intention.",
  },
  {
    num: "02",
    title: "Take Accountability for Your Action",
    subtitle: "Ownership Is the Beginning of Transformation",
    description: "Growth begins when you stop pointing fingers and start taking ownership. Accountability isn't about guilt — it's about maturity, healing, and the courage to see where you can evolve.",
    experience: "We explore the patterns of avoidance and blame that have kept you stuck. Through honest self-assessment and compassionate inquiry, you'll develop the clarity to see your role in your story — not to condemn yourself, but to empower yourself with the truth that sets you free.",
    outcome: "Freedom from the victimhood cycle. When you own your actions, you reclaim your power. You stop waiting for others to change and start making the changes that actually transform your life.",
    forWho: "Those who recognize a pattern of deflecting, blaming, or minimizing their role in difficult situations — and who are ready to step into the maturity that real growth requires.",
  },
  {
    num: "03",
    title: "Learn from Your Actions & Manage Your Triggers",
    subtitle: "Your Triggers Are Teachers, Not Life Sentences",
    description: "Every reaction reveals a wound that still needs your attention. When you learn from your mistakes and manage your triggers, you break the cycles that once controlled you.",
    experience: "We dive deep into the emotional responses that have been running on autopilot. You'll identify your core triggers, understand their origin, and build practical tools to pause, process, and respond — rather than react and regret.",
    outcome: "Mastery. You'll no longer feel at the mercy of your emotions. You'll develop the inner stability to navigate hard conversations, difficult seasons, and unexpected challenges with grace and intention.",
    forWho: "Anyone who struggles with emotional reactivity, who says things they don't mean, or who finds the same patterns of conflict appearing repeatedly in their relationships and circumstances.",
  },
  {
    num: "04",
    title: "Teach Someone Else What You Just Learned",
    subtitle: "Your Story Is Someone Else's Survival Guide",
    description: "Healing becomes wisdom when it's shared. The lessons you've lived through can become someone else's breakthrough — that's how purpose is born.",
    experience: "In this final step, you move from student to guide. You'll discover how to articulate what you've learned, identify who needs your message, and step into the role of mentor, teacher, or simply a friend who shows up differently than before.",
    outcome: "Purpose activated. When you share your journey, you don't just help others — you cement your own transformation. The act of teaching what you've learned locks it into your identity and gives your pain a reason.",
    forWho: "Those who have done the inner work and are ready to turn their personal growth into something that serves others — whether through a business, ministry, or simply in their everyday relationships.",
  },
];

const Framework = () => {
  useSEO({
    title: "The 4-Step Transformation Framework — Lead in Love, Heal, Teach",
    description: "Discover Sarah Adams' complete 4-Step System to break generational cycles: Lead in Love, Take Accountability, Manage Your Triggers, and Teach Others. A proven roadmap for lasting transformation.",
    keywords: "4 step transformation framework, lead in love framework, take accountability personal growth, manage emotional triggers, teach others your healing, healing framework women, Sarah Adams 4 step system, life transformation steps, break cycles framework, purpose activation framework",
    breadcrumbs: [{ name: "The 4-Step Framework", url: "/framework" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "The 4-Step System to Transform Your Life",
        description: "A proven four-step personal development framework created by Sarah Adams to help women break generational cycles, heal their emotional roots, and activate lasting purpose.",
        url: "https://evolve2purpose.com/framework",
        author: { "@id": "https://evolve2purpose.com/#sarah-adams" },
        totalTime: "P3M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0", description: "Free guide available. Coaching programs start at $197." },
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Step 1: Lead in Love",
            text: "Choose alignment over reaction. Leading in love means trusting that peace will protect what pride would destroy. When you choose love over ego, you step into divine alignment instead of emotional chaos. This is the foundation that makes every other step possible.",
            url: "https://evolve2purpose.com/framework#step-1",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Step 2: Take Accountability for Your Actions",
            text: "Stop waiting for someone else to fix what only you can fix. Ownership is where transformation begins — not blame, not excuses, but radical responsibility for your own growth. Accountability isn't about guilt; it's about reclaiming your power to change.",
            url: "https://evolve2purpose.com/framework#step-2",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Step 3: Learn from Your Actions & Manage Your Triggers",
            text: "Your emotional reactions are data, not destiny. Learn to trace them back to their roots — wounds, beliefs, and patterns formed long ago — and begin to respond instead of react. Every trigger is a teacher pointing you toward deeper healing.",
            url: "https://evolve2purpose.com/framework#step-3",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Step 4: Teach Someone Else What You Just Learned",
            text: "Your healing was never just for you. When you share what you have learned, you multiply your impact, solidify your own growth, and become the very person someone else desperately needed. This is how purpose is born — your story becomes someone else's survival guide.",
            url: "https://evolve2purpose.com/framework#step-4",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "The 4-Step Transformation Framework",
        description: "Sarah Adams' complete personal development system for breaking generational cycles, healing emotional roots, and walking in purpose.",
        provider: { "@id": "https://evolve2purpose.com/#organization" },
        instructor: { "@id": "https://evolve2purpose.com/#sarah-adams" },
        url: "https://evolve2purpose.com/framework",
        educationalLevel: "All levels",
        teaches: [
          "How to lead with love instead of reaction",
          "How to take accountability and break blame cycles",
          "How to identify and manage emotional triggers",
          "How to turn personal healing into purpose and impact for others",
        ],
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT2H",
        },
      },
    ],
  });
  return (
  <div>
    {/* Hero */}
    <section className="section-padding hero-gradient-bg text-center relative overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="ornament-line !w-8" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">The Signature Process</p>
          <div className="ornament-line !w-8" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl mb-6 leading-tight letter-tight">
          Transform Your Life in<br />
          <span className="italic neon-text">4 Steps</span>
        </h1>
        <p className="text-muted-foreground text-xs font-semibold letter-luxury uppercase mb-2">By Sarah Adams</p>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mt-4">
          A proven, practical pathway built on love, accountability, self-awareness, and service. This is not surface-level coaching. This is root-level transformation.
        </p>
      </div>
    </section>

    {/* Steps */}
    {frameworkSteps.map((step, i) => (
      <section key={step.num} className={`section-padding relative overflow-hidden ${i % 2 === 0 ? "" : "bg-[#F6F6F8]"}`}>
        <div className="glow-orb w-[300px] h-[300px] top-[20%] right-[-50px] opacity-50" />
        <div className="container-wide max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <span
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-none"
              style={{ color: "#FF2DAA" }}
            >
              {step.num}
            </span>
            <div className="pt-2 md:pt-4">
              <h2 className="font-heading text-4xl md:text-5xl letter-tight">{step.title}</h2>
              <p
                className="italic font-heading text-xl mt-2"
                style={{ color: "#FF2DAA" }}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{step.description}</p>
              <div className="ornament-line !w-12 !mx-0 mb-6" />
              <h4 className="font-heading text-lg mb-3">What You'll Experience</h4>
              <p className="text-muted-foreground leading-relaxed text-base">{step.experience}</p>
            </div>
            <div className="space-y-6">
              <div className="luxury-card">
                <div className="luxury-card-inner">
                  <h4 className="font-heading text-lg mb-3">The Transformation</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.outcome}</p>
                </div>
              </div>
              <div className="luxury-card">
                <div className="luxury-card-inner">
                  <h4 className="font-heading text-lg mb-3">This Step Is For You If…</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.forWho}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="section-padding text-center relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-narrow relative z-10">
        <div className="ornament-line-wide mb-8" />
        <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Ready to Begin Your Transformation?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
          The framework is proven. The path is clear. All that's missing is your first step.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/evolve-2-purpose" className="btn-neon-outline">
            Explore Evolve 2 Purpose
          </Link>
          <Link to="/programs" className="btn-neon-solid shadow-lg">
            Work With Sarah Adams <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    <EmailCapture variant="fullwidth" source="framework" />
  </div>
);
};

export default Framework;
