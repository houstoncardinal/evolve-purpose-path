import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Mail, Calendar,
  Users, GraduationCap, LogOut, Menu, X, ChevronRight,
  ExternalLink, Star, FileText, MessageSquare, Settings,
  Bell, Search, ChevronDown, Sparkles, Home, TrendingUp,
} from "lucide-react";
import { store, initStore } from "@/lib/adminStore";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  exact?: boolean;
}

const navSections = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Commerce",
    items: [
      { label: "Products & Bundles", path: "/admin/products", icon: Package },
      { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Subscribers", path: "/admin/subscribers", icon: Mail },
      { label: "Program Enrollments", path: "/admin/programs", icon: GraduationCap },
      { label: "Speaking Bookings", path: "/admin/bookings", icon: Calendar },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Applications", path: "/admin/community", icon: Users },
      { label: "Posts & Events", path: "/admin/community-content", icon: MessageSquare },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Testimonials", path: "/admin/testimonials", icon: Star },
      { label: "Booking Page Content", path: "/admin/content", icon: FileText },
    ],
  },
];

const AdminShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    initStore();
    if (!store.isAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    store.logout();
    navigate("/admin/login");
  };

  const isActive = (item: { path: string; exact?: boolean }) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const stats = store.getStats?.() ?? null;
  const pendingCount = (stats?.newBookings ?? 0) + (stats?.pendingApps ?? 0) + (stats?.pendingOrders ?? 0);

  const getPageTitle = () => {
    const flat = navSections.flatMap((s) => s.items);
    const match = flat.find((item) => isActive(item));
    return match?.label ?? "Dashboard";
  };

  // Search filtering
  const allNavItems = navSections.flatMap((s) => s.items);
  const filteredNav = searchQuery
    ? allNavItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-[272px] shrink-0 relative overflow-hidden" style={{ background: "#08080C" }}>
      {/* Ambient glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(255,45,170,0.06)" }} />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,45,170,0.04)" }} />

      {/* Logo area */}
      <div className="relative z-10 px-6 pt-7 pb-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF2DAA, #D41E8D)" }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Evolve 2 Purpose</p>
            <p className="text-white/30 text-[10px] letter-luxury uppercase mt-0.5">Admin Console</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs text-white placeholder:text-white/20 focus:outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex-1 px-3 pb-3 overflow-y-auto scrollbar-thin">
        {/* Search results */}
        {searchQuery && filteredNav && (
          <div className="mb-4">
            <p className="text-white/20 text-[10px] letter-luxury uppercase font-semibold px-3 mb-2">Results</p>
            {filteredNav.map((item) => {
              const active = isActive(item);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 mb-0.5"
                  style={active
                    ? { background: "rgba(255,45,170,0.12)", color: "white" }
                    : { color: "rgba(255,255,255,0.5)" }
                  }
                >
                  <item.icon size={15} style={active ? { color: "#FF2DAA" } : undefined} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
            {filteredNav.length === 0 && (
              <p className="text-white/20 text-xs px-3 py-4">No pages found.</p>
            )}
          </div>
        )}

        {/* Normal nav */}
        {!searchQuery && navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="text-white/20 text-[10px] letter-luxury uppercase font-semibold px-3 mb-2">{section.label}</p>
            {section.items.map((item) => {
              const active = isActive(item);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group mb-0.5 relative"
                  style={active
                    ? { background: "rgba(255,45,170,0.12)", color: "white" }
                    : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  {/* Active indicator bar */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" style={{ background: "#FF2DAA" }} />
                  )}
                  <item.icon
                    size={15}
                    style={active ? { color: "#FF2DAA" } : undefined}
                    className={active ? "" : "group-hover:text-white/60 transition-colors"}
                  />
                  <span className={`font-medium flex-1 ${active ? "" : "group-hover:text-white/70"}`}>{item.label}</span>
                  {active && <ChevronRight size={12} className="opacity-40" style={{ color: "#FF2DAA" }} />}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="relative z-10 px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Settings */}
        <NavLink
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 mb-1"
          style={location.pathname === "/admin/settings"
            ? { background: "rgba(255,45,170,0.12)", color: "white" }
            : { color: "rgba(255,255,255,0.35)" }
          }
        >
          <Settings size={15} style={location.pathname === "/admin/settings" ? { color: "#FF2DAA" } : undefined} />
          <span className="font-medium">Settings</span>
        </NavLink>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <ExternalLink size={15} />
          View Live Site
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-500/8"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <LogOut size={15} />
          Sign Out
        </button>

        {/* Admin profile */}
        <div className="mt-4 px-3 py-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg, #FF2DAA, #D41E8D)" }}>
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-none truncate">Sarah Adams</p>
            <p className="text-white/25 text-[10px] mt-0.5">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F5F5F7" }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex h-full w-[272px] animate-slide-in-left">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-4 px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-xl" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Home size={13} className="text-muted-foreground" />
            <ChevronRight size={11} className="text-muted-foreground/50" />
            <span className="font-semibold text-foreground">{getPageTitle()}</span>
          </div>

          <div className="flex-1" />

          {/* Time */}
          <span className="hidden md:block text-xs text-muted-foreground">
            {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </span>

          {/* Notification bell */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-muted-foreground">
            <Bell size={16} />
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ background: "#FF2DAA" }}>
                {pendingCount > 9 ? "9+" : pendingCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2.5 pl-3" style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #FF2DAA, #D41E8D)" }}>
              SA
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-none">Sarah Adams</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Administrator</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
