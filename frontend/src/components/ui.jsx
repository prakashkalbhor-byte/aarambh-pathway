import React from "react";
import { cn } from "../lib/utils";

/* ---------------------------------------------------------------------------
 * Aarambh-aligned design primitives — dense, ring-based, ink/brand palette.
 * Backwards compat: keeps Button/Card/Label/Input/Select/Textarea named exports
 * used by existing pages, plus adds Pill, Btn, Field, PageHeader.
 * ------------------------------------------------------------------------ */

export function Button({ className, variant = "primary", size = "md", ...props }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";
  const variants = {
    primary: "bg-brand-700 text-white hover:bg-brand-800",
    brand:   "bg-brand-600 text-white hover:bg-brand-700",
    dark:    "bg-ink-900 text-white hover:bg-ink-800",
    secondary: "bg-ink-900 text-white hover:bg-ink-800",
    outline: "bg-white text-ink-800 ring-1 ring-inset ring-ink-200 hover:bg-ink-50",
    ghost:   "bg-transparent text-ink-700 hover:bg-ink-100",
    danger:  "bg-rose-600 text-white hover:bg-rose-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes = {
    sm: "h-7 px-2.5 text-[12px]",
    md: "h-9 px-3.5 text-[13px]",
    lg: "h-10 px-4 text-[13px]",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

// Alias for Aarambh-style code
export const Btn = Button;

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-9 w-full px-3 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900 placeholder:text-ink-400",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900 placeholder:text-ink-400 min-h-[80px]",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "h-9 w-full px-2.5 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({ className, children, htmlFor, required, mono }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-[12px] font-medium text-ink-700 mb-1.5",
        mono && "font-mono uppercase tracking-[0.08em] text-[10.5px] text-ink-500",
        className
      )}
    >
      {children}{required && <span className="text-rose-600 ml-0.5">*</span>}
    </label>
  );
}

export function Field({ label, hint, required, mono, children, className }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={cn("text-[12px] font-medium text-ink-700", mono && "font-mono uppercase tracking-[0.08em] text-[10.5px] text-ink-500")}>
          {label}{required && <span className="text-rose-600 ml-0.5">*</span>}
        </span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function Card({ className, children }) {
  return (
    <div className={cn("bg-white rounded-lg ring-1 ring-ink-200/70 shadow-card", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, title, subtitle, action }) {
  if (title) {
    return (
      <div className={cn("px-5 pt-5 pb-3 flex items-center justify-between", className)}>
        <div>
          <h3 className="text-[14px] font-semibold text-ink-900">{title}</h3>
          {subtitle && <p className="text-[12px] text-ink-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
    );
  }
  return <div className={cn("px-5 py-4 border-b border-ink-200", className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn("text-[14px] font-semibold text-ink-900", className)}>{children}</h3>;
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

const TONE_STYLES = {
  brand:   "bg-brand-50 text-brand-700 ring-brand-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber:   "bg-amber-50 text-amber-800 ring-amber-200",
  violet:  "bg-violet-50 text-violet-700 ring-violet-200",
  rose:    "bg-rose-50 text-rose-700 ring-rose-200",
  ink:     "bg-ink-100 text-ink-700 ring-ink-200",
  blue:    "bg-blue-50 text-blue-700 ring-blue-200",
  orange:  "bg-orange-50 text-orange-700 ring-orange-200",
  slate:   "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Pill({ children, tone = "ink", className }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset", TONE_STYLES[tone], className)}>
      {children}
    </span>
  );
}

const STATUS_TONE = {
  draft: "ink",
  submitted: "blue",
  under_review: "amber",
  approved: "emerald",
  rejected: "rose",
  on_hold: "orange",
};

export function StatusBadge({ status, className }) {
  const label = (status || "").replace(/_/g, " ");
  return (
    <Pill tone={STATUS_TONE[status] || "ink"} className={cn("capitalize", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-0.5",
        STATUS_TONE[status] === "emerald" ? "bg-emerald-500" :
        STATUS_TONE[status] === "rose" ? "bg-rose-500" :
        STATUS_TONE[status] === "amber" ? "bg-amber-500" :
        STATUS_TONE[status] === "blue" ? "bg-blue-500" :
        STATUS_TONE[status] === "orange" ? "bg-orange-500" : "bg-ink-400"
      )} />
      {label}
    </Pill>
  );
}

export function MonoData({ children, className }) {
  if (children === null || children === undefined || children === "") {
    return <span className="text-ink-400 text-[13px]">—</span>;
  }
  return (
    <span className={cn("font-mono text-[12.5px] text-ink-900", className)}>
      {children}
    </span>
  );
}

export function PageHeader({ eyebrow, title, subtitle, badges, actions }) {
  return (
    <div className="flex items-start justify-between gap-6 flex-wrap">
      <div>
        {eyebrow && <div className="flex items-center gap-2 text-[12px] text-ink-500">{eyebrow}</div>}
        <h1 className="text-[26px] font-semibold tracking-tight text-ink-900 mt-1">{title}</h1>
        {subtitle && <div className="text-[13px] text-ink-500 mt-1">{subtitle}</div>}
        {badges && <div className="flex flex-wrap items-center gap-2 mt-2.5">{badges}</div>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// SLA helper: turns an ISO timestamp into a human/days-ago string + tone
export function getSlaTone(daysOld) {
  if (daysOld == null) return { tone: "ink", label: "—" };
  if (daysOld < 1) return { tone: "emerald", label: "Today" };
  if (daysOld < 3) return { tone: "emerald", label: `${Math.floor(daysOld)}d` };
  if (daysOld < 7) return { tone: "amber", label: `${Math.floor(daysOld)}d` };
  return { tone: "rose", label: `${Math.floor(daysOld)}d` };
}
