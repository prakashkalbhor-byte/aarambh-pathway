import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, formatApiError } from "../lib/api";
import AppShell from "../components/AppShell";
import { Card, Button, Input, Label, Select, Textarea } from "../components/ui";
import { useToast } from "../components/Toast";
import { Check, FileText, ArrowRight, ArrowLeft, Upload, Trash2, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "general", title: "General", desc: "Legal name, address, contact" },
  { id: "compliance", title: "Compliance", desc: "GSTIN, PAN, TAN, MSME" },
  { id: "bank", title: "Bank", desc: "Account, IFSC / SWIFT" },
  { id: "contacts", title: "Contacts", desc: "Finance, technical" },
  { id: "documents", title: "Documents", desc: "Upload certificates" },
  { id: "review", title: "Review", desc: "Verify & submit" },
];

const DOC_TYPES = [
  { key: "pan_card", label: "PAN Card", required: true },
  { key: "gstin_certificate", label: "GST Certificate", required: true },
  { key: "cancelled_cheque", label: "Cancelled Cheque", required: true },
  { key: "msme_certificate", label: "MSME Certificate" },
  { key: "tan_certificate", label: "TAN Certificate" },
  { key: "incorporation_certificate", label: "Incorporation Certificate" },
  { key: "address_proof", label: "Address Proof" },
  { key: "vendor_declaration", label: "Vendor Declaration" },
];

export default function VendorOnboarding() {
  const toast = useToast();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // Step state
  const [vendorType, setVendorType] = useState("domestic");
  const [general, setGeneral] = useState({
    legal_name: "", trade_name: "", vendor_category: "",
    country: "IND", address_line1: "", address_line2: "",
    city: "", state: "", pincode: "",
    email: "", phone: "", website: "",
  });
  const [compliance, setCompliance] = useState({
    gstin: "", pan: "", tan: "", msme_number: "", msme_category: "",
    gst_registered: true, gst_category: "regular", is_foreign: false,
  });
  const [bank, setBank] = useState({
    account_holder: "", account_number: "", ifsc_code: "",
    bank_name: "", branch_name: "", account_type: "current",
    is_primary: true, swift_code: "", iban: "",
  });
  const [contacts, setContacts] = useState([{ _key: "c0", contact_type: "primary", name: "", designation: "", email: "", phone: "", mobile: "" }]);

  // Load existing vendor (mount only — uses functional setState to avoid stale-closure deps)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/vendors/mine");
        if (!data) return;
        setVendor(data);
        setVendorType(data.vendor_type);
        setGeneral((g) => ({ ...g, ...(data.general || {}) }));
        if (data.compliance) setCompliance((c) => ({ ...c, ...data.compliance }));
        if (data.bank) setBank((b) => ({ ...b, ...data.bank }));
        if (data.contacts?.length) {
          setContacts(data.contacts.map((c, i) => ({ _key: c._key || `c${i}-${Date.now()}`, ...c })));
        }
      } catch (err) {
        console.error("vendor load failed", err);
      }
    })();
  }, []);

  const readonly = vendor && !["draft", "on_hold"].includes(vendor.status);

  const createVendor = async () => {
    setCreating(true);
    try {
      const { data } = await api.post("/vendors", { vendor_type: vendorType, general });
      setVendor(data);
      toast.success("Vendor record created");
      setStep(1);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setCreating(false);
    }
  };

  const saveStep = async (patch, nextStepIndex) => {
    setLoading(true);
    try {
      const { data } = await api.patch(`/vendors/${vendor.vendor_id}`, patch);
      setVendor(data);
      toast.success("Saved");
      if (nextStepIndex !== undefined) setStep(nextStepIndex);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const submitVendor = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/vendors/${vendor.vendor_id}/submit`);
      setVendor(data);
      toast.success("Submitted for review");
      navigate("/dashboard");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Document upload via Cloudinary signed
  // ---------------------------------------------------------------------------
  const uploadDoc = async (docType, file) => {
    setLoading(true);
    try {
      const { data: sig } = await api.get(`/cloudinary/signature?vendor_id=${vendor.vendor_id}`);
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.api_key);
      form.append("timestamp", sig.timestamp);
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`, { method: "POST", body: form });
      const result = await res.json();
      if (!result.secure_url) throw new Error(result.error?.message || "Upload failed");
      const { data: updated } = await api.post(`/vendors/${vendor.vendor_id}/documents`, {
        document_type: docType,
        file_name: file.name,
        public_id: result.public_id,
        secure_url: result.secure_url,
        mime_type: file.type,
        file_size_bytes: file.size,
      });
      setVendor(updated);
      toast.success("Document uploaded");
    } catch (err) {
      toast.error(formatApiError(err) || err.message);
    } finally {
      setLoading(false);
    }
  };

  // No vendor yet — show creation card
  if (!vendor) {
    return (
      <AppShell>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 font-heading mb-1">Start vendor onboarding</h1>
          <p className="text-slate-600 mb-8">Begin by selecting your vendor type and entering general information. You can save and continue at any time.</p>

          <Card>
            <div className="px-6 py-6 space-y-5">
              <div>
                <Label required mono>Vendor Type</Label>
                <div className="grid sm:grid-cols-3 gap-3 mt-1">
                  {["domestic", "foreign", "msme"].map((t) => (
                    <button
                      key={t} type="button"
                      onClick={() => setVendorType(t)}
                      className={`p-4 rounded-lg border text-left transition-all ${vendorType === t ? "border-brand bg-brand-muted/40 ring-2 ring-brand/20" : "border-slate-200 hover:border-slate-300"}`}
                      data-testid={`vtype-${t}`}
                    >
                      <div className="text-sm font-semibold text-slate-900 capitalize">{t}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {t === "domestic" && "Indian vendor (GST/PAN)"}
                        {t === "foreign" && "International (SWIFT/IBAN)"}
                        {t === "msme" && "MSME registered"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label required>Legal Name</Label>
                  <Input value={general.legal_name} onChange={(e) => setGeneral({ ...general, legal_name: e.target.value })} data-testid="general-legal-name-input" />
                </div>
                <div>
                  <Label>Trade Name</Label>
                  <Input value={general.trade_name} onChange={(e) => setGeneral({ ...general, trade_name: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} />
              </div>
              <Button onClick={createVendor} disabled={!general.legal_name || creating} size="lg" data-testid="create-vendor-btn">
                {creating ? "Creating…" : "Create & continue"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px,1fr] gap-8">
        {/* Sidebar steps */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Progress</div>
          <ol className="space-y-1">
            {STEPS.map((s, i) => {
              const completed = i < step;
              const current = i === step;
              let btnBg = "hover:bg-slate-100";
              if (current) btnBg = "bg-brand-muted/60";
              else if (completed) btnBg = "";
              let dotCls = "bg-slate-200 text-slate-600";
              if (completed) dotCls = "bg-emerald-600 text-white";
              else if (current) dotCls = "bg-brand text-white";
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setStep(i)}
                    className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-md transition-all ${btnBg}`}
                    data-testid={`step-${s.id}`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full grid place-items-center text-[10px] font-mono font-semibold shrink-0 ${dotCls}`}>
                      {completed ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${current ? "text-brand" : "text-slate-800"}`}>{s.title}</div>
                      <div className="text-xs text-slate-500">{s.desc}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Main content */}
        <section>
          {readonly && (
            <Card className="mb-5 border-amber-200 bg-amber-50">
              <div className="px-5 py-3.5 text-sm text-amber-800">
                This vendor record is <strong>{vendor.status}</strong>. Editing is disabled.
              </div>
            </Card>
          )}

          {/* Step 0: General */}
          {step === 0 && (
            <StepCard title="General Information" subtitle="Legal name, registered address and primary contact.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Legal Name" required value={general.legal_name} onChange={(v) => setGeneral({ ...general, legal_name: v })} testid="general-legal-name" />
                <Field label="Trade Name" value={general.trade_name} onChange={(v) => setGeneral({ ...general, trade_name: v })} />
                <Field label="Vendor Category" value={general.vendor_category} onChange={(v) => setGeneral({ ...general, vendor_category: v })} placeholder="raw_material / service / capex" />
                <Field label="Country" value={general.country} onChange={(v) => setGeneral({ ...general, country: v })} mono />
                <Field label="Address Line 1" value={general.address_line1} onChange={(v) => setGeneral({ ...general, address_line1: v })} className="sm:col-span-2" />
                <Field label="Address Line 2" value={general.address_line2} onChange={(v) => setGeneral({ ...general, address_line2: v })} className="sm:col-span-2" />
                <Field label="City" value={general.city} onChange={(v) => setGeneral({ ...general, city: v })} />
                <Field label="State" value={general.state} onChange={(v) => setGeneral({ ...general, state: v })} />
                <Field label="Pincode" value={general.pincode} onChange={(v) => setGeneral({ ...general, pincode: v })} mono />
                <Field label="Phone" value={general.phone} onChange={(v) => setGeneral({ ...general, phone: v })} />
                <Field label="Email" type="email" value={general.email} onChange={(v) => setGeneral({ ...general, email: v })} />
                <Field label="Website" value={general.website} onChange={(v) => setGeneral({ ...general, website: v })} />
              </div>
              <StepActions onNext={() => saveStep({ general, vendor_type: vendorType }, 1)} loading={loading} readonly={readonly} testid="general" />
            </StepCard>
          )}

          {/* Step 1: Compliance */}
          {step === 1 && (
            <StepCard title="Compliance & Tax IDs" subtitle="Indian regulatory identifiers — GSTIN, PAN, TAN, MSME.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="GSTIN" mono value={compliance.gstin} onChange={(v) => setCompliance({ ...compliance, gstin: v.toUpperCase() })} placeholder="22ABCDE1234F1Z5" testid="compliance-gstin" />
                <Field label="PAN" mono value={compliance.pan} onChange={(v) => setCompliance({ ...compliance, pan: v.toUpperCase() })} placeholder="ABCDE1234F" testid="compliance-pan" />
                <Field label="TAN" mono value={compliance.tan} onChange={(v) => setCompliance({ ...compliance, tan: v.toUpperCase() })} placeholder="MUMA12345B" />
                <div>
                  <Label>GST Category</Label>
                  <Select value={compliance.gst_category} onChange={(e) => setCompliance({ ...compliance, gst_category: e.target.value })}>
                    <option value="regular">Regular</option>
                    <option value="composition">Composition</option>
                    <option value="sez">SEZ</option>
                    <option value="export">Export</option>
                  </Select>
                </div>
                <Field label="MSME Number" mono value={compliance.msme_number} onChange={(v) => setCompliance({ ...compliance, msme_number: v })} placeholder="UDYAM-XX-00-0000000" />
                <div>
                  <Label>MSME Category</Label>
                  <Select value={compliance.msme_category || ""} onChange={(e) => setCompliance({ ...compliance, msme_category: e.target.value })}>
                    <option value="">— None —</option>
                    <option value="micro">Micro</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                  </Select>
                </div>
              </div>
              <StepActions onBack={() => setStep(0)} onNext={() => saveStep({ compliance }, 2)} loading={loading} readonly={readonly} testid="compliance" />
            </StepCard>
          )}

          {/* Step 2: Bank */}
          {step === 2 && (
            <StepCard title="Bank Account" subtitle="Primary account for payments. SWIFT/IBAN for foreign vendors.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Account Holder" value={bank.account_holder} onChange={(v) => setBank({ ...bank, account_holder: v })} testid="bank-holder" />
                <Field label="Account Number" mono value={bank.account_number} onChange={(v) => setBank({ ...bank, account_number: v })} testid="bank-account-number" />
                <Field label="IFSC Code" mono value={bank.ifsc_code} onChange={(v) => setBank({ ...bank, ifsc_code: v.toUpperCase() })} placeholder="HDFC0001234" />
                <Field label="Bank Name" value={bank.bank_name} onChange={(v) => setBank({ ...bank, bank_name: v })} />
                <Field label="Branch" value={bank.branch_name} onChange={(v) => setBank({ ...bank, branch_name: v })} />
                <div>
                  <Label>Account Type</Label>
                  <Select value={bank.account_type} onChange={(e) => setBank({ ...bank, account_type: e.target.value })}>
                    <option value="current">Current</option>
                    <option value="savings">Savings</option>
                  </Select>
                </div>
                {vendorType === "foreign" && (
                  <>
                    <Field label="SWIFT Code" mono value={bank.swift_code} onChange={(v) => setBank({ ...bank, swift_code: v.toUpperCase() })} />
                    <Field label="IBAN" mono value={bank.iban} onChange={(v) => setBank({ ...bank, iban: v.toUpperCase() })} />
                  </>
                )}
              </div>
              <StepActions onBack={() => setStep(1)} onNext={() => saveStep({ bank }, 3)} loading={loading} readonly={readonly} testid="bank" />
            </StepCard>
          )}

          {/* Step 3: Contacts */}
          {step === 3 && (
            <StepCard title="Contact Persons" subtitle="Primary, finance and technical contacts at your firm.">
              <div className="space-y-3">
                {contacts.map((c, idx) => {
                  const updateContact = (patch) => setContacts((list) => list.map((x, i) => i === idx ? { ...x, ...patch } : x));
                  const removeContact = () => setContacts((list) => list.filter((_, i) => i !== idx));
                  return (
                  <div key={c._key || c.contact_type + "-" + idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 relative">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Contact Type</Label>
                        <Select value={c.contact_type} onChange={(e) => updateContact({ contact_type: e.target.value })}>
                          <option value="primary">Primary</option>
                          <option value="finance">Finance</option>
                          <option value="technical">Technical</option>
                        </Select>
                      </div>
                      <Field label="Name" value={c.name} onChange={(v) => updateContact({ name: v })} testid={`contact-${idx}-name`} />
                      <Field label="Designation" value={c.designation} onChange={(v) => updateContact({ designation: v })} />
                      <Field label="Email" type="email" value={c.email} onChange={(v) => updateContact({ email: v })} />
                      <Field label="Phone" value={c.phone} onChange={(v) => updateContact({ phone: v })} />
                      <Field label="Mobile" value={c.mobile} onChange={(v) => updateContact({ mobile: v })} />
                    </div>
                    {contacts.length > 1 && (
                      <button className="absolute top-3 right-3 text-slate-400 hover:text-rose-600" onClick={removeContact}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  );
                })}
                <Button variant="outline" size="sm" onClick={() => setContacts((list) => [...list, { _key: `c${Date.now()}`, contact_type: "finance", name: "", designation: "", email: "", phone: "", mobile: "" }])} data-testid="add-contact-btn">
                  + Add another contact
                </Button>
              </div>
              <StepActions onBack={() => setStep(2)} onNext={() => saveStep({ contacts }, 4)} loading={loading} readonly={readonly} testid="contacts" />
            </StepCard>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <StepCard title="Document Uploads" subtitle="Upload PDF or image (JPG/PNG). Max 10 MB per file.">
              <div className="space-y-2.5">
                {DOC_TYPES.map((d) => {
                  const existing = vendor.documents?.find((doc) => doc.document_type === d.key);
                  return (
                    <div key={d.key} className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg p-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                            {d.label}
                            {d.required && <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600">Required</span>}
                            {existing?.is_verified && <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded"><CheckCircle2 className="w-3 h-3" />Verified</span>}
                          </div>
                          {existing ? (
                            <a href={existing.secure_url} target="_blank" rel="noreferrer" className="text-xs text-brand truncate hover:underline">{existing.file_name}</a>
                          ) : (
                            <div className="text-xs text-slate-500">PDF, JPG, PNG</div>
                          )}
                        </div>
                      </div>
                      {!readonly && (
                        <label className="cursor-pointer">
                          <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden"
                            onChange={(e) => e.target.files?.[0] && uploadDoc(d.key, e.target.files[0])}
                            data-testid={`upload-${d.key}`}
                          />
                          <span className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50">
                            <Upload className="w-3.5 h-3.5" /> {existing ? "Replace" : "Upload"}
                          </span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
              <StepActions onBack={() => setStep(3)} onNext={() => setStep(5)} loading={loading} readonly={readonly} testid="documents" />
            </StepCard>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <StepCard title="Review & Submit" subtitle="Verify all sections. Once submitted, you cannot edit until revision is requested.">
              <ReviewBlock title="General">
                <KV k="Vendor Type" v={vendor.vendor_type} />
                <KV k="Legal Name" v={vendor.general?.legal_name} />
                <KV k="Trade Name" v={vendor.general?.trade_name} />
                <KV k="Email" v={vendor.general?.email} />
                <KV k="Phone" v={vendor.general?.phone} />
                <KV k="City / State" v={`${vendor.general?.city || "—"} / ${vendor.general?.state || "—"}`} />
              </ReviewBlock>
              <ReviewBlock title="Compliance">
                <KV k="GSTIN" v={vendor.compliance?.gstin} mono />
                <KV k="PAN" v={vendor.compliance?.pan} mono />
                <KV k="TAN" v={vendor.compliance?.tan} mono />
                <KV k="MSME" v={vendor.compliance?.msme_number} mono />
              </ReviewBlock>
              <ReviewBlock title="Bank">
                <KV k="Account Holder" v={vendor.bank?.account_holder} />
                <KV k="Account Number" v={vendor.bank?.account_number} mono />
                <KV k="IFSC" v={vendor.bank?.ifsc_code} mono />
                <KV k="Bank / Branch" v={`${vendor.bank?.bank_name || "—"} / ${vendor.bank?.branch_name || "—"}`} />
              </ReviewBlock>
              <ReviewBlock title="Documents">
                <div className="text-sm text-slate-700">{vendor.documents?.length || 0} files uploaded</div>
              </ReviewBlock>

              <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-200">
                <Button variant="outline" onClick={() => setStep(4)} disabled={loading}><ArrowLeft className="w-4 h-4" /> Back</Button>
                {!readonly && (
                  <Button onClick={submitVendor} disabled={loading} size="lg" data-testid="submit-vendor-btn">
                    {loading ? "Submitting…" : "Submit for Review"} <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </StepCard>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function StepCard({ title, subtitle, children }) {
  return (
    <div className="fade-up">
      <h1 className="text-2xl font-bold text-slate-900 font-heading">{title}</h1>
      <p className="text-slate-600 mt-1 mb-6">{subtitle}</p>
      <Card><div className="px-6 py-6">{children}</div></Card>
    </div>
  );
}

function StepActions({ onBack, onNext, loading, readonly, testid }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-6 mt-4 border-t border-slate-200">
      {onBack ? <Button variant="outline" onClick={onBack} disabled={loading}><ArrowLeft className="w-4 h-4" /> Back</Button> : <div />}
      {!readonly && (
        <Button onClick={onNext} disabled={loading} data-testid={`step-next-${testid}`}>
          {loading ? "Saving…" : "Save & continue"} <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, mono, className = "", placeholder, testid }) {
  return (
    <div className={className}>
      <Label required={required} mono={mono}>{label}</Label>
      <Input type={type} value={value || ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={mono ? "font-mono" : ""} data-testid={testid ? `${testid}-input` : undefined} />
    </div>
  );
}

function ReviewBlock({ title, children }) {
  return (
    <div className="border-b border-slate-200 last:border-0 py-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">{title}</div>
      <div className="grid sm:grid-cols-2 gap-2.5">{children}</div>
    </div>
  );
}

function KV({ k, v, mono }) {
  return (
    <div className="flex items-baseline gap-3">
      <div className="text-xs text-slate-500 w-32 shrink-0">{k}</div>
      <div className={mono ? "font-mono text-sm text-slate-900" : "text-sm text-slate-800"}>{v || "—"}</div>
    </div>
  );
}
