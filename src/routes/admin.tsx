import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader, Input } from "@/components/ui-kit";
import { Search, Filter, MoreVertical, Users, ClipboardList, AlertOctagon, Building2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Aarambh" }, { name: "description", content: "Procurement admin queue for vendor approvals and configuration." }] }),
  component: AdminPanel,
});

const queue = [
  { id: "VND-2026-0511", name: "Akshara Polymers LLP", cat: "Polymers · Tier 3", stage: "Compliance review", age: "2h", risk: "Low", tone: "emerald" as const },
  { id: "VND-2026-0510", name: "Konkan Logistics Co.", cat: "Inbound logistics", stage: "Finance review", age: "5h", risk: "Medium", tone: "amber" as const },
  { id: "VND-2026-0509", name: "Sharad Electricals", cat: "Spares · Tier 2", stage: "Procurement signoff", age: "1d", risk: "Low", tone: "emerald" as const },
  { id: "VND-2026-0508", name: "Bharat Forge Components", cat: "Mechanical · Tier 1", stage: "Compliance review", age: "1d", risk: "High", tone: "rose" as const },
  { id: "VND-2026-0507", name: "Vega Office Supplies", cat: "Indirect spend", stage: "Documents pending", age: "2d", risk: "Low", tone: "emerald" as const },
  { id: "VND-2026-0506", name: "Coastal Chemicals Pvt Ltd", cat: "Chemicals · Tier 2", stage: "Finance review", age: "3d", risk: "Medium", tone: "amber" as const },
];

function AdminPanel() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        title="Vendor approvals queue"
        subtitle="6 vendors awaiting your action · 2 SLA breaches"
        badges={<><Pill tone="brand">Procurement</Pill><Pill tone="amber">2 overdue</Pill></>}
        actions={<><Btn variant="ghost">Export CSV</Btn><Btn variant="dark">Configure workflow</Btn></>}
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Users, tone: "bg-brand-50 text-brand-700", v: "247", l: "Active vendors" },
          { icon: ClipboardList, tone: "bg-amber-50 text-amber-700", v: "6", l: "Pending approval" },
          { icon: AlertOctagon, tone: "bg-rose-50 text-rose-700", v: "3", l: "Flagged for risk" },
          { icon: Building2, tone: "bg-emerald-50 text-emerald-700", v: "18", l: "New this month" },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 grid place-items-center rounded-md ${s.tone}`}><s.icon className="w-[18px] h-[18px]" /></div>
              <button className="text-ink-400"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{s.l}</div>
            <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{s.v}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input placeholder="Search vendor name, GSTIN, PAN…" className="pl-8" />
          </div>
          <Btn variant="ghost" size="sm"><Filter className="w-3.5 h-3.5" />Stage</Btn>
          <Btn variant="ghost" size="sm"><Filter className="w-3.5 h-3.5" />Category</Btn>
          <Btn variant="ghost" size="sm"><Filter className="w-3.5 h-3.5" />Risk</Btn>
          <div className="ml-auto text-[12px] text-ink-500">6 results</div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left border-b border-ink-200 bg-ink-50/50">
              {["Vendor ID", "Vendor", "Category", "Stage", "Age", "Risk", ""].map((h) => (
                <th key={h} className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queue.map((r) => (
              <tr key={r.id} className="border-b border-ink-200/60 last:border-0 hover:bg-ink-50/40">
                <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{r.id}</td>
                <td className="px-4 py-3 text-ink-900 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-ink-600">{r.cat}</td>
                <td className="px-4 py-3"><Pill tone="brand">{r.stage}</Pill></td>
                <td className="px-4 py-3 text-ink-600 tnum">{r.age}</td>
                <td className="px-4 py-3"><Pill tone={r.tone}>{r.risk}</Pill></td>
                <td className="px-4 py-3 text-right"><Btn variant="ghost" size="sm">Open review</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2">
          <CardHeader title="Workflow configuration" subtitle="Approval routing for the procurement org" action={<Btn variant="ghost" size="sm">Edit policy</Btn>} />
          <div className="px-5 pb-5 space-y-3">
            {[
              { step: "Stage 1", title: "Document intake & KYC", owner: "Vendor Success Desk", sla: "24 h" },
              { step: "Stage 2", title: "Compliance & risk review", owner: "Risk team", sla: "48 h" },
              { step: "Stage 3", title: "Finance verification (banking, terms)", owner: "Finance Admin", sla: "48 h" },
              { step: "Stage 4", title: "Procurement signoff & category mapping", owner: "Category lead", sla: "24 h" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-4 p-3 rounded-md border border-ink-200">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 w-16">{s.step}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-ink-900">{s.title}</div>
                  <div className="text-[11.5px] text-ink-500">Owner: {s.owner}</div>
                </div>
                <Pill tone="ink">SLA {s.sla}</Pill>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Recent admin activity" />
          <ul className="px-5 pb-5 space-y-3 text-[12.5px]">
            {[
              { who: "Priya M.", act: "approved VND-2026-0501", t: "12 min ago" },
              { who: "Rahul S.", act: "flagged Bharat Forge for high risk", t: "1 h ago" },
              { who: "Auto-bot", act: "ran GST re-validation on 47 vendors", t: "3 h ago" },
              { who: "Anita K.", act: "edited category 'Polymers · Tier 3'", t: "Yesterday" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 grid place-items-center text-[10px] font-semibold mt-0.5">{a.who.slice(0, 1)}</div>
                <div className="flex-1">
                  <div className="text-ink-900"><span className="font-medium">{a.who}</span> <span className="text-ink-600">{a.act}</span></div>
                  <div className="text-[11px] text-ink-500">{a.t}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
