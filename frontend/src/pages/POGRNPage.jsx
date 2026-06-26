import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import { api } from "../lib/api";
import { useToast } from "../components/Toast";
import { Card, CardHeader, Pill, Button, PageHeader } from "../components/ui";
import { Truck, Package, CheckCircle2, AlertTriangle, ArrowUpRight, CheckCheck } from "lucide-react";

const POSTATUS_TONE = { Open: "brand", Partial: "amber", Delivered: "emerald", "In Transit": "brand" };

function inr(n) {
  if (n == null) return "—";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function StatTile({ icon: Icon, tone, value, label }) {
  return (
    <Card className="p-5">
      <div className={`w-9 h-9 grid place-items-center rounded-md ${tone}`}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{label}</div>
      <div className="text-[26px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{value}</div>
    </Card>
  );
}

export default function POGRNPage() {
  const toast = useToast();
  const [pos, setPos] = useState([]);
  const [grns, setGrns] = useState([]);
  const [stats, setStats] = useState({ open_pos: 0, pending_grns: 0, on_time_pct: 0, rejection_pct: 0 });

  const load = async () => {
    try {
      const [posRes, grnsRes, statsRes] = await Promise.all([
        api.get("/purchase-orders"),
        api.get("/grns"),
        api.get("/operations/stats"),
      ]);
      setPos(posRes.data);
      setGrns(grnsRes.data);
      setStats(statsRes.data);
    } catch (err) { console.error("po-grn load", err); }
  };
  useEffect(() => { load(); }, []);

  const acknowledge = async (grnId) => {
    try {
      await api.post(`/grns/${grnId}/acknowledge`);
      toast.success("GRN acknowledged");
      load();
    } catch (err) { toast.error(err?.response?.data?.detail || "Failed to acknowledge"); }
  };

  const pendingAck = grns.filter((g) => !g.vendor_acknowledged).length;

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto space-y-6">
        <PageHeader
          title="Purchase orders & goods receipts"
          subtitle={`${stats.open_pos} open POs · ${stats.pending_grns} pending GRNs · ${pendingAck} require vendor acknowledgement`}
          badges={
            <>
              <Pill tone="brand">Operations</Pill>
              {pendingAck > 0 && <Pill tone="amber">{pendingAck} awaiting ack</Pill>}
            </>
          }
          actions={
            <>
              <Button variant="ghost">Download manifest</Button>
              <Button variant="dark" disabled={pendingAck === 0} onClick={() => grns.filter(g => !g.vendor_acknowledged).forEach(g => acknowledge(g.grn_id))} data-testid="bulk-ack-btn">
                <CheckCheck className="w-3.5 h-3.5" /> Acknowledge all
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatTile icon={Package} tone="bg-brand-50 text-brand-700" value={stats.open_pos} label="Open POs" />
          <StatTile icon={Truck} tone="bg-amber-50 text-amber-700" value={stats.pending_grns} label="Pending GRNs" />
          <StatTile icon={CheckCircle2} tone="bg-emerald-50 text-emerald-700" value={`${stats.on_time_pct}%`} label="On-time receipt" />
          <StatTile icon={AlertTriangle} tone="bg-rose-50 text-rose-700" value={`${stats.rejection_pct}%`} label="Rejection rate" />
        </div>

        {/* PO Table */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Purchase orders"
            subtitle="Last 30 days"
            action={<a href="#" className="text-[12.5px] font-medium text-brand-700 inline-flex items-center gap-1 hover:underline" data-testid="po-export-link">Export <ArrowUpRight className="w-3 h-3" /></a>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left border-b border-ink-200 bg-ink-50/50 text-[11px] font-medium uppercase tracking-wider text-ink-500">
                  <th className="px-4 py-2.5">PO Number</th>
                  <th className="px-4 py-2.5">Lines</th>
                  <th className="px-4 py-2.5">Vendor</th>
                  <th className="px-4 py-2.5">Buyer</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5 text-right">Amount</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {pos.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-10 text-ink-500 text-[13px]">No purchase orders yet.</td></tr>
                )}
                {pos.map((p) => (
                  <tr key={p.po_id} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40" data-testid={`po-row-${p.po_id}`}>
                    <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{p.po_number}</td>
                    <td className="px-4 py-3 text-ink-700">{p.line_count} SKUs</td>
                    <td className="px-4 py-3 text-ink-700">{p.vendor_name || "—"}</td>
                    <td className="px-4 py-3 text-ink-600">{p.buyer}</td>
                    <td className="px-4 py-3 text-ink-600">{new Date(p.po_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{inr(p.total_amount)}</td>
                    <td className="px-4 py-3"><Pill tone={POSTATUS_TONE[p.status] || "ink"}>{p.status}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* GRN Table */}
        <Card className="overflow-hidden">
          <CardHeader title="Goods receipt notes" subtitle={pendingAck > 0 ? `Vendor acknowledgement pending on ${pendingAck} GRNs` : "All GRNs acknowledged"} />
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left border-b border-ink-200 bg-ink-50/50 text-[11px] font-medium uppercase tracking-wider text-ink-500">
                  <th className="px-4 py-2.5">GRN</th>
                  <th className="px-4 py-2.5">Linked PO</th>
                  <th className="px-4 py-2.5">Vendor</th>
                  <th className="px-4 py-2.5">Received</th>
                  <th className="px-4 py-2.5">Qty</th>
                  <th className="px-4 py-2.5">Inspection</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {grns.length === 0 && (
                  <tr><td colSpan="8" className="text-center py-10 text-ink-500 text-[13px]">No GRNs yet.</td></tr>
                )}
                {grns.map((g) => (
                  <tr key={g.grn_id} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40" data-testid={`grn-row-${g.grn_id}`}>
                    <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{g.grn_number}</td>
                    <td className="px-4 py-3 font-mono text-[12.5px] text-ink-600">{g.po_number}</td>
                    <td className="px-4 py-3 text-ink-700">{g.vendor_name || "—"}</td>
                    <td className="px-4 py-3 text-ink-600">{new Date(g.received_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                    <td className="px-4 py-3 font-mono tnum text-ink-900">{g.qty_received} / {g.qty_ordered}</td>
                    <td className="px-4 py-3 text-ink-600 max-w-xs truncate">{g.inspection_note}</td>
                    <td className="px-4 py-3"><Pill tone={g.tone || "ink"}>{g.status}</Pill></td>
                    <td className="px-4 py-3 text-right">
                      {!g.vendor_acknowledged ? (
                        <Button variant="ghost" size="sm" onClick={() => acknowledge(g.grn_id)} data-testid={`ack-${g.grn_id}`}>Acknowledge</Button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Acked</span>
                      )}
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
