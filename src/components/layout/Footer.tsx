import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container-wide px-6 py-20 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div>
          <p className="letter-luxury text-xs uppercase font-semibold mb-6">
            Evolve <span className="text-gold">The Number</span> To Purpose
          </p>
          <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
            Helping women break generational cycles, heal past trauma, and step fully into purpose through prophetic healing.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm letter-luxury uppercase mb-6">Navigate</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "About", path: "/about" },
              { label: "Framework", path: "/framework" },
              { label: "Programs", path: "/programs" },
              { label: "Testimonials", path: "/testimonials" },
              { label: "Shop", path: "/shop" },
              { label: "Free Guide", path: "/free-guide" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-primary-foreground/40 hover:text-gold text-sm transition-colors duration-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-sm letter-luxury uppercase mb-6">Connect</h4>
          <p className="text-primary-foreground/50 text-sm mb-6 leading-relaxed">Join our community and begin your healing journey today.</p>
          <Link to="/free-guide" className="inline-block gold-gradient text-primary-foreground px-7 py-2.5 rounded-full text-xs font-semibold letter-luxury uppercase hover-scale shadow-md">
            Get Your Free Guide
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-primary-foreground/30 text-xs letter-luxury uppercase">
          © {new Date().getFullYear()} Evolve The Number To Purpose
        </p>
        <p className="text-primary-foreground/30 text-xs letter-luxury uppercase">
          All rights reserved
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
