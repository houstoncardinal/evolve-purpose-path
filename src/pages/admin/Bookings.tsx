import { useState, useEffect, useMemo } from "react";
import { Search, ExternalLink, Eye, X, Calendar, Plus } from "lucide-react";
import { store, BookingInquiry } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<BookingInquiry["status"], { bg: string; text: string; label: string }> = {
  new: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", label: "New" },
  reviewing: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Reviewing" },
  confirmed: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Confirmed" },
  declined: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", label: "Declined" },
};

const emptyBooking = {
  name: "", email: "", organization: "", eventType: "", audienceSize: "", eventDate: "", details: "", status: "new" as BookingInquiry["status"],
};

const AdminBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookingInquiry["status"] | "all">("all");
  const [selected, setSelected] = useState<BookingInquiry | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState(emptyBooking);
  const [noteEditing, setNoteEditing] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => { store.getBookings().then(setBookings); }, []);

  const refresh = () => store.getBookings().then(setBookings);

  const filtered = useMemo(() => bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.organization.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  }), [bookings, search, filterStatus]);

  const updateStatus = async (id: string, status: BookingInquiry["status"]) => {
    await store.updateBookingStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    toast({ title: `Booking marked as ${status}` });
  };

  const saveNote = async (id: string) => {
    await store.updateBookingNotes(id, noteText);
    refresh();
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, notes: noteText } : null);
    setNoteEditing(null);
    toast({ title: "Note saved" });
  };

  const handleAdd = async () => {
    if (!newBooking.name.trim() || !newBooking.email.trim()) return;
    await store.addBooking(newBooking);
    refresh();
    setShowAddModal(false);
    setNewBooking(emptyBooking);
    toast({ title: "Booking inquiry added" });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Speaking Bookings</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {bookings.filter((b) => b.status === "new").length} new · {bookings.length} total inquiries
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
          style={{ background: "#FF2DAA" }}
        >
          <Plus size={15} /> Add Inquiry
        </button>
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
              {b.notes && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-700 line-clamp-1">📝 {b.notes}</p>
                </div>
              )}
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
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Event Details</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{selected.details}</p>
            </div>

            {/* Notes */}
            <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-amber-700 uppercase">Internal Notes</p>
                {noteEditing !== selected.id && (
                  <button onClick={() => { setNoteEditing(selected.id); setNoteText(selected.notes || ""); }} className="text-xs text-amber-600 hover:text-amber-800 font-semibold">
                    {selected.notes ? "Edit" : "Add Note"}
                  </button>
                )}
              </div>
              {noteEditing === selected.id ? (
                <div className="space-y-2">
                  <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" placeholder="Add internal notes about this booking..." autoFocus />
                  <div className="flex gap-2">
                    <button onClick={() => saveNote(selected.id)} className="px-4 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-90" style={{ background: "#F59E0B" }}>Save Note</button>
                    <button onClick={() => setNoteEditing(null)} className="px-4 py-1.5 rounded-xl text-xs font-semibold border border-amber-200 hover:bg-amber-100">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-amber-800">{selected.notes || "No notes yet."}</p>
              )}
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

      {/* Add Inquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">Add Booking Inquiry</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Contact Name *</label>
                  <input type="text" value={newBooking.name} onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Full name" autoFocus />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email *</label>
                  <input type="email" value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="email@org.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Organization</label>
                <input type="text" value={newBooking.organization} onChange={(e) => setNewBooking({ ...newBooking, organization: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Organization or event name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Event Type</label>
                  <input type="text" value={newBooking.eventType} onChange={(e) => setNewBooking({ ...newBooking, eventType: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Conference" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Event Date</label>
                  <input type="date" value={newBooking.eventDate} onChange={(e) => setNewBooking({ ...newBooking, eventDate: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Audience Size</label>
                  <input type="text" value={newBooking.audienceSize} onChange={(e) => setNewBooking({ ...newBooking, audienceSize: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. 100-250" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                  <select value={newBooking.status} onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value as BookingInquiry["status"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    {(["new", "reviewing", "confirmed", "declined"] as const).map((s) => (
                      <option key={s} value={s}>{statusConfig[s].label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Event Details</label>
                <textarea value={newBooking.details} onChange={(e) => setNewBooking({ ...newBooking, details: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Event description and notes..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} disabled={!newBooking.name.trim() || !newBooking.email.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>Add Inquiry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
