import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../App";
import AppShell from "../components/AppShell";
import { Card, Button, StatusBadge, MonoData, PageHeader, Pill, getSlaTone } from "../components/ui";
import {
  ArrowRight, ClipboardList, ShieldCheck, Clock, CheckCircle2, XCircle,
  PauseCircle, FileSpreadsheet, AlertTriangle, FileText, Building2,
} from "lucide-react";

const ROLE_HEADLINE = {
  vendor: { title: "Your vendor record", sub: "Track onboarding progress and submit for review." },
  reviewer: { title: "Review queue", sub: "Submitted vendors awaiting first-line review." },
  approver: { title: "Approval queue", sub: "Vendors under review awaiting final approval." },
  sap_team: { title: "SAP mapping queue", sub: "Approved vendors awaiting company-code creation." },
  admin: { title: "Admin overview", sub: "All vendors and users across the portal." },
};

function StatTile({ icon: Icon, label, value, tone = "ink" }) {
  const toneClasses = {
    ink: "bg-ink-100 text-ink-700",
    brand: "bg-brand-50 text-brand-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
  };
  return (
    <Card data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="p-4">
        <div className={`w-8 h-8 rounded-md grid place-items-center ${toneClasses[tone]} mb-3`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-[11px] text-ink-500 uppercase tracking-wide">{label}</div>
        <div className="text-[22px] font-semibold text-ink-900 tnum mt-0.5">{value}</div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [myVendor, setMyVendor] = useState(null);
  const [slaAlerts, setSlaAlerts] = useState({ stuck: [], expiring_docs: [] });

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
        } else {
          try {
            const { data } = await api.get("/sla/alerts");
            setSlaAlerts(data);
          } catch (err) { console.error("sla load failed", err); }
        }
      } catch (err) {
        console.error("dashboard load failed", err);
      }
    })();
  }, [user]);

  const headline = ROLE_HEADLINE[user?.role] || { title: "Dashboard", sub: "" };

  const downloadExcel = async () => {
    const API = process.env.REACT_APP_BACKEND_URL + "/api/export/vendors.xlsx";
    window.open(API, "_blank");
  };

  const canExport = user?.role && user.role !== "vendor";

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8">
        <PageHeader
          eyebrow={<><span className="font-mono uppercase tracking-wider">{user?.role?.replace("_"," ")}</span> · <span>{new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</span></>}
          title={headline.title}
          subtitle={headline.sub}
          actions={
            <>
              {user?.role === "vendor" && (
                <Button onClick={() => navigate("/onboarding")} variant="dark" data-testid="cta-onboarding">
                  {myVendor ? "Continue onboarding" : "Start onboarding"} <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {canExport && (
                <Button variant="outline" onClick={downloadExcel} data-testid="export-vendors-btn">
                  <FileSpreadsheet className="w-4 h-4" /> Export Excel
                </Button>
              )}
            </>
          }
        />

        {/* Vendor: my record card */}
        {user?.role === "vendor" && (
          <Card className="mt-6">
            <div className="p-5">
              {myVendor ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-wide mb-1.5">Status</div>
                    <StatusBadge status={myVendor.status} />
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-wide mb-1.5">Vendor Code</div>
                    <MonoData>{myVendor.vendor_code}</MonoData>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-wide mb-1.5">Legal Name</div>
                    <div className="text-[13.5px] font-medium text-ink-900">{myVendor.general?.legal_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-wide mb-1.5">Submitted</div>
                    <div className="text-[13px] text-ink-800">{myVendor.submitted_at ? new Date(myVendor.submitted_at).toLocaleString() : "Draft"}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ClipboardList className="w-10 h-10 text-ink-300 mx-auto mb-3" />
                  <div className="text-ink-800 font-medium">No vendor record yet</div>
                  <p className="text-[13px] text-ink-500 mt-1">Start the multi-step onboarding to register as an Aarambh vendor.</p>
                  <Button onClick={() => navigate("/onboarding")} variant="dark" className="mt-4" data-testid="vendor-start-btn">Start onboarding</Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Stats grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            <StatTile icon={ClipboardList} label="Draft" value={stats.draft} tone="ink" />
            <StatTile icon={FileText} label="Submitted" value={stats.submitted} tone="blue" />
            <StatTile icon={Clock} label="Under Review" value={stats.under_review} tone="amber" />
            <StatTile icon={CheckCircle2} label="Approved" value={stats.approved} tone="emerald" />
            <StatTile icon={XCircle} label="Rejected" value={stats.rejected} tone="rose" />
            <StatTile icon={PauseCircle} label="On Hold" value={stats.on_hold} tone="orange" />
          </div>
        )}

        {/* SLA alerts (internal users only) */}
        {user?.role !== "vendor" && (slaAlerts.stuck.length > 0 || slaAlerts.expiring_docs.length > 0) && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {slaAlerts.stuck.length > 0 && (
              <Card>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-[14px] font-semibold text-ink-900">Stuck in queue</h3>
                    <Pill tone="amber">{slaAlerts.stuck.length}</Pill>
                  </div>
                  <ul className="space-y-2 text-[13px]">
                    {slaAlerts.stuck.slice(0, 5).map((v) => (
                      <li key={v.vendor_id} onClick={() => navigate(`/vendors/${v.vendor_id}`)} className="flex items-center justify-between cursor-pointer hover:bg-ink-50 -mx-2 px-2 py-1 rounded">
                        <div className="truncate">
                          <span className="text-ink-900 font-medium">{v.legal_name || v.vendor_id}</span>
                          <span className="text-ink-500"> · {v.status.replace(/_/g," ")}</span>
                        </div>
                        <Pill tone={getSlaTone(v.days_in_status).tone}>{v.days_in_status}d</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
            {slaAlerts.expiring_docs.length > 0 && (
              <Card>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <h3 className="text-[14px] font-semibold text-ink-900">Expiring documents</h3>
                    <Pill tone="rose">{slaAlerts.expiring_docs.length}</Pill>
                  </div>
                  <ul className="space-y-2 text-[13px]">
                    {slaAlerts.expiring_docs.slice(0, 5).map((d, i) => (
                      <li key={`${d.vendor_id}-${d.document_type}-${i}`} className="flex items-center justify-between">
                        <div className="truncate">
                          <span className="text-ink-900 font-medium capitalize">{d.document_type.replace(/_/g," ")}</span>
                          <span className="text-ink-500"> · {d.legal_name || d.vendor_id}</span>
                        </div>
                        <Pill tone={d.days_left < 0 ? "rose" : d.days_left < 7 ? "amber" : "ink"}>
                          {d.days_left < 0 ? "Expired" : `${d.days_left}d`}
                        </Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Recent vendors table for internal users */}
        {user?.role !== "vendor" && (
          <Card className="mt-6">
            <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-ink-900">Recent vendors</h3>
                <p className="text-[12px] text-ink-500 mt-0.5">Filtered by your role workflow stage</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/vendors")} data-testid="dashboard-view-all">View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-ink-200 text-[11px] font-medium uppercase tracking-wider text-ink-500">
                    <th className="text-left py-2.5 px-5">Vendor</th>
                    <th className="text-left py-2.5 px-3">GSTIN</th>
                    <th className="text-left py-2.5 px-3">Type</th>
                    <th className="text-left py-2.5 px-3">Status</th>
                    <th className="text-left py-2.5 px-3">In stage</th>
                    <th className="text-left py-2.5 px-3">Updated</th>
                    <th className="py-2.5 px-5"></th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-12 text-ink-500 text-[13px]">No vendors in your queue right now.</td></tr>
                  )}
                  {vendors.slice(0, 8).map((v) => {
                    const lastWf = v.workflow?.[v.workflow.length - 1];
                    const lastAt = lastWf?.performed_at || v.updated_at;
                    const days = lastAt ? (Date.now() - new Date(lastAt).getTime()) / 86400000 : null;
                    const sla = getSlaTone(days);
                    return (
                      <tr key={v.vendor_id} className="border-b border-ink-100 hover:bg-ink-50 cursor-pointer"
                          onClick={() => navigate(`/vendors/${v.vendor_id}`)}
                          data-testid={`vendor-row-${v.vendor_id}`}>
                        <td className="py-3 px-5">
                          <div className="font-medium text-ink-900">{v.general?.legal_name || "—"}</div>
                          <div className="text-[11px] text-ink-500 font-mono">{v.vendor_code || v.vendor_id}</div>
                        </td>
                        <td className="py-3 px-3"><MonoData>{v.compliance?.gstin}</MonoData></td>
                        <td className="py-3 px-3 capitalize text-ink-700">{v.vendor_type}</td>
                        <td className="py-3 px-3"><StatusBadge status={v.status} /></td>
                        <td className="py-3 px-3"><Pill tone={sla.tone}>{sla.label}</Pill></td>
                        <td className="py-3 px-3 text-ink-600 text-[12px]">{new Date(v.updated_at).toLocaleString()}</td>
                        <td className="py-3 px-5 text-right">
                          <ArrowRight className="w-4 h-4 text-ink-400 inline-block" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
