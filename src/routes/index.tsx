import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader } from "@/components/ui-kit";
import { Package, Truck, FileText, CircleDollarSign, ShieldCheck, Download, Plus, ChevronRight, AlertTriangle, ArrowUpRight, MoreVertical, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Vendor Dashboard — Aarambh" }, { name: "description", content: "Vendor purchase orders, payments and compliance overview." }] }),
  component: Dashboard,
});

const stats = [
  { icon: Package, tone: "brand", label: "Open Purchase Orders", value: "14", sub: "+3 this week" },
  { icon: Truck, tone: "amber", label: "Pending GRNs", value: "6", sub: "2 overdue" },
  { icon: FileText, tone: "violet", label: "Invoices Awaiting Payment", value: "9", sub: "₹28.43 L" },
  { icon: CircleDollarSign, tone: "emerald", label: "Last Payment Received", value: "₹4,86,200", sub: "UTR · SBIN0026781452 · Apr 28" },
] as const;

const toneBg: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

const pos = [
  { no: "PO-26-04881", date: "08 May 2026", buyer: "Aarambh — Plant 2", amt: "₹2,85,400", status: "Open", tone: "brand" as const },
  { no: "PO-26-04863", date: "06 May 2026", buyer: "Aarambh — Plant 1", amt: "₹11,24,000", status: "Partial", tone: "amber" as const },
  { no: "PO-26-04812", date: "02 May 2026", buyer: "Aarambh — Plant 2", amt: "₹67,800", status: "Delivered", tone: "emerald" as const, check: true },
  { no: "PO-26-04790", date: "29 Apr 2026", buyer: "Aarambh — R&D", amt: "₹4,12,300", status: "In Transit", tone: "brand" as const },
  { no: "PO-26-04754", date: "24 Apr 2026", buyer: "Aarambh — Plant 1", amt: "₹89,400", status: "Completed", tone: "emerald" as const, check: true },
];

const ledger = [
  { inv: "INV/26-27/0091", utr: "SBIN0026781452", date: "28 Apr 2026", amt: "₹4,76,476", tds: "₹9,724" },
  { inv: "INV/26-27/0088", utr: "SBIN0026655912", date: "22 Apr 2026", amt: "₹3,06,250", tds: "₹6,250" },
  { inv: "INV/26-27/0079", utr: "SBIN0026581200", date: "16 Apr 2026", amt: "₹1,83,652", tds: "₹3,748" },
  { inv: "INV/26-27/0072", utr: "SBIN0026494037", date: "10 Apr 2026", amt: "₹6,12,304", tds: "₹12,496" },
];

function Dashboard() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        eyebrow={<><span className="font-mono">VND-2026-0418</span><span className="text-ink-300">·</span><span>Mechanical Components — Tier 2</span></>}
        title="Good morning, Tirupati Industrial"
        badges={<>
          <Pill tone="emerald"><ShieldCheck className="w-3 h-3" />Approved vendor</Pill>
          <Pill tone="violet">MSME · 45-day SLA</Pill>
          <Pill tone="ink">GSTIN · <span className="font-mono ml-0.5">27ABCFT1234R1ZP</span></Pill>
        </>}
        actions={<>
          <Btn variant="ghost"><Download className="w-3.5 h-3.5" />Statement</Btn>
          <Btn variant="dark"><Plus className="w-3.5 h-3.5" />Raise invoice</Btn>
        </>}
      />

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 grid place-items-center rounded-md ${toneBg[s.tone]}`}>
                <s.icon className="w-[18px] h-[18px]" />
              </div>
              <button className="text-ink-400 hover:text-ink-700"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{s.label}</div>
            <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{s.value}</div>
            <div className="text-[11.5px] text-ink-500 mt-1">{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5">
        <Card className="col-span-3 overflow-hidden">
          <CardHeader
            title="Recent Purchase Orders"
            subtitle="Last 30 days · 14 open POs"
            action={<button className="text-[12.5px] font-medium text-brand-700 inline-flex items-center gap-1 hover:underline">View all <ArrowUpRight className="w-3 h-3" /></button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left border-b border-ink-200 bg-ink-50/50">
                  {["PO Number", "Date", "Buyer", "Amount", "Status"].map((h, i) => (
                    <th key={h} className={`px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500 ${i === 3 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pos.map((p) => (
                  <tr key={p.no} className="border-b border-ink-200/60 last:border-0">
                    <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{p.no}</td>
                    <td className="px-4 py-3 text-ink-600">{p.date}</td>
                    <td className="px-4 py-3 text-ink-600">{p.buyer}</td>
                    <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{p.amt}</td>
                    <td className="px-4 py-3"><Pill tone={p.tone}>{p.check && <Check className="w-3 h-3" />}{p.status}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="col-span-2 overflow-hidden">
          <CardHeader title="Payment trend" subtitle="Net paid · last 8 weeks" action={<Pill tone="emerald">+18.4%</Pill>} />
          <div className="px-3">
            <svg viewBox="0 0 320 64" className="w-full h-16">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.40 0.10 252)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="oklch(0.40 0.10 252)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M4 57 L48 51 L93 60 L137 38 L182 43 L226 27 L271 18 L316 4 L316 60 L4 60 Z" fill="url(#g1)" />
              <path d="M4 57 L48 51 L93 60 L137 38 L182 43 L226 27 L271 18 L316 4" fill="none" stroke="oklch(0.40 0.10 252)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="h-px bg-ink-200/70" />
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[12.5px] font-semibold text-ink-800 uppercase tracking-wide">Payment ledger</h4>
              <span className="text-[11px] text-ink-500">FY 26-27</span>
            </div>
            <div className="space-y-3">
              {ledger.map((l) => (
                <div key={l.inv} className="grid grid-cols-[1fr_auto] gap-2 items-start">
                  <div>
                    <div className="font-mono text-[12px] text-ink-900">{l.inv}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">UTR <span className="font-mono">{l.utr}</span> · {l.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[12.5px] tnum text-ink-900">{l.amt}</div>
                    <div className="text-[11px] text-ink-500">TDS {l.tds}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 grid place-items-center rounded-md bg-amber-50 text-amber-700"><AlertTriangle className="w-4 h-4" /></span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-ink-900">2 GRNs awaiting your acknowledgement</div>
            <div className="text-[12px] text-ink-500">PO-26-04863 has 8 units flagged for rejection — surface finish out of spec. Confirm replacement schedule.</div>
          </div>
          <Btn variant="ghost" size="sm">Review GRNs<ChevronRight className="w-3 h-3" /></Btn>
        </div>
      </Card>
    </div>
  );
}
