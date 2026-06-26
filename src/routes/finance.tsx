import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader } from "@/components/ui-kit";
import { Sparkles, CheckCircle2, AlertTriangle, FileCheck2, Landmark, ScanLine } from "lucide-react";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Finance Admin — Aarambh" }, { name: "description", content: "AP workbench with 3-way match and payment scheduling." }] }),
  component: Finance,
});

const queue = [
  { inv: "INV/26-27/0102", vendor: "Tirupati Industrial", po: "PO-26-04881", grn: "GRN-26-1188", amt: "₹2,85,400", tds: "₹5,824", match: "3-way ✓", tone: "emerald" as const, due: "Net 45 · 22 Jun" },
  { inv: "INV/26-27/0101", vendor: "Bharat Forge Components", po: "PO-26-04866", grn: "GRN-26-1187", amt: "₹6,98,200", tds: "₹14,250", match: "Qty mismatch", tone: "amber" as const, due: "On hold" },
  { inv: "INV/26-27/0099", vendor: "Konkan Logistics", po: "PO-26-04858", grn: "GRN-26-1185", amt: "₹1,12,800", tds: "₹2,302", match: "3-way ✓", tone: "emerald" as const, due: "Net 30 · 04 Jun" },
  { inv: "INV/26-27/0098", vendor: "Sharad Electricals", po: "PO-26-04854", grn: "—", amt: "₹47,500", tds: "₹969", match: "GRN missing", tone: "rose" as const, due: "Blocked" },
  { inv: "INV/26-27/0097", vendor: "Akshara Polymers", po: "PO-26-04852", grn: "GRN-26-1184", amt: "₹3,46,100", tds: "₹7,063", match: "3-way ✓", tone: "emerald" as const, due: "Net 45 · 19 Jun" },
];

function Finance() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        title="Accounts Payable workbench"
        subtitle="38 invoices in flight · ₹2.14 Cr scheduled this week"
        badges={<><Pill tone="violet"><Sparkles className="w-3 h-3" />AI match assist</Pill><Pill tone="emerald">3-way match enabled</Pill></>}
        actions={<><Btn variant="ghost">Bank file (NEFT)</Btn><Btn variant="dark">Release payment run</Btn></>}
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700", v: "23", l: "Auto-matched", s: "Ready for payment" },
          { icon: AlertTriangle, tone: "bg-amber-50 text-amber-700", v: "9", l: "Exceptions", s: "Need reviewer" },
          { icon: Landmark, tone: "bg-brand-50 text-brand-700", v: "₹2.14 Cr", l: "Payment run · 28 May", s: "12 vendors · NEFT batch" },
          { icon: ScanLine, tone: "bg-violet-50 text-violet-700", v: "98.4%", l: "OCR accuracy", s: "Last 30 days" },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className={`w-9 h-9 grid place-items-center rounded-md ${s.tone}`}><s.icon className="w-[18px] h-[18px]" /></div>
            <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{s.l}</div>
            <div className="text-[24px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{s.v}</div>
            <div className="text-[11.5px] text-ink-500 mt-1">{s.s}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader title="Invoice exceptions & matching" subtitle="3-way match: PO ↔ GRN ↔ Invoice" action={<Btn variant="ghost" size="sm">Configure rules</Btn>} />
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left border-b border-ink-200 bg-ink-50/50">
              {["Invoice", "Vendor", "PO", "GRN", "Amount", "TDS", "Match", "Schedule", ""].map((h, i) => (
                <th key={h} className={`px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500 ${i === 4 || i === 5 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queue.map((r) => (
              <tr key={r.inv} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40">
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{r.inv}</td>
                <td className="px-4 py-3 text-ink-900 font-medium">{r.vendor}</td>
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-600">{r.po}</td>
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-600">{r.grn}</td>
                <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{r.amt}</td>
                <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-600">{r.tds}</td>
                <td className="px-4 py-3"><Pill tone={r.tone}>{r.match}</Pill></td>
                <td className="px-4 py-3 text-ink-600">{r.due}</td>
                <td className="px-4 py-3 text-right"><Btn variant="ghost" size="sm">Open</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardHeader title="MSME ageing" subtitle="45-day statutory clock per vendor" />
          <div className="px-5 pb-5 space-y-3">
            {[
              { v: "Tirupati Industrial", days: 12, amt: "₹2,85,400", tone: "emerald" as const },
              { v: "Akshara Polymers", days: 28, amt: "₹3,46,100", tone: "amber" as const },
              { v: "Vinayak Hardware", days: 41, amt: "₹1,02,700", tone: "rose" as const },
            ].map((r) => (
              <div key={r.v}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <div className="font-medium text-ink-900">{r.v}</div>
                  <div className="font-mono tnum text-ink-700">{r.amt}</div>
                </div>
                <div className="mt-1.5 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div className={`h-full ${r.tone === "emerald" ? "bg-emerald-500" : r.tone === "amber" ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${(r.days / 45) * 100}%` }} />
                </div>
                <div className="text-[11px] text-ink-500 mt-1">Day {r.days} of 45</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="AI match assist" subtitle="Suggested reconciliations" action={<Pill tone="violet"><Sparkles className="w-3 h-3" />Beta</Pill>} />
          <ul className="px-5 pb-5 space-y-3 text-[12.5px]">
            {[
              { t: "Match INV/26-27/0101 against partial GRN-26-1187 (82/90)", c: "94% confidence" },
              { t: "Apply ₹2,400 freight credit-note to PO-26-04858", c: "88% confidence" },
              { t: "Defer payment of Sharad Electricals until GRN posted", c: "Policy rule" },
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-2 p-3 rounded-md border border-ink-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="text-ink-900">{x.t}</div>
                  <div className="text-[11px] text-ink-500 mt-0.5">{x.c}</div>
                </div>
                <Btn variant="ghost" size="sm">Apply</Btn>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
