import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight, ArrowLeft, Check, Lock, User, Eye, EyeOff, Sparkles, ChevronRight,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import useSEO from "@/hooks/useSEO";

// ── Program config ──────────────────────────────────────────────────────────
const PROGRAMS = {
  "one-on-one": {
    title: "1:1 Deep-Dive Coaching",
    price: "Starting at $111",
    tag: "Most Transformative",
    applyLabel: "Submit Application",
    amount: 111,
    includes: [
      "Weekly 60-min private sessions",
      "Unlimited WhatsApp support",
      "Fully customized transformation roadmap",
      "Post-program integration session",
    ],
    questions: [
      {
        key: "challenge",
        label: "What is the primary challenge or pattern you're ready to transform?",
        type: "textarea" as const,
        placeholder: "Be honest and specific — this helps Sarah understand exactly where to begin.",
      },
      {
        key: "tried",
        label: "What have you already tried, and where did it fall short?",
        type: "textarea" as const,
        placeholder: "Therapy, books, courses, other coaches — what's helped, what hasn't?",
      },
      {
        key: "vision",
        label: "What would success look like in your life 90 days from now?",
        type: "textarea" as const,
        placeholder: "Paint the picture — relationships, identity, clarity, peace. What changes?",
      },
      {
        key: "readiness",
        label: "On a scale of 1–10, how ready are you to do deep inner work — and why that number?",
        type: "textarea" as const,
        placeholder: "Honest self-assessment is the first act of accountability.",
      },
    ],
  },
  "group": {
    title: "Evolve 2 Purpose Group Program",
    price: "$444",
    tag: "Best Value · 8 Weeks",
    applyLabel: "Submit Application",
    amount: 444,
    includes: [
      "8 weeks of live group sessions with Sarah",
      "Full L.A.T.T. framework curriculum",
      "Weekly accountability partner matching",
      "Lifetime session recordings",
    ],
    questions: [
      {
        key: "goal",
        label: "What is your primary goal for the 8-week program?",
        type: "textarea" as const,
        placeholder: "What do you want to heal, break, or build over these 8 weeks?",
      },
      {
        key: "cycle",
        label: "What generational cycle or pattern are you most ready to break?",
        type: "textarea" as const,
        placeholder: "Name it. The work begins the moment you can name it.",
      },
      {
        key: "commitment",
        label: "Are you able to commit to weekly live sessions for 8 weeks?",
        type: "select" as const,
        options: [
          "Yes, I'm fully committed",
          "Mostly yes — occasional conflicts, I'll use recordings",
          "I would primarily rely on recordings",
        ],
      },
      {
        key: "community",
        label: "Why do you want to do this work in community rather than alone?",
        type: "textarea" as const,
        placeholder: "What does being surrounded by other women doing the work mean to you?",
      },
    ],
  },
  "healing-intensive": {
    title: "Healing Intensive Weekend",
    price: "$999",
    tag: "Accelerated Breakthrough",
    applyLabel: "Reserve My Spot",
    amount: 999,
    includes: [
      "2 full days of immersive healing work",
      "Small group — maximum 12 women",
      "Direct access to Sarah throughout",
      "60-day post-intensive group support",
    ],
    questions: [
      {
        key: "breakthrough",
        label: "What specific breakthrough are you hoping to experience this weekend?",
        type: "textarea" as const,
        placeholder: "Be as specific as possible — vague goals produce vague results.",
      },
      {
        key: "readiness",
        label: "Intensives move fast and go deep. What makes you ready for that pace right now?",
        type: "textarea" as const,
        placeholder: "What's happened recently that makes this the right time?",
      },
      {
        key: "experience",
        label: "Have you worked with a coach or therapist before?",
        type: "select" as const,
        options: [
          "Yes, I'm actively in coaching or therapy",
          "Previously, but not currently",
          "No — this would be my first time",
          "I've done courses and self-study but not 1:1 work",
        ],
      },
      {
        key: "expectation",
        label: "What would make this the most transformative weekend of your life?",
        type: "textarea" as const,
        placeholder: "What shift, realization, or release would make it worth everything?",
      },
    ],
  },
  "purpose-clarity": {
    title: "Purpose Clarity Session",
    price: "1:1 Session · $197",
    tag: "90-Minute Intensive",
    applyLabel: "Book My Session",
    amount: 197,
    includes: [
      "90-min 1:1 private session with Sarah",
      "Pre-session intake questionnaire",
      "Full session recording within 24hrs",
      "Written action plan delivered",
    ],
    questions: [
      {
        key: "stuck",
        label: "Where are you feeling most stuck right now?",
        type: "textarea" as const,
        placeholder: "Career, relationships, identity, purpose — what area needs the most clarity?",
      },
      {
        key: "crossroads",
        label: "Is there a specific decision, transition, or crossroads you're navigating?",
        type: "textarea" as const,
        placeholder: "The more specific you are, the more targeted Sarah can be in the session.",
      },
      {
        key: "outcome",
        label: "What do you want to walk away knowing after this session?",
        type: "textarea" as const,
        placeholder: "If you had total clarity on one thing by the end — what would that be?",
      },
    ],
  },
};

type ProgramKey = keyof typeof PROGRAMS;
type Step = "account" | "application" | "confirmed";
type AuthTab = "signin" | "signup";

const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm bg-white border border-[#E8E8EE] text-[#1A1A2E] placeholder:text-[#AAAABC] focus:outline-none transition-all";

// ── Step indicator ──────────────────────────────────────────────────────────
const STEPS: { id: Step; label: string }[] = [
  { id: "account", label: "Your Account" },
  { id: "application", label: "Application" },
  { id: "confirmed", label: "Confirmed" },
];

const stepIndex = (s: Step) => STEPS.findIndex((x) => x.id === s);

// ── Main component ──────────────────────────────────────────────────────────
const Apply = () => {
  const [searchParams] = useSearchParams();
  const programKey = (searchParams.get("program") ?? "one-on-one") as ProgramKey;
  const program = PROGRAMS[programKey] ?? PROGRAMS["one-on-one"];

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [step, setStep] = useState<Step>("account");
  const [authLoading, setAuthLoading] = useState(true);

  // Auth state
  const [authTab, setAuthTab] = useState<AuthTab>("signup");
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siShow, setSiShow] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suShow, setSuShow] = useState(false);
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  // Application state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [appLoading, setAppLoading] = useState(false);
  const [appError, setAppError] = useState("");

  useSEO({
    title: `Apply — ${program.title} | Evolve 2 Purpose`,
    description: `Apply for ${program.title} with Sarah Adams. ${program.price}.`,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) setStep("application");
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u && step === "account") setStep("application");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // ── Auth handlers ──────────────────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiLoading(true);
    setSiError("");
    const { error } = await supabase.auth.signInWithPassword({ email: siEmail, password: siPassword });
    if (error) {
      setSiError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
      setSiLoading(false);
    }
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
    // sign up succeeds → auth listener fires → step advances
  };

  // ── Application submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAppLoading(true);
    setAppError("");

    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Applicant";
    const notes = program.questions
      .map((q) => `${q.label}\n${answers[q.key] || "—"}`)
      .join("\n\n");

    const { error } = await supabase.from("program_enrollments").insert({
      name,
      email: user.email,
      program: program.title,
      amount: program.amount,
      status: "pending",
      notes,
    });

    setAppLoading(false);
    if (error) { setAppError("Something went wrong. Please try again."); return; }
    setStep("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allAnswered = program.questions.every((q) => (answers[q.key] ?? "").trim().length > 0);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#08080C" }}>
        <span className="w-6 h-6 rounded-full border-2 border-[#FF2DAA]/30 border-t-[#FF2DAA] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: "#08080C" }}>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 65%)" }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top nav */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link to={`/programs/${programKey}`} className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors">
            <ArrowLeft size={13} /> Back
          </Link>
          <img src="/logo.png" alt="Evolve 2 Purpose" className="h-7 w-auto object-contain opacity-80" />
          <Link to="/programs" className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors">All Programs</Link>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* ── Left panel — program summary ──────────────────────────────── */}
          <div className="lg:w-[380px] xl:w-[420px] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0 border-r border-white/[0.06] p-8 lg:p-10 flex flex-col">
            {/* Tag */}
            <span className="inline-block self-start text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              {program.tag}
            </span>

            {/* Program name */}
            <h2 className="font-heading text-2xl xl:text-3xl text-white font-bold letter-tight leading-tight mb-2">
              {program.title}
            </h2>
            <p className="font-heading text-xl font-bold mb-6" style={{ color: "#FF2DAA" }}>{program.price}</p>

            {/* What's included */}
            <div className="mb-8">
              <p className="text-[10px] font-bold letter-luxury uppercase text-white/30 mb-4">What's Included</p>
              <ul className="space-y-3">
                {program.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/55">
                    <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="w-full h-px mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Secure badge */}
            <div className="flex items-center gap-2.5 mt-auto">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <Lock size={12} style={{ color: "#10B981" }} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/40">Secure Application</p>
                <p className="text-[10px] text-white/25 mt-0.5">Your information is protected and never shared.</p>
              </div>
            </div>
          </div>

          {/* ── Right panel — form steps ──────────────────────────────────── */}
          <div className="flex-1 flex flex-col px-6 py-10 lg:px-14 xl:px-20 max-w-2xl lg:max-w-none lg:mx-0 mx-auto w-full">

            {/* Step indicator */}
            {step !== "confirmed" && (
              <div className="flex items-center gap-0 mb-12">
                {STEPS.filter(s => s.id !== "confirmed").map((s, i) => {
                  const current = step === s.id;
                  const done = stepIndex(step) > i;
                  return (
                    <div key={s.id} className="flex items-center">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                          style={done ? { background: "#FF2DAA", color: "white" } : current ? { background: "rgba(255,45,170,0.2)", color: "#FF2DAA", border: "1.5px solid rgba(255,45,170,0.5)" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.08)" }}
                        >
                          {done ? <Check size={12} /> : i + 1}
                        </div>
                        <span className="text-xs font-semibold hidden sm:block" style={{ color: current ? "rgba(255,255,255,0.8)" : done ? "#FF2DAA" : "rgba(255,255,255,0.25)" }}>
                          {s.label}
                        </span>
                      </div>
                      {i < STEPS.filter(s => s.id !== "confirmed").length - 1 && (
                        <div className="w-8 sm:w-16 h-px mx-3" style={{ background: done ? "rgba(255,45,170,0.4)" : "rgba(255,255,255,0.07)" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── STEP 1: Account ─────────────────────────────────────────── */}
            {step === "account" && (
              <div className="max-w-md">
                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">
                  Create your account
                </h1>
                <p className="text-white/45 text-base mb-8 leading-relaxed">
                  Your account keeps your application secure and lets Sarah reach you directly.
                </p>

                {/* Tab switcher */}
                <div className="flex bg-white/[0.05] border border-white/[0.07] rounded-xl p-1 mb-7">
                  {(["signup", "signin"] as AuthTab[]).map((t) => (
                    <button key={t} onClick={() => { setAuthTab(t); setSiError(""); setSuError(""); }}
                      className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={authTab === t ? { background: "rgba(255,45,170,0.18)", color: "#FF2DAA", border: "1px solid rgba(255,45,170,0.3)" } : { color: "rgba(255,255,255,0.35)" }}>
                      {t === "signup" ? "Create Account" : "Sign In"}
                    </button>
                  ))}
                </div>

                {/* Sign up form */}
                {authTab === "signup" && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                      <input type="text" value={suName} onChange={(e) => { setSuName(e.target.value); setSuError(""); }} placeholder="Your name" required autoFocus className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                      <input type="email" value={suEmail} onChange={(e) => { setSuEmail(e.target.value); setSuError(""); }} placeholder="you@example.com" required className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                      <div className="relative">
                        <input type={suShow ? "text" : "password"} value={suPassword} onChange={(e) => { setSuPassword(e.target.value); setSuError(""); }} placeholder="Min. 6 characters" required className={`${inputBase} pr-11`}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                        <button type="button" onClick={() => setSuShow(!suShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC]">
                          {suShow ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Confirm Password</label>
                      <input type={suShow ? "text" : "password"} value={suConfirm} onChange={(e) => { setSuConfirm(e.target.value); setSuError(""); }} placeholder="Repeat password" required className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    {suError && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{suError}
                      </div>
                    )}
                    <button type="submit" disabled={suLoading || !suName || !suEmail || !suPassword || !suConfirm}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 4px 24px rgba(255,45,170,0.35)" }}>
                      {suLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating account...</> : <>Continue to Application <ArrowRight size={15} /></>}
                    </button>
                    <p className="text-center text-xs text-white/25 pt-1">
                      Already have an account?{" "}
                      <button type="button" onClick={() => setAuthTab("signin")} className="font-semibold" style={{ color: "#FF2DAA" }}>Sign in</button>
                    </p>
                  </form>
                )}

                {/* Sign in form */}
                {authTab === "signin" && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                      <input type="email" value={siEmail} onChange={(e) => { setSiEmail(e.target.value); setSiError(""); }} placeholder="you@example.com" required autoFocus className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                      <div className="relative">
                        <input type={siShow ? "text" : "password"} value={siPassword} onChange={(e) => { setSiPassword(e.target.value); setSiError(""); }} placeholder="••••••••" required className={`${inputBase} pr-11`}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                        <button type="button" onClick={() => setSiShow(!siShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC]">
                          {siShow ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                    {siError && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{siError}
                      </div>
                    )}
                    <button type="submit" disabled={siLoading || !siEmail || !siPassword}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 4px 24px rgba(255,45,170,0.35)" }}>
                      {siLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in...</> : <>Sign In & Continue <ArrowRight size={15} /></>}
                    </button>
                    <p className="text-center text-xs text-white/25 pt-1">
                      New here?{" "}
                      <button type="button" onClick={() => setAuthTab("signup")} className="font-semibold" style={{ color: "#FF2DAA" }}>Create a free account</button>
                    </p>
                  </form>
                )}
              </div>
            )}

            {/* ── STEP 2: Application ──────────────────────────────────────── */}
            {step === "application" && user && (
              <div className="max-w-xl">
                {/* Greeting */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)" }}>
                    {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Signed in as {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-white/35 text-xs mt-0.5">{user.email}</p>
                  </div>
                </div>

                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">
                  Your application
                </h1>
                <p className="text-white/45 text-base mb-10 leading-relaxed">
                  Answer honestly. Sarah personally reviews every application — the more specific you are, the better she can serve you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {program.questions.map((q, i) => (
                    <div key={q.key}>
                      <label className="block text-sm font-semibold text-white/80 mb-1.5 leading-snug">
                        <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {q.label}
                      </label>

                      {q.type === "textarea" && (
                        <textarea
                          value={answers[q.key] ?? ""}
                          onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))}
                          placeholder={q.placeholder}
                          required
                          rows={4}
                          className={`${inputBase} resize-none`}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")}
                        />
                      )}

                      {q.type === "select" && q.options && (
                        <div className="space-y-2.5 mt-3">
                          {q.options.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                                style={answers[q.key] === opt ? { borderColor: "#FF2DAA", background: "#FF2DAA" } : { borderColor: "#D0D0DC", background: "white" }}
                                onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
                              >
                                {answers[q.key] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <input type="radio" name={q.key} value={opt} checked={answers[q.key] === opt} onChange={() => setAnswers((a) => ({ ...a, [q.key]: opt }))} className="sr-only" />
                              <span className="text-sm leading-snug transition-colors" style={{ color: answers[q.key] === opt ? "#1A1A2E" : "#666680" }}>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {appError && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{appError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button type="submit" disabled={appLoading || !allAnswered}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: appLoading || !allAnswered ? "none" : "0 4px 24px rgba(255,45,170,0.35)" }}>
                      {appLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting...</> : <>{program.applyLabel} <ArrowRight size={15} /></>}
                    </button>
                    <p className="text-center text-xs text-white/25 mt-4">
                      By submitting you agree to our{" "}
                      <Link to="/terms" className="underline hover:text-white/50 transition-colors">Terms</Link>{" "}and{" "}
                      <Link to="/privacy-policy" className="underline hover:text-white/50 transition-colors">Privacy Policy</Link>.
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ── STEP 3: Confirmed ────────────────────────────────────────── */}
            {step === "confirmed" && (
              <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left py-8">
                {/* Success icon */}
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 8px 40px rgba(255,45,170,0.4)" }}>
                    <Check size={36} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl text-white font-bold letter-tight mb-4 leading-tight">
                  Application<br />received.
                </h1>
                <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-md">
                  Thank you for applying to the <span className="text-white font-semibold">{program.title}</span>. Sarah personally reviews every application. You'll hear back within <span className="text-white font-semibold">2–3 business days</span>.
                </p>

                {/* What's next */}
                <div className="rounded-2xl p-7 mb-10 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-bold letter-luxury uppercase text-white/30 mb-5">What Happens Next</p>
                  {[
                    { num: "01", text: "Sarah reviews your application within 2–3 business days." },
                    { num: "02", text: "You'll receive a personal email from Sarah's team with next steps." },
                    { num: "03", text: "For 1:1 and Intensive programs, a brief discovery call will be scheduled." },
                    { num: "04", text: "Once accepted, your transformation begins." },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-4 mb-4 last:mb-0">
                      <span className="font-heading text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }}>{item.num}</span>
                      <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/programs" className="btn-neon-outline !py-3.5">
                    View All Programs
                  </Link>
                  <Link to="/account" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all">
                    <User size={14} /> My Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
