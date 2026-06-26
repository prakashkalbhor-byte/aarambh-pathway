import React, { useEffect, useState } from "react";
import { api, formatApiError } from "../lib/api";
import AppShell from "../components/AppShell";
import { Card, Select } from "../components/ui";
import { useToast } from "../components/Toast";

const ROLES = ["vendor", "reviewer", "approver", "sap_team", "admin"];

export default function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useState([]);

  const load = async () => {
    try { const { data } = await api.get("/admin/users"); setUsers(data); }
    catch (err) { toast.error(formatApiError(err)); }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const updateUser = async (user_id, patch) => {
    try {
      await api.patch(`/admin/users/${user_id}`, patch);
      load();
      toast.success("User updated");
    } catch (err) { toast.error(formatApiError(err)); }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 font-heading">User management</h1>
          <p className="text-slate-600 mt-1">Manage roles and activation status for all portal users.</p>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
                  <th className="text-left py-2.5 px-5 font-medium">User</th>
                  <th className="text-left py-2.5 px-3 font-medium">Email</th>
                  <th className="text-left py-2.5 px-3 font-medium">Role</th>
                  <th className="text-left py-2.5 px-3 font-medium">Status</th>
                  <th className="text-left py-2.5 px-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id} className="border-b border-slate-100">
                    <td className="py-3 px-5">
                      <div className="font-medium text-slate-900">{u.full_name || "—"}</div>
                      <div className="text-xs text-slate-500 font-mono">{u.user_id}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{u.email}</td>
                    <td className="py-3 px-3">
                      <Select value={u.role} onChange={(e) => updateUser(u.user_id, { role: e.target.value })} className="w-36" data-testid={`role-select-${u.user_id}`}>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </Select>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => updateUser(u.user_id, { is_active: !u.is_active })}
                        className={`text-xs font-medium px-2.5 py-1 rounded ${u.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}
                        data-testid={`toggle-active-${u.user_id}`}
                      >
                        {u.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
