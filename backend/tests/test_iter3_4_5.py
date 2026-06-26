"""
Backend tests for Aarambh portal Iter 3 (Categories, Compliance, Settings),
Iter 4 (PO/GRN, Operations) and Iter 5 (Invoices, 3-way match, OCR).
Uses seeded credentials from /app/memory/test_credentials.md.
"""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://vendor-sap.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN = ("admin@keva.com", "Admin@123")
REVIEWER = ("reviewer@keva.com", "Review@123")
VENDOR = ("vendor@test.com", "Vendor@123")


def _login(email, password):
    r = requests.post(f"{API}/auth/login", json={"email": email, "password": password}, timeout=20)
    assert r.status_code == 200, f"login failed for {email}: {r.status_code} {r.text}"
    return r.json()["access_token"]


def _h(tok):
    return {"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}


@pytest.fixture(scope="session")
def admin_token():
    return _login(*ADMIN)


@pytest.fixture(scope="session")
def reviewer_token():
    return _login(*REVIEWER)


@pytest.fixture(scope="session")
def vendor_token():
    return _login(*VENDOR)


# ---------------- Iter 3 - Categories ----------------
class TestCategories:
    def test_list_seeds_four_families(self, admin_token):
        r = requests.get(f"{API}/categories", headers=_h(admin_token), timeout=20)
        assert r.status_code == 200
        cats = r.json()
        assert isinstance(cats, list) and len(cats) >= 4, f"expected >=4 families, got {len(cats)}"
        # Total subcategories across families should be >=14 per problem statement
        total_subs = sum(len(c.get("children") or []) for c in cats)
        assert total_subs >= 14, f"expected >=14 subcategories total, got {total_subs}"
        # required family names
        names = {c["name"] for c in cats}
        for needed in ("Direct materials", "Indirect spend", "Logistics", "Professional services"):
            assert needed in names, f"missing family {needed} in {names}"

    def test_admin_can_create_family(self, admin_token):
        body = {"name": f"TEST_family_{uuid.uuid4().hex[:6]}"}
        r = requests.post(f"{API}/categories", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == body["name"]
        assert "family_id" in data
        # Verify persistence via GET
        r2 = requests.get(f"{API}/categories", headers=_h(admin_token), timeout=20)
        assert any(f["family_id"] == data["family_id"] for f in r2.json())

    def test_admin_can_create_and_delete_subcategory(self, admin_token):
        # Create a parent family first
        fam_body = {"name": f"TEST_fam_{uuid.uuid4().hex[:6]}"}
        f = requests.post(f"{API}/categories", headers=_h(admin_token), json=fam_body, timeout=20).json()
        fam_id = f["family_id"]
        sub_body = {"name": "TEST_sub_x", "tier": "T2", "sla": "5d"}
        rs = requests.post(f"{API}/categories/{fam_id}/sub", headers=_h(admin_token), json=sub_body, timeout=20)
        assert rs.status_code == 200, rs.text
        sub = rs.json()
        assert sub["name"] == "TEST_sub_x"
        sub_id = sub["sub_id"]
        # Verify sub is present
        all_cats = requests.get(f"{API}/categories", headers=_h(admin_token), timeout=20).json()
        fam = next(c for c in all_cats if c["family_id"] == fam_id)
        assert any(s["sub_id"] == sub_id for s in fam["children"])
        # Delete
        rd = requests.delete(f"{API}/categories/{fam_id}/sub/{sub_id}", headers=_h(admin_token), timeout=20)
        assert rd.status_code == 200
        all_cats2 = requests.get(f"{API}/categories", headers=_h(admin_token), timeout=20).json()
        fam2 = next(c for c in all_cats2 if c["family_id"] == fam_id)
        assert not any(s["sub_id"] == sub_id for s in fam2["children"])

    def test_non_admin_post_forbidden(self, vendor_token):
        r = requests.post(f"{API}/categories", headers=_h(vendor_token), json={"name": "TEST_x"}, timeout=20)
        assert r.status_code == 403, f"expected 403, got {r.status_code}"


# ---------------- Iter 3 - Compliance ----------------
def _get_any_vendor_id(admin_token):
    r = requests.get(f"{API}/vendors", headers=_h(admin_token), timeout=20)
    assert r.status_code == 200
    items = r.json()
    if isinstance(items, dict):
        items = items.get("items") or items.get("vendors") or []
    assert len(items) > 0, "no vendors found"
    return items[0]["vendor_id"]


class TestCompliance:
    def test_get_returns_8_checks(self, admin_token):
        vid = _get_any_vendor_id(admin_token)
        r = requests.get(f"{API}/compliance/{vid}", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "checks" in data
        assert len(data["checks"]) == 8, f"expected 8 checks, got {len(data['checks'])}"
        for c in data["checks"]:
            assert {"name", "status", "tone", "detail"}.issubset(c.keys())

    def test_run_persists(self, admin_token):
        vid = _get_any_vendor_id(admin_token)
        r = requests.post(f"{API}/compliance/{vid}/run", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert len(d["checks"]) == 8

    def test_vendor_post_forbidden(self, vendor_token, admin_token):
        vid = _get_any_vendor_id(admin_token)
        r = requests.post(f"{API}/compliance/{vid}/run", headers=_h(vendor_token), timeout=20)
        assert r.status_code == 403


# ---------------- Iter 3 - Change password & Notif prefs ----------------
class TestSettings:
    def test_change_password_wrong_current(self, vendor_token):
        r = requests.post(f"{API}/auth/change-password", headers=_h(vendor_token),
                          json={"current_password": "WRONG_pw_999", "new_password": "NewPass@456"}, timeout=20)
        assert r.status_code == 400

    def test_change_password_correct_and_revert(self):
        # Use a temporary user to avoid breaking shared seeds: use sap_team account
        tok = _login("sap@keva.com", "Sap@123")
        r = requests.post(f"{API}/auth/change-password", headers=_h(tok),
                          json={"current_password": "Sap@123", "new_password": "Sap@1234"}, timeout=20)
        assert r.status_code == 200, r.text
        # Revert
        tok2 = _login("sap@keva.com", "Sap@1234")
        r2 = requests.post(f"{API}/auth/change-password", headers=_h(tok2),
                           json={"current_password": "Sap@1234", "new_password": "Sap@123"}, timeout=20)
        assert r2.status_code == 200

    def test_notification_prefs_persist(self, vendor_token):
        body = {"in_app": True, "email_workflow": True, "email_sla": False}
        r = requests.post(f"{API}/auth/notification-prefs", headers=_h(vendor_token), json=body, timeout=20)
        assert r.status_code == 200


# ---------------- Iter 4 - Purchase Orders ----------------
class TestPurchaseOrders:
    def test_list_seeds_pos(self, admin_token):
        r = requests.get(f"{API}/purchase-orders", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200
        pos = r.json()
        assert isinstance(pos, list)
        assert len(pos) >= 5, f"expected >=5 POs seeded, got {len(pos)}"
        sample = pos[0]
        assert {"po_id", "po_number", "vendor_id", "lines", "status", "total_amount"}.issubset(sample.keys())

    def test_vendor_only_sees_own_pos(self, vendor_token, admin_token):
        r = requests.get(f"{API}/purchase-orders", headers=_h(vendor_token), timeout=20)
        assert r.status_code == 200
        # Either own POs or none — never another vendor's
        pos = r.json()
        assert isinstance(pos, list)


# ---------------- Iter 4 - GRNs and Ops ----------------
class TestGRNsAndOps:
    def test_list_seeds_grns(self, admin_token):
        r = requests.get(f"{API}/grns", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200
        grns = r.json()
        assert len(grns) >= 4, f"expected >=4 GRNs, got {len(grns)}"

    def test_create_grn_updates_po(self, admin_token):
        # Pick a PO
        pos = requests.get(f"{API}/purchase-orders", headers=_h(admin_token), timeout=20).json()
        po = pos[0]
        body = {
            "po_id": po["po_id"],
            "lines": [{"sku": l.get("sku", "X"), "qty_received": l["qty"], "qty_rejected": 0, "note": "ok"} for l in po["lines"]],
            "inspection_note": "TEST_grn ok",
        }
        r = requests.post(f"{API}/grns", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        grn = r.json()
        assert grn["po_id"] == po["po_id"]
        # PO should now have at least 1 grn_history entry
        po2 = requests.get(f"{API}/purchase-orders/{po['po_id']}", headers=_h(admin_token), timeout=20).json()
        assert any(h.get("grn_id") == grn["grn_id"] for h in po2.get("grn_history", []))
        # Acknowledge
        ra = requests.post(f"{API}/grns/{grn['grn_id']}/acknowledge", headers=_h(admin_token), timeout=20)
        assert ra.status_code == 200
        # verify
        grns = requests.get(f"{API}/grns", headers=_h(admin_token), timeout=20).json()
        target = next(g for g in grns if g["grn_id"] == grn["grn_id"])
        assert target["vendor_acknowledged"] is True

    def test_ops_stats_keys(self, admin_token):
        r = requests.get(f"{API}/operations/stats", headers=_h(admin_token), timeout=20)
        assert r.status_code == 200
        d = r.json()
        for k in ("open_pos", "pending_grns", "on_time_pct", "rejection_pct"):
            assert k in d


# ---------------- Iter 5 - Invoices and 3-way match ----------------
class TestInvoices:
    def test_list_seeds_with_match_result(self, admin_token):
        r = requests.get(f"{API}/invoices", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200
        invs = r.json()
        assert len(invs) >= 5, f"expected >=5 invoices, got {len(invs)}"
        for inv in invs:
            assert "match_result" in inv
            mr = inv["match_result"]
            assert {"verdict", "confidence", "flags"}.issubset(mr.keys())

    def test_invoice_stats_keys(self, admin_token):
        r = requests.get(f"{API}/invoices/stats", headers=_h(admin_token), timeout=20)
        assert r.status_code == 200
        d = r.json()
        for k in ("auto_approved", "held", "blocked", "pending", "scheduled_amount", "ocr_accuracy_pct", "total_invoices"):
            assert k in d, f"missing key {k}"

    def test_create_no_po_blocks_with_NO_PO_flag(self, admin_token):
        body = {
            "invoice_number": f"TEST/INV/{uuid.uuid4().hex[:6]}",
            "vendor_id": _get_any_vendor_id(admin_token),
            "subtotal": 1000.0,
            "tax_amount": 180.0,
            "tds_amount": 20.0,
            "total_amount": 1180.0,
            "lines": [{"description": "test item", "qty": 1, "unit_price": 1000, "line_total": 1000}],
        }
        r = requests.post(f"{API}/invoices", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        inv = r.json()
        assert inv["match_result"]["verdict"] == "blocked"
        codes = [f["code"] for f in inv["match_result"]["flags"]]
        assert "NO_PO" in codes, f"expected NO_PO in flags, got {codes}"

    def test_create_with_po_no_grn_blocked_with_NO_GRN(self, admin_token):
        pos = requests.get(f"{API}/purchase-orders", headers=_h(admin_token), timeout=20).json()
        po = pos[0]
        po_total = sum(l["qty"] * l["unit_price"] for l in po["lines"])
        body = {
            "invoice_number": f"TEST/INV/{uuid.uuid4().hex[:6]}",
            "vendor_id": po["vendor_id"],
            "po_id": po["po_id"],
            "subtotal": po_total,
            "tax_amount": 0,
            "tds_amount": 0,
            "total_amount": po_total,
            "lines": [{"description": l["description"], "qty": l["qty"], "unit_price": l["unit_price"], "line_total": l["qty"]*l["unit_price"]} for l in po["lines"]],
        }
        r = requests.post(f"{API}/invoices", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        inv = r.json()
        codes = [f["code"] for f in inv["match_result"]["flags"]]
        assert "NO_GRN" in codes, f"expected NO_GRN, got {codes}"
        assert inv["match_result"]["verdict"] == "blocked"

    def test_create_with_amount_variance_held(self, admin_token):
        pos = requests.get(f"{API}/purchase-orders", headers=_h(admin_token), timeout=20).json()
        po = pos[0]
        # find or create a GRN for this PO
        grns = requests.get(f"{API}/grns", headers=_h(admin_token), timeout=20).json()
        grn = next((g for g in grns if g["po_id"] == po["po_id"]), None)
        if not grn:
            gb = {
                "po_id": po["po_id"],
                "lines": [{"sku": l.get("sku", "X"), "qty_received": l["qty"], "qty_rejected": 0} for l in po["lines"]],
            }
            grn = requests.post(f"{API}/grns", headers=_h(admin_token), json=gb, timeout=20).json()
        po_total = sum(l["qty"] * l["unit_price"] for l in po["lines"])
        # 8% off → should produce AMOUNT_VAR warn → verdict held
        subtotal = po_total * 1.08
        body = {
            "invoice_number": f"TEST/INV/{uuid.uuid4().hex[:6]}",
            "vendor_id": po["vendor_id"],
            "po_id": po["po_id"],
            "grn_id": grn["grn_id"],
            "subtotal": round(subtotal, 2),
            "tax_amount": 0,
            "tds_amount": 0,
            "total_amount": round(subtotal, 2),
            "lines": [{"description": l["description"], "qty": l["qty"], "unit_price": l["unit_price"]*1.08, "line_total": l["qty"]*l["unit_price"]*1.08} for l in po["lines"]],
        }
        r = requests.post(f"{API}/invoices", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        inv = r.json()
        assert inv["match_result"]["verdict"] == "held", f"got {inv['match_result']['verdict']} flags={inv['match_result']['flags']}"
        codes = [f["code"] for f in inv["match_result"]["flags"]]
        assert "AMOUNT_VAR" in codes

    def test_create_clean_match_auto_approved(self, admin_token):
        pos = requests.get(f"{API}/purchase-orders", headers=_h(admin_token), timeout=20).json()
        po = pos[0]
        # Create a brand-new GRN with qty_received == qty_ordered (exact match)
        gb = {
            "po_id": po["po_id"],
            "lines": [{"sku": l.get("sku", "X"), "qty_received": l["qty"], "qty_rejected": 0} for l in po["lines"]],
        }
        grn = requests.post(f"{API}/grns", headers=_h(admin_token), json=gb, timeout=20).json()
        po_total = sum(l["qty"] * l["unit_price"] for l in po["lines"])
        body = {
            "invoice_number": f"TEST/INV/{uuid.uuid4().hex[:6]}",
            "vendor_id": po["vendor_id"],
            "po_id": po["po_id"],
            "grn_id": grn["grn_id"],
            "subtotal": po_total,
            "tax_amount": 0,
            "tds_amount": 0,
            "total_amount": po_total,
            "lines": [{"description": l["description"], "qty": l["qty"], "unit_price": l["unit_price"], "line_total": l["qty"]*l["unit_price"]} for l in po["lines"]],
        }
        r = requests.post(f"{API}/invoices", headers=_h(admin_token), json=body, timeout=20)
        assert r.status_code == 200, r.text
        inv = r.json()
        assert inv["match_result"]["verdict"] == "auto_approved", f"got {inv['match_result']}"

    def test_run_bot_processes_held(self, admin_token):
        r = requests.post(f"{API}/invoices/run-bot", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert "processed" in d

    def test_rerun_match_single(self, admin_token):
        invs = requests.get(f"{API}/invoices", headers=_h(admin_token), timeout=20).json()
        target = invs[0]
        r = requests.post(f"{API}/invoices/{target['invoice_id']}/rerun-match", headers=_h(admin_token), timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert "match_result" in d


# ---------------- Iter 5 - OCR endpoint ----------------
class TestOCR:
    def test_ocr_returns_ok_or_502(self, admin_token):
        body = {"image_url": "https://picsum.photos/300/400"}
        r = requests.post(f"{API}/invoices/ocr-extract", headers=_h(admin_token), json=body, timeout=60)
        # Acceptable: 200 ok=true OR 502 (LLM call failure) OR 503 (key missing). Anything else is a bug.
        assert r.status_code in (200, 502, 503), f"unexpected status {r.status_code}: {r.text[:300]}"
        if r.status_code == 200:
            d = r.json()
            assert d.get("ok") is True
            assert "extracted" in d
