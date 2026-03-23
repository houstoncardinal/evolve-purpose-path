import { useState, useEffect } from "react";
import useSEO from "@/hooks/useSEO";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Bell,
  BookOpen,
  Users,
  Lock,
  CheckCircle,
  Heart,
  Video,
  CreditCard,
  ShoppingBag,
  Shield,
} from "lucide-react";

type CheckoutStep = "idle" | "checkout" | "processing" | "success";

const features = [
  {
    icon: Bell,
    title: "Direct Updates from Sarah",
    desc: "Get exclusive posts, voice notes, and insights from Sarah — shared only inside the community.",
  },
  {
    icon: Calendar,
    title: "Live Events & Classes",
    desc: "Join virtual workshops, Q&A sessions, and live teachings on the calendar every month.",
  },
  {
    icon: MessageCircle,
    title: "Member Chat & Connection",
    desc: "Chat with other members, share wins, ask questions, and build real relationships.",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    desc: "Access exclusive guides, workbooks, audio teachings, and framework deep-dives.",
  },
  {
    icon: Video,
    title: "Replay Archive",
    desc: "Never miss a session. Every live event is recorded and stored for members to revisit anytime.",
  },
  {
    icon: Heart,
    title: "Accountability Circles",
    desc: "Small group accountability pods to help you stay committed to your transformation journey.",
  },
];

const mockPosts = [
  {
    avatar: "SA",
    author: "Sarah Adams",
    badge: "Founder",
    time: "2 hours ago",
    content:
      "Today I want to talk about something most people skip: the moment AFTER the breakthrough. The real work starts when the high fades and the new habit has to hold. Here's what I've learned about staying committed when the feeling is gone...",
    likes: 48,
    comments: 12,
  },
  {
    avatar: "TJ",
    author: "Tamara J.",
    badge: "Member",
    time: "Yesterday",
    content:
      "Huge win this week — I caught myself about to react from fear in a conversation with my sister and I PAUSED. I actually paused, took a breath, and led with love. Three months ago that would've been a full-blown argument. This framework is changing me from the inside out. 🙏",
    likes: 62,
    comments: 19,
  },
  {
    avatar: "MR",
    author: "Michelle R.",
    badge: "Member",
    time: "2 days ago",
    content:
      "Does anyone else feel like they're finally becoming the version of themselves they always knew existed? That's where I am right now. Accountability Circle session yesterday was exactly what I needed. Thank you all.",
    likes: 35,
    comments: 8,
  },
];

const upcomingEvents = [
  {
    date: "MAR 15",
    title: "Live Q&A: Managing Triggers in Hard Relationships",
    type: "Live Session",
    time: "7:00 PM EST",
  },
  {
    date: "MAR 22",
    title: "Workshop: Building Your Personal Accountability System",
    type: "Workshop",
    time: "6:00 PM EST",
  },
  {
    date: "APR 3",
    title: "Community Call: Celebrating Your Wins",
    type: "Community Call",
    time: "7:00 PM EST",
  },
];

const Community = () => {
  useSEO({
    title: "Join the Community — Private Women's Transformation Network",
    description: "Join 1,200+ women in the Evolve 2 Purpose private community — direct access to Sarah Adams, live monthly events, accountability circles, resource library, and a safe space to grow.",
    keywords: "women empowerment community online, private purpose community women, healing community online women, accountability community women, women transformation group, online community for healing women, evolve 2 purpose community membership, Sarah Adams community, women's spiritual growth community, private coaching community women",
    breadcrumbs: [{ name: "Join the Community", url: "/community" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://evolve2purpose.com/community#community",
        name: "Evolve 2 Purpose Community",
        description: "A private membership community for 1,200+ women committed to breaking generational cycles, living in love and accountability, and walking in purpose — with direct access to Sarah Adams, live events, and an exclusive resource library.",
        url: "https://evolve2purpose.com/community",
        founder: { "@id": "https://evolve2purpose.com/#sarah-adams" },
        parentOrganization: { "@id": "https://evolve2purpose.com/#organization" },
        memberOf: { "@id": "https://evolve2purpose.com/#organization" },
        numberOfEmployees: { "@type": "QuantitativeValue", value: 1200, description: "1,200+ active members" },
        keywords: "women's community, healing community, purpose community, accountability group, women empowerment",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in the Evolve 2 Purpose community membership?",
            acceptedAnswer: { "@type": "Answer", text: "Membership includes: direct posts and voice notes from Sarah Adams, 4+ monthly live events and workshops, member chat and community feed, full resource and replay library, accountability circle placement, and access to exclusive guides and workbooks." },
          },
          {
            "@type": "Question",
            name: "Who is the Evolve 2 Purpose community for?",
            acceptedAnswer: { "@type": "Answer", text: "The community is for women who are actively working on their personal and spiritual growth — those committed to breaking generational cycles, healing their roots, and living with love, accountability, and purpose. Membership is by application to keep the space intentional and safe." },
          },
          {
            "@type": "Question",
            name: "How is this different from a Facebook group?",
            acceptedAnswer: { "@type": "Answer", text: "This is a dedicated, curated space — not a social media group. Sarah shows up personally, content is intentional, events are structured, and accountability is built in. It's designed for transformation, not scrolling." },
          },
        ],
      },
    ],
  });
  const [searchParams] = useSearchParams();
  const justSubscribed = searchParams.get("subscribed") === "true";

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState("");

  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(justSubscribed ? "success" : "idle");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
  }, []);

  // Kick off checkout — calls Netlify function; if Stripe configured redirects to Stripe,
  // otherwise enters the demo checkout flow
  const handleSubscribe = async () => {
    setSubLoading(true);
    setSubError("");
    const origin = window.location.origin;
    try {
      const res = await fetch("/.netlify/functions/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email ?? "",
          successUrl: `${origin}/community?subscribed=true`,
          cancelUrl: `${origin}/community`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        // Stripe configured — redirect to hosted checkout
        window.location.href = data.url;
      } else if (data.demo) {
        // Stripe not configured yet — show in-page checkout flow
        setCheckoutEmail(user?.email ?? "");
        setCheckoutStep("checkout");
        setSubLoading(false);
        setTimeout(() => document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setSubError(data.error ?? "Something went wrong. Please try again.");
        setSubLoading(false);
      }
    } catch {
      setSubError("Network error. Please check your connection and try again.");
      setSubLoading(false);
    }
  };

  // Demo checkout submit — simulates processing then shows success
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");
    if (!checkoutEmail.trim()) { setCheckoutError("Please enter your email address."); return; }
    if (cardNumber.replace(/\s/g, "").length < 16) { setCheckoutError("Please enter a complete card number."); return; }
    if (cardExpiry.length < 5) { setCheckoutError("Please enter a valid expiry date (MM/YY)."); return; }
    if (cardCvv.length < 3) { setCheckoutError("Please enter your security code (CVV)."); return; }
    setCheckoutStep("processing");
    await new Promise((r) => setTimeout(r, 1800));
    setCheckoutStep("success");
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden text-center hero-gradient-bg">
        <div className="glow-orb w-[600px] h-[600px] top-[-200px] right-[-100px]" />
        <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] left-[-50px]" />
        <div className="container-narrow relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-bold letter-luxury uppercase" style={{ borderColor: "rgba(255,45,170,0.3)", color: "#FF2DAA", background: "rgba(255,45,170,0.05)" }}>
            <Lock size={11} />
            Private Members Community
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight letter-tight">
            Your Private Space to{" "}
            <span className="neon-text italic">Grow, Connect,</span>
            <br />
            and Be Seen
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            The Evolve 2 Purpose Community is an exclusive, members-only space where Sarah shows up personally, members hold each other accountable, and transformation happens in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#join" className="btn-neon-solid shadow-lg">
              Join the Community <ArrowRight size={16} />
            </a>
            <a href="#preview" className="border border-border text-foreground px-10 py-4 rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all duration-300">
              See Inside First
            </a>
          </div>
        </div>
      </section>

      {/* Member stats */}
      <section className="py-10 bg-[#F6F6F8] premium-border-top">
        <div className="container-wide px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "1,200+", label: "Active Members" },
            { stat: "4×", label: "Monthly Live Events" },
            { stat: "24/7", label: "Member Chat Access" },
            { stat: "100+", label: "Resource Library Items" },
          ].map((item) => (
            <div key={item.label}>
              <p className="neon-text font-heading text-4xl font-bold mb-1">{item.stat}</p>
              <p className="text-muted-foreground text-xs letter-luxury uppercase font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] top-[-100px] left-[40%]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">What's Included</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Everything Inside the Community</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              This isn't a Facebook group. It's a dedicated, curated space built entirely for your growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="luxury-card">
                  <div className="luxury-card-inner">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(255,45,170,0.08)" }}
                    >
                      <Icon size={20} style={{ color: "#FF2DAA" }} />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community preview */}
      <section id="preview" className="section-padding bg-[#F6F6F8] relative overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Inside Look</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">A Peek Inside the Community</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Real conversations. Real people. Real transformation happening every day.
            </p>
          </div>

          {/* Mock community feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed posts */}
            <div className="lg:col-span-2 space-y-5">
              {mockPosts.map((post, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: i === 0 ? "#FF2DAA" : "#0B0B0F" }}
                    >
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-bold text-sm text-foreground">{post.author}</span>
                        <span
                          className="text-[10px] font-bold letter-luxury uppercase px-2 py-0.5 rounded-full"
                          style={
                            i === 0
                              ? { background: "rgba(255,45,170,0.1)", color: "#FF2DAA" }
                              : { background: "#F6F6F8", color: "#666" }
                          }
                        >
                          {post.badge}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs mt-0.5">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-5">{post.content}</p>
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Heart size={14} />
                      {post.likes} likes
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle size={14} />
                      {post.comments} comments
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar: Events + Members */}
            <div className="space-y-5">
              {/* Upcoming events */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Calendar size={16} style={{ color: "#FF2DAA" }} />
                  <h3 className="font-heading text-sm font-bold">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="flex-shrink-0 text-center w-12"
                      >
                        <p
                          className="text-[10px] font-bold letter-luxury uppercase"
                          style={{ color: "#FF2DAA" }}
                        >
                          {event.date.split(" ")[0]}
                        </p>
                        <p className="font-heading font-bold text-lg leading-none">
                          {event.date.split(" ")[1]}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-heading text-xs font-bold text-foreground leading-snug mb-1">{event.title}</p>
                        <p className="text-muted-foreground text-[11px]">{event.type} · {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online members widget */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} style={{ color: "#FF2DAA" }} />
                  <h3 className="font-heading text-sm font-bold">Members Online</h3>
                  <span
                    className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,45,170,0.1)", color: "#FF2DAA" }}
                  >
                    238 now
                  </span>
                </div>
                <div className="flex -space-x-2 mb-4">
                  {["TJ", "MR", "DW", "AL", "KP", "SB", "NW"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: i % 2 === 0 ? "#0B0B0F" : "#FF2DAA" }}
                    >
                      {initials}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F6F6F8] flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    +231
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Join over 1,200 members growing together every day.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8 italic">
            Community preview — full access unlocked when you join.
          </p>
        </div>
      </section>

      {/* Join / Subscribe / Checkout */}
      <section id="join" className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[-100px] left-[30%]" />
        <div className="container-narrow relative z-10">

          {/* ── SUCCESS ── */}
          {checkoutStep === "success" && (
            <div className="text-center py-16 max-w-lg mx-auto">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-7"
                style={{ background: "linear-gradient(135deg, #FF2DAA22, #FF2DAA11)", border: "1.5px solid rgba(255,45,170,0.3)" }}>
                <CheckCircle size={42} style={{ color: "#FF2DAA" }} />
              </div>
              <p className="text-[10px] font-bold letter-luxury uppercase mb-3" style={{ color: "#FF2DAA" }}>You're In</p>
              <h3 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Welcome to the Community!</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 leading-relaxed">
                Your membership is active. Check your email for access details — we'll have you inside within 24 hours.
              </p>
              <div className="rounded-2xl p-6 mb-10 text-left" style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold letter-luxury uppercase text-muted-foreground mb-4">What happens next</p>
                {[
                  { n: "01", t: "Check your inbox for a confirmation email." },
                  { n: "02", t: "You'll receive your community access link within 24 hours." },
                  { n: "03", t: "Introduce yourself inside and meet the community." },
                ].map((item) => (
                  <div key={item.n} className="flex items-start gap-4 mb-3 last:mb-0">
                    <span className="font-heading text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }}>{item.n}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.t}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/account" className="btn-neon-solid shadow-lg">
                  My Account <ArrowRight size={16} />
                </Link>
                <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* ── PRICING CARD (idle) ── */}
          {checkoutStep === "idle" && (
            <>
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="ornament-line !w-8" />
                  <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Join Now</p>
                  <div className="ornament-line !w-8" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Join the Community</h2>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                  A private, members-only space for women committed to real transformation — direct access to Sarah, live events, and community built to last.
                </p>
              </div>

              <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-8 pt-8 pb-6 border-b border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[10px] font-bold letter-luxury uppercase mb-1" style={{ color: "#FF2DAA" }}>Monthly Membership</p>
                        <h3 className="font-heading text-2xl font-bold">Evolve 2 Purpose Community</h3>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-heading text-4xl font-bold leading-none" style={{ color: "#FF2DAA" }}>$9.99</p>
                        <p className="text-muted-foreground text-xs mt-1">per month</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">Cancel anytime. No long-term commitment.</p>
                  </div>

                  <div className="px-8 py-6">
                    <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-4">Everything included:</p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Direct posts, voice notes & updates from Sarah",
                        "4+ live events & workshops every month",
                        "Member-to-member chat & community feed",
                        "Full resource & replay library",
                        "Accountability circle placement",
                        "Priority access to new content & announcements",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                          <CheckCircle size={14} style={{ color: "#FF2DAA" }} className="flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {subError && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium mb-4"
                        style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#ef4444" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{subError}
                      </div>
                    )}
                    <button
                      onClick={handleSubscribe}
                      disabled={subLoading}
                      className="w-full btn-neon-solid !py-5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {subLoading
                        ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Loading checkout...</>
                        : <><CreditCard size={16} /> Join for $9.99/month</>}
                    </button>
                    <p className="text-center text-muted-foreground text-xs mt-3">
                      Secure payment · Cancel anytime from your account
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 px-6 py-4 rounded-2xl border border-border bg-[#F6F6F8]">
                  <ShoppingBag size={16} style={{ color: "#FF2DAA" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">Already purchased a product?</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Shop purchases automatically include community access. Sign in to activate it — no subscription needed.
                    </p>
                    <Link to="/account" className="inline-flex items-center gap-1 text-xs font-semibold mt-2 hover:opacity-80 transition-opacity" style={{ color: "#FF2DAA" }}>
                      Go to My Account <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── CHECKOUT FORM (demo / pre-Stripe) ── */}
          {(checkoutStep === "checkout" || checkoutStep === "processing") && (
            <div id="checkout-form" className="max-w-3xl mx-auto">
              {/* Back */}
              <button
                onClick={() => { setCheckoutStep("idle"); setCheckoutError(""); }}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold mb-8 transition-colors"
              >
                <ArrowLeft size={13} /> Back to plan
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

                {/* Order summary */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="rounded-2xl border border-border bg-[#F6F6F8] p-6 sticky top-8">
                    <p className="text-[10px] font-bold letter-luxury uppercase mb-4 text-muted-foreground">Order Summary</p>
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
                      <div>
                        <p className="font-heading text-sm font-bold">Community Membership</p>
                        <p className="text-muted-foreground text-xs mt-0.5">Evolve 2 Purpose · Monthly</p>
                      </div>
                      <p className="font-heading text-lg font-bold flex-shrink-0 ml-3" style={{ color: "#FF2DAA" }}>$9.99</p>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">$9.99</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4 pb-4 border-b border-border">
                      <span className="text-muted-foreground">Billed</span>
                      <span className="font-semibold">Monthly</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold mb-5">
                      <span>Total due today</span>
                      <span style={{ color: "#FF2DAA" }}>$9.99</span>
                    </div>
                    <ul className="space-y-2 mb-5">
                      {[
                        "Sarah's direct posts & voice notes",
                        "4+ live events every month",
                        "Member chat & resource library",
                        "Accountability circle placement",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle size={11} style={{ color: "#FF2DAA" }} className="flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Shield size={13} className="text-muted-foreground flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">Cancel anytime · No contracts</p>
                    </div>
                  </div>
                </div>

                {/* Payment form */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <h2 className="font-heading text-2xl font-bold mb-1">Complete your subscription</h2>
                  <p className="text-muted-foreground text-sm mb-7">You'll get immediate access after subscribing.</p>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    {/* Contact */}
                    <div>
                      <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-3">Contact</p>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-foreground">Email address</label>
                        <input
                          type="email"
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground mb-3">Payment details</p>
                      <div className="space-y-3">
                        {/* Card number */}
                        <div className="relative">
                          <label className="block text-xs font-semibold mb-1.5 text-foreground">Card number</label>
                          <div className="relative">
                            <input
                              type="text"
                              inputMode="numeric"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>

                        {/* Name on card */}
                        <div>
                          <label className="block text-xs font-semibold mb-1.5 text-foreground">Name on card</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Full name as it appears on card"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1.5 text-foreground">Expiry date</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1.5 text-foreground">Security code</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              placeholder="CVV"
                              maxLength={4}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {checkoutError && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium"
                        style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#ef4444" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{checkoutError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={checkoutStep === "processing"}
                      className="w-full btn-neon-solid !py-4 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {checkoutStep === "processing"
                        ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing payment...</>
                        : <><Lock size={14} /> Subscribe for $9.99/month</>}
                    </button>

                    <div className="flex items-center justify-center gap-4 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield size={12} />
                        <span>Secure & encrypted</span>
                      </div>
                      <span className="text-border">·</span>
                      <span className="text-xs text-muted-foreground">Cancel anytime</span>
                      <span className="text-border">·</span>
                      <span className="text-xs text-muted-foreground">No contracts</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="section-padding text-center relative overflow-hidden"
        style={{ backgroundColor: "#0B0B0F" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10">
          <p
            className="font-heading text-xs font-bold letter-luxury uppercase mb-6"
            style={{ color: "#FF2DAA" }}
          >
            Evolve 2 Purpose Community
          </p>
          <h2 className="font-heading text-4xl md:text-5xl mb-6 letter-tight text-white">
            You were not meant to grow alone.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Surround yourself with people who are committed to love, accountability, and becoming the fullest version of themselves — and watch what happens.
          </p>
          <a href="#join" className="btn-neon-solid shadow-lg">
            Join the Community <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Community;
