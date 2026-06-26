import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { api } from "../lib/api";
import { cn } from "../lib/utils";
import { LayoutDashboard, FileText, Users, LogOut, ClipboardList, Building2 } from "lucide-react";

const NAV = {
  vendor: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/onboarding", label: "My Onboarding", icon: ClipboardList },
  ],
  reviewer: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendors", label: "Review Queue", icon: FileText },
  ],
  approver: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendors", label: "Approval Queue", icon: FileText },
  ],
  sap_team: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendors", label: "SAP Mapping", icon: Building2 },
  ],
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendors", label: "All Vendors", icon: FileText },
    { to: "/admin/users", label: "Users", icon: Users },
  ],
};

export default function AppShell({ children }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const items = NAV[user?.role] || [];

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="px-5 py-5 border-b border-slate-200">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-brand grid place-items-center text-white font-bold text-sm">K</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900 font-heading">Keva Vendor</div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Portal</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active ? "bg-brand-muted text-brand" : "text-slate-700 hover:bg-slate-100"
                )}
                data-testid={`nav-${item.to.replace(/\//g, "-")}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-slate-200 grid place-items-center text-slate-700 text-sm font-semibold overflow-hidden">
              {user?.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : (user?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">{user?.full_name || user?.email}</div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-700"
            data-testid="logout-button"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-slate-200">
          <div className="px-6 py-3.5 flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{user?.role?.replace("_"," ")} workspace</div>
            <div className="text-xs text-slate-500">{new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })}</div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
