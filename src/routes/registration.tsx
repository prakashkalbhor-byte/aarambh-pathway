import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Pill, Btn, Field, Input, Select, Textarea, PageHeader } from "@/components/ui-kit";
import { Check, Building2, FileCheck2, Landmark, ShieldCheck, Upload, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/registration")({
  head: () => ({ meta: [{ title: "Vendor Registration — Aarambh" }, { name: "description", content: "Register as an Aarambh supplier in four guided steps." }] }),
  component: Registration,
});

const steps = [
  { id: 1, label: "Company profile", icon: Building2 },
  { id: 2, label: "Tax & compliance", icon: FileCheck2 },
  { id: 3, label: "Banking & finance", icon: Landmark },
  { id: 4, label: "Review & submit", icon: ShieldCheck },
];

function Registration() {
  const [step, setStep] = useState(1);
  return (
    <div className="px-8 py-7 space-y-6">
      <PageHeader
        eyebrow={<><span className="font-mono">DRAFT-2026-1142</span><span className="text-ink-300">·</span><span>New vendor onboarding</span></>}
        title="Vendor Registration Portal"
        subtitle="Complete 4 sections — autosave is on. Expect approval in 3–5 business days."
        badges={<><Pill tone="brand">Draft</Pill><Pill tone="ink">Autosaved · just now</Pill></>}
        actions={<><Btn variant="ghost">Save & exit</Btn><Btn variant="dark">Continue later</Btn></>}
      />

      {/* Stepper */}
      <Card className="p-5">
        <div className="flex items-center">
          {steps.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full grid place-items-center text-[12px] font-semibold ring-1 ring-inset ${
                    done ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : active ? "bg-brand-700 text-white ring-brand-700"
                    : "bg-white text-ink-500 ring-ink-200"
                  }`}>
                    {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wider text-ink-400">Step {s.id}</div>
                    <div className={`text-[13px] font-medium ${active ? "text-ink-900" : "text-ink-700"}`}>{s.label}</div>
                  </div>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px mx-4 ${done ? "bg-emerald-300" : "bg-ink-200"}`} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        <Card className="col-span-2 p-6 space-y-5">
          <div>
            <h2 className="text-[16px] font-semibold text-ink-900">{steps[step - 1].label}</h2>
            <p className="text-[12.5px] text-ink-500 mt-0.5">All fields marked with * are mandatory for procurement compliance.</p>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Legal entity name *"><Input defaultValue="Tirupati Industrial Pvt. Ltd." /></Field>
              <Field label="Brand / trade name"><Input defaultValue="Tirupati Industrial" /></Field>
              <Field label="Entity type *">
                <Select defaultValue="pvt"><option value="pvt">Private Limited</option><option>Public Limited</option><option>Partnership</option><option>Proprietorship</option><option>LLP</option></Select>
              </Field>
              <Field label="Year incorporated"><Input defaultValue="2012" /></Field>
              <Field label="Primary contact name *"><Input defaultValue="Suresh Pawar" /></Field>
              <Field label="Primary contact email *"><Input defaultValue="suresh@tirupati-ind.in" /></Field>
              <Field label="Phone *"><Input defaultValue="+91 98220 41122" /></Field>
              <Field label="MSME registration"><Input placeholder="UDYAM-MH-..." defaultValue="UDYAM-MH-24-0089123" /></Field>
              <div className="col-span-2">
                <Field label="Registered office address *"><Textarea defaultValue="Plot 14, MIDC Phase II, Bhosari, Pune — 411026, Maharashtra, India" /></Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="GSTIN *" hint="15 chars"><Input defaultValue="27ABCFT1234R1ZP" className="font-mono" /></Field>
              <Field label="PAN *"><Input defaultValue="ABCFT1234R" className="font-mono" /></Field>
              <Field label="TAN"><Input defaultValue="PNET12345A" className="font-mono" /></Field>
              <Field label="HSN / SAC codes"><Input defaultValue="8483, 7308" /></Field>
              <Field label="ISO certifications">
                <Select defaultValue="9001"><option value="9001">ISO 9001:2015</option><option>ISO 14001</option><option>ISO 45001</option><option>None</option></Select>
              </Field>
              <Field label="EHS rating">
                <Select defaultValue="a"><option value="a">A — Excellent</option><option>B — Good</option><option>C — Acceptable</option></Select>
              </Field>
              <div className="col-span-2">
                <Field label="Upload supporting documents" hint="GST cert, PAN, ISO (PDF, max 10MB each)">
                  <div className="border border-dashed border-ink-300 rounded-md p-5 text-center bg-ink-50/50 hover:bg-ink-50 transition-colors">
                    <Upload className="w-5 h-5 mx-auto text-ink-400" />
                    <div className="text-[13px] text-ink-700 mt-1.5">Drop files here or <span className="text-brand-700 font-medium">browse</span></div>
                    <div className="text-[11px] text-ink-500 mt-1">3 files uploaded · GST_Cert.pdf, PAN.pdf, ISO9001.pdf</div>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bank name *"><Input defaultValue="HDFC Bank" /></Field>
              <Field label="Branch *"><Input defaultValue="Bhosari, Pune" /></Field>
              <Field label="Account holder name *"><Input defaultValue="Tirupati Industrial Pvt Ltd" /></Field>
              <Field label="Account type *"><Select defaultValue="curr"><option value="curr">Current</option><option>Savings</option><option>Cash Credit</option></Select></Field>
              <Field label="Account number *"><Input defaultValue="50200012345678" className="font-mono" /></Field>
              <Field label="IFSC *"><Input defaultValue="HDFC0000234" className="font-mono" /></Field>
              <Field label="Payment terms preference *">
                <Select defaultValue="45"><option value="30">Net 30</option><option value="45">Net 45 (MSME default)</option><option value="60">Net 60</option></Select>
              </Field>
              <Field label="Preferred currency"><Select defaultValue="inr"><option value="inr">INR</option><option>USD</option><option>EUR</option></Select></Field>
              <div className="col-span-2">
                <Field label="Cancelled cheque / bank letter *">
                  <div className="border border-dashed border-ink-300 rounded-md p-5 text-center bg-ink-50/50">
                    <Upload className="w-5 h-5 mx-auto text-ink-400" />
                    <div className="text-[13px] text-ink-700 mt-1.5">Drop here or <span className="text-brand-700 font-medium">browse</span></div>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {[
                { k: "Legal entity", v: "Tirupati Industrial Pvt. Ltd." },
                { k: "GSTIN", v: "27ABCFT1234R1ZP" },
                { k: "PAN", v: "ABCFT1234R" },
                { k: "Bank A/C", v: "HDFC0000234 · 50200012345678" },
                { k: "Payment terms", v: "Net 45 (MSME)" },
                { k: "Documents", v: "4 uploaded · 0 missing" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-ink-200/60 pb-3 last:border-0">
                  <div className="text-[12.5px] text-ink-500">{r.k}</div>
                  <div className="text-[13px] text-ink-900 font-medium">{r.v}</div>
                </div>
              ))}
              <label className="flex items-start gap-2 pt-2">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-brand-700" />
                <span className="text-[12.5px] text-ink-700">I confirm the above is accurate and authorise Aarambh to verify with statutory authorities.</span>
              </label>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-ink-200">
            <Btn variant="ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}><ArrowLeft className="w-3.5 h-3.5" />Back</Btn>
            <div className="text-[11.5px] text-ink-500">Section {step} of {steps.length}</div>
            <Btn variant="dark" onClick={() => setStep((s) => Math.min(4, s + 1))}>
              {step === 4 ? "Submit for approval" : "Save & continue"}<ArrowRight className="w-3.5 h-3.5" />
            </Btn>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="text-[13px] font-semibold text-ink-900">Why we ask</h3>
            <p className="text-[12px] text-ink-500 mt-1.5 leading-relaxed">
              Aarambh validates every vendor against the GSTN, MCA21 and Aadhaar-eKYC registries. Accurate data accelerates first-PO issuance by ~6 days.
            </p>
            <ul className="mt-4 space-y-2.5 text-[12px] text-ink-700">
              {["GST + PAN auto-verification", "Bank penny-drop check", "MSME 45-day SLA flag", "Sanctions list screening"].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />{x}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-5 bg-gradient-to-b from-brand-50 to-white ring-brand-200">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-brand-700">Need a hand?</div>
            <div className="text-[14px] font-semibold text-ink-900 mt-1">Talk to vendor success</div>
            <p className="text-[12px] text-ink-600 mt-1">Mon–Fri · 9 AM–6 PM IST</p>
            <Btn variant="brand" className="mt-3 w-full">Schedule a 15-min call</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}
