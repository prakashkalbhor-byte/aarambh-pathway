import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import { api, formatApiError } from "../lib/api";
import { useAuth } from "../App";
import { useToast } from "../components/Toast";
import { Card, CardHeader, Pill, Button, PageHeader, Input, Label, Select } from "../components/ui";
import { ChevronRight, Folder, Star, Plus, Edit2, Trash2, X } from "lucide-react";

export default function VendorCategories() {
  const { user } = useAuth();
  const toast = useToast();
  const [tree, setTree] = useState([]);
  const [editing, setEditing] = useState(null); // {family_id, sub?}
  const [showNew, setShowNew] = useState(false);

  const load = async () => {
    try { const { data } = await api.get("/categories"); setTree(data); }
    catch (err) { toast.error(formatApiError(err)); }
  };
  useEffect(() => { load(); }, []);

  const totalVendors = tree.reduce((s, f) => s + (f.vendor_count || 0), 0);
  const totalSubs = tree.reduce((s, f) => s + (f.children?.length || 0), 0);

  const isAdmin = user?.role === "admin";

  const handleDeleteSub = async (familyId, subId) => {
    try { await api.delete(`/categories/${familyId}/sub/${subId}`); toast.success("Removed"); load(); }
    catch (err) { toast.error(formatApiError(err)); }
  };

  return (
    <AppShell>
      <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto space-y-6">
        <PageHeader
          title="Vendor category taxonomy"
          subtitle={`${totalVendors} vendors mapped across ${tree.length} spend families and ${totalSubs} sub-categories`}
          badges={<><Pill tone="violet">Field master</Pill><Pill tone="ink">v2.4 · published</Pill></>}
          actions={isAdmin && (
            <>
              <Button variant="ghost">Export taxonomy</Button>
              <Button variant="dark" onClick={() => setShowNew(true)} data-testid="new-category-btn">
                <Plus className="w-3.5 h-3.5" /> New category
              </Button>
            </>
          )}
        />

        {/* Family overview cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tree.map((fam) => (
            <Card key={fam.family_id} className="p-5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 grid place-items-center rounded-md bg-brand-50 text-brand-700">
                  <Folder className="w-[18px] h-[18px]" />
                </div>
                {fam.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
              </div>
              <div className="text-[13px] font-semibold text-ink-900 mt-4">{fam.name}</div>
              <div className="text-[11.5px] text-ink-500">{fam.vendor_count || 0} vendors · {fam.children?.length || 0} subcategories</div>
            </Card>
          ))}
          {tree.length === 0 && (
            <Card className="p-5 col-span-full text-center text-[13px] text-ink-500">No categories yet. Click &quot;New category&quot; to add a family.</Card>
          )}
        </div>

        {/* Family/Sub trees */}
        <div className="grid lg:grid-cols-3 gap-5">
          {tree.map((fam) => (
            <Card key={fam.family_id} className="overflow-hidden">
              <CardHeader title={fam.name} subtitle={`${fam.vendor_count || 0} vendors`}
                action={isAdmin && <Button variant="ghost" size="sm" onClick={() => setEditing({ family_id: fam.family_id })}>Add sub</Button>} />
              <ul className="px-2 pb-3">
                {(fam.children || []).map((c) => (
                  <li key={c.sub_id} className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-ink-50 group">
                    <div className="w-7 h-7 rounded-md bg-ink-100 text-ink-600 grid place-items-center">
                      <Folder className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-ink-900 font-medium truncate">{c.name}</div>
                      <div className="text-[11px] text-ink-500">{c.vendor_count || 0} vendors · {c.tier} · SLA {c.sla}</div>
                    </div>
                    {isAdmin && (
                      <button onClick={() => handleDeleteSub(fam.family_id, c.sub_id)} className="opacity-0 group-hover:opacity-100 text-ink-400 hover:text-rose-600" data-testid={`del-sub-${c.sub_id}`}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
                  </li>
                ))}
                {(fam.children || []).length === 0 && (
                  <li className="text-[12px] text-ink-500 px-3 py-3">No subcategories yet.</li>
                )}
              </ul>
            </Card>
          ))}
        </div>

        {(showNew || editing) && (
          <CategoryDialog
            mode={showNew ? "family" : "sub"}
            familyId={editing?.family_id}
            onClose={() => { setShowNew(false); setEditing(null); }}
            onSaved={() => { setShowNew(false); setEditing(null); load(); }}
          />
        )}
      </div>
    </AppShell>
  );
}

function CategoryDialog({ mode, familyId, onClose, onSaved }) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [tier, setTier] = useState("Tier 2");
  const [sla, setSla] = useState("45d");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === "family") {
        await api.post("/categories", { name });
      } else {
        await api.post(`/categories/${familyId}/sub`, { name, tier, sla });
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(formatApiError(err));
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-ink-900/30 grid place-items-center z-50" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="bg-white rounded-lg shadow-elev ring-1 ring-ink-200 w-full max-w-md p-6 space-y-4 fade-up" data-testid="category-dialog">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink-900">{mode === "family" ? "New spend family" : "New subcategory"}</h3>
          <button type="button" onClick={onClose} className="text-ink-400 hover:text-ink-700"><X className="w-4 h-4" /></button>
        </div>
        <div>
          <Label required>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required data-testid="category-name-input" />
        </div>
        {mode === "sub" && (
          <>
            <div>
              <Label>Tier</Label>
              <Select value={tier} onChange={(e) => setTier(e.target.value)}>
                <option>Tier 1</option><option>Tier 2</option><option>Tier 3</option>
              </Select>
            </div>
            <div>
              <Label>Payment / SLA</Label>
              <Select value={sla} onChange={(e) => setSla(e.target.value)}>
                <option>30d</option><option>45d</option><option>60d</option><option>90d</option>
              </Select>
            </div>
          </>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="dark" disabled={saving || !name} data-testid="category-save-btn">{saving ? "Saving…" : "Save"}</Button>
        </div>
      </form>
    </div>
  );
}
