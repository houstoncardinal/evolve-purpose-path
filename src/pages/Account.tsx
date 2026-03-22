import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, User, LogOut, Mail, Calendar, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Tab = "signin" | "signup";

const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all bg-white border border-[#E8E8EE] text-[#1A1A2E] placeholder:text-[#9999AA]";
const inputFocused = "border-[#FF2DAA]";

const Account = () => {
  const [tab, setTab] = useState<Tab>("signin");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign-in state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siShow, setSiShow] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suShow, setSuShow] = useState(false);
  const [suError, setSuError] = useState("");
  const [suSuccess, setSuSuccess] = useState(false);
  const [suLoading, setSuLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiLoading(true);
    setSiError("");
    const { error } = await supabase.auth.signInWithPassword({ email: siEmail, password: siPassword });
    if (error) {
      setSiError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
      setSiLoading(false);
    }
    // user state updates via onAuthStateChange — no manual setLoading(false) needed on success
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    if (suPassword !== suConfirm) { setSuError("Passwords don't match."); return; }
    if (suPassword.length < 6) { setSuError("Password must be at least 6 characters."); return; }
    setSuLoading(true);
    const { error } = await supabase.auth.signUp({
      email: suEmail,
      password: suPassword,
      options: { data: { full_name: suName } },
    });
    setSuLoading(false);
    if (error) { setSuError(error.message); return; }
    setSuSuccess(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F9F9FB" }}>
        <span className="w-6 h-6 rounded-full border-2 border-[#FF2DAA]/30 border-t-[#FF2DAA] animate-spin" />
      </div>
    );
  }

  // ── Logged-in profile view ─────────────────────────────────────────────────
  if (user) {
    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Member";
    const initial = name.charAt(0).toUpperCase();
    const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return (
      <div className="min-h-screen pt-28 pb-20 px-4" style={{ background: "#F9F9FB" }}>
        <div className="max-w-md mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 8px 32px rgba(255,45,170,0.3)" }}
            >
              {initial}
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#1A1A2E]">Welcome back, {name.split(" ")[0]}.</h1>
            <p className="text-sm text-[#888899] mt-1">You're signed in to your Evolve 2 Purpose account.</p>
          </div>

          {/* Profile card */}
          <div className="bg-white rounded-3xl border border-[#EEEEF3] shadow-sm p-7 space-y-4 mb-5">
            <div className="flex items-center gap-3 py-3 border-b border-[#F2F2F6]">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,45,170,0.08)" }}>
                <User size={15} style={{ color: "#FF2DAA" }} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#AAAABC] font-semibold">Full Name</p>
                <p className="text-sm font-semibold text-[#1A1A2E] mt-0.5">{name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-[#F2F2F6]">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,45,170,0.08)" }}>
                <Mail size={15} style={{ color: "#FF2DAA" }} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#AAAABC] font-semibold">Email</p>
                <p className="text-sm font-semibold text-[#1A1A2E] mt-0.5">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,45,170,0.08)" }}>
                <Calendar size={15} style={{ color: "#FF2DAA" }} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#AAAABC] font-semibold">Member Since</p>
                <p className="text-sm font-semibold text-[#1A1A2E] mt-0.5">{joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Community CTA */}
          <div
            className="rounded-2xl p-5 mb-5 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(255,45,170,0.06), rgba(217,31,144,0.04))", border: "1px solid rgba(255,45,170,0.12)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,45,170,0.1)" }}>
              <Sparkles size={17} style={{ color: "#FF2DAA" }} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1A2E]">Ready to go deeper?</p>
              <p className="text-xs text-[#888899] mt-0.5">Apply to join our private healing community.</p>
            </div>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all border"
            style={{ background: "white", border: "1px solid #EEEEF3", color: "#888899" }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // ── Auth card ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-28 pb-20 px-4" style={{ background: "#F9F9FB" }}>
      <div className="max-w-[420px] mx-auto">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 8px 24px rgba(255,45,170,0.3)" }}
          >
            <User size={24} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#1A1A2E]">
            {tab === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-[#888899] mt-1.5">
            {tab === "signin" ? "Sign in to access your account." : "Join the Evolve 2 Purpose community."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#EEEEF5] rounded-xl p-1 mb-6">
          {(["signin", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSiError(""); setSuError(""); setSuSuccess(false); }}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
              style={tab === t
                ? { background: "white", color: "#FF2DAA", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }
                : { color: "#888899" }
              }
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#EEEEF3] shadow-sm p-7">

          {/* ── Sign In ── */}
          {tab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  value={siEmail}
                  onChange={(e) => { setSiEmail(e.target.value); setSiError(""); }}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  className={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = siError ? "#F87171" : "#E8E8EE")}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={siShow ? "text" : "password"}
                    value={siPassword}
                    onChange={(e) => { setSiPassword(e.target.value); setSiError(""); }}
                    placeholder="••••••••"
                    required
                    className={`${inputBase} pr-11`}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = siError ? "#F87171" : "#E8E8EE")}
                  />
                  <button type="button" onClick={() => setSiShow(!siShow)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC] hover:text-[#666] transition-colors">
                    {siShow ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {siError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium bg-red-50 border border-red-100 text-red-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {siError}
                </div>
              )}

              <button
                type="submit"
                disabled={siLoading || !siEmail || !siPassword}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                style={{
                  background: "linear-gradient(135deg, #FF2DAA, #d91f90)",
                  boxShadow: siLoading || !siEmail || !siPassword ? "none" : "0 4px 20px rgba(255,45,170,0.3)",
                }}
              >
                {siLoading ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight size={14} /></>
                )}
              </button>

              <p className="text-center text-xs text-[#AAAABC] pt-1">
                Don't have an account?{" "}
                <button type="button" onClick={() => setTab("signup")} className="font-semibold" style={{ color: "#FF2DAA" }}>
                  Create one free
                </button>
              </p>
            </form>
          )}

          {/* ── Sign Up ── */}
          {tab === "signup" && !suSuccess && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  value={suName}
                  onChange={(e) => { setSuName(e.target.value); setSuError(""); }}
                  placeholder="Your name"
                  required
                  autoFocus
                  className={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  value={suEmail}
                  onChange={(e) => { setSuEmail(e.target.value); setSuError(""); }}
                  placeholder="you@example.com"
                  required
                  className={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={suShow ? "text" : "password"}
                    value={suPassword}
                    onChange={(e) => { setSuPassword(e.target.value); setSuError(""); }}
                    placeholder="Min. 6 characters"
                    required
                    className={`${inputBase} pr-11`}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")}
                  />
                  <button type="button" onClick={() => setSuShow(!suShow)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC] hover:text-[#666] transition-colors">
                    {suShow ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#AAAABC] uppercase tracking-wider mb-1.5 ml-1">Confirm Password</label>
                <input
                  type={suShow ? "text" : "password"}
                  value={suConfirm}
                  onChange={(e) => { setSuConfirm(e.target.value); setSuError(""); }}
                  placeholder="Repeat password"
                  required
                  className={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")}
                />
              </div>

              {suError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium bg-red-50 border border-red-100 text-red-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  {suError}
                </div>
              )}

              <button
                type="submit"
                disabled={suLoading || !suName || !suEmail || !suPassword || !suConfirm}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                style={{
                  background: "linear-gradient(135deg, #FF2DAA, #d91f90)",
                  boxShadow: suLoading || !suName || !suEmail || !suPassword || !suConfirm ? "none" : "0 4px 20px rgba(255,45,170,0.3)",
                }}
              >
                {suLoading ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating account...</>
                ) : (
                  <>Create Account <ArrowRight size={14} /></>
                )}
              </button>

              <p className="text-center text-xs text-[#AAAABC] pt-1">
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("signin")} className="font-semibold" style={{ color: "#FF2DAA" }}>
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* ── Sign-up success ── */}
          {tab === "signup" && suSuccess && (
            <div className="text-center py-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1A1A2E] mb-2">Check your email</h3>
              <p className="text-sm text-[#888899] leading-relaxed">
                We sent a confirmation link to <strong className="text-[#1A1A2E]">{suEmail}</strong>.
                Click it to activate your account, then come back to sign in.
              </p>
              <button
                onClick={() => { setTab("signin"); setSuSuccess(false); }}
                className="mt-6 text-xs font-semibold"
                style={{ color: "#FF2DAA" }}
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#CCCCDD] mt-6">
          By creating an account you agree to our{" "}
          <a href="/terms" className="underline hover:text-[#FF2DAA] transition-colors">Terms</a>
          {" "}and{" "}
          <a href="/privacy-policy" className="underline hover:text-[#FF2DAA] transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Account;
