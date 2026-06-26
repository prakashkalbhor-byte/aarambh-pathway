import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatApiError } from "../lib/api";
import { useAuth } from "../App";
import { useToast } from "../components/Toast";
import { Button, Input, Label } from "../components/ui";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { ...form, role: "vendor" });
      setUser(data.user);
      toast.success("Account created. Let's get you onboarded.");
      navigate("/onboarding");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-card p-8 fade-up">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-md bg-brand grid place-items-center text-white font-bold text-sm">K</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900 font-heading">Keva Vendor Portal</div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Vendor Self-Registration</div>
          </div>
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Create your vendor account</h1>
        <p className="text-sm text-slate-600 mb-6">You'll complete a guided onboarding right after.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label required>Full name</Label>
            <Input value={form.full_name} onChange={update("full_name")} required data-testid="register-name-input" />
          </div>
          <div>
            <Label required>Work email</Label>
            <Input type="email" value={form.email} onChange={update("email")} required data-testid="register-email-input" />
          </div>
          <div>
            <Label required>Password</Label>
            <Input type="password" value={form.password} onChange={update("password")} required minLength={6} data-testid="register-password-input" />
            <p className="mt-1.5 text-xs text-slate-500">Minimum 6 characters</p>
          </div>
          <Button type="submit" disabled={loading} className="w-full" size="lg" data-testid="register-submit-btn">
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-slate-600 text-center">
          Already have an account? <Link to="/login" className="text-brand font-medium hover:underline" data-testid="goto-login-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
