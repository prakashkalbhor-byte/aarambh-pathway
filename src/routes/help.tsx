import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/ui-kit";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help center — Aarambh" }] }),
  component: () => (
    <div className="px-8 py-7 space-y-6">
      <PageHeader title="Help center" subtitle="Vendor onboarding guides, FAQs and contact" />
      <Card className="p-10 text-center text-ink-500 text-[13px]">Browse articles or contact vendor success — Mon–Fri 9 AM–6 PM IST.</Card>
    </div>
  ),
});
