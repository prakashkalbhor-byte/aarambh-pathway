// Registration Wizard — public-facing, 4 steps with simulated verifications.

const StepHeader = ({ step, total, title, subtitle }) => (
  <div className="px-8 pt-8 pb-6 border-b border-ink-200">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 text-[12px] text-ink-500">
        <span className="font-mono">STEP {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="text-ink-300">·</span>
        <span>Vendor onboarding</span>
      </div>
      <button className="text-[12px] text-ink-500 hover:text-ink-800 inline-flex items-center gap-1">
        <IconClock size={13} /> Save & continue later
      </button>
    </div>
    <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">{title}</h1>
    {subtitle && <p className="text-[13.5px] text-ink-500 mt-1.5 max-w-2xl">{subtitle}</p>}
  </div>
);

const ProgressBar = ({ step, total, steps }) => (
  <div className="bg-white">
    <div className="px-8 py-4 flex items-center gap-2">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < step;
        const current = n === step;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold ring-1 ${
                done ? "bg-emerald-600 text-white ring-emerald-600" :
                current ? "bg-ink-900 text-white ring-ink-900" :
                "bg-white text-ink-400 ring-ink-200"
              }`}>
                {done ? <IconCheck size={13} /> : n}
              </span>
              <span className={`text-[12.5px] font-medium truncate ${current ? "text-ink-900" : done ? "text-ink-700" : "text-ink-400"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px ${n < step ? "bg-emerald-300" : "bg-ink-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
    <div className="h-px bg-ink-200" />
  </div>
);

const VerifyButton = ({ state, onClick, label = "Verify" }) => {
  if (state === "verifying") return (
    <Button variant="secondary" size="sm" disabled className="min-w-[112px]">
      Verifying <Dots />
    </Button>
  );
  if (state === "ok") return (
    <Button variant="secondary" size="sm" disabled className="min-w-[112px] !ring-emerald-200 !text-emerald-700 !bg-emerald-50">
      <IconCheck size={13} /> Verified
    </Button>
  );
  if (state === "fail") return (
    <Button variant="secondary" size="sm" onClick={onClick} className="min-w-[112px] !ring-rose-200 !text-rose-700 !bg-rose-50">
      <IconRefresh size={13} /> Retry
    </Button>
  );
  return <Button variant="secondary" size="sm" onClick={onClick} className="min-w-[112px]">{label}</Button>;
};

const Step1 = ({ values, setValues }) => {
  const [state, setState] = React.useState(values.gstinVerified ? "ok" : "idle");
  const [result, setResult] = React.useState(values.gstinResult || null);

  const verify = () => {
    setState("verifying");
    setTimeout(() => {
      const data = {
        gstin: values.gstin || "27ABCFT1234R1ZP",
        legalName: "Tirupati Industrial Components Pvt. Ltd.",
        tradeName: "Tirupati Industrial",
        status: "Active",
        type: "Private Limited Company",
        state: "Maharashtra",
        registeredOn: "12 Aug 2017",
        lastFiled: "GSTR-3B · Mar 2026",
      };
      setResult(data);
      setState("ok");
      setValues(v => ({ ...v, gstinVerified: true, gstinResult: data }));
    }, 1300);
  };

  return (
    <div className="px-8 py-7 space-y-6 max-w-3xl">
      <Card>
        <SectionTitle hint="We pull legal name, status and registered address directly from the GST portal.">Company GSTIN</SectionTitle>
        <div className="flex gap-3 items-end">
          <Field label="GSTIN" className="flex-1">
            <Input
              mono
              placeholder="22AAAAA0000A1Z5"
              maxLength={15}
              value={values.gstin || ""}
              onChange={e => setValues(v => ({ ...v, gstin: e.target.value.toUpperCase(), gstinVerified: false }))}
            />
          </Field>
          <div className="pb-[2px]">
            <Button variant="primary" size="md" onClick={verify} disabled={state === "verifying" || state === "ok"}>
              {state === "verifying" ? <>Verifying <Dots /></> : state === "ok" ? <><IconCheck size={14} /> Verified</> : "Verify GSTIN"}
            </Button>
          </div>
        </div>
        <p className="text-[11.5px] text-ink-500 mt-2 inline-flex items-center gap-1">
          <IconInfo size={12} /> Pre-fills legal name, trade name, state and filing status from the government API.
        </p>
      </Card>

      {result && (
        <Card className="!p-0 overflow-hidden ring-emerald-200/70 bg-emerald-50/30">
          <div className="px-5 py-3 flex items-center justify-between bg-emerald-50 border-b border-emerald-200/70">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-600 text-white grid place-items-center"><IconCheck size={14} /></span>
              <div>
                <div className="text-[12.5px] font-semibold text-emerald-900">GSTIN found · Active</div>
                <div className="text-[11px] text-emerald-700/80 font-mono">{result.gstin}</div>
              </div>
            </div>
            <Badge tone="green" icon={<IconShield size={11} />}>Govt. verified</Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-8 px-5 py-4">
            <KV k="Legal name" v={result.legalName} />
            <KV k="Trade name" v={result.tradeName} />
            <KV k="Constitution" v={result.type} />
            <KV k="State" v={result.state} />
            <KV k="Registered on" v={result.registeredOn} />
            <KV k="Last return filed" v={<span className="font-mono text-[12px]">{result.lastFiled}</span>} />
          </div>
        </Card>
      )}
    </div>
  );
};

const VerifyField = ({ label, value, onChange, placeholder, hint, maxLength, status, onVerify }) => (
  <Card padded={false} className="p-4">
    <div className="flex items-end gap-3">
      <Field label={label} hint={hint} className="flex-1">
        <Input mono placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} />
      </Field>
      <div className="pb-[2px]"><VerifyButton state={status} onClick={onVerify} /></div>
    </div>
    {status === "ok" && (
      <div className="mt-2.5 inline-flex items-center gap-2">
        <Badge tone="green" icon={<IconCheck size={11} />}>Active</Badge>
        <span className="text-[11.5px] text-ink-500">Verified against govt. database</span>
      </div>
    )}
    {status === "fail" && (
      <div className="mt-2.5 inline-flex items-center gap-2">
        <Badge tone="red" icon={<IconX size={11} />}>Not Found</Badge>
        <span className="text-[11.5px] text-rose-700">No record returned. Check the number and retry.</span>
      </div>
    )}
  </Card>
);

const Step2 = ({ values, setValues }) => {
  const setStatus = (key, status) => setValues(v => ({ ...v, [key + "Status"]: status }));
  const verify = (key, fakeResult = "ok") => {
    setStatus(key, "verifying");
    setTimeout(() => setStatus(key, fakeResult), 900 + Math.random() * 600);
  };

  return (
    <div className="px-8 py-7 space-y-4 max-w-3xl">
      <Card padded={false} className="p-5">
        <SectionTitle hint="Used for TDS, MSME benefits and statutory filings. Each ID is checked live against the issuing authority.">
          Tax & enterprise identifiers
        </SectionTitle>
        <div className="space-y-3">
          <VerifyField
            label="PAN" placeholder="ABCFT1234R" maxLength={10}
            value={values.pan || ""} onChange={e => { setValues(v => ({ ...v, pan: e.target.value.toUpperCase() })); setStatus("pan", "idle"); }}
            status={values.panStatus || "idle"}
            onVerify={() => verify("pan", "ok")}
            hint="10-character permanent account number"
          />
          <VerifyField
            label="TAN" placeholder="PNET12345C" maxLength={10}
            value={values.tan || ""} onChange={e => { setValues(v => ({ ...v, tan: e.target.value.toUpperCase() })); setStatus("tan", "idle"); }}
            status={values.tanStatus || "idle"}
            onVerify={() => verify("tan", "ok")}
            hint="Required if you deduct tax at source"
          />
          <VerifyField
            label="Udyam Registration (optional)" placeholder="UDYAM-MH-26-0091812" maxLength={24}
            value={values.udyam || ""} onChange={e => { setValues(v => ({ ...v, udyam: e.target.value.toUpperCase() })); setStatus("udyam", "idle"); }}
            status={values.udyamStatus || "idle"}
            onVerify={() => verify("udyam", "ok")}
            hint="Unlocks MSME payment benefits under MSMED Act"
          />
        </div>
      </Card>
    </div>
  );
};

const Step3 = ({ values, setValues }) => {
  const verify = () => {
    setValues(v => ({ ...v, bankStatus: "verifying" }));
    setTimeout(() => {
      setValues(v => ({
        ...v,
        bankStatus: "ok",
        bankResult: {
          beneficiary: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",
          matched: true,
          method: "Penny-drop · ₹1.00 credited",
          ifscDetails: { bank: "HDFC Bank", branch: "Pune — Hadapsar", micr: "411240091" },
          ts: "10 May 2026 · 11:42 IST",
        },
      }));
    }, 1500);
  };
  const r = values.bankResult;
  const status = values.bankStatus || "idle";

  return (
    <div className="px-8 py-7 space-y-5 max-w-3xl">
      <Card>
        <SectionTitle hint="We send ₹1 to confirm the account exists and the name matches. The amount is auto-refunded.">Bank account for payments</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Account number">
            <Input mono placeholder="0089127447712" value={values.accNo || ""} onChange={e => setValues(v => ({ ...v, accNo: e.target.value, bankStatus: "idle" }))} />
          </Field>
          <Field label="Re-enter account number">
            <Input mono placeholder="0089127447712" value={values.accNo2 || ""} onChange={e => setValues(v => ({ ...v, accNo2: e.target.value, bankStatus: "idle" }))} />
          </Field>
          <Field label="IFSC">
            <Input mono placeholder="HDFC0000891" maxLength={11} value={values.ifsc || ""} onChange={e => setValues(v => ({ ...v, ifsc: e.target.value.toUpperCase(), bankStatus: "idle" }))} />
          </Field>
          <Field label="Account holder name (as per bank)">
            <Input placeholder="Tirupati Industrial Components Pvt Ltd" value={values.accName || ""} onChange={e => setValues(v => ({ ...v, accName: e.target.value, bankStatus: "idle" }))} />
          </Field>
        </div>
        <div className="mt-4">
          <Button variant="primary" size="md" onClick={verify} disabled={status === "verifying" || status === "ok"}>
            {status === "verifying" ? <>Sending penny-drop <Dots /></> : status === "ok" ? <><IconCheck size={14} /> Account verified</> : "Verify Account"}
          </Button>
        </div>
      </Card>

      {r && (
        <Card className="!p-0 overflow-hidden ring-emerald-200/70">
          <div className="px-5 py-3 flex items-center justify-between bg-emerald-50 border-b border-emerald-200/70">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-600 text-white grid place-items-center"><IconBank size={14} /></span>
              <div>
                <div className="text-[12.5px] font-semibold text-emerald-900">Penny-drop successful · Name matched ✓</div>
                <div className="text-[11px] text-emerald-700/80">{r.method} at {r.ts}</div>
              </div>
            </div>
            <Badge tone="green">Match confidence 98%</Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-8 px-5 py-4">
            <KV k="Beneficiary returned by bank" v={<span className="font-mono text-[12px]">{r.beneficiary}</span>} />
            <KV k="Bank" v={r.ifscDetails.bank} />
            <KV k="Branch" v={r.ifscDetails.branch} />
            <KV k="MICR" v={<span className="font-mono text-[12px]">{r.ifscDetails.micr}</span>} />
          </div>
        </Card>
      )}
    </div>
  );
};

const DocRow = ({ doc, onUpload }) => {
  const ref = React.useRef(null);
  return (
    <div className="py-3.5 border-b border-ink-200/60 last:border-0">
      <div className="flex items-center gap-4">
        <div className={`w-9 h-9 grid place-items-center rounded-md ${doc.uploaded ? "bg-emerald-50 text-emerald-700" : "bg-ink-100 text-ink-500"}`}>
          <IconFileText size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-medium text-ink-900">{doc.label}</div>
          <div className="text-[11.5px] text-ink-500">
            {doc.uploaded ? `${doc.filename} · ${doc.size}` : `Accepted: ${doc.accept} · Max ${doc.max}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {doc.ocrStatus === "reading" && (
            <Badge tone="blue" icon={<IconFileText size={11} />}>Reading <Dots /></Badge>
          )}
          {doc.ocrStatus === "matched" && (
            <Badge tone="green" icon={<IconCheck size={11} />}>OCR matched</Badge>
          )}
          {doc.ocrStatus === "review" && (
            <Badge tone="amber" icon={<IconAlertTriangle size={11} />}>OCR — review</Badge>
          )}
          {doc.uploaded ? <Badge tone="green" icon={<IconCheck size={11} />}>Uploaded</Badge> :
            doc.required ? <Badge tone="amber">Required</Badge> :
            <Badge tone="neutral">Optional</Badge>}
        </div>
        <input ref={ref} type="file" hidden onChange={e => onUpload(doc.id, e.target.files?.[0])} />
        <Button variant="secondary" size="sm" onClick={() => ref.current?.click()} leading={<IconUpload size={13} />}>
          {doc.uploaded ? "Replace" : "Upload"}
        </Button>
      </div>
      {doc.ocrFields && doc.ocrStatus !== "reading" && (
        <div className="mt-3 ml-13 pl-3 ring-1 ring-inset ring-ink-200 rounded-md bg-ink-50/40 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-ink-200/70 flex items-center justify-between bg-white">
            <span className="text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold">OCR Reader · cross-checked with {doc.source}</span>
            <span className="text-[10.5px] text-ink-500 font-mono">{doc.confidence}% confidence</span>
          </div>
          <table className="w-full text-[11.5px]">
            <tbody>
              {doc.ocrFields.map((f, i) => (
                <tr key={i} className="border-b border-ink-200/60 last:border-0">
                  <td className="px-3 py-1.5 text-ink-500 w-32">{f.label}</td>
                  <td className="px-3 py-1.5 font-mono text-ink-900 truncate">{f.extracted}</td>
                  <td className="px-3 py-1.5 text-right">
                    {f.match
                      ? <Badge tone="green" icon={<IconCheck size={10} />}>Match</Badge>
                      : <Badge tone="amber" icon={<IconAlertTriangle size={10} />}>Review</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Synthetic OCR result generator per document type, against current registration values
const ocrFor = (id, v) => {
  if (id === "gst") return {
    source: "GST portal · gst.gov.in", confidence: 97,
    fields: [
      { label: "GSTIN",       extracted: v.gstin || "—",                                portal: v.gstin, match: true },
      { label: "Legal name",  extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",      match: true },
      { label: "State",       extracted: "Maharashtra",                                  match: true },
    ],
  };
  if (id === "pan") return {
    source: "Income Tax · incometax.gov.in", confidence: 95,
    fields: [
      { label: "PAN",         extracted: v.pan || "—", match: true },
      { label: "Name",        extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD", match: true },
    ],
  };
  if (id === "cheque") return {
    source: "Bank penny-drop · HDFC", confidence: 92,
    fields: [
      { label: "Account no.", extracted: v.accNo || "—", match: true },
      { label: "IFSC",        extracted: v.ifsc || "—", match: true },
      { label: "Beneficiary", extracted: "Tirupati Industrial Components Pvt Ltd", match: true },
    ],
  };
  return null;
};

const Step4 = ({ values, setValues }) => {
  const docs = values.docs || [
    { id: "gst",    label: "GST Registration Certificate", required: true,  accept: "PDF", max: "5 MB" },
    { id: "pan",    label: "PAN Card Copy",                required: true,  accept: "PDF / JPG", max: "2 MB" },
    { id: "cheque", label: "Cancelled Cheque",             required: true,  accept: "JPG / PNG", max: "2 MB" },
    { id: "broch",  label: "Company Brochure / Capability Deck", required: false, accept: "PDF", max: "10 MB" },
  ];
  const onUpload = (id, file) => {
    if (!file) return;
    const updated = docs.map(d => d.id === id ? {
      ...d, uploaded: true, filename: file.name,
      size: (file.size/1024).toFixed(0) + " KB",
      ocrStatus: "reading",
    } : d);
    setValues(v => ({ ...v, docs: updated }));
    // Simulate OCR completion
    setTimeout(() => {
      setValues(v => {
        const ocr = ocrFor(id, v);
        return {
          ...v,
          docs: (v.docs || []).map(d => d.id === id ? {
            ...d,
            ocrStatus: ocr && ocr.fields.every(f => f.match) ? "matched" : "review",
            ocrFields: ocr?.fields,
            source: ocr?.source,
            confidence: ocr?.confidence,
          } : d),
        };
      });
    }, 1400);
  };

  const allRequired = docs.filter(d => d.required).every(d => d.uploaded);

  return (
    <div className="px-8 py-7 space-y-5 max-w-3xl">
      <Card>
        <SectionTitle hint="Each upload is processed by our OCR reader and cross-checked against the GST, PAN and bank records you provided in earlier steps.">Document checklist</SectionTitle>
        <div className="-mt-1">
          {docs.map(d => <DocRow key={d.id} doc={d} onUpload={onUpload} />)}
        </div>
      </Card>

      <div className={`rounded-lg px-4 py-3 flex items-start gap-3 ring-1 ring-inset ${allRequired ? "bg-emerald-50 ring-emerald-200 text-emerald-900" : "bg-amber-50 ring-amber-200 text-amber-900"}`}>
        {allRequired ? <IconCheckCircle size={18} className="mt-0.5" /> : <IconAlertTriangle size={18} className="mt-0.5" />}
        <div className="text-[12.5px]">
          {allRequired
            ? <>All required documents uploaded. You can submit your application for review.</>
            : <>Upload all required documents to submit. Optional items can be added later from your vendor dashboard.</>}
        </div>
      </div>
    </div>
  );
};

const Success = ({ values, onReset, onGoDashboard }) => (
  <div className="px-8 py-12 flex flex-col items-center text-center max-w-2xl mx-auto">
    <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white grid place-items-center mb-5 shadow-pop">
      <IconCheck size={32} />
    </div>
    <h1 className="text-[28px] font-semibold tracking-tight text-ink-900">Application submitted</h1>
    <p className="text-[14px] text-ink-500 mt-2 max-w-md">
      Thanks. Our procurement team will review your details and reach out within 2 business days.
      You'll receive status updates on the email used to register.
    </p>
    <Card className="mt-7 w-full text-left">
      <div className="grid grid-cols-2 gap-x-8">
        <KV k="Application ID" v={<span className="font-mono text-[12px]">APP-26-005-{Math.floor(1000 + Math.random()*8999)}</span>} />
        <KV k="Submitted at" v="10 May 2026, 11:46 IST" />
        <KV k="Legal name" v={values.gstinResult?.legalName || "—"} />
        <KV k="GSTIN" v={<span className="font-mono text-[12px]">{values.gstin || "—"}</span>} />
        <KV k="Expected SLA" v="2 business days" />
        <KV k="Assigned to" v="Procurement — Indirect" />
      </div>
    </Card>
    <div className="flex gap-3 mt-7">
      <Button variant="secondary" onClick={onReset} leading={<IconRefresh size={14} />}>Submit another</Button>
      <Button variant="primary" onClick={onGoDashboard} trailing={<IconArrowUpRight size={14} />}>Go to vendor dashboard</Button>
    </div>
  </div>
);

const Registration = ({ onGoDashboard, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [values, setValues] = React.useState({
    gstin: "27ABCFT1234R1ZP",
    pan: "ABCFT1234R", tan: "PNET12345C", udyam: "UDYAM-MH-26-0091812",
    accNo: "0089127447712", accNo2: "0089127447712", ifsc: "HDFC0000891",
    accName: "Tirupati Industrial Components Pvt Ltd",
  });

  const steps = ["GSTIN", "Tax IDs", "Bank account", "Documents"];
  const titles = [
    { t: "Let's verify your business",        s: "Enter your GSTIN. We'll pull your legal name and status directly from the GST portal." },
    { t: "Tax & enterprise identifiers",      s: "PAN, TAN and Udyam — each is verified live against the issuing authority." },
    { t: "Bank account for vendor payments",  s: "We use penny-drop to confirm the account exists and that the name matches your business." },
    { t: "Upload your supporting documents",  s: "Final step. All required documents must be uploaded before submission." },
  ];

  const canAdvance = () => {
    if (step === 1) return !!values.gstinVerified;
    if (step === 2) return values.panStatus === "ok" && values.tanStatus === "ok";
    if (step === 3) return values.bankStatus === "ok";
    if (step === 4) {
      const docs = values.docs || [];
      const required = ["gst","pan","cheque"];
      return required.every(r => docs.find(d => d.id === r)?.uploaded);
    }
    return false;
  };

  if (submitted) return <Success values={values} onReset={() => { setSubmitted(false); setStep(1); }} onGoDashboard={onGoDashboard} />;

  const meta = titles[step - 1];

  return (
    <div className="bg-ink-50 min-h-full">
      <ProgressBar step={step} total={4} steps={steps} />
      <div className="max-w-5xl mx-auto py-6 px-2">
        <Card padded={false} className="overflow-hidden">
          <StepHeader step={step} total={4} title={meta.t} subtitle={meta.s} />
          {step === 1 && <Step1 values={values} setValues={setValues} />}
          {step === 2 && <Step2 values={values} setValues={setValues} />}
          {step === 3 && <Step3 values={values} setValues={setValues} />}
          {step === 4 && <Step4 values={values} setValues={setValues} />}
          <div className="px-8 py-4 border-t border-ink-200 bg-ink-50/40 flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={() => step === 1 ? (onBack && onBack()) : setStep(s => s - 1)} leading={<IconChevronLeft size={14} />}>{step === 1 && onBack ? "Change vendor type" : "Back"}</Button>
            <div className="flex items-center gap-3 text-[12px] text-ink-500">
              <span>Need help? <a className="text-brand-700 hover:underline">Talk to a specialist</a></span>
              {step < 4
                ? <Button variant="primary" size="md" onClick={() => setStep(s => s + 1)} disabled={!canAdvance()} trailing={<IconChevronRight size={14} />}>Continue</Button>
                : <Button variant="success" size="md" onClick={() => setSubmitted(true)} disabled={!canAdvance()} trailing={<IconCheck size={14} />}>Submit application</Button>
              }
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

window.Registration = Registration;
