import { useState, useEffect, useMemo } from "react";
import { Search, Download, Eye, X } from "lucide-react";
import { store, Order } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<Order["status"], { bg: string; text: string; label: string }> = {
  fulfilled: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Fulfilled" },
  processing: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", label: "Processing" },
  pending: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Pending" },
  refunded: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", label: "Refunded" },
};

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Order["status"] | "all">("all");
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => { store.getOrders().then(setOrders); }, []);

  const refresh = () => store.getOrders().then(setOrders);

  const filtered = useMemo(() => orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  }), [orders, search, filterStatus]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    await store.updateOrderStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected({ ...selected, status });
    toast({ title: `Order ${id} marked as ${status}` });
  };

  const exportCSV = () => {
    const header = "ID,Customer,Email,Product,Amount,Status,Date";
    const rows = filtered.map((o) =>
      `${o.id},"${o.customer}","${o.email}","${o.product}",${o.amount},${o.status},${o.date}`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalRevenue = filtered
    .filter((o) => o.status === "fulfilled")
    .reduce((s, o) => s + o.amount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {filtered.length} orders · ${totalRevenue.toFixed(2)} fulfilled revenue
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-gray-50 transition-colors shrink-0"
        >
          <Download size={14} /> Export CSV
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
            placeholder="Search orders..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "processing", "fulfilled", "refunded"] as const).map((s) => (
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Order ID", "Customer", "Product", "Amount", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const sc = statusConfig[o.status];
                return (
                  <tr key={o.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">{o.customer}</p>
                      <p className="text-xs text-muted-foreground">{o.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-foreground max-w-[180px] truncate">{o.product}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold">${o.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                        className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border-0 focus:ring-1 focus:ring-primary/30 cursor-pointer"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {(["pending", "processing", "fulfilled", "refunded"] as const).map((s) => (
                          <option key={s} value={s}>{statusConfig[s].label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{o.date}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(o)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <button onClick={() => setSelected(null)} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white" style={{ background: "#FF2DAA" }}>
                {selected.customer.charAt(0)}
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold">{selected.customer}</h2>
                <p className="text-xs text-muted-foreground font-mono">{selected.id}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Email", selected.email],
                ["Product", selected.product],
                ["Amount", `$${selected.amount.toFixed(2)}`],
                ["Date", selected.date],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Status</span>
                <select
                  value={selected.status}
                  onChange={(e) => {
                    const s = e.target.value as Order["status"];
                    updateStatus(selected.id, s);
                  }}
                  className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border-0 focus:ring-1 focus:ring-primary/30"
                  style={{ background: statusConfig[selected.status].bg, color: statusConfig[selected.status].text }}
                >
                  {(["pending", "processing", "fulfilled", "refunded"] as const).map((s) => (
                    <option key={s} value={s}>{statusConfig[s].label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
