import React from "react";
import { cn } from "../lib/utils";

export function Button({ className, variant = "primary", size = "md", asChild, ...props }) {
  const Comp = asChild ? "span" : "button";
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-1";
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-hover shadow-card",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-sm",
  };
  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors",
        "focus:border-brand focus:ring-2 focus:ring-brand/20",
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
        "min-h-[88px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors",
        "focus:border-brand focus:ring-2 focus:ring-brand/20",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, children, htmlFor, required, mono }) {
  return (
    <label htmlFor={htmlFor} className={cn(
      "block text-xs font-medium text-slate-600 mb-1.5",
      mono && "font-mono uppercase tracking-widest text-[10px] text-slate-500",
      className
    )}>
      {children}{required && <span className="text-rose-600 ml-0.5">*</span>}
    </label>
  );
}

export function Card({ className, children }) {
  return (
    <div className={cn("rounded-lg border border-slate-200 bg-white shadow-card", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn("px-5 py-4 border-b border-slate-200", className)}>{children}</div>;
}
export function CardTitle({ className, children }) {
  return <h3 className={cn("text-base font-semibold text-slate-900", className)}>{children}</h3>;
}
export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none",
        "focus:border-brand focus:ring-2 focus:ring-brand/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

const STATUS_STYLES = {
  draft: "bg-slate-100 text-slate-700",
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  on_hold: "bg-orange-100 text-orange-700",
};

export function StatusBadge({ status, className }) {
  const label = (status || "").replace(/_/g, " ");
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
      STATUS_STYLES[status] || "bg-slate-100 text-slate-700",
      className
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full",
        status === "approved" ? "bg-emerald-500" :
        status === "rejected" ? "bg-rose-500" :
        status === "under_review" ? "bg-amber-500" :
        status === "submitted" ? "bg-blue-500" :
        status === "on_hold" ? "bg-orange-500" : "bg-slate-400"
      )} />
      {label}
    </span>
  );
}

export function MonoData({ children, className }) {
  if (!children) return <span className="text-slate-400 text-sm">—</span>;
  return (
    <span className={cn("font-mono text-sm text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200", className)}>
      {children}
    </span>
  );
}
