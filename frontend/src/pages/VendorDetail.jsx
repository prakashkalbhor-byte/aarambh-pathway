import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, formatApiError } from "../lib/api";
import { useAuth } from "../App";
import AppShell from "../components/AppShell";
import { Card, Button, StatusBadge, MonoData, Textarea, Label, Input, Select } from "../components/ui";
import { useToast } from "../components/Toast";
import { CheckCircle2, XCircle, FileText, Clock, Building2, AlertCircle, ArrowLeft, CheckCheck } from "lucide-react";

export default function VendorDetail() {
  const { vendorId } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const [sapForm, setSapForm] = useState({ company_code: "1000", account_group: "KRED", payment_terms: "NT30", sap_vendor_code: "" });

  const load = useCallback(async () => {
    try {
      const { data } = await api.get(`/vendors/${vendorId}`);
      setVendor(data);
    } catch (err) {
      toast.error(formatApiError(err));
      navigate("/dashboard");
    }
  }, [vendorId, toast, navigate]);

  useEffect(() => { load(); }, [load]);

  if (!vendor) {
    return <AppShell><div className="text-sm text-slate-500">Loading…</div></AppShell>;
  }

  const act = async (action) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/vendors/${vendorId}/workflow`, { action, remarks: remarks || null });
      setVendor(data);
      setRemarks("");
      toast.success(`Action recorded: ${action}`);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally { setLoading(false); }
  };

  const verifyDoc = async (docId) => {
    try {
      const { data } = await api.post(`/vendors/${vendorId}/documents/${docId}/verify`);
      setVendor(data);
      toast.success("Document verified");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const submitSap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(`/vendors/${vendorId}/sap-push`, {
        company_code: sapForm.company_code,
        account_group: sapForm.account_group,
        payment_terms: sapForm.payment_terms,
      });
      setVendor(data.vendor);
      toast.success(`Pushed to SAP — ${data.result?.sap_vendor_code || "OK"}`);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally { setLoading(false); }
  };

  const canReview = user?.role === "reviewer" && vendor.status === "submitted";
  const canApprove = (user?.role === "approver" || user?.role === "admin") && ["under_review", "on_hold"].includes(vendor.status);
  const canHold = ["reviewer", "approver", "admin"].includes(user?.role) && ["submitted", "under_review"].includes(vendor.status);
  const canReject = ["reviewer", "approver", "admin"].includes(user?.role) && ["submitted", "under_review", "on_hold"].includes(vendor.status);
  const canSap = (user?.role === "sap_team" || user?.role === "admin") && vendor.status === "approved";

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-4" data-testid="back-link">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">{vendor.vendor_code || vendor.vendor_id}</div>
            <h1 className="text-3xl font-bold text-slate-900 font-heading">{vendor.general?.legal_name || "Untitled Vendor"}</h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <StatusBadge status={vendor.status} />
              <span className="text-xs text-slate-500 capitalize">{vendor.vendor_type} vendor</span>
              {vendor.submitted_at && <span className="text-xs text-slate-500">• Submitted {new Date(vendor.submitted_at).toLocaleDateString()}</span>}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: details */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="General">
              <KV k="Legal Name" v={vendor.general?.legal_name} />
              <KV k="Trade Name" v={vendor.general?.trade_name} />
              <KV k="Category" v={vendor.general?.vendor_category} />
              <KV k="Country" v={vendor.general?.country} mono />
              <KV k="Address" v={[vendor.general?.address_line1, vendor.general?.address_line2, vendor.general?.city, vendor.general?.state, vendor.general?.pincode].filter(Boolean).join(", ")} />
              <KV k="Email" v={vendor.general?.email} />
              <KV k="Phone" v={vendor.general?.phone} />
              <KV k="Website" v={vendor.general?.website} />
            </Section>

            <Section title="Compliance">
              <KV k="GSTIN" v={vendor.compliance?.gstin} mono />
              <KV k="PAN" v={vendor.compliance?.pan} mono />
              <KV k="TAN" v={vendor.compliance?.tan} mono />
              <KV k="MSME #" v={vendor.compliance?.msme_number} mono />
              <KV k="MSME Category" v={vendor.compliance?.msme_category} />
              <KV k="GST Category" v={vendor.compliance?.gst_category} />
            </Section>

            <Section title="Bank">
              <KV k="Account Holder" v={vendor.bank?.account_holder} />
              <KV k="Account #" v={vendor.bank?.account_number} mono />
              <KV k="IFSC" v={vendor.bank?.ifsc_code} mono />
              <KV k="Bank / Branch" v={`${vendor.bank?.bank_name || "—"} / ${vendor.bank?.branch_name || "—"}`} />
              <KV k="Type" v={vendor.bank?.account_type} />
              {vendor.bank?.swift_code && <KV k="SWIFT" v={vendor.bank.swift_code} mono />}
              {vendor.bank?.iban && <KV k="IBAN" v={vendor.bank.iban} mono />}
            </Section>

            <Section title="Contacts">
              {vendor.contacts?.length ? (
                <div className="col-span-2 space-y-2.5">
                  {vendor.contacts.map((c, i) => (
                    <div key={`${c.contact_type}-${c.email || c.name || i}`} className="flex items-baseline gap-3 border-b border-dashed border-slate-200 last:border-0 pb-2.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 w-20 shrink-0">{c.contact_type}</div>
                      <div className="text-sm">
                        <div className="font-medium text-slate-900">{c.name} {c.designation && <span className="text-slate-500 font-normal">— {c.designation}</span>}</div>
                        <div className="text-xs text-slate-500">{c.email} {c.phone && `· ${c.phone}`}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <div className="col-span-2 text-sm text-slate-500">No contacts added.</div>}
            </Section>

            <Section title="Documents">
              {vendor.documents?.length ? (
                <div className="col-span-2 space-y-2">
                  {vendor.documents.map((d) => (
                    <div key={d.document_id} className="flex items-center justify-between gap-3 border border-slate-200 rounded-md px-3 py-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                            <span className="capitalize">{d.document_type.replace(/_/g, " ")}</span>
                            {d.is_verified && <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded"><CheckCircle2 className="w-3 h-3" />Verified</span>}
                          </div>
                          <a href={d.secure_url} target="_blank" rel="noreferrer" className="text-xs text-brand truncate hover:underline">{d.file_name}</a>
                        </div>
                      </div>
                      {!d.is_verified && ["reviewer", "approver", "admin"].includes(user?.role) && (
                        <Button size="sm" variant="outline" onClick={() => verifyDoc(d.document_id)} data-testid={`verify-${d.document_id}`}>
                          <CheckCheck className="w-3.5 h-3.5" /> Verify
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : <div className="col-span-2 text-sm text-slate-500">No documents uploaded.</div>}
            </Section>

            {/* SAP mappings */}
            {vendor.sap_mappings?.length > 0 && (
              <Section title="SAP Mappings">
                <div className="col-span-2 space-y-2">
                  {vendor.sap_mappings.map((m) => (
                    <div key={m.mapping_id} className="border border-slate-200 rounded-md p-3 grid grid-cols-4 gap-3 text-sm">
                      <div><div className="text-[10px] font-mono uppercase text-slate-500">Company</div><MonoData>{m.company_code}</MonoData></div>
                      <div><div className="text-[10px] font-mono uppercase text-slate-500">SAP Code</div><MonoData>{m.sap_vendor_code}</MonoData></div>
                      <div><div className="text-[10px] font-mono uppercase text-slate-500">Acct Group</div><MonoData>{m.account_group}</MonoData></div>
                      <div><div className="text-[10px] font-mono uppercase text-slate-500">Payment</div><MonoData>{m.payment_terms}</MonoData></div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Right column: actions + timeline */}
          <div className="space-y-6">
            {/* Workflow actions */}
            {(canReview || canApprove || canHold || canReject) && (
              <Card>
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900">Workflow action</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Add a remark and choose an action below.</p>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <Label>Remarks</Label>
                    <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Optional notes for the audit trail…" data-testid="workflow-remarks" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {canReview && <Button onClick={() => act("approve")} disabled={loading} variant="success" data-testid="action-review-approve"><CheckCircle2 className="w-4 h-4" /> Mark Reviewed</Button>}
                    {canApprove && <Button onClick={() => act("approve")} disabled={loading} variant="success" data-testid="action-approve"><CheckCircle2 className="w-4 h-4" /> Approve</Button>}
                    {canHold && <Button onClick={() => act("request_revision")} disabled={loading} variant="outline" data-testid="action-revise"><AlertCircle className="w-4 h-4" /> Request Revision</Button>}
                    {canReject && <Button onClick={() => act("reject")} disabled={loading} variant="danger" data-testid="action-reject"><XCircle className="w-4 h-4" /> Reject</Button>}
                  </div>
                </div>
              </Card>
            )}

            {/* SAP mapping form */}
            {canSap && (
              <Card>
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2"><Building2 className="w-4 h-4" /> Create in SAP</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Assign company code and post to SAP.</p>
                </div>
                <form onSubmit={submitSap} className="p-5 space-y-3">
                  <div>
                    <Label mono>Company Code</Label>
                    <Select value={sapForm.company_code} onChange={(e) => setSapForm({ ...sapForm, company_code: e.target.value })}>
                      <option value="1000">1000 — Keva India</option>
                      <option value="3000">3000 — Keva APAC</option>
                      <option value="5000">5000 — Keva Global</option>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label mono>Account Group</Label>
                      <Input className="font-mono" value={sapForm.account_group} onChange={(e) => setSapForm({ ...sapForm, account_group: e.target.value.toUpperCase() })} data-testid="sap-acct-group" />
                    </div>
                    <div>
                      <Label mono>Payment Terms</Label>
                      <Input className="font-mono" value={sapForm.payment_terms} onChange={(e) => setSapForm({ ...sapForm, payment_terms: e.target.value.toUpperCase() })} data-testid="sap-payment-terms" />
                    </div>
                  </div>
                  <div>
                    <Label mono>SAP Vendor Code (optional, auto-generated if blank)</Label>
                    <Input className="font-mono" value={sapForm.sap_vendor_code} onChange={(e) => setSapForm({ ...sapForm, sap_vendor_code: e.target.value })} placeholder="e.g. 400118" data-testid="sap-vendor-code-input" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full" data-testid="sap-submit-btn">{loading ? "Creating…" : "Create SAP Mapping"}</Button>
                </form>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <div className="px-5 py-4 border-b border-slate-200">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2"><Clock className="w-4 h-4" /> Audit timeline</h3>
              </div>
              <div className="p-5">
                {vendor.workflow?.length ? (
                  <ol className="relative border-l border-slate-200 pl-5 space-y-4">
                    {[...vendor.workflow].reverse().map((w) => (
                      <li key={`${w.action}-${w.performed_at}-${w.performed_by}`} className="relative">
                        <span className="absolute -left-[24px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/15" />
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900 capitalize">{w.action.replace(/_/g, " ")}</div>
                        <div className="text-xs text-slate-500">
                          {w.performed_by_name || w.performed_by} • {new Date(w.performed_at).toLocaleString()}
                        </div>
                        {w.remarks && <div className="text-xs text-slate-700 mt-1 bg-slate-50 border border-slate-200 rounded p-2">{w.remarks}</div>}
                      </li>
                    ))}
                  </ol>
                ) : <div className="text-sm text-slate-500">No actions yet.</div>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, children }) {
  return (
    <Card>
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-3">{children}</div>
    </Card>
  );
}

function KV({ k, v, mono }) {
  return (
    <div className="flex items-baseline gap-3">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 w-28 shrink-0">{k}</div>
      <div className={mono ? "font-mono text-sm text-slate-900" : "text-sm text-slate-800"}>{v || "—"}</div>
    </div>
  );
}
