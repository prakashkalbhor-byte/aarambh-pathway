# Aarambh Vendor Onboarding & Master Data Management Portal

## Original Problem Statement
Build a B2B Vendor Onboarding & Master Data Management Portal from a PostgreSQL schema covering: vendors, vendor_general, vendor_compliance (GSTIN/PAN/TAN/MSME), vendor_bank_accounts (IFSC/SWIFT/IBAN), vendor_contacts, vendor_documents, vendor_workflow, vendor_sap_mapping, users (roles: vendor/reviewer/approver/admin/sap_team). Indian regulatory + SAP company codes 1000/3000/5000, account group KRED, payment terms NT30.

## User Choices
- Scope: All flows (vendor self-registration, multi-step onboarding, review/approval workflow, document upload+verification, SAP mapping, admin user management)
- Auth: Both JWT email/password + Emergent Google OAuth
- Database: MongoDB (schema translated from PostgreSQL)
- Document storage: Cloudinary (cloud_name `dy1b7lfkh`)
- Design: Aligned with https://github.com/prakashkalbhor-byte/aarambh-pathway — Inter + JetBrains Mono fonts, deep procurement blue brand (#1F4E79), "ink" neutral palette, dense (13px body), ring-based cards, dark sidebar active state

## Architecture
- **Backend**: FastAPI + Motor (MongoDB async) + PyJWT + bcrypt + Cloudinary SDK + httpx + openpyxl. Single `server.py` (~1130 lines). All routes prefixed `/api` (plus root `/health` for Kubernetes probes). CORS allows `*.emergent.host` + `*.emergentagent.com` + localhost via regex; overridable with `CORS_ORIGINS` env.
- **Frontend**: React 18 + React Router 6 + Tailwind 3 + Lucide icons + Axios. Custom UI primitives in `components/ui.jsx`. Multi-step onboarding with sticky left progress.
- **Auth model**: Roles `vendor | reviewer | approver | admin | sap_team`. Admin always elevated. httpOnly cookies (`access_token`, `refresh_token`, `session_token` for OAuth).
- **Documents**: Cloudinary signed upload — backend issues signature scoped to `vendor_portal/{vendor_id}`; metadata persisted to vendor record.
- **SAP integration**: Mock BAPI_VENDOR_CREATE wrapped behind an outbox pattern (`sap_outbox` collection) — production-swappable for a real SAP S/4HANA OData/IDoc gateway.

## User Personas
1. **Vendor** — self-registers, multi-step onboarding, submits for review.
2. **Reviewer** — first-line review, can approve/reject/request_revision, verify documents.
3. **Approver** — final approval.
4. **SAP Team** — pushes approved vendors to SAP, assigns company code/account group/payment terms.
5. **Admin** — everything + user role + activation management.

## Core Requirements
- Multi-step guided onboarding with draft saving & re-edit on `on_hold`.
- Workflow audit timeline (action, actor, timestamp, remarks) per vendor.
- Indian regulatory data in monospace font (GSTIN/PAN/TAN/IFSC).
- SAP mapping with idempotent push + outbox tracking + auto-generated SAP vendor code.
- Document verification by reviewer/approver, with expiry tracking.
- Dual auth: JWT email/password and Emergent Google OAuth via httpOnly cookies.

## What's Been Implemented

### Iteration 1 (2026-06-26 — initial MVP)
- ✅ 25+ backend endpoints (auth / vendors / workflow / SAP mapping / documents / admin / stats / Cloudinary signature)
- ✅ 8 frontend pages (Landing, Login, Register, Dashboard, VendorOnboarding, VendorList, VendorDetail, AdminUsers)
- ✅ Seed users for 5 roles + idempotent reseed
- ✅ 29 backend pytest cases, 100% pass

### Iteration 2 (2026-06-26 — P0/P1/P2 + design refresh + deployment fixes)
- ✅ **Deployment**: Root `/health` endpoint added (was missing — Kubernetes probe was failing); CORS regex allows preview+prod emergent domains; query limits added.
- ✅ **Design refresh — Aarambh procurement portal alignment**:
  - Fonts: Inter (sans) + JetBrains Mono (mono)
  - Palette: brand-50..900 (#1F4E79 deep blue) + ink-50..900 neutrals
  - Sidebar: 244px wide, ink-900 dark active state, WORKSPACE/MORE group labels
  - TopBar: breadcrumbs with `·` separator, ⌘K search, notification bell, profile chip
  - UI primitives: ring-based Cards, denser Buttons (h-9), Pill component, StatusBadge using Pills, PageHeader, getSlaTone helper
  - Tabular-nums for stat values, monospace for IDs/codes
- ✅ **P0 — Hardening**:
  - Regex validators: GSTIN (`22ABCDE1234F1Z5`), PAN (`ABCDE1234F`), TAN, IFSC (`HDFC0001234`), SWIFT, Pincode
  - Whitelists: company_code ∈ {1000, 3000, 5000}, account_group ∈ {KRED, LIEF, ZVEN} (enforced on both SapMappingIn AND SapPushIn)
  - Stricter pre-submit checks: required PAN, account#, IFSC, plus required docs (pan_card, cancelled_cheque, and gstin_certificate if GSTIN present)
  - Foreign vendor must have SWIFT; MSME vendor must have MSME number
- ✅ **P1 — In-app notifications + SLA**:
  - `notifications` collection + endpoints: `/api/notifications`, `/api/notifications/{id}/read`, `/api/notifications/read-all`
  - Auto-notifications on: vendor submitted (→ reviewers), workflow approved (→ owner + sap_team), rejected (→ owner), revision_requested (→ owner), SAP push done (→ owner)
  - `/api/sla/alerts` endpoint — vendors stuck in stage > 3 days + documents expiring within 30 days
  - Frontend: TopBar notification bell with unread dot + dropdown panel; Dashboard SLA alert cards
- ✅ **P2 — Mock SAP + Excel + idempotency**:
  - `/api/vendors/{id}/sap-push` — outbox-pattern push (with retry-ready structure); idempotency check BEFORE the mock call to avoid orphaned outbox rows
  - `_mock_bapi_vendor_create()` — production-swappable simulator returning realistic SAP messages (`{type:'S', id:'F2', number:'012'}` style)
  - `/api/sap-outbox` — outbox listing for sap_team/admin
  - `/api/export/vendors.xlsx` — XLSX export with 23 columns (vendor master + compliance + bank + SAP + SLA), branded header row in #1F4E79
- ✅ **Testing**: 50 backend pytest cases pass (up from 29); frontend design verified via Playwright screenshots.

## Backlog
**P0 — DONE**
**P1 — DONE (in-app); deferred: email channel (SendGrid/Resend) — needs API key from user.**
**P2 — DONE (mock SAP + Excel + outbox + idempotency); deferred: real SAP S/4HANA endpoint integration, multi-entity scoping by `users.entity` field**

**Future / nice-to-have**
- Email channel for notifications (SendGrid or Resend) — backend already produces notification records, just needs a fanout worker.
- Split `server.py` into routers (`auth.py`, `vendors.py`, `workflow.py`, `notifications.py`, `sap.py`, `admin.py`) — file is at 1130 lines.
- Excel export streaming with `write_only=True` for >10k rows.
- Multi-entity scoping — assign `entity` (Keva India / APAC / Global) to internal users; filter queues by entity match.

## File Map
```
/app/
├── backend/
│   ├── server.py           # All endpoints, validators, outbox, notifications, SLA, Excel
│   ├── requirements.txt    # +openpyxl 3.1.5
│   ├── .env                # MONGO_URL, JWT_SECRET, CLOUDINARY_*, FRONTEND_URL, CORS_ORIGINS (optional)
│   └── tests/
│       ├── test_backend.py        # iteration 1 cases (auth, vendor CRUD, workflow, admin)
│       └── test_p0_p1_p2.py       # iteration 2 cases (validators, notifications, SLA, SAP push, Excel)
├── frontend/
│   ├── tailwind.config.js  # ink-50..900, brand-50..900, Inter+JetBrains Mono
│   ├── src/
│   │   ├── App.js
│   │   ├── index.css       # Inter font loaded; .tnum tabular-nums utility
│   │   ├── components/
│   │   │   ├── AppShell.jsx     # 244px ink-900 sidebar + breadcrumb TopBar + NotificationsBell
│   │   │   ├── ui.jsx           # Button/Btn, Card (ring), Pill, StatusBadge, PageHeader, getSlaTone
│   │   │   └── Toast.jsx
│   │   └── pages/
│   │       ├── LandingPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── RegisterPage.jsx
│   │       ├── DashboardPage.jsx     # PageHeader + SLA alert cards + Export Excel
│   │       ├── VendorOnboarding.jsx  # 6-step + Cloudinary signed upload
│   │       ├── VendorList.jsx
│   │       ├── VendorDetail.jsx      # Workflow + SAP push (via /sap-push) + audit timeline
│   │       └── AdminUsers.jsx
├── memory/
│   ├── PRD.md              # this file
│   └── test_credentials.md
├── reference/              # original mockups/HTML provided in zip
└── auth_testing.md
```
