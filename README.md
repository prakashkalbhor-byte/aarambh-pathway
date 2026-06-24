# Vendor Registration Portal

A self-service portal for vendor registration, qualification, review/approval workflow, and downstream onboarding into procurement and finance systems.

## Documentation

| Document | File | Description |
|----------|------|-------------|
| Overview | `requirements.html` | Landing page linking all three documents |
| Functional Requirements (FRD) | `frd.html` | Capabilities, user journeys, business rules, NFRs |
| Integration Requirements (IRD) | `ird.html` | System interfaces, contracts, data exchange |
| Technical Requirements (TRD) | `trd.html` | Architecture, stack, security, deployment |

Open `requirements.html` (or any `.html` doc) in a browser to view. Documents share `doc.css`.

> Note: `index.html` is the **interactive prototype's** landing page, not the requirements overview — use `requirements.html` for the docs.

## Prototype

The interactive prototype is `Vendor Registration Portal.html`, built with React (via Babel standalone) and a set of `.jsx` modules:

| Module | Purpose |
|--------|---------|
| `app.jsx` | Application shell and routing |
| `registration.jsx` / `registration_variants.jsx` | Vendor registration wizard |
| `dashboard.jsx` | Internal operations dashboard |
| `compliance.jsx` | Compliance review screens |
| `finance.jsx` | Finance review screens |
| `admin.jsx` | Administration and configuration |
| `pogrn.jsx` | PO / GRN views |
| `vendor_categories.jsx` | Supply category taxonomy |
| `data.jsx` | Mock data |
| `ui.jsx` / `icons.jsx` | Shared UI components and icons |
| `bundle.jsx` | Module bundling/exports |

## Running locally

These are static files — no build step required. Serve the folder with any static web server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000/index.html`.

> A static server is recommended over opening files directly (`file://`) so that module/asset loading works correctly.

## Project structure

```
.
├── index.html                       # Overview / landing
├── frd.html                         # Functional Requirements Document
├── ird.html                         # Integration Requirements Document
├── trd.html                         # Technical Requirements Document
├── doc.css                          # Shared document styles
├── Vendor Registration Portal.html  # Interactive prototype
├── *.jsx                            # Prototype modules
├── uploads/                         # User-uploaded assets
└── export/                          # Generated exports
```

## Status

Requirement documents are **v1.0 (Draft)** pending stakeholder review and sign-off.
