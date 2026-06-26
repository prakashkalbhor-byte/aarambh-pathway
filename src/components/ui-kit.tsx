import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("bg-white rounded-lg ring-1 ring-ink-200/70 shadow-card", className)}>{children}</div>;
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
      <div>
        <h3 className="text-[14px] font-semibold text-ink-900">{title}</h3>
        {subtitle && <p className="text-[12px] text-ink-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type Tone = "brand" | "emerald" | "amber" | "violet" | "rose" | "ink";
const toneMap: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  ink: "bg-ink-100 text-ink-700 ring-ink-200",
};
export function Pill({ children, tone = "ink", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset", toneMap[tone], className)}>
      {children}
    </span>
  );
}

export function Btn({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "dark" | "brand"; size?: "sm" | "md" }) {
  const v = {
    primary: "bg-brand-700 text-white hover:bg-brand-800",
    brand: "bg-brand-600 text-white hover:bg-brand-700",
    dark: "bg-ink-900 text-white hover:bg-ink-800",
    ghost: "bg-white text-ink-800 ring-1 ring-inset ring-ink-200 hover:bg-ink-50",
  }[variant];
  const s = size === "sm" ? "h-7 px-2.5 text-[12px] gap-1" : "h-9 px-3.5 text-[13px] gap-1.5";
  return (
    <button className={cn("inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40", v, s, className)} {...props}>
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-medium text-ink-700">{label}</span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-9 w-full px-3 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn("h-9 w-full px-2.5 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30", props.className)} />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={cn("w-full px-3 py-2 rounded-md bg-white border border-ink-200 text-[13px] text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30 min-h-[80px]", props.className)} />
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions, badges }: { eyebrow?: ReactNode; title: string; subtitle?: ReactNode; actions?: ReactNode; badges?: ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        {eyebrow && <div className="flex items-center gap-2 text-[12px] text-ink-500">{eyebrow}</div>}
        <h1 className="text-[26px] font-semibold tracking-tight text-ink-900 mt-1">{title}</h1>
        {subtitle && <div className="text-[13px] text-ink-500 mt-1">{subtitle}</div>}
        {badges && <div className="flex items-center gap-2 mt-2.5">{badges}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
