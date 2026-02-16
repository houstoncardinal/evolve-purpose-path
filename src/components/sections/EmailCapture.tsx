import { useState } from "react";
import { Mail } from "lucide-react";

const EmailCapture = ({ variant = "default" }: { variant?: "default" | "hero" | "fullwidth" }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <div className={`text-center ${variant === "fullwidth" ? "py-16 section-padding bg-card" : "py-8"}`}>
        <div className="animate-fade-up">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary-foreground" size={24} />
          </div>
          <h3 className="font-heading text-2xl mb-2">Welcome to the Journey</h3>
          <p className="text-muted-foreground">Check your inbox for your free Healing & Alignment Starter Guide.</p>
        </div>
      </div>
    );
  }

  if (variant === "fullwidth") {
    return (
      <section className="section-padding bg-card">
        <div className="container-narrow text-center">
          <p className="text-primary font-semibold tracking-widest text-xs uppercase mb-3">Free Resource</p>
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Begin Your Healing Journey Today</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Download the free Healing & Alignment Starter Guide — your first step toward breaking cycles and walking in purpose.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button type="submit" className="gold-gradient text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm hover-scale whitespace-nowrap">
              Send My Guide
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-5 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
      />
      <button type="submit" className="gold-gradient text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm hover-scale whitespace-nowrap">
        {variant === "hero" ? "Start Healing" : "Get the Guide"}
      </button>
    </form>
  );
};

export default EmailCapture;
