import { useState, useEffect, useMemo } from "react";
import { Search, ExternalLink, X, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { store, TeachingSubmission } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<TeachingSubmission["status"], { bg: string; text: string; dot: string; label: string }> = {
  pending:       { bg: "rgba(245,158,11,0.1)",  text: "#D97706", dot: "#F59E0B",  label: "Pending Review" },
  approved:      { bg: "rgba(16,185,129,0.1)",  text: "#059669", dot: "#10B981",  label: "Approved" },
  needs_revision:{ bg: "rgba(239,68,68,0.1)",   text: "#DC2626", dot: "#EF4444",  label: "Needs Revision" },
};

const AdminTeachingSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<TeachingSubmission[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TeachingSubmission["status"] | "all">("all");
  const [selected, setSelected] = useState<TeachingSubmission | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { store.getTeachingSubmissions().then(setSubmissions); }, []);

  const refresh = () => store.getTeachingSubmissions().then(setSubmissions);

  const filtered = useMemo(() => submissions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  }), [submissions, search, filterStatus]);

  const counts = useMemo(() => ({
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    needs_revision: submissions.filter((s) => s.status === "needs_revision").length,
  }), [submissions]);

  const openDetail = (s: TeachingSubmission) => {
    setSelected(s);
    setNotes(s.reviewerNotes ?? "");
  };

  const updateStatus = async (id: string, status: TeachingSubmission["status"]) => {
    await store.updateTeachingStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected({ ...selected, status });
    toast({ title: `Submission marked as ${statusConfig[status].label}` });
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    await store.updateTeachingNotes(selected.id, notes);
    setSaving(false);
    refresh();
    toast({ title: "Notes saved" });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Teaching Submissions</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Step 4 video submissions from 1:1 program graduates
          </p>
        </div>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap gap-3">
        {([
          { key: "all",            label: "All",            count: submissions.length, icon: null },
          { key: "pending",        label: "Pending Review", count: counts.pending, icon: Clock },
          { key: "approved",       label: "Approved",       count: counts.approved, icon: CheckCircle },
          { key: "needs_revision", label: "Needs Revision", count: counts.needs_revision, icon: AlertCircle },
        ] as const).map(({ key, label, count, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key as typeof filterStatus)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={filterStatus === key
              ? { background: "#FF2DAA", color: "white" }
              : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            {Icon && <Icon size={13} />}
            {label}
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={filterStatus === key
                ? { background: "rgba(255,255,255,0.25)", color: "white" }
                : { background: "rgba(0,0,0,0.06)", color: "#666" }}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-16 text-center">
          <CheckCircle size={32} className="mx-auto mb-3 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground text-sm">
            {submissions.length === 0
              ? "No teaching submissions yet. They'll appear here when 1:1 graduates submit their Step 4 video."
              : "No submissions match your filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const sc = statusConfig[s.status];
            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => openDetail(s)}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, #FF2DAA, #D41E8D)" }}
                    >
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.email}</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: sc.dot }} />
                    {sc.label}
                  </span>
                </div>

                {/* Video link */}
                {s.videoUrl && (
                  <a
                    href={s.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-3 hover:underline"
                    style={{ color: "#FF2DAA" }}
                  >
                    <ExternalLink size={11} /> Watch Teaching Video
                  </a>
                )}

                {/* Taught who */}
                {s.taughtName && (
                  <p className="text-xs text-muted-foreground mb-1.5">
                    <span className="font-semibold text-foreground">Taught:</span> {s.taughtName}
                  </p>
                )}

                {/* What they taught — truncated */}
                {s.taughtWhat && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.taughtWhat}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-[11px] text-muted-foreground">{s.submittedAt}</span>
                  <div className="flex gap-1.5">
                    {s.status !== "approved" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(s.id, "approved"); }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:opacity-80"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#059669" }}
                      >
                        Approve
                      </button>
                    )}
                    {s.status !== "needs_revision" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(s.id, "needs_revision"); }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:opacity-80"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#DC2626" }}
                      >
                        Needs Work
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-3xl px-8 pt-8 pb-5 border-b border-border z-10">
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100">
                <X size={16} />
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #FF2DAA, #D41E8D)" }}
                >
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold">{selected.name}</h2>
                  <p className="text-xs text-muted-foreground">{selected.email} · Submitted {selected.submittedAt}</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 space-y-5">
              {/* Status controls */}
              <div className="flex flex-wrap gap-2">
                {(["pending", "approved", "needs_revision"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={selected.status === s
                      ? { background: statusConfig[s].dot, color: "white" }
                      : { background: statusConfig[s].bg, color: statusConfig[s].text }}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>

              {/* Video */}
              {selected.videoUrl && (
                <div className="bg-[#F6F6F8] rounded-2xl p-4">
                  <p className="text-[11px] font-bold letter-luxury uppercase text-muted-foreground mb-2">Teaching Video</p>
                  <a
                    href={selected.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold hover:underline"
                    style={{ color: "#FF2DAA" }}
                  >
                    <ExternalLink size={14} /> {selected.videoUrl}
                  </a>
                </div>
              )}

              {/* Submission fields */}
              {[
                { label: "Who They Taught", value: selected.taughtName },
                { label: "What They Taught", value: selected.taughtWhat },
                { label: "Reaction / Result", value: selected.taughtResult },
                { label: "Personal Reflection", value: selected.reflection },
              ].filter(({ value }) => value).map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] font-bold letter-luxury uppercase text-muted-foreground mb-1.5">{label}</p>
                  <p className="text-sm text-foreground leading-relaxed bg-[#F6F6F8] rounded-xl p-4">{value}</p>
                </div>
              ))}

              {/* Reviewer notes */}
              <div>
                <p className="text-[11px] font-bold letter-luxury uppercase text-muted-foreground mb-1.5">
                  Your Private Notes
                </p>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add feedback, approval notes, or revision requests here..."
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <button
                  onClick={saveNotes}
                  disabled={saving}
                  className="mt-2 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                  style={{ background: "#FF2DAA" }}
                >
                  {saving ? "Saving…" : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachingSubmissions;
