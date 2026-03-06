import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, ShoppingCart, Mail, Calendar, Users, GraduationCap,
  ArrowUpRight, Package,
} from "lucide-react";
import { store, REVENUE_CHART } from "@/lib/adminStore";

const fmt$ = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(0)}`;

const StatCard = ({
  label, value, sub, icon: Icon, color, href,
}: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string; href?: string;
}) => (
  <div className="bg-white rounded-2xl border border-border p-5 flex items-start justify-between group hover:shadow-md transition-shadow">
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase letter-luxury mb-2">{label}</p>
      <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
    <div className="flex flex-col items-end gap-2">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}14` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      {href && (
        <Link to={href} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          View <ArrowUpRight size={10} />
        </Link>
      )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3 text-sm">
      <p className="text-white/50 text-xs mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-bold" style={{ color: p.color }}>
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
};

const Overview = () => {
  const stats = useMemo(() => store.getStats(), []);
  const orders = useMemo(() => store.getOrders(), []);
  const bookings = useMemo(() => store.getBookings(), []);
  const subscribers = useMemo(() => store.getSubscribers(), []);

  const ordersByProduct = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => {
      const short = o.product.split(" ").slice(0, 3).join(" ");
      map[short] = (map[short] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [orders]);

  const recentOrders = orders.slice(0, 5);
  const recentSubs = subscribers.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Welcome back, Sarah. Here's what's happening.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          label="Monthly Revenue"
          value={fmt$(stats.monthlyRevenue)}
          sub={`${stats.totalOrders} total orders`}
          icon={TrendingUp}
          color="#FF2DAA"
          href="/admin/orders"
        />
        <StatCard
          label="Total Orders"
          value={String(stats.totalOrders)}
          sub={`${stats.pendingOrders} pending`}
          icon={ShoppingCart}
          color="#6366F1"
          href="/admin/orders"
        />
        <StatCard
          label="Subscribers"
          value={String(stats.subscribers)}
          sub="Email list"
          icon={Mail}
          color="#10B981"
          href="/admin/subscribers"
        />
        <StatCard
          label="New Bookings"
          value={String(stats.newBookings)}
          sub={`${stats.totalBookings} total inquiries`}
          icon={Calendar}
          color="#F59E0B"
          href="/admin/bookings"
        />
        <StatCard
          label="Community"
          value={String(stats.approvedMembers)}
          sub={`${stats.pendingApps} pending apps`}
          icon={Users}
          color="#EC4899"
          href="/admin/community"
        />
        <StatCard
          label="Enrollments"
          value={String(stats.activeEnrollments)}
          sub={`${fmt$(stats.totalEnrollmentRevenue)} revenue`}
          icon={GraduationCap}
          color="#8B5CF6"
          href="/admin/programs"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">Revenue</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Last 12 months</p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,45,170,0.1)", color: "#FF2DAA" }}
            >
              +{Math.round(((REVENUE_CHART[11].revenue - REVENUE_CHART[0].revenue) / REVENUE_CHART[0].revenue) * 100)}%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_CHART} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF2DAA" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#FF2DAA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#FF2DAA" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: "#FF2DAA", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by product */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="mb-6">
            <h2 className="font-heading text-base font-bold text-foreground">Top Products</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Orders by item</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ordersByProduct} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#FF2DAA" radius={[0, 4, 4, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-base font-bold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "#FF2DAA" }}
                >
                  {o.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{o.customer}</p>
                  <p className="text-xs text-muted-foreground truncate">{o.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold">${o.amount.toFixed(2)}</p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent subscribers */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-base font-bold">New Subscribers</h2>
            <Link to="/admin/subscribers" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentSubs.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "rgba(16,185,129,1)" }}
                >
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.email}</p>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                >
                  {s.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New bookings alert */}
      {stats.newBookings > 0 && (
        <Link
          to="/admin/bookings"
          className="flex items-center gap-4 bg-white rounded-2xl border p-5 hover:shadow-md transition-shadow group"
          style={{ borderColor: "rgba(245,158,11,0.3)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(245,158,11,0.1)" }}
          >
            <Calendar size={18} style={{ color: "#F59E0B" }} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">
              {stats.newBookings} new speaking {stats.newBookings === 1 ? "inquiry" : "inquiries"} need your attention
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Review and respond to booking requests</p>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      )}
    </div>
  );
};

const statusColors: Record<string, { bg: string; text: string }> = {
  fulfilled: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  processing: { bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  pending: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  refunded: { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const c = statusColors[status] ?? { bg: "rgba(0,0,0,0.06)", text: "#888" };
  return (
    <span
      className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
};

export default Overview;
