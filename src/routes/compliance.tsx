import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader } from "@/components/ui-kit";
import { ShieldCheck, ShieldAlert, ShieldX, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/compliance")({
  head: () => ({ meta: [{ title: "Compliance Review — Aarambh" }, { name: "description", content: "Validate vendor GST, PAN, MSME and sanctions status." }] }),
  component: Compliance,
});

const checks = [
  { name: "GSTIN active (GSTN)", status: "Pass", tone: "emerald" as const, detail: "27ABCFT1234R1ZP · Active · filed up to Apr 2026" },
  { name: "PAN ↔ Legal name match", status: "Pass", tone: "emerald" as const, detail: "PAN ABCFT1234R matches 'Tirupati Industrial Pvt Ltd'" },
  { name: "MSME / Udyam certificate", status: "Pass", tone: "emerald" as const, detail: "UDYAM-MH-24-0089123 · valid till 2029" },
  { name: "MCA21 entity status", status: "Pass", tone: "emerald" as const, detail: "CIN U28910MH2012PTC233412 · Active" },
  { name: "Bank account penny-drop", status: "Pass", tone: "emerald" as const, detail: "HDFC0000234 · holder name matched" },
  { name: "OFAC / sanctions screening", status: "Pass", tone: "emerald" as const, detail: "No matches across 14 sanctions lists" },
  { name: "EPF / ESIC compliance", status: "Warn", tone: "amber" as const, detail: "Last ECR filing delayed by 6 days — request explanation" },
  { name: "ISO 9001 certificate", status: "Expiring", tone: "amber" as const, detail: "Valid till 12 Aug 2026 — request renewal upload" },
];

const queue = [
  { id: "VND-2026-0508", name: "Bharat Forge Components", risk: "High", tone: "rose" as const, flags: 3, age: "1d" },
  { id: "VND-2026-0506", name: "Coastal Chemicals Pvt Ltd", risk: "Medium", tone: "amber" as const, flags: 2, age: "3d" },
  { id: "VND-2026-0501", name: "Vinayak Hardware", risk: "Low", tone: "emerald" as const, flags: 0, age: "4d" },
];

function Compliance() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        eyebrow={<><span className="font-mono">VND-2026-0418</span><span className="text-ink-300">·</span><span>Compliance review</span></>}
        title="Tirupati Industrial — risk dossier"
        badges={<><Pill tone="emerald"><ShieldCheck className="w-3 h-3" />6 of 8 passing</Pill><Pill tone="amber">2 warnings</Pill><Pill tone="ink">Reviewer: Priya M.</Pill></>}
        actions={<><Btn variant="ghost"><RefreshCw className="w-3.5 h-3.5" />Re-run all checks</Btn><Btn variant="dark"><CheckCircle2 className="w-3.5 h-3.5" />Approve & forward</Btn></>}
      />

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: ShieldCheck, tone: "bg-emerald-50 text-emerald-700", v: "6", l: "Checks passed", s: "Auto-validated against statutory APIs" },
          { icon: ShieldAlert, tone: "bg-amber-50 text-amber-700", v: "2", l: "Warnings to clarify", s: "Action required from vendor" },
          { icon: ShieldX, tone: "bg-rose-50 text-rose-700", v: "0", l: "Hard failures", s: "Would block onboarding" },
        ].map((s, i) => (
          <Card key={i} className="p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-md grid place-items-center ${s.tone}`}><s.icon className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="text-[28px] font-semibold text-ink-900 tnum leading-none">{s.v}</div>
              <div className="text-[12.5px] font-medium text-ink-900 mt-2">{s.l}</div>
              <div className="text-[11.5px] text-ink-500">{s.s}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2 overflow-hidden">
          <CardHeader title="Compliance checks" subtitle="Auto-run on submission · re-run any time" />
          <ul className="px-2 pb-4">
            {checks.map((c) => (
              <li key={c.name} className="flex items-start gap-3 px-3 py-3 border-b border-ink-200/60 last:border-0">
                <div className={`w-7 h-7 rounded-md grid place-items-center mt-0.5 ${
                  c.tone === "emerald" ? "bg-emerald-50 text-emerald-700" : c.tone === "amber" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                }`}>
                  {c.tone === "emerald" ? <CheckCircle2 className="w-4 h-4" /> : c.tone === "amber" ? <ShieldAlert className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-medium text-ink-900">{c.name}</div>
                    <Pill tone={c.tone}>{c.status}</Pill>
                  </div>
                  <div className="text-[12px] text-ink-500 mt-0.5">{c.detail}</div>
                </div>
                <Btn variant="ghost" size="sm">View log</Btn>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 bg-ink-50/60 border-t border-ink-200 flex items-center justify-between">
            <div className="text-[12px] text-ink-600">Reviewer notes will be shared with the vendor on rejection.</div>
            <div className="flex items-center gap-2">
              <Btn variant="ghost">Send clarification</Btn>
              <Btn variant="dark">Approve & forward</Btn>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Risk queue" subtitle="Other vendors in your review tray" />
          <ul className="px-2 pb-4">
            {queue.map((q) => (
              <li key={q.id} className="px-3 py-3 border-b border-ink-200/60 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11.5px] text-ink-500">{q.id}</div>
                  <Pill tone={q.tone}>{q.risk}</Pill>
                </div>
                <div className="text-[13px] font-medium text-ink-900 mt-1">{q.name}</div>
                <div className="text-[11.5px] text-ink-500 mt-0.5">{q.flags} flag{q.flags === 1 ? "" : "s"} · waiting {q.age}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
