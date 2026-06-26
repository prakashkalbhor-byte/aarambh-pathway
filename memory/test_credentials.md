# Test Credentials — Vendor Onboarding Portal

## Auth endpoints (prefix: `/api`)
- POST `/api/auth/register` — body: { email, password, full_name, role }
- POST `/api/auth/login` — body: { email, password }
- POST `/api/auth/logout`
- GET  `/api/auth/me`
- POST `/api/auth/refresh`
- GET  `/api/auth/google/session?session_id=...` — Emergent OAuth exchange

## Seeded Users (created on backend startup)

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| admin | admin@keva.com | Admin@123 | Full access |
| reviewer | reviewer@keva.com | Review@123 | Sees `submitted` vendors |
| approver | approver@keva.com | Approve@123 | Final approve / reject |
| sap_team | sap@keva.com | Sap@123 | Assigns SAP codes |
| vendor | vendor@test.com | Vendor@123 | Sample vendor user |

## Roles & Access
- `vendor` — Onboarding form, can edit own draft, submit, view status
- `reviewer` — Review queue, approve/reject/request revision
- `approver` — Final approval queue
- `sap_team` — SAP mapping queue (assign company code, account group, payment terms)
- `admin` — Everything + user management

## Google OAuth (Emergent-managed)
- Login button on `/login` redirects to `https://auth.emergentagent.com/?redirect={origin}/dashboard`
- New Google users default to `vendor` role
