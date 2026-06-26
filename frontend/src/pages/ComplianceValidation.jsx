import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { api, formatApiError } from "../lib/api";
import { useToast } from "../components/Toast";
import { Card, CardHeader, Pill, Button, PageHeader, Select } from "../components/ui";
import { ShieldCheck, ShieldAlert, ShieldX, CheckCircle2, XCircle, RefreshCw, ArrowRight } from "lucide-react";

function StatTile({ icon: Icon, tone, value, label, sub }) {
  return (
    <Card className="p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-md grid place-items-center ${tone}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="text-[28px] font-semibold text-ink-900 tnum leading-none">{value}</div>
        <div className="text-[12.5px] font-medium text-ink-900 mt-2">{label}</div>
        <div className="text-[11.5px] text-ink-500">{sub}</div>
      </div>
    </Card>
  );
}

const CHECK_TONE_BG = {
  emerald: "bg-emerald-50 text-emerald-700",
  amber:   "bg-amber-50 text-amber-700",
  rose:    "bg-rose-50 text-rose-700",
};

function CheckRow({ c }) {
  const Icon = c.tone === "emerald" ? CheckCircle2 : c.tone === "amber" ? ShieldAlert : XCircle;
  return (
    <li className="flex items-start gap-3 px-3 py-3 border-b border-ink-200/60 last:border-0">
      <div className={`w-7 h-7 rounded-md grid place-items-center mt-0.5 ${CHECK_TONE_BG[c.tone]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-[13px] font-medium text-ink-900">{c.name}</div>
          <Pill tone={c.tone}>{c.status}</Pill>
        </div>
        <div className="text-[12px] text-ink-500 mt-0.5">{c.detail}</div>
      </div>
    </li>
  );
}

export default function ComplianceValidation() {
  const toast = useToast();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [dossier, setDossier] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/vendors");
        setVendors(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].vendor_id);
        }
      } catch (err) { console.error("load vendors", err); }
    })();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    (async () => {
      try {
        const { data } = await api.get(`/compliance/${selectedId}`);
        setDossier(data);
      } catch (err) { console.error("dossier load", err); }
    })();
  }, [selectedId]);

  const runChecks = async () => {
    if (!selectedId) return;
    setRunning(true);
    try {
      const { data } = await api.post(`/compliance/${selectedId}/run`);
      setDossier(data);
      toast.success("Compliance checks re-run");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally { setRunning(false); }
  };

  if (!dossier && vendors.length === 0) {
    return (
      <AppShell>
        <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto">
          <Card className="p-10 text-center">
            <ShieldCheck className="w-10 h-10 text-ink-300 mx-auto mb-3" />
            <div className="text-ink-800 font-medium">No vendors to validate yet</div>
            <p className="text-[13px] text-ink-500 mt-1">Once vendors submit registration, compliance dossiers will appear here.</p>
          </Card>
        </div>
      </AppShell>
    );
  }

  const queue = vendors.filter((v) => v.vendor_id !== selectedId).slice(0, 5);
  const passing = (dossier?.checks || []).filter((c) => c.tone === "emerald").length;
  const warns = (dossier?.checks || []).filter((c) => c.tone === "amber").length;
  const fails = (dossier?.checks || []).filter((c) => c.tone === "rose").length;
  const total = dossier?.checks?.length || 0;

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow={dossier && (
            <>
              <span className="font-mono">{dossier.vendor_code || dossier.vendor_id}</span>
              <span className="text-ink-300">·</span>
              <span>Compliance review</span>
            </>
          )}
          title={dossier ? `${dossier.legal_name || "Vendor"} — risk dossier` : "Compliance"}
          badges={dossier && (
            <>
              <Pill tone={fails ? "rose" : "emerald"}><ShieldCheck className="w-3 h-3" />{passing} of {total} passing</Pill>
              {warns > 0 && <Pill tone="amber">{warns} warnings</Pill>}
              {fails > 0 && <Pill tone="rose">{fails} hard failures</Pill>}
              <Pill tone="ink">Last run {dossier.last_run_ago || "now"}</Pill>
            </>
          )}
          actions={
            <>
              <Select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-56" data-testid="compliance-vendor-select">
                {vendors.map((v) => <option key={v.vendor_id} value={v.vendor_id}>{v.general?.legal_name || v.vendor_id}</option>)}
              </Select>
              <Button variant="ghost" onClick={runChecks} disabled={running} data-testid="compliance-rerun-btn">
                <RefreshCw className={`w-3.5 h-3.5 ${running ? "animate-spin" : ""}`} /> Re-run all checks
              </Button>
            </>
          }
        />

        {dossier && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <StatTile icon={ShieldCheck} tone="bg-emerald-50 text-emerald-700" value={passing} label="Checks passed" sub="Auto-validated against statutory APIs" />
              <StatTile icon={ShieldAlert} tone="bg-amber-50 text-amber-700" value={warns} label="Warnings to clarify" sub="Action required from vendor" />
              <StatTile icon={ShieldX} tone="bg-rose-50 text-rose-700" value={fails} label="Hard failures" sub="Would block onboarding" />
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader title="Compliance checks" subtitle="Auto-run on submission · re-run any time" />
                <ul className="px-2 pb-4">
                  {dossier.checks.map((c) => <CheckRow key={c.name} c={c} />)}
                </ul>
                <div className="px-5 py-3 bg-ink-50/60 border-t border-ink-200 text-[11px] text-ink-500">
                  ClearTax / GSTN / MCA21 / OFAC integrations — currently using STUBBED responses (no live API key). Wire a real provider to flip this to live.
                </div>
              </Card>

              <Card>
                <CardHeader title="Risk queue" subtitle="Other vendors in your review tray" />
                <ul className="px-2 pb-4">
                  {queue.length === 0 && (
                    <li className="text-[12px] text-ink-500 px-3 py-3">No other pending vendors.</li>
                  )}
                  {queue.map((v) => (
                    <li key={v.vendor_id}
                        onClick={() => navigate(`/vendors/${v.vendor_id}`)}
                        className="px-3 py-3 border-b border-ink-200/60 last:border-0 cursor-pointer hover:bg-ink-50 rounded-md"
                        data-testid={`risk-queue-${v.vendor_id}`}>
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[11.5px] text-ink-500">{v.vendor_code || v.vendor_id}</div>
                        <Pill tone={v.status === "submitted" ? "amber" : v.status === "approved" ? "emerald" : "ink"}>{v.status}</Pill>
                      </div>
                      <div className="text-[13px] font-medium text-ink-900 mt-1">{v.general?.legal_name || "—"}</div>
                      <div className="text-[11.5px] text-ink-500 mt-0.5 flex items-center gap-1">
                        {v.vendor_type} <ArrowRight className="w-3 h-3" />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
