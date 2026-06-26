import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Field, Input } from "@/components/ui-kit";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Aarambh" }] }),
  component: () => (
    <div className="px-8 py-7 space-y-6">
      <PageHeader title="Account settings" subtitle="Profile, notifications and security" />
      <Card className="p-6 grid grid-cols-2 gap-4 max-w-3xl">
        <Field label="Display name"><Input defaultValue="Suresh Pawar" /></Field>
        <Field label="Email"><Input defaultValue="suresh@tirupati-ind.in" /></Field>
        <Field label="Phone"><Input defaultValue="+91 98220 41122" /></Field>
        <Field label="Time zone"><Input defaultValue="Asia/Kolkata" /></Field>
      </Card>
    </div>
  ),
});
