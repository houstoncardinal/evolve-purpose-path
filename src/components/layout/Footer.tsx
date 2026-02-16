import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container-wide px-6 py-16 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="font-display text-2xl font-semibold mb-4">
            Evolve <span className="text-gold">The Number</span> To Purpose
          </h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
            Helping women break generational cycles, heal past trauma, and step fully into purpose through prophetic healing.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg mb-4">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "About Sarah", path: "/about" },
              { label: "The Framework", path: "/framework" },
              { label: "Programs", path: "/programs" },
              { label: "Testimonials", path: "/testimonials" },
              { label: "Shop", path: "/shop" },
              { label: "Free Guide", path: "/free-guide" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg mb-4">Connect</h4>
          <p className="text-primary-foreground/70 text-sm mb-4">Join our community and begin your healing journey today.</p>
          <Link to="/free-guide" className="inline-block gold-gradient text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover-scale">
            Get Your Free Guide
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} Evolve The Number To Purpose. All rights reserved.
        </p>
        <p className="text-primary-foreground/40 text-xs flex items-center gap-1">
          Built with <Heart size={12} className="text-gold" /> and faith
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
