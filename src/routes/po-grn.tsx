import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader } from "@/components/ui-kit";
import { Truck, Package, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/po-grn")({
  head: () => ({ meta: [{ title: "PO & GRN — Aarambh" }, { name: "description", content: "Purchase orders, goods receipt notes and acknowledgements." }] }),
  component: POGRN,
});

const pos = [
  { no: "PO-26-04881", line: "12 SKUs · Bearings, gaskets", buyer: "Plant 2 · Pune", date: "08 May 2026", amt: "₹2,85,400", status: "Open", tone: "brand" as const },
  { no: "PO-26-04863", line: "8 SKUs · Forged flanges", buyer: "Plant 1 · Pune", date: "06 May 2026", amt: "₹11,24,000", status: "Partial", tone: "amber" as const },
  { no: "PO-26-04812", line: "4 SKUs · Spare kits", buyer: "Plant 2 · Pune", date: "02 May 2026", amt: "₹67,800", status: "Delivered", tone: "emerald" as const },
  { no: "PO-26-04790", line: "1 SKU · Prototype housing", buyer: "R&D · Bengaluru", date: "29 Apr 2026", amt: "₹4,12,300", status: "In Transit", tone: "brand" as const },
];

const grns = [
  { id: "GRN-26-1188", po: "PO-26-04863", recv: "06 May", qty: "82 / 90", issue: "8 units rejected — surface finish", tone: "rose" as const, status: "Action needed" },
  { id: "GRN-26-1184", po: "PO-26-04812", recv: "03 May", qty: "100 / 100", issue: "Accepted in full", tone: "emerald" as const, status: "Closed" },
  { id: "GRN-26-1180", po: "PO-26-04754", recv: "26 Apr", qty: "60 / 60", issue: "Accepted in full", tone: "emerald" as const, status: "Closed" },
  { id: "GRN-26-1176", po: "PO-26-04733", recv: "22 Apr", qty: "48 / 50", issue: "2 units pending replacement", tone: "amber" as const, status: "Awaiting vendor" },
];

function POGRN() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        title="Purchase orders & goods receipts"
        subtitle="14 open POs · 6 pending GRNs · 2 require vendor acknowledgement"
        badges={<><Pill tone="brand">Operations</Pill><Pill tone="amber">2 overdue</Pill></>}
        actions={<><Btn variant="ghost">Download manifest</Btn><Btn variant="dark">Acknowledge GRNs</Btn></>}
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Package, tone: "bg-brand-50 text-brand-700", v: "14", l: "Open POs" },
          { icon: Truck, tone: "bg-amber-50 text-amber-700", v: "6", l: "Pending GRNs" },
          { icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700", v: "98.2%", l: "On-time receipt" },
          { icon: AlertTriangle, tone: "bg-rose-50 text-rose-700", v: "1.6%", l: "Rejection rate" },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className={`w-9 h-9 grid place-items-center rounded-md ${s.tone}`}><s.icon className="w-[18px] h-[18px]" /></div>
            <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{s.l}</div>
            <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{s.v}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader title="Purchase orders" subtitle="Last 30 days" action={<button className="text-[12.5px] font-medium text-brand-700 inline-flex items-center gap-1 hover:underline">Export <ArrowUpRight className="w-3 h-3" /></button>} />
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left border-b border-ink-200 bg-ink-50/50">
              {["PO Number", "Lines", "Buyer", "Date", "Amount", "Status", ""].map((h, i) => (
                <th key={h} className={`px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500 ${i === 4 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pos.map((p) => (
              <tr key={p.no} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40">
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{p.no}</td>
                <td className="px-4 py-3 text-ink-700">{p.line}</td>
                <td className="px-4 py-3 text-ink-600">{p.buyer}</td>
                <td className="px-4 py-3 text-ink-600">{p.date}</td>
                <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{p.amt}</td>
                <td className="px-4 py-3"><Pill tone={p.tone}>{p.status}</Pill></td>
                <td className="px-4 py-3 text-right"><Btn variant="ghost" size="sm">Open</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader title="Goods receipt notes" subtitle="Vendor acknowledgement pending on 2 GRNs" />
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left border-b border-ink-200 bg-ink-50/50">
              {["GRN", "Linked PO", "Received", "Quantity", "Inspection note", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grns.map((g) => (
              <tr key={g.id} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40">
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{g.id}</td>
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-600">{g.po}</td>
                <td className="px-4 py-3 text-ink-600">{g.recv}</td>
                <td className="px-4 py-3 font-mono tnum text-ink-900">{g.qty}</td>
                <td className="px-4 py-3 text-ink-600">{g.issue}</td>
                <td className="px-4 py-3"><Pill tone={g.tone}>{g.status}</Pill></td>
                <td className="px-4 py-3 text-right"><Btn variant="ghost" size="sm">Review</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
