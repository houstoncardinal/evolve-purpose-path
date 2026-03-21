import { useState, useEffect } from "react";
import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Calendar,
  Bell,
  BookOpen,
  Users,
  Lock,
  CheckCircle,
  Heart,
  Video,
} from "lucide-react";

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
    title: "Join the Community",
    description: "Join the Evolve 2 Purpose private community — 1,200+ members growing together in love, accountability, and purpose. Access posts, events, and direct connection with Sarah Adams.",
    keywords: "women empowerment community, purpose community online, healing community women, accountability group women, evolve 2 purpose community, Sarah Adams community",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Evolve 2 Purpose Community",
      description: "A private membership community for women committed to living with love, accountability, and purpose — with 1,200+ active members.",
      url: "https://evolve2purpose.com/community",
      founder: { "@type": "Person", name: "Sarah Adams" },
      memberOf: { "@type": "Organization", name: "Evolve 2 Purpose" },
      numberOfMembers: 1200,
    },
  });
  const [form, setForm] = useState({ name: "", email: "", reason: "" });
  const [joined, setJoined] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to admin store so it appears in admin community applications
    initStore();
    store.addCommunityApp({
      name: form.name,
      email: form.email,
      reason: form.reason,
      appliedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    });
    setJoined(true);
  };

  const inputClass =
    "w-full bg-[#F6F6F8] border border-border rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200";

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

      {/* Join form */}
      <section id="join" className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[-100px] left-[30%]" />
        <div className="container-narrow relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Join Now</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Apply to Join the Community</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Membership is by application. We review each request to ensure the community remains a safe, intentional space for growth.
            </p>
          </div>

          {joined ? (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(255,45,170,0.1)" }}
              >
                <CheckCircle size={36} style={{ color: "#FF2DAA" }} />
              </div>
              <h3 className="font-heading text-3xl mb-4 letter-tight">Application Submitted!</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                Thank you for applying. You'll receive an email within 48 hours with next steps to access the community.
              </p>
              <Link to="/" className="btn-neon-solid shadow-lg">
                Back to Home <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">
                  What brings you here? *
                </label>
                <textarea
                  name="reason"
                  required
                  value={form.reason}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share where you are in your journey and what you're hoping to find in this community..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* What's included reminder */}
              <div className="bg-[#F6F6F8] rounded-xl p-5 mb-8">
                <p className="text-xs font-bold letter-luxury uppercase text-foreground mb-3">Your membership includes:</p>
                <ul className="space-y-2">
                  {[
                    "Direct access to Sarah's posts & updates",
                    "Monthly live events & workshops",
                    "Member-to-member chat & community feed",
                    "Full resource & replay library",
                    "Accountability circle placement",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#FF2DAA" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="submit"
                className="w-full btn-neon-solid !py-5 !text-sm shadow-lg"
              >
                Submit My Application <ArrowRight size={16} />
              </button>
              <p className="text-center text-muted-foreground text-xs mt-4">
                We review applications within 24–48 hours. You'll receive an email confirmation.
              </p>
            </form>
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
