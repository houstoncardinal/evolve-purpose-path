import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { store, initStore } from "@/lib/adminStore";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      initStore();
      if (store.login(password)) {
        navigate("/admin");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, #0B0B0F 0%, #120810 60%, #0B0B0F 100%)" }}
    >
      {/* Glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,170,0.07), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Evolve 2 Purpose" className="h-10 w-auto mx-auto mb-4 object-contain" />
          <p className="text-white/40 text-xs letter-luxury uppercase tracking-widest">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border p-8"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl mx-auto mb-6" style={{ background: "rgba(255,45,170,0.12)", border: "1px solid rgba(255,45,170,0.2)" }}>
            <Lock size={18} style={{ color: "#FF2DAA" }} />
          </div>
          <h1 className="font-heading text-xl text-white text-center mb-1">Admin Access</h1>
          <p className="text-white/40 text-sm text-center mb-8">Enter your password to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Password"
                autoFocus
                className="w-full px-5 py-3.5 rounded-2xl text-sm text-white placeholder:text-white/30 pr-12 focus:outline-none focus:ring-1 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
                }}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loading || !password ? "rgba(255,45,170,0.5)" : "#FF2DAA" }}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <p className="text-white/25 text-xs text-center mt-6">
            Default password: <span className="text-white/40 font-mono">evolve2025</span>
          </p>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Evolve 2 Purpose &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
