import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Framework", path: "/framework" },
  { label: "Programs", path: "/programs" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Shop", path: "/shop" },
  { label: "Free Guide", path: "/free-guide" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container-wide flex items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="font-display text-lg md:text-xl tracking-wide text-foreground">
          <span className="letter-luxury text-[10px] md:text-xs uppercase font-body font-semibold">Evolve <span className="gold-text font-bold">The Number</span> To Purpose</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs letter-luxury uppercase font-body transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/programs"
            className="gold-gradient text-primary-foreground px-7 py-2.5 rounded-full text-xs font-semibold letter-luxury uppercase hover-scale shadow-md"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50">
          <div className="flex flex-col px-6 py-8 gap-5">
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
              to="/programs"
              onClick={() => setOpen(false)}
              className="gold-gradient text-primary-foreground px-6 py-3 rounded-full text-center text-xs font-semibold letter-luxury uppercase mt-3 shadow-md"
            >
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
