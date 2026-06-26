import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Pill, Btn, PageHeader } from "@/components/ui-kit";
import { ChevronRight, Folder, Star, Plus } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Vendor Categories — Aarambh" }, { name: "description", content: "Taxonomy of vendor categories and tiering rules." }] }),
  component: Categories,
});

const tree = [
  { name: "Direct materials", count: 84, children: [
    { name: "Mechanical components", count: 32, tier: "Tier 1–3", sla: "30/45/60d" },
    { name: "Electrical & electronics", count: 21, tier: "Tier 1–2", sla: "30/45d" },
    { name: "Polymers & rubber", count: 18, tier: "Tier 2–3", sla: "45/60d" },
    { name: "Castings & forgings", count: 13, tier: "Tier 1", sla: "30d" },
  ]},
  { name: "Indirect spend", count: 91, children: [
    { name: "Office supplies", count: 24, tier: "Tier 3", sla: "60d" },
    { name: "Facilities & maintenance", count: 31, tier: "Tier 2", sla: "45d" },
    { name: "Travel & hospitality", count: 17, tier: "Tier 2", sla: "45d" },
    { name: "Marketing services", count: 19, tier: "Tier 2", sla: "45d" },
  ]},
  { name: "Logistics", count: 38, children: [
    { name: "Inbound freight", count: 14, tier: "Tier 1", sla: "30d" },
    { name: "Outbound distribution", count: 16, tier: "Tier 1", sla: "30d" },
    { name: "Warehousing 3PL", count: 8, tier: "Tier 2", sla: "45d" },
  ]},
  { name: "Professional services", count: 34, children: [
    { name: "Legal & compliance", count: 6, tier: "Tier 1", sla: "30d" },
    { name: "IT & SaaS", count: 22, tier: "Tier 2", sla: "45d" },
    { name: "Consulting", count: 6, tier: "Tier 1", sla: "30d" },
  ]},
];

function Categories() {
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        title="Vendor category taxonomy"
        subtitle="247 vendors mapped across 4 spend families and 14 sub-categories"
        badges={<><Pill tone="violet">Field master</Pill><Pill tone="ink">v2.4 · published</Pill></>}
        actions={<><Btn variant="ghost">Export taxonomy</Btn><Btn variant="dark"><Plus className="w-3.5 h-3.5" />New category</Btn></>}
      />

      <div className="grid grid-cols-4 gap-4">
        {tree.map((fam) => (
          <Card key={fam.name} className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 grid place-items-center rounded-md bg-brand-50 text-brand-700"><Folder className="w-[18px] h-[18px]" /></div>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-[13px] font-semibold text-ink-900 mt-4">{fam.name}</div>
            <div className="text-[11.5px] text-ink-500">{fam.count} vendors · {fam.children.length} subcategories</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {tree.map((fam) => (
          <Card key={fam.name} className="overflow-hidden">
            <CardHeader title={fam.name} subtitle={`${fam.count} vendors`} action={<Btn variant="ghost" size="sm">Edit</Btn>} />
            <ul className="px-2 pb-3">
              {fam.children.map((c) => (
                <li key={c.name} className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-ink-50">
                  <div className="w-7 h-7 rounded-md bg-ink-100 text-ink-600 grid place-items-center"><Folder className="w-3.5 h-3.5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-ink-900 font-medium truncate">{c.name}</div>
                    <div className="text-[11px] text-ink-500">{c.count} vendors · {c.tier} · SLA {c.sla}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
