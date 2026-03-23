import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight, ArrowLeft, Check, Lock, User, Eye, EyeOff,
  ChevronLeft, ChevronRight, Clock, Calendar, CreditCard,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import useSEO from "@/hooks/useSEO";

// ── Program config ───────────────────────────────────────────────────────────
const PROGRAMS = {
  "one-on-one": {
    title: "1:1 Deep-Dive Coaching",
    price: "Starting at $111",
    tag: "Most Transformative",
    applyLabel: "Proceed to Schedule",
    amount: 111,
    includes: [
      "Weekly 60-min private sessions",
      "Unlimited group support",
      "Fully customized transformation roadmap",
      "Post-program integration session",
    ],
    questions: [
      { key: "challenge", label: "What is the primary challenge or pattern you're ready to transform?", type: "textarea" as const, placeholder: "Be honest and specific — this helps Sarah understand exactly where to begin." },
      { key: "tried", label: "What have you already tried, and where did it fall short?", type: "textarea" as const, placeholder: "Therapy, books, courses, other coaches — what's helped, what hasn't?" },
      { key: "vision", label: "What would success look like in your life 90 days from now?", type: "textarea" as const, placeholder: "Paint the picture — relationships, identity, clarity, peace. What changes?" },
      { key: "readiness", label: "On a scale of 1–10, how ready are you to do deep inner work — and why that number?", type: "textarea" as const, placeholder: "Honest self-assessment is the first act of accountability." },
    ],
  },
  "group": {
    title: "Evolve 2 Purpose Group Program",
    price: "$444",
    tag: "Best Value · 8 Weeks",
    applyLabel: "Proceed to Schedule",
    amount: 444,
    includes: [
      "8 weeks of live group sessions with Sarah",
      "Guided workbook included",
      "Weekly teach-backs with the group",
      "Lifetime session recordings",
    ],
    questions: [
      { key: "goal", label: "What is your primary goal for the 8-week program?", type: "textarea" as const, placeholder: "What do you want to heal, break, or build over these 8 weeks?" },
      { key: "cycle", label: "What generational cycle or pattern are you most ready to break?", type: "textarea" as const, placeholder: "Name it. The work begins the moment you can name it." },
      { key: "commitment", label: "Are you able to commit to weekly live sessions for 8 weeks?", type: "select" as const, options: ["Yes, I'm fully committed", "Mostly yes — occasional conflicts, I'll use recordings", "I would primarily rely on recordings"] },
      { key: "community", label: "Why do you want to do this work in community rather than alone?", type: "textarea" as const, placeholder: "What does being surrounded by other women doing the work mean to you?" },
    ],
  },
  "healing-intensive": {
    title: "Healing Intensive Weekend",
    price: "$999",
    tag: "Accelerated Breakthrough",
    applyLabel: "Proceed to Schedule",
    amount: 999,
    includes: [
      "2 full days of immersive healing work",
      "Small group — maximum 16 women",
      "Direct access to Sarah throughout",
      "60-day post-intensive group support",
    ],
    questions: [
      { key: "breakthrough", label: "What specific breakthrough are you hoping to experience this weekend?", type: "textarea" as const, placeholder: "Be as specific as possible — vague goals produce vague results." },
      { key: "readiness", label: "Intensives move fast and go deep. What makes you ready for that pace right now?", type: "textarea" as const, placeholder: "What's happened recently that makes this the right time?" },
      { key: "experience", label: "Have you worked with a coach or therapist before?", type: "select" as const, options: ["Yes, I'm actively in coaching or therapy", "Previously, but not currently", "No — this would be my first time", "I've done courses and self-study but not 1:1 work"] },
      { key: "expectation", label: "What would make this the most transformative weekend of your life?", type: "textarea" as const, placeholder: "What shift, realization, or release would make it worth everything?" },
    ],
  },
  "purpose-clarity": {
    title: "Purpose Clarity Session",
    price: "1:1 Session · $197",
    tag: "90-Minute Intensive",
    applyLabel: "Proceed to Schedule",
    amount: 197,
    includes: [
      "90-min 1:1 private session with Sarah",
      "Pre-session intake questionnaire",
      "Full session recording within 24hrs",
      "Written action plan delivered",
    ],
    questions: [
      { key: "stuck", label: "Where are you feeling most stuck right now?", type: "textarea" as const, placeholder: "Career, relationships, identity, purpose — what area needs the most clarity?" },
      { key: "crossroads", label: "Is there a specific decision, transition, or crossroads you're navigating?", type: "textarea" as const, placeholder: "The more specific you are, the more targeted Sarah can be in the session." },
      { key: "outcome", label: "What do you want to walk away knowing after this session?", type: "textarea" as const, placeholder: "If you had total clarity on one thing by the end — what would that be?" },
    ],
  },
  "mentorship": {
    title: "The Mentorship Program",
    price: "$2,222",
    tag: "Crown-Jewel Experience",
    applyLabel: "Proceed to Schedule",
    amount: 2222,
    includes: [
      "3-day immersive retreat with Sarah Adams",
      "16 weeks of live group classes",
      "5 private 1:1 coaching sessions",
      "Max 10 women — deep intimacy guaranteed",
    ],
    questions: [
      { key: "why", label: "Why is the Mentorship Program the right container for you — and why now?", type: "textarea" as const, placeholder: "Tell Sarah where you are, what has brought you to this decision, and why this level of investment feels right." },
      { key: "cycle", label: "What generational cycle or deep pattern are you most committed to breaking through this program?", type: "textarea" as const, placeholder: "Be specific — the work begins the moment you name it clearly." },
      { key: "vision", label: "Where do you see yourself — personally, professionally, spiritually — when this program ends?", type: "textarea" as const, placeholder: "Paint the full picture of what transformation looks like 4 months from now." },
      { key: "calling", label: "Do you sense a calling or purpose that your healing is connected to? Tell us about it.", type: "textarea" as const, placeholder: "This program is designed for women whose healing is tied to something they are meant to do in the world." },
      { key: "commitment", label: "This program requires full 16-week commitment including a 3-day retreat. Are you fully able to commit?", type: "select" as const, options: ["Yes — I am fully committed and have cleared my schedule", "Yes — with minor scheduling flexibility needed", "I need to discuss scheduling before committing"] },
    ],
  },
};

type ProgramKey = keyof typeof PROGRAMS;
type Step = "account" | "application" | "schedule" | "payment" | "confirmed";
type AuthTab = "signin" | "signup";

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEK_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const inputBase = "w-full px-4 py-3 rounded-xl text-sm bg-white border border-[#E8E8EE] text-[#1A1A2E] placeholder:text-[#AAAABC] focus:outline-none transition-all";

// ── Step config ───────────────────────────────────────────────────────────────
const STEP_LIST: { id: Step; label: string }[] = [
  { id: "account", label: "Account" },
  { id: "application", label: "Application" },
  { id: "schedule", label: "Schedule" },
  { id: "payment", label: "Payment" },
];
const stepIdx = (s: Step) => STEP_LIST.findIndex((x) => x.id === s);

// ── Calendar component ────────────────────────────────────────────────────────
const BookingCalendar = ({
  value,
  onChange,
  thursdayOnly = false,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  thursdayOnly?: boolean;
}) => {
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Week starts Monday: getDay() → Sun=0,Mon=1..Sat=6 → offset = (day + 6) % 7
  const firstDayOffset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const isSelectable = (d: Date) => {
    const day = d.getDay(); // 0=Sun, 6=Sat
    if (thursdayOnly) return d >= today && day === 4; // Group: Thursdays only
    return d >= today && day !== 0 && day !== 6;
  };

  const isSelected = (d: Date) =>
    value !== null && d.toDateString() === value.toDateString();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const cells: (Date | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];

  return (
    <div className="rounded-2xl border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.04)" }}>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-heading font-bold text-sm text-white">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold letter-luxury uppercase py-1"
            style={{ color: d === "Sat" || d === "Sun" ? "rgba(255,255,255,0.15)" : "rgba(255,45,170,0.7)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => isSelectable(day) && onChange(day)}
              disabled={!isSelectable(day)}
              className="w-full aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150"
              style={
                isSelected(day)
                  ? { background: "linear-gradient(135deg, #FF2DAA, #d91f90)", color: "white", boxShadow: "0 2px 12px rgba(255,45,170,0.4)" }
                  : !isSelectable(day)
                  ? { color: "rgba(255,255,255,0.15)", cursor: "not-allowed" }
                  : { color: "rgba(255,255,255,0.7)", cursor: "pointer" }
              }
              onMouseEnter={(e) => { if (isSelectable(day) && !isSelected(day)) e.currentTarget.style.background = "rgba(255,45,170,0.15)"; }}
              onMouseLeave={(e) => { if (!isSelected(day)) e.currentTarget.style.background = ""; }}
            >
              {day.getDate()}
            </button>
          )
        )}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Apply = () => {
  const [searchParams] = useSearchParams();
  const programKey = (searchParams.get("program") ?? "one-on-one") as ProgramKey;
  const program = PROGRAMS[programKey] ?? PROGRAMS["one-on-one"];
  const paidParam = searchParams.get("paid");

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [step, setStep] = useState<Step>("account");
  const [authLoading, setAuthLoading] = useState(true);

  // Auth
  const [authTab, setAuthTab] = useState<AuthTab>("signup");
  const [siEmail, setSiEmail] = useState(""); const [siPassword, setSiPassword] = useState(""); const [siShow, setSiShow] = useState(false); const [siError, setSiError] = useState(""); const [siLoading, setSiLoading] = useState(false);
  const [suName, setSuName] = useState(""); const [suEmail, setSuEmail] = useState(""); const [suPassword, setSuPassword] = useState(""); const [suConfirm, setSuConfirm] = useState(""); const [suShow, setSuShow] = useState(false); const [suError, setSuError] = useState(""); const [suLoading, setSuLoading] = useState(false);

  // Application
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Schedule
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  // Payment
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState("");

  // Prerequisite: non-1:1 programs require a prior 1:1 enrollment
  const [hasPrereq, setHasPrereq] = useState<boolean | null>(
    programKey === "one-on-one" ? true : null
  );

  const isGroupProgram = programKey === "group";

  useSEO({ title: `Apply — ${program.title} | Evolve 2 Purpose`, description: `Apply for ${program.title} with Sarah Adams. ${program.price}.` });

  useEffect(() => {
    // If returning from Stripe with ?paid=true, restore saved state, persist enrollment, show confirmed
    if (paidParam === "true") {
      supabase.auth.getSession().then(async ({ data }) => {
        const u = data.session?.user ?? null;
        setUser(u);

        // Restore pre-redirect state from sessionStorage
        const storageKey = `apply_${programKey}`;
        const savedDate = sessionStorage.getItem(`${storageKey}_date`);
        const savedTime = sessionStorage.getItem(`${storageKey}_time`);
        const savedAnswers = sessionStorage.getItem(`${storageKey}_answers`);
        const parsedAnswers: Record<string, string> = savedAnswers ? JSON.parse(savedAnswers) : {};

        if (savedDate) setSelectedDate(new Date(savedDate));
        if (savedTime) setSelectedTime(savedTime);
        if (savedAnswers) setAnswers(parsedAnswers);

        if (u) {
          const name = u.user_metadata?.full_name || u.email?.split("@")[0] || "Applicant";
          const { error } = await supabase.from("program_enrollments").insert({
            user_id: u.id,
            name,
            email: u.email,
            program: program.title,
            amount: program.amount,
            status: "enrolled",
            scheduled_date: savedDate ? new Date(savedDate).toISOString().split("T")[0] : null,
            scheduled_time: savedTime || null,
            answers: parsedAnswers,
          });
          if (!error) {
            // Clean up storage and replace URL to prevent double-insert on refresh
            sessionStorage.removeItem(`${storageKey}_date`);
            sessionStorage.removeItem(`${storageKey}_time`);
            sessionStorage.removeItem(`${storageKey}_answers`);
            window.history.replaceState({}, "", `/apply?program=${programKey}&confirmed=true`);
          }
        }

        setStep("confirmed");
        setAuthLoading(false);
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) setStep("application");
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      // Only advance from account step — functional update reads current state
      setStep((prev) => (u && prev === "account" ? "application" : prev));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Check prereq (1:1 enrollment) for non-1:1 programs
  useEffect(() => {
    if (!user || programKey === "one-on-one") return;
    supabase
      .from("program_enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("program", "1:1 Deep-Dive Coaching")
      .in("status", ["enrolled", "active", "completed"])
      .then(({ data }) => setHasPrereq(!!(data?.length)));
  }, [user, programKey]);

  // Auth handlers
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); setSiLoading(true); setSiError("");
    const { error } = await supabase.auth.signInWithPassword({ email: siEmail, password: siPassword });
    if (error) { setSiError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message); setSiLoading(false); }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); setSuError("");
    if (suPassword !== suConfirm) { setSuError("Passwords don't match."); return; }
    if (suPassword.length < 6) { setSuError("Password must be at least 6 characters."); return; }
    setSuLoading(true);
    const { error } = await supabase.auth.signUp({ email: suEmail, password: suPassword, options: { data: { full_name: suName } } });
    setSuLoading(false);
    if (error) setSuError(error.message);
  };

  // Payment via Stripe Checkout
  const handlePayment = async () => {
    if (!user || !selectedDate || !selectedTime) return;
    setPayLoading(true); setPayError("");

    const origin = window.location.origin;
    const successUrl = `${origin}/apply?program=${programKey}&paid=true`;
    const cancelUrl = `${origin}/apply?program=${programKey}`;

    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programTitle: program.title,
          amount: program.amount,
          email: user.email,
          successUrl,
          cancelUrl,
        }),
      });
      const data = await res.json();
      if (data.url) {
        // Persist state before leaving — Stripe redirect resets React state
        const storageKey = `apply_${programKey}`;
        if (selectedDate) sessionStorage.setItem(`${storageKey}_date`, selectedDate.toISOString());
        sessionStorage.setItem(`${storageKey}_time`, selectedTime);
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        window.location.href = data.url;
      } else {
        setPayError(data.error ?? "Something went wrong. Please try again.");
        setPayLoading(false);
      }
    } catch {
      setPayError("Network error. Please check your connection and try again.");
      setPayLoading(false);
    }
  };

  const allAnswered = program.questions.every((q) => (answers[q.key] ?? "").trim().length > 0);
  const scheduleComplete = selectedDate !== null && selectedTime !== "";

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#08080C" }}>
        <span className="w-6 h-6 rounded-full border-2 border-[#FF2DAA]/30 border-t-[#FF2DAA] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: "#08080C" }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 65%)" }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link to={`/programs/${programKey}`} className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors">
            <ArrowLeft size={13} /> Back
          </Link>
          <img src="/logo.png" alt="Evolve 2 Purpose" className="h-7 w-auto object-contain opacity-80" />
          <Link to="/programs" className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors">All Programs</Link>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* ── Left panel ─────────────────────────────────────────────────── */}
          <div className="lg:w-[360px] xl:w-[400px] lg:sticky lg:top-0 lg:h-screen flex-shrink-0 border-r border-white/[0.06] p-8 lg:p-10 flex flex-col">
            <span className="inline-block self-start text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              {program.tag}
            </span>
            <h2 className="font-heading text-2xl text-white font-bold letter-tight leading-tight mb-2">{program.title}</h2>
            <p className="font-heading text-xl font-bold mb-7" style={{ color: "#FF2DAA" }}>{program.price}</p>

            <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-3">What's Included</p>
            <ul className="space-y-2.5 mb-8">
              {program.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <Check size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Progress recap when scheduling */}
            {(step === "schedule" || step === "payment") && selectedDate && (
              <div className="rounded-2xl p-4 mb-6 border border-white/[0.07]" style={{ background: "rgba(255,45,170,0.06)" }}>
                <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-3">Your Session</p>
                <div className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
                  <Calendar size={12} style={{ color: "#FF2DAA" }} />
                  {formatDate(selectedDate)}
                </div>
                {selectedTime && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Clock size={12} style={{ color: "#FF2DAA" }} />
                    {selectedTime} EST
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <Lock size={12} style={{ color: "#10B981" }} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/40">Secure Application</p>
                <p className="text-[10px] text-white/25">256-bit SSL encryption</p>
              </div>
            </div>
          </div>

          {/* ── Right panel ────────────────────────────────────────────────── */}
          <div className="flex-1 px-6 py-10 lg:px-14 xl:px-20 max-w-2xl mx-auto lg:max-w-none lg:mx-0 w-full">

            {/* Step indicator */}
            {step !== "confirmed" && (
              <div className="flex items-center gap-0 mb-12">
                {STEP_LIST.map((s, i) => {
                  const current = step === s.id;
                  const done = stepIdx(step) > i;
                  return (
                    <div key={s.id} className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={
                          done ? { background: "#FF2DAA", color: "white" }
                          : current ? { background: "rgba(255,45,170,0.2)", color: "#FF2DAA", border: "1.5px solid rgba(255,45,170,0.5)" }
                          : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.08)" }
                        }>
                          {done ? <Check size={12} /> : i + 1}
                        </div>
                        <span className="text-xs font-semibold hidden sm:block" style={{ color: current ? "rgba(255,255,255,0.85)" : done ? "#FF2DAA" : "rgba(255,255,255,0.22)" }}>
                          {s.label}
                        </span>
                      </div>
                      {i < STEP_LIST.length - 1 && (
                        <div className="w-6 sm:w-12 h-px mx-2.5" style={{ background: done ? "rgba(255,45,170,0.5)" : "rgba(255,255,255,0.07)" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── STEP 1: Account ───────────────────────────────────────────── */}
            {step === "account" && (
              <div className="max-w-md">
                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">Create your account</h1>
                <p className="text-white/45 text-base mb-8 leading-relaxed">Your account secures your application and lets Sarah reach you directly.</p>

                <div className="flex bg-white/[0.05] border border-white/[0.07] rounded-xl p-1 mb-7">
                  {(["signup", "signin"] as AuthTab[]).map((t) => (
                    <button key={t} type="button" onClick={() => { setAuthTab(t); setSiError(""); setSuError(""); }}
                      className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={authTab === t ? { background: "rgba(255,45,170,0.18)", color: "#FF2DAA", border: "1px solid rgba(255,45,170,0.3)" } : { color: "rgba(255,255,255,0.35)" }}>
                      {t === "signup" ? "Create Account" : "Sign In"}
                    </button>
                  ))}
                </div>

                {authTab === "signup" && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {[
                      { label: "Full Name", value: suName, set: setSuName, type: "text", placeholder: "Your name" },
                      { label: "Email Address", value: suEmail, set: setSuEmail, type: "email", placeholder: "you@example.com" },
                    ].map(({ label, value, set, type, placeholder }) => (
                      <div key={label}>
                        <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
                        <input type={type} value={value} onChange={(e) => { set(e.target.value); setSuError(""); }} placeholder={placeholder} required className={inputBase}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                      <div className="relative">
                        <input type={suShow ? "text" : "password"} value={suPassword} onChange={(e) => { setSuPassword(e.target.value); setSuError(""); }} placeholder="Min. 6 characters" required className={`${inputBase} pr-11`}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                        <button type="button" onClick={() => setSuShow(!suShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC]">{suShow ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Confirm Password</label>
                      <input type={suShow ? "text" : "password"} value={suConfirm} onChange={(e) => { setSuConfirm(e.target.value); setSuError(""); }} placeholder="Repeat password" required className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    {suError && <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{suError}</div>}
                    <button type="submit" disabled={suLoading || !suName || !suEmail || !suPassword || !suConfirm}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 4px 24px rgba(255,45,170,0.35)" }}>
                      {suLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating account...</> : <>Continue to Application <ArrowRight size={15} /></>}
                    </button>
                    <p className="text-center text-xs text-white/25 pt-1">Already have an account? <button type="button" onClick={() => setAuthTab("signin")} className="font-semibold" style={{ color: "#FF2DAA" }}>Sign in</button></p>
                  </form>
                )}

                {authTab === "signin" && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                      <input type="email" value={siEmail} onChange={(e) => { setSiEmail(e.target.value); setSiError(""); }} placeholder="you@example.com" required autoFocus className={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                      <div className="relative">
                        <input type={siShow ? "text" : "password"} value={siPassword} onChange={(e) => { setSiPassword(e.target.value); setSiError(""); }} placeholder="••••••••" required className={`${inputBase} pr-11`}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                        <button type="button" onClick={() => setSiShow(!siShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AAAABC]">{siShow ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                      </div>
                    </div>
                    {siError && <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{siError}</div>}
                    <button type="submit" disabled={siLoading || !siEmail || !siPassword}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 4px 24px rgba(255,45,170,0.35)" }}>
                      {siLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in...</> : <>Sign In & Continue <ArrowRight size={15} /></>}
                    </button>
                    <p className="text-center text-xs text-white/25 pt-1">New here? <button type="button" onClick={() => setAuthTab("signup")} className="font-semibold" style={{ color: "#FF2DAA" }}>Create a free account</button></p>
                  </form>
                )}
              </div>
            )}

            {/* ── STEP 2: Application ───────────────────────────────────────── */}
            {step === "application" && user && (
              <div className="max-w-xl">

                {/* Prereq gate — shown while checking or if 1:1 not completed */}
                {hasPrereq === null && (
                  <div className="flex items-center gap-3 py-8">
                    <span className="w-5 h-5 rounded-full border-2 border-[#FF2DAA]/30 border-t-[#FF2DAA] animate-spin" />
                    <p className="text-white/40 text-sm">Checking eligibility...</p>
                  </div>
                )}

                {hasPrereq === false && (
                  <div className="max-w-md">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "rgba(255,45,170,0.1)", border: "1px solid rgba(255,45,170,0.2)" }}>
                      <Lock size={22} style={{ color: "#FF2DAA" }} />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-white font-bold letter-tight mb-3">
                      Complete 1:1 Coaching First
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      The <span className="text-white font-semibold">{program.title}</span> is the next step in your journey — but the 1:1 Deep-Dive Coaching is the gateway. It's designed to give you the root-level foundation and personal breakthrough you need before entering a group or intensive experience.
                    </p>
                    <div className="rounded-2xl p-5 mb-8 border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-4">The Pathway</p>
                      {[
                        { step: "1", label: "1:1 Deep-Dive Coaching", desc: "Your foundation — enroll here first.", active: true },
                        { step: "2", label: "Submit Teaching Video", desc: "Teach someone what you learned. Step 4 of the L.A.T.T. framework." },
                        { step: "3", label: program.title, desc: "Unlocked after your teaching video is approved.", active: false },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-3 mb-3 last:mb-0">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${item.active ? "bg-[#FF2DAA] text-white" : "text-white/30"}`}
                            style={!item.active ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" } : {}}>
                            {item.step}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${item.active ? "text-white" : "text-white/35"}`}>{item.label}</p>
                            <p className="text-white/30 text-xs mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/apply?program=one-on-one" className="btn-neon-solid shadow-lg inline-flex">
                      Start with 1:1 Coaching <ArrowRight size={15} />
                    </Link>
                  </div>
                )}

                {/* Show application only when prereq is confirmed */}
                {hasPrereq === true && <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)" }}>
                    {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{user.user_metadata?.full_name || user.email?.split("@")[0]}</p>
                    <p className="text-white/35 text-xs">{user.email}</p>
                  </div>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">Your application</h1>
                <p className="text-white/45 text-base mb-10 leading-relaxed">Sarah personally reviews every application. Answer honestly — the more specific you are, the better she can serve you.</p>

                <div className="space-y-8">
                  {program.questions.map((q, i) => (
                    <div key={q.key}>
                      <label className="block text-sm font-semibold text-white/80 mb-2 leading-snug">
                        <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {q.label}
                      </label>
                      {q.type === "textarea" ? (
                        <textarea value={answers[q.key] ?? ""} onChange={(e) => setAnswers(a => ({ ...a, [q.key]: e.target.value }))} placeholder={q.placeholder} required rows={4}
                          className={`${inputBase} resize-none`} onFocus={(e) => (e.currentTarget.style.borderColor = "#FF2DAA")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E8EE")} />
                      ) : q.type === "select" && q.options ? (
                        <div className="space-y-2.5 mt-2">
                          {q.options.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer">
                              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                                style={answers[q.key] === opt ? { borderColor: "#FF2DAA", background: "#FF2DAA" } : { borderColor: "#D0D0DC", background: "white" }}
                                onClick={() => setAnswers(a => ({ ...a, [q.key]: opt }))}>
                                {answers[q.key] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <input type="radio" name={q.key} value={opt} checked={answers[q.key] === opt} onChange={() => setAnswers(a => ({ ...a, [q.key]: opt }))} className="sr-only" />
                              <span className="text-sm leading-snug" style={{ color: answers[q.key] === opt ? "#1A1A2E" : "#666680" }}>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <button type="button" disabled={!allAnswered} onClick={() => setStep("schedule")}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-4"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: allAnswered ? "0 4px 24px rgba(255,45,170,0.35)" : "none" }}>
                    {program.applyLabel} <ArrowRight size={15} />
                  </button>
                </div>
                </>}
              </div>
            )}

            {/* ── STEP 3: Schedule ──────────────────────────────────────────── */}
            {step === "schedule" && (
              <div className="max-w-xl">
                <button type="button" onClick={() => setStep("application")} className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
                  <ArrowLeft size={13} /> Back to application
                </button>
                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">
                  {isGroupProgram ? "Choose your Thursday" : "Choose your session time"}
                </h1>
                <p className="text-white/45 text-base mb-8 leading-relaxed">
                  {isGroupProgram
                    ? "Group classes meet every Thursday at 7:00 PM ET. Select your start Thursday below."
                    : "Select a date and time for your first session. Monday–Friday, 8:00 AM–5:00 PM EST. All sessions via video call."}
                </p>

                <BookingCalendar
                  value={selectedDate}
                  onChange={(d) => {
                    setSelectedDate(d);
                    // Group program: auto-lock time to 7 PM
                    setSelectedTime(isGroupProgram ? "7:00 PM" : "");
                  }}
                  thursdayOnly={isGroupProgram}
                />

                {selectedDate && (
                  <div className="mt-6">
                    {isGroupProgram ? (
                      /* Group: time is fixed — just show confirmation */
                      <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10"
                        style={{ background: "rgba(255,45,170,0.07)" }}>
                        <Clock size={14} style={{ color: "#FF2DAA" }} />
                        <div>
                          <p className="text-white font-bold text-sm">7:00 PM ET — Every Thursday</p>
                          <p className="text-white/40 text-xs mt-0.5">
                            Your cohort begins {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Regular programs: time picker */
                      <>
                        <p className="text-[11px] font-bold letter-luxury uppercase text-white/35 mb-3">
                          Available times — {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button key={slot} type="button" onClick={() => setSelectedTime(slot)}
                              className="py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
                              style={selectedTime === slot
                                ? { background: "linear-gradient(135deg, #FF2DAA, #d91f90)", color: "white", boxShadow: "0 2px 12px rgba(255,45,170,0.4)" }
                                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.08)" }
                              }
                              onMouseEnter={(e) => { if (selectedTime !== slot) e.currentTarget.style.background = "rgba(255,45,170,0.12)"; }}
                              onMouseLeave={(e) => { if (selectedTime !== slot) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <button type="button" disabled={!scheduleComplete} onClick={() => setStep("payment")}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-8"
                  style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: scheduleComplete ? "0 4px 24px rgba(255,45,170,0.35)" : "none" }}>
                  Continue to Payment <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* ── STEP 4: Payment ───────────────────────────────────────────── */}
            {step === "payment" && user && selectedDate && selectedTime && (
              <div className="max-w-xl">
                <button type="button" onClick={() => setStep("schedule")} className="inline-flex items-center gap-2 text-white/35 hover:text-white/70 text-xs font-semibold mb-8 transition-colors">
                  <ArrowLeft size={13} /> Back to schedule
                </button>
                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">Review & pay</h1>
                <p className="text-white/45 text-base mb-8 leading-relaxed">Review your booking and complete payment to secure your spot.</p>

                {/* Order summary */}
                <div className="rounded-2xl border border-white/[0.09] p-6 mb-6 space-y-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-4">Order Summary</p>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-white">{program.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{program.tag}</p>
                    </div>
                    <p className="font-heading text-lg font-bold flex-shrink-0" style={{ color: "#FF2DAA" }}>{program.price}</p>
                  </div>

                  <div className="border-t border-white/[0.07] pt-4 space-y-2">
                    <div className="flex items-center gap-2.5 text-sm text-white/60">
                      <Calendar size={13} style={{ color: "#FF2DAA" }} />
                      {formatDate(selectedDate)}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-white/60">
                      <Clock size={13} style={{ color: "#FF2DAA" }} />
                      {selectedTime} EST — via video call
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-white/60">
                      <User size={13} style={{ color: "#FF2DAA" }} />
                      {user.email}
                    </div>
                  </div>
                </div>

                {payError && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium mb-4" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{payError}
                  </div>
                )}

                <button type="button" onClick={handlePayment} disabled={payLoading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: payLoading ? "none" : "0 4px 32px rgba(255,45,170,0.4)" }}>
                  {payLoading
                    ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Redirecting to payment...</>
                    : <><CreditCard size={16} /> Pay {program.price} Securely</>}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <Lock size={11} className="text-white/25" />
                  <p className="text-[11px] text-white/25">Powered by Stripe · 256-bit SSL · PCI compliant</p>
                </div>
              </div>
            )}

            {/* ── STEP 5: Confirmed ─────────────────────────────────────────── */}
            {step === "confirmed" && (
              <div className="max-w-lg mx-auto lg:mx-0 py-8">
                <div className="flex justify-start mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 8px 40px rgba(255,45,170,0.4)" }}>
                    <Check size={36} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl text-white font-bold letter-tight mb-4 leading-tight">
                  You're booked.<br />It's official.
                </h1>
                <p className="text-white/55 text-lg leading-relaxed mb-3 max-w-md">
                  Your spot in <span className="text-white font-semibold">{program.title}</span> is confirmed. Payment received. Sarah will be in touch within 24 hours to confirm your session details.
                </p>
                {selectedDate && selectedTime && (
                  <div className="flex flex-col gap-1.5 mb-10">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar size={13} style={{ color: "#FF2DAA" }} />
                      {formatDate(selectedDate)}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock size={13} style={{ color: "#FF2DAA" }} />
                      {selectedTime} EST
                    </div>
                  </div>
                )}

                <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-5">What Happens Next</p>
                  {[
                    { num: "01", text: "You'll receive a confirmation email with your session details and a calendar invite." },
                    { num: "02", text: "Sarah's team will send a pre-session intake form within 24 hours." },
                    { num: "03", text: "Show up fully. Do the work. Your transformation begins here." },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-4 mb-4 last:mb-0">
                      <span className="font-heading text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }}>{item.num}</span>
                      <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Teaching video CTA — only shown for 1:1 graduates */}
                {programKey === "one-on-one" && (
                  <div className="rounded-2xl p-6 mb-8 border border-[#FF2DAA]/20" style={{ background: "rgba(255,45,170,0.06)" }}>
                    <p className="text-[10px] font-bold letter-luxury uppercase mb-3" style={{ color: "#FF2DAA" }}>
                      Your Path to the Next Programs
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      After completing your 1:1 program, the final step is to <strong className="text-white">teach someone else</strong> what you've learned. Submit a short video of you teaching a friend, family member, or colleague — and unlock your access to the Group Program, Healing Intensive, and Mentorship.
                    </p>
                    <Link to="/programs/submit-teaching"
                      className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                      style={{ color: "#FF2DAA" }}>
                      Submit Your Teaching Video <ArrowRight size={13} />
                    </Link>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/" className="btn-neon-solid !py-3.5 text-center">Back to Home <ArrowRight size={14} /></Link>
                  <Link to="/account" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold border border-white/10 hover:border-white/20 transition-all" style={{ color: "rgba(255,255,255,0.5)" }}>
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
