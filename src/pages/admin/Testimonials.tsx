import { useState, useEffect } from "react";
import { Plus, Star, Trash2, Edit2, X, Check } from "lucide-react";
import { store, Testimonial } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const PROGRAMS = [
  "1:1 Deep-Dive Coaching",
  "Evolve 2 Purpose Group Program",
  "Purpose Clarity Session",
  "Healing Intensive Weekend",
  "Group Program",
  "1:1 Coaching",
  "Healing Intensive",
];

const emptyForm = {
  quote: "",
  name: "",
  detail: "",
  transformation: "",
  program: "1:1 Deep-Dive Coaching",
  featured: false,
};

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Testimonial | null }>({ open: false, editing: null });
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { store.getTestimonials().then(setItems); }, []);

  const refresh = () => store.getTestimonials().then(setItems);

  const openAdd = () => {
    setForm(emptyForm);
    setModal({ open: true, editing: null });
  };

  const openEdit = (t: Testimonial) => {
    setForm({ quote: t.quote, name: t.name, detail: t.detail, transformation: t.transformation, program: t.program, featured: t.featured });
    setModal({ open: true, editing: t });
  };

  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    if (!form.quote.trim() || !form.name.trim()) return;
    if (modal.editing) {
      await store.updateTestimonial(modal.editing.id, form);
      toast({ title: "Testimonial updated" });
    } else {
      await store.addTestimonial(form);
      toast({ title: "Testimonial added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    await store.deleteTestimonial(id);
    refresh();
    toast({ title: "Testimonial deleted" });
  };

  const toggleFeatured = async (t: Testimonial) => {
    await store.updateTestimonial(t.id, { featured: !t.featured });
    refresh();
    toast({ title: t.featured ? "Removed from featured" : "Set as featured story" });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {items.length} total · {items.filter((t) => t.featured).length} featured
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "#FF2DAA" }}
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(255,45,170,0.06)", border: "1px solid rgba(255,45,170,0.15)" }}>
        <Star size={14} style={{ color: "#FF2DAA", marginTop: 2, flexShrink: 0 }} />
        <p className="text-sm" style={{ color: "#FF2DAA" }}>
          The starred testimonial appears as the <strong>Featured Story</strong> on the public testimonials page. Only one can be featured at a time.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["#", "Person", "Quote Preview", "Program", "Featured", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-muted-foreground">{t.order + 1}</span>
                  </td>
                  <td className="px-5 py-4 min-w-[180px]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: "rgba(255,45,170,0.7)" }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.detail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-[280px]">
                    <p className="text-xs text-muted-foreground line-clamp-2 italic">"{t.quote}"</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: "rgba(255,45,170,0.08)", color: "#FF2DAA" }}>
                      {t.program}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleFeatured(t)}
                      title={t.featured ? "Remove from featured" : "Set as featured story"}
                      className="p-1.5 rounded-lg transition-colors hover:bg-amber-50"
                    >
                      <Star size={16} fill={t.featured ? "#F59E0B" : "none"} style={{ color: t.featured ? "#F59E0B" : "#CBD5E1" }} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.name)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No testimonials yet.</div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Testimonial" : "Add Testimonial"}</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Quote *</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  rows={4}
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                  placeholder="Enter the full testimonial quote..."
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="e.g. Keisha L."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Detail</label>
                  <input
                    type="text"
                    value={form.detail}
                    onChange={(e) => setForm({ ...form, detail: e.target.value })}
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="e.g. Mother of 3"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Transformation Line</label>
                <input
                  type="text"
                  value={form.transformation}
                  onChange={(e) => setForm({ ...form, transformation: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  placeholder="e.g. From broken to whole"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Program</label>
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
                >
                  {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, featured: !form.featured })}
                className="flex items-center gap-3 cursor-pointer w-full text-left"
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center border-2 transition-colors shrink-0"
                  style={form.featured ? { background: "#FF2DAA", borderColor: "#FF2DAA" } : { borderColor: "#CBD5E1" }}
                >
                  {form.featured && <Check size={12} color="white" />}
                </div>
                <span className="text-sm font-medium">Set as featured story (hero placement on testimonials page)</span>
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button
                onClick={handleSave}
                disabled={!form.quote.trim() || !form.name.trim()}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40"
                style={{ background: "#FF2DAA" }}
              >
                {modal.editing ? "Save Changes" : "Add Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
