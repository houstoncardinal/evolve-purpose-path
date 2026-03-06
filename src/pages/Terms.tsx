import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the Evolve 2 Purpose website and any services offered through it, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services.`,
  },
  {
    title: "Services",
    body: `Evolve 2 Purpose offers personal development coaching, group programs, speaking engagements, digital products, and community membership services. All service offerings, pricing, and availability are subject to change without notice. Descriptions of programs and services on this website are for informational purposes only.`,
  },
  {
    title: "Purchases and Payments",
    body: `All purchases made through this website are subject to our refund and cancellation policies, which are communicated at the time of purchase. Prices are listed in USD. We reserve the right to correct pricing errors and to cancel orders in the event of an error. Payment is required in full at the time of purchase unless a payment plan has been explicitly arranged.`,
  },
  {
    title: "Refund Policy",
    body: `Due to the nature of digital products and coaching services, all sales are generally final. Exceptions may be made on a case-by-case basis at the sole discretion of Evolve 2 Purpose. For live programs or intensives, cancellations made more than 14 days before the event may be eligible for a credit toward a future program. No cash refunds will be issued for cancellations made fewer than 14 days before a live event.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website — including but not limited to text, graphics, logos, images, audio, video, and the 4-Step Transform Your Life Framework — is the intellectual property of Evolve 2 Purpose and Sarah Adams. You may not reproduce, distribute, modify, or create derivative works from any content on this site without explicit written permission.`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `The content on this website is provided for informational and educational purposes only. It is not a substitute for professional medical, mental health, legal, or financial advice. Sarah Adams is a certified life and transformation coach — not a licensed therapist, psychologist, or medical professional. Results described on this website are not guaranteed. Individual results will vary based on effort, engagement, and personal circumstances.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Evolve 2 Purpose and Sarah Adams shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services, including but not limited to loss of data, revenue, or emotional distress. Our total liability for any claim shall not exceed the amount you paid for the specific service giving rise to the claim.`,
  },
  {
    title: "Community Guidelines",
    body: `Members of the Evolve 2 Purpose community agree to engage respectfully and constructively. Any conduct that is abusive, harassing, discriminatory, or harmful to other members may result in immediate removal from the community without refund. We reserve the right to remove any content or member that violates these standards at our sole discretion.`,
  },
  {
    title: "External Links",
    body: `This website may contain links to third-party websites. These links are provided for convenience only. We are not responsible for the content, privacy practices, or accuracy of any third-party site.`,
  },
  {
    title: "Governing Law",
    body: `These Terms of Use are governed by the laws of the United States. Any disputes arising from your use of this website or our services shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.`,
  },
  {
    title: "Changes to These Terms",
    body: `We reserve the right to update these Terms of Use at any time. Continued use of the website after changes constitutes your acceptance of the updated terms. We encourage you to review this page periodically.`,
  },
  {
    title: "Contact",
    body: `For questions about these Terms of Use, please contact us at: hello@evolve2purpose.com`,
  },
];

const Terms = () => {
  useSEO({ title: "Terms of Use", description: "Review the terms and conditions for using Evolve 2 Purpose website and services.", noindex: true });
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
        <h1 className="font-heading text-4xl md:text-5xl letter-tight mb-4">Terms of Use</h1>
        <p className="text-muted-foreground text-sm">Effective Date: January 1, 2025</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow">
        <p className="text-muted-foreground leading-relaxed mb-10 text-base">
          Please read these Terms of Use carefully before using the Evolve 2 Purpose website or purchasing any services. These terms constitute a legally binding agreement between you and Evolve 2 Purpose.
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

export default Terms;
