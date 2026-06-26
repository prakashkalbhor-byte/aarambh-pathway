import React, { useState } from "react";
import AppShell from "../components/AppShell";
import { Card, CardHeader, Pill, Button, PageHeader } from "../components/ui";
import { BookOpen, Mail, MessageSquare, ChevronDown, ChevronRight, ExternalLink, Phone } from "lucide-react";

const FAQS = [
  { q: "What documents do I need to register as a vendor?", a: "PAN card, GST certificate, cancelled cheque are mandatory. MSME certificate, TAN certificate, address proof, incorporation certificate are required depending on your vendor type. All files must be PDF/JPG/PNG, under 10 MB." },
  { q: "How long does approval take?", a: "Standard SLA is 3–5 business days from submission. First-line review is typically 24h; final approval and SAP push usually complete within 48h after that." },
  { q: "Why was my vendor record placed on hold?", a: "On-hold means the reviewer requested revisions. Check the audit timeline on your vendor detail page for the remarks — usually missing/incorrect documents or compliance gaps. You can edit and resubmit while on hold." },
  { q: "How do GSTIN validation rules work?", a: "GSTIN must follow the 15-character format (e.g. 22ABCDE1234F1Z5): 2-digit state code, PAN, entity number, Z, check digit. Invalid format is rejected at the form level. Live status against GSTN is verified in the Compliance Validation module." },
  { q: "What if I have multiple bank accounts?", a: "Only one primary account is stored. If you need to add a secondary account (for foreign currency, alternate state, etc.), contact your buyer or admin. SWIFT/IBAN fields appear automatically when you select 'Foreign' vendor type." },
  { q: "Can I update my details after approval?", a: "Vendor general info and contacts can be updated via a change-request workflow (contact admin). Bank details and tax IDs require a re-approval cycle for audit compliance." },
  { q: "How are SAP company codes assigned?", a: "After approval, the SAP team selects the company code (1000 Aarambh India, 3000 APAC, 5000 Global) based on your billing entity. KRED is the default account group; payment terms NT30 (net 30 days) is the default." },
];

function FAQItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-ink-200/60 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-3 py-4 px-2 text-left hover:bg-ink-50 rounded-md transition-colors" data-testid={`faq-toggle-${idx}`}>
        <div className="text-[13.5px] font-medium text-ink-900 flex-1">{q}</div>
        {open ? <ChevronDown className="w-4 h-4 text-ink-500 mt-0.5 shrink-0" /> : <ChevronRight className="w-4 h-4 text-ink-500 mt-0.5 shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 px-2 text-[13px] text-ink-600 leading-relaxed fade-up">{a}</div>
      )}
    </li>
  );
}

const GUIDES = [
  { title: "Vendor onboarding handbook (PDF)", desc: "Step-by-step walkthrough of all 6 form sections with screenshots.", href: "#" },
  { title: "Indian regulatory reference", desc: "GSTIN, PAN, TAN, MSME, ESIC formats and validation rules.", href: "#" },
  { title: "SAP integration FAQ", desc: "How company codes, account groups, and payment terms work.", href: "#" },
  { title: "Document submission checklist", desc: "Required documents per vendor type — domestic, foreign, MSME.", href: "#" },
];

export default function HelpPage() {
  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto space-y-6">
        <PageHeader
          title="Help & resources"
          subtitle="Vendor onboarding guides, FAQs, and how to reach the procurement team"
          badges={<><Pill tone="brand">Vendor portal v1.2</Pill><Pill tone="ink">Updated Jun 2026</Pill></>}
        />

        {/* Guides grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {GUIDES.map((g) => (
            <Card key={g.title} className="p-5 hover:ring-brand-200 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-brand-50 text-brand-700 grid place-items-center"><BookOpen className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold text-ink-900">{g.title}</div>
                  <div className="text-[12px] text-ink-500 mt-0.5">{g.desc}</div>
                  <a href={g.href} className="text-[12px] text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 mt-2">
                    Open guide <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader title="Frequently asked questions" subtitle="Common queries from vendors and procurement teams" />
          <ul className="px-3 pb-3">
            {FAQS.map((f, i) => <FAQItem key={f.q} idx={i} q={f.q} a={f.a} />)}
          </ul>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader title="Talk to procurement" subtitle="Email, phone or in-app chat — typical reply within 1 business day" />
          <div className="grid md:grid-cols-3 gap-4 p-5">
            <a href="mailto:procurement@aarambh.com" className="flex items-start gap-3 p-3 rounded-md hover:bg-ink-50">
              <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-700 grid place-items-center"><Mail className="w-4 h-4" /></div>
              <div>
                <div className="text-[13px] font-medium text-ink-900">Email</div>
                <div className="text-[12px] text-ink-500">procurement@aarambh.com</div>
              </div>
            </a>
            <a href="tel:+91-22-4000-0000" className="flex items-start gap-3 p-3 rounded-md hover:bg-ink-50">
              <div className="w-9 h-9 rounded-md bg-violet-50 text-violet-700 grid place-items-center"><Phone className="w-4 h-4" /></div>
              <div>
                <div className="text-[13px] font-medium text-ink-900">Phone</div>
                <div className="text-[12px] text-ink-500">+91 22 4000 0000 · Mon–Fri 9:30–18:00 IST</div>
              </div>
            </a>
            <div className="flex items-start gap-3 p-3 rounded-md hover:bg-ink-50">
              <div className="w-9 h-9 rounded-md bg-amber-50 text-amber-700 grid place-items-center"><MessageSquare className="w-4 h-4" /></div>
              <div>
                <div className="text-[13px] font-medium text-ink-900">In-app chat</div>
                <div className="text-[12px] text-ink-500">Look for the chat icon — bottom right (rolling out)</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
