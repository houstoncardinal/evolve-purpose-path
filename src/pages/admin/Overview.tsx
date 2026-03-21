import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, ShoppingCart, Mail, Calendar, Users, GraduationCap,
  ArrowUpRight, Plus, Package, BookOpen, ChevronRight,
} from "lucide-react";
import { store, REVENUE_CHART, Order, Subscriber, BookingInquiry } from "@/lib/adminStore";

const fmt$ = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(0)}`;

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long", month: "long", day: "numeric",
});

/* ── Stat Card ── */
const StatCard = ({
  label, value, sub, icon: Icon, color, href, accent,
}: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string; href?: string; accent?: string;
}) => (
  <Link
    to={href ?? "#"}
    className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-start justify-between group transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 relative overflow-hidden"
  >
    {/* left accent bar */}
    <span
      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full"
      style={{ background: accent ?? color }}
    />
    <div className="pl-3">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
      <p className="font-heading text-[26px] leading-none font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>}
    </div>
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-2"
      style={{ background: `${color}14` }}
    >
      <Icon size={18} style={{ color }} />
    </div>
  </Link>
);

/* ── Custom Chart Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-sm shadow-xl border border-white/10" style={{ background: "#1a1a23" }}>
      <p className="text-white/40 text-xs mb-1.5 font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-bold text-base" style={{ color: p.color }}>
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
};

/* ── Status Badge ── */
const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  fulfilled: { bg: "rgba(16,185,129,0.08)", text: "#059669", dot: "#10B981" },
  processing: { bg: "rgba(99,102,241,0.08)", text: "#4F46E5", dot: "#6366F1" },
  pending: { bg: "rgba(245,158,11,0.08)", text: "#D97706", dot: "#F59E0B" },
  refunded: { bg: "rgba(239,68,68,0.08)", text: "#DC2626", dot: "#EF4444" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const c = statusStyles[status] ?? { bg: "rgba(0,0,0,0.05)", text: "#666", dot: "#999" };
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.dot }} />
      {status}
    </span>
  );
};

/* ── Quick Action ── */
const QuickAction = ({ label, href, icon: Icon, color }: { label: string; href: string; icon: React.ElementType; color: string }) => (
  <Link
    to={href}
    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-black/[0.06] text-sm font-medium text-foreground hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150"
  >
    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${color}14` }}>
      <Icon size={12} style={{ color }} />
    </div>
    {label}
  </Link>
);

/* ── Default stats ── */
const defaultStats = {
  totalRevenue: 0, monthlyRevenue: 0, totalOrders: 0, pendingOrders: 0,
  subscribers: 0, newBookings: 0, totalBookings: 0, pendingApps: 0,
  approvedMembers: 0, activeEnrollments: 0, totalEnrollmentRevenue: 0,
};

/* ══════════════════════════════════════════ */
const Overview = () => {
  const [stats, setStats] = useState(defaultStats);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    store.getStats().then(setStats);
    store.getOrders().then(setOrders);
    store.getBookings().then(setBookings);
    store.getSubscribers().then(setSubscribers);
  }, []);

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

  const revenueGrowth = REVENUE_CHART[0].revenue > 0
    ? Math.round(((REVENUE_CHART[11].revenue - REVENUE_CHART[0].revenue) / REVENUE_CHART[0].revenue) * 100)
    : 0;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">

      {/* ── Greeting ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{today}</p>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {getGreeting()}, Sarah <span className="inline-block">👋</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {stats.newBookings > 0
              ? `You have ${stats.newBookings} new booking ${stats.newBookings === 1 ? "inquiry" : "inquiries"} awaiting review.`
              : "Everything is up to date. Here's your overview."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickAction label="New Product" href="/admin/products" icon={Plus} color="#FF2DAA" />
          <QuickAction label="View Orders" href="/admin/orders" icon={Package} color="#6366F1" />
          <QuickAction label="Subscribers" href="/admin/subscribers" icon={BookOpen} color="#10B981" />
        </div>
      </div>

      {/* ── KPI Grid ── */}
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
          sub={`${stats.pendingOrders} pending fulfillment`}
          icon={ShoppingCart}
          color="#6366F1"
          href="/admin/orders"
        />
        <StatCard
          label="Email Subscribers"
          value={String(stats.subscribers)}
          sub="Active list"
          icon={Mail}
          color="#10B981"
          href="/admin/subscribers"
        />
        <StatCard
          label="New Inquiries"
          value={String(stats.newBookings)}
          sub={`${stats.totalBookings} total bookings`}
          icon={Calendar}
          color="#F59E0B"
          href="/admin/bookings"
        />
        <StatCard
          label="Community"
          value={String(stats.approvedMembers)}
          sub={`${stats.pendingApps} pending applications`}
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

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Revenue — dark panel */}
        <div
          className="xl:col-span-3 rounded-2xl p-6 relative overflow-hidden"
          style={{ background: "#0B0B0F", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute -top-20 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,170,0.08), transparent 70%)" }}
          />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h2 className="font-heading text-base font-bold text-white">Revenue</h2>
              <p className="text-white/40 text-xs mt-0.5">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
              >
                <TrendingUp size={11} /> +{revenueGrowth}%
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={REVENUE_CHART} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF2DAA" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#FF2DAA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }}
                axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="revenue" stroke="#FF2DAA"
                strokeWidth={2.5} fill="url(#revenueGrad)"
                dot={false} activeDot={{ r: 4, fill: "#FF2DAA", strokeWidth: 2, stroke: "#0B0B0F" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-black/[0.06] p-6">
          <div className="mb-5">
            <h2 className="font-heading text-base font-bold text-foreground">Top Products</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Orders by item</p>
          </div>
          {ordersByProduct.length > 0 ? (
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={ordersByProduct} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#aaa" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9.5, fill: "#aaa" }} axisLine={false} tickLine={false} width={88} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#FF2DAA" radius={[0, 5, 5, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[190px] flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No orders yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading text-base font-bold">Recent Orders</h2>
              <p className="text-muted-foreground text-xs mt-0.5">{orders.length} total orders</p>
            </div>
            <Link
              to="/admin/orders"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #FF2DAA, #c4007a)" }}
                  >
                    {o.customer.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">{o.customer}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{o.product}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">${o.amount.toFixed(2)}</p>
                    <div className="mt-0.5">
                      <StatusBadge status={o.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <ShoppingCart size={24} className="mx-auto mb-2 text-muted-foreground opacity-30" />
              <p className="text-muted-foreground text-sm">No orders yet</p>
            </div>
          )}
        </div>

        {/* New Subscribers */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading text-base font-bold">New Subscribers</h2>
              <p className="text-muted-foreground text-xs mt-0.5">{subscribers.length} total subscribers</p>
            </div>
            <Link
              to="/admin/subscribers"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>
          {recentSubs.length > 0 ? (
            <div className="space-y-3">
              {recentSubs.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                  >
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">{s.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{s.email}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}
                  >
                    {s.source}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <Mail size={24} className="mx-auto mb-2 text-muted-foreground opacity-30" />
              <p className="text-muted-foreground text-sm">No subscribers yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Booking alert ── */}
      {stats.newBookings > 0 && (
        <Link
          to="/admin/bookings"
          className="flex items-center gap-4 bg-white rounded-2xl p-5 transition-all hover:shadow-md group"
          style={{ border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.02)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(245,158,11,0.1)" }}
          >
            <Calendar size={18} style={{ color: "#F59E0B" }} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">
              {stats.newBookings} new speaking {stats.newBookings === 1 ? "inquiry" : "inquiries"} awaiting review
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Review and respond to booking requests</p>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </Link>
      )}
    </div>
  );
};

export default Overview;
