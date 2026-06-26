import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "./lib/api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import VendorOnboarding from "./pages/VendorOnboarding";
import VendorDetail from "./pages/VendorDetail";
import VendorList from "./pages/VendorList";
import AdminUsers from "./pages/AdminUsers";
import VendorCategories from "./pages/VendorCategories";
import ComplianceValidation from "./pages/ComplianceValidation";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import POGRNPage from "./pages/POGRNPage";
import FinanceAutomation from "./pages/FinanceAutomation";
import { ToastProvider, useToast } from "./components/Toast";

// -----------------------------------------------------------------------------
// Auth context
// -----------------------------------------------------------------------------
const AuthCtx = createContext(null);
export function useAuth() { return useContext(AuthCtx); }

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined=checking, null=anon, object=user

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // If returning from Google OAuth, AuthCallback handles it first
    if (window.location.hash?.includes("session_id=")) return;
    checkAuth();
  }, [checkAuth]);

  const value = { user, setUser, refresh: checkAuth };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// -----------------------------------------------------------------------------
// Google OAuth callback (Emergent)
// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
// -----------------------------------------------------------------------------
function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const toast = useToast();
  const hasProcessed = React.useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const session_id = params.get("session_id");
    if (!session_id) { navigate("/login"); return; }
    (async () => {
      try {
        const { data } = await api.get(`/auth/google/session?session_id=${encodeURIComponent(session_id)}`);
        setUser(data.user);
        // Clean hash and route to dashboard
        window.history.replaceState(null, "", "/dashboard");
        navigate("/dashboard", { replace: true });
      } catch {
        toast?.error?.("Google sign-in failed");
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate, setUser, toast]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="text-slate-600 text-sm">Signing you in…</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Protected route
// -----------------------------------------------------------------------------
function Protected({ children, roles }) {
  const { user } = useAuth();
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-slate-500 text-sm">Loading…</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role) && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

// -----------------------------------------------------------------------------
// Router shell that handles OAuth fragment first
// -----------------------------------------------------------------------------
function AppRouter() {
  const location = useLocation();
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
      <Route path="/onboarding" element={<Protected roles={["vendor"]}><VendorOnboarding /></Protected>} />
      <Route path="/vendors" element={<Protected roles={["reviewer","approver","sap_team","admin"]}><VendorList /></Protected>} />
      <Route path="/vendors/:vendorId" element={<Protected><VendorDetail /></Protected>} />
      <Route path="/admin/users" element={<Protected roles={["admin"]}><AdminUsers /></Protected>} />
      <Route path="/admin/categories" element={<Protected roles={["admin"]}><VendorCategories /></Protected>} />
      <Route path="/compliance" element={<Protected roles={["reviewer", "approver", "admin"]}><ComplianceValidation /></Protected>} />
      <Route path="/help" element={<Protected><HelpPage /></Protected>} />
      <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
      <Route path="/po-grn" element={<Protected><POGRNPage /></Protected>} />
      <Route path="/finance" element={<Protected roles={["admin", "approver", "reviewer"]}><FinanceAutomation /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
