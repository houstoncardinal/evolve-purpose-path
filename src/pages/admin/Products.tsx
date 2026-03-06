import { useState, useMemo } from "react";
import { Package, Plus, Edit2, ToggleLeft, ToggleRight, Search, X, Check } from "lucide-react";
import { store, Product } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

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

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(() => store.getProducts());
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Product["category"] | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "physical" as Product["category"], description: "", status: "active" as Product["status"] });

  const refresh = () => setProducts(store.getProducts());

  const filtered = useMemo(() => products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  }), [products, search, filterCat]);

  const toggleStatus = (p: Product) => {
    const next = p.status === "active" ? "inactive" : "active";
    store.updateProduct(p.id, { status: next });
    refresh();
    toast({ title: `${p.shortName} is now ${next}` });
  };

  const savePrice = (id: string) => {
    const val = parseFloat(editPrice);
    if (isNaN(val) || val <= 0) return;
    store.updateProduct(id, { price: val });
    refresh();
    setEditingId(null);
    toast({ title: "Price updated" });
  };

  const handleAdd = () => {
    const price = parseFloat(newProduct.price);
    if (!newProduct.name || isNaN(price)) return;
    store.addProduct({
      name: newProduct.name,
      shortName: newProduct.name.split(" ").slice(0, 3).join(" "),
      price,
      category: newProduct.category,
      description: newProduct.description,
      status: newProduct.status,
    });
    refresh();
    setShowAddModal(false);
    setNewProduct({ name: "", price: "", category: "physical", description: "", status: "active" });
    toast({ title: "Product added" });
  };

  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} products · ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total revenue · {totalSales} units sold</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shrink-0"
          style={{ background: "#FF2DAA" }}
        >
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "physical", "digital", "bundle"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className="px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={filterCat === cat
                ? { background: "#FF2DAA", color: "white" }
                : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }
              }
            >
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
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,45,170,0.08)" }}
                        >
                          <Package size={15} style={{ color: "#FF2DAA" }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{p.name}</p>
                          {p.badge && (
                            <span className="text-[10px] font-bold uppercase" style={{ color: "#FF2DAA" }}>{p.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: cat.bg, color: cat.text }}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {editingId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-muted-foreground">$</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && savePrice(p.id)}
                            className="w-20 px-2 py-1 rounded-lg border border-primary/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            autoFocus
                          />
                          <button onClick={() => savePrice(p.id)} className="p-1 rounded-lg hover:bg-green-50 text-green-600"><Check size={13} /></button>
                          <button onClick={() => setEditingId(null)} className="p-1 rounded-lg hover:bg-red-50 text-red-500"><X size={13} /></button>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold">${p.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{p.sales.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold">${p.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>
                        {p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingId(p.id); setEditPrice(String(p.price)); }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit price"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => toggleStatus(p)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title={p.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {p.status === "active"
                            ? <ToggleRight size={18} style={{ color: "#10B981" }} />
                            : <ToggleLeft size={18} className="text-muted-foreground" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <button onClick={() => setShowAddModal(false)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">Add Product</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Name</label>
                <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Price ($)</label>
                  <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Product["category"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                    <option value="bundle">Bundle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" rows={3} placeholder="Brief product description" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "#FF2DAA" }}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
