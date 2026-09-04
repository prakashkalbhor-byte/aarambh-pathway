
/* ===== icons.jsx ===== */
// Lucide-style icons, hand-rolled as React components.
// Stroke 1.6 for a refined, professional weight.

const Icon = ({ children, size = 18, className = "", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

const IconClipboardCheck = (p) => (
  <Icon {...p}>
    <rect x="8" y="3" width="8" height="4" rx="1" />
    <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </Icon>
);
const IconLayoutDashboard = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Icon>
);
const IconShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const IconTruck = (p) => (
  <Icon {...p}>
    <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" />
    <path d="M14 8h4l3 4v5a1 1 0 0 1-1 1h-2" />
    <circle cx="7.5" cy="18.5" r="2" />
    <circle cx="17.5" cy="18.5" r="2" />
  </Icon>
);
const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12 5 5L20 7" />
  </Icon>
);
const IconCheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5L16 9.5" />
  </Icon>
);
const IconX = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);
const IconXCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </Icon>
);
const IconInfo = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </Icon>
);
const IconChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);
const IconChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);
const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const IconArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Icon>
);
const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const IconBell = (p) => (
  <Icon {...p}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);
const IconUpload = (p) => (
  <Icon {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8 12 3 7 8" />
    <path d="M12 3v12" />
  </Icon>
);
const IconFile = (p) => (
  <Icon {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
  </Icon>
);
const IconFileText = (p) => (
  <Icon {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8M8 17h6" />
  </Icon>
);
const IconBuilding = (p) => (
  <Icon {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
  </Icon>
);
const IconBank = (p) => (
  <Icon {...p}>
    <path d="M3 10 12 4l9 6" />
    <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
    <path d="M3 20h18" />
  </Icon>
);
const IconReceipt = (p) => (
  <Icon {...p}>
    <path d="M4 4v17l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Icon>
);
const IconCircleDollar = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H9" />
    <path d="M12 7v2M12 15v2" />
  </Icon>
);
const IconPackage = (p) => (
  <Icon {...p}>
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
    <path d="m21 16-9 5-9-5V8l9-5 9 5Z" />
  </Icon>
);
const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
const IconCircleHelp = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
    <path d="M12 17h.01" />
  </Icon>
);
const IconDownload = (p) => (
  <Icon {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </Icon>
);
const IconEye = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const IconFilter = (p) => (
  <Icon {...p}>
    <path d="M3 5h18l-7 8v6l-4-2v-4Z" />
  </Icon>
);
const IconDots = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="6" r="1.2" />
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="12" cy="18" r="1.2" />
  </Icon>
);
const IconLogout = (p) => (
  <Icon {...p}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17l-5-5 5-5" />
    <path d="M15 12H5" />
  </Icon>
);
const IconSettings = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </Icon>
);
const IconShield = (p) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </Icon>
);
const IconMessageSquare = (p) => (
  <Icon {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </Icon>
);
const IconRefresh = (p) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
    <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
    <path d="M21 3v5h-5M3 21v-5h5" />
  </Icon>
);
const IconSparkles = (p) => (
  <Icon {...p}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    <path d="m6 6 2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
  </Icon>
);
const IconPlus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </Icon>
);
const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </Icon>
);

Object.assign(window, {
  Icon,
  IconClipboardCheck, IconLayoutDashboard, IconShieldCheck, IconTruck,
  IconCheck, IconCheckCircle, IconX, IconXCircle,
  IconAlertTriangle, IconInfo, IconChevronRight, IconChevronLeft, IconChevronDown,
  IconArrowUpRight, IconSearch, IconBell, IconUpload, IconFile, IconFileText,
  IconBuilding, IconBank, IconReceipt, IconCircleDollar, IconPackage,
  IconClock, IconCircleHelp, IconDownload, IconEye, IconFilter, IconDots,
  IconLogout, IconSettings, IconShield, IconMessageSquare, IconRefresh,
  IconSparkles, IconPlus, IconCalendar, IconUser,
});



/* ===== ui.jsx ===== */
// Shared UI primitives — Badge, Button, Card, Field, Table, etc.

const Badge = ({ tone = "neutral", children, className = "", icon = null }) => {
  const tones = {
    neutral: "bg-ink-100 text-ink-700 ring-ink-200",
    green:   "bg-emerald-50 text-emerald-700 ring-emerald-200",
    red:     "bg-rose-50 text-rose-700 ring-rose-200",
    amber:   "bg-amber-50 text-amber-800 ring-amber-200",
    blue:    "bg-brand-50 text-brand-700 ring-brand-100",
    violet:  "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tones[tone]} ${className}`}>
      {icon}
      {children}
    </span>
  );
};

const StatusChip = ({ status }) => {
  const map = {
    "Active":         { tone: "green", icon: <IconCheck size={11} /> },
    "Approved":       { tone: "green", icon: <IconCheck size={11} /> },
    "Verified":       { tone: "green", icon: <IconCheck size={11} /> },
    "Matched":        { tone: "green", icon: <IconCheck size={11} /> },
    "Completed":      { tone: "green", icon: <IconCheck size={11} /> },
    "Paid":           { tone: "green", icon: <IconCheck size={11} /> },
    "Delivered":      { tone: "green", icon: <IconCheck size={11} /> },
    "Accepted":       { tone: "green", icon: <IconCheck size={11} /> },
    "Open":           { tone: "blue" },
    "In Transit":     { tone: "blue" },
    "Pending":        { tone: "amber",  icon: <IconClock size={11} /> },
    "Under Review":   { tone: "amber",  icon: <IconClock size={11} /> },
    "Partial":        { tone: "amber" },
    "Awaiting GRN":   { tone: "amber" },
    "Awaiting Docs":  { tone: "amber" },
    "Query Raised":   { tone: "violet", icon: <IconMessageSquare size={11} /> },
    "Rejected":       { tone: "red",    icon: <IconX size={11} /> },
    "Failed":         { tone: "red",    icon: <IconX size={11} /> },
    "Not Found":      { tone: "red",    icon: <IconX size={11} /> },
    "Cancelled":      { tone: "red" },
  };
  const cfg = map[status] || { tone: "neutral" };
  return <Badge tone={cfg.tone} icon={cfg.icon}>{status}</Badge>;
};

const RiskBadge = ({ score }) => {
  let tone = "green";
  let label = "Low";
  if (score >= 70) { tone = "red"; label = "High"; }
  else if (score >= 40) { tone = "amber"; label = "Medium"; }
  return (
    <span className="inline-flex items-center gap-1.5">
      <Badge tone={tone}>{label}</Badge>
      <span className="font-mono text-[11px] text-ink-500 tnum">{score}</span>
    </span>
  );
};

const Button = ({ variant = "primary", size = "md", className = "", children, leading = null, trailing = null, ...rest }) => {
  const sizes = {
    sm: "h-7 px-2.5 text-[12px] gap-1",
    md: "h-9 px-3.5 text-[13px] gap-1.5",
    lg: "h-11 px-5 text-[14px] gap-2",
  };
  const variants = {
    primary:  "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-900",
    secondary:"bg-white text-ink-800 ring-1 ring-inset ring-ink-200 hover:bg-ink-50",
    ghost:    "text-ink-700 hover:bg-ink-100",
    danger:   "bg-rose-600 text-white hover:bg-rose-700",
    success:  "bg-emerald-600 text-white hover:bg-emerald-700",
    warning:  "bg-amber-500 text-white hover:bg-amber-600",
    brand:    "bg-brand-600 text-white hover:bg-brand-700",
    link:     "text-brand-700 hover:underline px-0 h-auto",
  };
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
};

const Card = ({ className = "", children, padded = true, ...rest }) => (
  <div className={`bg-white rounded-lg ring-1 ring-ink-200/70 shadow-card ${padded ? "p-5" : ""} ${className}`} {...rest}>
    {children}
  </div>
);

const SectionTitle = ({ children, hint, action }) => (
  <div className="flex items-end justify-between mb-3">
    <div>
      <h3 className="text-[13px] font-semibold tracking-wide text-ink-800 uppercase">{children}</h3>
      {hint && <p className="text-[12px] text-ink-500 mt-0.5">{hint}</p>}
    </div>
    {action}
  </div>
);

const Field = ({ label, hint, error, children, right, className = "" }) => (
  <label className={`block ${className}`}>
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[12px] font-medium text-ink-700">{label}</span>
      {right}
    </div>
    {children}
    {hint && !error && <span className="block mt-1 text-[11px] text-ink-500">{hint}</span>}
    {error && <span className="block mt-1 text-[11px] text-rose-600">{error}</span>}
  </label>
);

const Input = React.forwardRef(({ className = "", invalid = false, mono = false, ...rest }, ref) => (
  <input
    ref={ref}
    className={`block w-full h-10 px-3 rounded-md bg-white ring-1 ring-inset ${invalid ? "ring-rose-300 focus:ring-rose-500" : "ring-ink-200 focus:ring-brand-500"} focus:ring-2 outline-none text-[13px] placeholder:text-ink-400 transition-all ${mono ? "font-mono tracking-wider" : ""} ${className}`}
    {...rest}
  />
));

const Textarea = ({ className = "", ...rest }) => (
  <textarea
    className={`block w-full px-3 py-2 rounded-md bg-white ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none text-[13px] placeholder:text-ink-400 ${className}`}
    {...rest}
  />
);

const KV = ({ k, v, vClass = "" }) => (
  <div className="flex items-baseline justify-between gap-4 py-1.5">
    <span className="text-[12px] text-ink-500">{k}</span>
    <span className={`text-[13px] font-medium text-ink-800 ${vClass}`}>{v}</span>
  </div>
);

const Divider = ({ className = "" }) => <div className={`h-px bg-ink-200/70 ${className}`} />;

const Tabs = ({ tabs, active, onChange, right = null }) => (
  <div className="flex items-center justify-between border-b border-ink-200">
    <div className="flex gap-1">
      {tabs.map(t => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative px-3.5 py-2.5 text-[13px] font-medium transition-colors ${isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-800"}`}
          >
            <span className="inline-flex items-center gap-2">
              {t.label}
              {t.count !== undefined && (
                <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-md text-[10px] font-semibold ${isActive ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600"}`}>
                  {t.count}
                </span>
              )}
            </span>
            {isActive && <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-ink-900 rounded-t-sm" />}
          </button>
        );
      })}
    </div>
    {right}
  </div>
);

// Sleek table that handles its own scroll
const DataTable = ({ columns, rows, onRowClick, emptyState = null, denseFirst = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-[13px]">
      <thead>
        <tr className="text-left border-b border-ink-200 bg-ink-50/50">
          {columns.map((c, i) => (
            <th key={c.key} className={`px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500 ${c.align === "right" ? "text-right" : ""} ${denseFirst && i === 0 ? "pl-4" : ""}`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-ink-400">{emptyState || "No records"}</td></tr>
        )}
        {rows.map((row, idx) => (
          <tr
            key={row.id || idx}
            onClick={() => onRowClick && onRowClick(row)}
            className={`border-b border-ink-200/60 last:border-0 ${onRowClick ? "cursor-pointer hover:bg-ink-50/70" : ""}`}
          >
            {columns.map((c) => (
              <td key={c.key} className={`px-4 py-3 align-middle ${c.align === "right" ? "text-right" : ""} ${c.mono ? "font-mono tracking-wider tnum text-[12.5px]" : ""}`}>
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Animated loading dots
const Dots = () => (
  <span className="inline-flex gap-1">
    <span className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: "0ms" }} />
    <span className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: "150ms" }} />
    <span className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: "300ms" }} />
  </span>
);

// utility — INR formatter
const fmtINR = (n, opts = {}) => {
  const { compact = false } = opts;
  if (compact) {
    if (n >= 1e7) return `₹${(n/1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${(n/1e5).toFixed(2)} L`;
  }
  return "₹" + n.toLocaleString("en-IN");
};

Object.assign(window, {
  Badge, StatusChip, RiskBadge, Button, Card, SectionTitle,
  Field, Input, Textarea, KV, Divider, Tabs, DataTable, Dots, fmtINR,
});



/* ===== data.jsx ===== */
// Mock data for the entire portal.

const VENDOR = {
  name: "Tirupati Industrial Components Pvt. Ltd.",
  shortName: "Tirupati Industrial",
  code: "VND-2026-0418",
  msme: true,
  gstin: "27ABCFT1234R1ZP",
  state: "Maharashtra",
  city: "Pune",
  category: "Mechanical Components — Tier 2",
};

const STATS = [
  { id: "po",  label: "Open Purchase Orders", value: "14", delta: "+3 this week", icon: "package", tone: "blue" },
  { id: "grn", label: "Pending GRNs",         value: "6",  delta: "2 overdue",   icon: "truck",   tone: "amber" },
  { id: "inv", label: "Invoices Awaiting Payment", value: "9", delta: fmtINR(2843500, { compact: true }), icon: "receipt", tone: "violet" },
  { id: "pay", label: "Last Payment Received",     value: fmtINR(486200), delta: "UTR · SBIN0026781452 · Apr 28", icon: "dollar", tone: "green" },
];

const RECENT_POS = [
  { id: "po1", po: "PO-26-04881", date: "08 May 2026", buyer: "Aarambh — Plant 2",  amount: 285400, status: "Open" },
  { id: "po2", po: "PO-26-04863", date: "06 May 2026", buyer: "Aarambh — Plant 1",  amount: 1124000, status: "Partial" },
  { id: "po3", po: "PO-26-04812", date: "02 May 2026", buyer: "Aarambh — Plant 2",  amount: 67800,  status: "Delivered" },
  { id: "po4", po: "PO-26-04790", date: "29 Apr 2026", buyer: "Aarambh — R&D",      amount: 412300, status: "In Transit" },
  { id: "po5", po: "PO-26-04754", date: "24 Apr 2026", buyer: "Aarambh — Plant 1",  amount: 89400,  status: "Completed" },
];

const RECENT_PAYMENTS = [
  { id: "p1", invoice: "INV/26-27/0091", amount: 486200, tds: 9724, net: 476476, utr: "SBIN0026781452", date: "28 Apr 2026" },
  { id: "p2", invoice: "INV/26-27/0088", amount: 312500, tds: 6250, net: 306250, utr: "SBIN0026655912", date: "22 Apr 2026" },
  { id: "p3", invoice: "INV/26-27/0079", amount: 187400, tds: 3748, net: 183652, utr: "SBIN0026581200", date: "16 Apr 2026" },
  { id: "p4", invoice: "INV/26-27/0072", amount: 624800, tds: 12496, net: 612304, utr: "SBIN0026494037", date: "10 Apr 2026" },
];

// All POs for tracker (with line items)
const ALL_POS = [
  {
    id: "po1", po: "PO-26-04881", date: "08 May 2026", delivery: "18 May 2026", buyer: "Plant 2",
    status: "Open",
    items: [
      { sku: "MC-7740-S", desc: "Hardened pinion shaft, 25mm",   qty: 240, uom: "EA", rate: 845,  amount: 202800 },
      { sku: "MC-2210-B", desc: "Cast iron bracket, R-series",   qty: 80,  uom: "EA", rate: 1032, amount: 82560 },
    ],
  },
  {
    id: "po2", po: "PO-26-04863", date: "06 May 2026", delivery: "14 May 2026", buyer: "Plant 1",
    status: "Partial",
    items: [
      { sku: "MC-9012-A", desc: "Spur gear assembly, 110T",      qty: 60,  uom: "EA", rate: 14_200, amount: 852000 },
      { sku: "MC-9015-C", desc: "Drive coupling, 32mm",          qty: 200, uom: "EA", rate: 1360,  amount: 272000 },
    ],
  },
  {
    id: "po3", po: "PO-26-04812", date: "02 May 2026", delivery: "09 May 2026", buyer: "Plant 2",
    status: "Delivered",
    items: [
      { sku: "MC-3340-X", desc: "Flange, mild steel, 6\" dia",   qty: 120, uom: "EA", rate: 565,   amount: 67800 },
    ],
  },
  {
    id: "po4", po: "PO-26-04790", date: "29 Apr 2026", delivery: "12 May 2026", buyer: "R&D",
    status: "In Transit",
    items: [
      { sku: "MC-RND-001",desc: "Prototype mount bracket, Al-6061", qty: 30, uom: "EA", rate: 4150, amount: 124500 },
      { sku: "MC-RND-014",desc: "Test rig adapter plate",            qty: 15, uom: "EA", rate: 19180, amount: 287700 },
    ],
  },
  {
    id: "po5", po: "PO-26-04754", date: "24 Apr 2026", delivery: "30 Apr 2026", buyer: "Plant 1",
    status: "Completed",
    items: [
      { sku: "MC-1102-D", desc: "Bushing, sintered bronze",      qty: 400, uom: "EA", rate: 223,  amount: 89200 },
    ],
  },
];

const GRNS = [
  { id: "g1", grn: "GRN-26-02211", po: "PO-26-04863", received: "10 May 2026", item: "Spur gear assembly, 110T",  ordered: 60, received_qty: 40, accepted: 38, rejected: 2,  reason: "Surface finish out of spec", status: "Partial" },
  { id: "g2", grn: "GRN-26-02198", po: "PO-26-04812", received: "08 May 2026", item: "Flange, mild steel, 6\" dia", ordered: 120, received_qty: 120, accepted: 120, rejected: 0,  reason: "—", status: "Accepted" },
  { id: "g3", grn: "GRN-26-02174", po: "PO-26-04863", received: "07 May 2026", item: "Drive coupling, 32mm",      ordered: 200, received_qty: 200, accepted: 192, rejected: 8,  reason: "Bore tolerance variance", status: "Partial" },
  { id: "g4", grn: "GRN-26-02151", po: "PO-26-04754", received: "29 Apr 2026", item: "Bushing, sintered bronze",  ordered: 400, received_qty: 400, accepted: 400, rejected: 0,  reason: "—", status: "Accepted" },
  { id: "g5", grn: "GRN-26-02144", po: "PO-26-04790", received: "—",          item: "Test rig adapter plate",    ordered: 15,  received_qty: 0,   accepted: 0,   rejected: 0,  reason: "—", status: "Awaiting GRN" },
];

// Admin queue — vendors awaiting review
const VENDOR_QUEUE = [
  {
    id: "v1",
    name: "Tirupati Industrial Components Pvt. Ltd.",
    contact: "Mr. Suresh Pawar",
    submitted: "10 May 2026",
    gstin: "27ABCFT1234R1ZP",
    pan: "ABCFT1234R", tan: "PNET12345C", udyam: "UDYAM-MH-26-0091812",
    msme: true,
    risk: 18,
    status: "Under Review",
    state: "Maharashtra",
    category: "Mechanical Components",
    bank: { acc: "0089127447712", ifsc: "HDFC0000891", name: "Tirupati Industrial Components Pvt Ltd" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Mar 2026 (GSTR-3B)" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "412 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "156 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.2 MB", ok: true },
      { name: "Product Brochure.pdf",size: "3.8 MB", ok: true },
    ],
    ocr: {
      confidence: 97,
      processedAt: "10 May 2026 · 11:46 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "27ABCFT1234R1ZP",                       portal: "27ABCFT1234R1ZP",                       match: true },
            { label: "Legal name",   extracted: "Tirupati Industrial Components Pvt Ltd", portal: "Tirupati Industrial Components Pvt Ltd", match: true },
            { label: "Trade name",   extracted: "Tirupati Industrial",                   portal: "Tirupati Industrial",                   match: true },
            { label: "Registered on",extracted: "12-08-2017",                            portal: "12 Aug 2017",                           match: true },
            { label: "State",        extracted: "Maharashtra",                           portal: "Maharashtra",                           match: true },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "ABCFT1234R",                            portal: "ABCFT1234R",                            match: true },
            { label: "Name",         extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",portal: "Tirupati Industrial Components Pvt Ltd", match: true },
            { label: "Date of incorp.", extracted: "12-08-2017",                          portal: "12-08-2017",                            match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · HDFC",
          fields: [
            { label: "Account no.",  extracted: "0089127447712",                         portal: "0089127447712",                         match: true },
            { label: "IFSC",         extracted: "HDFC0000891",                           portal: "HDFC0000891",                           match: true },
            { label: "Beneficiary",  extracted: "Tirupati Industrial Components Pvt Ltd",portal: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",match: true },
            { label: "MICR",         extracted: "411240091",                             portal: "411240091",                             match: true },
          ],
        },
      ],
    },
  },
  {
    id: "v2",
    name: "Saraswati Polymers LLP",
    contact: "Ms. Anita Deshmukh",
    submitted: "09 May 2026",
    gstin: "29AAFCS9012R1ZK",
    pan: "AAFCS9012R", tan: "BLRS22341E", udyam: "UDYAM-KA-04-0017822",
    msme: true,
    risk: 42,
    status: "Pending",
    state: "Karnataka",
    category: "Polymers & Plastics",
    bank: { acc: "5512004482210", ifsc: "ICIC0005512", name: "Saraswati Polymers" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: false, label: "Bank — Name mismatch", detail: "Penny-drop returned 'Saraswathi Polymers LLP'" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "388 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "172 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "—",      ok: false },
      { name: "Product Brochure.pdf",size: "2.1 MB", ok: true },
    ],
    ocr: {
      confidence: 81,
      processedAt: "09 May 2026 · 16:08 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "29AAFCS9012R1ZK",     portal: "29AAFCS9012R1ZK",      match: true },
            { label: "Legal name",   extracted: "Saraswathi Polymers LLP", portal: "Saraswati Polymers LLP", match: false,
              note: "Spelling differs — 'Saraswathi' vs 'Saraswati'. Likely transliteration variant." },
            { label: "State",        extracted: "Karnataka",            portal: "Karnataka",             match: true },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "AAFCS9012R",          portal: "AAFCS9012R",            match: true },
            { label: "Name",         extracted: "SARASWATI POLYMERS LLP", portal: "Saraswati Polymers LLP", match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · ICICI",
          fields: [
            { label: "Cheque image", extracted: "Not uploaded",         portal: "—",                     match: false,
              note: "Required document missing — cannot OCR." },
          ],
        },
      ],
    },
  },
  {
    id: "v3",
    name: "Karthikeya Engineering Works",
    contact: "Mr. R. Karthikeya",
    submitted: "08 May 2026",
    gstin: "33AAACK4421B1Z2",
    pan: "AAACK4421B", tan: "—", udyam: "—",
    msme: false,
    risk: 78,
    status: "Pending",
    state: "Tamil Nadu",
    category: "Fabrication",
    bank: { acc: "30021445119", ifsc: "SBIN0001120", name: "Karthikeya Engg" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Last filed Dec 2025 — 4 months overdue" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: false, label: "TAN — Not provided", detail: "Required for vendors >₹50L turnover" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "289 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "144 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "820 KB", ok: true },
      { name: "Product Brochure.pdf",size: "—",      ok: false },
    ],
    ocr: {
      confidence: 64,
      processedAt: "08 May 2026 · 14:22 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "33AAACK4421B1Z2",         portal: "33AAACK4421B1Z2",          match: true },
            { label: "Legal name",   extracted: "Karthikeya Engineering Works", portal: "Karthikeya Engineering Works", match: true },
            { label: "Last return",  extracted: "GSTR-3B · Dec 2025",       portal: "GSTR-3B · Dec 2025",       match: true,
              note: "Latest return is 4 months overdue — flag for compliance review." },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "AAACK4421B",          portal: "AAACK4421B",                match: true },
            { label: "Name",         extracted: "KARTHIKEYA ENGINEERING WORKS", portal: "Karthikeya Engineering Works", match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · SBI",
          fields: [
            { label: "Account no.",  extracted: "30021445119",         portal: "30021445119",               match: true },
            { label: "IFSC",         extracted: "SBIN0001120",         portal: "SBIN0001120",               match: true },
            { label: "Beneficiary",  extracted: "Karthikeya Engg",     portal: "Karthikeya Engineering Works", match: false,
              note: "Cheque shows abbreviated name. Acceptable if PAN/GST match." },
          ],
        },
      ],
    },
  },
  {
    id: "v4",
    name: "Vajra Precision Tools Pvt. Ltd.",
    contact: "Mr. Harish Iyer",
    submitted: "07 May 2026",
    gstin: "27AAGCV0091L1ZN",
    pan: "AAGCV0091L", tan: "PNET99811K", udyam: "UDYAM-MH-26-0044912",
    msme: true,
    risk: 12,
    status: "Approved",
    state: "Maharashtra",
    category: "Precision Tooling",
    bank: { acc: "9971124488", ifsc: "AXIS0000997", name: "Vajra Precision Tools Pvt Ltd" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "401 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "168 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.1 MB", ok: true },
      { name: "Product Brochure.pdf",size: "5.4 MB", ok: true },
    ],
    ocr: {
      confidence: 99,
      processedAt: "07 May 2026 · 09:18 IST",
      docs: [
        { doc: "GST Certificate.pdf", source: "GST portal · gst.gov.in", fields: [
          { label: "GSTIN",      extracted: "27AAGCV0091L1ZN", portal: "27AAGCV0091L1ZN", match: true },
          { label: "Legal name", extracted: "Vajra Precision Tools Pvt Ltd", portal: "Vajra Precision Tools Pvt Ltd", match: true },
          { label: "State",      extracted: "Maharashtra", portal: "Maharashtra", match: true },
        ]},
        { doc: "PAN Copy.pdf", source: "Income Tax · incometax.gov.in", fields: [
          { label: "PAN",  extracted: "AAGCV0091L", portal: "AAGCV0091L", match: true },
          { label: "Name", extracted: "VAJRA PRECISION TOOLS PVT LTD", portal: "Vajra Precision Tools Pvt Ltd", match: true },
        ]},
        { doc: "Cancelled Cheque.jpg", source: "Bank penny-drop · Axis", fields: [
          { label: "Account no.", extracted: "9971124488", portal: "9971124488", match: true },
          { label: "IFSC",        extracted: "AXIS0000997", portal: "AXIS0000997", match: true },
          { label: "Beneficiary", extracted: "Vajra Precision Tools Pvt Ltd", portal: "Vajra Precision Tools Pvt Ltd", match: true },
        ]},
      ],
    },
  },
  {
    id: "v5",
    name: "Bhargav Logistics & Allied",
    contact: "Mr. V. Bhargav",
    submitted: "06 May 2026",
    gstin: "07AABCB9981G1ZQ",
    pan: "AABCB9981G", tan: "DELB44012F", udyam: "—",
    msme: false,
    risk: 56,
    status: "Query Raised",
    state: "Delhi",
    category: "Logistics",
    bank: { acc: "115522003040", ifsc: "KKBK0001155", name: "Bhargav Logistics" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "356 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "159 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.0 MB", ok: true },
      { name: "Product Brochure.pdf",size: "—",      ok: false },
    ],
  },
  {
    id: "v6",
    name: "Akshara Chemicals & Coatings",
    contact: "Ms. Priya Akshara",
    submitted: "05 May 2026",
    gstin: "24AAACA5510J1Z8",
    pan: "AAACA5510J", tan: "AHME11220R", udyam: "UDYAM-GJ-12-0029811",
    msme: true,
    risk: 28,
    status: "Pending",
    state: "Gujarat",
    category: "Chemicals & Coatings",
    bank: { acc: "8800124911", ifsc: "UTIB0000880", name: "Akshara Chemicals & Coatings" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "412 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "163 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.4 MB", ok: true },
      { name: "Product Brochure.pdf",size: "4.7 MB", ok: true },
    ],
  },
];

Object.assign(window, {
  VENDOR, STATS, RECENT_POS, RECENT_PAYMENTS, ALL_POS, GRNS, VENDOR_QUEUE,
});



/* ===== registration.jsx ===== */
// Registration Wizard — public-facing, 4 steps with simulated verifications.

const StepHeader = ({ step, total, title, subtitle }) => (
  <div className="px-8 pt-8 pb-6 border-b border-ink-200">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 text-[12px] text-ink-500">
        <span className="font-mono">STEP {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="text-ink-300">·</span>
        <span>Vendor onboarding</span>
      </div>
      <button className="text-[12px] text-ink-500 hover:text-ink-800 inline-flex items-center gap-1">
        <IconClock size={13} /> Save & continue later
      </button>
    </div>
    <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">{title}</h1>
    {subtitle && <p className="text-[13.5px] text-ink-500 mt-1.5 max-w-2xl">{subtitle}</p>}
  </div>
);

const ProgressBar = ({ step, total, steps }) => (
  <div className="bg-white">
    <div className="px-8 py-4 flex items-center gap-2">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < step;
        const current = n === step;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold ring-1 ${
                done ? "bg-emerald-600 text-white ring-emerald-600" :
                current ? "bg-ink-900 text-white ring-ink-900" :
                "bg-white text-ink-400 ring-ink-200"
              }`}>
                {done ? <IconCheck size={13} /> : n}
              </span>
              <span className={`text-[12.5px] font-medium truncate ${current ? "text-ink-900" : done ? "text-ink-700" : "text-ink-400"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px ${n < step ? "bg-emerald-300" : "bg-ink-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
    <div className="h-px bg-ink-200" />
  </div>
);

const VerifyButton = ({ state, onClick, label = "Verify" }) => {
  if (state === "verifying") return (
    <Button variant="secondary" size="sm" disabled className="min-w-[112px]">
      Verifying <Dots />
    </Button>
  );
  if (state === "ok") return (
    <Button variant="secondary" size="sm" disabled className="min-w-[112px] !ring-emerald-200 !text-emerald-700 !bg-emerald-50">
      <IconCheck size={13} /> Verified
    </Button>
  );
  if (state === "fail") return (
    <Button variant="secondary" size="sm" onClick={onClick} className="min-w-[112px] !ring-rose-200 !text-rose-700 !bg-rose-50">
      <IconRefresh size={13} /> Retry
    </Button>
  );
  return <Button variant="secondary" size="sm" onClick={onClick} className="min-w-[112px]">{label}</Button>;
};

const Step1 = ({ values, setValues }) => {
  const [state, setState] = React.useState(values.gstinVerified ? "ok" : "idle");
  const [result, setResult] = React.useState(values.gstinResult || null);

  const verify = () => {
    setState("verifying");
    setTimeout(() => {
      const data = {
        gstin: values.gstin || "27ABCFT1234R1ZP",
        legalName: "Tirupati Industrial Components Pvt. Ltd.",
        tradeName: "Tirupati Industrial",
        status: "Active",
        type: "Private Limited Company",
        state: "Maharashtra",
        registeredOn: "12 Aug 2017",
        lastFiled: "GSTR-3B · Mar 2026",
      };
      setResult(data);
      setState("ok");
      setValues(v => ({ ...v, gstinVerified: true, gstinResult: data }));
    }, 1300);
  };

  return (
    <div className="px-8 py-7 space-y-6 max-w-3xl">
      <Card>
        <SectionTitle hint="We pull legal name, status and registered address directly from the GST portal.">Company GSTIN</SectionTitle>
        <div className="flex gap-3 items-end">
          <Field label="GSTIN" className="flex-1">
            <Input
              mono
              placeholder="22AAAAA0000A1Z5"
              maxLength={15}
              value={values.gstin || ""}
              onChange={e => setValues(v => ({ ...v, gstin: e.target.value.toUpperCase(), gstinVerified: false }))}
            />
          </Field>
          <div className="pb-[2px]">
            <Button variant="primary" size="md" onClick={verify} disabled={state === "verifying" || state === "ok"}>
              {state === "verifying" ? <>Verifying <Dots /></> : state === "ok" ? <><IconCheck size={14} /> Verified</> : "Verify GSTIN"}
            </Button>
          </div>
        </div>
        <p className="text-[11.5px] text-ink-500 mt-2 inline-flex items-center gap-1">
          <IconInfo size={12} /> Pre-fills legal name, trade name, state and filing status from the government API.
        </p>
      </Card>

      {result && (
        <Card className="!p-0 overflow-hidden ring-emerald-200/70 bg-emerald-50/30">
          <div className="px-5 py-3 flex items-center justify-between bg-emerald-50 border-b border-emerald-200/70">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-600 text-white grid place-items-center"><IconCheck size={14} /></span>
              <div>
                <div className="text-[12.5px] font-semibold text-emerald-900">GSTIN found · Active</div>
                <div className="text-[11px] text-emerald-700/80 font-mono">{result.gstin}</div>
              </div>
            </div>
            <Badge tone="green" icon={<IconShield size={11} />}>Govt. verified</Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-8 px-5 py-4">
            <KV k="Legal name" v={result.legalName} />
            <KV k="Trade name" v={result.tradeName} />
            <KV k="Constitution" v={result.type} />
            <KV k="State" v={result.state} />
            <KV k="Registered on" v={result.registeredOn} />
            <KV k="Last return filed" v={<span className="font-mono text-[12px]">{result.lastFiled}</span>} />
          </div>
        </Card>
      )}
    </div>
  );
};

const VerifyField = ({ label, value, onChange, placeholder, hint, maxLength, status, onVerify }) => (
  <Card padded={false} className="p-4">
    <div className="flex items-end gap-3">
      <Field label={label} hint={hint} className="flex-1">
        <Input mono placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} />
      </Field>
      <div className="pb-[2px]"><VerifyButton state={status} onClick={onVerify} /></div>
    </div>
    {status === "ok" && (
      <div className="mt-2.5 inline-flex items-center gap-2">
        <Badge tone="green" icon={<IconCheck size={11} />}>Active</Badge>
        <span className="text-[11.5px] text-ink-500">Verified against govt. database</span>
      </div>
    )}
    {status === "fail" && (
      <div className="mt-2.5 inline-flex items-center gap-2">
        <Badge tone="red" icon={<IconX size={11} />}>Not Found</Badge>
        <span className="text-[11.5px] text-rose-700">No record returned. Check the number and retry.</span>
      </div>
    )}
  </Card>
);

const Step2 = ({ values, setValues }) => {
  const setStatus = (key, status) => setValues(v => ({ ...v, [key + "Status"]: status }));
  const verify = (key, fakeResult = "ok") => {
    setStatus(key, "verifying");
    setTimeout(() => setStatus(key, fakeResult), 900 + Math.random() * 600);
  };

  return (
    <div className="px-8 py-7 space-y-4 max-w-3xl">
      <Card padded={false} className="p-5">
        <SectionTitle hint="Used for TDS, MSME benefits and statutory filings. Each ID is checked live against the issuing authority.">
          Tax & enterprise identifiers
        </SectionTitle>
        <div className="space-y-3">
          <VerifyField
            label="PAN" placeholder="ABCFT1234R" maxLength={10}
            value={values.pan || ""} onChange={e => { setValues(v => ({ ...v, pan: e.target.value.toUpperCase() })); setStatus("pan", "idle"); }}
            status={values.panStatus || "idle"}
            onVerify={() => verify("pan", "ok")}
            hint="10-character permanent account number"
          />
          <VerifyField
            label="TAN" placeholder="PNET12345C" maxLength={10}
            value={values.tan || ""} onChange={e => { setValues(v => ({ ...v, tan: e.target.value.toUpperCase() })); setStatus("tan", "idle"); }}
            status={values.tanStatus || "idle"}
            onVerify={() => verify("tan", "ok")}
            hint="Required if you deduct tax at source"
          />
          <VerifyField
            label="Udyam Registration (optional)" placeholder="UDYAM-MH-26-0091812" maxLength={24}
            value={values.udyam || ""} onChange={e => { setValues(v => ({ ...v, udyam: e.target.value.toUpperCase() })); setStatus("udyam", "idle"); }}
            status={values.udyamStatus || "idle"}
            onVerify={() => verify("udyam", "ok")}
            hint="Unlocks MSME payment benefits under MSMED Act"
          />
        </div>
      </Card>
    </div>
  );
};

const Step3 = ({ values, setValues }) => {
  const verify = () => {
    setValues(v => ({ ...v, bankStatus: "verifying" }));
    setTimeout(() => {
      setValues(v => ({
        ...v,
        bankStatus: "ok",
        bankResult: {
          beneficiary: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",
          matched: true,
          method: "Penny-drop · ₹1.00 credited",
          ifscDetails: { bank: "HDFC Bank", branch: "Pune — Hadapsar", micr: "411240091" },
          ts: "10 May 2026 · 11:42 IST",
        },
      }));
    }, 1500);
  };
  const r = values.bankResult;
  const status = values.bankStatus || "idle";

  return (
    <div className="px-8 py-7 space-y-5 max-w-3xl">
      <Card>
        <SectionTitle hint="We send ₹1 to confirm the account exists and the name matches. The amount is auto-refunded.">Bank account for payments</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Account number">
            <Input mono placeholder="0089127447712" value={values.accNo || ""} onChange={e => setValues(v => ({ ...v, accNo: e.target.value, bankStatus: "idle" }))} />
          </Field>
          <Field label="Re-enter account number">
            <Input mono placeholder="0089127447712" value={values.accNo2 || ""} onChange={e => setValues(v => ({ ...v, accNo2: e.target.value, bankStatus: "idle" }))} />
          </Field>
          <Field label="IFSC">
            <Input mono placeholder="HDFC0000891" maxLength={11} value={values.ifsc || ""} onChange={e => setValues(v => ({ ...v, ifsc: e.target.value.toUpperCase(), bankStatus: "idle" }))} />
          </Field>
          <Field label="Account holder name (as per bank)">
            <Input placeholder="Tirupati Industrial Components Pvt Ltd" value={values.accName || ""} onChange={e => setValues(v => ({ ...v, accName: e.target.value, bankStatus: "idle" }))} />
          </Field>
        </div>
        <div className="mt-4">
          <Button variant="primary" size="md" onClick={verify} disabled={status === "verifying" || status === "ok"}>
            {status === "verifying" ? <>Sending penny-drop <Dots /></> : status === "ok" ? <><IconCheck size={14} /> Account verified</> : "Verify Account"}
          </Button>
        </div>
      </Card>

      {r && (
        <Card className="!p-0 overflow-hidden ring-emerald-200/70">
          <div className="px-5 py-3 flex items-center justify-between bg-emerald-50 border-b border-emerald-200/70">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-600 text-white grid place-items-center"><IconBank size={14} /></span>
              <div>
                <div className="text-[12.5px] font-semibold text-emerald-900">Penny-drop successful · Name matched ✓</div>
                <div className="text-[11px] text-emerald-700/80">{r.method} at {r.ts}</div>
              </div>
            </div>
            <Badge tone="green">Match confidence 98%</Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-8 px-5 py-4">
            <KV k="Beneficiary returned by bank" v={<span className="font-mono text-[12px]">{r.beneficiary}</span>} />
            <KV k="Bank" v={r.ifscDetails.bank} />
            <KV k="Branch" v={r.ifscDetails.branch} />
            <KV k="MICR" v={<span className="font-mono text-[12px]">{r.ifscDetails.micr}</span>} />
          </div>
        </Card>
      )}
    </div>
  );
};

const DocRow = ({ doc, onUpload }) => {
  const ref = React.useRef(null);
  return (
    <div className="py-3.5 border-b border-ink-200/60 last:border-0">
      <div className="flex items-center gap-4">
        <div className={`w-9 h-9 grid place-items-center rounded-md ${doc.uploaded ? "bg-emerald-50 text-emerald-700" : "bg-ink-100 text-ink-500"}`}>
          <IconFileText size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-medium text-ink-900">{doc.label}</div>
          <div className="text-[11.5px] text-ink-500">
            {doc.uploaded ? `${doc.filename} · ${doc.size}` : `Accepted: ${doc.accept} · Max ${doc.max}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {doc.ocrStatus === "reading" && (
            <Badge tone="blue" icon={<IconFileText size={11} />}>Reading <Dots /></Badge>
          )}
          {doc.ocrStatus === "matched" && (
            <Badge tone="green" icon={<IconCheck size={11} />}>OCR matched</Badge>
          )}
          {doc.ocrStatus === "review" && (
            <Badge tone="amber" icon={<IconAlertTriangle size={11} />}>OCR — review</Badge>
          )}
          {doc.uploaded ? <Badge tone="green" icon={<IconCheck size={11} />}>Uploaded</Badge> :
            doc.required ? <Badge tone="amber">Required</Badge> :
            <Badge tone="neutral">Optional</Badge>}
        </div>
        <input ref={ref} type="file" hidden onChange={e => onUpload(doc.id, e.target.files?.[0])} />
        <Button variant="secondary" size="sm" onClick={() => ref.current?.click()} leading={<IconUpload size={13} />}>
          {doc.uploaded ? "Replace" : "Upload"}
        </Button>
      </div>
      {doc.ocrFields && doc.ocrStatus !== "reading" && (
        <div className="mt-3 ml-13 pl-3 ring-1 ring-inset ring-ink-200 rounded-md bg-ink-50/40 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-ink-200/70 flex items-center justify-between bg-white">
            <span className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold">OCR Reader · cross-checked with {doc.source}</span>
            <span className="text-[10.5px] text-ink-500 font-mono">{doc.confidence}% confidence</span>
          </div>
          <table className="w-full text-[11.5px]">
            <tbody>
              {doc.ocrFields.map((f, i) => (
                <tr key={i} className="border-b border-ink-200/60 last:border-0">
                  <td className="px-3 py-1.5 text-ink-500 w-32">{f.label}</td>
                  <td className="px-3 py-1.5 font-mono text-ink-900 truncate">{f.extracted}</td>
                  <td className="px-3 py-1.5 text-right">
                    {f.match
                      ? <Badge tone="green" icon={<IconCheck size={10} />}>Match</Badge>
                      : <Badge tone="amber" icon={<IconAlertTriangle size={10} />}>Review</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Synthetic OCR result generator per document type, against current registration values
const ocrFor = (id, v) => {
  if (id === "gst") return {
    source: "GST portal · gst.gov.in", confidence: 97,
    fields: [
      { label: "GSTIN",       extracted: v.gstin || "—",                                portal: v.gstin, match: true },
      { label: "Legal name",  extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",      match: true },
      { label: "State",       extracted: "Maharashtra",                                  match: true },
    ],
  };
  if (id === "pan") return {
    source: "Income Tax · incometax.gov.in", confidence: 95,
    fields: [
      { label: "PAN",         extracted: v.pan || "—", match: true },
      { label: "Name",        extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD", match: true },
    ],
  };
  if (id === "cheque") return {
    source: "Bank penny-drop · HDFC", confidence: 92,
    fields: [
      { label: "Account no.", extracted: v.accNo || "—", match: true },
      { label: "IFSC",        extracted: v.ifsc || "—", match: true },
      { label: "Beneficiary", extracted: "Tirupati Industrial Components Pvt Ltd", match: true },
    ],
  };
  return null;
};

const Step4 = ({ values, setValues }) => {
  const docs = values.docs || [
    { id: "gst",    label: "GST Registration Certificate", required: true,  accept: "PDF", max: "5 MB" },
    { id: "pan",    label: "PAN Card Copy",                required: true,  accept: "PDF / JPG", max: "2 MB" },
    { id: "cheque", label: "Cancelled Cheque",             required: true,  accept: "JPG / PNG", max: "2 MB" },
    { id: "broch",  label: "Company Brochure / Capability Deck", required: false, accept: "PDF", max: "10 MB" },
  ];
  const onUpload = (id, file) => {
    if (!file) return;
    const updated = docs.map(d => d.id === id ? {
      ...d, uploaded: true, filename: file.name,
      size: (file.size/1024).toFixed(0) + " KB",
      ocrStatus: "reading",
    } : d);
    setValues(v => ({ ...v, docs: updated }));
    // Simulate OCR completion
    setTimeout(() => {
      setValues(v => {
        const ocr = ocrFor(id, v);
        return {
          ...v,
          docs: (v.docs || []).map(d => d.id === id ? {
            ...d,
            ocrStatus: ocr && ocr.fields.every(f => f.match) ? "matched" : "review",
            ocrFields: ocr?.fields,
            source: ocr?.source,
            confidence: ocr?.confidence,
          } : d),
        };
      });
    }, 1400);
  };

  const allRequired = docs.filter(d => d.required).every(d => d.uploaded);

  return (
    <div className="px-8 py-7 space-y-5 max-w-3xl">
      <Card>
        <SectionTitle hint="Each upload is processed by our OCR reader and cross-checked against the GST, PAN and bank records you provided in earlier steps.">Document checklist</SectionTitle>
        <div className="-mt-1">
          {docs.map(d => <DocRow key={d.id} doc={d} onUpload={onUpload} />)}
        </div>
      </Card>

      <div className={`rounded-lg px-4 py-3 flex items-start gap-3 ring-1 ring-inset ${allRequired ? "bg-emerald-50 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
        {allRequired ? <IconCheckCircle size={18} className="mt-0.5" /> : <IconAlertTriangle size={18} className="mt-0.5" />}
        <div className="text-[12.5px]">
          {allRequired
            ? <>All required documents uploaded. You can submit your application for review.</>
            : <>Upload all required documents to submit. Optional items can be added later from your vendor dashboard.</>}
        </div>
      </div>
    </div>
  );
};

const Success = ({ values, onReset, onGoDashboard }) => (
  <div className="px-8 py-12 flex flex-col items-center text-center max-w-2xl mx-auto">
    <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white grid place-items-center mb-5 shadow-pop">
      <IconCheck size={32} />
    </div>
    <h1 className="text-[28px] font-semibold tracking-tight text-ink-900">Application submitted</h1>
    <p className="text-[14px] text-ink-500 mt-2 max-w-md">
      Thanks. Our procurement team will review your details and reach out within 2 business days.
      You'll receive status updates on the email used to register.
    </p>
    <Card className="mt-7 w-full text-left">
      <div className="grid grid-cols-2 gap-x-8">
        <KV k="Application ID" v={<span className="font-mono text-[12px]">APP-26-005-{Math.floor(1000 + Math.random()*8999)}</span>} />
        <KV k="Submitted at" v="10 May 2026, 11:46 IST" />
        <KV k="Legal name" v={values.gstinResult?.legalName || "—"} />
        <KV k="GSTIN" v={<span className="font-mono text-[12px]">{values.gstin || "—"}</span>} />
        <KV k="Expected SLA" v="2 business days" />
        <KV k="Assigned to" v="Procurement — Indirect" />
      </div>
    </Card>
    <div className="flex gap-3 mt-7">
      <Button variant="secondary" onClick={onReset} leading={<IconRefresh size={14} />}>Submit another</Button>
      <Button variant="primary" onClick={onGoDashboard} trailing={<IconArrowUpRight size={14} />}>Go to vendor dashboard</Button>
    </div>
  </div>
);

const Registration = ({ onGoDashboard, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [values, setValues] = React.useState({
    gstin: "27ABCFT1234R1ZP",
    pan: "ABCFT1234R", tan: "PNET12345C", udyam: "UDYAM-MH-26-0091812",
    accNo: "0089127447712", accNo2: "0089127447712", ifsc: "HDFC0000891",
    accName: "Tirupati Industrial Components Pvt Ltd",
  });

  const steps = ["GSTIN", "Tax IDs", "Bank account", "Documents"];
  const titles = [
    { t: "Let's verify your business",        s: "Enter your GSTIN. We'll pull your legal name and status directly from the GST portal." },
    { t: "Tax & enterprise identifiers",      s: "PAN, TAN and Udyam — each is verified live against the issuing authority." },
    { t: "Bank account for vendor payments",  s: "We use penny-drop to confirm the account exists and that the name matches your business." },
    { t: "Upload your supporting documents",  s: "Final step. All required documents must be uploaded before submission." },
  ];

  const canAdvance = () => {
    if (step === 1) return !!values.gstinVerified;
    if (step === 2) return values.panStatus === "ok" && values.tanStatus === "ok";
    if (step === 3) return values.bankStatus === "ok";
    if (step === 4) {
      const docs = values.docs || [];
      const required = ["gst","pan","cheque"];
      return required.every(r => docs.find(d => d.id === r)?.uploaded);
    }
    return false;
  };

  if (submitted) return <Success values={values} onReset={() => { setSubmitted(false); setStep(1); }} onGoDashboard={onGoDashboard} />;

  const meta = titles[step - 1];

  return (
    <div className="bg-ink-50 min-h-full">
      <ProgressBar step={step} total={4} steps={steps} />
      <div className="max-w-5xl mx-auto py-6 px-2">
        <Card padded={false} className="overflow-hidden">
          <StepHeader step={step} total={4} title={meta.t} subtitle={meta.s} />
          {step === 1 && <Step1 values={values} setValues={setValues} />}
          {step === 2 && <Step2 values={values} setValues={setValues} />}
          {step === 3 && <Step3 values={values} setValues={setValues} />}
          {step === 4 && <Step4 values={values} setValues={setValues} />}
          <div className="px-8 py-4 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={() => step === 1 ? (onBack && onBack()) : setStep(s => s - 1)} leading={<IconChevronLeft size={14} />}>{step === 1 && onBack ? "Change vendor type" : "Back"}</Button>
            <div className="flex items-center gap-3 text-[12px] text-ink-500">
              <span>Need help? <a className="text-brand-700 hover:underline">Talk to a specialist</a></span>
              {step < 4
                ? <Button variant="primary" size="md" onClick={() => setStep(s => s + 1)} disabled={!canAdvance()} trailing={<IconChevronRight size={14} />}>Continue</Button>
                : <Button variant="success" size="md" onClick={() => setSubmitted(true)} disabled={!canAdvance()} trailing={<IconCheck size={14} />}>Submit application</Button>
              }
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

window.Registration = Registration;



/* ===== registration_variants.jsx ===== */
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



/* ===== dashboard.jsx ===== */
// Vendor Dashboard — logged-in vendor view.

const StatCard = ({ stat }) => {
  const iconMap = {
    package: <IconPackage size={18} />,
    truck:   <IconTruck size={18} />,
    receipt: <IconReceipt size={18} />,
    dollar:  <IconCircleDollar size={18} />,
  };
  const toneRing = {
    blue:   "bg-brand-50  text-brand-700",
    amber:  "bg-amber-50  text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    green:  "bg-emerald-50 text-emerald-700",
  };
  return (
    <Card className="!p-5">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 grid place-items-center rounded-md ${toneRing[stat.tone]}`}>
          {iconMap[stat.icon]}
        </div>
        <button className="text-ink-400 hover:text-ink-700"><IconDots size={16} /></button>
      </div>
      <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{stat.label}</div>
      <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{stat.value}</div>
      <div className="text-[11.5px] text-ink-500 mt-1">{stat.delta}</div>
    </Card>
  );
};

// A tiny payment trend sparkline rendered inline so we don't ship an image
const Spark = ({ data, color = "#4338ca" }) => {
  const w = 320, h = 64, pad = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const x = (i) => pad + (i * (w - pad*2)) / (data.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad*2);
  const d = data.map((v,i)=>`${i===0?"M":"L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${d} L ${x(data.length-1)} ${h-pad} L ${x(0)} ${h-pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g1)" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Dashboard = ({ goTo }) => {
  const v = VENDOR;
  return (
    <div className="px-8 py-7 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-ink-500">
            <span className="font-mono">{v.code}</span>
            <span className="text-ink-300">·</span>
            <span>{v.category}</span>
          </div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink-900 mt-1">
            Good morning, {v.shortName}
          </h1>
          <div className="flex items-center gap-2 mt-2.5">
            <Badge tone="green" icon={<IconShieldCheck size={11} />}>Approved vendor</Badge>
            {v.msme && <Badge tone="violet" icon={<IconSparkles size={11} />}>MSME · 45-day SLA</Badge>}
            <Badge tone="neutral">GSTIN · <span className="font-mono ml-0.5">{v.gstin}</span></Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Statement</Button>
          <Button variant="primary" size="md" leading={<IconPlus size={14} />}>Raise invoice</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Two columns: POs + Payments */}
      <div className="grid grid-cols-5 gap-5">
        <Card padded={false} className="col-span-3 overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink-900">Recent Purchase Orders</h3>
              <p className="text-[12px] text-ink-500 mt-0.5">Last 30 days · 14 open POs</p>
            </div>
            <button onClick={() => goTo("pogrn")} className="text-[12.5px] font-medium text-brand-700 inline-flex items-center gap-1 hover:underline">
              View all <IconArrowUpRight size={13} />
            </button>
          </div>
          <DataTable
            columns={[
              { key: "po",     label: "PO Number", mono: true, render: r => <span className="text-ink-900 font-mono text-[12.5px]">{r.po}</span> },
              { key: "date",   label: "Date", render: r => <span className="text-ink-600">{r.date}</span> },
              { key: "buyer",  label: "Buyer", render: r => <span className="text-ink-600">{r.buyer}</span> },
              { key: "amount", label: "Amount", align: "right", render: r => <span className="font-mono tnum text-[12.5px] text-ink-900">{fmtINR(r.amount)}</span> },
              { key: "status", label: "Status", render: r => <StatusChip status={r.status} /> },
            ]}
            rows={RECENT_POS}
          />
        </Card>

        <Card padded={false} className="col-span-2 overflow-hidden">
          <div className="px-5 pt-5 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink-900">Payment trend</h3>
              <p className="text-[12px] text-ink-500 mt-0.5">Net paid · last 8 weeks</p>
            </div>
            <Badge tone="green">+18.4%</Badge>
          </div>
          <div className="px-3">
            <Spark data={[210, 240, 195, 305, 280, 365, 410, 486]} />
          </div>
          <Divider />
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[12.5px] font-semibold text-ink-800 uppercase tracking-wide">Payment ledger</h4>
              <span className="text-[11px] text-ink-500">FY 26-27</span>
            </div>
            <div className="space-y-3">
              {RECENT_PAYMENTS.map(p => (
                <div key={p.id} className="grid grid-cols-[1fr_auto] gap-2 items-start">
                  <div>
                    <div className="font-mono text-[12px] text-ink-900">{p.invoice}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">UTR <span className="font-mono">{p.utr}</span> · {p.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[12.5px] tnum text-ink-900">{fmtINR(p.net)}</div>
                    <div className="text-[11px] text-ink-500">TDS {fmtINR(p.tds)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Reminders */}
      <Card className="!p-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 grid place-items-center rounded-md bg-amber-50 text-amber-700"><IconAlertTriangle size={16} /></span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-ink-900">2 GRNs awaiting your acknowledgement</div>
            <div className="text-[12px] text-ink-500">PO-26-04863 has 8 units flagged for rejection — surface finish out of spec. Confirm replacement schedule.</div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => goTo("pogrn")} trailing={<IconChevronRight size={13} />}>Review GRNs</Button>
        </div>
      </Card>
    </div>
  );
};

window.Dashboard = Dashboard;



/* ===== admin.jsx ===== */
// Internal Admin Panel — procurement team view with right-side drawer.

const ValidationRow = ({ ok, label, detail }) => (
  <div className="flex items-start gap-3 py-3 border-b border-ink-200/60 last:border-0">
    <span className={`w-7 h-7 grid place-items-center rounded-md ${ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
      {ok ? <IconCheck size={14} /> : <IconX size={14} />}
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-medium text-ink-900">{label}</div>
      <div className="text-[11.5px] text-ink-500 mt-0.5">{detail}</div>
    </div>
    <Badge tone={ok ? "green" : "red"}>{ok ? "Pass" : "Fail"}</Badge>
  </div>
);

const DocLine = ({ doc }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-ink-200/60 last:border-0">
    <span className={`w-8 h-8 grid place-items-center rounded-md ${doc.ok ? "bg-ink-100 text-ink-600" : "bg-rose-50 text-rose-700"}`}>
      <IconFile size={15} />
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-[12.5px] font-medium text-ink-900 truncate">{doc.name}</div>
      <div className="text-[11px] text-ink-500">{doc.ok ? doc.size : "Not uploaded"}</div>
    </div>
    {doc.ok ? (
      <button className="text-[11.5px] text-brand-700 hover:underline inline-flex items-center gap-1"><IconEye size={12} /> View</button>
    ) : (
      <Badge tone="red">Missing</Badge>
    )}
  </div>
);

const Drawer = ({ vendor, onClose, onDecide }) => {
  const [comment, setComment] = React.useState("");
  const [tab, setTab] = React.useState("checks");
  if (!vendor) return null;
  const checks = vendor.validations;
  const allPass = Object.values(checks).every(c => c.ok);

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 bottom-0 w-[560px] bg-white shadow-pop flex flex-col animate-[slideIn_.18s_ease-out]">
        <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>
        {/* Header */}
        <div className="px-6 py-5 border-b border-ink-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11.5px] text-ink-500">
              <span className="font-mono">{vendor.gstin}</span>
              <span className="text-ink-300">·</span>
              <span>Submitted {vendor.submitted}</span>
            </div>
            <h2 className="text-[18px] font-semibold text-ink-900 tracking-tight mt-1 leading-snug">{vendor.name}</h2>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <StatusChip status={vendor.status} />
              {vendor.msme && <Badge tone="violet" icon={<IconSparkles size={11} />}>MSME</Badge>}
              <Badge tone="neutral">{vendor.category}</Badge>
              <Badge tone="neutral">{vendor.state}</Badge>
              <RiskBadge score={vendor.risk} />
            </div>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-800 -mt-1"><IconX size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="px-3">
          <Tabs
            tabs={[
              { id: "checks",  label: "Validations", count: Object.values(checks).filter(c => !c.ok).length },
              { id: "ocr",     label: "OCR Match",   count: vendor.ocr ? vendor.ocr.docs.flatMap(d => d.fields).filter(f => !f.match).length : 0 },
              { id: "docs",    label: "Documents",   count: vendor.docs.filter(d => !d.ok).length },
              { id: "profile", label: "Profile" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {/* Body — scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {tab === "checks" && (
            <>
              <div className={`rounded-lg ring-1 ring-inset px-4 py-3 mb-4 flex items-start gap-3 ${allPass ? "bg-emerald-50/60 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
                {allPass ? <IconCheckCircle size={18} className="mt-0.5" /> : <IconAlertTriangle size={18} className="mt-0.5" />}
                <div className="text-[12.5px]">
                  {allPass
                    ? "All compliance checks passed. Vendor ready for approval."
                    : "Some checks need attention before this vendor can be approved."}
                </div>
              </div>
              <ValidationRow ok={checks.gstin.ok} label={checks.gstin.label} detail={checks.gstin.detail} />
              <ValidationRow ok={checks.pan.ok}   label={checks.pan.label}   detail={checks.pan.detail} />
              <ValidationRow ok={checks.tan.ok}   label={checks.tan.label}   detail={checks.tan.detail} />
              <ValidationRow ok={checks.bank.ok}  label={checks.bank.label}  detail={checks.bank.detail} />

              <SectionTitle hint={null} className="mt-5">Bank details on file</SectionTitle>
              <div className="rounded-md ring-1 ring-inset ring-ink-200 px-4 py-3 bg-ink-50/40">
                <KV k="Beneficiary" v={<span className="font-mono text-[12px]">{vendor.bank.name}</span>} />
                <KV k="Account no." v={<span className="font-mono text-[12px]">{vendor.bank.acc}</span>} />
                <KV k="IFSC"        v={<span className="font-mono text-[12px]">{vendor.bank.ifsc}</span>} />
              </div>
            </>
          )}

          {tab === "ocr" && vendor.ocr && (() => {
            const allFields = vendor.ocr.docs.flatMap(d => d.fields);
            const failed = allFields.filter(f => !f.match).length;
            return (
              <>
                <div className={`rounded-lg ring-1 ring-inset px-4 py-3 mb-4 flex items-start gap-3 ${failed === 0 ? "bg-emerald-50/60 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
                  <span className="w-7 h-7 grid place-items-center rounded-md bg-white/60 ring-1 ring-current/10 mt-0.5"><IconFileText size={14} /></span>
                  <div className="text-[12.5px] flex-1">
                    <div className="font-semibold">OCR Reader · {failed === 0 ? "All extracted fields match government records" : `${failed} field${failed>1?"s":""} need review`}</div>
                    <div className="opacity-80 mt-0.5">
                      Extracted {allFields.length} fields from {vendor.ocr.docs.length} documents at avg. <span className="font-mono">{vendor.ocr.confidence}%</span> confidence · {vendor.ocr.processedAt}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {vendor.ocr.docs.map(d => (
                    <div key={d.doc} className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden">
                      <div className="px-3 py-2 bg-ink-50/70 border-b border-ink-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 grid place-items-center rounded bg-white ring-1 ring-ink-200 text-ink-600"><IconFile size={12} /></span>
                          <span className="text-[12.5px] font-semibold text-ink-900 truncate">{d.doc}</span>
                        </div>
                        <span className="text-[11px] text-ink-500">vs. {d.source}</span>
                      </div>
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="text-left border-b border-ink-200/70 bg-white">
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Field</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Extracted (OCR)</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Government record</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 text-right">Match</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.fields.map((f, i) => (
                            <React.Fragment key={i}>
                              <tr className={`border-b border-ink-200/60 last:border-0 ${!f.match ? "bg-amber-50/40" : "bg-white"}`}>
                                <td className="px-3 py-2 text-ink-700">{f.label}</td>
                                <td className="px-3 py-2 font-mono text-[11.5px] text-ink-900">{f.extracted}</td>
                                <td className="px-3 py-2 font-mono text-[11.5px] text-ink-700">{f.portal}</td>
                                <td className="px-3 py-2 text-right">
                                  {f.match
                                    ? <Badge tone="green" icon={<IconCheck size={11} />}>Match</Badge>
                                    : <Badge tone="amber" icon={<IconAlertTriangle size={11} />}>Review</Badge>}
                                </td>
                              </tr>
                              {f.note && (
                                <tr className="bg-amber-50/30 border-b border-ink-200/60 last:border-0">
                                  <td colSpan={4} className="px-3 py-1.5 text-[11px] text-amber-900 italic">
                                    <IconInfo size={11} className="inline -mt-0.5 mr-1" />{f.note}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {tab === "docs" && (
            <>
              <SectionTitle hint="Click View to preview the uploaded file inline.">Uploaded documents</SectionTitle>
              {vendor.docs.map(d => <DocLine key={d.name} doc={d} />)}
            </>
          )}

          {tab === "profile" && (
            <div className="space-y-4">
              <SectionTitle>Submitted profile</SectionTitle>
              <div className="grid grid-cols-2 gap-x-8">
                <KV k="Contact"        v={vendor.contact} />
                <KV k="State"          v={vendor.state} />
                <KV k="GSTIN"          v={<span className="font-mono text-[12px]">{vendor.gstin}</span>} />
                <KV k="PAN"            v={<span className="font-mono text-[12px]">{vendor.pan}</span>} />
                <KV k="TAN"            v={<span className="font-mono text-[12px]">{vendor.tan}</span>} />
                <KV k="Udyam"          v={<span className="font-mono text-[12px]">{vendor.udyam}</span>} />
                <KV k="Category"       v={vendor.category} />
                <KV k="MSME"           v={vendor.msme ? "Yes" : "No"} />
              </div>
            </div>
          )}
        </div>

        {/* Footer — decision */}
        <div className="px-6 py-4 border-t border-ink-200 bg-ink-50/40">
          <Field label="Decision comment" hint="Visible to vendor on rejection or query.">
            <Textarea rows={2} placeholder="Add a note for the vendor or for internal records…" value={comment} onChange={e => setComment(e.target.value)} />
          </Field>
          <div className="flex items-center justify-between mt-3">
            <Button variant="secondary" size="md" leading={<IconMessageSquare size={14} />} onClick={() => onDecide(vendor, "Query Raised", comment)}>Raise query</Button>
            <div className="flex gap-2">
              <Button variant="danger" size="md" leading={<IconX size={14} />} onClick={() => onDecide(vendor, "Rejected", comment)}>Reject</Button>
              <Button variant="success" size="md" leading={<IconCheck size={14} />} onClick={() => onDecide(vendor, "Approved", comment)}>Approve</Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const Admin = () => {
  const [queue, setQueue] = React.useState(VENDOR_QUEUE);
  const [selectedId, setSelectedId] = React.useState(null);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");

  const counts = React.useMemo(() => ({
    All: queue.length,
    Pending: queue.filter(v => v.status === "Pending").length,
    "Under Review": queue.filter(v => v.status === "Under Review").length,
    "Query Raised": queue.filter(v => v.status === "Query Raised").length,
    Approved: queue.filter(v => v.status === "Approved").length,
    Rejected: queue.filter(v => v.status === "Rejected").length,
  }), [queue]);

  const filtered = queue.filter(v => {
    if (filter !== "All" && v.status !== filter) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.gstin.includes(search.toUpperCase())) return false;
    return true;
  });

  const selected = queue.find(v => v.id === selectedId);

  const decide = (vendor, status, comment) => {
    setQueue(q => q.map(v => v.id === vendor.id ? { ...v, status } : v));
    setSelectedId(null);
  };

  return (
    <div className="px-8 py-7 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900">Vendor approval queue</h1>
          <p className="text-[13px] text-ink-500 mt-1">Review compliance checks and approve, reject or raise a query on each submission.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Export</Button>
          <Button variant="primary" size="md" leading={<IconPlus size={14} />} onClick={() => setInviteOpen(true)}>Invite vendor</Button>
        </div>
      </div>

      <Card padded={false}>
        {/* Filter bar */}
        <div className="px-3 pt-3">
          <Tabs
            tabs={Object.entries(counts).map(([k, v]) => ({ id: k, label: k, count: v }))}
            active={filter}
            onChange={setFilter}
            right={
              <div className="flex items-center gap-2 pr-2">
                <div className="relative">
                  <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search vendor or GSTIN…"
                    className="h-8 pl-7 pr-2.5 text-[12.5px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none w-60"
                  />
                </div>
                <Button variant="secondary" size="sm" leading={<IconFilter size={13} />}>More filters</Button>
              </div>
            }
          />
        </div>

        <DataTable
          onRowClick={(r) => setSelectedId(r.id)}
          columns={[
            {
              key: "name", label: "Vendor",
              render: r => (
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-ink-900 truncate">{r.name}</span>
                    {r.msme && <Badge tone="violet">MSME</Badge>}
                  </div>
                  <div className="text-[11.5px] text-ink-500 mt-0.5">{r.contact} · {r.state}</div>
                </div>
              ),
            },
            { key: "gstin", label: "GSTIN", mono: true, render: r => <span className="font-mono text-[12px] text-ink-700">{r.gstin}</span> },
            { key: "category", label: "Category", render: r => <span className="text-ink-600">{r.category}</span> },
            { key: "risk",  label: "Risk", render: r => <RiskBadge score={r.risk} /> },
            { key: "status",label: "Status", render: r => <StatusChip status={r.status} /> },
            {
              key: "actions", label: "Actions", align: "right",
              render: r => (
                <div className="flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedId(r.id); }}>Open</Button>
                  <Button variant="success" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Approved" } : v))}>Approve</Button>
                  <Button variant="secondary" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Query Raised" } : v))}>Query</Button>
                  <Button variant="danger" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Rejected" } : v))}>Reject</Button>
                </div>
              )
            },
          ]}
          rows={filtered}
          emptyState="No vendors match this filter."
        />
      </Card>

      {selected && <Drawer vendor={selected} onClose={() => setSelectedId(null)} onDecide={decide} />}
      <InviteVendorModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

window.Admin = Admin;



/* ===== pogrn.jsx ===== */
// PO & GRN Tracker — vendor view, tabbed.

const POGRN = () => {
  const [tab, setTab] = React.useState("po");
  const [expanded, setExpanded] = React.useState(null);
  const [grnFilter, setGrnFilter] = React.useState("All");

  const grnCounts = {
    All: GRNS.length,
    Accepted: GRNS.filter(g => g.status === "Accepted").length,
    Partial: GRNS.filter(g => g.status === "Partial").length,
    "Awaiting GRN": GRNS.filter(g => g.status === "Awaiting GRN").length,
  };
  const filteredGRNs = GRNS.filter(g => grnFilter === "All" || g.status === grnFilter);

  return (
    <div className="px-8 py-7 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900">Purchase Orders & GRNs</h1>
          <p className="text-[13px] text-ink-500 mt-1">Track POs from issue to delivery and reconcile goods receipt notes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconCalendar size={14} />}>FY 26-27</Button>
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Export CSV</Button>
        </div>
      </div>

      <Card padded={false}>
        <div className="px-3 pt-3">
          <Tabs
            tabs={[
              { id: "po",  label: "Purchase Orders", count: ALL_POS.length },
              { id: "grn", label: "Goods Receipt Notes", count: GRNS.length },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {tab === "po" && (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left border-b border-ink-200 bg-ink-50/50">
                <th className="px-4 py-2.5 w-8"></th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">PO Number</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Buyer</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Items</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Total Qty</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Delivery</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Status</th>
                <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-ink-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ALL_POS.map(po => {
                const open = expanded === po.id;
                const totalQty = po.items.reduce((s, i) => s + i.qty, 0);
                const totalAmt = po.items.reduce((s, i) => s + i.amount, 0);
                return (
                  <React.Fragment key={po.id}>
                    <tr
                      onClick={() => setExpanded(open ? null : po.id)}
                      className="border-b border-ink-200/60 cursor-pointer hover:bg-ink-50/70"
                    >
                      <td className="px-4 py-3">
                        <IconChevronRight size={14} className={`text-ink-400 transition-transform ${open ? "rotate-90" : ""}`} />
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{po.po}</td>
                      <td className="px-4 py-3 text-ink-600">{po.buyer}</td>
                      <td className="px-4 py-3 text-ink-600">{po.items.length} SKU{po.items.length>1?"s":""}</td>
                      <td className="px-4 py-3 font-mono tnum text-[12.5px] text-ink-700">{totalQty}</td>
                      <td className="px-4 py-3 text-ink-600">{po.delivery}</td>
                      <td className="px-4 py-3"><StatusChip status={po.status} /></td>
                      <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{fmtINR(totalAmt)}</td>
                    </tr>
                    {open && (
                      <tr className="bg-ink-50/50">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="ml-2 pl-5 border-l-2 border-brand-200">
                            <div className="grid grid-cols-3 gap-6 mb-4">
                              <KV k="PO date" v={po.date} />
                              <KV k="Delivery target" v={po.delivery} />
                              <KV k="Buyer org unit" v={`Aarambh — ${po.buyer}`} />
                            </div>
                            <div className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden bg-white">
                              <table className="w-full text-[12.5px]">
                                <thead>
                                  <tr className="text-left bg-ink-50/80 border-b border-ink-200">
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">SKU</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Description</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Qty</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">UoM</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Rate</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {po.items.map(it => (
                                    <tr key={it.sku} className="border-b border-ink-200/60 last:border-0">
                                      <td className="px-3 py-2 font-mono text-[12px] text-ink-900">{it.sku}</td>
                                      <td className="px-3 py-2 text-ink-700">{it.desc}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum">{it.qty}</td>
                                      <td className="px-3 py-2 text-ink-500">{it.uom}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum">{fmtINR(it.rate)}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum text-ink-900">{fmtINR(it.amount)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="flex justify-end gap-2 mt-3">
                              <Button variant="secondary" size="sm" leading={<IconDownload size={13} />}>Download PO</Button>
                              <Button variant="primary" size="sm" leading={<IconReceipt size={13} />}>Raise invoice</Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}

        {tab === "grn" && (
          <>
            <div className="px-4 py-2.5 border-b border-ink-200 flex items-center gap-2">
              {Object.entries(grnCounts).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setGrnFilter(k)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium ${grnFilter === k ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"}`}
                >
                  {k}
                  <span className={`text-[10.5px] font-semibold ${grnFilter === k ? "text-white/80" : "text-ink-400"}`}>{v}</span>
                </button>
              ))}
            </div>
            <DataTable
              columns={[
                { key: "grn", label: "GRN", render: r => <span className="font-mono text-[12.5px] text-ink-900">{r.grn}</span> },
                { key: "po",  label: "Linked PO", render: r => <span className="font-mono text-[12px] text-brand-700">{r.po}</span> },
                { key: "item",label: "Item", render: r => <span className="text-ink-700">{r.item}</span> },
                { key: "received", label: "Received", render: r => <span className="text-ink-600">{r.received}</span> },
                { key: "ordered", label: "Ordered", align: "right", mono: true },
                { key: "received_qty", label: "Received Qty", align: "right", mono: true, render: r => <span className="text-ink-900">{r.received_qty}</span> },
                { key: "accepted", label: "Accepted", align: "right", mono: true, render: r => <span className="text-emerald-700">{r.accepted}</span> },
                { key: "rejected", label: "Rejected", align: "right", mono: true, render: r => <span className={r.rejected > 0 ? "text-rose-700" : "text-ink-400"}>{r.rejected}</span> },
                { key: "reason", label: "Reason",
                  render: r => r.reason === "—"
                    ? <span className="text-ink-400">—</span>
                    : <span className="text-rose-700 text-[12px]">{r.reason}</span>
                },
                { key: "status", label: "Status", render: r => <StatusChip status={r.status} /> },
              ]}
              rows={filteredGRNs}
            />
          </>
        )}
      </Card>

      {/* Helper note */}
      <div className="rounded-lg bg-brand-50/60 ring-1 ring-inset ring-brand-100 px-4 py-3 flex items-start gap-3">
        <span className="w-7 h-7 grid place-items-center rounded-md bg-brand-100 text-brand-700"><IconInfo size={14} /></span>
        <div className="text-[12.5px] text-brand-900">
          <span className="font-semibold">Tip · </span>
          Click any PO row to expand and view its SKU-level breakdown. Raise an invoice directly against accepted GRN quantities to keep your three-way match clean.
        </div>
      </div>
    </div>
  );
};

window.POGRN = POGRN;



/* ===== finance.jsx ===== */
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



/* ===== vendor_categories.jsx ===== */
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



/* ===== compliance.jsx ===== */
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



/* ===== app.jsx ===== */
// Main app — sidebar nav + screen routing.

const NAV = [
  { id: "registration", label: "Registration",  hint: "Public form",     icon: <IconClipboardCheck size={18} />, badge: "Step 1/4" },
  { id: "dashboard",    label: "Vendor Dashboard", hint: "Logged-in vendor", icon: <IconLayoutDashboard size={18} /> },
  { id: "admin",        label: "Admin Panel",   hint: "Procurement",     icon: <IconShieldCheck size={18} />, badge: "6" },
  { id: "categories",   label: "Vendor Categories", hint: "Field master",  icon: <IconSettings size={18} />, badge: "★" },
  { id: "compliance",   label: "Compliance Validation", hint: "Bulk re-validate", icon: <IconShield size={18} />, badge: "NEW" },
  { id: "pogrn",        label: "PO & GRN",      hint: "Operations",      icon: <IconTruck size={18} /> },
  { id: "finance",      label: "Finance Admin", hint: "AP · 3-way match",icon: <IconCircleDollar size={18} />, badge: "AI" },
];

const Sidebar = ({ current, onSelect }) => (
  <aside className="w-[240px] shrink-0 border-r border-ink-200 bg-white flex flex-col" data-screen-label="Sidebar">
    {/* Logo */}
    <div className="px-4 py-4 border-b border-ink-200 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-ink-900 text-white grid place-items-center font-semibold text-[13px]">Aā</div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-ink-900 leading-tight">Aarambh</div>
        <div className="text-[10.5px] text-ink-500 leading-tight">Procurement Cloud</div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-2 py-3 space-y-0.5">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 px-2 py-1.5">Workspace</div>
      {NAV.map(n => {
        const active = n.id === current;
        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${active ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-100"}`}
          >
            <span className={active ? "text-white" : "text-ink-500"}>{n.icon}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-medium leading-tight">{n.label}</span>
              <span className={`block text-[10.5px] leading-tight mt-0.5 ${active ? "text-white/60" : "text-ink-400"}`}>{n.hint}</span>
            </span>
            {n.badge && (
              <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md ${active ? "bg-white/15 text-white" : "bg-ink-100 text-ink-600"}`}>{n.badge}</span>
            )}
          </button>
        );
      })}

      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 px-2 py-1.5 mt-4">More</div>
      {[
        { l: "Reports & analytics", i: <IconFileText size={18} /> },
        { l: "Help center",         i: <IconCircleHelp size={18} /> },
        { l: "Settings",            i: <IconSettings size={18} /> },
      ].map(item => (
        <button key={item.l} className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink-600 hover:bg-ink-100">
          <span className="text-ink-500">{item.i}</span>
          <span className="text-[13px] font-medium">{item.l}</span>
        </button>
      ))}
    </nav>

    {/* User card */}
    <div className="m-2 p-2.5 rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50/60 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center text-[11.5px] font-semibold">SP</div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-ink-900 truncate">Suresh Pawar</div>
        <div className="text-[10.5px] text-ink-500 truncate">Tirupati Industrial</div>
      </div>
      <button className="text-ink-400 hover:text-ink-700"><IconLogout size={15} /></button>
    </div>
  </aside>
);

const Topbar = ({ current }) => {
  const meta = {
    registration: { crumb: "Vendor onboarding · Registration",     env: "Public · pre-login" },
    dashboard:    { crumb: "Vendor portal · Dashboard",            env: "Logged in as vendor" },
    admin:        { crumb: "Internal · Procurement · Approvals",   env: "Procurement staff" },
    categories:   { crumb: "Admin · Vendor categories · Field master", env: "Master setup" },
    compliance:   { crumb: "Finance · Vendor master · Compliance validation", env: "AP / Finance" },
    pogrn:        { crumb: "Vendor portal · PO & GRN tracker",     env: "Logged in as vendor" },
    finance:      { crumb: "Internal · Finance · Invoice automation", env: "Finance admin" },
  }[current];
  return (
    <header className="h-14 border-b border-ink-200 bg-white flex items-center px-6 gap-4">
      <div className="flex items-center gap-2 text-[12px] text-ink-500 min-w-0">
        <span className="truncate">{meta.crumb}</span>
        <span className="text-ink-300">·</span>
        <Badge tone="neutral">{meta.env}</Badge>
      </div>
      <div className="flex-1" />
      <div className="relative">
        <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          placeholder="Search vendors, POs, invoices…"
          className="h-9 pl-8 pr-3 text-[12.5px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none w-72 bg-ink-50/60"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-ink-400 font-mono px-1 py-0.5 rounded ring-1 ring-ink-200 bg-white">⌘K</span>
      </div>
      <button className="relative w-9 h-9 grid place-items-center rounded-md hover:bg-ink-100 text-ink-600">
        <IconBell size={16} />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
      </button>
      <div className="w-px h-6 bg-ink-200" />
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white grid place-items-center text-[11px] font-semibold">SP</div>
        <span className="text-[12.5px] font-medium text-ink-800">Suresh Pawar</span>
        <IconChevronDown size={14} className="text-ink-500" />
      </div>
    </header>
  );
};

const App = () => {
  const [screen, setScreen] = React.useState("dashboard");

  return (
    <div className="flex h-screen min-h-[680px] min-w-[1100px] overflow-hidden">
      <Sidebar current={screen} onSelect={setScreen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar current={screen} />
        <main className="flex-1 overflow-y-auto" data-screen-label={screen}>
          {screen === "registration" && <RegistrationRouter onGoDashboard={() => setScreen("dashboard")} />}
          {screen === "dashboard"    && <Dashboard goTo={setScreen} />}
          {screen === "admin"        && <Admin />}
          {screen === "categories"   && window.VendorCategories && <window.VendorCategories />}
          {screen === "compliance"   && window.VendorCompliance && <window.VendorCompliance />}
          {screen === "pogrn"        && <POGRN />}
          {screen === "finance"      && <Finance />}
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);


