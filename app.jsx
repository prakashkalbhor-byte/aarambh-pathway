// Main app — sidebar nav + screen routing.

const NAV = [
  { id: "registration", label: "Registration",  hint: "Public form",     icon: <IconClipboardCheck size={18} />, badge: "Step 1/4" },
  { id: "dashboard",    label: "Vendor Dashboard", hint: "Logged-in vendor", icon: <IconLayoutDashboard size={18} /> },
  { id: "admin",        label: "Admin Panel",   hint: "Procurement",     icon: <IconShieldCheck size={18} />, badge: "6" },
  { id: "categories",   label: "Vendor Categories", hint: "Field master",  icon: <IconSettings size={18} />, badge: "★" },
  { id: "compliance",   label: "Compliance Validation", hint: "Bulk re-validate", icon: <IconShield size={18} />, badge: "NEW" },
  { id: "pogrn",        label: "PO & GRN",      hint: "Operations",      icon: <IconTruck size={18} /> },
  { id: "finance",      label: "Finance Admin", hint: "AP · 3-way match",icon: <IconCircleDollar size={18} />, badge: "AI" },
];

const Sidebar = ({ current, onSelect }) => (
  <aside className="w-[240px] shrink-0 border-r border-ink-200 bg-white flex flex-col" data-screen-label="Sidebar">
    {/* Logo */}
    <div className="px-4 py-4 border-b border-ink-200 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-ink-900 text-white grid place-items-center font-semibold text-[13px]">Aā</div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-ink-900 leading-tight">Aarambh</div>
        <div className="text-[10.5px] text-ink-500 leading-tight">Procurement Cloud</div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-2 py-3 space-y-0.5">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 px-2 py-1.5">Workspace</div>
      {NAV.map(n => {
        const active = n.id === current;
        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${active ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-100"}`}
          >
            <span className={active ? "text-white" : "text-ink-500"}>{n.icon}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-medium leading-tight">{n.label}</span>
              <span className={`block text-[10.5px] leading-tight mt-0.5 ${active ? "text-white/60" : "text-ink-400"}`}>{n.hint}</span>
            </span>
            {n.badge && (
              <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md ${active ? "bg-white/15 text-white" : "bg-ink-100 text-ink-600"}`}>{n.badge}</span>
            )}
          </button>
        );
      })}

      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 px-2 py-1.5 mt-4">More</div>
      {[
        { l: "Reports & analytics", i: <IconFileText size={18} /> },
        { l: "Help center",         i: <IconCircleHelp size={18} /> },
        { l: "Settings",            i: <IconSettings size={18} /> },
      ].map(item => (
        <button key={item.l} className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink-600 hover:bg-ink-100">
          <span className="text-ink-500">{item.i}</span>
          <span className="text-[13px] font-medium">{item.l}</span>
        </button>
      ))}
    </nav>

    {/* User card */}
    <div className="m-2 p-2.5 rounded-md ring-1 ring-inset ring-ink-200 bg-ink-50/60 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center text-[11.5px] font-semibold">SP</div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-ink-900 truncate">Suresh Pawar</div>
        <div className="text-[10.5px] text-ink-500 truncate">Tirupati Industrial</div>
      </div>
      <button className="text-ink-400 hover:text-ink-700"><IconLogout size={15} /></button>
    </div>
  </aside>
);

const Topbar = ({ current }) => {
  const meta = {
    registration: { crumb: "Vendor onboarding · Registration",     env: "Public · pre-login" },
    dashboard:    { crumb: "Vendor portal · Dashboard",            env: "Logged in as vendor" },
    admin:        { crumb: "Internal · Procurement · Approvals",   env: "Procurement staff" },
    categories:   { crumb: "Admin · Vendor categories · Field master", env: "Master setup" },
    compliance:   { crumb: "Finance · Vendor master · Compliance validation", env: "AP / Finance" },
    pogrn:        { crumb: "Vendor portal · PO & GRN tracker",     env: "Logged in as vendor" },
    finance:      { crumb: "Internal · Finance · Invoice automation", env: "Finance admin" },
  }[current];
  return (
    <header className="h-14 border-b border-ink-200 bg-white flex items-center px-6 gap-4">
      <div className="flex items-center gap-2 text-[12px] text-ink-500 min-w-0">
        <span className="truncate">{meta.crumb}</span>
        <span className="text-ink-300">·</span>
        <Badge tone="neutral">{meta.env}</Badge>
      </div>
      <div className="flex-1" />
      <div className="relative">
        <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          placeholder="Search vendors, POs, invoices…"
          className="h-9 pl-8 pr-3 text-[12.5px] rounded-md ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-brand-500 outline-none w-72 bg-ink-50/60"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-ink-400 font-mono px-1 py-0.5 rounded ring-1 ring-ink-200 bg-white">⌘K</span>
      </div>
      <button className="relative w-9 h-9 grid place-items-center rounded-md hover:bg-ink-100 text-ink-600">
        <IconBell size={16} />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
      </button>
      <div className="w-px h-6 bg-ink-200" />
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white grid place-items-center text-[11px] font-semibold">SP</div>
        <span className="text-[12.5px] font-medium text-ink-800">Suresh Pawar</span>
        <IconChevronDown size={14} className="text-ink-500" />
      </div>
    </header>
  );
};

const App = () => {
  const [screen, setScreen] = React.useState("dashboard");

  return (
    <div className="flex h-screen min-h-[680px] min-w-[1100px] overflow-hidden">
      <Sidebar current={screen} onSelect={setScreen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar current={screen} />
        <main className="flex-1 overflow-y-auto" data-screen-label={screen}>
          {screen === "registration" && <RegistrationRouter onGoDashboard={() => setScreen("dashboard")} />}
          {screen === "dashboard"    && <Dashboard goTo={setScreen} />}
          {screen === "admin"        && <Admin />}
          {screen === "categories"   && window.VendorCategories && <window.VendorCategories />}
          {screen === "compliance"   && window.VendorCompliance && <window.VendorCompliance />}
          {screen === "pogrn"        && <POGRN />}
          {screen === "finance"      && <Finance />}
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
