import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Wallet,
  Settings,
  Truck,
  FolderTree,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { title: string; url: string; icon: typeof FileText; badge?: string; desc?: string };
const nav: { group: string; items: NavItem[] }[] = [
  { group: "WORKSPACE", items: [
    { title: "Registration", url: "/registration", icon: FileText, badge: "Step 1/4", desc: "Public form" },
    { title: "Vendor Dashboard", url: "/", icon: LayoutDashboard, desc: "Logged-in vendor" },
    { title: "Admin Panel", url: "/admin", icon: Settings, badge: "6", desc: "Procurement" },
    { title: "Vendor Categories", url: "/categories", icon: FolderTree, badge: "★", desc: "Field master" },
    { title: "Compliance Validation", url: "/compliance", icon: ShieldCheck, badge: "NEW", desc: "Bulk re-validate" },
    { title: "PO & GRN", url: "/po-grn", icon: Truck, desc: "Operations" },
    { title: "Finance Admin", url: "/finance", icon: Wallet, badge: "AI", desc: "AP · 3-way match" },
  ]},
  { group: "MORE", items: [
    { title: "Reports & analytics", url: "/reports", icon: LayoutDashboard },
    { title: "Help center", url: "/help", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ]},
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-[244px] shrink-0 bg-sidebar border-r border-ink-200 flex flex-col">
      <div className="px-4 py-4 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-md bg-ink-900 text-white grid place-items-center font-semibold">Āā</div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-ink-900">Aarambh</div>
          <div className="text-[11px] text-ink-500">Procurement Cloud</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {nav.map((g) => (
          <div key={g.group} className="mt-3">
            <div className="px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.08em] text-ink-400">{g.group}</div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = pathname === it.url;
                const Icon = it.icon;
                return (
                  <li key={it.url}>
                    <Link
                      to={it.url}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors group",
                        active
                          ? "bg-ink-900 text-white"
                          : "text-ink-700 hover:bg-ink-100",
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-ink-500")} />
                      <div className="flex-1 min-w-0">
                        <div className="leading-tight font-medium truncate">{it.title}</div>
                        {it.desc && (
                          <div className={cn("text-[10.5px] truncate", active ? "text-ink-300" : "text-ink-500")}>{it.desc}</div>
                        )}
                      </div>
                      {it.badge && (
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          active ? "bg-white/15 text-white" : "bg-ink-100 text-ink-700",
                        )}>{it.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-200 p-3 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-orange-400 text-white grid place-items-center text-[12px] font-semibold">SP</div>
        <div className="flex-1 min-w-0 leading-tight">
          <div className="text-[12.5px] font-semibold text-ink-900 truncate">Suresh Pawar</div>
          <div className="text-[10.5px] text-ink-500 truncate">Tirupati Industrial</div>
        </div>
        <button className="text-ink-400 hover:text-ink-700"><LogOut className="w-4 h-4" /></button>
      </div>
    </aside>
  );
}

export function TopBar({ crumbs, badge }: { crumbs: string[]; badge?: string }) {
  return (
    <header className="h-14 border-b border-ink-200 bg-background px-6 flex items-center gap-4">
      <div className="text-[12.5px] text-ink-500 flex items-center gap-1.5">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-300">·</span>}
            <span className={i === crumbs.length - 1 ? "text-ink-800 font-medium" : ""}>{c}</span>
          </span>
        ))}
        {badge && (
          <span className="ml-2 text-[11px] rounded border border-ink-200 bg-white px-1.5 py-0.5 text-ink-700">{badge}</span>
        )}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative w-[340px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            placeholder="Search vendors, POs, invoices..."
            className="h-9 w-full pl-8 pr-12 rounded-md bg-white border border-ink-200 text-[13px] placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-500 bg-ink-100 rounded px-1 py-0.5">⌘K</kbd>
        </div>
        <button className="relative text-ink-500 hover:text-ink-800">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-ink-200">
          <div className="w-7 h-7 rounded-full bg-orange-400 text-white grid place-items-center text-[11px] font-semibold">SP</div>
          <span className="text-[12.5px] text-ink-800">Suresh Pawar</span>
        </div>
      </div>
    </header>
  );
}
