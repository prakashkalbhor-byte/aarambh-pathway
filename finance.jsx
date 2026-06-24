// Finance Admin — Invoice Automation AI bot with 3-way matching + ClearTax integrations.

const INVOICE_QUEUE = [
  {
    id: "INV-26-0091",
    vendor: "Tirupati Industrial Components Pvt. Ltd.",
    gstin: "27ABCFT1234R1ZP",
    po: "PO-26-04881",
    grn: "GRN-26-02244",
    irn: "a4c8e1f2b9d7e6a3c5f0b8e2d4a7c9f1e5b3d2a8c6f4e9b1d7a3c2f8e0b5d4a9c1",
    receivedAt: "10 May 2026 · 09:14",
    amount: 285400,
    gst: 51372,
    total: 336772,
    aiStatus: "matched",
    confidence: 98,
    threeWay: { po: "ok", grn: "ok", invoice: "ok" },
    checks: {
      einvoice: { ok: true, label: "E-Invoice QR signed by NIC", api: "E-Invoice QR Code Verification" },
      gstin:    { ok: true, label: "Vendor GSTIN Active",       api: "GSTIN Verification — Basic" },
      filing:   { ok: true, label: "GSTR-1 filed for Apr 2026", api: "GST Return Filing Tracker" },
      hsn:      { ok: true, label: "HSN 84831090 · GST 18%",    api: "HSN/SAC & GST Rate Search" },
      bank:     { ok: true, label: "Bank account verified",     api: "Bank Account Verification" },
      tds:      { ok: true, label: "Section 206AB compliant",   api: "Section 206AB Compliance Check" },
    },
    lines: [
      { sku: "MC-7740-S", desc: "Hardened pinion shaft, 25mm", po: 240, grn: 240, inv: 240, rate: 845,  amt: 202800, hsn: "84831090", match: "ok" },
      { sku: "MC-2210-B", desc: "Cast iron bracket, R-series", po: 80,  grn: 80,  inv: 80,  rate: 1032, amt: 82560,  hsn: "73259910", match: "ok" },
    ],
  },
  {
    id: "INV-26-0090",
    vendor: "Saraswati Polymers LLP",
    gstin: "29AAFCS9012R1ZK",
    po: "PO-26-04877",
    grn: "GRN-26-02238",
    irn: "b7f2e8a1c4d9e6f3a2c5b8d1e4f7a9c2b5d8e1f4a7c9b2d5e8f1a4c7b9d2e5f8a1",
    receivedAt: "10 May 2026 · 08:42",
    amount: 412000,
    gst: 74160,
    total: 486160,
    aiStatus: "discrepancy",
    confidence: 76,
    threeWay: { po: "ok", grn: "ok", invoice: "warn" },
    flags: [
      "Invoice qty (520) exceeds GRN accepted qty (492) by 28 units — over-billing risk",
      "HSN 39233010 declared at 12% GST; ClearTax rate API confirms 18% — short tax of ₹15,540",
    ],
    checks: {
      einvoice: { ok: true,  label: "E-Invoice QR signed by NIC",        api: "E-Invoice QR Code Verification" },
      gstin:    { ok: true,  label: "Vendor GSTIN Active",                api: "GSTIN Verification — Basic" },
      filing:   { ok: true,  label: "GSTR-1 filed for Apr 2026",          api: "GST Return Filing Tracker" },
      hsn:      { ok: false, label: "HSN 39233010 — rate mismatch (18%)",  api: "HSN/SAC & GST Rate Search" },
      bank:     { ok: true,  label: "Bank account verified",              api: "Bank Account Verification" },
      tds:      { ok: true,  label: "Section 206AB compliant",            api: "Section 206AB Compliance Check" },
    },
    lines: [
      { sku: "PL-1102", desc: "HDPE sheet, 4mm × 1.2m × 2.4m",   po: 520, grn: 492, inv: 520, rate: 720, amt: 374400, hsn: "39233010", match: "qty" },
      { sku: "PL-2024", desc: "Polyamide bushing, 18mm bore",    po: 50,  grn: 50,  inv: 50,  rate: 752, amt: 37600,  hsn: "39263000", match: "ok"  },
    ],
  },
  {
    id: "INV-26-0089",
    vendor: "Karthikeya Engineering Works",
    gstin: "33AAACK4421B1Z2",
    po: "PO-26-04865",
    grn: "—",
    irn: "—",
    receivedAt: "09 May 2026 · 16:21",
    amount: 87200,
    gst: 15696,
    total: 102896,
    aiStatus: "blocked",
    confidence: 41,
    threeWay: { po: "ok", grn: "missing", invoice: "warn" },
    flags: [
      "No matching GRN found — goods not yet received against PO-26-04865",
      "Vendor's last GSTR-3B was filed 4 months ago (Dec 2025) — flagged by Return Filing Tracker",
      "E-Invoice IRN not provided; mandatory for vendors with turnover > ₹5 Cr",
    ],
    checks: {
      einvoice: { ok: false, label: "No IRN present on invoice",            api: "E-Invoice QR Code Verification" },
      gstin:    { ok: true,  label: "Vendor GSTIN Active",                   api: "GSTIN Verification — Basic" },
      filing:   { ok: false, label: "GSTR-3B overdue 4 months",              api: "GST Return Filing Tracker" },
      hsn:      { ok: true,  label: "HSN 73089090 · GST 18%",                api: "HSN/SAC & GST Rate Search" },
      bank:     { ok: true,  label: "Bank account verified",                 api: "Bank Account Verification" },
      tds:      { ok: false, label: "Apply higher TDS (Sec. 206AB)",          api: "Section 206AB Compliance Check" },
    },
    lines: [
      { sku: "FB-440", desc: "MS plate, hot-rolled, 8mm",   po: 30, grn: 0, inv: 30, rate: 2906, amt: 87180, hsn: "73089090", match: "grn" },
    ],
  },
  {
    id: "INV-26-0088",
    vendor: "Vajra Precision Tools Pvt. Ltd.",
    gstin: "27AAGCV0091L1ZN",
    po: "PO-26-04859",
    grn: "GRN-26-02231",
    irn: "c8e3f7a2d5b1e4f6a9c2b5d8e1f4a7c9b2d5e8f1a4c7b9d2e5f8a1c4d7b2e5f8a1",
    receivedAt: "09 May 2026 · 11:08",
    amount: 624500,
    gst: 112410,
    total: 736910,
    aiStatus: "matched",
    confidence: 99,
    threeWay: { po: "ok", grn: "ok", invoice: "ok" },
    checks: {
      einvoice: { ok: true, label: "E-Invoice QR signed by NIC",        api: "E-Invoice QR Code Verification" },
      gstin:    { ok: true, label: "Vendor GSTIN Active",                api: "GSTIN Verification — Basic" },
      filing:   { ok: true, label: "GSTR-1 filed for Apr 2026",          api: "GST Return Filing Tracker" },
      hsn:      { ok: true, label: "HSN 82079090 · GST 18%",             api: "HSN/SAC & GST Rate Search" },
      bank:     { ok: true, label: "Bank account verified",              api: "Bank Account Verification" },
      tds:      { ok: true, label: "Section 206AB compliant",            api: "Section 206AB Compliance Check" },
    },
    lines: [
      { sku: "PT-901", desc: "Carbide insert, CNMG120408",     po: 1200, grn: 1200, inv: 1200, rate: 387,  amt: 464400, hsn: "82079090", match: "ok" },
      { sku: "PT-902", desc: "Carbide drill bit, 12mm",        po: 200,  grn: 200,  inv: 200,  rate: 805,  amt: 161000, hsn: "82079090", match: "ok" },
    ],
  },
];

const CLEAR_APIS = [
  { name: "E-Invoice QR Code Verification", host: "api.clear.in/clearIdentity/v1/einvoice/verify", status: "live",  calls: "1,284", latency: "210 ms", purpose: "Validate IRN & NIC digital signature on every invoice", category: "Invoice" },
  { name: "Purchase E-Invoice Download",    host: "api.clear.in/clearIdentity/v1/einvoice/purchase", status: "live", calls: "428",  latency: "640 ms", purpose: "Auto-pull all e-invoices raised against our GSTINs", category: "Invoice" },
  { name: "GSTIN Verification — Basic",     host: "api.clear.in/clearIdentity/v1/taxpayer-info",    status: "live",  calls: "962",   latency: "180 ms", purpose: "Confirm vendor GSTIN status, legal name, filing frequency", category: "Vendor" },
  { name: "GSTIN Verification — Advanced",  host: "api.clear.in/clearIdentity/v1/gst-advanced",     status: "live",  calls: "318",   latency: "420 ms", purpose: "Turnover band, HSN, branch & e-invoice applicability", category: "Vendor" },
  { name: "GST Return Filing Tracker",      host: "api.clear.in/clearIdentity/v1/filed-returns",    status: "live",  calls: "612",   latency: "390 ms", purpose: "Detect late or missing GSTR-1 / 3B filings before payment", category: "Compliance" },
  { name: "HSN/SAC & GST Rate Search",      host: "api.clear.in/clearIdentity/v1/hsn",              status: "live",  calls: "1,047", latency: "150 ms", purpose: "Validate declared GST rate against HSN/SAC master", category: "Compliance" },
  { name: "Bank Account Verification",      host: "api.clear.in/clearIdentity/v1/bankDetails/validation", status: "live", calls: "284", latency: "1.2 s", purpose: "Penny-drop check before releasing vendor payment", category: "Payment" },
  { name: "Section 206AB Compliance Check", host: "api.clear.in/clearIdentity/v1/sync/pan/details", status: "live",  calls: "356",   latency: "230 ms", purpose: "Decide if higher TDS rate applies to the vendor", category: "Compliance" },
  { name: "PAN to GSTIN",                   host: "api.clear.in/clearIdentity/v2/pans/get-gstins",  status: "live",  calls: "92",    latency: "260 ms", purpose: "Cross-check all GSTINs registered against a vendor PAN", category: "Vendor" },
  { name: "MCA Company Details",            host: "api.clear.in/clearIdentity/v1/companyDetails",   status: "live",  calls: "47",    latency: "510 ms", purpose: "Strike-off status, directors, paid-up capital", category: "Vendor" },
  { name: "MSME Verification (URN)",        host: "api.clear.in/clearIdentity/v1/UAN/details",      status: "live",  calls: "118",   latency: "340 ms", purpose: "Validate Udyam registration → 45-day MSME SLA", category: "Vendor" },
  { name: "PAN Verification V2",            host: "api.clear.in/clearIdentity/v2/pans/fetch",       status: "sandbox", calls: "12", latency: "—",      purpose: "PAN status + Aadhaar seeding check", category: "Vendor" },
];

// 3-way match cell
const MatchPill = ({ state, label }) => {
  const cfg = {
    ok:      { tone: "green",  icon: <IconCheck size={11} /> },
    warn:    { tone: "amber",  icon: <IconAlertTriangle size={11} /> },
    missing: { tone: "red",    icon: <IconX size={11} /> },
  }[state];
  return <Badge tone={cfg.tone} icon={cfg.icon}>{label}</Badge>;
};

// AI Bot panel — chat-like reasoning trace
const BotPanel = ({ invoice }) => {
  const trace = invoice ? buildTrace(invoice) : null;
  return (
    <Card padded={false} className="overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-ink-200 flex items-center gap-2.5 bg-gradient-to-r from-brand-50 to-violet-50/60">
        <span className="w-8 h-8 grid place-items-center rounded-md bg-brand-900 text-white shadow-pop">
          <IconSparkles size={15} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-ink-900 flex items-center gap-1.5">
            ClearMatch AI
            <Badge tone="violet">v2.4 · Auto-3WM</Badge>
          </div>
          <div className="text-[11px] text-ink-500">Invoice automation bot · powered by ClearTax APIs</div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
        </span>
      </div>

      {!invoice && (
        <div className="flex-1 grid place-items-center px-6 py-10 text-center">
          <div>
            <div className="w-10 h-10 mx-auto rounded-md bg-ink-100 text-ink-500 grid place-items-center mb-3"><IconReceipt size={18} /></div>
            <div className="text-[12.5px] text-ink-500">Select an invoice from the queue to view the AI reasoning trace.</div>
          </div>
        </div>
      )}

      {invoice && (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {trace.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role !== "user" && (
                <span className={`shrink-0 w-7 h-7 rounded-md grid place-items-center text-[10px] font-semibold mt-0.5 ${
                  m.role === "bot"    ? "bg-brand-900 text-white" :
                  m.role === "system" ? "bg-ink-100 text-ink-500" :
                                        "bg-emerald-100 text-emerald-700"
                }`}>
                  {m.role === "bot" ? "AI" : m.role === "system" ? "API" : "✓"}
                </span>
              )}
              <div className={`max-w-[88%] rounded-lg px-3 py-2 text-[12.5px] leading-relaxed ${
                m.role === "user"   ? "bg-ink-900 text-white" :
                m.role === "bot"    ? "bg-white ring-1 ring-inset ring-ink-200" :
                m.role === "system" ? "bg-ink-50 ring-1 ring-inset ring-ink-200 font-mono text-[11px]" :
                                      "bg-emerald-50 ring-1 ring-inset ring-emerald-200 text-emerald-900"
              }`}>
                {m.role === "system" && <div className="text-[9.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1 font-sans">{m.api}</div>}
                {m.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {invoice && (
        <div className="px-4 py-3 border-t border-ink-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              readOnly
              placeholder="Ask ClearMatch — e.g. why was this invoice held?"
              className="flex-1 h-9 px-3 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50 text-ink-500"
            />
            <Button variant="primary" size="sm" leading={<IconSparkles size={12} />}>Ask</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const buildTrace = (inv) => {
  const t = [
    { role: "user", text: `Run 3-way match on ${inv.id}.` },
    { role: "bot",  text: `Pulling PO ${inv.po}, GRN ${inv.grn}, and the inbound invoice. Cross-checking against ClearTax compliance APIs in parallel…` },
    { role: "system", api: "POST /einvoice/verify",  text: `irn: "${inv.irn.slice(0,16)}…"  →  ${inv.checks.einvoice.ok ? '{"valid":true,"signedBy":"NIC"}' : '{"valid":false,"error":"NO_IRN"}'}` },
    { role: "system", api: "GET /taxpayer-info",     text: `gstin: ${inv.gstin}  →  {"status":"ACTIVE","filingFrequency":"MONTHLY"}` },
    { role: "system", api: "GET /filed-returns",     text: `gstin: ${inv.gstin}, fy: 2025-26  →  ${inv.checks.filing.ok ? '{"GSTR1":"Apr 2026","GSTR3B":"Apr 2026"}' : '{"GSTR3B":"Dec 2025 — OVERDUE"}'}` },
    { role: "system", api: "POST /hsn/search",       text: `hsn: ${inv.lines[0].hsn}  →  ${inv.checks.hsn.ok ? '{"rate":18,"match":true}' : '{"declared":12,"actual":18,"match":false}'}` },
  ];
  if (inv.aiStatus === "matched") {
    t.push({ role: "tool", text: `All checks passed. PO ↔ GRN ↔ Invoice quantities and amounts reconcile. Ready for payment release.` });
    t.push({ role: "bot",  text: `Three-way match complete with ${inv.confidence}% confidence. No discrepancies detected. Recommended action: approve & release ${fmtINR(inv.total)}.` });
  } else if (inv.aiStatus === "discrepancy") {
    t.push({ role: "bot", text: `Found ${inv.flags.length} discrepancies that need finance review:` });
    inv.flags.forEach(f => t.push({ role: "bot", text: `• ${f}` }));
    t.push({ role: "bot", text: `Recommended action: hold payment, raise a debit note for the over-billed quantity and request a revised invoice with corrected HSN rate.` });
  } else {
    t.push({ role: "bot", text: `Blocking payment — ${inv.flags.length} hard failures:` });
    inv.flags.forEach(f => t.push({ role: "bot", text: `• ${f}` }));
    t.push({ role: "bot", text: `Recommended action: do not process. Request goods receipt and updated GST filings from vendor before re-submission.` });
  }
  return t;
};

const InvoiceDetail = ({ invoice }) => {
  if (!invoice) return null;
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-200 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11.5px] text-ink-500">
            <span className="font-mono">{invoice.id}</span>
            <span className="text-ink-300">·</span>
            <span>Received {invoice.receivedAt}</span>
          </div>
          <div className="text-[15px] font-semibold text-ink-900 mt-1">{invoice.vendor}</div>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <Badge tone="neutral">GSTIN <span className="font-mono ml-0.5">{invoice.gstin}</span></Badge>
            <Badge tone="neutral">PO <span className="font-mono ml-0.5">{invoice.po}</span></Badge>
            <Badge tone="neutral">GRN <span className="font-mono ml-0.5">{invoice.grn}</span></Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-ink-500 uppercase tracking-wider">Invoice total</div>
          <div className="text-[22px] font-semibold text-ink-900 tnum font-mono mt-0.5">{fmtINR(invoice.total)}</div>
          <div className="text-[11px] text-ink-500 mt-0.5">Base {fmtINR(invoice.amount)} · GST {fmtINR(invoice.gst)}</div>
        </div>
      </div>

      {/* Three-way bar */}
      <div className="px-5 py-4 grid grid-cols-3 gap-3 bg-ink-50/40 border-b border-ink-200">
        {[
          { k: "po",      label: "Purchase Order", ref: invoice.po,  state: invoice.threeWay.po,      icon: <IconFileText size={14} /> },
          { k: "grn",     label: "Goods Receipt",  ref: invoice.grn, state: invoice.threeWay.grn,     icon: <IconTruck size={14} /> },
          { k: "inv",     label: "Vendor Invoice", ref: invoice.id,  state: invoice.threeWay.invoice, icon: <IconReceipt size={14} /> },
        ].map(n => (
          <div key={n.k} className="rounded-md ring-1 ring-inset ring-ink-200 bg-white px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 grid place-items-center rounded bg-ink-100 text-ink-600">{n.icon}</span>
              <span className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">{n.label}</span>
              <span className="ml-auto"><MatchPill state={n.state} label={n.state === "ok" ? "Match" : n.state === "missing" ? "Missing" : "Variance"} /></span>
            </div>
            <div className="font-mono text-[12px] text-ink-900">{n.ref}</div>
          </div>
        ))}
      </div>

      {/* Line items 3-way */}
      <div className="px-5 py-4">
        <SectionTitle hint="Quantities and rates compared across PO, GRN and Invoice.">Line-level reconciliation</SectionTitle>
        <div className="overflow-hidden rounded-md ring-1 ring-inset ring-ink-200">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="bg-ink-50/70 border-b border-ink-200 text-left">
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">SKU</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Description</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">PO</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">GRN</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Invoice</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">HSN</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Amount</th>
                <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Match</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lines.map(l => (
                <tr key={l.sku} className={`border-b border-ink-200/60 last:border-0 ${l.match !== "ok" ? "bg-amber-50/40" : ""}`}>
                  <td className="px-3 py-2 font-mono text-[11.5px] text-ink-900">{l.sku}</td>
                  <td className="px-3 py-2 text-ink-700">{l.desc}</td>
                  <td className="px-3 py-2 text-right font-mono tnum">{l.po}</td>
                  <td className={`px-3 py-2 text-right font-mono tnum ${l.match === "grn" ? "text-rose-700 font-semibold" : ""}`}>{l.grn}</td>
                  <td className={`px-3 py-2 text-right font-mono tnum ${l.match === "qty" ? "text-amber-800 font-semibold" : ""}`}>{l.inv}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-ink-600">{l.hsn}</td>
                  <td className="px-3 py-2 text-right font-mono tnum text-ink-900">{fmtINR(l.amt)}</td>
                  <td className="px-3 py-2 text-right">
                    {l.match === "ok"  && <Badge tone="green" icon={<IconCheck size={10} />}>Match</Badge>}
                    {l.match === "qty" && <Badge tone="amber" icon={<IconAlertTriangle size={10} />}>Qty var.</Badge>}
                    {l.match === "grn" && <Badge tone="red"   icon={<IconX size={10} />}>No GRN</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ClearTax compliance checks */}
      <div className="px-5 pb-4">
        <SectionTitle hint="Six ClearTax API calls fire automatically when an e-invoice is received.">ClearTax compliance checks</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {Object.entries(invoice.checks).map(([k, c]) => (
            <div key={k} className={`flex items-start gap-2.5 rounded-md ring-1 ring-inset px-3 py-2.5 ${c.ok ? "bg-emerald-50/40 ring-emerald-200" : "bg-rose-50/40 ring-rose-200"}`}>
              <span className={`w-6 h-6 grid place-items-center rounded ${c.ok ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"} mt-0.5`}>
                {c.ok ? <IconCheck size={12} /> : <IconX size={12} />}
              </span>
              <div className="min-w-0">
                <div className={`text-[12px] font-medium ${c.ok ? "text-emerald-900" : "text-rose-900"}`}>{c.label}</div>
                <div className="text-[10.5px] text-ink-500 mt-0.5">via {c.api}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] text-ink-500">
          <IconSparkles size={13} className="text-brand-700" />
          AI confidence <span className="font-mono font-semibold text-ink-900">{invoice.confidence}%</span>
          <span className="text-ink-300">·</span>
          <span>{invoice.aiStatus === "matched" ? "Auto-approval ready" : invoice.aiStatus === "discrepancy" ? "Needs finance review" : "Payment blocked"}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" leading={<IconMessageSquare size={13} />}>Request clarification</Button>
          {invoice.aiStatus === "matched"      && <Button variant="success" size="sm" leading={<IconCheck size={13} />}>Approve &amp; pay {fmtINR(invoice.total, { compact: true })}</Button>}
          {invoice.aiStatus === "discrepancy"  && <Button variant="warning" size="sm" leading={<IconAlertTriangle size={13} />}>Hold for review</Button>}
          {invoice.aiStatus === "blocked"      && <Button variant="danger"  size="sm" leading={<IconX size={13} />}>Block & return</Button>}
        </div>
      </div>
    </Card>
  );
};

const ApiIntegrations = () => (
  <Card padded={false}>
    <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
      <div>
        <h3 className="text-[14px] font-semibold text-ink-900">ClearTax API integrations</h3>
        <p className="text-[12px] text-ink-500 mt-0.5">12 of 14 endpoints live · 5,580 calls today · avg latency 312 ms</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge tone="green" icon={<IconCheck size={11} />}>All endpoints healthy</Badge>
        <Button variant="secondary" size="sm" leading={<IconSettings size={13} />}>Manage keys</Button>
      </div>
    </div>
    <DataTable
      columns={[
        { key: "name", label: "API",
          render: r => (
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold text-ink-900">{r.name}</div>
              <div className="text-[10.5px] text-ink-500 font-mono truncate">{r.host}</div>
            </div>
          )
        },
        { key: "category", label: "Category", render: r => <Badge tone="neutral">{r.category}</Badge> },
        { key: "purpose",  label: "Used for", render: r => <span className="text-ink-600 text-[12px]">{r.purpose}</span> },
        { key: "calls",    label: "Calls today", align: "right", render: r => <span className="font-mono tnum text-[12px]">{r.calls}</span> },
        { key: "latency",  label: "p95 latency", align: "right", render: r => <span className="font-mono tnum text-[12px] text-ink-600">{r.latency}</span> },
        { key: "status",   label: "Status",
          render: r => r.status === "live"
            ? <Badge tone="green" icon={<IconCheck size={11} />}>Live</Badge>
            : <Badge tone="amber">Sandbox</Badge>
        },
      ]}
      rows={CLEAR_APIS}
    />
  </Card>
);

const Finance = () => {
  const [selectedId, setSelectedId] = React.useState(INVOICE_QUEUE[0].id);
  const [tab, setTab] = React.useState("queue");
  const selected = INVOICE_QUEUE.find(i => i.id === selectedId);

  const stats = [
    { label: "Invoices today",        v: "47",   d: "+12 vs. yesterday",            icon: <IconReceipt size={16} />, tone: "blue" },
    { label: "Auto-matched by AI",     v: "38",   d: "81% straight-through",          icon: <IconSparkles size={16}/>, tone: "violet" },
    { label: "Held for review",       v: "6",    d: fmtINR(1284000, { compact: true }) + " on hold", icon: <IconAlertTriangle size={16}/>, tone: "amber" },
    { label: "Blocked / rejected",    v: "3",    d: "GRN missing · filing overdue",   icon: <IconX size={16}/>, tone: "red" },
  ];
  const toneRing = {
    blue:   "bg-brand-50  text-brand-700",
    violet: "bg-violet-50 text-violet-700",
    amber:  "bg-amber-50  text-amber-700",
    red:    "bg-rose-50   text-rose-700",
  };

  return (
    <div className="px-8 py-7 space-y-5">
      {/* Hero header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-ink-500">
            <span>Finance · Accounts payable</span>
            <span className="text-ink-300">·</span>
            <span>FY 26-27</span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900 mt-1 flex items-center gap-2">
            Invoice Automation
            <Badge tone="violet" icon={<IconSparkles size={11} />}>ClearMatch AI · 3-way matching</Badge>
          </h1>
          <p className="text-[13px] text-ink-500 mt-1">
            Every incoming e-invoice is reconciled against its PO and GRN, then compliance-checked through 6 ClearTax APIs before it reaches finance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconUpload size={14} />}>Upload invoice</Button>
          <Button variant="primary"   size="md" leading={<IconSparkles size={14} />}>Run bot on queue</Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="!p-5">
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 grid place-items-center rounded-md ${toneRing[s.tone]}`}>{s.icon}</div>
            </div>
            <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{s.label}</div>
            <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{s.v}</div>
            <div className="text-[11.5px] text-ink-500 mt-1">{s.d}</div>
          </Card>
        ))}
      </div>

      <Card padded={false}>
        <div className="px-3 pt-3">
          <Tabs
            tabs={[
              { id: "queue", label: "Invoice queue", count: INVOICE_QUEUE.length },
              { id: "apis",  label: "ClearTax APIs", count: CLEAR_APIS.length },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {tab === "queue" && (
          <DataTable
            onRowClick={r => setSelectedId(r.id)}
            columns={[
              { key: "id", label: "Invoice",
                render: r => (
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedId === r.id ? "bg-brand-600" : "bg-transparent"}`} />
                    <div>
                      <div className="font-mono text-[12.5px] text-ink-900">{r.id}</div>
                      <div className="text-[11px] text-ink-500">{r.receivedAt}</div>
                    </div>
                  </div>
                )
              },
              { key: "vendor", label: "Vendor",
                render: r => (
                  <div>
                    <div className="text-[12.5px] font-medium text-ink-900">{r.vendor}</div>
                    <div className="text-[11px] text-ink-500 font-mono">{r.gstin}</div>
                  </div>
                )
              },
              { key: "po",  label: "PO / GRN",
                render: r => (
                  <div className="text-[11.5px] font-mono">
                    <div className="text-ink-700">{r.po}</div>
                    <div className={r.grn === "—" ? "text-rose-600" : "text-ink-500"}>{r.grn}</div>
                  </div>
                )
              },
              { key: "total", label: "Amount", align: "right",
                render: r => <span className="font-mono tnum text-[12.5px] text-ink-900">{fmtINR(r.total)}</span>
              },
              { key: "confidence", label: "AI confidence", align: "right",
                render: r => (
                  <div className="inline-flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-ink-200 overflow-hidden">
                      <div className={`h-full ${r.confidence >= 90 ? "bg-emerald-500" : r.confidence >= 70 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: r.confidence + "%" }} />
                    </div>
                    <span className="font-mono tnum text-[11.5px] text-ink-700 w-7 text-right">{r.confidence}%</span>
                  </div>
                )
              },
              { key: "aiStatus", label: "Bot verdict",
                render: r => {
                  if (r.aiStatus === "matched")     return <Badge tone="green"  icon={<IconCheck size={11} />}>Auto-approved</Badge>;
                  if (r.aiStatus === "discrepancy") return <Badge tone="amber"  icon={<IconAlertTriangle size={11} />}>Held — discrepancy</Badge>;
                  return <Badge tone="red" icon={<IconX size={11} />}>Blocked</Badge>;
                }
              },
            ]}
            rows={INVOICE_QUEUE}
          />
        )}

        {tab === "apis" && (
          <div className="p-5"><ApiIntegrations /></div>
        )}
      </Card>

      {/* Detail + Bot */}
      {tab === "queue" && (
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3"><InvoiceDetail invoice={selected} /></div>
          <div className="col-span-2"><BotPanel invoice={selected} /></div>
        </div>
      )}
    </div>
  );
};

window.Finance = Finance;
