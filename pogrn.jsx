// PO & GRN Tracker — vendor view, tabbed.

const POGRN = () => {
  const [tab, setTab] = React.useState("po");
  const [expanded, setExpanded] = React.useState(null);
  const [grnFilter, setGrnFilter] = React.useState("All");

  const grnCounts = {
    All: GRNS.length,
    Accepted: GRNS.filter(g => g.status === "Accepted").length,
    Partial: GRNS.filter(g => g.status === "Partial").length,
    "Awaiting GRN": GRNS.filter(g => g.status === "Awaiting GRN").length,
  };
  const filteredGRNs = GRNS.filter(g => grnFilter === "All" || g.status === grnFilter);

  return (
    <div className="px-8 py-7 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-900">Purchase Orders & GRNs</h1>
          <p className="text-[13px] text-ink-500 mt-1">Track POs from issue to delivery and reconcile goods receipt notes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconCalendar size={14} />}>FY 26-27</Button>
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Export CSV</Button>
        </div>
      </div>

      <Card padded={false}>
        <div className="px-3 pt-3">
          <Tabs
            tabs={[
              { id: "po",  label: "Purchase Orders", count: ALL_POS.length },
              { id: "grn", label: "Goods Receipt Notes", count: GRNS.length },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {tab === "po" && (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left border-b border-ink-200 bg-ink-50/50">
                <th className="px-4 py-2.5 w-8"></th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">PO Number</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Buyer</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Items</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Total Qty</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Delivery</th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Status</th>
                <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-ink-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ALL_POS.map(po => {
                const open = expanded === po.id;
                const totalQty = po.items.reduce((s, i) => s + i.qty, 0);
                const totalAmt = po.items.reduce((s, i) => s + i.amount, 0);
                return (
                  <React.Fragment key={po.id}>
                    <tr
                      onClick={() => setExpanded(open ? null : po.id)}
                      className="border-b border-ink-200/60 cursor-pointer hover:bg-ink-50/70"
                    >
                      <td className="px-4 py-3">
                        <IconChevronRight size={14} className={`text-ink-400 transition-transform ${open ? "rotate-90" : ""}`} />
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-ink-900">{po.po}</td>
                      <td className="px-4 py-3 text-ink-600">{po.buyer}</td>
                      <td className="px-4 py-3 text-ink-600">{po.items.length} SKU{po.items.length>1?"s":""}</td>
                      <td className="px-4 py-3 font-mono tnum text-[12.5px] text-ink-700">{totalQty}</td>
                      <td className="px-4 py-3 text-ink-600">{po.delivery}</td>
                      <td className="px-4 py-3"><StatusChip status={po.status} /></td>
                      <td className="px-4 py-3 text-right font-mono tnum text-[12.5px] text-ink-900">{fmtINR(totalAmt)}</td>
                    </tr>
                    {open && (
                      <tr className="bg-ink-50/50">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="ml-2 pl-5 border-l-2 border-brand-200">
                            <div className="grid grid-cols-3 gap-6 mb-4">
                              <KV k="PO date" v={po.date} />
                              <KV k="Delivery target" v={po.delivery} />
                              <KV k="Buyer org unit" v={`Aarambh — ${po.buyer}`} />
                            </div>
                            <div className="rounded-md ring-1 ring-inset ring-ink-200 overflow-hidden bg-white">
                              <table className="w-full text-[12.5px]">
                                <thead>
                                  <tr className="text-left bg-ink-50/80 border-b border-ink-200">
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">SKU</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">Description</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Qty</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium">UoM</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Rate</th>
                                    <th className="px-3 py-2 text-[10.5px] uppercase tracking-wider text-ink-500 font-medium text-right">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {po.items.map(it => (
                                    <tr key={it.sku} className="border-b border-ink-200/60 last:border-0">
                                      <td className="px-3 py-2 font-mono text-[12px] text-ink-900">{it.sku}</td>
                                      <td className="px-3 py-2 text-ink-700">{it.desc}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum">{it.qty}</td>
                                      <td className="px-3 py-2 text-ink-500">{it.uom}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum">{fmtINR(it.rate)}</td>
                                      <td className="px-3 py-2 text-right font-mono tnum text-ink-900">{fmtINR(it.amount)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="flex justify-end gap-2 mt-3">
                              <Button variant="secondary" size="sm" leading={<IconDownload size={13} />}>Download PO</Button>
                              <Button variant="primary" size="sm" leading={<IconReceipt size={13} />}>Raise invoice</Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}

        {tab === "grn" && (
          <>
            <div className="px-4 py-2.5 border-b border-ink-200 flex items-center gap-2">
              {Object.entries(grnCounts).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setGrnFilter(k)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium ${grnFilter === k ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"}`}
                >
                  {k}
                  <span className={`text-[10.5px] font-semibold ${grnFilter === k ? "text-white/80" : "text-ink-400"}`}>{v}</span>
                </button>
              ))}
            </div>
            <DataTable
              columns={[
                { key: "grn", label: "GRN", render: r => <span className="font-mono text-[12.5px] text-ink-900">{r.grn}</span> },
                { key: "po",  label: "Linked PO", render: r => <span className="font-mono text-[12px] text-brand-700">{r.po}</span> },
                { key: "item",label: "Item", render: r => <span className="text-ink-700">{r.item}</span> },
                { key: "received", label: "Received", render: r => <span className="text-ink-600">{r.received}</span> },
                { key: "ordered", label: "Ordered", align: "right", mono: true },
                { key: "received_qty", label: "Received Qty", align: "right", mono: true, render: r => <span className="text-ink-900">{r.received_qty}</span> },
                { key: "accepted", label: "Accepted", align: "right", mono: true, render: r => <span className="text-emerald-700">{r.accepted}</span> },
                { key: "rejected", label: "Rejected", align: "right", mono: true, render: r => <span className={r.rejected > 0 ? "text-rose-700" : "text-ink-400"}>{r.rejected}</span> },
                { key: "reason", label: "Reason",
                  render: r => r.reason === "—"
                    ? <span className="text-ink-400">—</span>
                    : <span className="text-rose-700 text-[12px]">{r.reason}</span>
                },
                { key: "status", label: "Status", render: r => <StatusChip status={r.status} /> },
              ]}
              rows={filteredGRNs}
            />
          </>
        )}
      </Card>

      {/* Helper note */}
      <div className="rounded-lg bg-brand-50/60 ring-1 ring-inset ring-brand-100 px-4 py-3 flex items-start gap-3">
        <span className="w-7 h-7 grid place-items-center rounded-md bg-brand-100 text-brand-700"><IconInfo size={14} /></span>
        <div className="text-[12.5px] text-brand-900">
          <span className="font-semibold">Tip · </span>
          Click any PO row to expand and view its SKU-level breakdown. Raise an invoice directly against accepted GRN quantities to keep your three-way match clean.
        </div>
      </div>
    </div>
  );
};

window.POGRN = POGRN;
