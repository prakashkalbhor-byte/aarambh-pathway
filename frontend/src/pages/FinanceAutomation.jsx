import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import { api, formatApiError } from "../lib/api";
import { useToast } from "../components/Toast";
import { Card, CardHeader, Pill, Button, PageHeader } from "../components/ui";
import { Sparkles, CheckCircle2, AlertTriangle, FileCheck2, Landmark, ScanLine, Bot, Upload, RefreshCw } from "lucide-react";

const VERDICT_TONE = {
  auto_approved: "emerald",
  held: "amber",
  blocked: "rose",
  pending: "ink",
};
const VERDICT_LABEL = {
  auto_approved: "Auto-approved",
  held: "Held for review",
  blocked: "Blocked",
  pending: "Pending",
};

function inr(n) {
  if (n == null) return "—";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function StatTile({ icon: Icon, tone, value, label, sub }) {
  return (
    <Card className="p-5">
      <div className={`w-9 h-9 grid place-items-center rounded-md ${tone}`}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{label}</div>
      <div className="text-[24px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{value}</div>
      <div className="text-[11.5px] text-ink-500 mt-1">{sub}</div>
    </Card>
  );
}

function ConfidenceBar({ pct }) {
  const tone = pct >= 90 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-ink-100 overflow-hidden">
        <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-[12px] text-ink-700 tnum">{pct}%</span>
    </div>
  );
}

export default function FinanceAutomation() {
  const toast = useToast();
  const [tab, setTab] = useState("queue"); // queue | apis
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ auto_approved: 0, held: 0, blocked: 0, pending: 0, scheduled_amount: 0, ocr_accuracy_pct: 0, total_invoices: 0 });
  const [running, setRunning] = useState(false);

  const load = async () => {
    try {
      const [invRes, statsRes] = await Promise.all([
        api.get("/invoices"),
        api.get("/invoices/stats"),
      ]);
      setInvoices(invRes.data);
      setStats(statsRes.data);
    } catch (err) { console.error("invoices load", err); }
  };
  useEffect(() => { load(); }, []);

  const runBot = async () => {
    setRunning(true);
    try {
      const { data } = await api.post("/invoices/run-bot");
      toast.success(`Bot processed ${data.processed} invoice(s)`);
      load();
    } catch (err) { toast.error(formatApiError(err)); }
    finally { setRunning(false); }
  };

  const rerunOne = async (id) => {
    try {
      await api.post(`/invoices/${id}/rerun-match`);
      toast.success("Match re-run");
      load();
    } catch (err) { toast.error(formatApiError(err)); }
  };

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow={<><span>Finance</span><span className="text-ink-300">·</span><span>Accounts payable</span><span className="text-ink-300">·</span><span>FY 26-27</span></>}
          title={
            <span>
              Invoice Automation{" "}
              <Pill tone="violet" className="ml-2 align-middle">
                <Sparkles className="w-3 h-3" /> ClearMatch AI · 3-way matching
              </Pill>
            </span>
          }
          subtitle="Every incoming e-invoice is reconciled against its PO and GRN, then compliance-checked through 6 ClearTax APIs before it reaches finance."
          actions={
            <>
              <Button variant="outline" disabled data-testid="upload-invoice-btn">
                <Upload className="w-3.5 h-3.5" /> Upload invoice
              </Button>
              <Button variant="dark" onClick={runBot} disabled={running} data-testid="run-bot-btn">
                <Bot className={`w-3.5 h-3.5 ${running ? "animate-spin" : ""}`} /> {running ? "Running…" : "Run bot on queue"}
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatTile icon={FileCheck2} tone="bg-emerald-50 text-emerald-700" value={stats.total_invoices} label="Invoices today" sub={`+${stats.auto_approved} auto-matched`} />
          <StatTile icon={Sparkles} tone="bg-violet-50 text-violet-700" value={stats.auto_approved} label="Auto-matched by AI" sub={stats.total_invoices ? `${Math.round(stats.auto_approved/stats.total_invoices*100)}% straight-through` : "—"} />
          <StatTile icon={AlertTriangle} tone="bg-amber-50 text-amber-700" value={stats.held} label="Held for review" sub={inr(stats.scheduled_amount) + " ready to pay"} />
          <StatTile icon={Landmark} tone="bg-rose-50 text-rose-700" value={stats.blocked} label="Blocked / rejected" sub="GRN missing · filing overdue" />
        </div>

        <Card className="overflow-hidden">
          <div className="px-5 pt-4 flex items-center gap-4 border-b border-ink-200">
            {[
              { key: "queue", label: "Invoice queue", count: stats.total_invoices },
              { key: "apis", label: "ClearTax APIs", count: 6 },
            ].map((t) => (
              <button key={t.key}
                onClick={() => setTab(t.key)}
                className={`pb-3 -mb-px text-[13px] font-medium inline-flex items-center gap-1.5 border-b-2 ${tab === t.key ? "border-ink-900 text-ink-900" : "border-transparent text-ink-500 hover:text-ink-700"}`}
                data-testid={`tab-${t.key}`}
              >
                {t.label} <Pill tone={tab === t.key ? "ink" : "ink"}>{t.count}</Pill>
              </button>
            ))}
          </div>

          {tab === "queue" && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left border-b border-ink-200 bg-ink-50/50 text-[11px] font-medium uppercase tracking-wider text-ink-500">
                    <th className="px-4 py-2.5">Invoice</th>
                    <th className="px-4 py-2.5">Vendor</th>
                    <th className="px-4 py-2.5">PO / GRN</th>
                    <th className="px-4 py-2.5 text-right">Amount</th>
                    <th className="px-4 py-2.5">AI confidence</th>
                    <th className="px-4 py-2.5">Bot verdict</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-10 text-ink-500 text-[13px]">No invoices yet. Click &quot;Run bot on queue&quot; or upload one.</td></tr>
                  )}
                  {invoices.map((inv) => (
                    <tr key={inv.invoice_id} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40" data-testid={`invoice-row-${inv.invoice_id}`}>
                      <td className="px-4 py-3">
                        <div className="font-mono text-[12.5px] text-ink-900">{inv.invoice_number}</div>
                        <div className="text-[11px] text-ink-500">{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-ink-900 font-medium">{inv.vendor_name || "—"}</div>
                        {inv.irn && <div className="font-mono text-[10.5px] text-ink-500 truncate max-w-[200px]">IRN {inv.irn.substring(0, 16)}…</div>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-[12.5px] text-ink-700">{inv.po_number || "—"}</div>
                        <div className="font-mono text-[11px] text-ink-500">{inv.grn_number || "—"}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="font-mono tnum text-[12.5px] text-ink-900">{inr(inv.total_amount)}</div>
                        {inv.tds_amount > 0 && <div className="font-mono tnum text-[10.5px] text-ink-500">TDS {inr(inv.tds_amount)}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <ConfidenceBar pct={inv.match_result?.confidence || 0} />
                      </td>
                      <td className="px-4 py-3">
                        <Pill tone={VERDICT_TONE[inv.status] || "ink"}>
                          {inv.status === "auto_approved" && <CheckCircle2 className="w-3 h-3" />}
                          {inv.match_result?.match_label || VERDICT_LABEL[inv.status]}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => rerunOne(inv.invoice_id)} data-testid={`rerun-${inv.invoice_id}`}>
                          <RefreshCw className="w-3 h-3" /> Rerun
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "apis" && (
            <div className="p-5 grid md:grid-cols-2 gap-3">
              {[
                { name: "GSTIN active (GSTN)", desc: "Validate vendor GSTIN and filing status", status: "Live (stub)" },
                { name: "PAN ↔ Name match", desc: "Verify PAN against legal entity name", status: "Live (stub)" },
                { name: "e-Invoice IRN verify", desc: "Confirm e-invoice IRN with NIC IRP", status: "Live (stub)" },
                { name: "GSTR-2A reconciliation", desc: "Match supplier-side returns with our books", status: "Live (stub)" },
                { name: "TDS section calc", desc: "Auto-apply TDS section + rate per vendor", status: "Live (stub)" },
                { name: "EWB / E-way bill check", desc: "Goods movement validation", status: "Live (stub)" },
              ].map((a) => (
                <div key={a.name} className="border border-ink-200 rounded-md p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[13px] font-medium text-ink-900">{a.name}</div>
                    <Pill tone="emerald"><ScanLine className="w-3 h-3" /> {a.status}</Pill>
                  </div>
                  <div className="text-[12px] text-ink-500 mt-1">{a.desc}</div>
                </div>
              ))}
              <div className="md:col-span-2 text-[11.5px] text-ink-500 mt-2 px-1">
                Note: ClearTax APIs are STUBBED responses — wire a real ClearTax enterprise key to flip live. OCR uses GPT-4o vision via the Emergent LLM key.
              </div>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
