import { useState } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { store, Subscriber } from "@/lib/adminStore";

const isValidEmail = (val: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

const EmailCapture = ({
  variant = "default",
  source = "homepage",
}: {
  variant?: "default" | "hero" | "fullwidth";
  source?: Subscriber["source"];
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    await store.addSubscriber({ email: email.trim(), source });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": "email-capture", email: email.trim(), source }).toString(),
    }).catch(() => {});
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    const isDark = variant === "fullwidth";
    return (
      <div
        className={`text-center section-padding relative overflow-hidden`}
        style={isDark ? { background: "linear-gradient(160deg, #0B0B0F 0%, #140610 50%, #0B0B0F 100%)" } : undefined}
      >
        {isDark && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,170,0.10), transparent 70%)" }}
          />
        )}
        <div className="relative z-10">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
            style={{ background: "rgba(255,45,170,0.15)", border: "1.5px solid rgba(255,45,170,0.3)" }}
          >
            <Check size={24} style={{ color: "#FF2DAA" }} />
          </div>
          <h3 className={`font-heading text-2xl mb-2 ${isDark ? "text-white" : ""}`}>You're In!</h3>
          <p className={`text-sm ${isDark ? "text-white/55" : "text-muted-foreground"}`}>Check your inbox — your free guide is on its way.</p>
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
    const darkInputClass =
      "flex-1 px-6 py-3.5 rounded-full border bg-white/[0.08] backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 text-sm transition-all " +
      (error ? "border-red-400/60 focus:ring-red-400/30" : "border-white/15 focus:ring-white/20 focus:border-white/30");

    return (
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0B0B0F 0%, #140610 50%, #0B0B0F 100%)" }}
      >
        {/* Glow orbs */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.10), transparent 70%)" }}
        />
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.06), transparent 70%)" }}
        />

        <div className="container-narrow text-center relative z-10">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="ornament-line !w-8" />
            <p className="font-semibold letter-luxury text-[10px] uppercase" style={{ color: "#FF2DAA" }}>Free Resource</p>
            <div className="ornament-line !w-8" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-5 letter-tight text-white">
            Begin Your Healing Journey Today
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Download the free 4-Step Guide — your first step toward breaking cycles, healing at the root, and walking in purpose.
          </p>
          <form name="email-capture" data-netlify="true" onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input type="hidden" name="form-name" value="email-capture" />
            <input type="hidden" name="source" value={source} />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="your@email.com"
                className={darkInputClass}
              />
              <button
                type="submit"
                className="btn-neon-solid !py-3.5 !text-sm whitespace-nowrap shadow-lg"
              >
                Send My Guide <ArrowRight size={14} />
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2 justify-center">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </form>
          <p className="text-white/30 text-xs mt-5 letter-luxury uppercase">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    );
  }

  return (
    <form name="email-capture" data-netlify="true" onSubmit={handleSubmit} className="max-w-md">
      <input type="hidden" name="form-name" value="email-capture" />
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          placeholder="your@email.com"
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
