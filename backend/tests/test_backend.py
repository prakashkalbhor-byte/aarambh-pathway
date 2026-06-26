"""
Vendor Onboarding Portal — Backend pytest suite
Tests cover health, auth, vendor CRUD, workflow, SAP mapping, documents, admin, stats
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://vendor-sap.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

CREDS = {
    "admin": ("admin@keva.com", "Admin@123"),
    "reviewer": ("reviewer@keva.com", "Review@123"),
    "approver": ("approver@keva.com", "Approve@123"),
    "sap": ("sap@keva.com", "Sap@123"),
    "vendor": ("vendor@test.com", "Vendor@123"),
}


def make_session(role: str = None):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    if role:
        email, pw = CREDS[role]
        r = s.post(f"{API}/auth/login", json={"email": email, "password": pw}, timeout=15)
        assert r.status_code == 200, f"login {role} failed: {r.status_code} {r.text}"
    return s


# ---------------- Health ----------------
def test_health():
    r = requests.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"


# ---------------- Auth: login + /me ----------------
@pytest.mark.parametrize("role", ["admin", "reviewer", "approver", "sap", "vendor"])
def test_login_and_me(role):
    s = make_session(role)
    r = s.get(f"{API}/auth/me", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == CREDS[role][0]
    role_map = {"sap": "sap_team"}
    expected = role_map.get(role, role)
    assert data["role"] == expected


def test_wrong_password_returns_401():
    r = requests.post(f"{API}/auth/login", json={"email": "admin@keva.com", "password": "WRONG"}, timeout=15)
    assert r.status_code == 401


def test_duplicate_register_returns_400():
    r = requests.post(f"{API}/auth/register",
                      json={"email": "admin@keva.com", "password": "Newpass@1", "full_name": "X"}, timeout=15)
    assert r.status_code == 400


def test_register_new_vendor_and_me():
    email = f"TEST_user_{uuid.uuid4().hex[:8]}@test.com"
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/register",
               json={"email": email, "password": "Pass@123", "full_name": "Test User"}, timeout=15)
    assert r.status_code == 200, r.text
    user = r.json()["user"]
    assert user["email"] == email.lower()
    assert user["role"] == "vendor"
    me = s.get(f"{API}/auth/me", timeout=15)
    assert me.status_code == 200
    assert me.json()["email"] == email.lower()


def test_logout_clears_cookies():
    s = make_session("admin")
    r = s.post(f"{API}/auth/logout", timeout=15)
    assert r.status_code == 200
    # cookies cleared, /me should now 401
    s.cookies.clear()
    me = s.get(f"{API}/auth/me", timeout=15)
    assert me.status_code == 401


# ---------------- Stats ----------------
def test_stats_admin():
    s = make_session("admin")
    r = s.get(f"{API}/stats", timeout=15)
    assert r.status_code == 200
    data = r.json()
    for k in ["draft", "submitted", "under_review", "approved", "rejected", "on_hold", "total"]:
        assert k in data


# ---------------- Vendor full flow ----------------
@pytest.fixture(scope="module")
def vendor_session_and_id():
    """Register a fresh vendor and create a vendor record."""
    email = f"TEST_vendor_{uuid.uuid4().hex[:8]}@test.com"
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/register",
               json={"email": email, "password": "Pass@123", "full_name": "Vendor Flow"}, timeout=15)
    assert r.status_code == 200, r.text
    # Create vendor
    body = {
        "vendor_type": "domestic",
        "general": {
            "legal_name": "TEST Acme Pvt Ltd",
            "trade_name": "Acme",
            "country": "IND",
            "city": "Mumbai",
            "state": "MH",
            "pincode": "400001",
            "email": email,
            "phone": "9999999999",
        },
    }
    r = s.post(f"{API}/vendors", json=body, timeout=15)
    assert r.status_code == 200, r.text
    vid = r.json()["vendor_id"]
    return s, vid, email


def test_vendor_create_and_get(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    r = s.get(f"{API}/vendors/{vid}", timeout=15)
    assert r.status_code == 200
    v = r.json()
    assert v["status"] == "draft"
    assert v["general"]["legal_name"] == "TEST Acme Pvt Ltd"


def test_vendor_cannot_create_second(vendor_session_and_id):
    s, _, _ = vendor_session_and_id
    body = {"vendor_type": "domestic", "general": {"legal_name": "Dup", "country": "IND"}}
    r = s.post(f"{API}/vendors", json=body, timeout=15)
    assert r.status_code == 400


def test_vendor_patch_compliance_bank_contacts(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    patch = {
        "compliance": {"gstin": "27ABCDE1234F1Z5", "pan": "ABCDE1234F", "gst_registered": True},
        "bank": {
            "account_holder": "TEST Acme Pvt Ltd",
            "account_number": "123456789012",
            "ifsc_code": "HDFC0000123",
            "bank_name": "HDFC",
            "branch_name": "Mumbai",
            "account_type": "Current",
        },
        "contacts": [{"contact_type": "primary", "name": "John", "email": "j@a.com", "phone": "9999999999"}],
    }
    r = s.patch(f"{API}/vendors/{vid}", json=patch, timeout=15)
    assert r.status_code == 200
    v = r.json()
    assert v["compliance"]["pan"] == "ABCDE1234F"
    assert v["bank"]["ifsc_code"] == "HDFC0000123"
    assert len(v["contacts"]) == 1


def test_vendor_submit(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    r = s.post(f"{API}/vendors/{vid}/submit", timeout=15)
    assert r.status_code == 200, r.text
    v = r.json()
    assert v["status"] == "submitted"
    assert any(w["action"] == "submitted" for w in v["workflow"])


def test_vendor_cannot_edit_after_submit(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    r = s.patch(f"{API}/vendors/{vid}", json={"general": {"legal_name": "X", "country": "IND"}}, timeout=15)
    assert r.status_code == 400


# ---------------- Reviewer / Approver / SAP ----------------
def test_reviewer_sees_submitted(vendor_session_and_id):
    _, vid, _ = vendor_session_and_id
    s = make_session("reviewer")
    r = s.get(f"{API}/vendors", timeout=15)
    assert r.status_code == 200
    ids = [v["vendor_id"] for v in r.json()]
    assert vid in ids


def test_reviewer_approve_moves_to_under_review(vendor_session_and_id):
    _, vid, _ = vendor_session_and_id
    s = make_session("reviewer")
    r = s.post(f"{API}/vendors/{vid}/workflow", json={"action": "approve", "remarks": "ok"}, timeout=15)
    assert r.status_code == 200, r.text
    assert r.json()["status"] == "under_review"


def test_approver_final_approve(vendor_session_and_id):
    _, vid, _ = vendor_session_and_id
    s = make_session("approver")
    r = s.post(f"{API}/vendors/{vid}/workflow", json={"action": "approve", "remarks": "final"}, timeout=15)
    assert r.status_code == 200, r.text
    v = r.json()
    assert v["status"] == "approved"
    assert v.get("approved_at") is not None
    assert v.get("approved_by") is not None


def test_sap_mapping_creates_vendor_code(vendor_session_and_id):
    _, vid, _ = vendor_session_and_id
    s = make_session("sap")
    r = s.post(f"{API}/vendors/{vid}/sap-mapping",
               json={"company_code": "1000", "account_group": "KRED", "payment_terms": "NT30"}, timeout=15)
    assert r.status_code == 200, r.text
    v = r.json()
    assert v["vendor_code"] is not None
    assert len(v["sap_mappings"]) >= 1


def test_sap_mapping_rejected_for_non_approved():
    # use seeded vendor's record — but ensure a fresh draft instead
    email = f"TEST_sap_neg_{uuid.uuid4().hex[:6]}@test.com"
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    s.post(f"{API}/auth/register",
           json={"email": email, "password": "Pass@123", "full_name": "T"}, timeout=15)
    r = s.post(f"{API}/vendors", json={"vendor_type": "domestic",
               "general": {"legal_name": "TEST X", "country": "IND"}}, timeout=15)
    vid = r.json()["vendor_id"]
    sap = make_session("sap")
    r = sap.post(f"{API}/vendors/{vid}/sap-mapping",
                 json={"company_code": "3000", "account_group": "KRED", "payment_terms": "NT30"}, timeout=15)
    assert r.status_code == 400


# ---------------- Reject / Revision flows ----------------
def test_reject_flow():
    email = f"TEST_rej_{uuid.uuid4().hex[:6]}@test.com"
    s = requests.Session(); s.headers.update({"Content-Type": "application/json"})
    s.post(f"{API}/auth/register", json={"email": email, "password": "Pass@123", "full_name": "T"}, timeout=15)
    r = s.post(f"{API}/vendors", json={"vendor_type": "domestic",
               "general": {"legal_name": "TEST Rej", "country": "IND"}}, timeout=15)
    vid = r.json()["vendor_id"]
    s.patch(f"{API}/vendors/{vid}", json={
        "compliance": {"pan": "ABCDE1234F"},
        "bank": {"account_number": "1", "ifsc_code": "X"},
    }, timeout=15)
    s.post(f"{API}/vendors/{vid}/submit", timeout=15)
    rev = make_session("reviewer")
    r = rev.post(f"{API}/vendors/{vid}/workflow", json={"action": "reject", "remarks": "bad"}, timeout=15)
    assert r.status_code == 200
    assert r.json()["status"] == "rejected"
    assert any(w.get("remarks") == "bad" for w in r.json()["workflow"])


def test_request_revision_flow():
    email = f"TEST_rev_{uuid.uuid4().hex[:6]}@test.com"
    s = requests.Session(); s.headers.update({"Content-Type": "application/json"})
    s.post(f"{API}/auth/register", json={"email": email, "password": "Pass@123", "full_name": "T"}, timeout=15)
    r = s.post(f"{API}/vendors", json={"vendor_type": "domestic",
               "general": {"legal_name": "TEST Rev", "country": "IND"}}, timeout=15)
    vid = r.json()["vendor_id"]
    s.patch(f"{API}/vendors/{vid}", json={
        "compliance": {"pan": "ABCDE1234F"},
        "bank": {"account_number": "1", "ifsc_code": "X"},
    }, timeout=15)
    s.post(f"{API}/vendors/{vid}/submit", timeout=15)
    rev = make_session("reviewer")
    r = rev.post(f"{API}/vendors/{vid}/workflow",
                 json={"action": "request_revision", "remarks": "fix gstin"}, timeout=15)
    assert r.status_code == 200
    assert r.json()["status"] == "on_hold"


# ---------------- Documents + Cloudinary signature ----------------
def test_cloudinary_signature(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    r = s.get(f"{API}/cloudinary/signature", params={"vendor_id": vid}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    for k in ["signature", "timestamp", "cloud_name", "api_key", "folder"]:
        assert k in data
    assert data["cloud_name"] == "dy1b7lfkh"
    assert isinstance(data["api_key"], str) and len(data["api_key"]) > 0


def test_attach_and_verify_document(vendor_session_and_id):
    s, vid, _ = vendor_session_and_id
    meta = {
        "document_type": "pan_card",
        "file_name": "pan.pdf",
        "public_id": "vendor_portal/test/pan",
        "secure_url": "https://res.cloudinary.com/dy1b7lfkh/image/upload/v1/sample.pdf",
        "mime_type": "application/pdf",
        "file_size_bytes": 12345,
    }
    r = s.post(f"{API}/vendors/{vid}/documents", json=meta, timeout=15)
    assert r.status_code == 200
    docs = r.json()["documents"]
    assert any(d["document_type"] == "pan_card" for d in docs)
    doc_id = [d for d in docs if d["document_type"] == "pan_card"][0]["document_id"]
    rev = make_session("reviewer")
    r = rev.post(f"{API}/vendors/{vid}/documents/{doc_id}/verify", timeout=15)
    assert r.status_code == 200
    docs = r.json()["documents"]
    verified = [d for d in docs if d["document_id"] == doc_id][0]
    assert verified["is_verified"] is True


# ---------------- Admin endpoints ----------------
def test_admin_lists_users():
    s = make_session("admin")
    r = s.get(f"{API}/admin/users", timeout=15)
    assert r.status_code == 200
    emails = [u["email"] for u in r.json()]
    assert "admin@keva.com" in emails


def test_non_admin_forbidden_from_admin_users():
    s = make_session("vendor")
    r = s.get(f"{API}/admin/users", timeout=15)
    assert r.status_code == 403


def test_admin_patch_user_role():
    admin = make_session("admin")
    # create a throwaway user
    email = f"TEST_patch_{uuid.uuid4().hex[:6]}@test.com"
    s = requests.Session(); s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/register",
               json={"email": email, "password": "Pass@123", "full_name": "T"}, timeout=15)
    uid = r.json()["user"]["user_id"]
    r = admin.patch(f"{API}/admin/users/{uid}", json={"role": "reviewer", "is_active": True}, timeout=15)
    assert r.status_code == 200, r.text
    assert r.json()["role"] == "reviewer"


# ---------------- Authorization ----------------
def test_vendor_cannot_view_other_vendor_record(vendor_session_and_id):
    _, vid, _ = vendor_session_and_id  # owned by another vendor
    # Make a different vendor
    email = f"TEST_other_{uuid.uuid4().hex[:6]}@test.com"
    s = requests.Session(); s.headers.update({"Content-Type": "application/json"})
    s.post(f"{API}/auth/register",
           json={"email": email, "password": "Pass@123", "full_name": "T"}, timeout=15)
    r = s.get(f"{API}/vendors/{vid}", timeout=15)
    assert r.status_code == 403
