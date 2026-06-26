import React, { useState } from "react";
import AppShell from "../components/AppShell";
import { api, formatApiError } from "../lib/api";
import { useAuth } from "../App";
import { useToast } from "../components/Toast";
import { Card, CardHeader, Pill, Button, PageHeader, Input, Label } from "../components/ui";
import { User, Lock, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user, refresh } = useAuth();
  const toast = useToast();

  // Profile state (display only — backend currently does not expose user-level patch endpoint for non-admin; we use admin/users for admin role)
  const [profile, setProfile] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
  });

  // Password change
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);

  // Notification preferences (UI only — backend stores in-app notifications already)
  const [prefs, setPrefs] = useState({
    in_app: true,
    email_workflow: false,
    email_sla: false,
  });

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.next !== pw.confirm) { toast.error("Passwords do not match"); return; }
    if (pw.next.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setPwLoading(true);
    try {
      await api.post("/auth/change-password", { current_password: pw.current, new_password: pw.next });
      toast.success("Password updated");
      setPw({ current: "", next: "", confirm: "" });
    } catch (err) { toast.error(formatApiError(err)); }
    finally { setPwLoading(false); }
  };

  const savePrefs = async () => {
    try {
      await api.post("/auth/notification-prefs", prefs);
      toast.success("Preferences saved");
      refresh && refresh();
    } catch (err) { toast.error(formatApiError(err)); }
  };

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-4xl mx-auto space-y-6">
        <PageHeader
          eyebrow={<><span className="font-mono uppercase tracking-wider">{user?.role?.replace("_", " ")}</span><span className="text-ink-300">·</span><span>{user?.email}</span></>}
          title="Settings"
          subtitle="Profile, password, and notification preferences"
          badges={<><Pill tone="ink">Account</Pill></>}
        />

        {/* Profile */}
        <Card>
          <CardHeader title={<span className="flex items-center gap-2"><User className="w-4 h-4 text-ink-500" /> Profile</span>} subtitle="Personal info shown across the portal" />
          <div className="grid sm:grid-cols-2 gap-4 p-5">
            <div>
              <Label>Full name</Label>
              <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} data-testid="settings-fullname-input" />
            </div>
            <div>
              <Label>Email (read-only)</Label>
              <Input value={profile.email} readOnly className="bg-ink-50 text-ink-500" />
            </div>
            <div className="sm:col-span-2 text-[12px] text-ink-500">
              Profile edits go through your admin. To update other details, raise a ticket from the Help page.
            </div>
          </div>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader title={<span className="flex items-center gap-2"><Lock className="w-4 h-4 text-ink-500" /> Password</span>} subtitle="Change your sign-in password" />
          <form onSubmit={changePassword} className="grid sm:grid-cols-3 gap-4 p-5">
            <div>
              <Label required>Current password</Label>
              <Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required data-testid="settings-current-pw" />
            </div>
            <div>
              <Label required>New password</Label>
              <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required minLength={6} data-testid="settings-new-pw" />
            </div>
            <div>
              <Label required>Confirm new</Label>
              <Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required minLength={6} data-testid="settings-confirm-pw" />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit" variant="dark" disabled={pwLoading} data-testid="settings-pw-save">
                {pwLoading ? "Updating…" : "Update password"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Notification preferences */}
        <Card>
          <CardHeader title={<span className="flex items-center gap-2"><Bell className="w-4 h-4 text-ink-500" /> Notifications</span>} subtitle="What you want to be alerted about" />
          <div className="p-5 space-y-3">
            {[
              { key: "in_app", title: "In-app notifications (bell icon)", desc: "Workflow updates, SAP push results, SLA alerts" },
              { key: "email_workflow", title: "Email — workflow transitions", desc: "Emailed on submit, review, approve, reject (requires email provider)" },
              { key: "email_sla", title: "Email — SLA & document expiry", desc: "Daily digest of stuck vendors and docs expiring in 30 days" },
            ].map((p) => (
              <label key={p.key} className="flex items-start justify-between gap-3 p-3 rounded-md hover:bg-ink-50 cursor-pointer">
                <div>
                  <div className="text-[13px] font-medium text-ink-900">{p.title}</div>
                  <div className="text-[12px] text-ink-500">{p.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={prefs[p.key]}
                  onChange={(e) => setPrefs({ ...prefs, [p.key]: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-brand-700"
                  data-testid={`pref-${p.key}`}
                />
              </label>
            ))}
            <div className="flex justify-end pt-2">
              <Button variant="dark" onClick={savePrefs} data-testid="prefs-save-btn">Save preferences</Button>
            </div>
          </div>
        </Card>

        {/* Security overview (read-only meta) */}
        <Card>
          <CardHeader title={<span className="flex items-center gap-2"><Shield className="w-4 h-4 text-ink-500" /> Security</span>} subtitle="How your account is secured" />
          <div className="p-5 grid sm:grid-cols-3 gap-4 text-[12.5px]">
            <div>
              <div className="text-[10.5px] font-mono uppercase tracking-widest text-ink-500 mb-1">Auth method</div>
              <div className="text-ink-900">{user?.picture ? "Google OAuth" : "Email + password"}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-mono uppercase tracking-widest text-ink-500 mb-1">Role</div>
              <div className="text-ink-900 capitalize">{user?.role?.replace("_", " ")}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-mono uppercase tracking-widest text-ink-500 mb-1">Account created</div>
              <div className="text-ink-900">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
