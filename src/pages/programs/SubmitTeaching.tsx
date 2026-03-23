import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ArrowRight, ArrowLeft, Video, Check, Lock, Upload } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm bg-white border border-[#E8E8EE] text-[#1A1A2E] placeholder:text-[#AAAABC] focus:outline-none focus:border-[#FF2DAA] transition-all resize-none";

const SubmitTeaching = () => {
  useSEO({
    title: "Submit Your Teaching Video — Step 4: Teaching Others | Evolve 2 Purpose",
    description:
      "The final step of your 1:1 transformation: teach someone else what you've learned. Submit your teaching video to unlock your pathway to the next programs.",
  });

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [taughtName, setTaughtName] = useState("");
  const [taughtWhat, setTaughtWhat] = useState("");
  const [taughtResult, setTaughtResult] = useState("");
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("teaching_submissions").insert({
      user_id: user?.id ?? null,
      email: user?.email ?? null,
      name: user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Anonymous",
      video_url: videoUrl.trim(),
      taught_name: taughtName.trim() || null,
      taught_what: taughtWhat.trim() || null,
      taught_result: taughtResult.trim() || null,
      reflection: reflection.trim() || null,
      status: "pending",
    });

    if (err) {
      setError("Something went wrong saving your submission. Please try again.");
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  if (loading) {
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
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 65%)" }} />
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link to="/programs/one-on-one" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors">
            <ArrowLeft size={13} /> Back to 1:1 Program
          </Link>
          <img src="/logo.png" alt="Evolve 2 Purpose" className="h-7 w-auto object-contain opacity-80" />
          <Link to="/programs" className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors">All Programs</Link>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* Left sidebar */}
          <div className="lg:w-[360px] xl:w-[400px] lg:sticky lg:top-0 lg:h-screen flex-shrink-0 border-r border-white/[0.06] p-8 lg:p-10 flex flex-col">
            <span className="inline-block self-start text-[10px] font-bold letter-luxury uppercase px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA" }}>
              Step 4 of the L.A.T.T. Framework
            </span>

            <h2 className="font-heading text-2xl text-white font-bold letter-tight leading-tight mb-3">
              Teaching — Your Final Step
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              The L.A.T.T. framework ends with Teaching: sharing what you've learned with someone else. This step seals your transformation and unlocks your path to the next programs.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { num: "T", label: "Teaching activates what you've healed", desc: "When you teach, you fully own what you've learned." },
                { num: "→", label: "Submitting unlocks the next programs", desc: "Group, Healing Intensive, and Mentorship open after your video is reviewed." },
                { num: "✓", label: "Sarah personally reviews each submission", desc: "Your teaching video will be reviewed within 3–5 business days." },
              ].map((item) => (
                <div key={item.num} className="flex gap-4 p-4 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.025)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(255,45,170,0.2)", color: "#FF2DAA" }}>
                    {item.num}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold mb-0.5">{item.label}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <Lock size={12} style={{ color: "#10B981" }} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/40">Secure Submission</p>
                <p className="text-[10px] text-white/25">Reviewed privately by Sarah's team</p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 px-6 py-10 lg:px-14 xl:px-20 max-w-2xl mx-auto lg:max-w-none lg:mx-0 w-full">

            {!user ? (
              /* Not logged in */
              <div className="max-w-md">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,45,170,0.1)", border: "1px solid rgba(255,45,170,0.2)" }}>
                  <Lock size={24} style={{ color: "#FF2DAA" }} />
                </div>
                <h1 className="font-heading text-3xl text-white font-bold letter-tight mb-3">Sign in to submit</h1>
                <p className="text-white/45 text-base mb-8 leading-relaxed">
                  You need to be signed in with the account you used for your 1:1 program to submit your teaching video.
                </p>
                <Link to="/account" className="btn-neon-solid shadow-lg inline-flex">
                  Sign In to Your Account <ArrowRight size={15} />
                </Link>
              </div>
            ) : submitted ? (
              /* Submitted confirmation */
              <div className="max-w-lg">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                  style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 8px 40px rgba(255,45,170,0.4)" }}>
                  <Check size={36} className="text-white" strokeWidth={2.5} />
                </div>
                <h1 className="font-heading text-4xl md:text-5xl text-white font-bold letter-tight mb-4 leading-tight">
                  Teaching video<br />submitted.
                </h1>
                <p className="text-white/55 text-lg leading-relaxed mb-10">
                  Sarah's team will review your submission within 3–5 business days. Once approved, your pathway to the Group Program, Healing Intensive, and Mentorship Program will be unlocked.
                </p>
                <div className="rounded-2xl p-6 mb-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-bold letter-luxury uppercase text-white/25 mb-5">What's Next</p>
                  {[
                    { num: "01", text: "You'll receive a confirmation email within 24 hours." },
                    { num: "02", text: "Sarah's team reviews your teaching video (3–5 business days)." },
                    { num: "03", text: "Once approved, you'll receive an email unlocking the next programs." },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-4 mb-4 last:mb-0">
                      <span className="font-heading text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: "#FF2DAA" }}>{item.num}</span>
                      <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/programs" className="btn-neon-solid !py-3.5 text-center">Explore Programs <ArrowRight size={14} /></Link>
                  <Link to="/account" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold border border-white/10 hover:border-white/20 transition-all" style={{ color: "rgba(255,255,255,0.5)" }}>
                    My Account
                  </Link>
                </div>
              </div>
            ) : (
              /* Submission form */
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)" }}>
                    {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{user.user_metadata?.full_name || user.email?.split("@")[0]}</p>
                    <p className="text-white/35 text-xs">{user.email}</p>
                  </div>
                </div>

                <h1 className="font-heading text-3xl md:text-4xl text-white font-bold letter-tight mb-2">
                  Submit your teaching video
                </h1>
                <p className="text-white/45 text-base mb-10 leading-relaxed">
                  Record a video of yourself teaching someone — a friend, family member, or colleague — something meaningful you learned through your 1:1 program. This is Step 4: Teaching.
                </p>

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                      <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>01</span>
                      Video Link (YouTube, Vimeo, Google Drive, etc.) *
                    </label>
                    <div className="relative">
                      <Video size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#AAAABC" }} />
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        required
                        className={`${inputBase} pl-10`}
                      />
                    </div>
                    <p className="text-white/25 text-[11px] mt-1.5 ml-1">Make sure your video is publicly accessible or shared with anyone with the link.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                      <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>02</span>
                      Who did you teach? (name + your relationship to them)
                    </label>
                    <input
                      type="text"
                      value={taughtName}
                      onChange={(e) => setTaughtName(e.target.value)}
                      placeholder="e.g. My sister, a close friend, a coworker..."
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                      <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>03</span>
                      What did you teach them? What specific principle or lesson?
                    </label>
                    <textarea
                      rows={4}
                      value={taughtWhat}
                      onChange={(e) => setTaughtWhat(e.target.value)}
                      placeholder="Describe the concept, framework step, or lesson you shared with them..."
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                      <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>04</span>
                      What was their reaction or transformation from the conversation?
                    </label>
                    <textarea
                      rows={4}
                      value={taughtResult}
                      onChange={(e) => setTaughtResult(e.target.value)}
                      placeholder="What shifted for them? What did they say? What changed?"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                      <span className="text-[10px] font-bold letter-luxury uppercase mr-2" style={{ color: "#FF2DAA" }}>05</span>
                      What did this experience reveal to you about your own healing and purpose?
                    </label>
                    <textarea
                      rows={4}
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Reflect honestly — how did teaching someone else change or confirm what you've been through?"
                      className={inputBase}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium"
                      style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !videoUrl.trim()}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #d91f90)", boxShadow: "0 4px 24px rgba(255,45,170,0.35)" }}>
                    {submitting
                      ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting...</>
                      : <><Upload size={16} /> Submit Teaching Video</>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTeaching;
