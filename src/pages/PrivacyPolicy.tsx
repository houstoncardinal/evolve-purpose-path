import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Shield, Lock, Eye, Trash2, Database, Bell } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const toc = [
  { id: "overview",        label: "Overview" },
  { id: "collection",      label: "Information We Collect" },
  { id: "use",             label: "How We Use Your Information" },
  { id: "sharing",         label: "Sharing Your Information" },
  { id: "cookies",         label: "Cookies & Tracking" },
  { id: "security",        label: "Data Security" },
  { id: "retention",       label: "Data Retention" },
  { id: "rights",          label: "Your Rights" },
  { id: "third-party",     label: "Third-Party Services" },
  { id: "children",        label: "Children's Privacy" },
  { id: "changes",         label: "Policy Changes" },
  { id: "contact",         label: "Contact Us" },
];

const PrivacyPolicy = () => {
  useSEO({
    title: "Privacy Policy — Evolve 2 Purpose",
    description: "Learn how Evolve 2 Purpose collects, uses, and protects your personal information.",
    noindex: true,
  });

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(160deg, #0B0B0F 0%, #130810 60%, #0B0B0F 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.08), transparent 70%)" }}
        />
        <div className="container-narrow relative z-10 px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors mb-10"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <Shield size={16} style={{ color: "#FF2DAA" }} />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Legal</p>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white letter-tight mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/45 text-sm mb-8 max-w-xl leading-relaxed">
            At Evolve 2 Purpose, your privacy is a priority. This policy explains what information we collect, how we use it, and the choices you have.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-white/35 font-semibold letter-luxury uppercase">
            <span>Effective: January 1, 2025</span>
            <span>·</span>
            <span>Last Updated: March 2025</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-wide px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Sticky Table of Contents */}
            <aside className="lg:w-56 xl:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-32">
                <p className="text-[10px] font-bold letter-luxury uppercase text-muted-foreground mb-4">Contents</p>
                <nav className="flex flex-col gap-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 pl-3 border-l-2 border-transparent hover:border-primary/40 hover:pl-4 duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Also read:</p>
                  <Link
                    to="/terms"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity"
                    style={{ color: "#FF2DAA" }}
                  >
                    Terms of Use <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-2xl">
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-12">

                {/* 1 */}
                <div id="overview" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>01</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Overview</h2>
                  </div>
                  <p className="mb-4">
                    This Privacy Policy applies to Evolve 2 Purpose ("we," "us," or "our"), operated by Sarah Adams, and covers all information collected through our website at evolve2purpose.com, our coaching programs, digital products, and community membership services.
                  </p>
                  <p>
                    By using our website or services, you agree to the collection and use of information as described in this policy. If you do not agree, please do not use our website or services.
                  </p>
                </div>

                {/* 2 */}
                <div id="collection" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>02</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Information We Collect</h2>
                  </div>
                  <p className="mb-4 font-semibold text-foreground">Information you provide directly:</p>
                  <ul className="list-none space-y-2 mb-6 pl-0">
                    {[
                      "Name and email address — when you sign up for our free guide, join the email list, create an account, or submit a program application",
                      "Payment information — collected and processed securely by Stripe (we never store card numbers on our servers)",
                      "Application answers — when you apply for a coaching program, group class, or the Mentorship Program",
                      "Booking details — when you request a speaking engagement or discovery call",
                      "Community content — posts, responses, and messages submitted within the private community",
                      "Teaching video submissions — video links and written reflections submitted as part of the 1:1 program graduation requirement",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-4 font-semibold text-foreground">Information collected automatically:</p>
                  <ul className="list-none space-y-2 pl-0">
                    {[
                      "Usage data — pages visited, time on site, referring URLs, and navigation patterns",
                      "Device data — browser type, operating system, screen resolution, and IP address",
                      "Cookies and local storage — session identifiers and preference data (see Section 5)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 */}
                <div id="use" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>03</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">How We Use Your Information</h2>
                  </div>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-none space-y-2 pl-0">
                    {[
                      "Deliver the services, products, and content you've purchased or requested",
                      "Send you the free guide, resources, or program materials you opted in to receive",
                      "Communicate with you about your program, membership, or application status",
                      "Send occasional email updates, program announcements, and content we believe will serve your growth — you may unsubscribe at any time",
                      "Process payments and manage your subscription or purchase history",
                      "Review teaching video submissions and respond with feedback or approval",
                      "Improve our website, programs, and content based on usage patterns",
                      "Prevent fraud and maintain the security of our platform",
                      "Comply with legal obligations",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4 */}
                <div id="sharing" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>04</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Sharing Your Information</h2>
                  </div>
                  <p className="mb-4">
                    <strong className="text-foreground">We do not sell, trade, or rent your personal information.</strong> We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-none space-y-3 pl-0">
                    {[
                      { heading: "Service Providers", body: "Trusted third-party vendors who assist us in operating our website and delivering our services — including Supabase (database and authentication), Stripe (payment processing), and email service providers. These vendors are contractually bound to protect your information and may not use it for their own purposes." },
                      { heading: "Legal Requirements", body: "When required by law, court order, or government regulation, or to protect the rights, property, or safety of Evolve 2 Purpose, our clients, or others." },
                      { heading: "Business Transfers", body: "If Evolve 2 Purpose is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. You will be notified prior to your data being transferred and becoming subject to a different privacy policy." },
                      { heading: "With Your Consent", body: "In any other case, we will ask for your explicit consent before sharing your personal information." },
                    ].map((item) => (
                      <li key={item.heading} className="rounded-xl p-4 border border-border bg-[#F6F6F8]">
                        <p className="font-semibold text-foreground text-sm mb-1">{item.heading}</p>
                        <p className="text-sm">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5 */}
                <div id="cookies" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>05</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Cookies & Tracking Technologies</h2>
                  </div>
                  <p className="mb-4">
                    Our website uses cookies and similar technologies to enhance your experience and gather analytics. The types of cookies we use include:
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      { name: "Essential cookies", desc: "Required for core functionality such as keeping you signed in and remembering your preferences." },
                      { name: "Analytics cookies", desc: "Help us understand how visitors interact with our website so we can improve it." },
                      { name: "Session storage", desc: "Temporarily stores data (such as application progress) for the duration of your browser session." },
                    ].map((item) => (
                      <li key={item.name} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span><strong className="text-foreground">{item.name}:</strong> {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect your ability to use certain features of our website. We do not use cookies for targeted advertising.
                  </p>
                </div>

                {/* 6 */}
                <div id="security" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>06</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Data Security</h2>
                  </div>
                  <p className="mb-4">
                    We take reasonable and appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-none space-y-2 pl-0">
                    {[
                      "HTTPS encryption for all data transmitted between your browser and our servers",
                      "Row-level security on our database, ensuring users can only access their own data",
                      "PCI-compliant payment processing through Stripe — we never store payment card information",
                      "Secure authentication with email verification and session management",
                      "Limited access to personal data — only those with a legitimate need can access it",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. If you believe your account has been compromised, please contact us immediately.
                  </p>
                </div>

                {/* 7 */}
                <div id="retention" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>07</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Data Retention</h2>
                  </div>
                  <p className="mb-4">
                    We retain your personal information for as long as your account is active or as needed to provide our services. Specifically:
                  </p>
                  <ul className="list-none space-y-2 pl-0">
                    {[
                      "Account and program data is retained for the duration of your active relationship with us",
                      "Email subscriber data is retained until you unsubscribe or request deletion",
                      "Payment records may be retained for up to 7 years as required by tax and accounting law",
                      "Teaching video submissions are retained as part of your program record",
                      "Analytics data is retained in aggregate form and may be kept indefinitely",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    You may request deletion of your personal data at any time by contacting us at hello@evolve2purpose.com. We will fulfill deletion requests within 30 days, subject to legal retention obligations.
                  </p>
                </div>

                {/* 8 */}
                <div id="rights" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>08</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Your Rights</h2>
                  </div>
                  <p className="mb-5">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { icon: Eye, title: "Right to Access", desc: "Request a copy of the personal information we hold about you." },
                      { icon: Shield, title: "Right to Correct", desc: "Request correction of inaccurate or incomplete information." },
                      { icon: Trash2, title: "Right to Delete", desc: "Request deletion of your personal information ('right to be forgotten')." },
                      { icon: Lock, title: "Right to Restrict", desc: "Request that we limit how we use your personal data." },
                      { icon: Database, title: "Right to Portability", desc: "Receive your data in a portable, machine-readable format." },
                      { icon: Bell, title: "Right to Opt Out", desc: "Unsubscribe from marketing emails at any time via the link in any email." },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="rounded-xl p-4 bg-[#F6F6F8] border border-border">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon size={13} style={{ color: "#FF2DAA" }} />
                          <p className="font-semibold text-foreground text-sm">{title}</p>
                        </div>
                        <p className="text-xs leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2">
                    To exercise any of these rights, please email us at <a href="mailto:hello@evolve2purpose.com" className="font-semibold" style={{ color: "#FF2DAA" }}>hello@evolve2purpose.com</a>. We will respond within 30 days. We may need to verify your identity before fulfilling your request.
                  </p>
                </div>

                {/* 9 */}
                <div id="third-party" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>09</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Third-Party Services</h2>
                  </div>
                  <p className="mb-5">
                    We use the following third-party services to operate our platform. Each has their own privacy policy governing their use of data:
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: "Stripe", purpose: "Secure payment processing for program purchases and monthly membership subscriptions. Stripe handles all card data — we never see or store your full card number.", link: "stripe.com/privacy" },
                      { name: "Supabase", purpose: "Database, user authentication, and file storage. Your account data and program records are stored in Supabase's secure infrastructure.", link: "supabase.com/privacy" },
                      { name: "Netlify", purpose: "Website hosting and serverless function execution.", link: "netlify.com/privacy" },
                      { name: "Email Service Provider", purpose: "Used to deliver transactional and marketing emails. You may unsubscribe from marketing emails at any time." },
                      { name: "Analytics", purpose: "We may use privacy-respecting analytics tools to understand aggregate usage patterns on our website." },
                    ].map((item) => (
                      <div key={item.name} className="rounded-xl p-4 border border-border">
                        <p className="font-semibold text-foreground text-sm mb-1">{item.name}</p>
                        <p className="text-sm mb-1">{item.purpose}</p>
                        {item.link && <p className="text-xs text-muted-foreground">Privacy policy: {item.link}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 10 */}
                <div id="children" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>10</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Children's Privacy</h2>
                  </div>
                  <p>
                    Our website and services are intended for individuals 18 years of age and older. We do not knowingly collect personal information from anyone under the age of 13. If you are a parent or guardian and believe your child has submitted information to us without your consent, please contact us immediately at hello@evolve2purpose.com and we will promptly delete that information.
                  </p>
                </div>

                {/* 11 */}
                <div id="changes" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>11</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Changes to This Policy</h2>
                  </div>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will update the "Last Updated" date at the top of this page. For significant changes, we may also notify you by email or by displaying a notice on our website. Your continued use of our services after any update constitutes your acceptance of the revised policy. We encourage you to review this page periodically.
                  </p>
                </div>

                {/* 12 */}
                <div id="contact" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>12</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Contact Us</h2>
                  </div>
                  <p className="mb-6">
                    If you have questions, concerns, or requests related to this Privacy Policy, or if you would like to exercise your data rights, please reach out to us:
                  </p>
                  <div className="rounded-2xl p-6 border border-border bg-[#F6F6F8]">
                    <p className="font-heading text-base font-bold text-foreground mb-1">Evolve 2 Purpose — Sarah Adams</p>
                    <p className="text-sm text-muted-foreground mb-4">Privacy & Data Inquiries</p>
                    <a
                      href="mailto:hello@evolve2purpose.com"
                      className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-75 transition-opacity"
                      style={{ color: "#FF2DAA" }}
                    >
                      <Mail size={14} />
                      hello@evolve2purpose.com
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">
                      We aim to respond to all privacy-related inquiries within 5 business days.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer link to Terms */}
      <section className="py-10 bg-[#F6F6F8] border-t border-border">
        <div className="container-narrow px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Also governed by our Terms of Use.</p>
          <Link
            to="/terms"
            className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-75 transition-opacity"
            style={{ color: "#FF2DAA" }}
          >
            Read Terms of Use <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
