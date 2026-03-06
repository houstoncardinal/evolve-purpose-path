import { Link } from "react-router-dom";
import { Download, Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => (
  <footer style={{ backgroundColor: "#0B0B0F" }} className="text-white">
    <div className="container-wide px-6 py-20 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="inline-block mb-5">
            <img
              src="/logo.png"
              alt="Evole 2 Purpose"
              className="h-10 w-auto object-contain max-w-[160px]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-7">
            Helping people break cycles, heal their roots, and step fully into a life of love, accountability, and purpose.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, label: "Instagram", href: "https://instagram.com/evole2purpose" },
              { icon: Facebook, label: "Facebook", href: "https://facebook.com/evole2purpose" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com/@evole2purpose" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-heading text-xs letter-luxury uppercase mb-6 text-white/60">Navigate</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "About", path: "/about" },
              { label: "Framework", path: "/framework" },
              { label: "Programs", path: "/programs" },
              { label: "Testimonials", path: "/testimonials" },
              { label: "Shop", path: "/shop" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/40 hover:text-white text-sm transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Community & Booking */}
        <div>
          <h4 className="font-heading text-xs letter-luxury uppercase mb-6 text-white/60">Connect</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Community", path: "/community" },
              { label: "Book Sarah", path: "/booking" },
              { label: "Evole 2 Purpose", path: "/evole-2-purpose" },
              { label: "Free Guide", path: "/free-guide" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/40 hover:text-white text-sm transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* PDF Download CTA */}
        <div>
          <h4 className="font-heading text-xs letter-luxury uppercase mb-6 text-white/60">Free Download</h4>
          <p className="text-white/45 text-sm mb-5 leading-relaxed">
            Get the free PDF guide to the 4-Step System to Transform Your Life.
          </p>
          <a
            href="/4step.pdf"
            download="4-Step-System-Transform-Your-Life.pdf"
            className="btn-neon-outline inline-flex items-center gap-2 !text-xs !px-5 !py-2.5"
            style={{ color: "#FF2DAA", borderColor: "#FF2DAA" }}
          >
            <Download size={12} />
            Download Free PDF
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/25 text-xs letter-luxury uppercase">
          © {new Date().getFullYear()} Evole 2 Purpose — Sarah Adams. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-white/25 hover:text-white/60 text-xs letter-luxury uppercase transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-white/25 hover:text-white/60 text-xs letter-luxury uppercase transition-colors duration-200">
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
