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
