import { useState, useEffect, useMemo } from "react";
import { Package, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Search, X } from "lucide-react";
import { store, Product, Bundle } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

type Tab = "products" | "bundles";

const categoryColors: Record<Product["category"], { bg: string; text: string }> = {
  physical: { bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  digital: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  bundle: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
};

const statusColors: Record<Product["status"], { bg: string; text: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  coming_soon: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  inactive: { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
};

// ─── Products Tab ─────────────────────────────────────────────────────────────

const emptyProduct = { name: "", price: "", category: "physical" as Product["category"], description: "", badge: "", status: "active" as Product["status"] };

const ProductsTab = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Product["category"] | "all">("all");
  const [modal, setModal] = useState<{ open: boolean; editing: Product | null }>({ open: false, editing: null });
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => { store.getProducts().then(setProducts); }, []);
  const refresh = () => store.getProducts().then(setProducts);

  const filtered = useMemo(() => products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  }), [products, search, filterCat]);

  const openAdd = () => { setForm(emptyProduct); setModal({ open: true, editing: null }); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), category: p.category, description: p.description, badge: p.badge || "", status: p.status });
    setModal({ open: true, editing: p });
  };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    const price = parseFloat(form.price);
    if (!form.name.trim() || isNaN(price)) return;
    if (modal.editing) {
      await store.updateProduct(modal.editing.id, { name: form.name, price, category: form.category, description: form.description, badge: form.badge || undefined, status: form.status, shortName: form.name.split(" ").slice(0, 3).join(" ") });
      toast({ title: "Product updated" });
    } else {
      await store.addProduct({ name: form.name, shortName: form.name.split(" ").slice(0, 3).join(" "), price, category: form.category, description: form.description, badge: form.badge || undefined, status: form.status });
      toast({ title: "Product added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await store.deleteProduct(p.id);
    refresh();
    toast({ title: "Product deleted" });
  };

  const toggleStatus = async (p: Product) => {
    const next = p.status === "active" ? "inactive" : "active";
    await store.updateProduct(p.id, { status: next });
    refresh();
    toast({ title: `${p.shortName} is now ${next}` });
  };

  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">{products.length} products · ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} revenue · {totalSales} sold</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full" />
        </div>
        <div className="flex gap-2">
          {(["all", "physical", "digital", "bundle"] as const).map((cat) => (
            <button key={cat} onClick={() => setFilterCat(cat)} className="px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={filterCat === cat ? { background: "#FF2DAA", color: "white" } : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Product", "Category", "Price", "Sales", "Revenue", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = categoryColors[p.category];
                const st = statusColors[p.status];
                return (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,45,170,0.08)" }}>
                          <Package size={15} style={{ color: "#FF2DAA" }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{p.name}</p>
                          {p.badge && <span className="text-[10px] font-bold uppercase" style={{ color: "#FF2DAA" }}>{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: cat.bg, color: cat.text }}>{p.category}</span>
                    </td>
                    <td className="px-5 py-4"><span className="text-sm font-semibold">${p.price.toFixed(2)}</span></td>
                    <td className="px-5 py-4"><span className="text-sm text-muted-foreground">{p.sales.toLocaleString()}</span></td>
                    <td className="px-5 py-4"><span className="text-sm font-semibold">${p.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>{p.status.replace("_", " ")}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors" title="Edit"><Edit2 size={14} /></button>
                        <button onClick={() => toggleStatus(p)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title={p.status === "active" ? "Deactivate" : "Activate"}>
                          {p.status === "active" ? <ToggleRight size={18} style={{ color: "#10B981" }} /> : <ToggleLeft size={18} className="text-muted-foreground" />}
                        </button>
                        <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Product" : "Add Product"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Product name" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Price ($) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="0.00" min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                    <option value="bundle">Bundle</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Badge (optional)</label>
                  <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Bestseller" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Product["status"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    <option value="active">Active</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Brief product description" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.name.trim() || !form.price} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save Changes" : "Add Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Bundles Tab ──────────────────────────────────────────────────────────────

const emptyBundle = { name: "", price: "", originalPrice: "", items: "", badge: "", description: "", status: "active" as Bundle["status"] };

const BundlesTab = () => {
  const { toast } = useToast();
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Bundle | null }>({ open: false, editing: null });
  const [form, setForm] = useState(emptyBundle);

  useEffect(() => { store.getBundles().then(setBundles); }, []);
  const refresh = () => store.getBundles().then(setBundles);
  const openAdd = () => { setForm(emptyBundle); setModal({ open: true, editing: null }); };
  const openEdit = (b: Bundle) => {
    setForm({ name: b.name, price: String(b.price), originalPrice: String(b.originalPrice), items: b.items.join(", "), badge: b.badge || "", description: b.description, status: b.status });
    setModal({ open: true, editing: b });
  };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    const price = parseFloat(form.price);
    const originalPrice = parseFloat(form.originalPrice);
    if (!form.name.trim() || isNaN(price)) return;
    const items = form.items.split(",").map((s) => s.trim()).filter(Boolean);
    const payload: Omit<Bundle, "id"> = { name: form.name, price, originalPrice: isNaN(originalPrice) ? price : originalPrice, items, description: form.description, status: form.status, ...(form.badge ? { badge: form.badge } : {}) };
    if (modal.editing) {
      await store.updateBundle(modal.editing.id, payload);
      toast({ title: "Bundle updated" });
    } else {
      await store.addBundle(payload);
      toast({ title: "Bundle added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (b: Bundle) => {
    if (!confirm(`Delete bundle "${b.name}"?`)) return;
    await store.deleteBundle(b.id);
    refresh();
    toast({ title: "Bundle deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{bundles.length} bundles</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Bundle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {bundles.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-foreground">{b.name}</p>
                {b.badge && <span className="text-[10px] font-bold uppercase" style={{ color: "#FF2DAA" }}>{b.badge}</span>}
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2"
                style={b.status === "active" ? { background: "rgba(16,185,129,0.1)", color: "#10B981" } : { background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                {b.status}
              </span>
            </div>
            <p className="text-sm font-bold mb-1">${b.price.toFixed(2)} <span className="line-through text-muted-foreground font-normal text-xs">${b.originalPrice.toFixed(2)}</span></p>
            <div className="flex flex-wrap gap-1 mb-3">
              {b.items.map((item) => (
                <span key={item} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-muted-foreground">{item}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{b.description}</p>
            <div className="flex gap-2 pt-3 border-t border-border/50">
              <button onClick={() => openEdit(b)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-gray-50 transition-colors"><Edit2 size={12} /> Edit</button>
              <button onClick={() => handleDelete(b)} className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors border border-border"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {bundles.length === 0 && <div className="col-span-3 text-center py-10 text-muted-foreground text-sm bg-white rounded-2xl border border-border">No bundles yet.</div>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Bundle" : "Add Bundle"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Bundle Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. The Starter Kit" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Bundle Price ($) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="0.00" min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Original Price ($)</label>
                  <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="0.00" min="0" step="0.01" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Included Items (comma-separated)</label>
                <textarea value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} rows={2} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Journal, Card Deck, Workbook" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Badge (optional)</label>
                  <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Best Value" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Bundle["status"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Brief bundle description" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.name.trim() || !form.price} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save Changes" : "Add Bundle"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminProducts = () => {
  const [tab, setTab] = useState<Tab>("products");

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Products & Bundles</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your shop inventory and bundle offers</p>
      </div>

      <div className="flex gap-2">
        {(["products", "bundles"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
            style={tab === t ? { background: "#FF2DAA", color: "white" } : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "products" && <ProductsTab />}
      {tab === "bundles" && <BundlesTab />}
    </div>
  );
};

export default AdminProducts;
