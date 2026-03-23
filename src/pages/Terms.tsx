import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, FileText } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const toc = [
  { id: "overview",       label: "Overview & Acceptance" },
  { id: "who-we-are",     label: "Who We Are" },
  { id: "services",       label: "Services" },
  { id: "accounts",       label: "User Accounts" },
  { id: "payments",       label: "Purchases & Payments" },
  { id: "refunds",        label: "Refund & Cancellation Policy" },
  { id: "subscriptions",  label: "Subscription Terms" },
  { id: "ip",             label: "Intellectual Property" },
  { id: "conduct",        label: "User Conduct & Community" },
  { id: "disclaimer",     label: "Disclaimer of Warranties" },
  { id: "liability",      label: "Limitation of Liability" },
  { id: "indemnification","label": "Indemnification" },
  { id: "governing-law",  label: "Governing Law" },
  { id: "changes",        label: "Changes to These Terms" },
  { id: "contact",        label: "Contact Us" },
];

const Terms = () => {
  useSEO({
    title: "Terms of Use — Evolve 2 Purpose",
    description: "Review the terms and conditions governing your use of the Evolve 2 Purpose website and services.",
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
            <FileText size={16} style={{ color: "#FF2DAA" }} />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Legal</p>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white letter-tight mb-4 leading-tight">
            Terms of Use
          </h1>
          <p className="text-white/45 text-sm mb-8 max-w-xl leading-relaxed">
            Please read these terms carefully. They form a legally binding agreement between you and Evolve 2 Purpose governing your access to and use of our website and services.
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
                    to="/privacy-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity"
                    style={{ color: "#FF2DAA" }}
                  >
                    Privacy Policy <ArrowRight size={11} />
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
                    <h2 className="font-heading text-xl font-bold text-foreground">Overview & Acceptance</h2>
                  </div>
                  <p className="mb-4">
                    These Terms of Use ("Terms") govern your access to and use of the Evolve 2 Purpose website (evolve2purpose.com), our coaching programs, digital products, community membership, and all related services (collectively, the "Services").
                  </p>
                  <p className="mb-4">
                    By accessing our website or purchasing any service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our website or services.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, clients, and community members. We reserve the right to refuse service to anyone at any time for any reason.
                  </p>
                </div>

                {/* 2 */}
                <div id="who-we-are" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>02</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Who We Are</h2>
                  </div>
                  <p className="mb-4">
                    Evolve 2 Purpose is a personal transformation coaching practice operated by Sarah Adams. Sarah is a certified life and transformation coach who works with women to break generational cycles, heal at the root, and walk fully in purpose through the L.A.T.T. (Learn, Apply, Teach, Transform) framework.
                  </p>
                  <p>
                    <strong className="text-foreground">Important:</strong> Sarah Adams is a certified life and transformation coach — not a licensed therapist, psychologist, counselor, or medical professional. The services and content provided through Evolve 2 Purpose are for educational and personal development purposes only and are not a substitute for professional mental health, medical, legal, or financial advice.
                  </p>
                </div>

                {/* 3 */}
                <div id="services" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>03</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Services</h2>
                  </div>
                  <p className="mb-4">Evolve 2 Purpose offers the following services:</p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "1:1 Deep-Dive Coaching — private weekly coaching sessions with Sarah Adams (application required)",
                      "Group Coaching Program — live group sessions every Thursday at 7 PM ET (prerequisite: completion of 1:1 program)",
                      "Healing Intensive Retreat — multi-day immersive retreat experience (prerequisite: completion of 1:1 program)",
                      "Purpose Clarity Program — structured purpose-finding program (prerequisite: completion of 1:1 program)",
                      "Mentorship Program — Sarah's crown-jewel high-touch mentorship (prerequisite: completion of 1:1 program)",
                      "Community Membership — private monthly membership ($9.99/month) with live events, resources, and community access",
                      "Digital Products — guides, workbooks, and educational resources available in the Shop",
                      "Speaking Engagements — keynote and event speaking by Sarah Adams",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    All service descriptions, pricing, availability, and program requirements are subject to change without notice. We reserve the right to modify, suspend, or discontinue any service at any time.
                  </p>
                </div>

                {/* 4 */}
                <div id="accounts" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>04</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">User Accounts</h2>
                  </div>
                  <p className="mb-4">
                    Certain features of our platform require you to create an account. When you create an account, you agree to:
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "Provide accurate, current, and complete information during registration",
                      "Maintain and update your account information to keep it accurate",
                      "Keep your password confidential and not share your account with others",
                      "Notify us immediately at hello@evolve2purpose.com if you suspect unauthorized use of your account",
                      "Accept responsibility for all activity that occurs under your account",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these Terms, contain false information, or engage in behavior that is harmful to the community or our platform.
                  </p>
                </div>

                {/* 5 */}
                <div id="payments" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>05</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Purchases & Payments</h2>
                  </div>
                  <p className="mb-4">
                    All prices on our website are listed in US Dollars (USD). By completing a purchase, you agree to pay the stated price for the selected product or service.
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "Payment is due in full at the time of purchase unless a payment plan has been explicitly arranged in writing",
                      "All payments are processed securely through Stripe, a PCI-compliant payment processor",
                      "We do not store your credit card number or payment card data on our servers",
                      "You are responsible for all applicable taxes in your jurisdiction",
                      "We reserve the right to correct pricing errors and to cancel orders affected by a pricing mistake",
                      "In the event of a failed payment for a subscription, we may attempt to retry the charge and/or suspend access until payment is resolved",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6 */}
                <div id="refunds" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>06</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Refund & Cancellation Policy</h2>
                  </div>
                  <p className="mb-5 font-semibold text-foreground">
                    Due to the deeply personal and transformative nature of our services, all sales are generally final.
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        heading: "Digital Products",
                        body: "All digital product sales (guides, workbooks, and downloadable resources) are final. No refunds are issued once a digital product has been purchased and delivered.",
                      },
                      {
                        heading: "1:1 Coaching Programs",
                        body: "Coaching program investments are non-refundable once the program has commenced. If you must withdraw before your first session, please contact us within 48 hours of purchase. Refund consideration is at the sole discretion of Evolve 2 Purpose.",
                      },
                      {
                        heading: "Retreats & Live Events",
                        body: "Cancellations made more than 30 days before the event date may receive a credit toward a future program (no cash refunds). Cancellations made 14–30 days before the event may receive a 50% credit. No credit or refund is available for cancellations made fewer than 14 days before a live event.",
                      },
                      {
                        heading: "Community Membership",
                        body: "Your $9.99/month membership can be cancelled at any time from your account. Cancellation takes effect at the end of your current billing period — you will retain access through the period you have paid for. No partial-month refunds are issued.",
                      },
                    ].map((item) => (
                      <div key={item.heading} className="rounded-xl p-5 border border-border bg-[#F6F6F8]">
                        <p className="font-semibold text-foreground text-sm mb-2">{item.heading}</p>
                        <p className="text-sm">{item.body}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">
                    Exceptions to this policy may be made on a case-by-case basis at the sole discretion of Evolve 2 Purpose. To discuss your situation, contact us at hello@evolve2purpose.com.
                  </p>
                </div>

                {/* 7 */}
                <div id="subscriptions" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>07</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Subscription Terms</h2>
                  </div>
                  <p className="mb-4">
                    The Evolve 2 Purpose Community Membership is a recurring monthly subscription at $9.99/month. By subscribing, you agree to the following:
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "Your subscription will automatically renew each month until you cancel",
                      "You authorize us to charge your payment method on file on a recurring monthly basis",
                      "You may cancel at any time through your account settings — cancellation takes effect at the end of the current billing period",
                      "Community access granted through a product purchase is subject to the terms of that purchase and is not a recurring subscription",
                      "We reserve the right to modify subscription pricing with 30 days' advance notice to active subscribers",
                      "We reserve the right to suspend or revoke community access for violations of community guidelines",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 8 */}
                <div id="ip" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>08</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Intellectual Property</h2>
                  </div>
                  <p className="mb-4">
                    All content on the Evolve 2 Purpose website and within our programs is the exclusive intellectual property of Evolve 2 Purpose and Sarah Adams. This includes, but is not limited to:
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "The L.A.T.T. Framework (Learn, Apply, Teach, Transform) and all associated materials",
                      "Website design, graphics, photography, and layout",
                      "Written content, program materials, workbooks, and guides",
                      "Audio and video recordings, live session replays, and teachings",
                      "Brand identity including the Evolve 2 Purpose name and logo",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-4">
                    You may not reproduce, distribute, publicly display, modify, sell, or create derivative works from any of our content without explicit written permission from Evolve 2 Purpose.
                  </p>
                  <p>
                    Purchasing a program or product grants you a personal, non-transferable, non-exclusive license to use the materials for your own personal transformation. This license does not permit you to share, resell, or distribute the materials to others.
                  </p>
                </div>

                {/* 9 */}
                <div id="conduct" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>09</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">User Conduct & Community Guidelines</h2>
                  </div>
                  <p className="mb-4">
                    By accessing our website or participating in our programs and community, you agree not to:
                  </p>
                  <ul className="list-none space-y-2 mb-6 pl-0">
                    {[
                      "Post, share, or transmit content that is abusive, harassing, threatening, discriminatory, defamatory, or offensive",
                      "Impersonate any person or entity, or misrepresent your affiliation with any person or entity",
                      "Share, sell, or distribute any program materials, session recordings, or community content to third parties",
                      "Use our platform for any unlawful purpose or in violation of any applicable laws or regulations",
                      "Attempt to gain unauthorized access to any part of our platform, other users' accounts, or our servers",
                      "Submit false information in program applications or teaching video submissions",
                      "Engage in any conduct that disrupts or interferes with the experience of other community members",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl p-5 border border-border bg-[#F6F6F8]">
                    <p className="font-semibold text-foreground text-sm mb-2">Enforcement</p>
                    <p className="text-sm">
                      Violations of these guidelines may result in immediate removal from the community and/or termination of your account without refund. We reserve the right to remove any content or member that violates these standards at our sole discretion. We take the safety and integrity of our community seriously.
                    </p>
                  </div>
                </div>

                {/* 10 */}
                <div id="disclaimer" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>10</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Disclaimer of Warranties</h2>
                  </div>
                  <p className="mb-4">
                    THE WEBSITE AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "We do not warrant that the website will be uninterrupted, error-free, or free of viruses or harmful components",
                      "We do not guarantee any specific results from participation in our coaching programs, retreats, or community",
                      "Results described in testimonials and case studies on our website represent individual experiences and are not typical or guaranteed",
                      "The content on this website is for educational and personal development purposes only and is not professional medical, mental health, legal, or financial advice",
                      "Sarah Adams is a certified life coach, not a licensed mental health professional. If you are in crisis or need mental health support, please seek a licensed professional",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 11 */}
                <div id="liability" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>11</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Limitation of Liability</h2>
                  </div>
                  <p className="mb-4">
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EVOLVE 2 PURPOSE AND SARAH ADAMS SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-none space-y-2 mb-4 pl-0">
                    {[
                      "Any indirect, incidental, special, consequential, or punitive damages",
                      "Loss of profits, revenue, data, or business opportunities",
                      "Emotional distress or personal injury arising from your use of our services",
                      "Any damages arising from your reliance on information provided through our website or programs",
                      "Unauthorized access to or alteration of your data",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#FF2DAA" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    In all cases, our total cumulative liability to you for any claim arising out of or related to these Terms or our services shall not exceed the total amount you paid to Evolve 2 Purpose in the 12 months preceding the event giving rise to the claim.
                  </p>
                </div>

                {/* 12 */}
                <div id="indemnification" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>12</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Indemnification</h2>
                  </div>
                  <p>
                    You agree to indemnify, defend, and hold harmless Evolve 2 Purpose, Sarah Adams, and any affiliates, employees, and contractors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our services, your violation of these Terms, your violation of any third-party rights, or any content you submit to our platform.
                  </p>
                </div>

                {/* 13 */}
                <div id="governing-law" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>13</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Governing Law & Dispute Resolution</h2>
                  </div>
                  <p className="mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
                  </p>
                  <p className="mb-4">
                    Before filing any formal claim, you agree to first contact us at hello@evolve2purpose.com and make a good-faith effort to resolve the dispute informally. Most concerns can be resolved quickly and directly.
                  </p>
                  <p>
                    If informal resolution is not possible, any disputes shall be resolved through binding arbitration, except where prohibited by law. You waive any right to participate in a class action lawsuit or class-wide arbitration.
                  </p>
                </div>

                {/* 14 */}
                <div id="changes" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>14</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Changes to These Terms</h2>
                  </div>
                  <p>
                    We reserve the right to update or modify these Terms at any time. When we make material changes, we will update the "Last Updated" date at the top of this page. For significant changes affecting your rights or obligations, we may notify active users by email. Your continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using our services.
                  </p>
                </div>

                {/* 15 */}
                <div id="contact" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-3xl font-bold" style={{ color: "#FF2DAA" }}>15</span>
                    <h2 className="font-heading text-xl font-bold text-foreground">Contact Us</h2>
                  </div>
                  <p className="mb-6">
                    If you have questions about these Terms, need to report a violation, or want to discuss an exception to our policies, please reach out:
                  </p>
                  <div className="rounded-2xl p-6 border border-border bg-[#F6F6F8]">
                    <p className="font-heading text-base font-bold text-foreground mb-1">Evolve 2 Purpose — Sarah Adams</p>
                    <p className="text-sm text-muted-foreground mb-4">Legal & Policy Inquiries</p>
                    <a
                      href="mailto:hello@evolve2purpose.com"
                      className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-75 transition-opacity"
                      style={{ color: "#FF2DAA" }}
                    >
                      <Mail size={14} />
                      hello@evolve2purpose.com
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">
                      We aim to respond to all legal and policy inquiries within 5 business days.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer link to Privacy */}
      <section className="py-10 bg-[#F6F6F8] border-t border-border">
        <div className="container-narrow px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Also governed by our Privacy Policy.</p>
          <Link
            to="/privacy-policy"
            className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-75 transition-opacity"
            style={{ color: "#FF2DAA" }}
          >
            Read Privacy Policy <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Terms;
