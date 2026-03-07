import { useState } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { store, SpeakingTopic, EventFormat, FAQ } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

type Tab = "topics" | "formats" | "faqs";

// ─── Speaking Topics ──────────────────────────────────────────────────────────

const TopicsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<SpeakingTopic[]>(() => store.getSpeakingTopics());
  const [modal, setModal] = useState<{ open: boolean; editing: SpeakingTopic | null }>({ open: false, editing: null });
  const [form, setForm] = useState({ title: "", desc: "" });

  const refresh = () => setItems(store.getSpeakingTopics());
  const openAdd = () => { setForm({ title: "", desc: "" }); setModal({ open: true, editing: null }); };
  const openEdit = (t: SpeakingTopic) => { setForm({ title: t.title, desc: t.desc }); setModal({ open: true, editing: t }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (modal.editing) {
      store.updateSpeakingTopic(modal.editing.id, form);
      toast({ title: "Topic updated" });
    } else {
      store.addSpeakingTopic(form);
      toast({ title: "Topic added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete topic "${title}"?`)) return;
    store.deleteSpeakingTopic(id);
    refresh();
    toast({ title: "Topic deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} speaking topics displayed on the Booking page</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Topic
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border/50">
          {items.map((t, i) => (
            <div key={t.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
              <span className="text-xs font-mono text-muted-foreground mt-0.5 w-5 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.desc}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(t.id, t.title)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No speaking topics yet.</div>}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Topic" : "Add Topic"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Topic title" autoFocus />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Brief description of the topic..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.title.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Event Formats ────────────────────────────────────────────────────────────

const FormatsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<EventFormat[]>(() => store.getEventFormats());
  const [modal, setModal] = useState<{ open: boolean; editing: EventFormat | null }>({ open: false, editing: null });
  const [form, setForm] = useState({ label: "", detail: "" });

  const refresh = () => setItems(store.getEventFormats());
  const openAdd = () => { setForm({ label: "", detail: "" }); setModal({ open: true, editing: null }); };
  const openEdit = (f: EventFormat) => { setForm({ label: f.label, detail: f.detail }); setModal({ open: true, editing: f }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = () => {
    if (!form.label.trim()) return;
    if (modal.editing) {
      store.updateEventFormat(modal.editing.id, form);
      toast({ title: "Format updated" });
    } else {
      store.addEventFormat(form);
      toast({ title: "Format added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = (id: string, label: string) => {
    if (!confirm(`Delete format "${label}"?`)) return;
    store.deleteEventFormat(id);
    refresh();
    toast({ title: "Format deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} formats displayed on the Booking page</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Format
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border/50">
          {items.map((f, i) => (
            <div key={f.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
              <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.detail}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(f.id, f.label)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No event formats yet.</div>}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Format" : "Add Format"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Format Name *</label>
                <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Keynote Address" autoFocus />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Duration / Detail</label>
                <input type="text" value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. 45 – 90 minutes" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.label.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const categoryConfig: Record<FAQ["category"], { label: string; color: string }> = {
  booking: { label: "Booking", color: "#6366F1" },
  programs: { label: "Programs", color: "#10B981" },
  community: { label: "Community", color: "#EC4899" },
  general: { label: "General", color: "#F59E0B" },
};

const FAQsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<FAQ[]>(() => store.getFAQs());
  const [modal, setModal] = useState<{ open: boolean; editing: FAQ | null }>({ open: false, editing: null });
  const [form, setForm] = useState<{ question: string; answer: string; category: FAQ["category"] }>({ question: "", answer: "", category: "booking" });

  const refresh = () => setItems(store.getFAQs());
  const openAdd = () => { setForm({ question: "", answer: "", category: "booking" }); setModal({ open: true, editing: null }); };
  const openEdit = (f: FAQ) => { setForm({ question: f.question, answer: f.answer, category: f.category }); setModal({ open: true, editing: f }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    if (modal.editing) {
      store.updateFAQ(modal.editing.id, form);
      toast({ title: "FAQ updated" });
    } else {
      store.addFAQ(form);
      toast({ title: "FAQ added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    store.deleteFAQ(id);
    refresh();
    toast({ title: "FAQ deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} FAQs across all sections</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border/50">
          {items.map((f, i) => {
            const cat = categoryConfig[f.category];
            return (
              <div key={f.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <span className="text-xs font-mono text-muted-foreground mt-0.5 w-5 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{f.question}</p>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                  <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No FAQs yet.</div>}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit FAQ" : "Add FAQ"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as FAQ["category"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                  {(Object.entries(categoryConfig) as [FAQ["category"], { label: string }][]).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Question *</label>
                <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Enter the question..." autoFocus />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Answer *</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Enter the answer..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.question.trim() || !form.answer.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminContentManager = () => {
  const [tab, setTab] = useState<Tab>("topics");

  const tabs: { key: Tab; label: string }[] = [
    { key: "topics", label: "Speaking Topics" },
    { key: "formats", label: "Event Formats" },
    { key: "faqs", label: "FAQs" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Content Manager</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage content displayed on the Speaking / Booking page</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.key
              ? { background: "#FF2DAA", color: "white" }
              : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "topics" && <TopicsTab />}
      {tab === "formats" && <FormatsTab />}
      {tab === "faqs" && <FAQsTab />}
    </div>
  );
};

export default AdminContentManager;
