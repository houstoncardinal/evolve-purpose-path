import { useState, useMemo } from "react";
import { Search, GraduationCap, Plus, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { store, ProgramEnrollment } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const PROGRAMS = [
  "1:1 Deep-Dive Coaching",
  "Evolve 2 Purpose Group Program",
  "Purpose Clarity Session",
  "Healing Intensive Weekend",
];

const statusConfig: Record<ProgramEnrollment["status"], { bg: string; text: string; label: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Active" },
  completed: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", label: "Completed" },
  paused: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Paused" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3 text-sm">
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="font-bold text-white">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const emptyEnrollment = {
  name: "", email: "", program: PROGRAMS[0], amount: "", status: "active" as ProgramEnrollment["status"],
};

const AdminPrograms = () => {
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<ProgramEnrollment[]>(() => store.getEnrollments());
  const [search, setSearch] = useState("");
  const [activeProgram, setActiveProgram] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState(emptyEnrollment);

  const refresh = () => setEnrollments(store.getEnrollments());

  const updateStatus = (id: string, status: ProgramEnrollment["status"]) => {
    store.updateEnrollmentStatus(id, status);
    refresh();
    toast({ title: `Enrollment status updated to ${status}` });
  };

  const filtered = useMemo(() => enrollments.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchProgram = activeProgram === "all" || e.program === activeProgram;
    return matchSearch && matchProgram;
  }), [enrollments, search, activeProgram]);

  const revenueByProgram = useMemo(() => PROGRAMS.map((p) => ({
    name: p.split(" ").slice(0, 3).join(" "),
    revenue: enrollments.filter((e) => e.program === p).reduce((s, e) => s + e.amount, 0),
    count: enrollments.filter((e) => e.program === p).length,
  })), [enrollments]);

  const totalRevenue = enrollments.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!newEnrollment.name.trim() || !newEnrollment.email.trim()) return;
    const amount = parseFloat(newEnrollment.amount) || 0;
    store.addEnrollment({
      name: newEnrollment.name,
      email: newEnrollment.email,
      program: newEnrollment.program,
      amount,
      enrolledAt: new Date().toISOString().split("T")[0],
      status: newEnrollment.status,
    });
    refresh();
    setShowAddModal(false);
    setNewEnrollment(emptyEnrollment);
    toast({ title: "Enrollment added" });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Program Enrollments</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {enrollments.length} enrollments · ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total revenue
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shrink-0"
          style={{ background: "#FF2DAA" }}
        >
          <Plus size={15} /> Add Enrollment
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PROGRAMS.map((p, i) => {
          const count = enrollments.filter((e) => e.program === p).length;
          const rev = enrollments.filter((e) => e.program === p).reduce((s, e) => s + e.amount, 0);
          const colors = ["#FF2DAA", "#6366F1", "#10B981", "#8B5CF6"];
          return (
            <div key={p} className="bg-white rounded-2xl border border-border p-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${colors[i]}18` }}>
                <GraduationCap size={14} style={{ color: colors[i] }} />
              </div>
              <p className="text-xs font-semibold text-muted-foreground line-clamp-2 leading-tight mb-2">{p}</p>
              <p className="font-heading text-xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">${rev.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-heading text-base font-bold mb-5">Revenue by Program</h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={revenueByProgram} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#FF2DAA" radius={[6, 6, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Program tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...PROGRAMS].map((p) => (
          <button
            key={p}
            onClick={() => setActiveProgram(p)}
            className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={activeProgram === p
              ? { background: "#FF2DAA", color: "white" }
              : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }
            }
          >
            {p === "all" ? "All Programs" : p.split(" ").slice(0, 3).join(" ")}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search enrollments..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Student", "Program", "Amount", "Enrolled", "Status", "Update"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const sc = statusConfig[e.status];
                return (
                  <tr key={e.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "#8B5CF6" }}
                        >
                          {e.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{e.name}</p>
                          <p className="text-xs text-muted-foreground">{e.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-foreground max-w-[200px]">{e.program}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold">
                        {e.amount > 0 ? `$${e.amount.toLocaleString()}` : "Custom"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{e.enrolledAt}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={e.status}
                        onChange={(e2) => updateStatus(e.id, e2.target.value as ProgramEnrollment["status"])}
                        className="text-xs border border-border rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                      >
                        {(["active", "completed", "paused"] as const).map((s) => (
                          <option key={s} value={s}>{statusConfig[s].label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No enrollments match your filter.</div>
        )}
      </div>

      {/* Add Enrollment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <button onClick={() => setShowAddModal(false)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">Add Enrollment</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Name *</label>
                  <input type="text" value={newEnrollment.name} onChange={(e) => setNewEnrollment({ ...newEnrollment, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Full name" autoFocus />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email *</label>
                  <input type="email" value={newEnrollment.email} onChange={(e) => setNewEnrollment({ ...newEnrollment, email: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Program</label>
                <select value={newEnrollment.program} onChange={(e) => setNewEnrollment({ ...newEnrollment, program: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                  {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Amount ($)</label>
                  <input type="number" value={newEnrollment.amount} onChange={(e) => setNewEnrollment({ ...newEnrollment, amount: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="0.00" min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                  <select value={newEnrollment.status} onChange={(e) => setNewEnrollment({ ...newEnrollment, status: e.target.value as ProgramEnrollment["status"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    {(["active", "completed", "paused"] as const).map((s) => (
                      <option key={s} value={s}>{statusConfig[s].label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} disabled={!newEnrollment.name.trim() || !newEnrollment.email.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>Add Enrollment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrograms;
