import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Download, UserCircle, LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await supabase.auth.signOut();
    navigate("/");
  };

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
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
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

          {/* User account icon */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 2px 10px rgba(255,45,170,0.35)" }}
                aria-label="Account menu"
              >
                {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-11 w-52 rounded-2xl shadow-xl border py-2 z-50"
                  style={{ background: "white", border: "1px solid #EEEEF3", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                >
                  <div className="px-4 py-2.5 border-b border-[#F2F2F6]">
                    <p className="text-xs font-semibold text-[#1A1A2E] truncate">{user.user_metadata?.full_name || "My Account"}</p>
                    <p className="text-[11px] text-[#AAAABC] truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#444] hover:text-[#FF2DAA] hover:bg-[#FFF5FB] transition-colors"
                  >
                    <User size={13} /> My Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#888] hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/account"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#888] border border-[#E2E2EA] hover:border-[#FF2DAA] hover:text-[#FF2DAA] transition-all hover:bg-[#FFF5FB]"
              aria-label="Sign in"
            >
              <UserCircle size={17} />
            </Link>
          )}

          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold letter-luxury uppercase text-white shadow-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,45,170,0.45)] hover:-translate-y-px active:translate-y-0"
            style={{ background: "#FF2DAA" }}
          >
            Book Sarah
          </Link>
        </div>

        {/* Mobile: user icon + hamburger */}
        <div className="lg:hidden flex items-center gap-1.5">
          {user ? (
            <Link
              to="/account"
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)" }}
              aria-label="My account"
            >
              {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link
              to="/account"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#888] border border-[#E2E2EA] hover:border-[#FF2DAA] hover:text-[#FF2DAA] transition-all"
              aria-label="Sign in"
            >
              <UserCircle size={17} />
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
