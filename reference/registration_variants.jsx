// Registration variants — vendor type picker + flow routing.
// 5 vendor types:
//   1. Local Company   → uses the existing 4-step GSTIN flow (Registration)
//   2. Import Company  → SimpleRegistration (PAN + Bank + Docs compulsory, all else optional)
//   3. LLP             → SimpleRegistration
//   4. Local/Import Individual or Proprietor → SimpleRegistration
//   5. Employee        → SimpleRegistration

// ---------- Shared chrome ----------
const RV_StepHeader = ({ title, subtitle, type }) => (
  <div className="px-8 pt-8 pb-6 border-b border-ink-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-[12px] text-ink-500">
        <span className="font-mono">SIMPLIFIED FORM</span>
        <span className="text-ink-300">·</span>
        <span>Vendor onboarding · {type}</span>
      </div>
      <button className="text-[12px] text-ink-500 hover:text-ink-800 inline-flex items-center gap-1">
        <IconClock size={13} /> Save &amp; continue later
      </button>
    </div>
    <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">{title}</h1>
    {subtitle && <p className="text-[13.5px] text-ink-500 mt-1.5 max-w-2xl">{subtitle}</p>}
  </div>
);

const RV_DocRow = ({ doc, onUpload, mockOcr }) => {
  const ref = React.useRef(null);
  return (
    <div className="py-3.5 border-b border-ink-200/60 last:border-0 flex items-center gap-4">
      <div className={`w-9 h-9 grid place-items-center rounded-md ${doc.uploaded ? "bg-emerald-50 text-emerald-700" : doc.required ? "bg-rose-50 text-rose-700" : "bg-ink-100 text-ink-500"}`}>
        <IconFileText size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium text-ink-900">{doc.label}</div>
        <div className="text-[11.5px] text-ink-500">
          {doc.uploaded ? `${doc.filename} · ${doc.size}` : `${doc.accept || "PDF / JPG"} · Max ${doc.max || "5 MB"}`}
        </div>
      </div>
      {doc.uploaded && mockOcr && (
        <Badge tone="green" icon={<IconCheck size={11} />}>OCR matched</Badge>
      )}
      {doc.uploaded
        ? <Badge tone="green" icon={<IconCheck size={11} />}>Uploaded</Badge>
        : doc.required
          ? <Badge tone="red" icon={<IconAlertTriangle size={11} />}>Required</Badge>
          : <Badge tone="neutral">Optional</Badge>}
      <input ref={ref} type="file" hidden onChange={e => onUpload(doc.id, e.target.files?.[0])} />
      <Button variant={doc.required && !doc.uploaded ? "primary" : "secondary"} size="sm"
        onClick={() => ref.current?.click()} leading={<IconUpload size={13} />}>
        {doc.uploaded ? "Replace" : "Upload"}
      </Button>
    </div>
  );
};

// =====================================================================================
// PER-TYPE CONFIG — drives the SimpleRegistration form
// =====================================================================================
const COUNTRIES = ["United States","United Kingdom","Singapore","Germany","Netherlands","Ireland","UAE","Australia","Japan","China","Hong Kong","South Korea","France","Switzerland","Canada"];
const STATES_IN = ["Maharashtra","Karnataka","Tamil Nadu","Delhi","Gujarat","Telangana","Haryana","West Bengal","Uttar Pradesh","Madhya Pradesh","Rajasthan","Andhra Pradesh","Kerala","Punjab","Goa","Odisha","Other"];

const TYPE_CONFIGS = {
  importCo: {
    label: "Import Company",
    typeTag: "Import Vendor",
    title: "Register your import company",
    subtitle: "A verified bank account and supporting documents are mandatory. Indian PAN is optional — most foreign entities do not have one. All other details can be filled in later.",
    accent: "violet",
    bankMode: "swift", // SWIFT validation instead of penny-drop
    panRequired: false, // foreign entities typically don't have an Indian PAN
    optionalFields: [
      { id: "legalName",    label: "Legal name (as on certificate of incorporation)" },
      { id: "country",      label: "Country of incorporation", type: "select", options: COUNTRIES },
      { id: "currency",     label: "Invoice currency", type: "select", options: ["USD","GBP","EUR","SGD","AED","JPY","AUD"] },
      { id: "regNo",        label: "Business registration number", mono: true },
      { id: "incorpDate",   label: "Date of incorporation", placeholder: "DD MMM YYYY" },
      { id: "foreignTIN",   label: "Foreign TIN / EIN", mono: true },
      { id: "iec",          label: "Import Export Code (IEC)", mono: true },
      { id: "swift",        label: "SWIFT / BIC code", mono: true },
      { id: "address",      label: "Registered address", type: "textarea", colSpan: 2 },
      { id: "contactName",  label: "Primary contact name" },
      { id: "contactEmail", label: "Contact email" },
      { id: "contactPhone", label: "Contact phone (with country code)", mono: true },
      { id: "natureOfGoods",label: "Nature of goods / services" },
    ],
    docs: [
      { id: "pan",      label: "PAN Card (Indian PAN of the entity)",           required: false, accept: "PDF / JPG", max: "2 MB" },
      { id: "bank",     label: "Bank confirmation letter / Voided check",        required: true,  accept: "PDF / JPG", max: "5 MB" },
      { id: "incorp",   label: "Certificate of Incorporation",                   required: true,  accept: "PDF",       max: "10 MB" },
      { id: "trc",      label: "Tax Residency Certificate (TRC)",                required: false, accept: "PDF",       max: "5 MB" },
      { id: "w8",       label: "Form W-8BEN-E / local equivalent",               required: false, accept: "PDF",       max: "5 MB" },
      { id: "iec",      label: "IEC Certificate",                                required: false, accept: "PDF",       max: "5 MB" },
      { id: "brochure", label: "Product / Company brochure",                     required: false, accept: "PDF",       max: "10 MB" },
    ],
  },
  llp: {
    label: "LLP",
    typeTag: "Limited Liability Partnership",
    title: "Register your LLP",
    subtitle: "We need only three things to start — the LLP's PAN, a bank account and your supporting documents. Everything else is optional and helps speed up approval.",
    accent: "indigo",
    bankMode: "penny",
    optionalFields: [
      { id: "llpName",       label: "LLP name (as on certificate)" },
      { id: "llpin",         label: "LLPIN", mono: true, placeholder: "AAB-1234" },
      { id: "incorpDate",    label: "Date of incorporation", placeholder: "DD MMM YYYY" },
      { id: "regState",      label: "State of registration", type: "select", options: STATES_IN },
      { id: "gstin",         label: "GSTIN", mono: true, placeholder: "27ABCFL1234R1ZP" },
      { id: "tan",           label: "TAN", mono: true },
      { id: "udyam",         label: "Udyam Registration (MSME)", mono: true },
      { id: "address",       label: "Registered office address", type: "textarea", colSpan: 2 },
      { id: "designatedPartner",label: "Designated partner name" },
      { id: "partnerDIN",    label: "Designated partner DIN", mono: true },
      { id: "contactEmail",  label: "Contact email" },
      { id: "contactPhone",  label: "Contact phone", mono: true },
      { id: "businessLine",  label: "Business / service category" },
    ],
    docs: [
      { id: "pan",          label: "LLP PAN Card",                              required: true,  accept: "PDF / JPG", max: "2 MB" },
      { id: "bank",         label: "Cancelled cheque or bank statement",         required: true,  accept: "JPG / PDF", max: "2 MB" },
      { id: "llpCert",      label: "LLP Incorporation Certificate (MCA)",        required: true,  accept: "PDF",       max: "5 MB" },
      { id: "llpAgreement", label: "LLP Agreement",                              required: false, accept: "PDF",       max: "10 MB" },
      { id: "gst",          label: "GST Registration Certificate",               required: false, accept: "PDF",       max: "5 MB" },
      { id: "partnerKYC",   label: "Designated partners — PAN & address proof",  required: false, accept: "PDF",       max: "5 MB" },
      { id: "udyam",        label: "Udyam (MSME) certificate",                   required: false, accept: "PDF",       max: "2 MB" },
    ],
  },
  individual: {
    label: "Individual / Proprietor",
    typeTag: "Local or Import Individual",
    title: "Register as an Individual or Proprietor",
    subtitle: "Whether you're a local freelancer or invoicing from abroad — PAN, your bank account and a couple of documents are all that's required. Add anything else if you have it.",
    accent: "amber",
    bankMode: "penny",
    typeToggle: {
      id: "scope",
      options: [
        { k: "local",  label: "Local — I'm based in India" },
        { k: "import", label: "Import — I invoice from outside India" },
      ],
    },
    optionalFields: [
      { id: "fullName",     label: "Full name (as per PAN)" },
      { id: "tradeName",    label: "Trade / business name (optional)" },
      { id: "aadhaar",      label: "Aadhaar — last 4 digits", maxLength: 4, mono: true, scope: "local" },
      { id: "gstin",        label: "GSTIN (if registered)", mono: true, scope: "local" },
      { id: "foreignTIN",   label: "Foreign TIN / tax ID", mono: true, scope: "import" },
      { id: "country",      label: "Country of residence", type: "select", options: ["India", ...COUNTRIES] },
      { id: "address",      label: "Address", type: "textarea", colSpan: 2 },
      { id: "email",        label: "Email" },
      { id: "phone",        label: "Mobile / phone", mono: true },
      { id: "services",     label: "Nature of services / goods" },
      { id: "turnover",     label: "Aggregate turnover this FY (₹ Lakh)", mono: true, scope: "local" },
    ],
    docs: [
      { id: "pan",      label: "PAN Card",                                       required: true,  accept: "PDF / JPG", max: "2 MB" },
      { id: "bank",     label: "Cancelled cheque or bank pass-book",              required: true,  accept: "JPG / PDF", max: "2 MB" },
      { id: "addr",     label: "Address proof (Aadhaar / Passport / Utility)",   required: true,  accept: "PDF / JPG", max: "2 MB" },
      { id: "gst",      label: "GST Certificate",                                 required: false, accept: "PDF",       max: "5 MB" },
      { id: "decl",     label: "GST self-declaration (if below threshold)",       required: false, accept: "PDF",       max: "2 MB" },
      { id: "trc",      label: "Tax Residency Certificate (Import only)",         required: false, accept: "PDF",       max: "5 MB" },
      { id: "portfolio",label: "Portfolio / capabilities deck",                   required: false, accept: "PDF",       max: "10 MB" },
    ],
  },
  employee: {
    label: "Employee",
    typeTag: "Internal — Reimbursements",
    title: "Register yourself for reimbursements",
    subtitle: "Just three things — your PAN, the bank account where you want money credited, and your employee ID card. Everything else is optional.",
    accent: "emerald",
    bankMode: "penny",
    optionalFields: [
      { id: "empId",          label: "Employee ID", mono: true, placeholder: "EMP-08214" },
      { id: "fullName",       label: "Full name (as per HRIS)" },
      { id: "dept",           label: "Department" },
      { id: "manager",        label: "Reporting manager" },
      { id: "email",          label: "Office email" },
      { id: "phone",          label: "Mobile", mono: true },
      { id: "office",         label: "Office location" },
      { id: "purpose",        label: "What will you use this for?", type: "select",
        options: ["Expense reimbursements","Travel advances","Petty cash float","Other"] },
      { id: "defaultCategory",label: "Default expense category", type: "select",
        options: ["Travel — Domestic","Travel — International","Meals & entertainment","Office supplies","Client gifts","Other"] },
    ],
    docs: [
      { id: "pan",     label: "PAN Card",                  required: true,  accept: "PDF / JPG", max: "2 MB" },
      { id: "bank",    label: "Cancelled cheque",          required: true,  accept: "JPG / PNG", max: "2 MB" },
      { id: "idCard",  label: "Employee ID card (front)",   required: true,  accept: "JPG / PNG", max: "2 MB" },
      { id: "aadh",    label: "Aadhaar (masked)",          required: false, accept: "PDF",       max: "2 MB" },
    ],
  },
};

// =====================================================================================
// SIMPLE REGISTRATION — used by Import Co, LLP, Individual, Employee
// =====================================================================================
const RequirementChip = ({ ok, label, icon, optional = false }) => (
  <div className={`flex items-center gap-2 rounded-md px-3 py-2 ring-1 ring-inset ${optional ? "ring-ink-200 bg-ink-50/60" : ok ? "ring-emerald-200 bg-emerald-50/60" : "ring-rose-200 bg-rose-50/40"}`}>
    <span className={`w-7 h-7 grid place-items-center rounded-md ${optional ? "bg-ink-200 text-ink-600" : ok ? "bg-emerald-600 text-white" : "bg-white text-rose-600 ring-1 ring-inset ring-rose-200"}`}>
      {optional ? icon : ok ? <IconCheck size={14} /> : icon}
    </span>
    <div className="min-w-0">
      <div className={`text-[12px] font-semibold ${optional ? "text-ink-700" : ok ? "text-emerald-900" : "text-rose-900"}`}>{label}</div>
      <div className="text-[10.5px] text-ink-500">{optional ? "Optional for this category" : ok ? "Completed" : "Required to submit"}</div>
    </div>
  </div>
);

const OptionalField = ({ field, value, onChange }) => {
  if (field.type === "select") {
    return (
      <select
        className="w-full h-10 px-2.5 text-[13px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
        value={value || ""}
        onChange={e => onChange(field.id, e.target.value)}
      >
        <option value="">— Select —</option>
        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === "textarea") {
    return <Textarea rows={2} placeholder={field.placeholder} value={value || ""} onChange={e => onChange(field.id, e.target.value)} />;
  }
  return (
    <Input
      mono={field.mono}
      maxLength={field.maxLength}
      placeholder={field.placeholder}
      value={value || ""}
      onChange={e => onChange(field.id, field.mono ? e.target.value.toUpperCase() : e.target.value)}
    />
  );
};

const SimpleRegistration = ({ config, onBack, onSubmit }) => {
  const [v, setV] = React.useState({
    pan: "", panStatus: "idle",
    accNo: "", accNo2: "", ifsc: "", accName: "", bankStatus: "idle",
    optional: {},
    docs: config.docs.map(d => ({ ...d })),
    scope: config.typeToggle?.options[0].k,
  });
  const [optExpanded, setOptExpanded] = React.useState(false);

  const setOpt = (id, val) => setV(s => ({ ...s, optional: { ...s.optional, [id]: val } }));

  const verifyPan = () => {
    if (!v.pan || v.pan.length < 10) return;
    setV(s => ({ ...s, panStatus: "verifying" }));
    setTimeout(() => setV(s => ({ ...s, panStatus: "ok", panName: deriveName(s.pan, config) })), 1100);
  };
  const verifyBank = () => {
    if (!v.accNo || !v.ifsc) return;
    setV(s => ({ ...s, bankStatus: "verifying" }));
    setTimeout(() => setV(s => ({
      ...s, bankStatus: "ok",
      bankResult: config.bankMode === "swift"
        ? { bank: "JPMorgan Chase, N.A.", branch: "New York · Routing 021000021", method: "SWIFT directory match · BIC active", beneficiary: s.accName || "—" }
        : { bank: bankFromIfsc(s.ifsc), branch: "Auto-resolved from IFSC", method: "Penny-drop · ₹1.00 credited", beneficiary: (s.accName || "Account holder").toUpperCase() },
    })), 1400);
  };

  const onUploadDoc = (id, file) => {
    if (!file) return;
    setV(s => ({
      ...s,
      docs: s.docs.map(d => d.id === id ? { ...d, uploaded: true, filename: file.name, size: (file.size/1024).toFixed(0) + " KB" } : d),
    }));
  };

  const requiredDocsDone = v.docs.filter(d => d.required).every(d => d.uploaded);
  const panOk = v.panStatus === "ok";
  const bankOk = v.bankStatus === "ok";
  const panRequired = config.panRequired !== false;
  const canSubmit = (panRequired ? panOk : true) && bankOk && requiredDocsDone;

  const optionalFiltered = (config.optionalFields || []).filter(f => !f.scope || f.scope === v.scope);

  return (
    <div className="bg-ink-50 min-h-full">
      <div className="max-w-5xl mx-auto py-6 px-2">
        <Card padded={false} className="overflow-hidden">
          <RV_StepHeader title={config.title} subtitle={config.subtitle} type={config.typeTag} />

          {/* Requirement strip */}
          <div className="px-8 pt-6">
            <div className="grid grid-cols-3 gap-3">
              <RequirementChip ok={panRequired ? panOk : true}          label={panRequired ? "PAN verification" : "PAN · not required"}        icon={<IconShield size={13} />} optional={!panRequired} />
              <RequirementChip ok={bankOk}          label="Bank account verification" icon={<IconBank size={13} />} />
              <RequirementChip ok={requiredDocsDone} label="Required documents"      icon={<IconFileText size={13} />} />
            </div>
          </div>

          {/* Scope toggle (for Individual) */}
          {config.typeToggle && (
            <div className="px-8 pt-6">
              <Card padded={false} className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mb-2.5">{config.typeToggle.id === "scope" ? "Are you local or international?" : config.typeToggle.id}</div>
                <div className="grid grid-cols-2 gap-2">
                  {config.typeToggle.options.map(o => (
                    <label key={o.k} className={`p-3 rounded-md ring-1 ring-inset cursor-pointer ${v.scope === o.k ? "ring-ink-900 bg-ink-50" : "ring-ink-200 hover:bg-ink-50/40"}`}>
                      <input type="radio" name="scope" className="sr-only" checked={v.scope === o.k} onChange={() => setV(s => ({...s, scope: o.k}))} />
                      <div className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full ring-2 grid place-items-center ${v.scope === o.k ? "ring-ink-900 bg-ink-900" : "ring-ink-300"}`}>
                          {v.scope === o.k && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="text-[12.5px] font-semibold text-ink-900">{o.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Compulsory: PAN + Bank */}
          <div className="px-8 pt-6 space-y-4">
            <Card padded={false} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[13px] font-semibold tracking-wide text-ink-800 uppercase">{panRequired ? "Compulsory information" : "Identity & bank"}</h3>
                  <p className="text-[12px] text-ink-500 mt-0.5">{panRequired ? "PAN and a bank account — verified live before we accept your application." : "Only a verified bank account is mandatory for import vendors. PAN is optional — add it if you have an Indian PAN."}</p>
                </div>
                <Badge tone={panRequired ? "red" : "amber"} icon={panRequired ? <IconAlertTriangle size={11} /> : <IconInfo size={11} />}>{panRequired ? "Required" : "Bank required · PAN optional"}</Badge>
              </div>

              {/* PAN */}
              <div className="rounded-md ring-1 ring-inset ring-ink-200 p-4 mb-3">
                <div className="flex items-end gap-3">
                  <Field label={panRequired ? "PAN" : "PAN (optional)"} hint="10-character Permanent Account Number" className="flex-1">
                    <Input mono maxLength={10} placeholder="ABCDE1234F"
                      value={v.pan} onChange={e => setV(s => ({ ...s, pan: e.target.value.toUpperCase(), panStatus: "idle" }))} />
                  </Field>
                  <div className="pb-[2px]">
                    <Button variant="primary" size="md" onClick={verifyPan} disabled={v.panStatus === "verifying" || v.panStatus === "ok" || v.pan.length < 10}>
                      {v.panStatus === "verifying" ? <>Verifying <Dots /></> : v.panStatus === "ok" ? <><IconCheck size={14} /> Verified</> : "Verify PAN"}
                    </Button>
                  </div>
                </div>
                {panOk && (
                  <div className="mt-3 rounded-md bg-emerald-50 ring-1 ring-inset ring-emerald-200 px-3 py-2 flex items-center gap-2 text-[12px] text-emerald-900">
                    <IconCheckCircle size={14} />
                    <span>Name on PAN: <strong>{v.panName}</strong></span>
                    <span className="text-emerald-700/80 ml-auto font-mono text-[11px]">Section 206AB · Compliant</span>
                  </div>
                )}
              </div>

              {/* Bank */}
              <div className="rounded-md ring-1 ring-inset ring-ink-200 p-4">
                <div className="text-[12.5px] font-medium text-ink-800 mb-2">Bank account for payments</div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Account number">
                    <Input mono placeholder={config.bankMode === "swift" ? "IBAN / Account no." : "0089127447712"}
                      value={v.accNo} onChange={e => setV(s => ({ ...s, accNo: e.target.value, bankStatus: "idle" }))} />
                  </Field>
                  <Field label="Re-enter account number">
                    <Input mono value={v.accNo2} onChange={e => setV(s => ({ ...s, accNo2: e.target.value, bankStatus: "idle" }))} />
                  </Field>
                  <Field label={config.bankMode === "swift" ? "SWIFT / BIC code" : "IFSC"}>
                    <Input mono maxLength={config.bankMode === "swift" ? 11 : 11}
                      placeholder={config.bankMode === "swift" ? "CHASUS33XXX" : "HDFC0000891"}
                      value={v.ifsc} onChange={e => setV(s => ({ ...s, ifsc: e.target.value.toUpperCase(), bankStatus: "idle" }))} />
                  </Field>
                  <Field label="Account holder name (as per bank)">
                    <Input placeholder="Name on bank record"
                      value={v.accName} onChange={e => setV(s => ({ ...s, accName: e.target.value, bankStatus: "idle" }))} />
                  </Field>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-[11px] text-ink-500 inline-flex items-center gap-1">
                    <IconInfo size={11} />
                    {config.bankMode === "swift" ? "SWIFT/BIC is validated against the global BIC directory." : "We send ₹1 (penny-drop) to confirm the account and name. Refunded automatically."}
                  </div>
                  <Button variant="primary" size="sm" onClick={verifyBank}
                    disabled={v.bankStatus === "verifying" || v.bankStatus === "ok" || !v.accNo || !v.ifsc || v.accNo !== v.accNo2}>
                    {v.bankStatus === "verifying"
                      ? <>{config.bankMode === "swift" ? "Validating SWIFT" : "Sending penny-drop"} <Dots /></>
                      : v.bankStatus === "ok"
                      ? <><IconCheck size={13} /> Account verified</>
                      : "Verify account"}
                  </Button>
                </div>
                {bankOk && v.bankResult && (
                  <div className="mt-3 rounded-md bg-emerald-50 ring-1 ring-inset ring-emerald-200 px-3 py-2.5 text-[12px] text-emerald-900">
                    <div className="flex items-center gap-2 mb-1.5">
                      <IconBank size={13} />
                      <span className="font-semibold">{v.bankResult.method}</span>
                      <span className="ml-auto"><Badge tone="green">Match confidence 98%</Badge></span>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-0.5 pl-5 text-[11.5px] text-emerald-800">
                      <div><span className="text-emerald-700/70">Bank:</span> <strong>{v.bankResult.bank}</strong></div>
                      <div><span className="text-emerald-700/70">Branch:</span> {v.bankResult.branch}</div>
                      <div><span className="text-emerald-700/70">Beneficiary:</span> <span className="font-mono">{v.bankResult.beneficiary}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Compulsory documents */}
            <Card padded={false} className="p-5">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-[13px] font-semibold tracking-wide text-ink-800 uppercase">Required documents</h3>
                  <p className="text-[12px] text-ink-500 mt-0.5">Each upload is processed by our OCR reader and cross-checked against the PAN and bank info above.</p>
                </div>
                <Badge tone="red" icon={<IconAlertTriangle size={11} />}>Required</Badge>
              </div>
              <div className="-mt-1">
                {v.docs.filter(d => d.required).map(d => <RV_DocRow key={d.id} doc={d} onUpload={onUploadDoc} mockOcr />)}
              </div>
            </Card>

            {/* Optional details */}
            <Card padded={false} className="overflow-hidden">
              <button onClick={() => setOptExpanded(e => !e)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-ink-50/60">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 grid place-items-center rounded-md bg-ink-100 text-ink-600"><IconSparkles size={14} /></span>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-ink-900">Additional details &amp; optional documents</div>
                    <div className="text-[11.5px] text-ink-500">Everything below is optional — but providing it gets your account approved faster.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="neutral">Optional</Badge>
                  <IconChevronDown size={16} className={`text-ink-500 transition-transform ${optExpanded ? "rotate-180" : ""}`} />
                </div>
              </button>
              {optExpanded && (
                <div className="border-t border-ink-200 px-5 py-5 space-y-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mb-2.5">Additional details</div>
                    <div className="grid grid-cols-2 gap-3">
                      {optionalFiltered.map(f => (
                        <div key={f.id} className={f.colSpan === 2 ? "col-span-2" : ""}>
                          <Field label={f.label + " (optional)"}>
                            <OptionalField field={f} value={v.optional[f.id]} onChange={setOpt} />
                          </Field>
                        </div>
                      ))}
                    </div>
                  </div>

                  {v.docs.filter(d => !d.required).length > 0 && (
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Optional documents</div>
                      <div className="-mt-1">
                        {v.docs.filter(d => !d.required).map(d => <RV_DocRow key={d.id} doc={d} onUpload={onUploadDoc} />)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 mt-6 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={onBack} leading={<IconChevronLeft size={14} />}>Change vendor type</Button>
            <div className="flex items-center gap-3 text-[12px] text-ink-500">
              <span>Need help? <a className="text-brand-700 hover:underline">Talk to a specialist</a></span>
              <Button variant="success" size="md" onClick={onSubmit} disabled={!canSubmit} trailing={<IconCheck size={14} />}>
                Submit application
              </Button>
            </div>
          </div>
        </Card>

        {!canSubmit && (
          <div className="mt-4 rounded-lg bg-amber-50 ring-1 ring-inset ring-amber-200 px-4 py-3 flex items-start gap-3">
            <IconInfo size={16} className="text-amber-700 mt-0.5" />
            <div className="text-[12.5px] text-amber-900">
              <strong>To submit:</strong> verify your PAN, verify your bank account, and upload all documents marked <em>Required</em>. Optional fields can be skipped or filled later from your vendor dashboard.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// helpers for simple mock results
const deriveName = (pan, cfg) => {
  if (cfg.label === "LLP")        return "TIRUPATI INDUSTRIAL LLP";
  if (cfg.label === "Employee")   return "PRIYA SUBRAMANIAN";
  if (cfg.label === "Import Company") return "LATTICE CLOUD INC";
  return "ANAND R PILLAI";
};
const bankFromIfsc = (ifsc) => {
  const code = (ifsc || "").slice(0, 4).toUpperCase();
  const map = { HDFC: "HDFC Bank", ICIC: "ICICI Bank", SBIN: "State Bank of India", AXIS: "Axis Bank", KKBK: "Kotak Mahindra Bank", UTIB: "Axis Bank", PUNB: "Punjab National Bank", IDFB: "IDFC First Bank" };
  return map[code] || "Issuing Bank";
};

// =====================================================================================
// VENDOR TYPE PICKER
// =====================================================================================
const VENDOR_TYPES = [
  { id: "company",    label: "Local Company",         tagline: "Pvt Ltd, Public Ltd, OPC, Partnership firm",
    icon: <IconBuilding size={20} />, steps: 4, badge: "GSTIN + PAN + bank + docs",
    docs: ["GST Reg. Cert.","PAN","Cancelled cheque","Brochure (optional)"],
    accent: "indigo" },
  { id: "importCo",   label: "Import Company",         tagline: "Entity registered outside India",
    icon: <IconArrowUpRight size={20} />, steps: 1, badge: "PAN + bank + docs · everything else optional",
    docs: ["PAN","Bank letter","Cert. of Incorporation","TRC (optional)"],
    accent: "violet" },
  { id: "llp",        label: "LLP",                    tagline: "Limited Liability Partnership",
    icon: <IconShield size={20} />, steps: 1, badge: "PAN + bank + docs · everything else optional",
    docs: ["PAN","Cancelled cheque","LLP Incorp. Cert.","LLP Agreement (optional)"],
    accent: "indigo" },
  { id: "individual", label: "Individual or Proprietor", tagline: "Local freelancer, sole proprietor — or invoicing from abroad",
    icon: <IconUser size={20} />, steps: 1, badge: "PAN + bank + docs · everything else optional",
    docs: ["PAN","Cancelled cheque","Address proof","GST cert. (optional)"],
    accent: "amber" },
  { id: "employee",   label: "Employee",               tagline: "Internal — for reimbursements & advances",
    icon: <IconUser size={20} />, steps: 1, badge: "PAN + bank + ID card",
    docs: ["PAN","Cancelled cheque","Employee ID card"],
    accent: "emerald" },
];

const ACCENT = {
  indigo:  { ring: "ring-brand-200",   bg: "bg-brand-50/40",    text: "text-brand-700",   pill: "bg-brand-100 text-brand-700" },
  violet:  { ring: "ring-violet-200",  bg: "bg-violet-50/40",   text: "text-violet-700",  pill: "bg-violet-100 text-violet-700" },
  amber:   { ring: "ring-amber-200",   bg: "bg-amber-50/40",    text: "text-amber-700",   pill: "bg-amber-100 text-amber-800" },
  emerald: { ring: "ring-emerald-200", bg: "bg-emerald-50/40",  text: "text-emerald-700", pill: "bg-emerald-100 text-emerald-700" },
};

const VendorTypePicker = ({ onSelect }) => (
  <div className="bg-ink-50 min-h-full">
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="text-center mb-8">
        <Badge tone="violet" icon={<IconSparkles size={11} />}>Start your registration</Badge>
        <h1 className="text-[28px] font-semibold tracking-tight text-ink-900 mt-3">What kind of vendor are you?</h1>
        <p className="text-[13.5px] text-ink-500 mt-2 max-w-xl mx-auto">
          The documents and checks we need depend on your entity type. <strong>Local Company</strong> follows the full GSTIN-based onboarding;
          everything else needs only PAN, a bank account and a couple of documents to get started.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {VENDOR_TYPES.map(t => {
          const a = ACCENT[t.accent];
          return (
            <button key={t.id} onClick={() => onSelect(t.id)}
              className={`text-left p-5 bg-white rounded-lg ring-1 ${a.ring} shadow-card hover:shadow-pop transition-shadow group`}>
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 grid place-items-center rounded-md ${a.bg} ${a.text}`}>{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-ink-900">{t.label}</h3>
                    <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${a.pill}`}>
                      {t.id === "company" ? `${t.steps} steps` : "Simplified · 1 page"}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-ink-500 mt-0.5">{t.tagline}</p>
                  <div className="mt-2 text-[11px] text-ink-600 font-medium">{t.badge}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.docs.map(d => <Badge key={d} tone="neutral">{d}</Badge>)}
                  </div>
                </div>
                <IconChevronRight size={16} className="text-ink-400 group-hover:text-ink-900 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 text-center text-[12px] text-ink-500">
        Got an invite link from procurement? <a className="text-brand-700 underline">Continue from there →</a>
      </div>
    </div>
  </div>
);

const SuccessScreen = ({ type, onReset, onGoDashboard }) => {
  const labels = { company: "Local Company", importCo: "Import Company", llp: "LLP", individual: "Individual or Proprietor", employee: "Employee" };
  return (
    <div className="px-8 py-12 flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white grid place-items-center mb-5 shadow-pop">
        <IconCheck size={32} />
      </div>
      <h1 className="text-[28px] font-semibold tracking-tight text-ink-900">Application submitted</h1>
      <p className="text-[14px] text-ink-500 mt-2 max-w-md">Your <strong>{labels[type]}</strong> application is now with our procurement team. Expect a response within 2 business days.</p>
      <Card className="mt-7 w-full text-left">
        <div className="grid grid-cols-2 gap-x-8">
          <KV k="Application ID" v={<span className="font-mono text-[12px]">APP-26-005-{Math.floor(1000 + Math.random()*8999)}</span>} />
          <KV k="Vendor type" v={labels[type]} />
          <KV k="Submitted at" v="10 May 2026, 12:14 IST" />
          <KV k="Expected SLA" v={type === "employee" ? "Same day" : "2 business days"} />
        </div>
      </Card>
      <div className="flex gap-3 mt-7">
        <Button variant="secondary" onClick={onReset} leading={<IconRefresh size={14} />}>Submit another</Button>
        <Button variant="primary" onClick={onGoDashboard} trailing={<IconArrowUpRight size={14} />}>Go to vendor dashboard</Button>
      </div>
    </div>
  );
};

// Router — picks a flow by vendor type
const RegistrationRouter = ({ onGoDashboard }) => {
  const [type, setType] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted && type) {
    return <SuccessScreen type={type} onReset={() => { setSubmitted(false); setType(null); }} onGoDashboard={onGoDashboard} />;
  }
  if (!type) return <VendorTypePicker onSelect={setType} />;

  const back = () => setType(null);
  const submit = () => setSubmitted(true);

  if (type === "company") return <Registration onGoDashboard={onGoDashboard} onBack={back} />;
  if (TYPE_CONFIGS[type]) return <SimpleRegistration config={TYPE_CONFIGS[type]} onBack={back} onSubmit={submit} />;
  return null;
};

// =====================================================================================
// INVITE VENDOR MODAL — used from the Admin Panel
// =====================================================================================
const InviteVendorModal = ({ open, onClose }) => {
  const [type, setType] = React.useState("company");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => { if (!open) { setSent(false); setName(""); setEmail(""); setType("company"); } }, [open]);

  if (!open) return null;
  const cfg = VENDOR_TYPES.find(t => t.id === type);
  const a = ACCENT[cfg.accent];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/40 backdrop-blur-sm p-6" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-pop w-full max-w-2xl overflow-hidden ring-1 ring-ink-200" onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="px-6 py-4 border-b border-ink-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11.5px] text-ink-500"><IconPlus size={12} /> Invite a new vendor</div>
                <h2 className="text-[17px] font-semibold text-ink-900 mt-0.5">Send registration link</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100"><IconX size={16} /></button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mb-2">Vendor type</div>
                <div className="grid grid-cols-2 gap-2">
                  {VENDOR_TYPES.map(t => {
                    const ta = ACCENT[t.accent];
                    const active = type === t.id;
                    return (
                      <button key={t.id} onClick={() => setType(t.id)}
                        className={`text-left p-3 rounded-md ring-1 transition ${active ? "ring-ink-900 bg-ink-50" : "ring-ink-200 hover:bg-ink-50/40"}`}>
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 grid place-items-center rounded ${ta.bg} ${ta.text}`}>{t.icon}</span>
                          <div className="min-w-0">
                            <div className="text-[12.5px] font-semibold text-ink-900">{t.label}</div>
                            <div className="text-[11px] text-ink-500 truncate">{t.tagline}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Contact name"><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aaron Linklater" /></Field>
                <Field label="Email"><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="vendor@company.com" /></Field>
              </div>

              <div className={`rounded-md ring-1 ring-inset ${a.ring} ${a.bg} p-3 flex items-start gap-3`}>
                <span className={`w-7 h-7 grid place-items-center rounded ${a.text} bg-white ring-1 ring-inset ${a.ring}`}>{cfg.icon}</span>
                <div className="flex-1 text-[12px]">
                  <div className="text-ink-900 font-semibold">{cfg.label} flow {type === "company" ? "— 4 steps" : "— simplified, 1 page"}</div>
                  <div className="text-ink-600 mt-0.5">Vendor will be asked for: {cfg.docs.join(" · ")}</div>
                </div>
              </div>

              <Field label="Add a note to the email (optional)">
                <Textarea rows={2} placeholder="Hi, please complete the onboarding so we can issue the first PO this week." />
              </Field>
            </div>

            <div className="px-6 py-3.5 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
              <div className="text-[11.5px] text-ink-500 inline-flex items-center gap-1"><IconInfo size={12} /> Link is valid for 14 days, single-use.</div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={() => setSent(true)} disabled={!name || !email} leading={<IconArrowUpRight size={13} />}>Send invite</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white grid place-items-center mx-auto mb-4"><IconCheck size={20} /></div>
            <h2 className="text-[18px] font-semibold text-ink-900">Invite sent to {email}</h2>
            <p className="text-[12.5px] text-ink-500 mt-1">They'll be taken straight to the <strong>{cfg.label}</strong> flow.</p>
            <div className="mt-5 max-w-md mx-auto rounded-md bg-ink-50 ring-1 ring-inset ring-ink-200 p-3 text-left">
              <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Invite link</div>
              <div className="font-mono text-[11.5px] text-ink-900 break-all">aarambh.in/onboard/{type}/{Math.random().toString(36).slice(2, 10)}</div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button variant="secondary" size="sm" onClick={onClose}>Done</Button>
              <Button variant="primary" size="sm" onClick={() => setSent(false)} leading={<IconPlus size={13} />}>Send another</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { RegistrationRouter, InviteVendorModal, VENDOR_TYPES, SimpleRegistration, TYPE_CONFIGS });
