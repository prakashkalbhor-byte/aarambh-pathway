import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { api } from "../lib/api";
import { cn } from "../lib/utils";
import { LayoutDashboard, FileText, Users, LogOut, ClipboardList, Building2, ShieldCheck, Settings, FolderTree, Bell, Search } from "lucide-react";
import { Pill } from "./ui";

const NAV = {
  vendor: [
    { group: "WORKSPACE", items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Vendor overview" },
      { to: "/onboarding", label: "My Onboarding", icon: ClipboardList, desc: "Multi-step form" },
    ]},
  ],
  reviewer: [
    { group: "WORKSPACE", items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Review overview" },
      { to: "/vendors", label: "Review Queue", icon: FileText, desc: "Pending submissions" },
    ]},
  ],
  approver: [
    { group: "WORKSPACE", items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Approval overview" },
      { to: "/vendors", label: "Approval Queue", icon: ShieldCheck, desc: "Awaiting approval" },
    ]},
  ],
  sap_team: [
    { group: "WORKSPACE", items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "SAP overview" },
      { to: "/vendors", label: "SAP Mapping", icon: Building2, desc: "Company codes" },
    ]},
  ],
  admin: [
    { group: "WORKSPACE", items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Portal overview" },
      { to: "/vendors", label: "All Vendors", icon: FileText, desc: "Master data" },
      { to: "/admin/users", label: "Users & Roles", icon: Users, desc: "Access control" },
    ]},
    { group: "MORE", items: [
      { to: "/admin/categories", label: "Vendor Categories", icon: FolderTree, desc: "Field master" },
      { to: "/admin/settings", label: "Settings", icon: Settings, desc: "Portal config" },
    ]},
  ],
};

function NavLink({ item, active }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors group",
        active ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-100"
      )}
      data-testid={`nav-${item.to.replace(/\//g, "-")}`}
    >
      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-ink-500")} />
      <div className="flex-1 min-w-0">
        <div className="leading-tight font-medium truncate">{item.label}</div>
        {item.desc && (
          <div className={cn("text-[10.5px] truncate", active ? "text-ink-300" : "text-ink-500")}>{item.desc}</div>
        )}
      </div>
      {item.badge && (
        <span className={cn(
          "text-[10px] px-1.5 py-0.5 rounded font-medium",
          active ? "bg-white/15 text-white" : "bg-ink-100 text-ink-700"
        )}>{item.badge}</span>
      )}
    </Link>
  );
}

function Sidebar() {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const groups = NAV[user?.role] || [];

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch (err) { console.error("logout error", err); }
    setUser(null);
    navigate("/login");
  };

  const initials = (user?.full_name || user?.email || "U").trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join("").toUpperCase();

  return (
    <aside className="hidden md:flex w-[244px] shrink-0 flex-col border-r border-ink-200 bg-white">
      <div className="px-4 py-4 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-md bg-ink-900 text-white grid place-items-center font-semibold text-[12px]">Āā</div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-ink-900">Aarambh</div>
          <div className="text-[11px] text-ink-500">Vendor Portal</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {groups.map((g) => (
          <div key={g.group} className="mt-3">
            <div className="px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.08em] text-ink-400">{g.group}</div>
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
                return <li key={item.to}><NavLink item={item} active={active} /></li>;
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-200 p-3 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-brand-700 text-white grid place-items-center text-[12px] font-semibold overflow-hidden">
          {user?.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : initials}
        </div>
        <div className="flex-1 min-w-0 leading-tight">
          <div className="text-[12.5px] font-semibold text-ink-900 truncate">{user?.full_name || user?.email}</div>
          <div className="text-[10.5px] text-ink-500 truncate uppercase tracking-wide">{user?.role?.replace("_", " ")}</div>
        </div>
        <button onClick={handleLogout} className="text-ink-400 hover:text-rose-600" data-testid="logout-button" title="Sign out">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

const ROUTE_META = {
  "/dashboard":      { crumbs: ["Workspace", "Dashboard"] },
  "/onboarding":     { crumbs: ["Vendor", "Onboarding"], badge: "Multi-step" },
  "/vendors":        { crumbs: ["Workspace", "Vendors"] },
  "/admin/users":    { crumbs: ["Internal ops", "User management"], badge: "Admin" },
  "/admin/categories": { crumbs: ["Master data", "Vendor categories"] },
  "/admin/settings": { crumbs: ["Account", "Settings"] },
};

function getRouteMeta(pathname, user) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  if (pathname.startsWith("/vendors/")) return { crumbs: ["Workspace", "Vendor detail"] };
  return { crumbs: ["Aarambh", user?.role?.replace("_", " ") || ""] };
}

function NotificationsBell() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/notifications");
        if (!cancelled) setItems(data || []);
      } catch (err) { console.error("notifications load failed", err); }
    })();
    return () => { cancelled = true; };
  }, [user?.user_id]);

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative text-ink-500 hover:text-ink-800" data-testid="notifications-bell">
        <Bell className="w-4 h-4" />
        {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[360px] bg-white rounded-lg ring-1 ring-ink-200 shadow-elev z-50 overflow-hidden" data-testid="notifications-panel">
          <div className="px-4 py-3 border-b border-ink-200 flex items-center justify-between">
            <div className="text-[13px] font-semibold text-ink-900">Notifications</div>
            <Pill tone="ink">{items.length}</Pill>
          </div>
          <div className="max-h-[380px] overflow-y-auto">
            {items.length === 0 && (
              <div className="px-4 py-10 text-center text-[12.5px] text-ink-500">You&apos;re all caught up.</div>
            )}
            {items.map((n) => (
              <div key={n.id} className="px-4 py-3 border-b border-ink-200/60 last:border-0 hover:bg-ink-50">
                <div className="flex items-start gap-2">
                  <span className={cn("mt-1 w-1.5 h-1.5 rounded-full shrink-0", n.read ? "bg-ink-300" : "bg-rose-500")} />
                  <div className="min-w-0">
                    <div className="text-[12.5px] text-ink-900">{n.title}</div>
                    {n.body && <div className="text-[11.5px] text-ink-500 mt-0.5">{n.body}</div>}
                    <div className="text-[10.5px] text-ink-400 mt-1 font-mono uppercase">{new Date(n.created_at).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TopBar() {
  const { user } = useAuth();
  const location = useLocation();
  const meta = getRouteMeta(location.pathname, user);
  const initials = (user?.full_name || user?.email || "U").trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
  return (
    <header className="h-14 border-b border-ink-200 bg-white px-6 flex items-center gap-4 sticky top-0 z-30">
      <div className="text-[12.5px] text-ink-500 flex items-center gap-1.5 min-w-0">
        {meta.crumbs.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-300">·</span>}
            <span className={cn("truncate", i === meta.crumbs.length - 1 ? "text-ink-800 font-medium" : "")}>{c}</span>
          </span>
        ))}
        {meta.badge && <Pill tone="ink" className="ml-2">{meta.badge}</Pill>}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden lg:block relative w-[280px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            placeholder="Search vendors, GSTIN, PAN..."
            className="h-9 w-full pl-8 pr-12 rounded-md bg-white border border-ink-200 text-[13px] placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-500 bg-ink-100 rounded px-1 py-0.5">⌘K</kbd>
        </div>
        <NotificationsBell />
        <div className="flex items-center gap-2 pl-3 border-l border-ink-200">
          <div className="w-7 h-7 rounded-full bg-brand-700 text-white grid place-items-center text-[11px] font-semibold overflow-hidden">
            {user?.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : initials}
          </div>
          <span className="hidden sm:block text-[12.5px] text-ink-800 truncate max-w-[140px]">{user?.full_name || user?.email}</span>
        </div>
      </div>
    </header>
  );
}

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-ink-50 flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
