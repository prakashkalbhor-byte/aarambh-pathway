import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "../lib/utils";

const Ctx = createContext(null);
export function useToast() { return useContext(Ctx); }

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((tid) => setToasts((t) => t.filter((x) => x.id !== tid)), []);
  const push = useCallback((kind, message) => {
    const tid = ++id;
    setToasts((t) => [...t, { id: tid, kind, message }]);
    setTimeout(() => remove(tid), 4200);
  }, [remove]);
  const value = {
    success: (m) => push("success", m),
    error: (m) => push("error", m),
    info: (m) => push("info", m),
  };
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-[360px] max-w-[90vw]" data-testid="toast-region">
        {toasts.map((t) => (
          <div key={t.id} className={cn(
            "fade-up flex items-start gap-3 rounded-lg border bg-white px-3.5 py-3 shadow-card",
            t.kind === "success" && "border-emerald-200",
            t.kind === "error" && "border-rose-200",
            t.kind === "info" && "border-slate-200",
          )} data-testid={`toast-${t.kind}`}>
            {t.kind === "success" && <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />}
            {t.kind === "error" && <AlertCircle className="w-4 h-4 mt-0.5 text-rose-600" />}
            {t.kind === "info" && <Info className="w-4 h-4 mt-0.5 text-slate-600" />}
            <div className="flex-1 text-sm text-slate-800">{t.message}</div>
            <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
