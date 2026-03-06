import { useState } from "react";
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
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border/50">
      <div className="container-wide flex items-center justify-between px-6 py-3 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Evole 2 Purpose"
            className="h-10 md:h-12 w-auto object-contain max-w-[180px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] letter-luxury uppercase font-body font-semibold transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/4step.pdf"
            download="4-Step-System-Transform-Your-Life.pdf"
            className="inline-flex items-center gap-1.5 text-[10px] letter-luxury uppercase font-semibold text-primary hover:opacity-75 transition-opacity border border-primary/30 rounded-full px-4 py-2"
          >
            <Download size={11} />
            Free PDF
          </a>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-[10px] font-bold letter-luxury uppercase text-white shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,170,0.5)] hover:-translate-y-px"
            style={{ background: "#FF2DAA" }}
          >
            Book Sarah
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } bg-white/98 backdrop-blur-xl border-t border-border/50`}
      >
          <div className="flex flex-col px-6 py-8 gap-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`text-xs letter-luxury uppercase font-body py-1 ${location.pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-xs letter-luxury uppercase font-body py-1 ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/free-guide"
              onClick={() => setOpen(false)}
              className="text-xs letter-luxury uppercase font-body py-1 text-muted-foreground"
            >
              Free Guide
            </Link>
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="text-xs letter-luxury uppercase font-body py-1 text-muted-foreground"
            >
              Booking
            </Link>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="/4step.pdf"
                download="4-Step-System-Transform-Your-Life.pdf"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-full text-xs font-bold letter-luxury uppercase"
              >
                <Download size={12} />
                Download Free PDF
              </a>
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center text-center px-6 py-3 rounded-full text-xs font-bold letter-luxury uppercase text-white shadow-md"
                style={{ background: "#FF2DAA" }}
              >
                Book Sarah for Speaking
              </Link>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
