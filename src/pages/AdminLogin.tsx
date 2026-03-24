import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowRight } from "lucide-react";
import { store } from "@/lib/adminStore";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = store.login("", password);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#08080C" }}
    >
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow — center */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 65%)" }}
      />
      {/* Secondary glow — top right */}
      <div
        className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[380px]">

        {/* Logo + brand */}
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="Evolve 2 Purpose"
            className="h-9 w-auto mx-auto mb-5 object-contain"
          />
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }}
            />
            Secure Admin Access
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Card inner glow */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,170,0.06), transparent 70%)" }}
          />

          {/* Icon */}
          <div className="relative z-10 mb-6 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,45,170,0.1)",
                border: "1px solid rgba(255,45,170,0.18)",
              }}
            >
              <Lock size={20} style={{ color: "#FF2DAA" }} />
            </div>
            <div>
              <h1 className="font-heading text-xl text-white font-bold leading-tight">Admin Access</h1>
              <p className="text-white/35 text-xs mt-0.5">Enter your secret password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 pr-11 focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${error ? "rgba(248,113,113,0.4)" : "rgba(255,255,255,0.08)"}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(255,45,170,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.border = `1px solid ${error ? "rgba(248,113,113,0.4)" : "rgba(255,255,255,0.08)"}`)}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium"
                style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!password}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              style={{
                background: !password
                  ? "rgba(255,45,170,0.4)"
                  : "linear-gradient(135deg, #FF2DAA, #d91f90)",
                boxShadow: !password ? "none" : "0 4px 20px rgba(255,45,170,0.35)",
              }}
            >
              Enter Dashboard <ArrowRight size={15} />
            </button>
          </form>
        </div>

        <p className="text-center text-white/15 text-xs mt-6">
          Evolve 2 Purpose &copy; {new Date().getFullYear()} — Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
