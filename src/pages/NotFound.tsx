import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import useSEO from "@/hooks/useSEO";
import { ArrowRight, Home, BookOpen, Users, Calendar, ShoppingBag } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Programs", href: "/programs", icon: BookOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "Book Sarah", href: "/booking", icon: Calendar },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
];

const NotFound = () => {
  useSEO({ title: "Page Not Found", description: "The page you were looking for could not be found. Return to Evolve 2 Purpose.", noindex: true });
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#0B0B0F" }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,170,0.12), transparent 70%)" }}
      />

      <div className="container-narrow relative z-10 text-center px-6 py-24">
        {/* 404 Display */}
        <p
          className="font-heading font-bold leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(120px, 20vw, 200px)",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,45,170,0.3)",
          }}
        >
          404
        </p>

        {/* Neon accent line */}
        <div className="ornament-line-wide mb-8" />

        <h1 className="font-heading text-3xl md:text-4xl text-white mb-4 letter-tight">
          This Page Doesn't Exist
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for may have moved, or the link may be broken. Let's get you back on track.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/" className="btn-neon-solid shadow-lg">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/programs" className="btn-neon-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
            Explore Programs <ArrowRight size={16} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-white/10 pt-12">
          <p className="text-white/30 text-xs font-bold letter-luxury uppercase mb-6">Quick Navigation</p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white/60 border border-white/10 transition-all duration-200 hover:text-white hover:border-white/30"
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Brand note */}
        <p className="text-white/20 text-xs mt-16 letter-luxury uppercase">
          Evolve 2 Purpose — Walking in Your Purpose
        </p>
      </div>
    </div>
  );
};

export default NotFound;
