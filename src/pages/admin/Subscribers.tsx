import { useState, useEffect, useMemo } from "react";
import { Search, Download, Plus, Trash2, X } from "lucide-react";
import { store, Subscriber } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const sourceColors: Record<Subscriber["source"], { bg: string; text: string }> = {
  homepage: { bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  "free-guide": { bg: "rgba(255,45,170,0.1)", text: "#FF2DAA" },
  programs: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  footer: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  shop: { bg: "rgba(139,92,246,0.1)", text: "#8B5CF6" },
  manual: { bg: "rgba(0,0,0,0.06)", text: "#666" },
};

const AdminSubscribers = () => {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState<Subscriber["source"] | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSub, setNewSub] = useState({ name: "", email: "" });

  useEffect(() => { store.getSubscribers().then(setSubscribers); }, []);

  const refresh = () => store.getSubscribers().then(setSubscribers);

  const filtered = useMemo(() => subscribers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchSource = filterSource === "all" || s.source === filterSource;
    return matchSearch && matchSource;
  }), [subscribers, search, filterSource]);

  const deleteSubscriber = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from your list?`)) return;
    await store.deleteSubscriber(id);
    refresh();
    toast({ title: `${name} removed` });
  };

  const handleAdd = async () => {
    if (!newSub.email.includes("@")) return;
    await store.addSubscriber({
      name: newSub.name || newSub.email.split("@")[0],
      email: newSub.email,
      source: "manual",
    });
    refresh();
    setShowAddModal(false);
    setNewSub({ name: "", email: "" });
    toast({ title: "Subscriber added" });
  };

  const exportCSV = () => {
    const header = "Name,Email,Source,Joined";
    const rows = filtered.map((s) => `"${s.name}","${s.email}",${s.source},${s.joinedAt}`);
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const sourceCounts = useMemo(() => {
    const m: Record<string, number> = {};
    subscribers.forEach((s) => { m[s.source] = (m[s.source] || 0) + 1; });
    return m;
  }, [subscribers]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Subscribers</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{subscribers.length} total email subscribers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-gray-50 transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#FF2DAA" }}
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* Source breakdown chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterSource("all")}
          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={filterSource === "all" ? { background: "#FF2DAA", color: "white" } : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          All ({subscribers.length})
        </button>
        {(Object.keys(sourceColors) as Subscriber["source"][]).map((src) => {
          const count = sourceCounts[src] || 0;
          if (!count) return null;
          const c = sourceColors[src];
          return (
            <button
              key={src}
              onClick={() => setFilterSource(filterSource === src ? "all" : src)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={filterSource === src
                ? { background: c.text, color: "white" }
                : { background: c.bg, color: c.text, border: `1px solid ${c.text}30` }
              }
            >
              {src} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subscribers..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Subscriber", "Email", "Source", "Joined", ""].map((h, i) => (
                  <th key={i} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const sc = sourceColors[s.source];
                return (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "rgba(255,45,170,0.7)" }}
                        >
                          {s.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{s.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                        {s.source}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{s.joinedAt}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => deleteSubscriber(s.id, s.name)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No subscribers match your search.</div>
        )}
      </div>

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <button onClick={() => setShowAddModal(false)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">Add Subscriber</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Name</label>
                <input type="text" value={newSub.name} onChange={(e) => setNewSub({ ...newSub, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Full name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
                <input type="email" value={newSub.email} onChange={(e) => setNewSub({ ...newSub, email: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="email@example.com" autoFocus />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
