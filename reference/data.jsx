// Mock data for the entire portal.

const VENDOR = {
  name: "Tirupati Industrial Components Pvt. Ltd.",
  shortName: "Tirupati Industrial",
  code: "VND-2026-0418",
  msme: true,
  gstin: "27ABCFT1234R1ZP",
  state: "Maharashtra",
  city: "Pune",
  category: "Mechanical Components — Tier 2",
};

const STATS = [
  { id: "po",  label: "Open Purchase Orders", value: "14", delta: "+3 this week", icon: "package", tone: "blue" },
  { id: "grn", label: "Pending GRNs",         value: "6",  delta: "2 overdue",   icon: "truck",   tone: "amber" },
  { id: "inv", label: "Invoices Awaiting Payment", value: "9", delta: fmtINR(2843500, { compact: true }), icon: "receipt", tone: "violet" },
  { id: "pay", label: "Last Payment Received",     value: fmtINR(486200), delta: "UTR · SBIN0026781452 · Apr 28", icon: "dollar", tone: "green" },
];

const RECENT_POS = [
  { id: "po1", po: "PO-26-04881", date: "08 May 2026", buyer: "Aarambh — Plant 2",  amount: 285400, status: "Open" },
  { id: "po2", po: "PO-26-04863", date: "06 May 2026", buyer: "Aarambh — Plant 1",  amount: 1124000, status: "Partial" },
  { id: "po3", po: "PO-26-04812", date: "02 May 2026", buyer: "Aarambh — Plant 2",  amount: 67800,  status: "Delivered" },
  { id: "po4", po: "PO-26-04790", date: "29 Apr 2026", buyer: "Aarambh — R&D",      amount: 412300, status: "In Transit" },
  { id: "po5", po: "PO-26-04754", date: "24 Apr 2026", buyer: "Aarambh — Plant 1",  amount: 89400,  status: "Completed" },
];

const RECENT_PAYMENTS = [
  { id: "p1", invoice: "INV/26-27/0091", amount: 486200, tds: 9724, net: 476476, utr: "SBIN0026781452", date: "28 Apr 2026" },
  { id: "p2", invoice: "INV/26-27/0088", amount: 312500, tds: 6250, net: 306250, utr: "SBIN0026655912", date: "22 Apr 2026" },
  { id: "p3", invoice: "INV/26-27/0079", amount: 187400, tds: 3748, net: 183652, utr: "SBIN0026581200", date: "16 Apr 2026" },
  { id: "p4", invoice: "INV/26-27/0072", amount: 624800, tds: 12496, net: 612304, utr: "SBIN0026494037", date: "10 Apr 2026" },
];

// All POs for tracker (with line items)
const ALL_POS = [
  {
    id: "po1", po: "PO-26-04881", date: "08 May 2026", delivery: "18 May 2026", buyer: "Plant 2",
    status: "Open",
    items: [
      { sku: "MC-7740-S", desc: "Hardened pinion shaft, 25mm",   qty: 240, uom: "EA", rate: 845,  amount: 202800 },
      { sku: "MC-2210-B", desc: "Cast iron bracket, R-series",   qty: 80,  uom: "EA", rate: 1032, amount: 82560 },
    ],
  },
  {
    id: "po2", po: "PO-26-04863", date: "06 May 2026", delivery: "14 May 2026", buyer: "Plant 1",
    status: "Partial",
    items: [
      { sku: "MC-9012-A", desc: "Spur gear assembly, 110T",      qty: 60,  uom: "EA", rate: 14_200, amount: 852000 },
      { sku: "MC-9015-C", desc: "Drive coupling, 32mm",          qty: 200, uom: "EA", rate: 1360,  amount: 272000 },
    ],
  },
  {
    id: "po3", po: "PO-26-04812", date: "02 May 2026", delivery: "09 May 2026", buyer: "Plant 2",
    status: "Delivered",
    items: [
      { sku: "MC-3340-X", desc: "Flange, mild steel, 6\" dia",   qty: 120, uom: "EA", rate: 565,   amount: 67800 },
    ],
  },
  {
    id: "po4", po: "PO-26-04790", date: "29 Apr 2026", delivery: "12 May 2026", buyer: "R&D",
    status: "In Transit",
    items: [
      { sku: "MC-RND-001",desc: "Prototype mount bracket, Al-6061", qty: 30, uom: "EA", rate: 4150, amount: 124500 },
      { sku: "MC-RND-014",desc: "Test rig adapter plate",            qty: 15, uom: "EA", rate: 19180, amount: 287700 },
    ],
  },
  {
    id: "po5", po: "PO-26-04754", date: "24 Apr 2026", delivery: "30 Apr 2026", buyer: "Plant 1",
    status: "Completed",
    items: [
      { sku: "MC-1102-D", desc: "Bushing, sintered bronze",      qty: 400, uom: "EA", rate: 223,  amount: 89200 },
    ],
  },
];

const GRNS = [
  { id: "g1", grn: "GRN-26-02211", po: "PO-26-04863", received: "10 May 2026", item: "Spur gear assembly, 110T",  ordered: 60, received_qty: 40, accepted: 38, rejected: 2,  reason: "Surface finish out of spec", status: "Partial" },
  { id: "g2", grn: "GRN-26-02198", po: "PO-26-04812", received: "08 May 2026", item: "Flange, mild steel, 6\" dia", ordered: 120, received_qty: 120, accepted: 120, rejected: 0,  reason: "—", status: "Accepted" },
  { id: "g3", grn: "GRN-26-02174", po: "PO-26-04863", received: "07 May 2026", item: "Drive coupling, 32mm",      ordered: 200, received_qty: 200, accepted: 192, rejected: 8,  reason: "Bore tolerance variance", status: "Partial" },
  { id: "g4", grn: "GRN-26-02151", po: "PO-26-04754", received: "29 Apr 2026", item: "Bushing, sintered bronze",  ordered: 400, received_qty: 400, accepted: 400, rejected: 0,  reason: "—", status: "Accepted" },
  { id: "g5", grn: "GRN-26-02144", po: "PO-26-04790", received: "—",          item: "Test rig adapter plate",    ordered: 15,  received_qty: 0,   accepted: 0,   rejected: 0,  reason: "—", status: "Awaiting GRN" },
];

// Admin queue — vendors awaiting review
const VENDOR_QUEUE = [
  {
    id: "v1",
    name: "Tirupati Industrial Components Pvt. Ltd.",
    contact: "Mr. Suresh Pawar",
    submitted: "10 May 2026",
    gstin: "27ABCFT1234R1ZP",
    pan: "ABCFT1234R", tan: "PNET12345C", udyam: "UDYAM-MH-26-0091812",
    msme: true,
    risk: 18,
    status: "Under Review",
    state: "Maharashtra",
    category: "Mechanical Components",
    bank: { acc: "0089127447712", ifsc: "HDFC0000891", name: "Tirupati Industrial Components Pvt Ltd" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Mar 2026 (GSTR-3B)" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "412 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "156 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.2 MB", ok: true },
      { name: "Product Brochure.pdf",size: "3.8 MB", ok: true },
    ],
    ocr: {
      confidence: 97,
      processedAt: "10 May 2026 · 11:46 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "27ABCFT1234R1ZP",                       portal: "27ABCFT1234R1ZP",                       match: true },
            { label: "Legal name",   extracted: "Tirupati Industrial Components Pvt Ltd", portal: "Tirupati Industrial Components Pvt Ltd", match: true },
            { label: "Trade name",   extracted: "Tirupati Industrial",                   portal: "Tirupati Industrial",                   match: true },
            { label: "Registered on",extracted: "12-08-2017",                            portal: "12 Aug 2017",                           match: true },
            { label: "State",        extracted: "Maharashtra",                           portal: "Maharashtra",                           match: true },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "ABCFT1234R",                            portal: "ABCFT1234R",                            match: true },
            { label: "Name",         extracted: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",portal: "Tirupati Industrial Components Pvt Ltd", match: true },
            { label: "Date of incorp.", extracted: "12-08-2017",                          portal: "12-08-2017",                            match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · HDFC",
          fields: [
            { label: "Account no.",  extracted: "0089127447712",                         portal: "0089127447712",                         match: true },
            { label: "IFSC",         extracted: "HDFC0000891",                           portal: "HDFC0000891",                           match: true },
            { label: "Beneficiary",  extracted: "Tirupati Industrial Components Pvt Ltd",portal: "TIRUPATI INDUSTRIAL COMPONENTS PVT LTD",match: true },
            { label: "MICR",         extracted: "411240091",                             portal: "411240091",                             match: true },
          ],
        },
      ],
    },
  },
  {
    id: "v2",
    name: "Saraswati Polymers LLP",
    contact: "Ms. Anita Deshmukh",
    submitted: "09 May 2026",
    gstin: "29AAFCS9012R1ZK",
    pan: "AAFCS9012R", tan: "BLRS22341E", udyam: "UDYAM-KA-04-0017822",
    msme: true,
    risk: 42,
    status: "Pending",
    state: "Karnataka",
    category: "Polymers & Plastics",
    bank: { acc: "5512004482210", ifsc: "ICIC0005512", name: "Saraswati Polymers" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: false, label: "Bank — Name mismatch", detail: "Penny-drop returned 'Saraswathi Polymers LLP'" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "388 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "172 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "—",      ok: false },
      { name: "Product Brochure.pdf",size: "2.1 MB", ok: true },
    ],
    ocr: {
      confidence: 81,
      processedAt: "09 May 2026 · 16:08 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "29AAFCS9012R1ZK",     portal: "29AAFCS9012R1ZK",      match: true },
            { label: "Legal name",   extracted: "Saraswathi Polymers LLP", portal: "Saraswati Polymers LLP", match: false,
              note: "Spelling differs — 'Saraswathi' vs 'Saraswati'. Likely transliteration variant." },
            { label: "State",        extracted: "Karnataka",            portal: "Karnataka",             match: true },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "AAFCS9012R",          portal: "AAFCS9012R",            match: true },
            { label: "Name",         extracted: "SARASWATI POLYMERS LLP", portal: "Saraswati Polymers LLP", match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · ICICI",
          fields: [
            { label: "Cheque image", extracted: "Not uploaded",         portal: "—",                     match: false,
              note: "Required document missing — cannot OCR." },
          ],
        },
      ],
    },
  },
  {
    id: "v3",
    name: "Karthikeya Engineering Works",
    contact: "Mr. R. Karthikeya",
    submitted: "08 May 2026",
    gstin: "33AAACK4421B1Z2",
    pan: "AAACK4421B", tan: "—", udyam: "—",
    msme: false,
    risk: 78,
    status: "Pending",
    state: "Tamil Nadu",
    category: "Fabrication",
    bank: { acc: "30021445119", ifsc: "SBIN0001120", name: "Karthikeya Engg" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Last filed Dec 2025 — 4 months overdue" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: false, label: "TAN — Not provided", detail: "Required for vendors >₹50L turnover" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "289 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "144 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "820 KB", ok: true },
      { name: "Product Brochure.pdf",size: "—",      ok: false },
    ],
    ocr: {
      confidence: 64,
      processedAt: "08 May 2026 · 14:22 IST",
      docs: [
        {
          doc: "GST Certificate.pdf",
          source: "GST portal · gst.gov.in",
          fields: [
            { label: "GSTIN",        extracted: "33AAACK4421B1Z2",         portal: "33AAACK4421B1Z2",          match: true },
            { label: "Legal name",   extracted: "Karthikeya Engineering Works", portal: "Karthikeya Engineering Works", match: true },
            { label: "Last return",  extracted: "GSTR-3B · Dec 2025",       portal: "GSTR-3B · Dec 2025",       match: true,
              note: "Latest return is 4 months overdue — flag for compliance review." },
          ],
        },
        {
          doc: "PAN Copy.pdf",
          source: "Income Tax · incometax.gov.in",
          fields: [
            { label: "PAN",          extracted: "AAACK4421B",          portal: "AAACK4421B",                match: true },
            { label: "Name",         extracted: "KARTHIKEYA ENGINEERING WORKS", portal: "Karthikeya Engineering Works", match: true },
          ],
        },
        {
          doc: "Cancelled Cheque.jpg",
          source: "Bank penny-drop · SBI",
          fields: [
            { label: "Account no.",  extracted: "30021445119",         portal: "30021445119",               match: true },
            { label: "IFSC",         extracted: "SBIN0001120",         portal: "SBIN0001120",               match: true },
            { label: "Beneficiary",  extracted: "Karthikeya Engg",     portal: "Karthikeya Engineering Works", match: false,
              note: "Cheque shows abbreviated name. Acceptable if PAN/GST match." },
          ],
        },
      ],
    },
  },
  {
    id: "v4",
    name: "Vajra Precision Tools Pvt. Ltd.",
    contact: "Mr. Harish Iyer",
    submitted: "07 May 2026",
    gstin: "27AAGCV0091L1ZN",
    pan: "AAGCV0091L", tan: "PNET99811K", udyam: "UDYAM-MH-26-0044912",
    msme: true,
    risk: 12,
    status: "Approved",
    state: "Maharashtra",
    category: "Precision Tooling",
    bank: { acc: "9971124488", ifsc: "AXIS0000997", name: "Vajra Precision Tools Pvt Ltd" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "401 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "168 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.1 MB", ok: true },
      { name: "Product Brochure.pdf",size: "5.4 MB", ok: true },
    ],
    ocr: {
      confidence: 99,
      processedAt: "07 May 2026 · 09:18 IST",
      docs: [
        { doc: "GST Certificate.pdf", source: "GST portal · gst.gov.in", fields: [
          { label: "GSTIN",      extracted: "27AAGCV0091L1ZN", portal: "27AAGCV0091L1ZN", match: true },
          { label: "Legal name", extracted: "Vajra Precision Tools Pvt Ltd", portal: "Vajra Precision Tools Pvt Ltd", match: true },
          { label: "State",      extracted: "Maharashtra", portal: "Maharashtra", match: true },
        ]},
        { doc: "PAN Copy.pdf", source: "Income Tax · incometax.gov.in", fields: [
          { label: "PAN",  extracted: "AAGCV0091L", portal: "AAGCV0091L", match: true },
          { label: "Name", extracted: "VAJRA PRECISION TOOLS PVT LTD", portal: "Vajra Precision Tools Pvt Ltd", match: true },
        ]},
        { doc: "Cancelled Cheque.jpg", source: "Bank penny-drop · Axis", fields: [
          { label: "Account no.", extracted: "9971124488", portal: "9971124488", match: true },
          { label: "IFSC",        extracted: "AXIS0000997", portal: "AXIS0000997", match: true },
          { label: "Beneficiary", extracted: "Vajra Precision Tools Pvt Ltd", portal: "Vajra Precision Tools Pvt Ltd", match: true },
        ]},
      ],
    },
  },
  {
    id: "v5",
    name: "Bhargav Logistics & Allied",
    contact: "Mr. V. Bhargav",
    submitted: "06 May 2026",
    gstin: "07AABCB9981G1ZQ",
    pan: "AABCB9981G", tan: "DELB44012F", udyam: "—",
    msme: false,
    risk: 56,
    status: "Query Raised",
    state: "Delhi",
    category: "Logistics",
    bank: { acc: "115522003040", ifsc: "KKBK0001155", name: "Bhargav Logistics" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "356 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "159 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.0 MB", ok: true },
      { name: "Product Brochure.pdf",size: "—",      ok: false },
    ],
  },
  {
    id: "v6",
    name: "Akshara Chemicals & Coatings",
    contact: "Ms. Priya Akshara",
    submitted: "05 May 2026",
    gstin: "24AAACA5510J1Z8",
    pan: "AAACA5510J", tan: "AHME11220R", udyam: "UDYAM-GJ-12-0029811",
    msme: true,
    risk: 28,
    status: "Pending",
    state: "Gujarat",
    category: "Chemicals & Coatings",
    bank: { acc: "8800124911", ifsc: "UTIB0000880", name: "Akshara Chemicals & Coatings" },
    validations: {
      gstin: { ok: true,  label: "GSTIN — Active",   detail: "Filed Apr 2026" },
      pan:   { ok: true,  label: "PAN — Active",     detail: "Linked to GSTIN" },
      tan:   { ok: true,  label: "TAN — Active",     detail: "TRACES verified" },
      bank:  { ok: true,  label: "Bank — Verified",  detail: "Penny-drop · Name matched" },
    },
    docs: [
      { name: "GST Certificate.pdf", size: "412 KB", ok: true },
      { name: "PAN Copy.pdf",        size: "163 KB", ok: true },
      { name: "Cancelled Cheque.jpg",size: "1.4 MB", ok: true },
      { name: "Product Brochure.pdf",size: "4.7 MB", ok: true },
    ],
  },
];

Object.assign(window, {
  VENDOR, STATS, RECENT_POS, RECENT_PAYMENTS, ALL_POS, GRNS, VENDOR_QUEUE,
});
