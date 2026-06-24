// =====================================================================================
// VENDOR CATEGORIES — Admin master template
// Field Master:   For each category, every field & document has a tri-state
//                 status: Compulsory / Optional / Hidden.
// New Category:   Admin can spin up a brand-new vendor category from a template.
// =====================================================================================

// ---- Seed data: derive an editable "field master" from the existing TYPE_CONFIGS ----
// Each entry has: id, label, type, section, status ('compulsory'|'optional'|'hidden'), source.
const buildFieldMaster = () => {
  const out = {};

  // Local Company — uses the 4-step GSTIN flow
  out.company = {
    id: "company",
    label: "Local Company",
    tagline: "Pvt Ltd, Public Ltd, OPC, Partnership firm",
    accent: "indigo",
    flow: "4-step GSTIN",
    bankMode: "Penny-drop",
    icon: "building",
    active: true,
    applicants: 142,
    description: "Indian companies onboarded through the full GSTIN-based flow with live verification of tax IDs, bank account and KYC documents.",
    fields: [
      { id: "gstin",      label: "GSTIN",                  section: "Identity",   type: "Text · 15 char", status: "compulsory", locked: true },
      { id: "legalName",  label: "Legal name",             section: "Identity",   type: "Text",           status: "compulsory" },
      { id: "tradeName",  label: "Trade name",             section: "Identity",   type: "Text",           status: "optional" },
      { id: "constitution",label:"Constitution",           section: "Identity",   type: "Auto from GSTIN",status: "compulsory" },
      { id: "state",      label: "State",                  section: "Identity",   type: "Auto from GSTIN",status: "compulsory" },
      { id: "pan",        label: "PAN",                    section: "Tax IDs",    type: "Text · 10 char", status: "compulsory" },
      { id: "tan",        label: "TAN",                    section: "Tax IDs",    type: "Text · 10 char", status: "optional" },
      { id: "udyam",      label: "Udyam Registration",     section: "Tax IDs",    type: "Text",           status: "optional" },
      { id: "msme",       label: "MSME flag",              section: "Tax IDs",    type: "Boolean",        status: "optional" },
      { id: "accNo",      label: "Bank account number",    section: "Bank",       type: "Number",         status: "compulsory", locked: true },
      { id: "ifsc",       label: "IFSC",                   section: "Bank",       type: "Text · 11 char", status: "compulsory", locked: true },
      { id: "accName",    label: "Account holder name",    section: "Bank",       type: "Text",           status: "compulsory" },
      { id: "category",   label: "Product / service category", section: "Profile", type: "Select",      status: "compulsory" },
      { id: "address",    label: "Registered address",     section: "Profile",    type: "Long text",      status: "compulsory" },
      { id: "contactEmail",label: "Contact email",         section: "Profile",    type: "Email",          status: "compulsory" },
      { id: "contactPhone",label: "Contact phone",         section: "Profile",    type: "Phone",          status: "compulsory" },
    ],
    docs: [
      { id: "gstcert",    label: "GST Certificate",        type: "PDF",  status: "compulsory" },
      { id: "pan",        label: "PAN copy",               type: "PDF / JPG", status: "compulsory" },
      { id: "cheque",     label: "Cancelled cheque",       type: "JPG / PDF", status: "compulsory" },
      { id: "brochure",   label: "Product / service brochure", type: "PDF", status: "optional" },
      { id: "udyam",      label: "Udyam (MSME) certificate", type: "PDF", status: "optional" },
      { id: "aoa",        label: "Articles of Association",type: "PDF",  status: "hidden" },
    ],
  };

  // Import Company — PAN now optional
  out.importCo = {
    id: "importCo",
    label: "Import Company",
    tagline: "Entity registered outside India",
    accent: "violet",
    flow: "Simplified · 1 page",
    bankMode: "SWIFT / BIC",
    icon: "globe",
    active: true,
    applicants: 28,
    description: "Foreign suppliers invoicing in non-INR currencies. PAN is not mandatory — most foreign entities don't hold an Indian PAN.",
    fields: [
      { id: "pan",        label: "PAN (Indian)",           section: "Identity",   type: "Text · 10 char", status: "optional" },
      { id: "legalName",  label: "Legal name",             section: "Identity",   type: "Text",           status: "compulsory" },
      { id: "country",    label: "Country of incorporation", section: "Identity", type: "Select",         status: "compulsory" },
      { id: "currency",   label: "Invoice currency",       section: "Identity",   type: "Select",         status: "compulsory" },
      { id: "regNo",      label: "Business registration #", section: "Identity",  type: "Text",           status: "compulsory" },
      { id: "incorpDate", label: "Date of incorporation",  section: "Identity",   type: "Date",           status: "optional" },
      { id: "foreignTIN", label: "Foreign TIN / EIN",      section: "Tax IDs",    type: "Text",           status: "compulsory" },
      { id: "iec",        label: "Import Export Code (IEC)", section: "Tax IDs",  type: "Text",           status: "optional" },
      { id: "accNo",      label: "IBAN / Account number",  section: "Bank",       type: "Text",          status: "compulsory", locked: true },
      { id: "swift",      label: "SWIFT / BIC",            section: "Bank",       type: "Text · 11 char", status: "compulsory", locked: true },
      { id: "accName",    label: "Account holder name",    section: "Bank",       type: "Text",           status: "compulsory" },
      { id: "address",    label: "Registered address",     section: "Profile",    type: "Long text",      status: "compulsory" },
      { id: "contactEmail",label: "Contact email",         section: "Profile",    type: "Email",          status: "compulsory" },
      { id: "contactPhone",label: "Contact phone",         section: "Profile",    type: "Phone",          status: "optional" },
      { id: "natureOfGoods",label: "Nature of goods / services", section: "Profile", type: "Text",      status: "optional" },
    ],
    docs: [
      { id: "bank",       label: "Bank confirmation letter",    type: "PDF / JPG", status: "compulsory" },
      { id: "incorp",     label: "Certificate of Incorporation",type: "PDF",        status: "compulsory" },
      { id: "pan",        label: "PAN Card (if available)",     type: "PDF / JPG", status: "optional" },
      { id: "trc",        label: "Tax Residency Certificate",   type: "PDF",        status: "optional" },
      { id: "w8",         label: "Form W-8BEN-E / equivalent",  type: "PDF",        status: "optional" },
      { id: "iec",        label: "IEC Certificate",             type: "PDF",        status: "optional" },
      { id: "brochure",   label: "Company brochure",            type: "PDF",        status: "optional" },
    ],
  };

  out.llp = {
    id: "llp", label: "LLP", tagline: "Limited Liability Partnership",
    accent: "indigo", flow: "Simplified · 1 page", bankMode: "Penny-drop", icon: "shield",
    active: true, applicants: 47,
    description: "LLPs registered with MCA. Three things are mandatory: LLP PAN, bank account and the incorporation certificate. Everything else is optional.",
    fields: [
      { id: "llpName",    label: "LLP name",               section: "Identity",   type: "Text",          status: "compulsory" },
      { id: "llpin",      label: "LLPIN",                  section: "Identity",   type: "Text",          status: "compulsory" },
      { id: "incorpDate", label: "Date of incorporation",  section: "Identity",   type: "Date",          status: "optional" },
      { id: "regState",   label: "State of registration",  section: "Identity",   type: "Select",        status: "compulsory" },
      { id: "pan",        label: "PAN",                    section: "Tax IDs",    type: "Text · 10 char",status: "compulsory", locked: true },
      { id: "gstin",      label: "GSTIN",                  section: "Tax IDs",    type: "Text",          status: "optional" },
      { id: "tan",        label: "TAN",                    section: "Tax IDs",    type: "Text",          status: "optional" },
      { id: "udyam",      label: "Udyam Registration",     section: "Tax IDs",    type: "Text",          status: "optional" },
      { id: "accNo",      label: "Bank account number",    section: "Bank",       type: "Number",        status: "compulsory", locked: true },
      { id: "ifsc",       label: "IFSC",                   section: "Bank",       type: "Text",          status: "compulsory", locked: true },
      { id: "accName",    label: "Account holder name",    section: "Bank",       type: "Text",          status: "compulsory" },
      { id: "designatedPartner",label: "Designated partner name", section: "Profile", type: "Text",      status: "optional" },
      { id: "partnerDIN", label: "Designated partner DIN", section: "Profile",    type: "Text",          status: "optional" },
      { id: "contactEmail",label: "Contact email",         section: "Profile",    type: "Email",          status: "compulsory" },
      { id: "address",    label: "Registered office address", section: "Profile", type: "Long text",     status: "compulsory" },
    ],
    docs: [
      { id: "pan",        label: "LLP PAN Card",                       type: "PDF / JPG", status: "compulsory" },
      { id: "bank",       label: "Cancelled cheque / bank statement",  type: "JPG / PDF", status: "compulsory" },
      { id: "llpCert",    label: "LLP Incorporation Certificate (MCA)",type: "PDF",       status: "compulsory" },
      { id: "llpAgreement",label: "LLP Agreement",                     type: "PDF",       status: "optional" },
      { id: "gst",        label: "GST Registration Certificate",       type: "PDF",       status: "optional" },
      { id: "partnerKYC", label: "Partners — PAN & address proof",     type: "PDF",       status: "optional" },
      { id: "udyam",      label: "Udyam (MSME) certificate",           type: "PDF",       status: "optional" },
    ],
  };

  out.individual = {
    id: "individual", label: "Individual or Proprietor", tagline: "Local freelancer, sole proprietor — or invoicing from abroad",
    accent: "amber", flow: "Simplified · 1 page", bankMode: "Penny-drop", icon: "user",
    active: true, applicants: 86,
    description: "Single-person businesses. We default to a light touch — PAN, bank, address proof. GST and other tax documents are optional.",
    fields: [
      { id: "fullName",   label: "Full name (as per PAN)", section: "Identity",   type: "Text",          status: "compulsory" },
      { id: "tradeName",  label: "Trade / business name",  section: "Identity",   type: "Text",          status: "optional" },
      { id: "aadhaar",    label: "Aadhaar — last 4 digits",section: "Identity",   type: "Text",          status: "optional" },
      { id: "country",    label: "Country of residence",   section: "Identity",   type: "Select",        status: "compulsory" },
      { id: "pan",        label: "PAN",                    section: "Tax IDs",    type: "Text",          status: "compulsory", locked: true },
      { id: "gstin",      label: "GSTIN",                  section: "Tax IDs",    type: "Text",          status: "optional" },
      { id: "foreignTIN", label: "Foreign TIN",            section: "Tax IDs",    type: "Text",          status: "optional" },
      { id: "turnover",   label: "Turnover this FY",       section: "Tax IDs",    type: "Number",        status: "optional" },
      { id: "accNo",      label: "Bank account number",    section: "Bank",       type: "Number",        status: "compulsory", locked: true },
      { id: "ifsc",       label: "IFSC",                   section: "Bank",       type: "Text",          status: "compulsory", locked: true },
      { id: "accName",    label: "Account holder name",    section: "Bank",       type: "Text",          status: "compulsory" },
      { id: "email",      label: "Email",                  section: "Profile",    type: "Email",          status: "compulsory" },
      { id: "phone",      label: "Mobile / phone",         section: "Profile",    type: "Phone",          status: "compulsory" },
      { id: "address",    label: "Address",                section: "Profile",    type: "Long text",     status: "compulsory" },
      { id: "services",   label: "Nature of services / goods", section: "Profile",type: "Text",         status: "optional" },
    ],
    docs: [
      { id: "pan",        label: "PAN Card",                                 type: "PDF / JPG", status: "compulsory" },
      { id: "bank",       label: "Cancelled cheque / pass-book",             type: "JPG / PDF", status: "compulsory" },
      { id: "addr",       label: "Address proof (Aadhaar / Passport / Util.)", type: "PDF / JPG", status: "compulsory" },
      { id: "gst",        label: "GST Certificate",                          type: "PDF",       status: "optional" },
      { id: "decl",       label: "GST self-declaration (below threshold)",   type: "PDF",       status: "optional" },
      { id: "trc",        label: "Tax Residency Certificate (Import only)",  type: "PDF",       status: "optional" },
      { id: "portfolio",  label: "Portfolio / capabilities deck",            type: "PDF",       status: "optional" },
    ],
  };

  out.employee = {
    id: "employee", label: "Employee", tagline: "Internal — reimbursements & advances",
    accent: "emerald", flow: "Simplified · 1 page", bankMode: "Penny-drop", icon: "user",
    active: true, applicants: 264,
    description: "Internal employees onboarded for petty cash, expense reimbursements and travel advances. Cross-checked against the HRIS.",
    fields: [
      { id: "empId",      label: "Employee ID",            section: "Identity",   type: "Text",          status: "compulsory", locked: true },
      { id: "fullName",   label: "Full name (HRIS)",       section: "Identity",   type: "Text",          status: "compulsory" },
      { id: "dept",       label: "Department",             section: "Identity",   type: "Select",        status: "compulsory" },
      { id: "manager",    label: "Reporting manager",      section: "Identity",   type: "Text",          status: "compulsory" },
      { id: "office",     label: "Office location",        section: "Identity",   type: "Select",        status: "compulsory" },
      { id: "pan",        label: "PAN",                    section: "Tax IDs",    type: "Text",          status: "compulsory", locked: true },
      { id: "accNo",      label: "Bank account number",    section: "Bank",       type: "Number",        status: "compulsory", locked: true },
      { id: "ifsc",       label: "IFSC",                   section: "Bank",       type: "Text",          status: "compulsory", locked: true },
      { id: "email",      label: "Office email",           section: "Profile",    type: "Email",         status: "compulsory" },
      { id: "phone",      label: "Mobile",                 section: "Profile",    type: "Phone",         status: "optional" },
      { id: "purpose",    label: "Purpose",                section: "Profile",    type: "Select",        status: "optional" },
      { id: "defaultCategory", label: "Default expense category", section: "Profile", type: "Select",  status: "optional" },
    ],
    docs: [
      { id: "pan",        label: "PAN Card",               type: "PDF / JPG", status: "compulsory" },
      { id: "bank",       label: "Cancelled cheque",       type: "JPG / PNG", status: "compulsory" },
      { id: "idCard",     label: "Employee ID card",       type: "JPG / PNG", status: "compulsory" },
      { id: "aadh",       label: "Aadhaar (masked)",       type: "PDF",       status: "optional" },
    ],
  };

  return out;
};

// ----- Tri-state status segmented control -----
const STATUS_CFG = {
  compulsory: { label: "Compulsory", color: "rose",    icon: <IconAlertTriangle size={11} /> },
  optional:   { label: "Optional",   color: "amber",   icon: <IconCircleHelp size={11} /> },
  hidden:     { label: "Hidden",     color: "neutral", icon: <IconEye size={11} /> },
};

const StatusSegment = ({ value, onChange, locked = false }) => (
  <div className={`inline-flex rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50/40 p-0.5 ${locked ? "opacity-60" : ""}`}>
    {["compulsory","optional","hidden"].map(k => {
      const active = value === k;
      const cfg = STATUS_CFG[k];
      const cls = active
        ? k === "compulsory" ? "bg-rose-50 ring-rose-200 text-rose-700"
        : k === "optional"   ? "bg-amber-50 ring-amber-200 text-amber-800"
        : "bg-ink-200/70 ring-ink-300 text-ink-700"
        : "text-ink-500 hover:text-ink-800";
      return (
        <button
          key={k}
          disabled={locked}
          onClick={() => !locked && onChange(k)}
          className={`px-2 py-1 text-[11.5px] font-medium rounded ring-1 ring-inset ring-transparent transition ${cls}`}
        >
          {cfg.label}
        </button>
      );
    })}
  </div>
);

// ----- Row in the field master table -----
const MasterRow = ({ item, onChange, kind = "field" }) => (
  <tr className="border-b border-ink-200/60 last:border-0">
    <td className="px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-ink-900">{item.label}</span>
        {item.locked && (
          <span title="Locked — core verification field" className="inline-flex items-center gap-0.5 text-[10px] text-ink-400">
            <IconShield size={10} /> locked
          </span>
        )}
      </div>
      {kind === "field" && <div className="text-[10.5px] text-ink-500 mt-0.5">id · <span className="font-mono">{item.id}</span></div>}
    </td>
    <td className="px-3 py-2.5">
      <span className="text-[11.5px] text-ink-600">{item.type}</span>
    </td>
    <td className="px-3 py-2.5">
      <StatusSegment value={item.status} onChange={(s) => onChange(item.id, s)} locked={item.locked} />
    </td>
    <td className="px-3 py-2.5 text-right">
      <button className="text-[11px] text-ink-400 hover:text-ink-800 inline-flex items-center gap-1">
        <IconDots size={13} />
      </button>
    </td>
  </tr>
);

// ----- The big "field master" panel -----
const CategoryDetail = ({ cat, onChange, onOpenInvite, onPreview }) => {
  const a = ACCENT[cat.accent];

  // Group fields by section
  const sections = Array.from(new Set(cat.fields.map(f => f.section)));
  const counts = {
    compulsory: cat.fields.filter(f => f.status === "compulsory").length + cat.docs.filter(d => d.status === "compulsory").length,
    optional:   cat.fields.filter(f => f.status === "optional").length   + cat.docs.filter(d => d.status === "optional").length,
    hidden:     cat.fields.filter(f => f.status === "hidden").length     + cat.docs.filter(d => d.status === "hidden").length,
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Detail header */}
      <Card padded={false}>
        <div className={`px-5 py-4 border-b border-ink-200 ${a.bg}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] text-ink-500">
                <span className="font-mono uppercase tracking-wider">CATEGORY · {cat.id}</span>
                <span className="text-ink-300">·</span>
                <span>{cat.flow}</span>
                <span className="text-ink-300">·</span>
                <span>Bank: {cat.bankMode}</span>
              </div>
              <h2 className="text-[19px] font-semibold text-ink-900 mt-1">{cat.label}</h2>
              <p className="text-[12.5px] text-ink-600 mt-1 max-w-2xl">{cat.description}</p>
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                <Badge tone="green" icon={<IconCheckCircle size={11} />}>Active</Badge>
                <Badge tone="neutral">{cat.applicants} vendors onboarded</Badge>
                <Badge tone="red" icon={<IconAlertTriangle size={11} />}>{counts.compulsory} Compulsory</Badge>
                <Badge tone="amber" icon={<IconCircleHelp size={11} />}>{counts.optional} Optional</Badge>
                <Badge tone="neutral" icon={<IconEye size={11} />}>{counts.hidden} Hidden</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button variant="secondary" size="sm" leading={<IconArrowUpRight size={13} />} onClick={onOpenInvite}>Send invite</Button>
              <Button variant="ghost" size="sm" leading={<IconEye size={13} />} onClick={onPreview}>Preview form</Button>
            </div>
          </div>
        </div>

        {/* Fields master */}
        <div className="px-5 py-5 space-y-6">
          <div>
            <SectionTitle hint="Mark each field as Compulsory, Optional, or Hidden. Locked fields are core verification inputs and cannot be hidden.">
              Fields master — {cat.fields.length} fields across {sections.length} sections
            </SectionTitle>
            <div className="space-y-5">
              {sections.map(sec => (
                <div key={sec}>
                  <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1.5 flex items-center gap-2">
                    <span>{sec}</span>
                    <span className="h-px flex-1 bg-ink-200/70" />
                    <span className="text-[10px] text-ink-400">{cat.fields.filter(f => f.section === sec).length} fields</span>
                  </div>
                  <div className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden bg-white">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left bg-ink-50/60 border-b border-ink-200">
                          <th className="px-4 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Field</th>
                          <th className="px-3 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Type</th>
                          <th className="px-3 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Status on vendor form</th>
                          <th className="px-3 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.fields.filter(f => f.section === sec).map(f => (
                          <MasterRow
                            key={f.id}
                            item={f}
                            onChange={(id, s) => onChange("field", id, s)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand-700 hover:underline">
              <IconPlus size={13} /> Add custom field to this category
            </button>
          </div>

          {/* Documents master */}
          <div>
            <SectionTitle hint="Each document the vendor will be asked to upload. Hidden documents are not shown on the form.">
              Documents master — {cat.docs.length} documents
            </SectionTitle>
            <div className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden bg-white">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-ink-50/60 border-b border-ink-200">
                    <th className="px-4 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Document</th>
                    <th className="px-3 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Accepted</th>
                    <th className="px-3 py-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Status on vendor form</th>
                    <th className="px-3 py-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cat.docs.map(d => (
                    <MasterRow
                      key={d.id}
                      item={d}
                      onChange={(id, s) => onChange("doc", id, s)}
                      kind="doc"
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand-700 hover:underline">
              <IconPlus size={13} /> Add custom document
            </button>
          </div>

          {/* Verification mode */}
          <div>
            <SectionTitle hint="External APIs invoked when a vendor of this category submits their application.">
              Verification & API hooks
            </SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "PAN verification",  api: "ClearTax — PAN sync", on: cat.fields.find(f=>f.id==="pan")?.status === "compulsory" },
                { label: "GSTIN verification",api: "ClearTax — GSTIN basic", on: !!cat.fields.find(f=>f.id==="gstin"&&f.status!=="hidden") },
                { label: "Bank check",        api: cat.bankMode === "SWIFT / BIC" ? "SWIFT BIC directory" : "Penny-drop · ₹1.00", on: true },
                { label: "Section 206AB",     api: "ClearTax — 206AB compliance", on: cat.fields.find(f=>f.id==="pan")?.status !== "hidden" },
              ].map(v => (
                <div key={v.label} className="rounded-md ring-1 ring-inset ring-ink-200 px-3 py-2.5 flex items-center gap-3 bg-white">
                  <span className={`w-7 h-7 grid place-items-center rounded ${v.on ? "bg-emerald-50 text-emerald-700" : "bg-ink-100 text-ink-500"}`}>
                    {v.on ? <IconCheck size={13} /> : <IconX size={13} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium text-ink-900">{v.label}</div>
                    <div className="text-[11px] text-ink-500 truncate">{v.api}</div>
                  </div>
                  <button className={`text-[11px] font-medium ${v.on ? "text-rose-700" : "text-brand-700"} hover:underline`}>
                    {v.on ? "Disable" : "Enable"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky save footer */}
        <div className="border-t border-ink-200 bg-ink-50/40 px-5 py-3.5 flex items-center justify-between">
          <div className="text-[11.5px] text-ink-500 inline-flex items-center gap-1">
            <IconInfo size={12} /> Changes apply to <strong>new</strong> invites — existing in-flight applications keep their current form.
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">Reset to defaults</Button>
            <Button variant="primary" size="sm" leading={<IconCheck size={13} />}>Save changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ----- Build a SimpleRegistration config from the editable field master -----
// Lets the admin preview exactly what the vendor will see, including any
// Compulsory/Optional/Hidden status changes they have made in the master.
const configFromCategory = (cat) => {
  const CORE = new Set(["pan","accNo","ifsc","swift","accName"]);
  const optionalFields = cat.fields
    .filter(f => f.status !== "hidden" && !CORE.has(f.id))
    .map(f => {
      const base = { id: f.id, label: f.label };
      const t = (f.type || "").toLowerCase();
      if (t.includes("select") || t.includes("auto from")) {
        base.type = "select";
        if (f.id === "country")  base.options = ["India","United States","United Kingdom","Singapore","Germany","UAE","Australia","Japan","China","Hong Kong"];
        else if (f.id === "currency") base.options = ["USD","GBP","EUR","SGD","AED","JPY","AUD","INR"];
        else if (f.id === "regState" || f.id === "state") base.options = ["Maharashtra","Karnataka","Tamil Nadu","Delhi","Gujarat","Telangana","Other"];
        else if (f.id === "dept")      base.options = ["Finance","Procurement","R&D","Operations","Sales","HR","IT"];
        else if (f.id === "office")    base.options = ["Mumbai HQ","Bengaluru","Pune","Delhi","Chennai","Remote"];
        else if (f.id === "purpose")   base.options = ["Expense reimbursements","Travel advances","Petty cash float","Other"];
        else if (f.id === "defaultCategory") base.options = ["Travel — Domestic","Travel — International","Meals & entertainment","Office supplies","Other"];
        else base.options = ["— Option A —","— Option B —"];
      } else if (t.includes("long text")) {
        base.type = "textarea";
        base.colSpan = 2;
      } else if (t.includes("date")) {
        base.placeholder = "DD MMM YYYY";
      } else if (t.includes("char") || t.includes("number")) {
        base.mono = true;
      }
      return base;
    });

  const docs = cat.docs
    .filter(d => d.status !== "hidden")
    .map(d => ({
      id: d.id,
      label: d.label,
      required: d.status === "compulsory",
      accept: d.type,
      max: "5 MB",
    }));

  const panField = cat.fields.find(f => f.id === "pan");
  const panRequired = panField ? panField.status === "compulsory" : true;

  const bankMode = (cat.bankMode || "").toLowerCase().includes("swift") ? "swift" : "penny";

  let typeToggle = null;
  if (cat.id === "individual") {
    typeToggle = {
      id: "scope",
      options: [
        { k: "local",  label: "Local — I'm based in India" },
        { k: "import", label: "Import — I invoice from outside India" },
      ],
    };
  }

  return {
    label: cat.label,
    typeTag: cat.tagline || cat.label,
    title: `Register — ${cat.label}`,
    subtitle: cat.description,
    accent: cat.accent,
    bankMode,
    panRequired,
    optionalFields,
    docs,
    typeToggle,
  };
};

// ----- Preview Form Modal -----
const PreviewFormModal = ({ cat, onClose }) => {
  if (!cat) return null;
  const isCompany = cat.id === "company";
  const cfg = !isCompany ? configFromCategory(cat) : null;
  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex flex-col" onClick={onClose}>
      <div className="bg-ink-900 text-white px-6 py-3 flex items-center justify-between" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider font-semibold bg-amber-400/20 text-amber-200 ring-1 ring-amber-300/30 px-2 py-0.5 rounded">
            <IconEye size={11} /> Live Preview
          </span>
          <span className="text-[13px] font-semibold truncate">{cat.label}</span>
          <span className="text-[11.5px] text-white/50 truncate">· Exactly what a vendor invited to the “{cat.label}” flow will see</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10.5px] text-white/50 font-mono">Read-only · form actions disabled in preview</span>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/10" title="Close preview">
            <IconX size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-ink-100 py-6" onClick={e => e.stopPropagation()}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-t-lg bg-white ring-1 ring-ink-200 px-4 py-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="flex-1 mx-3">
              <div className="bg-ink-100 rounded-md px-3 py-1 text-[11.5px] font-mono text-ink-600">
                https://aarambh.in/onboard/{cat.id}/preview
              </div>
            </div>
            <span className="text-[10.5px] text-ink-500">Vendor view</span>
          </div>
          <div className="bg-white ring-1 ring-ink-200 border-t-0 rounded-b-lg overflow-hidden">
            {isCompany
              ? <Registration onGoDashboard={onClose} onBack={onClose} />
              : <SimpleRegistration config={cfg} onBack={onClose} onSubmit={onClose} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================================================
// NEW CATEGORY MODAL — admin defines a new vendor category from scratch (or template)
// =====================================================================================
const TEMPLATES = [
  { id: "blank",    label: "Blank",                tagline: "Build from scratch — full control" },
  { id: "company",  label: "Clone · Local Company",tagline: "GSTIN-based, 4-step flow" },
  { id: "importCo", label: "Clone · Import Company",tagline: "SWIFT, PAN optional" },
  { id: "individual",label:"Clone · Individual",   tagline: "PAN + bank + address proof" },
];

const VERIF_OPTIONS = [
  { id: "gstin",  label: "GSTIN verification",      detail: "ClearTax GSTIN advanced details API" },
  { id: "pan",    label: "PAN verification",        detail: "Live name match + 206AB compliance" },
  { id: "bankIN", label: "Indian bank (penny-drop)",detail: "₹1.00 credit, refunded automatically" },
  { id: "bankFX", label: "International bank (SWIFT)", detail: "Validate against BIC directory" },
  { id: "udyam",  label: "Udyam MSME lookup",       detail: "Unlocks 45-day SLA" },
  { id: "irs",    label: "Foreign TIN / IRS",       detail: "Form W-8 / W-9 storage" },
];

const SUGGESTED_FIELDS = {
  blank: [],
  company: ["GSTIN","Legal name","PAN","TAN","Udyam","Bank a/c","IFSC","Account holder","Address","Email","Phone","Category"],
  importCo: ["Legal name","Country","Currency","Foreign TIN","IEC","IBAN / Account no.","SWIFT","Account holder","Address","Email"],
  individual: ["Full name","PAN","Aadhaar (last 4)","Bank a/c","IFSC","Account holder","Email","Phone","Address","Services"],
};

const CreateCategoryModal = ({ open, onClose, onCreate }) => {
  const [step, setStep] = React.useState(1);
  const [tmpl, setTmpl] = React.useState("blank");
  const [name, setName] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [accent, setAccent] = React.useState("indigo");
  const [bankMode, setBankMode] = React.useState("penny");
  const [verifs, setVerifs] = React.useState({ pan: true, bankIN: true });
  const [extraFields, setExtraFields] = React.useState("");

  React.useEffect(() => {
    if (!open) { setStep(1); setTmpl("blank"); setName(""); setTagline(""); setAccent("indigo"); setBankMode("penny"); setVerifs({pan:true, bankIN:true}); setExtraFields(""); }
  }, [open]);

  if (!open) return null;

  const seedFields = SUGGESTED_FIELDS[tmpl] || [];
  const customFieldList = extraFields.split("\n").map(s => s.trim()).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/40 backdrop-blur-sm p-6" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-pop w-full max-w-3xl overflow-hidden ring-1 ring-ink-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-ink-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11.5px] text-ink-500">
              <IconPlus size={12} /> Create new vendor category
            </div>
            <h2 className="text-[17px] font-semibold text-ink-900 mt-0.5">New category — Step {step} of 3</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100"><IconX size={16} /></button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-3 border-b border-ink-200 flex items-center gap-2 text-[12px]">
          {["Template","Basics","Fields & verification"].map((s, i) => {
            const n = i + 1, done = n < step, cur = n === step;
            return (
              <React.Fragment key={s}>
                <span className="inline-flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-semibold ${done?"bg-emerald-600 text-white":cur?"bg-ink-900 text-white":"bg-ink-100 text-ink-500"}`}>{done ? <IconCheck size={11} /> : n}</span>
                  <span className={cur?"text-ink-900 font-semibold":"text-ink-500"}>{s}</span>
                </span>
                {i < 2 && <span className="h-px flex-1 bg-ink-200" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === 1 && (
            <div>
              <div className="text-[12.5px] text-ink-600 mb-3">Start blank or clone from an existing category. You can adjust everything afterwards.</div>
              <div className="grid grid-cols-2 gap-2.5">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTmpl(t.id)}
                    className={`text-left p-3 rounded-md ring-1 transition ${tmpl === t.id ? "ring-ink-900 bg-ink-50" : "ring-ink-200 hover:bg-ink-50/40"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-semibold text-ink-900">{t.label}</div>
                        <div className="text-[11.5px] text-ink-500 mt-0.5">{t.tagline}</div>
                      </div>
                      <span className={`w-5 h-5 rounded-full grid place-items-center ${tmpl === t.id ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-400"}`}>
                        {tmpl === t.id ? <IconCheck size={12} /> : null}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category name" hint="Shown to admins and on the invite email.">
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Logistics Partner" />
                </Field>
                <Field label="Short tagline">
                  <Input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="e.g. Transporters & freight forwarders" />
                </Field>
              </div>

              <Field label="Visual accent">
                <div className="flex gap-2">
                  {[
                    { k:"indigo",  cls:"bg-brand-600" },
                    { k:"violet",  cls:"bg-violet-600" },
                    { k:"amber",   cls:"bg-amber-500" },
                    { k:"emerald", cls:"bg-emerald-600" },
                    { k:"rose",    cls:"bg-rose-600" },
                  ].map(c => (
                    <button key={c.k} onClick={() => setAccent(c.k)}
                      className={`w-8 h-8 rounded-md ${c.cls} ring-2 transition ${accent === c.k ? "ring-ink-900 ring-offset-2" : "ring-transparent"}`}
                      title={c.k}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Bank verification method">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { k:"penny", label:"Penny-drop (₹1.00)", hint:"Indian bank accounts only" },
                    { k:"swift", label:"SWIFT / BIC validation", hint:"International accounts" },
                  ].map(b => (
                    <button key={b.k} onClick={() => setBankMode(b.k)}
                      className={`text-left p-3 rounded-md ring-1 transition ${bankMode === b.k ? "ring-ink-900 bg-ink-50" : "ring-ink-200 hover:bg-ink-50/40"}`}>
                      <div className="text-[12.5px] font-semibold text-ink-900">{b.label}</div>
                      <div className="text-[11px] text-ink-500 mt-0.5">{b.hint}</div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Default form scope">
                <div className="rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50/40 px-3 py-2.5 text-[12px] text-ink-600">
                  This new category will inherit the <strong>"Simplified · 1 page"</strong> flow. You can convert it to a 4-step flow later from <em>Settings → Form layouts</em>.
                </div>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <div className="text-[12.5px] font-semibold text-ink-900 mb-2">Inherited fields ({seedFields.length})</div>
                {seedFields.length === 0 ? (
                  <div className="rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50/40 px-3 py-3 text-[12px] text-ink-500">
                    No inherited fields — you started from a blank template. Add fields below.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {seedFields.map(f => <Badge key={f} tone="blue">{f}</Badge>)}
                  </div>
                )}
                <div className="text-[11px] text-ink-500 mt-2">All inherited fields default to <em>Compulsory</em>. You can change each one to Optional or Hidden after creating the category.</div>
              </div>

              <Field label="Add extra fields (one per line)">
                <Textarea rows={3} value={extraFields} onChange={e => setExtraFields(e.target.value)} placeholder={"e.g.\nDriving license number\nVehicle registration\nInsurance expiry"} />
              </Field>
              {customFieldList.length > 0 && (
                <div className="text-[11px] text-ink-500">
                  Will add: {customFieldList.map(f => <Badge key={f} tone="violet" className="mr-1">{f}</Badge>)}
                </div>
              )}

              <div>
                <div className="text-[12.5px] font-semibold text-ink-900 mb-2">External verification hooks</div>
                <div className="grid grid-cols-2 gap-2">
                  {VERIF_OPTIONS.map(v => {
                    const on = !!verifs[v.id];
                    return (
                      <label key={v.id} className={`flex items-start gap-2.5 p-2.5 rounded-md ring-1 ring-inset cursor-pointer ${on ? "ring-emerald-200 bg-emerald-50/30" : "ring-ink-200 hover:bg-ink-50/40"}`}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => setVerifs(s => ({...s, [v.id]: !s[v.id]}))}
                          className="mt-0.5"
                        />
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-semibold text-ink-900">{v.label}</div>
                          <div className="text-[11px] text-ink-500">{v.detail}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={step === 1 ? onClose : () => setStep(s => s-1)}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button variant="primary" size="sm" onClick={() => setStep(s => s+1)} disabled={step === 2 && !name} trailing={<IconChevronRight size={13} />}>
              Continue
            </Button>
          ) : (
            <Button variant="success" size="sm" onClick={() => onCreate({ name, tagline, accent, bankMode, tmpl, fields: [...seedFields, ...customFieldList], verifs })} disabled={!name} leading={<IconCheck size={13} />}>
              Create category
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// =====================================================================================
// MAIN SCREEN
// =====================================================================================
const VendorCategories = () => {
  const [master, setMaster] = React.useState(buildFieldMaster());
  const [selected, setSelected] = React.useState("company");
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openInvite, setOpenInvite] = React.useState(false);
  const [previewCat, setPreviewCat] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const order = ["company","importCo","llp","individual","employee"];
  const all = order.map(k => master[k]).filter(Boolean).concat(Object.values(master).filter(c => !order.includes(c.id)));
  const cat = master[selected];

  const handleChange = (kind, id, status) => {
    setMaster(m => ({
      ...m,
      [selected]: {
        ...m[selected],
        [kind === "field" ? "fields" : "docs"]: m[selected][kind === "field" ? "fields" : "docs"].map(x =>
          x.id === id ? { ...x, status } : x
        ),
      },
    }));
  };

  const handleCreate = ({ name, tagline, accent, bankMode, fields, verifs }) => {
    const id = "cat_" + Date.now().toString(36);
    const newCat = {
      id, label: name, tagline: tagline || "Custom vendor category",
      accent, flow: "Simplified · 1 page",
      bankMode: bankMode === "swift" ? "SWIFT / BIC" : "Penny-drop",
      icon: "shield", active: true, applicants: 0,
      description: "Custom category created from the admin panel. Adjust fields, documents and verification hooks below.",
      fields: fields.map((f, i) => ({
        id: "f_" + i, label: f, section: i < 4 ? "Identity" : i < 7 ? "Tax IDs" : "Profile",
        type: "Text", status: "compulsory",
      })),
      docs: [
        { id: "d_pan",   label: "PAN Card",         type: "PDF / JPG", status: "compulsory" },
        { id: "d_bank",  label: "Cancelled cheque", type: "JPG / PDF", status: "compulsory" },
      ],
    };
    setMaster(m => ({ ...m, [id]: newCat }));
    setSelected(id);
    setOpenCreate(false);
    setToast(`New category "${name}" created`);
    setTimeout(() => setToast(null), 3500);
  };

  if (!cat) return null;

  return (
    <div className="px-8 py-7">
      {/* Page header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[11.5px] text-ink-500 inline-flex items-center gap-1">
            <IconSettings size={12} /> Admin · Master setup
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900 mt-1">Vendor categories</h1>
          <p className="text-[13px] text-ink-500 mt-1 max-w-2xl">
            Define the categories of vendors you onboard and control which fields and documents each one needs.
            The vendor's registration form is generated live from this master.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconArrowUpRight size={14} />} onClick={() => setOpenInvite(true)}>Send invite</Button>
          <Button variant="primary" size="md" leading={<IconPlus size={14} />} onClick={() => setOpenCreate(true)}>New category</Button>
        </div>
      </div>

      {/* Category rail (cards) */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {all.map(c => {
          const a = ACCENT[c.accent] || ACCENT.indigo;
          const active = selected === c.id;
          const reqCount = c.fields.filter(f => f.status === "compulsory").length + c.docs.filter(d => d.status === "compulsory").length;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`text-left p-3.5 rounded-lg bg-white ring-1 transition ${active ? "ring-ink-900 shadow-pop" : "ring-ink-200 hover:ring-ink-300 shadow-card"}`}
            >
              <div className="flex items-start gap-2.5">
                <span className={`w-9 h-9 grid place-items-center rounded-md ${a.bg} ${a.text}`}>
                  <IconBuilding size={16} />
                </span>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-ink-900 truncate">{c.label}</div>
                  <div className="text-[10.5px] text-ink-500 truncate">{c.tagline}</div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
                <span className="text-ink-500">{c.applicants} vendors</span>
                <span className="inline-flex items-center gap-0.5 text-rose-700 font-medium"><IconAlertTriangle size={10} /> {reqCount} req.</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <CategoryDetail cat={cat} onChange={handleChange} onOpenInvite={() => setOpenInvite(true)} onPreview={() => setPreviewCat(cat)} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink-900 text-white px-4 py-3 rounded-md shadow-pop flex items-center gap-2 text-[12.5px]">
          <IconCheck size={14} /> {toast}
        </div>
      )}

      <CreateCategoryModal open={openCreate} onClose={() => setOpenCreate(false)} onCreate={handleCreate} />
      <InviteVendorModal open={openInvite} onClose={() => setOpenInvite(false)} />
      <PreviewFormModal cat={previewCat} onClose={() => setPreviewCat(null)} />
    </div>
  );
};

window.VendorCategories = VendorCategories;
