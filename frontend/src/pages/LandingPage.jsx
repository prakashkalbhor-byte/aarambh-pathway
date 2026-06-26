import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileCheck2, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-brand grid place-items-center text-white font-bold text-sm">K</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900 font-heading">Keva Vendor Portal</div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Master Data Management</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" data-testid="header-login-btn">Sign in</Button></Link>
            <Link to="/register"><Button data-testid="header-register-btn">Get started <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative grid-bg">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-muted text-brand text-xs font-mono uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand pulse-dot" /> SAP-Integrated Onboarding
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 font-heading">
              Vendor onboarding,<br />
              <span className="text-brand">engineered for compliance.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Self-serve registration, GSTIN &amp; PAN verification, multi-stage approval workflow, and SAP company-code mapping —
              all in one auditable workspace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/register")} data-testid="hero-register-btn">
                Register as a vendor <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")} data-testid="hero-login-btn">
                I'm a Keva employee
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs text-slate-500 font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> GSTIN-ready</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> MSME compliant</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> SAP S/4HANA</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-card fade-up">
              <div className="rounded-lg bg-slate-50 p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Vendor Record · Preview</div>
                <div className="space-y-2.5 text-sm">
                  <Row label="Vendor Code" mono value="400118" status />
                  <Row label="Legal Name" value="Synthesis Aromatics Pvt Ltd" />
                  <Row label="GSTIN" mono value="27ABCDE1234F1Z5" />
                  <Row label="PAN" mono value="ABCDE1234F" />
                  <Row label="MSME" mono value="UDYAM-MH-12-0001234" />
                  <Row label="Company Code" mono value="1000" />
                  <Row label="Account Group" mono value="KRED" />
                  <Row label="Payment Terms" mono value="NT30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 font-heading">A control room for procurement</h2>
          <p className="text-slate-600 max-w-2xl mb-12">Every role gets purpose-built tooling — vendors, reviewers, approvers, and the SAP team work in one shared system of record.</p>
          <div className="grid md:grid-cols-3 gap-5">
            <Feature icon={Layers} title="Multi-step onboarding" desc="Guided form: General, Compliance (GSTIN/PAN/TAN/MSME), Bank, Contacts, Documents, Review." />
            <Feature icon={ShieldCheck} title="Approval workflow" desc="Submitted → Under Review → Approved with full audit trail and remarks at every step." />
            <Feature icon={FileCheck2} title="SAP mapping" desc="Assign company code (1000/3000/5000), account group KRED, payment terms NT30." />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-mono uppercase tracking-widest">
        © {new Date().getFullYear()} Keva — Vendor Master Data Portal
      </footer>
    </div>
  );
}

function Row({ label, value, mono, status }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1 border-b border-dashed border-slate-200 last:border-0">
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{label}</span>
      <span className={mono ? "font-mono text-sm text-slate-900" : "text-sm text-slate-800"}>
        {value}
        {status && <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Approved</span>}
      </span>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 hover:border-brand/50 transition-colors">
      <div className="w-9 h-9 rounded-md bg-brand-muted text-brand grid place-items-center mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-semibold text-slate-900 mb-1.5 font-heading">{title}</div>
      <div className="text-sm text-slate-600 leading-relaxed">{desc}</div>
    </div>
  );
}
