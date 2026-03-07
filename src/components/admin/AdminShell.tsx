import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Mail, Calendar,
  Users, GraduationCap, LogOut, Menu, X, ChevronRight,
  ExternalLink, Star, FileText, MessageSquare, Settings,
} from "lucide-react";
import { store, initStore } from "@/lib/adminStore";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Subscribers", path: "/admin/subscribers", icon: Mail },
  { label: "Bookings", path: "/admin/bookings", icon: Calendar },
  { label: "Community", path: "/admin/community", icon: Users },
  { label: "Programs", path: "/admin/programs", icon: GraduationCap },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Community Content", path: "/admin/community-content", icon: MessageSquare },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initStore();
    if (!store.isAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    store.logout();
    navigate("/admin/login");
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full w-64 shrink-0"
      style={{ background: "#0B0B0F", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Evolve 2 Purpose" className="h-8 w-auto object-contain" />
          <span
            className="text-[9px] font-bold letter-luxury uppercase px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,45,170,0.15)", color: "#FF2DAA", border: "1px solid rgba(255,45,170,0.2)" }}
          >
            Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/4"
              }`}
              style={active ? { background: "rgba(255,45,170,0.12)", color: "white" } : undefined}
            >
              <item.icon
                size={16}
                style={active ? { color: "#FF2DAA" } : undefined}
                className={active ? "" : "group-hover:text-white/60 transition-colors"}
              />
              <span>{item.label}</span>
              {active && <ChevronRight size={12} className="ml-auto opacity-60" style={{ color: "#FF2DAA" }} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/35 hover:text-white/60 hover:bg-white/4 transition-all"
        >
          <ExternalLink size={15} />
          View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/35 hover:text-red-400/80 hover:bg-red-500/6 transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="shrink-0 flex items-center gap-4 px-6 py-4 border-b bg-white"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          >
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#FF2DAA" }}
            >
              SA
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-none">Sarah Adams</p>
              <p className="text-xs text-muted-foreground mt-0.5">Administrator</p>
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
