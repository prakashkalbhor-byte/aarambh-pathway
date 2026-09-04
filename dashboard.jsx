// Vendor Dashboard — logged-in vendor view.

const StatCard = ({ stat }) => {
  const iconMap = {
    package: <IconPackage size={18} />,
    truck:   <IconTruck size={18} />,
    receipt: <IconReceipt size={18} />,
    dollar:  <IconCircleDollar size={18} />,
  };
  const toneRing = {
    blue:   "bg-brand-50  text-brand-700",
    amber:  "bg-amber-50  text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    green:  "bg-emerald-50 text-emerald-700",
  };
  return (
    <Card className="!p-5">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 grid place-items-center rounded-md ${toneRing[stat.tone]}`}>
          {iconMap[stat.icon]}
        </div>
        <button className="text-ink-400 hover:text-ink-700"><IconDots size={16} /></button>
      </div>
      <div className="text-[11.5px] font-medium tracking-wide uppercase text-ink-500 mt-4">{stat.label}</div>
      <div className="text-[28px] font-semibold text-ink-900 mt-1 tracking-tight tnum">{stat.value}</div>
      <div className="text-[11.5px] text-ink-500 mt-1">{stat.delta}</div>
    </Card>
  );
};

// A tiny payment trend sparkline rendered inline so we don't ship an image
const Spark = ({ data, color = "#4338ca" }) => {
  const w = 320, h = 64, pad = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const x = (i) => pad + (i * (w - pad*2)) / (data.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad*2);
  const d = data.map((v,i)=>`${i===0?"M":"L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${d} L ${x(data.length-1)} ${h-pad} L ${x(0)} ${h-pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g1)" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Dashboard = ({ goTo }) => {
  const v = VENDOR;
  return (
    <div className="px-8 py-7 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-ink-500">
            <span className="font-mono">{v.code}</span>
            <span className="text-ink-300">·</span>
            <span>{v.category}</span>
          </div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink-900 mt-1">
            Good morning, {v.shortName}
          </h1>
          <div className="flex items-center gap-2 mt-2.5">
            <Badge tone="green" icon={<IconShieldCheck size={11} />}>Approved vendor</Badge>
            {v.msme && <Badge tone="violet" icon={<IconSparkles size={11} />}>MSME · 45-day SLA</Badge>}
            <Badge tone="neutral">GSTIN · <span className="font-mono ml-0.5">{v.gstin}</span></Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" leading={<IconDownload size={14} />}>Statement</Button>
          <Button variant="primary" size="md" leading={<IconPlus size={14} />}>Raise invoice</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Two columns: POs + Payments */}
      <div className="grid grid-cols-5 gap-5">
        <Card padded={false} className="col-span-3 overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink-900">Recent Purchase Orders</h3>
              <p className="text-[12px] text-ink-500 mt-0.5">Last 30 days · 14 open POs</p>
            </div>
            <button onClick={() => goTo("pogrn")} className="text-[12.5px] font-medium text-brand-700 inline-flex items-center gap-1 hover:underline">
              View all <IconArrowUpRight size={13} />
            </button>
          </div>
          <DataTable
            columns={[
              { key: "po",     label: "PO Number", mono: true, render: r => <span className="text-ink-900 font-mono text-[12.5px]">{r.po}</span> },
              { key: "date",   label: "Date", render: r => <span className="text-ink-600">{r.date}</span> },
              { key: "buyer",  label: "Buyer", render: r => <span className="text-ink-600">{r.buyer}</span> },
              { key: "amount", label: "Amount", align: "right", render: r => <span className="font-mono tnum text-[12.5px] text-ink-900">{fmtINR(r.amount)}</span> },
              { key: "status", label: "Status", render: r => <StatusChip status={r.status} /> },
            ]}
            rows={RECENT_POS}
          />
        </Card>

        <Card padded={false} className="col-span-2 overflow-hidden">
          <div className="px-5 pt-5 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-ink-900">Payment trend</h3>
              <p className="text-[12px] text-ink-500 mt-0.5">Net paid · last 8 weeks</p>
            </div>
            <Badge tone="green">+18.4%</Badge>
          </div>
          <div className="px-3">
            <Spark data={[210, 240, 195, 305, 280, 365, 410, 486]} />
          </div>
          <Divider />
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[12.5px] font-semibold text-ink-800 uppercase tracking-wide">Payment ledger</h4>
              <span className="text-[11px] text-ink-500">FY 26-27</span>
            </div>
            <div className="space-y-3">
              {RECENT_PAYMENTS.map(p => (
                <div key={p.id} className="grid grid-cols-[1fr_auto] gap-2 items-start">
                  <div>
                    <div className="font-mono text-[12px] text-ink-900">{p.invoice}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">UTR <span className="font-mono">{p.utr}</span> · {p.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[12.5px] tnum text-ink-900">{fmtINR(p.net)}</div>
                    <div className="text-[11px] text-ink-500">TDS {fmtINR(p.tds)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Reminders */}
      <Card className="!p-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 grid place-items-center rounded-md bg-amber-50 text-amber-700"><IconAlertTriangle size={16} /></span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-ink-900">2 GRNs awaiting your acknowledgement</div>
            <div className="text-[12px] text-ink-500">PO-26-04863 has 8 units flagged for rejection — surface finish out of spec. Confirm replacement schedule.</div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => goTo("pogrn")} trailing={<IconChevronRight size={13} />}>Review GRNs</Button>
        </div>
      </Card>
    </div>
  );
};

window.Dashboard = Dashboard;
