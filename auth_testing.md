# Vendor Portal — Auth Testing Playbook

## Auth Methods
1. **JWT email/password auth** (custom) — `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
2. **Emergent Google OAuth** — landing at `/dashboard#session_id=...` after Google sign-in. Backend exchanges via `/api/auth/google/session` and sets `session_token` httpOnly cookie.

## Roles
- `vendor` — self-registers, fills onboarding form, sees own vendor record
- `reviewer` — sees vendors in `submitted` status, can approve/reject/request revision
- `approver` — sees `under_review` vendors, final approve/reject
- `sap_team` — sees `approved` vendors, assigns company code/account group/payment terms
- `admin` — full access, user management

## Test Credentials (created via admin seeding)
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@keva.com | Admin@123 |

Other test users are seeded on startup if missing — see `/app/memory/test_credentials.md`.

## API Auth Tests
```bash
API=https://fcf97337-f955-4715-837b-a480e1fbb294.preview.emergentagent.com

# Register a vendor
curl -c /tmp/c.txt -X POST $API/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"v1@test.com","password":"Vendor@123","full_name":"Test Vendor","role":"vendor"}'

# Login
curl -c /tmp/c.txt -X POST $API/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@keva.com","password":"Admin@123"}'

# Authenticated /me
curl -b /tmp/c.txt $API/api/auth/me
```

## Google OAuth Test
- Set cookie manually:
```python
await page.context.add_cookies([{
    "name": "session_token",
    "value": "<test_session_token>",
    "domain": "fcf97337-f955-4715-837b-a480e1fbb294.preview.emergentagent.com",
    "path": "/", "httpOnly": True, "secure": True, "sameSite": "None"
}])
```

## Checklist
- [ ] Admin seeded on startup
- [ ] bcrypt hashes start with `$2b$`
- [ ] Users have `user_id` (UUID) field; `_id` excluded with projection
- [ ] `/api/auth/me` returns user with `user_id`, `role`, `email`
- [ ] httpOnly cookies set on login (`access_token`, `refresh_token`) and Google session (`session_token`)
- [ ] CORS allow_credentials=True, origin = REACT_APP_BACKEND_URL
