// Internal Admin Panel — procurement team view with right-side drawer.

const ValidationRow = ({ ok, label, detail }) => (
  <div className="flex items-start gap-3 py-3 border-b border-ink-200/60 last:border-0">
    <span className={`w-7 h-7 grid place-items-center rounded-md ${ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
      {ok ? <IconCheck size={14} /> : <IconX size={14} />}
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-medium text-ink-900">{label}</div>
      <div className="text-[11.5px] text-ink-500 mt-0.5">{detail}</div>
    </div>
    <Badge tone={ok ? "green" : "red"}>{ok ? "Pass" : "Fail"}</Badge>
  </div>
);

const DocLine = ({ doc }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-ink-200/60 last:border-0">
    <span className={`w-8 h-8 grid place-items-center rounded-md ${doc.ok ? "bg-ink-100 text-ink-600" : "bg-rose-50 text-rose-700"}`}>
      <IconFile size={15} />
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-[12.5px] font-medium text-ink-900 truncate">{doc.name}</div>
      <div className="text-[11px] text-ink-500">{doc.ok ? doc.size : "Not uploaded"}</div>
    </div>
    {doc.ok ? (
      <button className="text-[11.5px] text-brand-700 hover:underline inline-flex items-center gap-1"><IconEye size={12} /> View</button>
    ) : (
      <Badge tone="red">Missing</Badge>
    )}
  </div>
);

const Drawer = ({ vendor, onClose, onDecide }) => {
  const [comment, setComment] = React.useState("");
  const [tab, setTab] = React.useState("checks");
  if (!vendor) return null;
  const checks = vendor.validations;
  const allPass = Object.values(checks).every(c => c.ok);

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 bottom-0 w-[560px] bg-white shadow-pop flex flex-col animate-[slideIn_.18s_ease-out]">
        <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>
        {/* Header */}
        <div className="px-6 py-5 border-b border-ink-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11.5px] text-ink-500">
              <span className="font-mono">{vendor.gstin}</span>
              <span className="text-ink-300">·</span>
              <span>Submitted {vendor.submitted}</span>
            </div>
            <h2 className="text-[18px] font-semibold text-ink-900 tracking-tight mt-1 leading-snug">{vendor.name}</h2>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <StatusChip status={vendor.status} />
              {vendor.msme && <Badge tone="violet" icon={<IconSparkles size={11} />}>MSME</Badge>}
              <Badge tone="neutral">{vendor.category}</Badge>
              <Badge tone="neutral">{vendor.state}</Badge>
              <RiskBadge score={vendor.risk} />
            </div>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-800 -mt-1"><IconX size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="px-3">
          <Tabs
            tabs={[
              { id: "checks",  label: "Validations", count: Object.values(checks).filter(c => !c.ok).length },
              { id: "ocr",     label: "OCR Match",   count: vendor.ocr ? vendor.ocr.docs.flatMap(d => d.fields).filter(f => !f.match).length : 0 },
              { id: "docs",    label: "Documents",   count: vendor.docs.filter(d => !d.ok).length },
              { id: "profile", label: "Profile" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {/* Body — scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {tab === "checks" && (
            <>
              <div className={`rounded-lg ring-1 ring-inset px-4 py-3 mb-4 flex items-start gap-3 ${allPass ? "bg-emerald-50/60 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
                {allPass ? <IconCheckCircle size={18} className="mt-0.5" /> : <IconAlertTriangle size={18} className="mt-0.5" />}
                <div className="text-[12.5px]">
                  {allPass
                    ? "All compliance checks passed. Vendor ready for approval."
                    : "Some checks need attention before this vendor can be approved."}
                </div>
              </div>
              <ValidationRow ok={checks.gstin.ok} label={checks.gstin.label} detail={checks.gstin.detail} />
              <ValidationRow ok={checks.pan.ok}   label={checks.pan.label}   detail={checks.pan.detail} />
              <ValidationRow ok={checks.tan.ok}   label={checks.tan.label}   detail={checks.tan.detail} />
              <ValidationRow ok={checks.bank.ok}  label={checks.bank.label}  detail={checks.bank.detail} />

              <SectionTitle hint={null} className="mt-5">Bank details on file</SectionTitle>
              <div className="rounded-md ring-1 ring-inset ring-ink-200 px-4 py-3 bg-ink-50/40">
                <KV k="Beneficiary" v={<span className="font-mono text-[12px]">{vendor.bank.name}</span>} />
                <KV k="Account no." v={<span className="font-mono text-[12px]">{vendor.bank.acc}</span>} />
                <KV k="IFSC"        v={<span className="font-mono text-[12px]">{vendor.bank.ifsc}</span>} />
              </div>
            </>
          )}

          {tab === "ocr" && vendor.ocr && (() => {
            const allFields = vendor.ocr.docs.flatMap(d => d.fields);
            const failed = allFields.filter(f => !f.match).length;
            return (
              <>
                <div className={`rounded-lg ring-1 ring-inset px-4 py-3 mb-4 flex items-start gap-3 ${failed === 0 ? "bg-emerald-50/60 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
                  <span className="w-7 h-7 grid place-items-center rounded-md bg-white/60 ring-1 ring-current/10 mt-0.5"><IconFileText size={14} /></span>
                  <div className="text-[12.5px] flex-1">
                    <div className="font-semibold">OCR Reader · {failed === 0 ? "All extracted fields match government records" : `${failed} field${failed>1?"s":""} need review`}</div>
                    <div className="opacity-80 mt-0.5">
                      Extracted {allFields.length} fields from {vendor.ocr.docs.length} documents at avg. <span className="font-mono">{vendor.ocr.confidence}%</span> confidence · {vendor.ocr.processedAt}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {vendor.ocr.docs.map(d => (
                    <div key={d.doc} className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden">
                      <div className="px-3 py-2 bg-ink-50/70 border-b border-ink-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 grid place-items-center rounded bg-white ring-1 ring-ink-200 text-ink-600"><IconFile size={12} /></span>
                          <span className="text-[12.5px] font-semibold text-ink-900 truncate">{d.doc}</span>
                        </div>
                        <span className="text-[11px] text-ink-500">vs. {d.source}</span>
                      </div>
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="text-left border-b border-ink-200/70 bg-white">
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Field</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Extracted (OCR)</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500">Government record</th>
                            <th className="px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 text-right">Match</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.fields.map((f, i) => (
                            <React.Fragment key={i}>
                              <tr className={`border-b border-ink-200/60 last:border-0 ${!f.match ? "bg-amber-50/40" : "bg-white"}`}>
                                <td className="px-3 py-2 text-ink-700">{f.label}</td>
                                <td className="px-3 py-2 font-mono text-[11.5px] text-ink-900">{f.extracted}</td>
                                <td className="px-3 py-2 font-mono text-[11.5px] text-ink-700">{f.portal}</td>
                                <td className="px-3 py-2 text-right">
                                  {f.match
                                    ? <Badge tone="green" icon={<IconCheck size={11} />}>Match</Badge>
                                    : <Badge tone="amber" icon={<IconAlertTriangle size={11} />}>Review</Badge>}
                                </td>
                              </tr>
                              {f.note && (
                                <tr className="bg-amber-50/30 border-b border-ink-200/60 last:border-0">
                                  <td colSpan={4} className="px-3 py-1.5 text-[11px] text-amber-900 italic">
                                    <IconInfo size={11} className="inline -mt-0.5 mr-1" />{f.note}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {tab === "docs" && (
            <>
              <SectionTitle hint="Click View to preview the uploaded file inline.">Uploaded documents</SectionTitle>
              {vendor.docs.map(d => <DocLine key={d.name} doc={d} />)}
            </>
          )}

          {tab === "profile" && (
            <div className="space-y-4">
              <SectionTitle>Submitted profile</SectionTitle>
              <div className="grid grid-cols-2 gap-x-8">
                <KV k="Contact"        v={vendor.contact} />
                <KV k="State"          v={vendor.state} />
                <KV k="GSTIN"          v={<span className="font-mono text-[12px]">{vendor.gstin}</span>} />
                <KV k="PAN"            v={<span className="font-mono text-[12px]">{vendor.pan}</span>} />
                <KV k="TAN"            v={<span className="font-mono text-[12px]">{vendor.tan}</span>} />
                <KV k="Udyam"          v={<span className="font-mono text-[12px]">{vendor.udyam}</span>} />
                <KV k="Category"       v={vendor.category} />
                <KV k="MSME"           v={vendor.msme ? "Yes" : "No"} />
              </div>
            </div>
          )}
        </div>

        {/* Footer — decision */}
        <div className="px-6 py-4 border-t border-ink-200 bg-ink-50/40">
          <Field label="Decision comment" hint="Visible to vendor on rejection or query.">
            <Textarea rows={2} placeholder="Add a note for the vendor or for internal records…" value={comment} onChange={e => setComment(e.target.value)} />
          </Field>
          <div className="flex items-center justify-between mt-3">
            <Button variant="secondary" size="md" leading={<IconMessageSquare size={14} />} onClick={() => onDecide(vendor, "Query Raised", comment)}>Raise query</Button>
            <div className="flex gap-2">
              <Button variant="danger" size="md" leading={<IconX size={14} />} onClick={() => onDecide(vendor, "Rejected", comment)}>Reject</Button>
              <Button variant="success" size="md" leading={<IconCheck size={14} />} onClick={() => onDecide(vendor, "Approved", comment)}>Approve</Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const Admin = () => {
  const [queue, setQueue] = React.useState(VENDOR_QUEUE);
  const [selectedId, setSelectedId] = React.useState(null);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");

  const counts = React.useMemo(() => ({
    All: queue.length,
    Pending: queue.filter(v => v.status === "Pending").length,
    "Under Review": queue.filter(v => v.status === "Under Review").length,
    "Query Raised": queue.filter(v => v.status === "Query Raised").length,
    Approved: queue.filter(v => v.status === "Approved").length,
    Rejected: queue.filter(v => v.status === "Rejected").length,
  }), [queue]);

  const filtered = queue.filter(v => {
    if (filter !== "All" && v.status !== filter) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.gstin.includes(search.toUpperCase())) return false;
    return true;
  });

  const selected = queue.find(v => v.id === selectedId);

  const decide = (vendor, status, comment) => {
    setQueue(q => q.map(v => v.id === vendor.id ? { ...v, status } : v));
    setSelectedId(null);
  };

  return (
    <div className="px-8 py-7 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900">Vendor approval queue</h1>
          <p className="text-[13px] text-ink-500 mt-1">Review compliance checks and approve, reject or raise a query on each submission.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Export</Button>
          <Button variant="primary" size="md" leading={<IconPlus size={14} />} onClick={() => setInviteOpen(true)}>Invite vendor</Button>
        </div>
      </div>

      <Card padded={false}>
        {/* Filter bar */}
        <div className="px-3 pt-3">
          <Tabs
            tabs={Object.entries(counts).map(([k, v]) => ({ id: k, label: k, count: v }))}
            active={filter}
            onChange={setFilter}
            right={
              <div className="flex items-center gap-2 pr-2">
                <div className="relative">
                  <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search vendor or GSTIN…"
                    className="h-8 pl-7 pr-2.5 text-[12.5px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none w-60"
                  />
                </div>
                <Button variant="secondary" size="sm" leading={<IconFilter size={13} />}>More filters</Button>
              </div>
            }
          />
        </div>

        <DataTable
          onRowClick={(r) => setSelectedId(r.id)}
          columns={[
            {
              key: "name", label: "Vendor",
              render: r => (
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-ink-900 truncate">{r.name}</span>
                    {r.msme && <Badge tone="violet">MSME</Badge>}
                  </div>
                  <div className="text-[11.5px] text-ink-500 mt-0.5">{r.contact} · {r.state}</div>
                </div>
              ),
            },
            { key: "gstin", label: "GSTIN", mono: true, render: r => <span className="font-mono text-[12px] text-ink-700">{r.gstin}</span> },
            { key: "category", label: "Category", render: r => <span className="text-ink-600">{r.category}</span> },
            { key: "risk",  label: "Risk", render: r => <RiskBadge score={r.risk} /> },
            { key: "status",label: "Status", render: r => <StatusChip status={r.status} /> },
            {
              key: "actions", label: "Actions", align: "right",
              render: r => (
                <div className="flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedId(r.id); }}>Open</Button>
                  <Button variant="success" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Approved" } : v))}>Approve</Button>
                  <Button variant="secondary" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Query Raised" } : v))}>Query</Button>
                  <Button variant="danger" size="sm" onClick={() => setQueue(q => q.map(v => v.id === r.id ? { ...v, status: "Rejected" } : v))}>Reject</Button>
                </div>
              )
            },
          ]}
          rows={filtered}
          emptyState="No vendors match this filter."
        />
      </Card>

      {selected && <Drawer vendor={selected} onClose={() => setSelectedId(null)} onDecide={decide} />}
      <InviteVendorModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

window.Admin = Admin;
