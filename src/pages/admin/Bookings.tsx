import { useState, useMemo } from "react";
import { Search, ExternalLink, Eye, X, Calendar } from "lucide-react";
import { store, BookingInquiry } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<BookingInquiry["status"], { bg: string; text: string; label: string }> = {
  new: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", label: "New" },
  reviewing: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Reviewing" },
  confirmed: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Confirmed" },
  declined: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", label: "Declined" },
};

const AdminBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<BookingInquiry[]>(() => store.getBookings());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookingInquiry["status"] | "all">("all");
  const [selected, setSelected] = useState<BookingInquiry | null>(null);

  const refresh = () => setBookings(store.getBookings());

  const filtered = useMemo(() => bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.organization.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  }), [bookings, search, filterStatus]);

  const updateStatus = (id: string, status: BookingInquiry["status"]) => {
    store.updateBookingStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    toast({ title: `Booking marked as ${status}` });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Speaking Bookings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {bookings.filter((b) => b.status === "new").length} new · {bookings.length} total inquiries
        </p>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(statusConfig) as [BookingInquiry["status"], typeof statusConfig[BookingInquiry["status"]]][]).map(([s, c]) => {
          const count = bookings.filter((b) => b.status === s).length;
          return (
            <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-sm font-semibold" style={{ borderColor: `${c.text}30` }}>
              <span className="w-2 h-2 rounded-full" style={{ background: c.text }} />
              <span style={{ color: c.text }}>{c.label}</span>
              <span className="text-muted-foreground font-normal">({count})</span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "new", "reviewing", "confirmed", "declined"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={filterStatus === s
                ? { background: "#FF2DAA", color: "white" }
                : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((b) => {
          const sc = statusConfig[b.status];
          return (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelected(b)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ background: "#6366F1" }}>
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.organization}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                  {sc.label}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  <span>{b.eventDate} · {b.eventType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground/60">Audience:</span>
                  <span>{b.audienceSize}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{b.details}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                <span className="text-[11px] text-muted-foreground">{b.submittedAt}</span>
                <div className="flex gap-1.5">
                  <a
                    href={`mailto:${b.email}?subject=Re: Speaking Inquiry — ${b.organization}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors"
                    title="Reply via email"
                  >
                    <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(b); }}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Eye size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">No bookings match your filter.</div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelected(null)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <div className="flex items-start justify-between mb-6 pr-8">
              <div>
                <h2 className="font-heading text-xl font-bold">{selected.name}</h2>
                <p className="text-muted-foreground text-sm">{selected.organization}</p>
              </div>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value as BookingInquiry["status"])}
                className="text-[11px] font-semibold uppercase px-3 py-1.5 rounded-full border-0"
                style={{ background: statusConfig[selected.status].bg, color: statusConfig[selected.status].text }}
              >
                {(["new", "reviewing", "confirmed", "declined"] as const).map((s) => (
                  <option key={s} value={s}>{statusConfig[s].label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3 text-sm mb-6">
              {[
                ["Email", selected.email],
                ["Event Type", selected.eventType],
                ["Audience Size", selected.audienceSize],
                ["Event Date", selected.eventDate],
                ["Submitted", selected.submittedAt],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Event Details</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{selected.details}</p>
            </div>
            <a
              href={`mailto:${selected.email}?subject=Re: Speaking Inquiry — ${selected.organization}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white hover:opacity-90 transition-all"
              style={{ background: "#FF2DAA" }}
            >
              <ExternalLink size={14} /> Reply via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
