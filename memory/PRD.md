# Keva Vendor Onboarding & Master Data Management Portal

## Original Problem Statement
Build a B2B Vendor Onboarding & Master Data Management Portal based on a provided PostgreSQL schema covering: vendors, vendor_general, vendor_compliance (GSTIN/PAN/TAN/MSME), vendor_bank_accounts (IFSC, SWIFT, IBAN), vendor_contacts, vendor_documents, vendor_workflow, vendor_sap_mapping, and users (roles: vendor, reviewer, approver, admin, sap_team). Indian regulatory context with SAP integration (company codes 1000/3000/5000, account group KRED, payment terms NT30).

## User Choices (Jan 2026)
- **Scope**: All flows (vendor registration, multi-step form, internal review & approval, document upload & verification, SAP mapping, admin)
- **Auth**: Both — JWT email/password (RBAC) **and** Emergent Google OAuth
- **Database**: MongoDB (translated from the provided PostgreSQL schema)
- **Document storage**: Cloudinary (cloud_name `dy1b7lfkh`)
- **Design**: Clean enterprise / SAP Fiori style — Swiss & High-Contrast archetype, Chivo headings + IBM Plex Sans body + JetBrains Mono for regulatory data

## Architecture
- **Backend**: FastAPI + Motor (MongoDB async) + PyJWT + bcrypt + Cloudinary SDK + httpx (for Emergent OAuth session-data exchange). Single `server.py` (~750 lines). All routes prefixed `/api`. httpOnly cookies (secure, samesite=none) for `access_token`, `refresh_token`, `session_token`.
- **Frontend**: React 18 + React Router 6 + Tailwind 3 + Lucide icons + Axios. Custom UI primitives in `components/ui.jsx` (no Shadcn dependency tree — kept lean). Multi-step onboarding with sticky left sidebar progress.
- **Auth model**: Roles `vendor | reviewer | approver | admin | sap_team`. Admin always elevated. Vendors auto-created on Google sign-in default to `vendor`.
- **Documents**: Cloudinary signed upload — backend issues signature scoped to `vendor_portal/{vendor_id}` folder; frontend uploads directly to Cloudinary; metadata then posted back to backend for storage on the vendor record.

## User Personas
1. **Vendor** — self-registers, fills multi-step onboarding (General → Compliance → Bank → Contacts → Documents → Review), submits for review.
2. **Reviewer** — first-line review queue (status=submitted), can approve/reject/request_revision, verify documents.
3. **Approver** — final approval queue (status=under_review or on_hold).
4. **SAP Team** — assigns company code + account group + payment terms on approved vendors; creates SAP mapping.
5. **Admin** — full access + user management (role + activation toggle).

## Core Requirements
- Multi-step guided onboarding with persistent progress + draft saving.
- Role-based workflow with audit trail of every state change (action, actor, timestamp, remarks).
- Indian compliance fields with monospace presentation (JetBrains Mono) to avoid misreads.
- SAP company-code mapping with auto-generated SAP vendor code if blank.
- Document verification by reviewer/approver with verified badge.
- httpOnly cookie auth; both email/password and Google OAuth coexist.

## What's Been Implemented (2026-06-26)
- ✅ Backend: 25+ endpoints — auth (register/login/logout/me/refresh/google-session), vendor CRUD, workflow actions, SAP mapping, document attach + verify, Cloudinary signature, admin users, stats.
- ✅ Frontend: Landing page, Login (with Google + email/password), Register, Dashboard (role-aware stats + recent vendors), VendorOnboarding (6-step), VendorList (filterable), VendorDetail (workflow + SAP + timeline), AdminUsers.
- ✅ Seed users for all 5 roles + idempotent reseed on password change.
- ✅ Testing — 29 backend pytest cases all pass; frontend smoke for admin/vendor/reviewer flows pass.

## Backlog (Prioritized)
**P0 (production hardening)**
- Validate GSTIN/PAN/IFSC formats with regex on backend.
- Restrict `company_code` to whitelist `(1000, 3000, 5000)`.
- Require non-empty `pan` + `account_number` + `ifsc_code` before submission (currently structural-only).

**P1 (UX & operations)**
- Email notifications on workflow transitions (SendGrid/Resend).
- Bulk reviewer assignment / SLA timers per stage.
- Refresh-token rotation for defence in depth.
- Document expiry alerts (e.g., GST cert renewal).

**P2 (enterprise scale)**
- Multi-entity scoping (Keva India / APAC / Global views).
- Excel export of vendor master.
- Real SAP S/4HANA OData push (replace mock SAP code with actual call).
- Split single `server.py` into routers (`auth.py`, `vendors.py`, `admin.py`).

## File Map
```
/app/
├── backend/
│   ├── server.py           # FastAPI app, all routes
│   ├── requirements.txt
│   ├── .env                # MONGO_URL, JWT_SECRET, CLOUDINARY_*, FRONTEND_URL
│   └── tests/test_backend.py   # 29 pytest cases
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/index.html
│   └── src/
│       ├── App.js          # Router + AuthProvider + AuthCallback
│       ├── index.css       # Tailwind + Chivo/IBM Plex/JetBrains Mono fonts
│       ├── lib/api.js
│       ├── lib/utils.js
│       ├── components/
│       │   ├── AppShell.jsx
│       │   ├── ui.jsx       # Button, Input, Label, Card, Select, StatusBadge, MonoData
│       │   └── Toast.jsx
│       └── pages/
│           ├── LandingPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           ├── DashboardPage.jsx
│           ├── VendorOnboarding.jsx
│           ├── VendorList.jsx
│           ├── VendorDetail.jsx
│           └── AdminUsers.jsx
├── memory/
│   ├── PRD.md              # this file
│   └── test_credentials.md # seeded user credentials
├── auth_testing.md         # auth testing playbook
└── design_guidelines.json
```
