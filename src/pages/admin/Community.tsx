import { useState, useEffect, useMemo } from "react";
import { Search, Check, X, Eye } from "lucide-react";
import { store, CommunityApplication } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<CommunityApplication["status"], { bg: string; text: string; label: string }> = {
  pending: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Pending" },
  approved: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Approved" },
  declined: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", label: "Declined" },
};

const AdminCommunity = () => {
  const { toast } = useToast();
  const [apps, setApps] = useState<CommunityApplication[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<CommunityApplication["status"] | "all">("all");
  const [selected, setSelected] = useState<CommunityApplication | null>(null);

  useEffect(() => { store.getCommunityApps().then(setApps); }, []);

  const refresh = () => store.getCommunityApps().then(setApps);

  const filtered = useMemo(() => apps.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  }), [apps, search, filterStatus]);

  const updateStatus = async (id: string, status: CommunityApplication["status"]) => {
    await store.updateAppStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    toast({ title: status === "approved" ? "Application approved!" : `Application ${status}` });
  };

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    declined: apps.filter((a) => a.status === "declined").length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Community Applications</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {counts.pending} pending · {counts.approved} approved members
        </p>
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["all", "pending", "approved", "declined"] as const).map((s) => {
          const conf = s === "all" ? { bg: "rgba(255,45,170,0.08)", text: "#FF2DAA", label: "Total" } : { ...statusConfig[s], label: statusConfig[s].label };
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s === "all" ? "all" : s as CommunityApplication["status"])}
              className="bg-white rounded-2xl border border-border p-4 text-left hover:shadow-md transition-shadow"
              style={filterStatus === s ? { borderColor: conf.text } : undefined}
            >
              <p className="text-xs font-semibold uppercase" style={{ color: conf.text }}>{conf.label}</p>
              <p className="font-heading text-2xl font-bold mt-1">{counts[s]}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applicants..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Applicant", "Application Preview", "Applied", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const sc = statusConfig[a.status];
                return (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "#EC4899" }}
                        >
                          {a.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{a.name}</p>
                          <p className="text-xs text-muted-foreground">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-[260px]">
                      <p className="text-xs text-muted-foreground line-clamp-2">{a.reason}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{a.appliedAt}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelected(a)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                          title="View application"
                        >
                          <Eye size={14} />
                        </button>
                        {a.status !== "approved" && (
                          <button
                            onClick={() => updateStatus(a.id, "approved")}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-muted-foreground hover:text-green-600 transition-colors"
                            title="Approve"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {a.status !== "declined" && (
                          <button
                            onClick={() => updateStatus(a.id, "declined")}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Decline"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No applications match your filter.</div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <button onClick={() => setSelected(null)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#EC4899" }}>
                {selected.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold">{selected.name}</h2>
                <p className="text-sm text-muted-foreground">{selected.email} · Applied {selected.appliedAt}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Why They Want to Join</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{selected.reason}</p>
            </div>
            {selected.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(selected.id, "declined")}
                  className="flex-1 py-3 rounded-2xl border border-border text-sm font-semibold hover:bg-gray-50 transition-colors text-red-500 border-red-200"
                >
                  Decline
                </button>
                <button
                  onClick={() => { updateStatus(selected.id, "approved"); setSelected(null); }}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "#10B981" }}
                >
                  Approve & Welcome
                </button>
              </div>
            )}
            {selected.status !== "pending" && (
              <div className="flex items-center justify-center gap-2 py-3 rounded-2xl" style={{ background: statusConfig[selected.status].bg }}>
                <span className="text-sm font-bold" style={{ color: statusConfig[selected.status].text }}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommunity;
