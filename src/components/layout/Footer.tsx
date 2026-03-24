import { Link } from "react-router-dom";
import { Download, Instagram, Facebook, Mail, Phone, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-white border-t border-border">

    {/* Pre-footer CTA strip */}
    <div style={{ background: "linear-gradient(135deg, #0B0B0F 0%, #1a0a11 100%)" }}>
      <div className="container-wide px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-heading text-xs font-bold letter-luxury uppercase mb-3" style={{ color: "#FF2DAA" }}>
            Free Resource
          </p>
          <h3 className="font-heading text-2xl md:text-3xl text-white font-bold letter-tight mb-2">
            The 4-Step System to Transform Your Life
          </h3>
          <p className="text-white/50 text-sm">A working guide — free, no credit card required.</p>
        </div>
        <a
          href="/4step.pdf"
          download="4-Step-System-Transform-Your-Life.pdf"
          className="btn-neon-solid shadow-lg flex-shrink-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <Download size={15} /> Download Free PDF
        </a>
      </div>
    </div>

    {/* Main footer */}
    <div className="container-wide px-6 lg:px-12 py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-14">

        {/* Brand — spans wider */}
        <div className="col-span-2 md:col-span-4">
          <Link to="/" className="inline-block mb-6">
            <img
              src="/logo.png"
              alt="Evolve 2 Purpose"
              className="h-12 w-auto object-contain max-w-[180px]"
            />
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
            A Christ-centered transformation movement helping women break generational cycles, heal their roots, and walk fully in purpose.
          </p>

          {/* Social */}
          <div className="flex items-center gap-2.5">
            {[
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ms_sarahadams/" },
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1D2TxyrEfZ/?mibextid=wwXIfr" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div className="md:col-span-2 md:col-start-6">
          <h4 className="font-heading text-[10px] font-bold letter-luxury uppercase mb-5 text-foreground">Navigate</h4>
          <nav className="flex flex-col gap-2.5">
            {[
              { label: "About Sarah", path: "/about" },
              { label: "Framework", path: "/framework" },
              { label: "Programs", path: "/programs" },
              { label: "Testimonials", path: "/testimonials" },
              { label: "Shop", path: "/shop" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect */}
        <div className="md:col-span-2">
          <h4 className="font-heading text-[10px] font-bold letter-luxury uppercase mb-5 text-foreground">Connect</h4>
          <nav className="flex flex-col gap-2.5">
            {[
              { label: "Community", path: "/community" },
              { label: "Book Sarah", path: "/booking" },
              { label: "Evolve 2 Purpose", path: "/evolve-2-purpose" },
              { label: "Free Guide", path: "/free-guide" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-2">
          <h4 className="font-heading text-[10px] font-bold letter-luxury uppercase mb-5 text-foreground">Contact</h4>
          <p className="text-muted-foreground text-xs mb-1.5">Speaking &amp; Media Inquiries</p>
          <a
            href="mailto:Info@Evolve2Purpose.com"
            className="text-primary font-semibold text-sm hover:opacity-75 transition-opacity flex items-center gap-1.5"
          >
            <Mail size={13} />
            Info@Evolve2Purpose.com
          </a>
          <a
            href="tel:+13468571574"
            className="mt-2.5 text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1.5 font-medium"
          >
            <Phone size={13} />
            (346) 857-1574
          </a>
          <a
            href="tel:+13468571574"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF2DAA" }}
          >
            <Phone size={11} /> Call Now
          </a>

          <div className="mt-5 pt-5 border-t border-border">
            <Link
              to="/booking"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold letter-luxury uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              Book a Speaking Engagement <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Ornament divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <span
          className="w-1.5 h-1.5 rounded-full rotate-45 flex-shrink-0"
          style={{ background: "#FF2DAA" }}
        />
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/50 text-xs letter-luxury uppercase text-center md:text-left">
          © {new Date().getFullYear()} Evolve 2 Purpose — Sarah Adams. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          <Link
            to="/privacy-policy"
            className="text-muted-foreground/50 hover:text-primary text-xs letter-luxury uppercase transition-colors duration-200 px-3 py-1"
          >
            Privacy Policy
          </Link>
          <span className="w-px h-3 bg-border" />
          <Link
            to="/terms"
            className="text-muted-foreground/50 hover:text-primary text-xs letter-luxury uppercase transition-colors duration-200 px-3 py-1"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
