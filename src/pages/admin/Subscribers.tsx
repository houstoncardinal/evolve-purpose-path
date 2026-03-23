import { useState, useEffect, useMemo } from "react";
import { Search, Download, Plus, Trash2, X, MapPin } from "lucide-react";
import { store, Subscriber } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

// Human-readable labels for each source
const sourceLabels: Record<Subscriber["source"], string> = {
  homepage:                    "Homepage",
  about:                       "About Page",
  framework:                   "Framework Page",
  testimonials:                "Testimonials Page",
  programs:                    "Programs (All)",
  "programs-one-on-one":       "Program: 1:1 Coaching",
  "programs-group":            "Program: Group Class",
  "programs-healing-intensive":"Program: Healing Intensive",
  "programs-mentorship":       "Program: Mentorship",
  "programs-purpose-clarity":  "Program: Purpose Clarity",
  shop:                        "Shop",
  "free-guide":                "Free Guide / E2P Page",
  footer:                      "Footer",
  manual:                      "Added Manually",
};

// Color coding by category
const sourceColors: Record<Subscriber["source"], { bg: string; text: string }> = {
  homepage:                    { bg: "rgba(99,102,241,0.1)",   text: "#6366F1" },
  about:                       { bg: "rgba(99,102,241,0.08)",  text: "#818CF8" },
  framework:                   { bg: "rgba(99,102,241,0.08)",  text: "#A5B4FC" },
  testimonials:                { bg: "rgba(99,102,241,0.06)",  text: "#C7D2FE" },
  programs:                    { bg: "rgba(16,185,129,0.1)",   text: "#10B981" },
  "programs-one-on-one":       { bg: "rgba(16,185,129,0.12)", text: "#059669" },
  "programs-group":            { bg: "rgba(16,185,129,0.08)", text: "#34D399" },
  "programs-healing-intensive":{ bg: "rgba(16,185,129,0.06)", text: "#6EE7B7" },
  "programs-mentorship":       { bg: "rgba(16,185,129,0.06)", text: "#047857" },
  "programs-purpose-clarity":  { bg: "rgba(16,185,129,0.06)", text: "#065F46" },
  shop:                        { bg: "rgba(139,92,246,0.1)",   text: "#8B5CF6" },
  "free-guide":                { bg: "rgba(255,45,170,0.1)",   text: "#FF2DAA" },
  footer:                      { bg: "rgba(245,158,11,0.1)",   text: "#F59E0B" },
  manual:                      { bg: "rgba(0,0,0,0.06)",       text: "#666" },
};

// Group chips for filter bar
const filterGroups = [
  {
    label: "General Pages",
    sources: ["homepage", "about", "framework", "testimonials"] as Subscriber["source"][],
  },
  {
    label: "Programs",
    sources: [
      "programs",
      "programs-one-on-one",
      "programs-group",
      "programs-healing-intensive",
      "programs-mentorship",
      "programs-purpose-clarity",
    ] as Subscriber["source"][],
  },
  {
    label: "Other",
    sources: ["shop", "free-guide", "footer", "manual"] as Subscriber["source"][],
  },
];

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
    const header = "Name,Email,Source,Page,Joined";
    const rows = filtered.map((s) =>
      `"${s.name}","${s.email}","${s.source}","${sourceLabels[s.source] ?? s.source}","${s.joinedAt}"`
    );
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

  // Top sources by volume for the insight strip
  const topSources = useMemo(() =>
    Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([src, count]) => ({ src: src as Subscriber["source"], count })),
    [sourceCounts]
  );

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

      {/* Top sources insight strip */}
      {topSources.length > 0 && (
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} style={{ color: "#FF2DAA" }} />
            <p className="text-xs font-bold letter-luxury uppercase text-muted-foreground">Top Sources</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {topSources.map(({ src, count }) => {
              const c = sourceColors[src] ?? { bg: "rgba(0,0,0,0.06)", text: "#666" };
              return (
                <button
                  key={src}
                  onClick={() => setFilterSource(filterSource === src ? "all" : src)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background: c.bg, color: c.text }}
                >
                  <span className="font-bold text-sm">{count}</span>
                  {sourceLabels[src] ?? src}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterSource("all")}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={filterSource === "all"
              ? { background: "#FF2DAA", color: "white" }
              : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            All ({subscribers.length})
          </button>
          {filterGroups.map((group) => {
            const groupSources = group.sources.filter((s) => (sourceCounts[s] ?? 0) > 0);
            if (!groupSources.length) return null;
            return (
              <div key={group.label} className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase mr-1">{group.label}:</span>
                {groupSources.map((src) => {
                  const c = sourceColors[src];
                  const count = sourceCounts[src] ?? 0;
                  return (
                    <button
                      key={src}
                      onClick={() => setFilterSource(filterSource === src ? "all" : src)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                      style={filterSource === src
                        ? { background: c.text, color: "white" }
                        : { background: c.bg, color: c.text, border: `1px solid ${c.text}30` }}
                    >
                      {sourceLabels[src]} ({count})
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
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
                {["Subscriber", "Email", "Where They Signed Up", "Joined", ""].map((h, i) => (
                  <th key={i} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const sc = sourceColors[s.source] ?? { bg: "rgba(0,0,0,0.06)", text: "#666" };
                return (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "rgba(255,45,170,0.7)" }}
                        >
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{s.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          {sourceLabels[s.source] ?? s.source}
                        </span>
                      </div>
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
          <div className="text-center py-16 text-muted-foreground text-sm">
            {subscribers.length === 0 ? "No subscribers yet. They'll appear here as people sign up." : "No subscribers match your search."}
          </div>
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
