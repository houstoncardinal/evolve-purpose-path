import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Mic, Users, Heart, Lightbulb, Globe, CheckCircle } from "lucide-react";
import { store, SpeakingTopic, EventFormat, FAQ } from "@/lib/adminStore";

const TOPIC_ICONS = [Heart, CheckCircle, Lightbulb, Users, Globe, Mic];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  eventType: string;
  audienceSize: string;
  eventDate: string;
  message: string;
};

const Booking = () => {
  const [topics, setTopics] = useState<SpeakingTopic[]>([]);
  const [formats, setFormats] = useState<EventFormat[]>([]);
  const [faq, setFaq] = useState<FAQ[]>([]);

  useEffect(() => {
    store.getSpeakingTopics().then(setTopics);
    store.getEventFormats().then(setFormats);
    store.getFAQs().then((all) => setFaq(all.filter((f) => f.category === "booking")));
  }, []);

  useSEO({
    title: "Book Sarah Adams to Speak — Women's Conferences, Churches & Retreats",
    description: "Book Sarah Adams for your next women's conference, church event, corporate gathering, or healing retreat. Keynote topics: purpose activation, generational healing, accountability, and breaking cycles.",
    keywords: "book Sarah Adams speaker, women conference keynote speaker, faith-based keynote speaker, healing speaker women events, transformation keynote speaker, Christian motivational speaker, church conference speaker, women retreat speaker, purpose activation speaker, generational healing speaker, corporate women speaker",
    breadcrumbs: [{ name: "Book Sarah to Speak", url: "/booking" }],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://evolve2purpose.com/booking#speaking-service",
        name: "Speaking Engagements — Sarah Adams",
        description: "Sarah Adams delivers powerful, life-changing keynotes and workshops for women's conferences, church services, corporate events, retreats, and virtual summits. Her message combines raw honesty, biblical wisdom, and practical tools that leave audiences forever changed.",
        url: "https://evolve2purpose.com/booking",
        provider: { "@id": "https://evolve2purpose.com/#sarah-adams" },
        serviceType: "Speaking Engagement",
        areaServed: { "@type": "Place", name: "Worldwide" },
        audience: {
          "@type": "Audience",
          audienceType: "Women leaders, church congregations, event organizers, corporate teams, retreat planners",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://evolve2purpose.com/booking",
          serviceType: "Online Inquiry Form",
        },
        offers: {
          "@type": "Offer",
          description: "Speaking fee available upon inquiry. Submit a speaking request to check availability.",
          availability: "https://schema.org/InStock",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Speaking Topics",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "From Survival Mode to Divine Stability", description: "Breaking the grip of trauma responses and stepping into grounded, purposeful living." } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Healing the Abandonment Wounds", description: "Addressing rejection, abandonment, and betrayal — and how Christ restores what was broken." } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Discernment & Destiny", description: "How spiritual clarity and emotional healing unlock your God-given purpose." } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Becoming a Lotus", description: "Rising from the mud of your past into full bloom — identity, calling, and purpose in Christ." } },
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What topics does Sarah Adams speak on?",
            acceptedAnswer: { "@type": "Answer", text: "Sarah's signature speaking topics include: From Survival Mode to Divine Stability, Healing the Abandonment Wounds, Discernment & Destiny, Becoming a Lotus (rising from your past into full purpose), The Power of Accountability, Breaking Generational Cycles, and Turning Your Pain into a Platform." },
          },
          {
            "@type": "Question",
            name: "What types of events does Sarah Adams speak at?",
            acceptedAnswer: { "@type": "Answer", text: "Sarah speaks at women's conferences and summits, church services and revivals, corporate women's events, healing retreats and intensives, university and school events, panel discussions, and virtual webinars and online summits." },
          },
          {
            "@type": "Question",
            name: "How far in advance should we book Sarah Adams?",
            acceptedAnswer: { "@type": "Answer", text: "We recommend submitting your inquiry at least 6–8 weeks before your event to ensure availability. For larger conferences, national events, or multi-day intensives, reaching out 3–6 months in advance is strongly preferred to secure your date." },
          },
          {
            "@type": "Question",
            name: "Does Sarah Adams speak virtually as well as in person?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Sarah is available for both in-person and virtual events. She regularly delivers keynotes and workshops via livestream and online summit formats, making it accessible for events of any size worldwide." },
          },
          {
            "@type": "Question",
            name: "How do I request a speaking quote?",
            acceptedAnswer: { "@type": "Answer", text: "Submit a speaking inquiry through the form on this page. Include your event type, date, audience size, and a brief description of your vision. Sarah's team typically responds within 2–3 business days." },
          },
        ],
      },
    ],
  });
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    eventType: "",
    audienceSize: "",
    eventDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await store.addBooking({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      organization: form.organization,
      eventType: form.eventType,
      audienceSize: form.audienceSize,
      eventDate: form.eventDate,
      details: form.message,
    });
    // Also send to Netlify Forms
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "booking-inquiry",
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        organization: form.organization,
        eventType: form.eventType,
        audienceSize: form.audienceSize,
        eventDate: form.eventDate,
        message: form.message,
      }).toString(),
    }).catch(() => {});
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#F6F6F8] border border-border rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200";
  const inputFocusStyle = { "--tw-ring-color": "#FF2DAA" } as React.CSSProperties;

  return (
    <div>
      {/* Hero */}
      <section className="section-padding hero-gradient-bg relative overflow-hidden text-center">
        <div className="glow-orb w-[600px] h-[600px] top-[-150px] right-[-100px]" />
        <div className="container-narrow relative z-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Speaking Engagements</p>
            <div className="ornament-line !w-8" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight letter-tight">
            Book <span className="neon-text italic">Sarah Adams</span><br />
            for Your Next Event
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Sarah brings a rare combination of raw honesty, practical wisdom, and genuine heart to every stage. Her message moves audiences from passive listening to active transformation.
          </p>
          <a
            href="#inquiry"
            className="btn-neon-solid shadow-lg"
          >
            Submit a Speaking Inquiry <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 premium-border-top bg-[#F6F6F8]">
        <div className="container-wide px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "500+", label: "Lives Transformed" },
            { stat: "50+", label: "Events Delivered" },
            { stat: "10+", label: "Years of Experience" },
            { stat: "100%", label: "Audience Satisfaction" },
          ].map((item) => (
            <div key={item.label}>
              <p className="neon-text font-heading text-4xl font-bold mb-1">{item.stat}</p>
              <p className="text-muted-foreground text-xs letter-luxury uppercase font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] top-[-100px] left-[40%]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Signature Topics</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">What Sarah Speaks On</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Each topic is rooted in real experience and designed to leave your audience with clarity, tools, and momentum.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, i) => {
              const Icon = TOPIC_ICONS[i % TOPIC_ICONS.length];
              return (
                <div key={topic.id} className="luxury-card">
                  <div className="luxury-card-inner">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(255,45,170,0.08)" }}
                    >
                      <Icon size={20} style={{ color: "#FF2DAA" }} />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{topic.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Formats */}
      <section className="section-padding bg-[#F6F6F8] relative overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="ornament-line !w-8 !mx-0" />
                <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Event Formats</p>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl mb-8 letter-tight">
                Flexible for Every <span className="italic neon-text">Stage & Setting</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Whether you're hosting an intimate workshop or a large-scale conference, Sarah adapts her delivery to create maximum impact for your specific audience and context.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formats.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-start gap-3 bg-white rounded-xl border border-border p-5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: "#FF2DAA" }}
                    />
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground">{f.label}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote block */}
            <div
              className="rounded-3xl p-10 text-white relative overflow-hidden"
              style={{ backgroundColor: "#0B0B0F" }}
            >
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,45,170,0.18), transparent 70%)" }}
              />
              <p
                className="font-heading text-xs font-bold letter-luxury uppercase mb-6 relative z-10"
                style={{ color: "#FF2DAA" }}
              >
                Sarah Adams — Speaker
              </p>
              <blockquote className="font-heading text-xl md:text-2xl leading-snug text-white mb-8 relative z-10 font-semibold">
                "I don't just speak at events — I create experiences that stay with your audience long after they leave the room."
              </blockquote>
              <div className="w-10 h-px mb-5 relative z-10" style={{ background: "#FF2DAA" }} />
              <div className="flex flex-col gap-2 relative z-10">
                {["Transparent & Real", "Practical & Actionable", "High-Energy & Heartfelt"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-white/60 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: "#FF2DAA" }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="section-padding relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="container-narrow relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Get in Touch</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-5 letter-tight">Submit a Speaking Inquiry</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Fill out the form below and Sarah's team will be in touch within 2–3 business days.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(255,45,170,0.1)" }}
              >
                <CheckCircle size={36} style={{ color: "#FF2DAA" }} />
              </div>
              <h3 className="font-heading text-3xl mb-4 letter-tight">Inquiry Received!</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                Thank you for reaching out. Sarah's team will review your inquiry and respond within 2–3 business days.
              </p>
              <Link to="/" className="btn-neon-solid shadow-lg">
                Back to Home <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form
              name="booking-inquiry"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm"
            >
              <input type="hidden" name="form-name" value="booking-inquiry" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Organization / Event Name *</label>
                <input
                  type="text"
                  name="organization"
                  required
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Your organization or conference name"
                  className={inputClass}
                  style={inputFocusStyle}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Event Type *</label>
                  <select
                    name="eventType"
                    required
                    value={form.eventType}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  >
                    <option value="">Select type</option>
                    <option>Conference / Summit</option>
                    <option>Corporate Event</option>
                    <option>Workshop</option>
                    <option>Church / Faith Event</option>
                    <option>Retreat</option>
                    <option>University / School</option>
                    <option>Virtual / Webinar</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Audience Size</label>
                  <select
                    name="audienceSize"
                    value={form.audienceSize}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  >
                    <option value="">Select size</option>
                    <option>Under 50</option>
                    <option>50 – 200</option>
                    <option>200 – 500</option>
                    <option>500 – 1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputFocusStyle}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold letter-luxury uppercase mb-2 text-foreground">Tell Us About Your Event *</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share your vision for the event, your audience's needs, and any specific topics or outcomes you'd like Sarah to address..."
                  className={`${inputClass} resize-none`}
                  style={inputFocusStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full btn-neon-solid !py-5 !text-sm shadow-lg"
              >
                Submit Speaking Inquiry <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F6F6F8]">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="ornament-line !w-8" />
              <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">FAQs</p>
              <div className="ornament-line !w-8" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl letter-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-border p-7 md:p-8">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
