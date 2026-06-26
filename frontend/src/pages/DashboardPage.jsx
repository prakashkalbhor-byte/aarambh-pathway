import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../App";
import AppShell from "../components/AppShell";
import { Card, Button, StatusBadge, MonoData } from "../components/ui";
import { ArrowRight, ClipboardList, ShieldCheck, Clock, CheckCircle2, XCircle, PauseCircle } from "lucide-react";

const ROLE_HEADLINE = {
  vendor: { title: "Your vendor record", sub: "Track onboarding progress and submit for review." },
  reviewer: { title: "Review queue", sub: "Submitted vendors awaiting first-line review." },
  approver: { title: "Approval queue", sub: "Vendors under review awaiting final approval." },
  sap_team: { title: "SAP mapping queue", sub: "Approved vendors awaiting company-code creation." },
  admin: { title: "Admin overview", sub: "All vendors and users across the portal." },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [myVendor, setMyVendor] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, listRes] = await Promise.all([
          api.get("/stats"),
          api.get("/vendors"),
        ]);
        setStats(statsRes.data);
        setVendors(listRes.data);
        if (user?.role === "vendor") {
          const mine = await api.get("/vendors/mine");
          setMyVendor(mine.data);
        }
      } catch {}
    })();
  }, [user]);

  const headline = ROLE_HEADLINE[user?.role] || { title: "Dashboard", sub: "" };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 font-heading">{headline.title}</h1>
            <p className="text-slate-600 mt-1">{headline.sub}</p>
          </div>
          {user?.role === "vendor" && (
            <Button onClick={() => navigate("/onboarding")} size="lg" data-testid="cta-onboarding">
              {myVendor ? "Continue onboarding" : "Start onboarding"} <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Vendor: my record card */}
        {user?.role === "vendor" && (
          <Card className="mb-6">
            <div className="px-5 py-5">
              {myVendor ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Stat label="Status" value={<StatusBadge status={myVendor.status} />} />
                  <Stat label="Vendor Code" value={<MonoData>{myVendor.vendor_code || "—"}</MonoData>} />
                  <Stat label="Legal Name" value={<span className="text-sm font-medium text-slate-900">{myVendor.general?.legal_name || "—"}</span>} />
                  <Stat label="Submitted" value={<span className="text-sm text-slate-700">{myVendor.submitted_at ? new Date(myVendor.submitted_at).toLocaleString() : "Draft"}</span>} />
                </div>
              ) : (
                <div className="text-center py-6">
                  <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <div className="text-slate-800 font-medium">No vendor record yet</div>
                  <p className="text-sm text-slate-500 mt-1">Start the multi-step onboarding to register as a Keva vendor.</p>
                  <Button onClick={() => navigate("/onboarding")} className="mt-4" data-testid="vendor-start-btn">Start onboarding</Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Stats grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-8">
            <StatTile color="slate" icon={ClipboardList} label="Draft" value={stats.draft} />
            <StatTile color="blue" icon={ShieldCheck} label="Submitted" value={stats.submitted} />
            <StatTile color="amber" icon={Clock} label="Under Review" value={stats.under_review} />
            <StatTile color="emerald" icon={CheckCircle2} label="Approved" value={stats.approved} />
            <StatTile color="rose" icon={XCircle} label="Rejected" value={stats.rejected} />
            <StatTile color="orange" icon={PauseCircle} label="On Hold" value={stats.on_hold} />
          </div>
        )}

        {/* Recent vendors table for internal users */}
        {user?.role !== "vendor" && (
          <Card>
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Recent vendors</h3>
                <p className="text-xs text-slate-500 mt-0.5">Filtered by your role workflow stage</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/vendors")} data-testid="dashboard-view-all">View all</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    <th className="text-left py-2.5 px-5 font-medium">Vendor</th>
                    <th className="text-left py-2.5 px-3 font-medium">GSTIN</th>
                    <th className="text-left py-2.5 px-3 font-medium">Type</th>
                    <th className="text-left py-2.5 px-3 font-medium">Status</th>
                    <th className="text-left py-2.5 px-3 font-medium">Updated</th>
                    <th className="py-2.5 px-5"></th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length === 0 && (
                    <tr><td colSpan="6" className="text-center py-12 text-slate-500 text-sm">No vendors in your queue right now.</td></tr>
                  )}
                  {vendors.slice(0, 8).map((v) => (
                    <tr key={v.vendor_id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                        onClick={() => navigate(`/vendors/${v.vendor_id}`)}
                        data-testid={`vendor-row-${v.vendor_id}`}>
                      <td className="py-3 px-5">
                        <div className="font-medium text-slate-900">{v.general?.legal_name || "—"}</div>
                        <div className="text-xs text-slate-500 font-mono">{v.vendor_code || v.vendor_id}</div>
                      </td>
                      <td className="py-3 px-3"><MonoData>{v.compliance?.gstin}</MonoData></td>
                      <td className="py-3 px-3 capitalize text-slate-700">{v.vendor_type}</td>
                      <td className="py-3 px-3"><StatusBadge status={v.status} /></td>
                      <td className="py-3 px-3 text-slate-600 text-xs">{new Date(v.updated_at).toLocaleString()}</td>
                      <td className="py-3 px-5 text-right">
                        <ArrowRight className="w-4 h-4 text-slate-400 inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function StatTile({ color, icon: Icon, label, value }) {
  const colors = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`} data-testid={`stat-${label.toLowerCase().replace(/\s/g,"-")}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] font-mono uppercase tracking-widest opacity-70">{label}</div>
        <Icon className="w-4 h-4 opacity-60" />
      </div>
      <div className="text-2xl font-bold font-heading">{value}</div>
    </div>
  );
}
