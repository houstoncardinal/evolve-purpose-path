import { useState } from "react";
import { Mail, ArrowRight, Check, AlertCircle } from "lucide-react";

const isValidEmail = (val: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

const EmailCapture = ({ variant = "default" }: { variant?: "default" | "hero" | "fullwidth" }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className={`text-center ${variant === "fullwidth" ? "py-20 section-padding bg-card" : "py-8"}`}>
        <div>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
            style={{ background: "rgba(255,45,170,0.12)" }}
          >
            <Check size={22} style={{ color: "#FF2DAA" }} />
          </div>
          <h3 className="font-heading text-2xl mb-2">You're In!</h3>
          <p className="text-muted-foreground text-sm">Check your inbox — your free guide is on its way.</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "flex-1 px-6 py-3.5 rounded-full border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 text-sm transition-all " +
    (error
      ? "border-red-400 focus:ring-red-200"
      : "border-border focus:ring-primary/30");

  if (variant === "fullwidth") {
    return (
      <section className="section-padding bg-card premium-border-top relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] top-[-100px] left-[40%]" />
        <div className="container-narrow text-center relative z-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="ornament-line !w-8" />
            <p className="text-primary font-semibold letter-luxury text-[10px] uppercase">Free Resource</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl mb-5 letter-tight">Begin Your Healing Journey Today</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
            Download the free Healing & Alignment Starter Guide — your first step toward breaking cycles and walking in purpose.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="Enter your email"
                className={inputClass}
              />
              <button type="submit" className="btn-neon-solid !py-3.5 !px-8 whitespace-nowrap !text-sm shadow-lg">
                Send My Guide <ArrowRight size={14} />
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2 justify-center">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </form>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          placeholder="Enter your email"
          className={inputClass}
        />
        <button type="submit" className="btn-neon-solid !py-3.5 !px-8 whitespace-nowrap !text-sm shadow-lg">
          {variant === "hero" ? "Start Healing" : "Get the Guide"} <ArrowRight size={14} />
        </button>
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </form>
  );
};

export default EmailCapture;
