import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Framework", path: "/framework" },
  { label: "Programs", path: "/programs" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Community", path: "/community" },
  { label: "Shop", path: "/shop" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-2xl shadow-sm border-b border-border/60"
          : "bg-white/80 backdrop-blur-xl border-b border-border/30"
      }`}
    >
      <div className="container-wide flex items-center justify-between px-5 py-3 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Evolve 2 Purpose"
            className="h-9 md:h-11 w-auto object-contain max-w-[170px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[10px] letter-luxury uppercase font-semibold transition-colors duration-200 pb-0.5 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                    style={{ background: "#FF2DAA" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="/4step.pdf"
            download="4-Step-System-Transform-Your-Life.pdf"
            className="inline-flex items-center gap-1.5 text-[10px] letter-luxury uppercase font-semibold text-primary hover:text-primary/75 transition-all duration-200 border border-primary/25 hover:border-primary/50 rounded-full px-4 py-2 hover:bg-primary/4"
          >
            <Download size={10} />
            Free PDF
          </a>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold letter-luxury uppercase text-white shadow-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,45,170,0.45)] hover:-translate-y-px active:translate-y-0"
            style={{ background: "#FF2DAA" }}
          >
            Book Sarah
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } bg-white border-t border-border/50 shadow-lg`}
      >
        <div className="flex flex-col px-5 py-7 gap-0">

          {/* Home link */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`text-[10px] letter-luxury uppercase font-semibold py-3 border-b border-border/40 flex items-center justify-between ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
            {location.pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </Link>

          {/* Nav links */}
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-[10px] letter-luxury uppercase font-semibold py-3 border-b border-border/40 flex items-center justify-between ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}

          <Link
            to="/free-guide"
            onClick={() => setOpen(false)}
            className={`text-[10px] letter-luxury uppercase font-semibold py-3 border-b border-border/40 flex items-center justify-between ${
              location.pathname === "/free-guide" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Free Guide
            {location.pathname === "/free-guide" && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </Link>

          {/* Mobile CTAs */}
          <div className="pt-6 flex flex-col gap-3">
            <a
              href="/4step.pdf"
              download="4-Step-System-Transform-Your-Life.pdf"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border border-primary/40 text-primary px-6 py-3.5 rounded-full text-[10px] font-bold letter-luxury uppercase hover:bg-primary/5 transition-colors"
            >
              <Download size={11} />
              Download Free PDF
            </a>
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 text-center px-6 py-3.5 rounded-full text-[10px] font-bold letter-luxury uppercase text-white shadow-lg"
              style={{ background: "#FF2DAA" }}
            >
              Book Sarah to Speak
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
