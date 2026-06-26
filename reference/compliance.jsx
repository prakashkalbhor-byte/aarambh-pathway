// =====================================================================================
// VENDOR COMPLIANCE VALIDATION — bulk validation of existing vendor master
// against Indian government / regulatory portals.
// 3-pane workflow: filter rail | configurator / results | run summary.
// =====================================================================================

// ---------- Mock vendor master (Keva-style supplier base) ----------
const KV_COMPANY_CODES = [
  { c: "3000", n: "S H Kelkar & Co. (Keva)" },
  { c: "3100", n: "Keva Fragrances Ltd. (KFL)" },
  { c: "3200", n: "Keva Chemicals Pvt. Ltd. (KCPL)" },
  { c: "3300", n: "Keva Flavours Pvt. Ltd." },
  { c: "3400", n: "Saiba Industries (Subsidiary)" },
];
const KV_ACCOUNT_GROUPS = ["Domestic","Import","One-Time","Service","Employee","MSME","Intercompany"];
const KV_PURCH_ORGS = ["IN10 — Mumbai","IN20 — Vapi","IN30 — Mulund","IN40 — Bengaluru","IN50 — Pune"];
const KV_STATES = ["Maharashtra","Gujarat","Karnataka","Tamil Nadu","Delhi","Haryana","Telangana","Uttar Pradesh","West Bengal","Madhya Pradesh","Rajasthan","Goa","Kerala","Andhra Pradesh","Punjab"];

// 18 realistic Keva-style vendors — mix of fragrance / FMCG suppliers
const CV_VENDORS = [
  { code:"V-200118", name:"Aroma Specialities Pvt. Ltd.",       pan:"AAACA8821J", gstin:"27AAACA8821J1ZK", state:"Maharashtra",   company:"3100", group:"Domestic", po:"IN10 — Mumbai", status:"Active",  msme:true,  spend: 4_82_15_400, created:"2024-08-12", lastValidated:"2026-03-04", tags:["Critical"] },
  { code:"V-200237", name:"Zamil Steel India Pvt. Ltd.",         pan:"AAGCZ4411L", gstin:"24AAGCZ4411L1Z2", state:"Gujarat",       company:"3000", group:"Domestic", po:"IN20 — Vapi",   status:"Active",  msme:false, spend: 1_24_08_900, created:"2022-05-18", lastValidated:"2026-04-22", tags:[] },
  { code:"V-200344", name:"Kanchan Aromatics LLP",               pan:"AAFCK9201R", gstin:"27AAFCK9201R1ZP", state:"Maharashtra",   company:"3100", group:"MSME",     po:"IN10 — Mumbai", status:"Active",  msme:true,  spend: 96_42_300,   created:"2025-01-22", lastValidated:null,         tags:["Critical","Single Source"] },
  { code:"V-200459", name:"Synthite Industries Ltd.",            pan:"AAACS1122K", gstin:"32AAACS1122K1ZR", state:"Kerala",        company:"3300", group:"Domestic", po:"IN40 — Bengaluru", status:"Active", msme:false, spend: 2_31_75_000, created:"2021-03-08", lastValidated:"2026-02-11", tags:[] },
  { code:"V-200502", name:"Givaudan India Pvt. Ltd.",            pan:"AAACG8821H", gstin:"27AAACG8821H1ZF", state:"Maharashtra",   company:"3200", group:"Domestic", po:"IN30 — Mulund", status:"Active",  msme:false, spend: 8_94_22_100, created:"2019-11-04", lastValidated:"2026-04-01", tags:["Critical"] },
  { code:"V-200613", name:"Mane Kancor Ingredients Pvt. Ltd.",   pan:"AABCM4421G", gstin:"33AABCM4421G1ZJ", state:"Tamil Nadu",    company:"3100", group:"Domestic", po:"IN40 — Bengaluru", status:"Active", msme:false, spend: 3_17_88_900, created:"2020-07-19", lastValidated:"2025-12-09", tags:[] },
  { code:"V-200718", name:"Prabhat Glass Works Pvt. Ltd.",       pan:"AABCP7710N", gstin:"27AABCP7710N1ZL", state:"Maharashtra",   company:"3100", group:"MSME",     po:"IN10 — Mumbai", status:"Active",  msme:true,  spend: 1_84_27_200, created:"2023-09-14", lastValidated:"2025-09-30", tags:["Single Source"] },
  { code:"V-200821", name:"Diamond Pkg. & Labels",               pan:"AAEFD2218Q", gstin:"27AAEFD2218Q1ZT", state:"Maharashtra",   company:"3200", group:"MSME",     po:"IN10 — Mumbai", status:"Active",  msme:true,  spend: 87_55_400,   created:"2024-02-26", lastValidated:"2026-03-20", tags:[] },
  { code:"V-200937", name:"International Flavors & Fragrances",  pan:"AAACI0091Q", gstin:"—",              state:"—",             company:"3300", group:"Import",   po:"IN10 — Mumbai", status:"Active",  msme:false, spend:11_28_61_000, created:"2018-06-30", lastValidated:"2026-04-10", tags:["Critical"] },
  { code:"V-201044", name:"Robertet (India) Pvt. Ltd.",          pan:"AAFCR8810D", gstin:"27AAFCR8810D1ZE", state:"Maharashtra",   company:"3300", group:"Domestic", po:"IN10 — Mumbai", status:"Active",  msme:false, spend: 2_06_19_700, created:"2020-04-15", lastValidated:"2026-01-18", tags:[] },
  { code:"V-201156", name:"Sah Petroleums Ltd.",                 pan:"AAACS3340M", gstin:"27AAACS3340M1Z0", state:"Maharashtra",   company:"3000", group:"Domestic", po:"IN30 — Mulund", status:"Blocked", msme:false, spend: 14_88_500,   created:"2017-12-02", lastValidated:"2025-08-12", tags:[] },
  { code:"V-201267", name:"Aishwarya Trade Centre",              pan:"ALWPB1108K", gstin:"24ALWPB1108K1ZR", state:"Gujarat",       company:"3100", group:"One-Time", po:"IN20 — Vapi",   status:"Active",  msme:false, spend: 4_22_900,    created:"2025-11-08", lastValidated:null,         tags:[] },
  { code:"V-201371", name:"Subir Chemicals Pvt. Ltd.",           pan:"AAFCS9920B", gstin:"27AAFCS9920B1ZX", state:"Maharashtra",   company:"3200", group:"Domestic", po:"IN30 — Mulund", status:"Flagged", msme:true,  spend: 64_88_700,   created:"2022-10-21", lastValidated:"2025-07-04", tags:["Critical"] },
  { code:"V-201488", name:"Vinayak Logistics & Cargo",           pan:"ABCFV4421R", gstin:"27ABCFV4421R1ZN", state:"Maharashtra",   company:"3100", group:"Service",  po:"IN10 — Mumbai", status:"Active",  msme:true,  spend: 39_22_800,   created:"2024-05-09", lastValidated:"2026-03-29", tags:[] },
  { code:"V-201592", name:"Karthikeya Engineering Works",        pan:"AAACK4421B", gstin:"33AAACK4421B1Z2", state:"Tamil Nadu",    company:"3000", group:"Service",  po:"IN40 — Bengaluru", status:"Flagged", msme:false, spend: 18_44_200,   created:"2023-03-18", lastValidated:"2026-02-14", tags:[] },
  { code:"V-201703", name:"Heera Aroma Chemicals LLP",           pan:"AAFCH2218P", gstin:"08AAFCH2218P1ZG", state:"Rajasthan",     company:"3100", group:"MSME",     po:"IN20 — Vapi",   status:"Active",  msme:true,  spend: 1_42_99_000, created:"2024-11-30", lastValidated:"2026-01-05", tags:["Single Source"] },
  { code:"V-201816", name:"Symrise (Singapore) Pte. Ltd.",       pan:"—",          gstin:"—",              state:"—",             company:"3300", group:"Import",   po:"IN10 — Mumbai", status:"Active",  msme:false, spend: 6_05_44_000, created:"2021-08-22", lastValidated:"2026-04-12", tags:["Critical"] },
  { code:"V-201919", name:"Suresh Pawar (Consultant)",           pan:"AHIPS2207F", gstin:"—",              state:"Maharashtra",   company:"3000", group:"Employee", po:"IN10 — Mumbai", status:"Active",  msme:false, spend: 8_91_600,    created:"2025-04-04", lastValidated:"2025-12-22", tags:[] },
];

// Per-vendor compliance result — keyed by vendor code. Built once.
// 'pass' | 'warn' | 'fail' | 'na'  (na = check not applicable)
// gst_filings: 6 months of true/false/null (most recent first)
const buildResult = (v) => {
  const r = {
    code: v.code,
    gstin:        v.gstin === "—" ? "na" : "pass",
    pan:          "pass",
    pan_gstin:    v.gstin === "—" ? "na" : "pass",
    tan:          v.group === "Service" ? "pass" : "na",
    msme:         v.msme ? "pass" : "na",
    bank:         "pass",
    epfo:         v.group === "Service" ? "pass" : "na",
    iec:          v.group === "Import" ? "pass" : "na",
    blacklist:    "pass",
    gst_filings:  v.gstin === "—" ? null : [true,true,true,true,true,true],
    score:        100,
    issues:       [],
  };

  // Apply realistic discrepancies for ~7 of 18 vendors
  if (v.code === "V-200344") { // Kanchan Aromatics — MSME expired
    r.msme = "warn"; r.score = 78;
    r.issues.push({ check:"msme", severity:"warn", title:"Udyam registration expired", detail:"Validity ended 12 Feb 2026 — needs renewal for Sec. 43B(h) benefits." });
  }
  if (v.code === "V-200718") { // Prabhat Glass — Name mismatch
    r.gstin = "warn"; r.score = 72;
    r.issues.push({ check:"gstin", severity:"warn", title:"Name mismatch (vendor master ↔ GSTN)",
      detail:"GSTN legal name: 'PRABHAT GLASSWORKS PRIVATE LIMITED' · Vendor master: 'Prabhat Glass Works Pvt. Ltd.' — single-character variance ('Glassworks' vs 'Glass Works')." });
  }
  if (v.code === "V-201156") { // Sah Petroleums — Blocked + GSTR not filed 3+ months
    r.gst_filings = [false,false,false,true,true,true];
    r.gstin = "fail"; r.score = 28;
    r.issues.push({ check:"gst_filings", severity:"fail", title:"GSTR-3B not filed for 3 consecutive months", detail:"Feb 2026, Mar 2026, Apr 2026 returns are overdue. Section 206AB applies — apply higher TDS." });
    r.issues.push({ check:"blacklist", severity:"warn", title:"Vendor is marked Blocked in SAP master", detail:"No new POs can be raised until block reason is cleared by procurement." });
  }
  if (v.code === "V-201371") { // Subir Chemicals — GSTIN cancelled
    r.gstin = "fail"; r.score = 18;
    r.issues.push({ check:"gstin", severity:"fail", title:"GSTIN is Cancelled (Suo-Moto)", detail:"Cancelled by GSTN officer on 04 Jul 2025 for non-filing. Vendor must re-register before further procurement." });
    r.issues.push({ check:"blacklist", severity:"warn", title:"Featured on GST cancelled-taxpayer list", detail:"Auto-screen run · last sync 12 hours ago." });
  }
  if (v.code === "V-201488") { // Vinayak Logistics — Bank name mismatch
    r.bank = "warn"; r.score = 81;
    r.issues.push({ check:"bank", severity:"warn", title:"Bank beneficiary name mismatch", detail:"Penny-drop returned 'Vinayak Logistics & Cargo Services'. Master name has no '& Cargo Services' suffix — acceptable but flag for review." });
  }
  if (v.code === "V-201592") { // Karthikeya — PAN-GSTIN linkage mismatch
    r.pan_gstin = "fail"; r.pan = "warn"; r.score = 41;
    r.issues.push({ check:"pan_gstin", severity:"fail", title:"PAN ↔ GSTIN linkage failed", detail:"PAN embedded in GSTIN (AAACK4421B) doesn't match the GSTN-registered PAN on file. Possible incorrect GSTIN entry." });
    r.issues.push({ check:"gst_filings", severity:"warn", title:"GSTR-1 last filed Dec 2025", detail:"4 months overdue on GSTR-1; GSTR-3B current." });
    r.gst_filings = [false,false,false,false,true,true];
  }
  if (v.code === "V-200937") { // IFF — Import; missing IEC
    r.iec = "warn"; r.score = 85;
    r.issues.push({ check:"iec", severity:"warn", title:"IEC validity expires in 21 days", detail:"DGFT IEC due for annual update. Vendor reminded automatically on the 30-day mark." });
  }
  if (v.code === "V-201919") { // Suresh Pawar — Employee, no GST applicable
    r.gst_filings = null;
  }
  return r;
};
const CV_RESULTS = CV_VENDORS.reduce((acc, v) => { acc[v.code] = buildResult(v); return acc; }, {});

// ---------- Checks catalog ----------
const CV_CHECKS = [
  { id:"gstin",       name:"GSTIN Registration",        source:"GSTN Public API",    desc:"Legal name, trade name, taxpayer type, jurisdiction and current status (Active / Cancelled / Suspended).", icon:"shield", avgMs:240, costPer:2.50, recommended:true },
  { id:"gst_filings", name:"GST Return Filing Status",  source:"GSTN",               desc:"GSTR-1 and GSTR-3B filings — last 6 months. Detects late or missing filers.", icon:"receipt", avgMs:390, costPer:2.00, recommended:true },
  { id:"pan",         name:"PAN Validation",            source:"NSDL / Income Tax",  desc:"PAN existence, name match, category (Individual / Company / Firm), active status.", icon:"file", avgMs:180, costPer:1.50, recommended:true },
  { id:"pan_gstin",   name:"PAN ↔ GSTIN Linkage",       source:"Cross-check",        desc:"Confirms the PAN embedded inside GSTIN matches the PAN on the vendor master record.", icon:"refresh", avgMs:0,   costPer:0.00, recommended:true },
  { id:"tan",         name:"TAN Validation",            source:"TIN-NSDL",           desc:"TAN existence, deductor name match, jurisdiction. Required for service vendors.", icon:"file", avgMs:210, costPer:1.50, recommended:false },
  { id:"msme",        name:"MSME / Udyam Registration", source:"Udyam Portal",       desc:"Udyam number, classification, validity. Triggers Sec. 43B(h) — 45-day payment SLA.", icon:"sparkles", avgMs:260, costPer:2.00, recommended:true },
  { id:"bank",        name:"Bank Account (Penny Drop)", source:"NPCI",               desc:"Sends ₹1 to validate account number and beneficiary name. IFSC validity check.", icon:"bank", avgMs:1200, costPer:3.50, recommended:true },
  { id:"epfo",        name:"EPFO / ESIC Compliance",    source:"EPFO",               desc:"For service vendors and contractors — establishment code, compliance status.", icon:"shieldcheck", avgMs:320, costPer:2.50, recommended:false },
  { id:"iec",         name:"Import Export Code (IEC)",  source:"DGFT",               desc:"For import vendors — IEC validity and HSN list registered. Auto-skip for domestic.", icon:"arrow", avgMs:280, costPer:2.50, recommended:false },
  { id:"blacklist",   name:"Blacklist & Watchlist",     source:"MCA / GST / OFAC",   desc:"Screens against MCA struck-off, GST cancelled list, internal blacklist and OFAC sanctions.", icon:"alert", avgMs:480, costPer:4.00, recommended:true },
];

const CV_PRESETS = [
  { id:"p1", name:"New vendors — Last 30 days",   filters:{ datePreset:"30d", neverValidated:false } },
  { id:"p2", name:"All MSME vendors",              filters:{ groups:["MSME"] } },
  { id:"p3", name:"Q4 onboarded — KFL",            filters:{ companies:["3100"], datePreset:"thisFY" } },
  { id:"p4", name:"Never validated · High spend",  filters:{ neverValidated:true, spendMin: 50_00_000 } },
];

// ---------- Tiny SVG charts (no library — matches existing portal aesthetic) ----------
const Donut = ({ data, size = 156, thickness = 22 }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size / 2) - thickness / 2;
  const C = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-[160px] h-[160px]">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#eef0f3" strokeWidth={thickness} />
      {data.map((d, i) => {
        const dash = (d.value / total) * C;
        const el = (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
            stroke={d.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={-off}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            strokeLinecap="butt"
          />
        );
        off += dash;
        return el;
      })}
      <text x={size/2} y={size/2 - 4} textAnchor="middle" className="fill-ink-900" style={{fontSize: 26, fontWeight: 600, fontVariantNumeric:"tabular-nums"}}>{total}</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" className="fill-ink-500" style={{fontSize: 10, letterSpacing:0.6, textTransform:"uppercase"}}>Vendors</text>
    </svg>
  );
};

const StackedBars = ({ rows }) => {
  const max = Math.max(...rows.map(r => r.pass + r.warn + r.fail + r.na), 1);
  return (
    <div className="space-y-2">
      {rows.map(r => {
        const total = r.pass + r.warn + r.fail + r.na;
        const pct = (n) => total ? (n / max) * 100 : 0;
        return (
          <div key={r.label} className="flex items-center gap-3">
            <div className="text-[11.5px] text-ink-700 w-40 truncate" title={r.label}>{r.label}</div>
            <div className="flex-1 h-5 rounded-sm bg-ink-100 overflow-hidden flex">
              <div className="bg-emerald-500" style={{width: `${pct(r.pass)}%`}} title={`Pass ${r.pass}`} />
              <div className="bg-amber-400"   style={{width: `${pct(r.warn)}%`}} title={`Warn ${r.warn}`} />
              <div className="bg-rose-500"    style={{width: `${pct(r.fail)}%`}} title={`Fail ${r.fail}`} />
              <div className="bg-ink-300"     style={{width: `${pct(r.na)}%`}}   title={`N/A ${r.na}`} />
            </div>
            <div className="text-[11px] font-mono tnum text-ink-600 w-12 text-right">{total}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Filter rail ----------
const FilterChip = ({ active, children, onClick }) => (
  <button onClick={onClick} className={`px-2 py-1 text-[11.5px] rounded-md ring-1 ring-inset transition ${active ? "bg-keva-700 text-white ring-keva-700" : "bg-white text-ink-700 ring-ink-200 hover:bg-ink-50"}`}>
    {children}
  </button>
);

const Multi = ({ options, value, onChange, placeholder = "Any" }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const toggle = (v) => onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left h-9 px-2.5 rounded-md ring-1 ring-inset ring-ink-200 bg-white hover:bg-ink-50 text-[12.5px] flex items-center justify-between gap-2">
        <span className={value.length ? "text-ink-900" : "text-ink-400"}>
          {value.length === 0 ? placeholder : value.length === 1 ? value[0] : `${value.length} selected`}
        </span>
        <IconChevronDown size={13} className="text-ink-400" />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 left-0 right-0 max-h-60 overflow-auto bg-white ring-1 ring-ink-200 rounded-md shadow-pop py-1">
          {options.map(o => (
            <label key={o} className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-ink-50 cursor-pointer text-[12.5px]">
              <input type="checkbox" checked={value.includes(o)} onChange={() => toggle(o)} className="accent-keva-700" />
              <span className="text-ink-800">{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ title, children, info }) => (
  <div className="px-4 py-3.5 border-b border-ink-200/70">
    <div className="flex items-center justify-between mb-2">
      <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold">{title}</div>
      {info && (
        <span title={info} className="text-ink-300 cursor-help"><IconInfo size={11} /></span>
      )}
    </div>
    {children}
  </div>
);

const CV_FilterRail = ({ filters, setFilters, matchCount, total, onLoadPreset, collapsed, onCollapse }) => {
  if (collapsed) {
    return (
      <aside className="w-12 shrink-0 border-r border-ink-200 bg-white flex flex-col items-center pt-3">
        <button onClick={() => onCollapse(false)} className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100" title="Expand filters">
          <IconFilter size={15} className="text-ink-600" />
        </button>
        <div className="text-[9px] font-semibold text-ink-500 mt-2 [writing-mode:vertical-rl] tracking-wider uppercase">Vendor Filters</div>
      </aside>
    );
  }
  const set = (patch) => setFilters(f => ({ ...f, ...patch }));
  const dates = [
    { k:"7d",     l:"Last 7 days" },
    { k:"30d",    l:"Last 30 days" },
    { k:"thisFY", l:"This FY" },
    { k:"lastFY", l:"Last FY" },
    { k:"all",    l:"All time" },
  ];

  return (
    <aside className="w-[300px] shrink-0 border-r border-ink-200 bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-ink-200 flex items-center justify-between">
        <div>
          <div className="text-[12.5px] font-semibold text-ink-900">Vendor Selection Criteria</div>
          <div className="text-[10.5px] text-ink-500">All filters combine with AND</div>
        </div>
        <button onClick={() => onCollapse(true)} className="w-7 h-7 grid place-items-center rounded-md hover:bg-ink-100 text-ink-500" title="Collapse">
          <IconChevronLeft size={14} />
        </button>
      </div>

      <div className="px-4 py-3 bg-keva-50/70 border-b border-ink-200 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] uppercase tracking-wider text-keva-700 font-semibold">Matching vendors</div>
          <div className="text-[24px] font-semibold text-keva-700 tnum leading-none mt-0.5">{matchCount}<span className="text-[12px] text-keva-700/70 ml-1.5 font-normal">/ {total}</span></div>
        </div>
        <div className="w-12 h-12 grid place-items-center rounded-md bg-white ring-1 ring-inset ring-keva-200 text-keva-700">
          <IconBuilding size={20} />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Presets */}
        <FilterSection title="Saved presets" info="Apply a pre-built filter combination">
          <select
            value={filters.presetId || ""}
            onChange={(e) => onLoadPreset(e.target.value)}
            className="w-full h-9 px-2 rounded-md ring-1 ring-inset ring-ink-200 bg-white text-[12.5px] focus:ring-2 focus:ring-keva-500 outline-none"
          >
            <option value="">— Load a preset —</option>
            {CV_PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="mt-2 text-[11.5px] text-keva-700 hover:underline inline-flex items-center gap-1">
            <IconPlus size={11} /> Save current filters as preset
          </button>
        </FilterSection>

        {/* Date */}
        <FilterSection title="Vendor creation date">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dates.map(d => <FilterChip key={d.k} active={filters.datePreset === d.k} onClick={() => set({ datePreset: filters.datePreset === d.k ? null : d.k })}>{d.l}</FilterChip>)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={filters.dateFrom || ""} onChange={e => set({ dateFrom: e.target.value, datePreset: "custom" })} className="h-8 px-2 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none" />
            <input type="date" value={filters.dateTo   || ""} onChange={e => set({ dateTo:   e.target.value, datePreset: "custom" })} className="h-8 px-2 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none" />
          </div>
        </FilterSection>

        {/* Vendor code range */}
        <FilterSection title="Vendor code range">
          <div className="grid grid-cols-2 gap-2">
            <input value={filters.codeFrom || ""} onChange={e => set({ codeFrom: e.target.value.toUpperCase() })} placeholder="From" className="h-8 px-2 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none font-mono" />
            <input value={filters.codeTo   || ""} onChange={e => set({ codeTo:   e.target.value.toUpperCase() })} placeholder="To"   className="h-8 px-2 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none font-mono" />
          </div>
        </FilterSection>

        <FilterSection title="Vendor category / account group">
          <Multi options={KV_ACCOUNT_GROUPS} value={filters.groups || []} onChange={(g) => set({ groups: g })} placeholder="Any account group" />
        </FilterSection>

        <FilterSection title="Company code">
          <Multi options={KV_COMPANY_CODES.map(c => `${c.c} — ${c.n}`)} value={filters.companies || []} onChange={(c) => set({ companies: c })} placeholder="All company codes" />
        </FilterSection>

        <FilterSection title="Purchase organisation">
          <Multi options={KV_PURCH_ORGS} value={filters.purchOrgs || []} onChange={(p) => set({ purchOrgs: p })} placeholder="All purch. orgs" />
        </FilterSection>

        <FilterSection title="Vendor status">
          <div className="flex flex-wrap gap-1.5">
            {["All","Active","Blocked","Flagged"].map(s =>
              <FilterChip key={s} active={(filters.vstatus || "All") === s} onClick={() => set({ vstatus: s })}>{s}</FilterChip>
            )}
          </div>
        </FilterSection>

        <FilterSection title="State (GST state code)">
          <select value={filters.state || ""} onChange={e => set({ state: e.target.value || null })} className="w-full h-9 px-2 rounded-md ring-1 ring-inset ring-ink-200 bg-white text-[12.5px] focus:ring-2 focus:ring-keva-500 outline-none">
            <option value="">Any state</option>
            {KV_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FilterSection>

        <FilterSection title="Last validated">
          <label className="flex items-center gap-2 text-[12.5px] text-ink-700">
            <input type="checkbox" checked={!!filters.neverValidated} onChange={e => set({ neverValidated: e.target.checked })} className="accent-keva-700" />
            Never validated only
          </label>
          <div className="mt-2 text-[11px] text-ink-500">…or validated before</div>
          <input type="date" value={filters.validatedBefore || ""} onChange={e => set({ validatedBefore: e.target.value })} className="mt-1 w-full h-8 px-2 text-[12px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none" />
        </FilterSection>

        <FilterSection title="Annual FY spend ≥">
          <input
            type="range" min={0} max={20000000} step={100000}
            value={filters.spendMin || 0}
            onChange={e => set({ spendMin: Number(e.target.value) })}
            className="w-full accent-keva-700"
          />
          <div className="flex items-center justify-between text-[11px] text-ink-600 mt-1 font-mono tnum">
            <span>₹0</span>
            <span className="text-keva-700 font-semibold">{filters.spendMin ? fmtINR(filters.spendMin, { compact: true }) : "Any"}</span>
            <span>₹2 Cr</span>
          </div>
        </FilterSection>

        <FilterSection title="Tags">
          <div className="flex flex-wrap gap-1.5">
            {["Critical","Single Source"].map(t =>
              <FilterChip key={t} active={(filters.tags || []).includes(t)} onClick={() => set({ tags: (filters.tags || []).includes(t) ? filters.tags.filter(x => x !== t) : [...(filters.tags || []), t] })}>{t}</FilterChip>
            )}
          </div>
        </FilterSection>

        <FilterSection title="Exclusions">
          <label className="flex items-center gap-2 text-[12.5px] text-ink-700">
            <input type="checkbox" checked={!!filters.requirePan} onChange={e => set({ requirePan: e.target.checked })} className="accent-keva-700" />
            Exclude vendors with no PAN on file
          </label>
          <label className="flex items-center gap-2 text-[12.5px] text-ink-700 mt-1.5">
            <input type="checkbox" checked={!!filters.requireGstin} onChange={e => set({ requireGstin: e.target.checked })} className="accent-keva-700" />
            Exclude vendors with no GSTIN on file
          </label>
        </FilterSection>
      </div>

      <div className="px-4 py-3 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
        <button onClick={() => setFilters({})} className="text-[11.5px] text-ink-600 hover:text-rose-700 hover:underline inline-flex items-center gap-1">
          <IconRefresh size={11} /> Reset all
        </button>
        <span className="text-[11px] text-ink-500">{Object.keys(filters).length} active</span>
      </div>
    </aside>
  );
};

// ---------- Check card ----------
const CheckIcon = ({ name, size = 16 }) => {
  const map = { shield: IconShield, receipt: IconReceipt, file: IconFileText, refresh: IconRefresh, sparkles: IconSparkles, bank: IconBank, shieldcheck: IconShieldCheck, arrow: IconArrowUpRight, alert: IconAlertTriangle };
  const Cmp = map[name] || IconFileText;
  return <Cmp size={size} />;
};

const CheckCard = ({ check, on, onToggle }) => (
  <button
    onClick={onToggle}
    className={`text-left p-3.5 rounded-lg bg-white ring-1 transition relative group ${on ? "ring-keva-500 shadow-card bg-keva-50/30" : "ring-ink-200 hover:ring-ink-300 shadow-card"}`}
  >
    <div className="flex items-start gap-3">
      <span className={`w-9 h-9 grid place-items-center rounded-md shrink-0 ${on ? "bg-keva-700 text-white" : "bg-ink-100 text-ink-600"}`}>
        <CheckIcon name={check.icon} size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <div className="text-[13px] font-semibold text-ink-900 truncate">{check.name}</div>
          {check.recommended && <Badge tone="violet">Recommended</Badge>}
        </div>
        <div className="text-[10.5px] text-keva-700 font-mono mt-0.5">{check.source}</div>
        <div className="text-[11.5px] text-ink-600 mt-1.5 leading-snug">{check.desc}</div>
        <div className="flex items-center gap-3 mt-2 text-[10.5px] text-ink-500">
          <span className="inline-flex items-center gap-1"><IconClock size={10} /> ~{check.avgMs} ms</span>
          <span className="inline-flex items-center gap-1 font-mono tnum">₹{check.costPer.toFixed(2)}/vendor</span>
        </div>
      </div>
      <span className={`w-9 h-5 rounded-full transition shrink-0 ${on ? "bg-keva-700" : "bg-ink-200"} relative`}>
        <span className={`absolute top-0.5 ${on ? "left-[18px]" : "left-0.5"} transition-all w-4 h-4 rounded-full bg-white shadow`} />
      </span>
    </div>
  </button>
);

// ---------- Configurator (Step 1) ----------
const CV_Configurator = ({ checks, setChecks, freq, setFreq, staleDays, setStaleDays }) => {
  const allOn = Object.keys(checks).length === CV_CHECKS.length && Object.values(checks).every(Boolean);
  const noneOn = Object.values(checks).every(v => !v);

  return (
    <div className="px-7 py-6 space-y-5">
      <div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="text-[19px] font-semibold tracking-tight text-ink-900">Validation Checks</h2>
            <p className="text-[12.5px] text-ink-500 mt-0.5">Pick which government and regulatory checks to run against each vendor in your selection.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost"     size="sm" onClick={() => setChecks(CV_CHECKS.reduce((a,c) => ({...a,[c.id]: true}), {}))}>Select all</Button>
            <Button variant="ghost"     size="sm" onClick={() => setChecks({})}>Deselect all</Button>
            <Button variant="secondary" size="sm" leading={<IconSparkles size={12} />} onClick={() => setChecks(CV_CHECKS.reduce((a,c) => ({...a, [c.id]: c.recommended}), {}))}>Recommended</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CV_CHECKS.map(c => (
            <CheckCard key={c.id} check={c} on={!!checks[c.id]} onToggle={() => setChecks(cs => ({ ...cs, [c.id]: !cs[c.id] }))} />
          ))}
        </div>
      </div>

      <Card className="!p-5">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold mb-2">Run frequency</div>
            <div className="space-y-1.5">
              {[
                { k:"once",      label:"One-time run",        hint:"Run now and stop." },
                { k:"daily",     label:"Schedule · Daily",    hint:"7:00 AM IST every day." },
                { k:"weekly",    label:"Schedule · Weekly",   hint:"Every Monday 7:00 AM IST." },
                { k:"monthly",   label:"Schedule · Monthly",  hint:"1st of the month, 7:00 AM IST." },
                { k:"quarterly", label:"Schedule · Quarterly",hint:"1st of Apr / Jul / Oct / Jan." },
              ].map(o => (
                <label key={o.k} className={`flex items-start gap-2 p-2 rounded-md ring-1 ring-inset cursor-pointer ${freq === o.k ? "ring-keva-500 bg-keva-50/30" : "ring-ink-200 hover:bg-ink-50/50"}`}>
                  <input type="radio" name="freq" checked={freq === o.k} onChange={() => setFreq(o.k)} className="accent-keva-700 mt-0.5" />
                  <div>
                    <div className="text-[12.5px] font-medium text-ink-900">{o.label}</div>
                    <div className="text-[11px] text-ink-500">{o.hint}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold mb-2">Skip duplicates</div>
            <div className="rounded-md ring-1 ring-inset ring-ink-200 p-3.5">
              <div className="text-[12.5px] text-ink-800 mb-2">Re-validate only if last check is older than</div>
              <div className="flex items-center gap-2">
                <input type="number" value={staleDays} min={0} max={365}
                  onChange={e => setStaleDays(Number(e.target.value))}
                  className="h-9 w-20 px-2 text-[13px] font-mono rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none text-center" />
                <span className="text-[12.5px] text-ink-600">days</span>
              </div>
              <div className="text-[11px] text-ink-500 mt-2 inline-flex items-start gap-1">
                <IconInfo size={11} className="mt-0.5" />
                <span>Skips API calls for vendors validated within this window — saves on API cost without compromising freshness.</span>
              </div>
            </div>
            <div className="mt-3 rounded-md bg-amber-50 ring-1 ring-inset ring-amber-200 px-3 py-2 text-[11.5px] text-amber-900 flex items-start gap-2">
              <IconAlertTriangle size={13} className="mt-0.5" />
              <div>
                <strong>Tip:</strong> Use <em>{allOn ? "Recommended" : noneOn ? "Recommended" : "all 10 checks"}</em> for a baseline compliance health run. PAN ↔ GSTIN linkage is free — it's a local cross-check, not an API call.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ---------- Run progress overlay ----------
const CV_RunOverlay = ({ progress, currentVendor, currentCheck, total, onCancel }) => (
  <div className="fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm grid place-items-center p-6">
    <div className="bg-white rounded-xl shadow-pop w-full max-w-lg overflow-hidden ring-1 ring-ink-200">
      <div className="px-6 py-5 border-b border-ink-200">
        <div className="flex items-center gap-2 text-[11.5px] text-keva-700 font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-keva-500 animate-pulse" /> Validation in progress
        </div>
        <h3 className="text-[17px] font-semibold text-ink-900 mt-1">Running compliance checks…</h3>
        <p className="text-[12.5px] text-ink-500 mt-0.5 font-mono">
          Validating vendor <span className="text-keva-700 font-semibold tnum">{Math.min(progress + 1, total)}</span> of {total} · {currentCheck}
        </p>
      </div>
      <div className="px-6 py-5">
        <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-keva-500 to-keva-700 transition-all" style={{width: `${(progress / total) * 100}%`}} />
        </div>
        <div className="flex items-center justify-between text-[11.5px] text-ink-600 mt-2 font-mono tnum">
          <span>{Math.round((progress / total) * 100)}% complete</span>
          <span>ETA {Math.max(1, Math.round((total - progress) * 0.4))}s</span>
        </div>
        <div className="mt-4 rounded-md ring-1 ring-inset ring-ink-200 px-3 py-2.5 bg-ink-50/50">
          <div className="text-[11px] text-ink-500 uppercase tracking-wider font-semibold">Currently checking</div>
          <div className="text-[13px] font-medium text-ink-900 mt-0.5 truncate">{currentVendor}</div>
        </div>
      </div>
      <div className="px-6 py-3.5 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
        <div className="text-[11px] text-ink-500 inline-flex items-center gap-1"><IconInfo size={11} /> You can leave this page — we'll email you when it's done.</div>
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel run</Button>
      </div>
    </div>
  </div>
);

// ---------- Results dashboard ----------
const StatusDot = ({ s, label }) => {
  const tone = s === "pass" ? "bg-emerald-500" : s === "warn" ? "bg-amber-400" : s === "fail" ? "bg-rose-500" : "bg-ink-300";
  return <span title={label} className={`inline-block w-2 h-2 rounded-full ${tone}`} />;
};

const StatusCell = ({ s }) => {
  if (s === "na") return <span className="text-ink-300 text-[12px]">—</span>;
  if (s === "pass") return <Badge tone="green" icon={<IconCheck size={10} />}>Pass</Badge>;
  if (s === "warn") return <Badge tone="amber" icon={<IconAlertTriangle size={10} />}>Warn</Badge>;
  return <Badge tone="red" icon={<IconX size={10} />}>Fail</Badge>;
};

const FilingDots = ({ filings }) => {
  if (!filings) return <span className="text-ink-300 text-[11px]">N/A</span>;
  const months = ["Apr","Mar","Feb","Jan","Dec","Nov"];
  return (
    <div className="inline-flex items-center gap-1" title="Last 6 months — most recent first">
      {filings.map((f, i) => (
        <span key={i} className="flex flex-col items-center">
          <span className={`w-2.5 h-2.5 rounded-full ${f ? "bg-emerald-500" : "bg-rose-500"}`} />
          <span className="text-[8px] text-ink-400 mt-0.5">{months[i]}</span>
        </span>
      ))}
    </div>
  );
};

const ScoreBar = ({ score }) => {
  const tone = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-400" : "bg-rose-500";
  const text = score >= 80 ? "text-emerald-700" : score >= 50 ? "text-amber-800" : "text-rose-700";
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
        <div className={`h-full ${tone}`} style={{width: `${score}%`}} />
      </div>
      <span className={`text-[12px] font-mono tnum font-semibold ${text} w-8 text-right`}>{score}</span>
    </div>
  );
};

const CV_KPI = ({ icon, label, value, tone, hint }) => {
  const tones = {
    keva:    "bg-keva-50/70    text-keva-700    ring-keva-200",
    green:   "bg-emerald-50    text-emerald-700 ring-emerald-200",
    amber:   "bg-amber-50      text-amber-800   ring-amber-200",
    rose:    "bg-rose-50       text-rose-700    ring-rose-200",
    neutral: "bg-ink-100       text-ink-700     ring-ink-200",
  };
  return (
    <Card className="!p-4">
      <div className={`w-8 h-8 grid place-items-center rounded-md ${tones[tone]} ring-1 ring-inset`}>{icon}</div>
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500 mt-3">{label}</div>
      <div className="text-[24px] font-semibold text-ink-900 mt-0.5 tnum">{value}</div>
      <div className="text-[11px] text-ink-500 mt-0.5">{hint}</div>
    </Card>
  );
};

const CV_VendorDrawer = ({ vendor, onClose }) => {
  if (!vendor) return null;
  const r = CV_RESULTS[vendor.code];
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 bottom-0 w-[640px] bg-white shadow-pop flex flex-col">
        <div className="px-6 py-5 border-b border-ink-200">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] text-ink-500 font-mono">{vendor.code} · {vendor.group} · {KV_COMPANY_CODES.find(c => c.c === vendor.company)?.n}</div>
              <h2 className="text-[18px] font-semibold text-ink-900 mt-1">{vendor.name}</h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge tone="neutral">PAN <span className="font-mono ml-1">{vendor.pan}</span></Badge>
                <Badge tone="neutral">GSTIN <span className="font-mono ml-1">{vendor.gstin}</span></Badge>
                <Badge tone="neutral">{vendor.state}</Badge>
                {vendor.msme && <Badge tone="violet">MSME</Badge>}
                <Badge tone={vendor.status === "Active" ? "green" : vendor.status === "Blocked" ? "red" : "amber"}>{vendor.status}</Badge>
              </div>
            </div>
            <button onClick={onClose} className="text-ink-400 hover:text-ink-800"><IconX size={18} /></button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-md ring-1 ring-inset ring-ink-200 p-2.5 bg-ink-50/40">
              <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">Compliance score</div>
              <div className="mt-1"><ScoreBar score={r.score} /></div>
            </div>
            <div className="rounded-md ring-1 ring-inset ring-ink-200 p-2.5 bg-ink-50/40">
              <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">FY 26-27 spend</div>
              <div className="text-[14px] font-mono tnum text-ink-900 mt-1.5">{fmtINR(vendor.spend, {compact:true})}</div>
            </div>
            <div className="rounded-md ring-1 ring-inset ring-ink-200 p-2.5 bg-ink-50/40">
              <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">Last validated</div>
              <div className="text-[12.5px] text-ink-900 mt-1.5">{vendor.lastValidated || "Never"}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {r.issues.length === 0 ? (
            <div className="rounded-md bg-emerald-50 ring-1 ring-inset ring-emerald-200 px-4 py-3 flex items-start gap-3 text-emerald-900">
              <IconCheckCircle size={18} className="mt-0.5" />
              <div className="text-[12.5px]">All compliance checks passed for this vendor. No action required.</div>
            </div>
          ) : (
            <div>
              <SectionTitle hint="Each issue is matched to a specific API response field. Raise a correction request to push the vendor master team for an update.">
                Discrepancies ({r.issues.length})
              </SectionTitle>
              <div className="space-y-2">
                {r.issues.map((iss, i) => {
                  const sevToTone = { fail:"red", warn:"amber" };
                  const sevToBg   = { fail:"bg-rose-50 ring-rose-200", warn:"bg-amber-50 ring-amber-200" };
                  return (
                    <div key={i} className={`rounded-md ring-1 ring-inset px-3.5 py-3 ${sevToBg[iss.severity]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge tone={sevToTone[iss.severity]} icon={iss.severity === "fail" ? <IconX size={10} /> : <IconAlertTriangle size={10} />}>
                          {iss.severity === "fail" ? "Failed" : "Warning"}
                        </Badge>
                        <span className="text-[10.5px] text-ink-500 font-mono uppercase tracking-wider">{CV_CHECKS.find(c => c.id === iss.check)?.name || iss.check}</span>
                      </div>
                      <div className="text-[13px] font-semibold text-ink-900">{iss.title}</div>
                      <div className="text-[12px] text-ink-700 mt-0.5">{iss.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <SectionTitle hint="Per-check status from the latest run.">All check results</SectionTitle>
            <div className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-ink-50/60 border-b border-ink-200">
                    <th className="px-3 py-2 text-left text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Check</th>
                    <th className="px-3 py-2 text-left text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Source</th>
                    <th className="px-3 py-2 text-right text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CV_CHECKS.map(c => (
                    <tr key={c.id} className="border-b border-ink-200/60 last:border-0">
                      <td className="px-3 py-2 text-ink-800">{c.name}</td>
                      <td className="px-3 py-2 text-ink-500 text-[11.5px] font-mono">{c.source}</td>
                      <td className="px-3 py-2 text-right"><StatusCell s={r[c.id]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {r.gst_filings && (
            <div>
              <SectionTitle>GSTR-3B filing trail · last 6 months</SectionTitle>
              <div className="flex gap-2">
                {r.gst_filings.map((f, i) => {
                  const months = ["Apr 26","Mar 26","Feb 26","Jan 26","Dec 25","Nov 25"];
                  return (
                    <div key={i} className={`flex-1 rounded-md ring-1 ring-inset px-2.5 py-2 text-center ${f ? "ring-emerald-200 bg-emerald-50/60" : "ring-rose-200 bg-rose-50/60"}`}>
                      <div className={`text-[14px] font-semibold ${f ? "text-emerald-700" : "text-rose-700"}`}>{f ? "Filed" : "Missed"}</div>
                      <div className={`text-[10.5px] mt-0.5 ${f ? "text-emerald-700/80" : "text-rose-700/80"}`}>{months[i]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
          <Button variant="ghost" size="sm" leading={<IconDownload size={13} />}>Export this vendor</Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" leading={<IconMessageSquare size={13} />}>Email vendor</Button>
            <Button variant="primary"   size="sm" leading={<IconArrowUpRight size={13} />}>Raise correction request</Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

const CV_ResultsDashboard = ({ vendors, onOpenVendor, onReconfigure }) => {
  const [sort, setSort] = React.useState({ key: "score", dir: "asc" });
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState({});

  const counts = React.useMemo(() => {
    let pass = 0, warn = 0, fail = 0, na = 0;
    vendors.forEach(v => {
      const r = CV_RESULTS[v.code];
      if (r.issues.length === 0) pass++;
      else if (r.issues.some(i => i.severity === "fail")) fail++;
      else warn++;
    });
    return { pass, warn, fail, na };
  }, [vendors]);

  const checkRows = CV_CHECKS.map(c => {
    let pass = 0, warn = 0, fail = 0, na = 0;
    vendors.forEach(v => {
      const s = CV_RESULTS[v.code][c.id];
      if (s === "pass") pass++;
      else if (s === "warn") warn++;
      else if (s === "fail") fail++;
      else na++;
    });
    return { label: c.name, pass, warn, fail, na };
  });

  const filtered = vendors.filter(v => {
    const r = CV_RESULTS[v.code];
    if (filter === "pass" && r.issues.length !== 0) return false;
    if (filter === "warn" && !r.issues.some(i => i.severity === "warn") && !r.issues.some(i => i.severity === "fail")) return false;
    if (filter === "warn" && r.issues.some(i => i.severity === "fail")) return false;
    if (filter === "fail" && !r.issues.some(i => i.severity === "fail")) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    const ar = CV_RESULTS[a.code], br = CV_RESULTS[b.code];
    if (sort.key === "score") return sort.dir === "asc" ? ar.score - br.score : br.score - ar.score;
    if (sort.key === "name")  return sort.dir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (sort.key === "code")  return sort.dir === "asc" ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code);
    if (sort.key === "spend") return sort.dir === "asc" ? a.spend - b.spend : b.spend - a.spend;
    return 0;
  });

  const toggleSort = (k) => setSort(s => s.key === k ? { key: k, dir: s.dir === "asc" ? "desc" : "asc" } : { key: k, dir: "asc" });

  const allSelected = sorted.length > 0 && sorted.every(v => selected[v.code]);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="px-7 py-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11.5px] text-keva-700 font-semibold uppercase tracking-wider">
            <IconCheckCircle size={13} /> Run completed
          </div>
          <h2 className="text-[19px] font-semibold tracking-tight text-ink-900 mt-1">Results Dashboard</h2>
          <p className="text-[12.5px] text-ink-500 mt-0.5">Compliance run executed on {vendors.length} vendors · 10 May 2026 · 12:48 IST</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost"     size="sm" onClick={onReconfigure} leading={<IconRefresh size={13} />}>Re-configure run</Button>
          <Button variant="secondary" size="sm" leading={<IconDownload size={13} />}>Export to Excel</Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-3">
        <CV_KPI icon={<IconBuilding size={15} />}        label="Vendors validated"        value={vendors.length}    tone="keva"    hint="Total run scope" />
        <CV_KPI icon={<IconCheckCircle size={15} />}     label="Fully compliant"          value={counts.pass}       tone="green"   hint={`${Math.round(counts.pass / vendors.length * 100)}% of total`} />
        <CV_KPI icon={<IconAlertTriangle size={15} />}   label="Partial / Discrepancy"    value={counts.warn}       tone="amber"   hint="Warnings raised" />
        <CV_KPI icon={<IconXCircle size={15} />}         label="Non-compliant"            value={counts.fail}       tone="rose"    hint="Block from new POs" />
        <CV_KPI icon={<IconInfo size={15} />}            label="API errors"               value={0}                 tone="neutral" hint="Could not verify" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="!p-5 col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-ink-900">Compliance breakdown</h3>
              <p className="text-[11.5px] text-ink-500 mt-0.5">Overall status across {vendors.length} validated vendors</p>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-3">
            <Donut data={[
              { value: counts.pass, color: "#10b981" },
              { value: counts.warn, color: "#fbbf24" },
              { value: counts.fail, color: "#f43f5e" },
            ]} />
            <div className="space-y-2 flex-1 min-w-0">
              {[
                { c:"#10b981", l:"Fully compliant", v: counts.pass },
                { c:"#fbbf24", l:"Discrepancy",     v: counts.warn },
                { c:"#f43f5e", l:"Non-compliant",   v: counts.fail },
              ].map(d => (
                <div key={d.l} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{background: d.c}} />
                    <span className="text-[12px] text-ink-700">{d.l}</span>
                  </div>
                  <span className="font-mono tnum text-[12.5px] font-semibold text-ink-900">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="!p-5 col-span-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[13px] font-semibold text-ink-900">Check-wise pass / fail</h3>
              <p className="text-[11.5px] text-ink-500 mt-0.5">How each individual check performed across the cohort</p>
            </div>
            <div className="flex items-center gap-3 text-[10.5px] text-ink-500">
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500" /> Pass</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> Warn</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-500" /> Fail</span>
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-ink-300" /> N/A</span>
            </div>
          </div>
          <StackedBars rows={checkRows} />
        </Card>
      </div>

      {/* Vendor results table */}
      <Card padded={false}>
        <div className="px-4 py-3 border-b border-ink-200 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[
              { k:"all",  l:"All",            t:vendors.length, tone:"" },
              { k:"pass", l:"Compliant",      t:counts.pass,    tone:"emerald" },
              { k:"warn", l:"Discrepancy",    t:counts.warn,    tone:"amber" },
              { k:"fail", l:"Non-compliant",  t:counts.fail,    tone:"rose" },
            ].map(t => (
              <button key={t.k} onClick={() => setFilter(t.k)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium inline-flex items-center gap-1.5 transition ${filter === t.k ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"}`}>
                {t.l}
                <span className={`text-[10.5px] font-semibold ${filter === t.k ? "text-white/80" : "text-ink-400"}`}>{t.t}</span>
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <IconSearch size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendor or code…"
              className="h-8 pl-7 pr-3 text-[12.5px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-keva-500 outline-none w-60" />
          </div>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] text-ink-600 font-medium">{selectedCount} selected</span>
              <Button variant="secondary" size="sm" leading={<IconMessageSquare size={12} />}>Email</Button>
              <Button variant="secondary" size="sm" leading={<IconShield size={12} />}>Block in SAP</Button>
              <Button variant="secondary" size="sm" leading={<IconDownload size={12} />}>Export</Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left border-b border-ink-200 bg-ink-50/50">
                <th className="px-3 py-2.5 w-8">
                  <input type="checkbox" checked={allSelected}
                    onChange={e => setSelected(e.target.checked ? Object.fromEntries(sorted.map(v => [v.code, true])) : {})}
                    className="accent-keva-700" />
                </th>
                {[
                  { k:"code", l:"Vendor Code" },
                  { k:"name", l:"Vendor" },
                  { k:null,   l:"PAN" },
                  { k:null,   l:"GSTIN" },
                  { k:null,   l:"GST Status" },
                  { k:null,   l:"GSTR Filing (6M)" },
                  { k:null,   l:"PAN" },
                  { k:null,   l:"TAN" },
                  { k:null,   l:"MSME" },
                  { k:null,   l:"Bank" },
                  { k:"score",l:"Score" },
                  { k:null,   l:"Last Run" },
                  { k:null,   l:"", align: "right" },
                ].map(c => (
                  <th key={c.l + (c.k || "")} className={`px-3 py-2.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 ${c.align === "right" ? "text-right" : ""} ${c.k ? "cursor-pointer hover:text-ink-900" : ""}`}
                    onClick={() => c.k && toggleSort(c.k)}>
                    <span className="inline-flex items-center gap-0.5">{c.l}{c.k && sort.key === c.k && <span className="text-[9px]">{sort.dir === "asc" ? "▲" : "▼"}</span>}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(v => {
                const r = CV_RESULTS[v.code];
                return (
                  <tr key={v.code} onClick={() => onOpenVendor(v)}
                    className="border-b border-ink-200/60 last:border-0 cursor-pointer hover:bg-keva-50/30">
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={!!selected[v.code]}
                        onChange={e => setSelected(s => ({...s, [v.code]: e.target.checked}))}
                        className="accent-keva-700" />
                    </td>
                    <td className="px-3 py-3 font-mono text-[11.5px] text-ink-900">{v.code}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-ink-900 font-medium">{v.name}</span>
                        {v.tags.includes("Critical") && <Badge tone="red">Critical</Badge>}
                      </div>
                      <div className="text-[10.5px] text-ink-500 mt-0.5">{v.group} · {v.state}</div>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-ink-600">{v.pan}</td>
                    <td className="px-3 py-3 font-mono text-[11px] text-ink-600">{v.gstin}</td>
                    <td className="px-3 py-3"><StatusCell s={r.gstin} /></td>
                    <td className="px-3 py-3"><FilingDots filings={r.gst_filings} /></td>
                    <td className="px-3 py-3"><StatusCell s={r.pan} /></td>
                    <td className="px-3 py-3"><StatusCell s={r.tan} /></td>
                    <td className="px-3 py-3"><StatusCell s={r.msme} /></td>
                    <td className="px-3 py-3"><StatusCell s={r.bank} /></td>
                    <td className="px-3 py-3"><ScoreBar score={r.score} /></td>
                    <td className="px-3 py-3 text-ink-500 text-[11px]">{v.lastValidated || "Never"}</td>
                    <td className="px-3 py-3 text-right">
                      <button className="text-ink-400 hover:text-keva-700"><IconChevronRight size={14} /></button>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr><td colSpan={13} className="px-4 py-12 text-center text-ink-400 text-[12.5px]">No vendors match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ---------- Run summary rail (right) ----------
const CV_SummaryRail = ({ matchCount, checks, freq, onRun, lastRunBanner }) => {
  const selectedChecks = CV_CHECKS.filter(c => checks[c.id]);
  const totalCalls = matchCount * selectedChecks.length;
  const cost = selectedChecks.reduce((s, c) => s + c.costPer, 0) * matchCount;
  const eta = Math.max(1, Math.round(totalCalls * 0.3 / 60));
  const canRun = matchCount > 0 && selectedChecks.length > 0;

  return (
    <aside className="w-[280px] shrink-0 border-l border-ink-200 bg-white flex flex-col overflow-y-auto">
      <div className="px-5 py-4 border-b border-ink-200">
        <div className="text-[12.5px] font-semibold text-ink-900">Run Summary</div>
        <div className="text-[10.5px] text-ink-500">Live calculation</div>
      </div>

      <div className="px-5 py-5 space-y-4">
        <div className="rounded-lg ring-1 ring-inset ring-keva-200 bg-keva-50/50 px-3.5 py-3">
          <div className="text-[10.5px] uppercase tracking-wider text-keva-700 font-semibold">Matching vendors</div>
          <div className="text-[34px] font-semibold text-keva-700 tnum leading-none mt-1">{matchCount}</div>
        </div>

        <div className="space-y-2.5">
          <KV k="Checks selected"     v={<span className="font-mono tnum">{selectedChecks.length} / {CV_CHECKS.length}</span>} />
          <KV k="Total API calls"     v={<span className="font-mono tnum">{totalCalls.toLocaleString("en-IN")}</span>} />
          <KV k="Estimated API cost"  v={<span className="font-mono tnum">₹{cost.toFixed(2)}</span>} />
          <KV k="Estimated runtime"   v={<span className="font-mono tnum">{eta < 1 ? "< 1 min" : `~${eta} min`}</span>} />
          <KV k="Frequency"           v={<span className="capitalize">{freq === "once" ? "One-time" : `Scheduled · ${freq}`}</span>} />
        </div>

        <Divider />

        <div className="space-y-1.5 text-[11.5px]">
          <div className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Selected checks</div>
          {selectedChecks.length === 0 && (
            <div className="text-ink-400 text-[12px] italic">No checks selected</div>
          )}
          {selectedChecks.map(c => (
            <div key={c.id} className="flex items-center gap-2 text-ink-700">
              <IconCheck size={11} className="text-keva-700 shrink-0" />
              <span className="truncate">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto px-5 py-4 border-t border-ink-200 bg-ink-50/40 space-y-2 sticky bottom-0">
        <Button variant="primary" size="md" className="w-full !bg-keva-700 hover:!bg-keva-800"
          onClick={onRun} disabled={!canRun} leading={<IconArrowUpRight size={14} />}>
          Run validation
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm">Save as draft</Button>
          <Button variant="secondary" size="sm" leading={<IconCalendar size={12} />}>Schedule</Button>
        </div>
        {!canRun && (
          <div className="text-[10.5px] text-ink-500 inline-flex items-start gap-1 mt-1">
            <IconInfo size={11} className="mt-0.5" />
            <span>Select at least 1 vendor and 1 check to proceed.</span>
          </div>
        )}
      </div>
    </aside>
  );
};

// =====================================================================================
// MAIN PAGE
// =====================================================================================
const VendorCompliance = () => {
  const [filters, setFilters] = React.useState({});
  const [checks, setChecks] = React.useState(CV_CHECKS.reduce((a, c) => ({ ...a, [c.id]: c.recommended }), {}));
  const [freq, setFreq] = React.useState("once");
  const [staleDays, setStaleDays] = React.useState(30);
  const [collapsed, setCollapsed] = React.useState(false);
  const [phase, setPhase] = React.useState("config");  // config | running | results
  const [progress, setProgress] = React.useState(0);
  const [openVendor, setOpenVendor] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  // Filter logic
  const matching = React.useMemo(() => CV_VENDORS.filter(v => {
    const f = filters;
    // Vendor status
    if (f.vstatus && f.vstatus !== "All" && v.status !== f.vstatus) return false;
    // Account group
    if (f.groups && f.groups.length && !f.groups.includes(v.group)) return false;
    // Company code (match by leading 4-digit code)
    if (f.companies && f.companies.length) {
      const codes = f.companies.map(s => s.slice(0, 4));
      if (!codes.includes(v.company)) return false;
    }
    // State
    if (f.state && v.state !== f.state) return false;
    // Spend
    if (f.spendMin && v.spend < f.spendMin) return false;
    // Tags
    if (f.tags && f.tags.length && !f.tags.some(t => v.tags.includes(t))) return false;
    // Require PAN / GSTIN
    if (f.requirePan && v.pan === "—") return false;
    if (f.requireGstin && v.gstin === "—") return false;
    // Date preset
    if (f.datePreset) {
      const created = new Date(v.created);
      const now = new Date("2026-05-10");
      let from = null, to = now;
      if (f.datePreset === "7d")     from = new Date(now); from && from.setDate(now.getDate() - 7);
      if (f.datePreset === "30d")  { from = new Date(now); from.setDate(now.getDate() - 30); }
      if (f.datePreset === "thisFY"){ from = new Date("2026-04-01"); }
      if (f.datePreset === "lastFY"){ from = new Date("2025-04-01"); to = new Date("2026-03-31"); }
      if (f.datePreset === "custom"){ if (f.dateFrom) from = new Date(f.dateFrom); if (f.dateTo) to = new Date(f.dateTo); }
      if (from && created < from) return false;
      if (to && created > to) return false;
    }
    // Never validated
    if (f.neverValidated && v.lastValidated) return false;
    // Validated before
    if (f.validatedBefore && v.lastValidated && new Date(v.lastValidated) >= new Date(f.validatedBefore)) return false;
    // Code range
    if (f.codeFrom && v.code < f.codeFrom) return false;
    if (f.codeTo   && v.code > f.codeTo) return false;
    return true;
  }), [filters]);

  const onLoadPreset = (id) => {
    const p = CV_PRESETS.find(x => x.id === id);
    if (p) setFilters({ ...p.filters, presetId: id });
    else setFilters({});
  };

  // Simulated run
  const onRun = () => {
    setPhase("running");
    setProgress(0);
    const total = matching.length;
    let i = 0;
    const tick = () => {
      i++;
      setProgress(i);
      if (i >= total) {
        setTimeout(() => setPhase("results"), 250);
      } else {
        setTimeout(tick, 90 + Math.random() * 90);
      }
    };
    setTimeout(tick, 250);
  };

  const onCancel = () => { setPhase("config"); setProgress(0); };

  // Live banner stats
  const overallHealth = Math.round((CV_VENDORS.filter(v => CV_RESULTS[v.code].issues.length === 0).length / CV_VENDORS.length) * 100);

  const currentCheck = CV_CHECKS.filter(c => checks[c.id])[Math.floor(progress / Math.max(1, matching.length / 5)) % Math.max(1, Object.values(checks).filter(Boolean).length)] || CV_CHECKS[0];
  const currentVendor = matching[Math.min(progress, matching.length - 1)]?.name || "—";

  return (
    <div className="flex h-full bg-ink-50">
      <CV_FilterRail
        filters={filters}
        setFilters={setFilters}
        matchCount={matching.length}
        total={CV_VENDORS.length}
        onLoadPreset={onLoadPreset}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Breadcrumb + health banner */}
        <div className="px-7 pt-5 pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11.5px] text-ink-500">
              <span className="hover:text-ink-800 cursor-pointer">Home</span>
              <IconChevronRight size={11} />
              <span className="hover:text-ink-800 cursor-pointer">Vendor Master</span>
              <IconChevronRight size={11} />
              <span className="text-ink-900 font-medium">Compliance Validation</span>
            </div>
            <button className="text-[11.5px] text-ink-500 hover:text-ink-900 inline-flex items-center gap-1">
              <IconClock size={12} /> Audit trail
            </button>
          </div>

          <div className="rounded-lg ring-1 ring-inset ring-keva-200 bg-gradient-to-r from-keva-50/80 to-keva-50/20 px-4 py-3 flex items-center gap-4">
            <div className="w-10 h-10 grid place-items-center rounded-md bg-white ring-1 ring-inset ring-keva-200 text-keva-700">
              <IconShieldCheck size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-keva-900">Last bulk run · 06 May 2026 · 12,418 vendors validated</div>
              <div className="text-[11.5px] text-keva-700/80">Overall vendor master compliance health · <span className="font-mono tnum font-semibold">{overallHealth}%</span> of master is fully compliant on all 10 government checks.</div>
            </div>
            <div className="text-right">
              <div className="text-[10.5px] uppercase tracking-wider text-keva-700 font-semibold">Health</div>
              <div className="text-[20px] font-semibold text-keva-700 tnum leading-none">{overallHealth}%</div>
            </div>
          </div>
        </div>

        {/* Page title + content */}
        <div className="px-7 pt-2 pb-4 flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-ink-900">Vendor Compliance Validation</h1>
            <p className="text-[13px] text-ink-500 mt-0.5 max-w-2xl">Run bulk API-based validations of vendor master records against Indian Government and regulatory portals. Pick your scope on the left, choose checks below, then run.</p>
          </div>
          {phase === "results" && (
            <Badge tone="green" icon={<IconCheck size={11} />}>{matching.length} vendors validated</Badge>
          )}
        </div>

        {phase === "config" && <CV_Configurator checks={checks} setChecks={setChecks} freq={freq} setFreq={setFreq} staleDays={staleDays} setStaleDays={setStaleDays} />}
        {phase === "results" && <CV_ResultsDashboard vendors={matching} onOpenVendor={setOpenVendor} onReconfigure={() => setPhase("config")} />}
      </main>

      <CV_SummaryRail matchCount={matching.length} checks={checks} freq={freq} onRun={onRun} />

      {phase === "running" && (
        <CV_RunOverlay progress={progress} total={matching.length} currentVendor={currentVendor} currentCheck={currentCheck.name} onCancel={onCancel} />
      )}

      <CV_VendorDrawer vendor={openVendor} onClose={() => setOpenVendor(null)} />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink-900 text-white px-4 py-3 rounded-md shadow-pop flex items-center gap-2 text-[12.5px]">
          <IconCheck size={14} /> {toast}
        </div>
      )}
    </div>
  );
};

window.VendorCompliance = VendorCompliance;
