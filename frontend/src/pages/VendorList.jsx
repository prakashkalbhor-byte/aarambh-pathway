import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../App";
import AppShell from "../components/AppShell";
import { Card, StatusBadge, MonoData, Select, Input } from "../components/ui";
import { Search, ArrowRight } from "lucide-react";

const STATUSES = ["", "draft", "submitted", "under_review", "approved", "rejected", "on_hold"];

export default function VendorList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/vendors", { params: status ? { status } : {} });
        setVendors(data);
      } catch {}
    })();
  }, [status]);

  const filtered = vendors.filter((v) => {
    if (!q) return true;
    const hay = [v.general?.legal_name, v.compliance?.gstin, v.compliance?.pan, v.vendor_code, v.vendor_id].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Vendors</h1>
          <p className="text-slate-600 mt-1">
            {user?.role === "reviewer" && "Submitted vendors awaiting first-line review."}
            {user?.role === "approver" && "Under-review vendors awaiting final approval."}
            {user?.role === "sap_team" && "Approved vendors ready for SAP company-code creation."}
            {user?.role === "admin" && "All vendor records across the portal."}
          </p>
        </div>

        <Card>
          <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, GSTIN, PAN…" className="pl-9" data-testid="vendor-search-input" />
            </div>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-56" data-testid="vendor-status-filter">
              {STATUSES.map((s) => (
                <option key={s || "all"} value={s}>{s ? s.replace(/_/g, " ") : "All statuses"}</option>
              ))}
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
                  <th className="text-left py-2.5 px-5 font-medium">Vendor</th>
                  <th className="text-left py-2.5 px-3 font-medium">Type</th>
                  <th className="text-left py-2.5 px-3 font-medium">GSTIN</th>
                  <th className="text-left py-2.5 px-3 font-medium">PAN</th>
                  <th className="text-left py-2.5 px-3 font-medium">Status</th>
                  <th className="text-left py-2.5 px-3 font-medium">Submitted</th>
                  <th className="py-2.5 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-12 text-slate-500 text-sm">No vendors match the current filter.</td></tr>
                )}
                {filtered.map((v) => (
                  <tr key={v.vendor_id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                      onClick={() => navigate(`/vendors/${v.vendor_id}`)}
                      data-testid={`vendor-list-row-${v.vendor_id}`}>
                    <td className="py-3 px-5">
                      <div className="font-medium text-slate-900">{v.general?.legal_name || "—"}</div>
                      <div className="text-xs text-slate-500 font-mono">{v.vendor_code || v.vendor_id}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 capitalize">{v.vendor_type}</td>
                    <td className="py-3 px-3"><MonoData>{v.compliance?.gstin}</MonoData></td>
                    <td className="py-3 px-3"><MonoData>{v.compliance?.pan}</MonoData></td>
                    <td className="py-3 px-3"><StatusBadge status={v.status} /></td>
                    <td className="py-3 px-3 text-slate-600 text-xs">{v.submitted_at ? new Date(v.submitted_at).toLocaleDateString() : "—"}</td>
                    <td className="py-3 px-5 text-right">
                      <ArrowRight className="w-4 h-4 text-slate-400 inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
