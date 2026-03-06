import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    title: "Information We Collect",
    body: `When you submit your email address through our website (including the free guide download, email capture forms, or booking inquiries), we collect the information you provide directly — such as your name and email address. We may also collect non-personally identifiable data through analytics tools (such as page views, session duration, and device type) to improve our services.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to deliver the content or resources you requested (such as the free guide), send you occasional updates, program announcements, and content we believe will be valuable to you, respond to your inquiries or booking requests, and improve the experience and content on this website. We do not sell, trade, or rent your personal information to third parties.`,
  },
  {
    title: "Email Communications",
    body: `By submitting your email through our website, you agree to receive communications from Evole 2 Purpose. You may unsubscribe from marketing emails at any time by clicking the unsubscribe link in any email or by contacting us directly. Transactional emails related to purchases or bookings may still be sent after unsubscribing.`,
  },
  {
    title: "Cookies and Tracking",
    body: `Our website may use cookies and similar tracking technologies to enhance your browsing experience and gather analytics data. You can control cookie settings through your browser. Disabling cookies may affect some features of the website.`,
  },
  {
    title: "Third-Party Services",
    body: `We may use third-party services (such as email marketing platforms, payment processors, and analytics tools) that have their own privacy policies. We are not responsible for the privacy practices of those services. All payment processing is handled by secure, PCI-compliant third-party processors — we do not store your payment information.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal information for as long as necessary to provide our services or as required by law. You may request deletion of your personal data at any time by contacting us.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications or request that we restrict our use of your data. To exercise these rights, please contact us at the email below.`,
  },
  {
    title: "Children's Privacy",
    body: `This website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has submitted information to us, please contact us and we will promptly remove it.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy periodically. When we do, we will update the effective date at the top of this page. Continued use of the website after changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: "Contact",
    body: `For questions or requests related to this Privacy Policy, please contact us at: hello@evole2purpose.com`,
  },
];

const PrivacyPolicy = () => {
  useSEO({ title: "Privacy Policy", description: "Learn how Evole 2 Purpose collects, uses, and protects your personal information.", noindex: true });
  return (
  <div>
    <section className="section-padding hero-gradient-bg relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-[-100px] right-[-100px]" />
      <div className="container-narrow relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold letter-luxury uppercase transition-colors mb-8"
        >
          <ArrowLeft size={12} /> Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="ornament-line !w-8 !mx-0" />
          <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Legal</p>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl letter-tight mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Effective Date: January 1, 2025</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow">
        <p className="text-muted-foreground leading-relaxed mb-10 text-base">
          At Evole 2 Purpose, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or engage with our services.
        </p>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="border-b border-border pb-8 last:border-0">
              <h2 className="font-heading text-xl font-bold mb-3">{i + 1}. {s.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
};

export default PrivacyPolicy;
