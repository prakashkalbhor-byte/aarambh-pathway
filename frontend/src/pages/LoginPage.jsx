import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatApiError } from "../lib/api";
import { useAuth } from "../App";
import { useToast } from "../components/Toast";
import { Button, Input, Label, Card } from "../components/ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data.user);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const handleGoogle = () => {
    const redirectUrl = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: hero */}
      <div className="hidden lg:flex relative bg-slate-900 text-white p-12 flex-col justify-between overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600531529272-023c4b821f14?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-brand/30" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-white grid place-items-center text-brand font-bold text-sm">K</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold font-heading">Keva Vendor Portal</div>
              <div className="text-[10px] text-white/70 font-mono uppercase tracking-widest">Master Data Management</div>
            </div>
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/70 mb-3">Trusted by Procurement</div>
          <h2 className="text-3xl font-bold mb-4 font-heading leading-tight">
            One workspace.<br />Every vendor record.<br />Zero spreadsheets.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Self-service vendor onboarding, automated GST/PAN verification, multi-stage approvals, and SAP company-code mapping — built for Indian compliance.
          </p>
        </div>
        <div className="relative z-10 text-[10px] font-mono uppercase tracking-widest text-white/50">
          © {new Date().getFullYear()} Keva — secure ingress
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md fade-up">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-heading">Sign in</h1>
          <p className="text-sm text-slate-600 mb-8">Vendors and Keva staff use the same portal.</p>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full h-11 rounded-md border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-3 mb-4"
            data-testid="google-signin-btn"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">or with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" data-testid="login-email-input" />
            </div>
            <div>
              <Label htmlFor="password" required>Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" data-testid="login-password-input" />
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg" data-testid="login-submit-btn">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-slate-600 text-center">
            New vendor? <Link to="/register" className="text-brand font-medium hover:underline" data-testid="goto-register-link">Register here</Link>
          </div>

          <Card className="mt-8 bg-slate-50 border-dashed">
            <div className="px-4 py-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">Demo credentials</div>
              <div className="text-xs text-slate-600 space-y-0.5 font-mono">
                <div>admin@keva.com · Admin@123</div>
                <div>reviewer@keva.com · Review@123</div>
                <div>approver@keva.com · Approve@123</div>
                <div>sap@keva.com · Sap@123</div>
                <div>vendor@test.com · Vendor@123</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
