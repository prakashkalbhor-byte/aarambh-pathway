import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/ui-kit";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports & analytics — Aarambh" }] }),
  component: () => (
    <div className="px-8 py-7 space-y-6">
      <PageHeader title="Reports & analytics" subtitle="Spend, cycle time and SLA dashboards" />
      <Card className="p-10 text-center text-ink-500 text-[13px]">Dashboards coming soon — wiring this section to your data warehouse.</Card>
    </div>
  ),
});
