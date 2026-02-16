import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Sarah", path: "/about" },
  { label: "The Framework", path: "/framework" },
  { label: "Programs", path: "/programs" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Shop", path: "/shop" },
  { label: "Free Guide", path: "/free-guide" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="font-display text-xl md:text-2xl font-semibold tracking-wide text-foreground">
          Evolve <span className="gold-text font-bold">The Number</span> To Purpose
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-body tracking-wide transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/programs"
            className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover-scale"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <div className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-base font-body py-2 ${
                  location.pathname === link.path ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/programs"
              onClick={() => setOpen(false)}
              className="gold-gradient text-primary-foreground px-6 py-3 rounded-full text-center font-semibold mt-2"
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
