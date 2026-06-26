"""
Vendor Onboarding & Master Data Management Portal — Backend
FastAPI + MongoDB (Motor) + JWT auth + Emergent Google OAuth + Cloudinary uploads
"""
from dotenv import load_dotenv
load_dotenv()

import os
import re
import io
import uuid
import time
import secrets
import bcrypt
import jwt
import httpx
import cloudinary
import cloudinary.utils
import cloudinary.uploader
import openpyxl
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Literal
from fastapi import FastAPI, HTTPException, Request, Response, Depends, Query, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr, Field, field_validator
from motor.motor_asyncio import AsyncIOMotorClient

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
JWT_ALG = "HS256"

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    secure=True,
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ---------------------------------------------------------------------------
# App + CORS
# ---------------------------------------------------------------------------
app = FastAPI(title="Vendor Onboarding Portal API")

# CORS — allow Emergent preview/production domains by default; override with CORS_ORIGINS env (comma list or "*").
_cors_env = os.environ.get("CORS_ORIGINS", "").strip()
if _cors_env and _cors_env != "*":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[o.strip() for o in _cors_env.split(",") if o.strip()],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r"https?://([a-zA-Z0-9-]+\.)*(emergent\.host|emergentagent\.com)|http://localhost(:\d+)?",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

api = APIRouter(prefix="/api")

# Plain root-level health endpoint for Kubernetes liveness/readiness probes
@app.get("/health")
async def root_health():
    return {"status": "ok"}

# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------
def now_utc() -> datetime:
    return datetime.now(timezone.utc)

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False

def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id, "email": email, "role": role,
        "type": "access",
        "exp": now_utc() + timedelta(hours=12),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id, "type": "refresh",
        "exp": now_utc() + timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=True,
                        samesite="none", max_age=12*60*60, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True,
                        samesite="none", max_age=7*24*60*60, path="/")

def clear_auth_cookies(response: Response):
    for k in ("access_token", "refresh_token", "session_token"):
        response.delete_cookie(k, path="/")

def public_user(doc: dict) -> dict:
    return {
        "user_id": doc["user_id"],
        "email": doc["email"],
        "full_name": doc.get("full_name") or doc.get("name") or "",
        "role": doc["role"],
        "entity": doc.get("entity"),
        "picture": doc.get("picture"),
        "is_active": doc.get("is_active", True),
        "created_at": doc.get("created_at"),
    }

# ---------------------------------------------------------------------------
# Auth dependency
# ---------------------------------------------------------------------------
def _extract_bearer_token(request: Request) -> Optional[str]:
    """Read access_token cookie first, fall back to Authorization: Bearer."""
    token = request.cookies.get("access_token")
    if token:
        return token
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None

async def _user_from_jwt(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.PyJWTError:
        return None
    if payload.get("type") != "access":
        return None
    return await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0, "password_hash": 0})

def _normalize_expiry(expires_at) -> datetime:
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return expires_at

async def _user_from_session_cookie(session_token: str) -> Optional[dict]:
    sess = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not sess:
        return None
    if _normalize_expiry(sess["expires_at"]) <= now_utc():
        return None
    return await db.users.find_one({"user_id": sess["user_id"]}, {"_id": 0, "password_hash": 0})

async def get_current_user(request: Request) -> dict:
    # 1. JWT access_token cookie / Bearer header
    token = _extract_bearer_token(request)
    if token:
        user = await _user_from_jwt(token)
        if user:
            return user
    # 2. Emergent session_token cookie
    session_token = request.cookies.get("session_token")
    if session_token:
        user = await _user_from_session_cookie(session_token)
        if user:
            return user
    raise HTTPException(status_code=401, detail="Not authenticated")

def require_role(*roles: str):
    async def checker(user: dict = Depends(get_current_user)) -> dict:
        if user["role"] not in roles and user["role"] != "admin":
            raise HTTPException(status_code=403, detail="Forbidden")
        return user
    return checker

# ---------------------------------------------------------------------------
# Validation helpers (Indian regulatory regex)
# ---------------------------------------------------------------------------
GSTIN_RE = re.compile(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")
PAN_RE = re.compile(r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$")
TAN_RE = re.compile(r"^[A-Z]{4}[0-9]{5}[A-Z]{1}$")
IFSC_RE = re.compile(r"^[A-Z]{4}0[A-Z0-9]{6}$")
PINCODE_RE = re.compile(r"^[1-9][0-9]{5}$")
SWIFT_RE = re.compile(r"^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$")
ALLOWED_COMPANY_CODES = {"1000", "3000", "5000"}
ALLOWED_ACCT_GROUPS = {"KRED", "LIEF", "ZVEN"}

def _bad(field: str, msg: str) -> HTTPException:
    return HTTPException(status_code=400, detail=f"{field}: {msg}")

def validate_compliance(c: dict, vendor_type: str):
    if c.get("gstin"):
        if not GSTIN_RE.match(c["gstin"]):
            raise _bad("GSTIN", "must match 22ABCDE1234F1Z5 format")
    if c.get("pan"):
        if not PAN_RE.match(c["pan"]):
            raise _bad("PAN", "must match ABCDE1234F format")
    if c.get("tan"):
        if not TAN_RE.match(c["tan"]):
            raise _bad("TAN", "must match MUMA12345B format")
    # MSME category enforcement
    if vendor_type == "msme" and not c.get("msme_number"):
        raise _bad("MSME", "MSME number is required for msme vendor type")

def validate_bank(b: dict, vendor_type: str):
    if b.get("ifsc_code"):
        if not IFSC_RE.match(b["ifsc_code"]):
            raise _bad("IFSC", "must match HDFC0001234 format (11 chars, 5th digit = 0)")
    if b.get("swift_code"):
        if not SWIFT_RE.match(b["swift_code"]):
            raise _bad("SWIFT", "must be 8 or 11 alphanumeric characters")
    if vendor_type == "foreign" and not b.get("swift_code"):
        raise _bad("SWIFT", "SWIFT code is required for foreign vendors")

def validate_general(g: dict):
    if g.get("pincode") and not PINCODE_RE.match(g["pincode"]):
        raise _bad("Pincode", "must be 6 digits, first digit 1-9")

# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str
    role: Literal["vendor"] = "vendor"  # self-registration only allows vendor

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class GeneralIn(BaseModel):
    legal_name: str
    trade_name: Optional[str] = None
    vendor_category: Optional[str] = None
    country: str = "IND"
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None

class ComplianceIn(BaseModel):
    gstin: Optional[str] = None
    pan: Optional[str] = None
    tan: Optional[str] = None
    msme_number: Optional[str] = None
    msme_category: Optional[str] = None
    gst_registered: bool = True
    gst_category: Optional[str] = None
    is_foreign: bool = False

class BankIn(BaseModel):
    account_holder: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None
    bank_name: Optional[str] = None
    branch_name: Optional[str] = None
    account_type: Optional[str] = None
    is_primary: bool = True
    swift_code: Optional[str] = None
    iban: Optional[str] = None

class ContactIn(BaseModel):
    contact_type: str
    name: str
    designation: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None

class VendorCreateIn(BaseModel):
    vendor_type: Literal["domestic", "foreign", "msme"]
    general: GeneralIn

class VendorPatchIn(BaseModel):
    vendor_type: Optional[Literal["domestic", "foreign", "msme"]] = None
    general: Optional[GeneralIn] = None
    compliance: Optional[ComplianceIn] = None
    bank: Optional[BankIn] = None
    contacts: Optional[List[ContactIn]] = None

class WorkflowActionIn(BaseModel):
    action: Literal["approve", "reject", "request_revision", "hold"]
    remarks: Optional[str] = None

class SapMappingIn(BaseModel):
    company_code: str
    account_group: str = "KRED"
    payment_terms: str = "NT30"
    sap_vendor_code: Optional[str] = None

    @field_validator("company_code")
    @classmethod
    def _cc(cls, v):
        if v not in ALLOWED_COMPANY_CODES:
            raise ValueError(f"company_code must be one of {sorted(ALLOWED_COMPANY_CODES)}")
        return v

    @field_validator("account_group")
    @classmethod
    def _ag(cls, v):
        if v.upper() not in ALLOWED_ACCT_GROUPS:
            raise ValueError(f"account_group must be one of {sorted(ALLOWED_ACCT_GROUPS)}")
        return v.upper()

class DocumentMetaIn(BaseModel):
    document_type: str
    file_name: str
    public_id: str
    secure_url: str
    mime_type: Optional[str] = None
    file_size_bytes: Optional[int] = None
    expiry_date: Optional[str] = None

# ---------------------------------------------------------------------------
# Startup: indexes + seed
# ---------------------------------------------------------------------------
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("user_id", unique=True)
    await db.vendors.create_index("vendor_id", unique=True)
    await db.vendors.create_index("owner_user_id")
    await db.vendors.create_index("status")
    await db.user_sessions.create_index("session_token", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.notifications.create_index("user_id")
    await db.notifications.create_index("created_at")
    await db.sap_outbox.create_index("vendor_id")
    await db.sap_outbox.create_index("status")

    seed = [
        ("admin@keva.com", "Admin@123", "System Admin", "admin"),
        ("reviewer@keva.com", "Review@123", "Reviewer One", "reviewer"),
        ("approver@keva.com", "Approve@123", "Approver One", "approver"),
        ("sap@keva.com", "Sap@123", "SAP Team Lead", "sap_team"),
        ("vendor@test.com", "Vendor@123", "Demo Vendor", "vendor"),
    ]
    for email, pw, name, role in seed:
        existing = await db.users.find_one({"email": email})
        if not existing:
            await db.users.insert_one({
                "user_id": f"user_{uuid.uuid4().hex[:12]}",
                "email": email,
                "password_hash": hash_password(pw),
                "full_name": name,
                "role": role,
                "is_active": True,
                "created_at": now_utc(),
            })
        elif not verify_password(pw, existing.get("password_hash", "")):
            await db.users.update_one(
                {"email": email},
                {"$set": {"password_hash": hash_password(pw), "role": role}}
            )

# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------
@api.get("/health")
async def health():
    return {"status": "ok", "time": now_utc().isoformat()}

@api.post("/auth/register")
async def register(body: RegisterIn, response: Response):
    email = body.email.lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_doc = {
        "user_id": f"user_{uuid.uuid4().hex[:12]}",
        "email": email,
        "password_hash": hash_password(body.password),
        "full_name": body.full_name,
        "role": body.role,
        "is_active": True,
        "created_at": now_utc(),
    }
    await db.users.insert_one(user_doc)
    access = create_access_token(user_doc["user_id"], email, body.role)
    refresh = create_refresh_token(user_doc["user_id"])
    set_auth_cookies(response, access, refresh)
    return {"user": public_user(user_doc), "access_token": access}

@api.post("/auth/login")
async def login(body: LoginIn, response: Response):
    email = body.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account inactive")
    await db.users.update_one({"user_id": user["user_id"]}, {"$set": {"last_login": now_utc()}})
    access = create_access_token(user["user_id"], email, user["role"])
    refresh = create_refresh_token(user["user_id"])
    set_auth_cookies(response, access, refresh)
    return {"user": public_user(user), "access_token": access}

@api.post("/auth/logout")
async def logout(response: Response, request: Request):
    sess = request.cookies.get("session_token")
    if sess:
        await db.user_sessions.delete_one({"session_token": sess})
    clear_auth_cookies(response)
    return {"ok": True}

@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return public_user(user)

@api.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_access_token(user["user_id"], user["email"], user["role"])
        response.set_cookie("access_token", access, httponly=True, secure=True,
                            samesite="none", max_age=12*60*60, path="/")
        return {"ok": True}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Emergent Google OAuth — process session_id from URL fragment
@api.get("/auth/google/session")
async def google_session(session_id: str, response: Response):
    async with httpx.AsyncClient(timeout=15) as hc:
        r = await hc.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id},
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Google session")
    data = r.json()
    email = data["email"].lower()
    existing = await db.users.find_one({"email": email})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"picture": data.get("picture"), "last_login": now_utc()}}
        )
        user_doc = await db.users.find_one({"user_id": user_id}, {"_id": 0, "password_hash": 0})
    else:
        user_doc = {
            "user_id": f"user_{uuid.uuid4().hex[:12]}",
            "email": email,
            "full_name": data.get("name") or email.split("@")[0],
            "picture": data.get("picture"),
            "role": "vendor",
            "is_active": True,
            "created_at": now_utc(),
        }
        await db.users.insert_one(user_doc)

    session_token = data["session_token"]
    expires_at = now_utc() + timedelta(days=7)
    await db.user_sessions.update_one(
        {"session_token": session_token},
        {"$set": {
            "session_token": session_token,
            "user_id": user_doc["user_id"],
            "expires_at": expires_at,
            "created_at": now_utc(),
        }},
        upsert=True,
    )
    response.set_cookie("session_token", session_token, httponly=True, secure=True,
                        samesite="none", max_age=7*24*60*60, path="/")
    return {"user": public_user(user_doc)}

# ---------------------------------------------------------------------------
# Vendor endpoints
# ---------------------------------------------------------------------------
def vendor_public(v: dict) -> dict:
    v = dict(v)
    v.pop("_id", None)
    return v

@api.post("/vendors")
async def create_vendor(body: VendorCreateIn, user: dict = Depends(get_current_user)):
    if user["role"] not in ("vendor", "admin"):
        raise HTTPException(status_code=403, detail="Only vendors can create")
    existing = await db.vendors.find_one({"owner_user_id": user["user_id"]})
    if existing and user["role"] == "vendor":
        raise HTTPException(status_code=400, detail="You already have a vendor record")
    vendor_id = f"ven_{uuid.uuid4().hex[:12]}"
    doc = {
        "vendor_id": vendor_id,
        "owner_user_id": user["user_id"],
        "vendor_code": None,
        "vendor_type": body.vendor_type,
        "status": "draft",
        "general": body.general.model_dump(),
        "compliance": None,
        "bank": None,
        "contacts": [],
        "documents": [],
        "sap_mappings": [],
        "workflow": [],
        "created_at": now_utc(),
        "updated_at": now_utc(),
        "submitted_at": None,
        "approved_at": None,
        "approved_by": None,
    }
    await db.vendors.insert_one(doc)
    return vendor_public(doc)

@api.get("/vendors")
async def list_vendors(
    status: Optional[str] = None,
    user: dict = Depends(get_current_user),
):
    query = {}
    if user["role"] == "vendor":
        query["owner_user_id"] = user["user_id"]
    elif user["role"] == "reviewer":
        query["status"] = {"$in": ["submitted", "under_review"]}
    elif user["role"] == "approver":
        query["status"] = {"$in": ["under_review", "on_hold"]}
    elif user["role"] == "sap_team":
        query["status"] = "approved"
    if status:
        query["status"] = status
    cursor = db.vendors.find(query, {"_id": 0}).sort("updated_at", -1).limit(200)
    return [vendor_public(v) async for v in cursor]

@api.get("/vendors/mine")
async def my_vendor(user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"_id": 0})
    return vendor_public(v) if v else None

@api.get("/vendors/{vendor_id}")
async def get_vendor(vendor_id: str, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor" and v["owner_user_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Forbidden")
    return vendor_public(v)

@api.patch("/vendors/{vendor_id}")
async def update_vendor(vendor_id: str, body: VendorPatchIn, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor":
        if v["owner_user_id"] != user["user_id"]:
            raise HTTPException(status_code=403, detail="Forbidden")
        if v["status"] not in ("draft", "on_hold"):
            raise HTTPException(status_code=400, detail="Cannot edit after submission")

    # P0: regex validation
    vendor_type = body.vendor_type or v.get("vendor_type") or "domestic"
    if body.general:
        validate_general(body.general.model_dump())
    if body.compliance:
        validate_compliance(body.compliance.model_dump(), vendor_type)
    if body.bank:
        validate_bank(body.bank.model_dump(), vendor_type)

    updates = {"updated_at": now_utc()}
    if body.vendor_type:
        updates["vendor_type"] = body.vendor_type
    if body.general:
        updates["general"] = body.general.model_dump()
    if body.compliance:
        updates["compliance"] = body.compliance.model_dump()
    if body.bank:
        updates["bank"] = body.bank.model_dump()
    if body.contacts is not None:
        updates["contacts"] = [c.model_dump() for c in body.contacts]

    await db.vendors.update_one({"vendor_id": vendor_id}, {"$set": updates})
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

@api.post("/vendors/{vendor_id}/submit")
async def submit_vendor(vendor_id: str, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor" and v["owner_user_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Forbidden")
    if v["status"] not in ("draft", "on_hold"):
        raise HTTPException(status_code=400, detail=f"Cannot submit from status {v['status']}")

    # P0: stricter pre-submit checks
    c = v.get("compliance") or {}
    b = v.get("bank") or {}
    g = v.get("general") or {}
    if not g.get("legal_name"):
        raise _bad("General", "legal_name is required")
    if not c.get("pan"):
        raise _bad("Compliance", "PAN is required to submit")
    if not b.get("account_number") or not b.get("ifsc_code"):
        raise _bad("Bank", "account_number and IFSC are required to submit")
    validate_general(g)
    validate_compliance(c, v.get("vendor_type", "domestic"))
    validate_bank(b, v.get("vendor_type", "domestic"))
    # Required documents
    required_docs = {"pan_card", "cancelled_cheque"}
    if c.get("gstin"):
        required_docs.add("gstin_certificate")
    uploaded_types = {d["document_type"] for d in (v.get("documents") or [])}
    missing = required_docs - uploaded_types
    if missing:
        raise _bad("Documents", f"missing required: {', '.join(sorted(missing))}")

    wf = {
        "action": "submitted",
        "performed_by": user["user_id"],
        "performed_by_name": user.get("full_name"),
        "performed_at": now_utc(),
        "remarks": None,
        "previous_status": v["status"],
        "new_status": "submitted",
    }
    await db.vendors.update_one(
        {"vendor_id": vendor_id},
        {"$set": {"status": "submitted", "submitted_at": now_utc(), "updated_at": now_utc()},
         "$push": {"workflow": wf}},
    )
    # Notify reviewers
    await _notify_role("reviewer", title=f"New vendor submitted: {g.get('legal_name','—')}",
                       body=f"Vendor {vendor_id} is awaiting review", vendor_id=vendor_id)
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

# Mapping of (action, role, current_status) -> (new_status, action_label)
INTERNAL_ROLES = ("reviewer", "approver", "admin")

def _resolve_workflow_transition(action: str, role: str, status: str):
    if action == "approve":
        if role == "reviewer" and status == "submitted":
            return "under_review", "reviewed"
        if role in ("approver", "admin") and status in ("under_review", "on_hold", "submitted"):
            return "approved", "approved"
        return None, None
    if action == "reject" and role in INTERNAL_ROLES:
        return "rejected", "rejected"
    if action == "request_revision" and role in INTERNAL_ROLES:
        return "on_hold", "revision_requested"
    if action == "hold" and role in INTERNAL_ROLES:
        return "on_hold", "hold"
    return None, None

@api.post("/vendors/{vendor_id}/workflow")
async def workflow_action(vendor_id: str, body: WorkflowActionIn, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")

    new_status, action_name = _resolve_workflow_transition(body.action, user["role"], v["status"])
    if not new_status:
        raise HTTPException(status_code=403, detail="Action not allowed at this stage")

    wf = {
        "action": action_name,
        "performed_by": user["user_id"],
        "performed_by_name": user.get("full_name"),
        "performed_at": now_utc(),
        "remarks": body.remarks,
        "previous_status": v["status"],
        "new_status": new_status,
    }
    set_doc = {"status": new_status, "updated_at": now_utc()}
    if new_status == "approved":
        set_doc["approved_at"] = now_utc()
        set_doc["approved_by"] = user["user_id"]
    await db.vendors.update_one(
        {"vendor_id": vendor_id},
        {"$set": set_doc, "$push": {"workflow": wf}}
    )
    # P1: notify owner + next-stage role
    owner_id = v.get("owner_user_id")
    name = (v.get("general") or {}).get("legal_name") or "your vendor record"
    if owner_id:
        if new_status == "approved":
            await _notify_user(owner_id, "Vendor approved", f"{name} has been approved.", vendor_id)
        elif new_status == "rejected":
            await _notify_user(owner_id, "Vendor rejected", body.remarks or f"{name} was rejected.", vendor_id)
        elif new_status == "on_hold":
            await _notify_user(owner_id, "Revision requested", body.remarks or "Reviewer requested changes.", vendor_id)
    if new_status == "under_review":
        await _notify_role("approver", "Vendor ready for approval", f"{name} passed first review.", vendor_id)
    elif new_status == "approved":
        await _notify_role("sap_team", "Vendor approved — SAP push ready", f"{name} awaits company-code mapping.", vendor_id)
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)
# ---------------------------------------------------------------------------
@api.post("/vendors/{vendor_id}/sap-mapping")
async def add_sap_mapping(vendor_id: str, body: SapMappingIn, user: dict = Depends(require_role("sap_team", "admin"))):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if v["status"] != "approved":
        raise HTTPException(status_code=400, detail="Vendor must be approved")
    mappings = v.get("sap_mappings", []) or []
    if any(m["company_code"] == body.company_code for m in mappings):
        raise HTTPException(status_code=400, detail="Company code already mapped")
    sap_code = body.sap_vendor_code or f"4{int(time.time()) % 100000:05d}"
    mapping = {
        "mapping_id": f"map_{uuid.uuid4().hex[:8]}",
        "company_code": body.company_code,
        "sap_vendor_code": sap_code,
        "account_group": body.account_group,
        "payment_terms": body.payment_terms,
        "created_in_sap": True,
        "sap_created_at": now_utc(),
        "created_by": user["user_id"],
    }
    updates = {"$push": {"sap_mappings": mapping}, "$set": {"updated_at": now_utc()}}
    if not v.get("vendor_code"):
        updates["$set"]["vendor_code"] = sap_code
    await db.vendors.update_one({"vendor_id": vendor_id}, updates)
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

# ---------------------------------------------------------------------------
# Documents (Cloudinary signed upload)
# ---------------------------------------------------------------------------
@api.get("/cloudinary/signature")
async def cloudinary_signature(
    vendor_id: str = Query(...),
    user: dict = Depends(get_current_user),
):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor" and v["owner_user_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Forbidden")

    folder = f"vendor_portal/{vendor_id}"
    timestamp = int(time.time())
    params = {"timestamp": timestamp, "folder": folder}
    signature = cloudinary.utils.api_sign_request(params, os.environ["CLOUDINARY_API_SECRET"])
    return {
        "signature": signature,
        "timestamp": timestamp,
        "cloud_name": os.environ["CLOUDINARY_CLOUD_NAME"],
        "api_key": os.environ["CLOUDINARY_API_KEY"],
        "folder": folder,
    }

@api.post("/vendors/{vendor_id}/documents")
async def attach_document(vendor_id: str, body: DocumentMetaIn, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor" and v["owner_user_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Forbidden")

    doc = {
        "document_id": f"doc_{uuid.uuid4().hex[:8]}",
        "document_type": body.document_type,
        "file_name": body.file_name,
        "public_id": body.public_id,
        "secure_url": body.secure_url,
        "mime_type": body.mime_type,
        "file_size_bytes": body.file_size_bytes,
        "uploaded_at": now_utc(),
        "uploaded_by": user["user_id"],
        "is_verified": False,
        "verified_by": None,
        "verified_at": None,
        "expiry_date": body.expiry_date,
    }
    # Replace any existing doc of the same type
    await db.vendors.update_one(
        {"vendor_id": vendor_id},
        {"$pull": {"documents": {"document_type": body.document_type}}}
    )
    await db.vendors.update_one(
        {"vendor_id": vendor_id},
        {"$push": {"documents": doc}, "$set": {"updated_at": now_utc()}}
    )
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

@api.post("/vendors/{vendor_id}/documents/{document_id}/verify")
async def verify_document(
    vendor_id: str, document_id: str,
    user: dict = Depends(require_role("reviewer", "approver", "admin"))
):
    res = await db.vendors.update_one(
        {"vendor_id": vendor_id, "documents.document_id": document_id},
        {"$set": {
            "documents.$.is_verified": True,
            "documents.$.verified_by": user["user_id"],
            "documents.$.verified_at": now_utc(),
            "updated_at": now_utc(),
        }}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Document not found")
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

# ---------------------------------------------------------------------------
# Admin endpoints
# ---------------------------------------------------------------------------
@api.get("/admin/users")
async def list_users(user: dict = Depends(require_role("admin"))):
    cursor = db.users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1).limit(200)
    return [doc async for doc in cursor]

class UserPatchIn(BaseModel):
    role: Optional[str] = None
    is_active: Optional[bool] = None

@api.patch("/admin/users/{user_id}")
async def update_user(user_id: str, body: UserPatchIn, user: dict = Depends(require_role("admin"))):
    updates = {}
    if body.role is not None:
        if body.role not in ("vendor", "reviewer", "approver", "admin", "sap_team"):
            raise HTTPException(status_code=400, detail="Invalid role")
        updates["role"] = body.role
    if body.is_active is not None:
        updates["is_active"] = body.is_active
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update")
    await db.users.update_one({"user_id": user_id}, {"$set": updates})
    u = await db.users.find_one({"user_id": user_id}, {"_id": 0, "password_hash": 0})
    return u

# ---------------------------------------------------------------------------
# Dashboard stats
# ---------------------------------------------------------------------------
@api.get("/stats")
async def stats(user: dict = Depends(get_current_user)):
    role = user["role"]
    query = {}
    if role == "vendor":
        query["owner_user_id"] = user["user_id"]
    pipeline = [
        {"$match": query} if query else {"$match": {}},
        {"$group": {"_id": "$status", "count": {"$sum": 1}}},
    ]
    out = {"draft": 0, "submitted": 0, "under_review": 0, "approved": 0, "rejected": 0, "on_hold": 0}
    async for row in db.vendors.aggregate(pipeline):
        if row["_id"] in out:
            out[row["_id"]] = row["count"]
    out["total"] = sum(out.values())
    return out

# ---------------------------------------------------------------------------
# Notifications, SLA, SAP outbox, Excel export, Entity scoping (P1 + P2)
# ---------------------------------------------------------------------------
async def _notify_user(user_id: str, title: str, body: str = "", vendor_id: Optional[str] = None):
    await db.notifications.insert_one({
        "id": f"ntf_{uuid.uuid4().hex[:10]}",
        "user_id": user_id,
        "title": title,
        "body": body,
        "vendor_id": vendor_id,
        "read": False,
        "created_at": now_utc(),
    })

async def _notify_role(role: str, title: str, body: str = "", vendor_id: Optional[str] = None, entity: Optional[str] = None):
    q = {"role": role, "is_active": True}
    if entity:
        q["entity"] = {"$in": [entity, None]}
    async for u in db.users.find(q, {"user_id": 1}):
        await _notify_user(u["user_id"], title, body, vendor_id)

def _days_in_status(v: dict) -> Optional[float]:
    wf = v.get("workflow") or []
    if not wf:
        return None
    last = wf[-1].get("performed_at") or v.get("updated_at")
    if not last:
        return None
    if isinstance(last, str):
        try:
            last = datetime.fromisoformat(last)
        except ValueError:
            return None
    if last.tzinfo is None:
        last = last.replace(tzinfo=timezone.utc)
    delta = now_utc() - last
    return delta.total_seconds() / 86400.0

@api.get("/notifications")
async def list_notifications(user: dict = Depends(get_current_user)):
    cursor = db.notifications.find({"user_id": user["user_id"]}, {"_id": 0}).sort("created_at", -1).limit(50)
    return [n async for n in cursor]

@api.post("/notifications/{notification_id}/read")
async def mark_notification_read(notification_id: str, user: dict = Depends(get_current_user)):
    await db.notifications.update_one(
        {"id": notification_id, "user_id": user["user_id"]},
        {"$set": {"read": True}}
    )
    return {"ok": True}

@api.post("/notifications/read-all")
async def mark_all_read(user: dict = Depends(get_current_user)):
    await db.notifications.update_many(
        {"user_id": user["user_id"], "read": False},
        {"$set": {"read": True}}
    )
    return {"ok": True}

@api.get("/sla/alerts")
async def sla_alerts(user: dict = Depends(require_role("reviewer", "approver", "admin", "sap_team"))):
    """Vendors stuck in their current stage > 3 days, and documents expiring within 30 days."""
    out = {"stuck": [], "expiring_docs": []}
    cursor = db.vendors.find(
        {"status": {"$in": ["submitted", "under_review", "on_hold", "approved"]}},
        {"_id": 0, "vendor_id": 1, "general.legal_name": 1, "status": 1, "workflow": 1, "updated_at": 1, "documents": 1}
    ).limit(500)
    today = now_utc().date()
    async for v in cursor:
        days = _days_in_status(v)
        if days is not None and days >= 3:
            out["stuck"].append({
                "vendor_id": v["vendor_id"],
                "legal_name": (v.get("general") or {}).get("legal_name"),
                "status": v["status"],
                "days_in_status": round(days, 1),
            })
        for d in v.get("documents") or []:
            exp = d.get("expiry_date")
            if not exp:
                continue
            try:
                exp_date = datetime.fromisoformat(exp).date() if "T" in exp else datetime.strptime(exp, "%Y-%m-%d").date()
            except ValueError:
                continue
            delta_days = (exp_date - today).days
            if delta_days <= 30:
                out["expiring_docs"].append({
                    "vendor_id": v["vendor_id"],
                    "legal_name": (v.get("general") or {}).get("legal_name"),
                    "document_type": d["document_type"],
                    "expiry_date": exp,
                    "days_left": delta_days,
                })
    return out

# ---- Mock SAP integration (production-swappable outbox pattern) ----
class SapPushIn(BaseModel):
    company_code: str
    account_group: str = "KRED"
    payment_terms: str = "NT30"

    @field_validator("company_code")
    @classmethod
    def _cc(cls, v):
        if v not in ALLOWED_COMPANY_CODES:
            raise ValueError(f"company_code must be one of {sorted(ALLOWED_COMPANY_CODES)}")
        return v

    @field_validator("account_group")
    @classmethod
    def _ag(cls, v):
        if v.upper() not in ALLOWED_ACCT_GROUPS:
            raise ValueError(f"account_group must be one of {sorted(ALLOWED_ACCT_GROUPS)}")
        return v.upper()

async def _mock_bapi_vendor_create(payload: dict) -> dict:
    """Simulates BAPI_VENDOR_CREATE. In production swap with real SAP/OData/IDoc call."""
    sap_code = f"4{int(time.time() * 1000) % 100000:05d}"
    return {
        "ok": True,
        "sap_vendor_code": sap_code,
        "company_code": payload["company_code"],
        "messages": [
            {"type": "S", "id": "F2", "number": "012", "message": f"Vendor {sap_code} created in company code {payload['company_code']}"},
        ],
        "processed_at": now_utc().isoformat(),
    }

@api.post("/vendors/{vendor_id}/sap-push")
async def sap_push(vendor_id: str, body: SapPushIn, user: dict = Depends(require_role("sap_team", "admin"))):
    v = await db.vendors.find_one({"vendor_id": vendor_id})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if v["status"] != "approved":
        raise HTTPException(status_code=400, detail="Vendor must be approved before SAP push")
    # Idempotency: reject duplicate mapping BEFORE calling SAP to avoid orphaned outbox rows
    if any(m["company_code"] == body.company_code for m in (v.get("sap_mappings") or [])):
        raise HTTPException(status_code=400, detail="Company code already mapped")

    outbox_id = f"out_{uuid.uuid4().hex[:10]}"
    outbox_doc = {
        "outbox_id": outbox_id,
        "vendor_id": vendor_id,
        "company_code": body.company_code,
        "payload": {
            "vendor_id": vendor_id,
            "name": (v.get("general") or {}).get("legal_name"),
            "pan": (v.get("compliance") or {}).get("pan"),
            "gstin": (v.get("compliance") or {}).get("gstin"),
            "bank": v.get("bank"),
            "company_code": body.company_code,
            "account_group": body.account_group,
            "payment_terms": body.payment_terms,
        },
        "status": "pending",
        "attempts": 0,
        "created_at": now_utc(),
        "created_by": user["user_id"],
    }
    await db.sap_outbox.insert_one(outbox_doc)

    # Attempt mock push
    try:
        result = await _mock_bapi_vendor_create(outbox_doc["payload"])
        await db.sap_outbox.update_one(
            {"outbox_id": outbox_id},
            {"$set": {"status": "done", "attempts": 1, "result": result, "completed_at": now_utc()}}
        )
        # Persist mapping on vendor (duplicate guard happens upfront above)
        mapping = {
            "mapping_id": f"map_{uuid.uuid4().hex[:8]}",
            "company_code": body.company_code,
            "sap_vendor_code": result["sap_vendor_code"],
            "account_group": body.account_group,
            "payment_terms": body.payment_terms,
            "created_in_sap": True,
            "sap_created_at": now_utc(),
            "created_by": user["user_id"],
            "outbox_id": outbox_id,
        }
        set_updates = {"updated_at": now_utc()}
        if not v.get("vendor_code"):
            set_updates["vendor_code"] = result["sap_vendor_code"]
        await db.vendors.update_one(
            {"vendor_id": vendor_id},
            {"$push": {"sap_mappings": mapping}, "$set": set_updates}
        )
        await _notify_user(v["owner_user_id"],
                           title=f"You're live in SAP — {result['sap_vendor_code']}",
                           body=f"Created in company code {body.company_code} (account group {body.account_group}).",
                           vendor_id=vendor_id)
        v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
        return {"ok": True, "outbox_id": outbox_id, "result": result, "vendor": vendor_public(v)}
    except HTTPException:
        raise
    except Exception as e:
        await db.sap_outbox.update_one(
            {"outbox_id": outbox_id},
            {"$set": {"status": "failed", "attempts": 1, "error": str(e)}}
        )
        raise HTTPException(status_code=502, detail=f"SAP push failed: {e}")

@api.get("/sap-outbox")
async def list_outbox(user: dict = Depends(require_role("sap_team", "admin"))):
    cursor = db.sap_outbox.find({}, {"_id": 0}).sort("created_at", -1).limit(100)
    return [doc async for doc in cursor]

# ---- Excel export ----
@api.get("/export/vendors.xlsx")
async def export_vendors_xlsx(user: dict = Depends(require_role("admin", "approver", "reviewer", "sap_team"))):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Vendors"
    headers = [
        "Vendor ID", "SAP Code", "Legal Name", "Trade Name", "Type", "Status",
        "GSTIN", "PAN", "TAN", "MSME #", "GST Category",
        "Bank Name", "Account #", "IFSC",
        "City", "State", "Pincode", "Country",
        "Email", "Phone",
        "Submitted At", "Approved At", "Days in Status",
    ]
    ws.append(headers)
    cursor = db.vendors.find({}, {"_id": 0}).sort("updated_at", -1).limit(2000)
    async for v in cursor:
        g = v.get("general") or {}
        c = v.get("compliance") or {}
        b = v.get("bank") or {}
        days = _days_in_status(v)
        ws.append([
            v.get("vendor_id"), v.get("vendor_code"),
            g.get("legal_name"), g.get("trade_name"),
            v.get("vendor_type"), v.get("status"),
            c.get("gstin"), c.get("pan"), c.get("tan"), c.get("msme_number"), c.get("gst_category"),
            b.get("bank_name"), b.get("account_number"), b.get("ifsc_code"),
            g.get("city"), g.get("state"), g.get("pincode"), g.get("country"),
            g.get("email"), g.get("phone"),
            v.get("submitted_at").isoformat() if v.get("submitted_at") else None,
            v.get("approved_at").isoformat() if v.get("approved_at") else None,
            round(days, 2) if days is not None else None,
        ])
    # Style header row
    from openpyxl.styles import Font, PatternFill, Alignment
    header_font = Font(bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="1F4E79", end_color="1F4E79", fill_type="solid")
    for col in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="left", vertical="center")
    # Column widths
    for col_idx, h in enumerate(headers, 1):
        ws.column_dimensions[openpyxl.utils.get_column_letter(col_idx)].width = max(14, len(h) + 2)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    fname = f"vendors_{now_utc().strftime('%Y%m%d_%H%M')}.xlsx"
    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{fname}"'}
    )

# ---------------------------------------------------------------------------
# Iter 3 — Categories, Compliance (stub), Settings: change-password & prefs
# ---------------------------------------------------------------------------

# ---- Categories ----
class CategoryFamilyIn(BaseModel):
    name: str

class CategorySubIn(BaseModel):
    name: str
    tier: str = "Tier 2"
    sla: str = "45d"

DEFAULT_TAXONOMY = [
    {"name": "Direct materials", "featured": True, "children": [
        {"name": "Mechanical components", "tier": "Tier 1-3", "sla": "30/45/60d", "vendor_count": 32},
        {"name": "Electrical & electronics", "tier": "Tier 1-2", "sla": "30/45d", "vendor_count": 21},
        {"name": "Polymers & rubber", "tier": "Tier 2-3", "sla": "45/60d", "vendor_count": 18},
        {"name": "Castings & forgings", "tier": "Tier 1", "sla": "30d", "vendor_count": 13},
    ]},
    {"name": "Indirect spend", "featured": False, "children": [
        {"name": "Office supplies", "tier": "Tier 3", "sla": "60d", "vendor_count": 24},
        {"name": "Facilities & maintenance", "tier": "Tier 2", "sla": "45d", "vendor_count": 31},
        {"name": "Travel & hospitality", "tier": "Tier 2", "sla": "45d", "vendor_count": 17},
        {"name": "Marketing services", "tier": "Tier 2", "sla": "45d", "vendor_count": 19},
    ]},
    {"name": "Logistics", "featured": False, "children": [
        {"name": "Inbound freight", "tier": "Tier 1", "sla": "30d", "vendor_count": 14},
        {"name": "Outbound distribution", "tier": "Tier 1", "sla": "30d", "vendor_count": 16},
        {"name": "Warehousing 3PL", "tier": "Tier 2", "sla": "45d", "vendor_count": 8},
    ]},
    {"name": "Professional services", "featured": False, "children": [
        {"name": "Legal & compliance", "tier": "Tier 1", "sla": "30d", "vendor_count": 6},
        {"name": "IT & SaaS", "tier": "Tier 2", "sla": "45d", "vendor_count": 22},
        {"name": "Consulting", "tier": "Tier 1", "sla": "30d", "vendor_count": 6},
    ]},
]

async def _seed_taxonomy_if_empty():
    cnt = await db.categories.count_documents({})
    if cnt > 0:
        return
    for fam in DEFAULT_TAXONOMY:
        await db.categories.insert_one({
            "family_id": f"fam_{uuid.uuid4().hex[:8]}",
            "name": fam["name"],
            "featured": fam.get("featured", False),
            "vendor_count": sum(c["vendor_count"] for c in fam["children"]),
            "children": [{
                "sub_id": f"sub_{uuid.uuid4().hex[:8]}",
                **c,
            } for c in fam["children"]],
            "created_at": now_utc(),
        })

@api.get("/categories")
async def list_categories(user: dict = Depends(get_current_user)):
    await _seed_taxonomy_if_empty()
    cursor = db.categories.find({}, {"_id": 0}).sort("name", 1)
    return [doc async for doc in cursor]

@api.post("/categories")
async def create_family(body: CategoryFamilyIn, user: dict = Depends(require_role("admin"))):
    doc = {
        "family_id": f"fam_{uuid.uuid4().hex[:8]}",
        "name": body.name,
        "featured": False,
        "vendor_count": 0,
        "children": [],
        "created_at": now_utc(),
    }
    await db.categories.insert_one(doc)
    return {k: v for k, v in doc.items() if k != "_id"}

@api.post("/categories/{family_id}/sub")
async def create_sub(family_id: str, body: CategorySubIn, user: dict = Depends(require_role("admin"))):
    sub = {
        "sub_id": f"sub_{uuid.uuid4().hex[:8]}",
        "name": body.name,
        "tier": body.tier,
        "sla": body.sla,
        "vendor_count": 0,
    }
    res = await db.categories.update_one(
        {"family_id": family_id},
        {"$push": {"children": sub}}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Family not found")
    return sub

@api.delete("/categories/{family_id}/sub/{sub_id}")
async def delete_sub(family_id: str, sub_id: str, user: dict = Depends(require_role("admin"))):
    await db.categories.update_one(
        {"family_id": family_id},
        {"$pull": {"children": {"sub_id": sub_id}}}
    )
    return {"ok": True}

# ---- Compliance Validation (stubbed external APIs) ----
def _stub_compliance_checks(v: dict) -> list:
    """Stubbed responses; replace with real ClearTax/GSTN/MCA21/OFAC providers when keys are available."""
    c = v.get("compliance") or {}
    g = v.get("general") or {}
    b = v.get("bank") or {}
    checks = []

    # 1. GSTIN status
    if c.get("gstin") and GSTIN_RE.match(c["gstin"]):
        checks.append({"name": "GSTIN active (GSTN)", "status": "Pass", "tone": "emerald",
                       "detail": f"{c['gstin']} · Active · stub response (no live ClearTax key)"})
    elif c.get("gstin"):
        checks.append({"name": "GSTIN active (GSTN)", "status": "Fail", "tone": "rose",
                       "detail": "GSTIN format invalid"})
    else:
        checks.append({"name": "GSTIN active (GSTN)", "status": "Warn", "tone": "amber",
                       "detail": "No GSTIN on file"})

    # 2. PAN ↔ Legal name
    if c.get("pan") and PAN_RE.match(c["pan"]):
        checks.append({"name": "PAN ↔ Legal name match", "status": "Pass", "tone": "emerald",
                       "detail": f"PAN {c['pan']} matches '{g.get('legal_name', '—')}' (stubbed)"})
    elif c.get("pan"):
        checks.append({"name": "PAN ↔ Legal name match", "status": "Fail", "tone": "rose",
                       "detail": "PAN format invalid"})
    else:
        checks.append({"name": "PAN ↔ Legal name match", "status": "Fail", "tone": "rose",
                       "detail": "PAN is required"})

    # 3. MSME / Udyam
    if c.get("msme_number"):
        checks.append({"name": "MSME / Udyam certificate", "status": "Pass", "tone": "emerald",
                       "detail": f"{c['msme_number']} · valid (stubbed)"})
    elif v.get("vendor_type") == "msme":
        checks.append({"name": "MSME / Udyam certificate", "status": "Fail", "tone": "rose",
                       "detail": "Required for MSME vendor type"})
    else:
        checks.append({"name": "MSME / Udyam certificate", "status": "Pass", "tone": "emerald",
                       "detail": "N/A — not registered as MSME"})

    # 4. MCA21 entity status
    if g.get("legal_name"):
        checks.append({"name": "MCA21 entity status", "status": "Pass", "tone": "emerald",
                       "detail": "Active (stub — wire MCA21 API)"})
    else:
        checks.append({"name": "MCA21 entity status", "status": "Warn", "tone": "amber",
                       "detail": "Legal name missing"})

    # 5. Bank account penny-drop
    if b.get("account_number") and b.get("ifsc_code") and IFSC_RE.match(b["ifsc_code"]):
        checks.append({"name": "Bank account penny-drop", "status": "Pass", "tone": "emerald",
                       "detail": f"{b['ifsc_code']} · holder name matched (stubbed)"})
    else:
        checks.append({"name": "Bank account penny-drop", "status": "Warn", "tone": "amber",
                       "detail": "Bank details incomplete or IFSC invalid"})

    # 6. OFAC / sanctions
    checks.append({"name": "OFAC / sanctions screening", "status": "Pass", "tone": "emerald",
                   "detail": "No matches across 14 sanctions lists (stubbed)"})

    # 7. EPF / ESIC (random-ish warn for color)
    if c.get("tan"):
        checks.append({"name": "EPF / ESIC compliance", "status": "Pass", "tone": "emerald",
                       "detail": f"TAN {c['tan']} · last ECR filing OK (stub)"})
    else:
        checks.append({"name": "EPF / ESIC compliance", "status": "Warn", "tone": "amber",
                       "detail": "TAN not provided — manual confirmation needed"})

    # 8. Doc expiries
    expiring = [d for d in (v.get("documents") or []) if d.get("expiry_date")]
    if expiring:
        checks.append({"name": "Certificate validity", "status": "Warn", "tone": "amber",
                       "detail": f"{len(expiring)} document(s) have expiry tracking — see Expiring docs panel"})
    else:
        checks.append({"name": "Certificate validity", "status": "Pass", "tone": "emerald",
                       "detail": "No time-limited documents uploaded"})
    return checks

@api.get("/compliance/{vendor_id}")
async def get_compliance(vendor_id: str, user: dict = Depends(get_current_user)):
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    if user["role"] == "vendor" and v["owner_user_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Forbidden")
    # Return cached if recent (< 1 hour), else recompute
    cached = await db.compliance_dossiers.find_one({"vendor_id": vendor_id}, {"_id": 0})
    if cached:
        ts = cached.get("ran_at")
        if isinstance(ts, str):
            ts = datetime.fromisoformat(ts)
        if ts and (now_utc() - ts.replace(tzinfo=timezone.utc) if ts.tzinfo is None else now_utc() - ts).total_seconds() < 3600:
            return cached
    checks = _stub_compliance_checks(v)
    doc = {
        "vendor_id": vendor_id,
        "vendor_code": v.get("vendor_code"),
        "legal_name": (v.get("general") or {}).get("legal_name"),
        "checks": checks,
        "ran_at": now_utc(),
        "last_run_ago": "now",
    }
    await db.compliance_dossiers.update_one({"vendor_id": vendor_id}, {"$set": doc}, upsert=True)
    return {k: v for k, v in doc.items() if k != "_id"}

@api.post("/compliance/{vendor_id}/run")
async def run_compliance(vendor_id: str, user: dict = Depends(require_role("reviewer", "approver", "admin"))):
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    checks = _stub_compliance_checks(v)
    doc = {
        "vendor_id": vendor_id,
        "vendor_code": v.get("vendor_code"),
        "legal_name": (v.get("general") or {}).get("legal_name"),
        "checks": checks,
        "ran_at": now_utc(),
        "last_run_ago": "now",
    }
    await db.compliance_dossiers.update_one({"vendor_id": vendor_id}, {"$set": doc}, upsert=True)
    return {k: v for k, v in doc.items() if k != "_id"}

# ---- Settings: change password & notification prefs ----
class ChangePasswordIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)

@api.post("/auth/change-password")
async def change_password(body: ChangePasswordIn, user: dict = Depends(get_current_user)):
    full = await db.users.find_one({"user_id": user["user_id"]})
    if not full or not verify_password(body.current_password, full.get("password_hash", "")):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    await db.users.update_one(
        {"user_id": user["user_id"]},
        {"$set": {"password_hash": hash_password(body.new_password)}}
    )
    return {"ok": True}

class NotificationPrefsIn(BaseModel):
    in_app: bool = True
    email_workflow: bool = False
    email_sla: bool = False

@api.post("/auth/notification-prefs")
async def save_notification_prefs(body: NotificationPrefsIn, user: dict = Depends(get_current_user)):
    await db.users.update_one(
        {"user_id": user["user_id"]},
        {"$set": {"notification_prefs": body.model_dump()}}
    )
    return {"ok": True}

# ---------------------------------------------------------------------------
# Iter 4 — Purchase Orders + Goods Receipt Notes (PO & GRN)
# ---------------------------------------------------------------------------
class POLineIn(BaseModel):
    sku: str
    description: str
    qty: float
    unit_price: float
    uom: str = "EA"

class POIn(BaseModel):
    vendor_id: str
    buyer: str
    plant: str
    po_date: Optional[str] = None
    lines: List[POLineIn]

class GRNIn(BaseModel):
    po_id: str
    received_at: Optional[str] = None
    lines: List[dict]  # [{sku, qty_received, qty_rejected, note}]
    inspection_note: Optional[str] = None

def _po_status(po: dict) -> str:
    received = sum(g.get("qty_received", 0) for g in (po.get("grn_history") or []))
    ordered = sum(l["qty"] for l in po["lines"])
    if received == 0:
        return "Open"
    if received < ordered:
        return "Partial"
    return "Delivered"

def _po_total(po: dict) -> float:
    return sum(l["qty"] * l["unit_price"] for l in po["lines"])

async def _seed_pos_if_empty():
    if await db.purchase_orders.count_documents({}) > 0:
        return
    vendor_ids = []
    async for v in db.vendors.find({"status": "approved"}, {"vendor_id": 1, "general.legal_name": 1}).limit(5):
        vendor_ids.append((v["vendor_id"], (v.get("general") or {}).get("legal_name") or "Vendor"))
    if not vendor_ids:
        # Use first available vendor regardless of status as fallback
        async for v in db.vendors.find({}, {"vendor_id": 1, "general.legal_name": 1}).limit(5):
            vendor_ids.append((v["vendor_id"], (v.get("general") or {}).get("legal_name") or "Vendor"))
    if not vendor_ids:
        return

    samples = [
        {"buyer": "Plant 2 · Pune",       "plant": "PUN-2",  "lines": [
            {"sku": "BRG-6204", "description": "Deep groove bearing 6204",     "qty": 50,  "unit_price": 320,  "uom": "EA"},
            {"sku": "GSK-A12",  "description": "Industrial gasket A12",         "qty": 80,  "unit_price": 145,  "uom": "EA"},
        ]},
        {"buyer": "Plant 1 · Pune",       "plant": "PUN-1",  "lines": [
            {"sku": "FLG-F32",  "description": "Forged flange F32 — 4 inch",    "qty": 30,  "unit_price": 12400, "uom": "EA"},
            {"sku": "FLG-F40",  "description": "Forged flange F40 — 6 inch",    "qty": 24,  "unit_price": 18900, "uom": "EA"},
        ]},
        {"buyer": "Plant 2 · Pune",       "plant": "PUN-2",  "lines": [
            {"sku": "KIT-S04",  "description": "Maintenance spare kit S04",     "qty": 18,  "unit_price": 3760,  "uom": "KIT"},
        ]},
        {"buyer": "R&D · Bengaluru",      "plant": "BLR-RD", "lines": [
            {"sku": "PRT-H17",  "description": "Prototype housing H17 (CAD-N)", "qty": 1,   "unit_price": 412300, "uom": "EA"},
        ]},
        {"buyer": "Plant 1 · Pune",       "plant": "PUN-1",  "lines": [
            {"sku": "SCR-M10",  "description": "Hex bolt M10 x 60 zinc plated", "qty": 1200,"unit_price": 18,    "uom": "EA"},
            {"sku": "NUT-M10",  "description": "Hex nut M10 zinc plated",       "qty": 1200,"unit_price": 9,     "uom": "EA"},
        ]},
    ]
    now = now_utc()
    for i, s in enumerate(samples):
        vid, vname = vendor_ids[i % len(vendor_ids)]
        po_no = f"PO-26-0{4881 - i*23}"
        await db.purchase_orders.insert_one({
            "po_id": f"po_{uuid.uuid4().hex[:10]}",
            "po_number": po_no,
            "vendor_id": vid,
            "vendor_name": vname,
            "buyer": s["buyer"],
            "plant": s["plant"],
            "po_date": (now - timedelta(days=2 + i*3)).isoformat(),
            "lines": s["lines"],
            "grn_history": [],
            "status": "Open",
            "created_at": now,
        })

@api.get("/purchase-orders")
async def list_pos(vendor_id: Optional[str] = None, user: dict = Depends(get_current_user)):
    await _seed_pos_if_empty()
    q = {}
    if user["role"] == "vendor":
        # vendors only see POs for their own vendor record
        mine = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"vendor_id": 1})
        if not mine:
            return []
        q["vendor_id"] = mine["vendor_id"]
    elif vendor_id:
        q["vendor_id"] = vendor_id
    out = []
    cursor = db.purchase_orders.find(q, {"_id": 0}).sort("po_date", -1).limit(200)
    async for po in cursor:
        po["status"] = _po_status(po)
        po["total_amount"] = _po_total(po)
        po["line_count"] = len(po["lines"])
        out.append(po)
    return out

@api.post("/purchase-orders")
async def create_po(body: POIn, user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    v = await db.vendors.find_one({"vendor_id": body.vendor_id}, {"general.legal_name": 1})
    if not v:
        raise HTTPException(status_code=404, detail="Vendor not found")
    next_num = await db.purchase_orders.count_documents({}) + 4900
    po = {
        "po_id": f"po_{uuid.uuid4().hex[:10]}",
        "po_number": f"PO-26-{next_num:05d}",
        "vendor_id": body.vendor_id,
        "vendor_name": (v.get("general") or {}).get("legal_name"),
        "buyer": body.buyer,
        "plant": body.plant,
        "po_date": body.po_date or now_utc().isoformat(),
        "lines": [l.model_dump() for l in body.lines],
        "grn_history": [],
        "status": "Open",
        "created_at": now_utc(),
        "created_by": user["user_id"],
    }
    await db.purchase_orders.insert_one(po)
    po["total_amount"] = _po_total(po)
    po["line_count"] = len(po["lines"])
    po.pop("_id", None)
    return po

@api.get("/purchase-orders/{po_id}")
async def get_po(po_id: str, user: dict = Depends(get_current_user)):
    po = await db.purchase_orders.find_one({"po_id": po_id}, {"_id": 0})
    if not po:
        raise HTTPException(status_code=404, detail="PO not found")
    if user["role"] == "vendor":
        mine = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"vendor_id": 1})
        if not mine or po["vendor_id"] != mine["vendor_id"]:
            raise HTTPException(status_code=403, detail="Forbidden")
    po["status"] = _po_status(po)
    po["total_amount"] = _po_total(po)
    return po

# ---- GRNs ----
async def _seed_grns_if_empty():
    if await db.grns.count_documents({}) > 0:
        return
    pos = []
    async for p in db.purchase_orders.find({}).limit(3):
        pos.append(p)
    if not pos:
        return
    samples = [
        {"po_idx": 0, "qty_received": 82, "qty_rejected": 8, "note": "8 units rejected — surface finish", "tone": "rose",    "status": "Action needed"},
        {"po_idx": 1, "qty_received": 100, "qty_rejected": 0, "note": "Accepted in full",                  "tone": "emerald", "status": "Closed"},
        {"po_idx": 2, "qty_received": 60, "qty_rejected": 0, "note": "Accepted in full",                  "tone": "emerald", "status": "Closed"},
        {"po_idx": 0, "qty_received": 48, "qty_rejected": 2, "note": "2 units pending replacement",       "tone": "amber",   "status": "Awaiting vendor"},
    ]
    now = now_utc()
    for i, s in enumerate(samples):
        if s["po_idx"] >= len(pos):
            continue
        po = pos[s["po_idx"]]
        await db.grns.insert_one({
            "grn_id": f"grn_{uuid.uuid4().hex[:10]}",
            "grn_number": f"GRN-26-{1188 - i*4:04d}",
            "po_id": po["po_id"],
            "po_number": po["po_number"],
            "vendor_id": po["vendor_id"],
            "vendor_name": po.get("vendor_name"),
            "received_at": (now - timedelta(days=2 + i)).isoformat(),
            "qty_received": s["qty_received"],
            "qty_rejected": s["qty_rejected"],
            "qty_ordered": sum(l["qty"] for l in po["lines"]),
            "inspection_note": s["note"],
            "status": s["status"],
            "tone": s["tone"],
            "vendor_acknowledged": s["status"] == "Closed",
            "created_at": now,
        })

@api.get("/grns")
async def list_grns(po_id: Optional[str] = None, user: dict = Depends(get_current_user)):
    await _seed_grns_if_empty()
    q = {}
    if po_id:
        q["po_id"] = po_id
    if user["role"] == "vendor":
        mine = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"vendor_id": 1})
        if not mine:
            return []
        q["vendor_id"] = mine["vendor_id"]
    cursor = db.grns.find(q, {"_id": 0}).sort("received_at", -1).limit(200)
    return [g async for g in cursor]

@api.post("/grns")
async def create_grn(body: GRNIn, user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    po = await db.purchase_orders.find_one({"po_id": body.po_id})
    if not po:
        raise HTTPException(status_code=404, detail="PO not found")
    qty_received = sum(l.get("qty_received", 0) for l in body.lines)
    qty_rejected = sum(l.get("qty_rejected", 0) for l in body.lines)
    qty_ordered = sum(l["qty"] for l in po["lines"])
    next_num = await db.grns.count_documents({}) + 1200
    grn = {
        "grn_id": f"grn_{uuid.uuid4().hex[:10]}",
        "grn_number": f"GRN-26-{next_num:04d}",
        "po_id": body.po_id,
        "po_number": po["po_number"],
        "vendor_id": po["vendor_id"],
        "vendor_name": po.get("vendor_name"),
        "received_at": body.received_at or now_utc().isoformat(),
        "qty_received": qty_received,
        "qty_rejected": qty_rejected,
        "qty_ordered": qty_ordered,
        "inspection_note": body.inspection_note or "Accepted",
        "status": "Closed" if qty_rejected == 0 else "Action needed",
        "tone": "emerald" if qty_rejected == 0 else "rose",
        "vendor_acknowledged": False,
        "lines": body.lines,
        "created_at": now_utc(),
        "created_by": user["user_id"],
    }
    await db.grns.insert_one(grn)
    # Update PO grn_history
    await db.purchase_orders.update_one(
        {"po_id": body.po_id},
        {"$push": {"grn_history": {"grn_id": grn["grn_id"], "qty_received": qty_received, "received_at": grn["received_at"]}}}
    )
    grn.pop("_id", None)
    return grn

@api.post("/grns/{grn_id}/acknowledge")
async def acknowledge_grn(grn_id: str, user: dict = Depends(get_current_user)):
    res = await db.grns.update_one(
        {"grn_id": grn_id},
        {"$set": {"vendor_acknowledged": True, "acknowledged_at": now_utc(), "acknowledged_by": user["user_id"]}}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="GRN not found")
    return {"ok": True}

@api.get("/operations/stats")
async def operations_stats(user: dict = Depends(get_current_user)):
    await _seed_pos_if_empty()
    await _seed_grns_if_empty()
    q = {}
    if user["role"] == "vendor":
        mine = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"vendor_id": 1})
        if not mine:
            return {"open_pos": 0, "pending_grns": 0, "on_time_pct": 0, "rejection_pct": 0}
        q["vendor_id"] = mine["vendor_id"]
    open_pos = 0
    async for p in db.purchase_orders.find(q):
        if _po_status(p) in ("Open", "Partial"):
            open_pos += 1
    pending_grns = await db.grns.count_documents({**q, "vendor_acknowledged": False})
    total_recv = 0
    total_rej = 0
    async for g in db.grns.find(q):
        total_recv += g.get("qty_received", 0)
        total_rej += g.get("qty_rejected", 0)
    rejection_pct = round((total_rej / total_recv * 100), 1) if total_recv > 0 else 0
    return {
        "open_pos": open_pos,
        "pending_grns": pending_grns,
        "on_time_pct": 98.2,  # Placeholder until shipment date tracking added
        "rejection_pct": rejection_pct,
    }

# ---------------------------------------------------------------------------
# Iter 5 — Finance Admin: Invoice Automation + 3-way match + AI OCR
# ---------------------------------------------------------------------------
class InvoiceLineIn(BaseModel):
    sku: Optional[str] = None
    description: str
    qty: float
    unit_price: float
    line_total: float

class InvoiceIn(BaseModel):
    invoice_number: str
    vendor_id: str
    po_id: Optional[str] = None
    grn_id: Optional[str] = None
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None
    payment_terms: Optional[str] = "Net 30"
    currency: str = "INR"
    subtotal: float
    tax_amount: float = 0
    tds_amount: float = 0
    total_amount: float
    lines: List[InvoiceLineIn] = []
    irn: Optional[str] = None  # e-Invoice IRN

def _3way_match(invoice: dict, po: Optional[dict], grn: Optional[dict]) -> dict:
    """3-way match engine: PO ↔ GRN ↔ Invoice. Returns verdict + confidence + flags."""
    flags = []
    score = 0
    total = 0

    # Check 1: PO existence
    total += 1
    if po:
        score += 1
    else:
        flags.append({"severity": "block", "code": "NO_PO", "msg": "No matching PO found"})

    # Check 2: GRN existence
    total += 1
    if grn:
        score += 1
    elif po:
        flags.append({"severity": "block", "code": "NO_GRN", "msg": "GRN missing — goods not received"})

    # Check 3: Vendor matches
    if po:
        total += 1
        if po["vendor_id"] == invoice["vendor_id"]:
            score += 1
        else:
            flags.append({"severity": "block", "code": "VENDOR_MISMATCH", "msg": "Invoice vendor != PO vendor"})

    # Check 4: Amount tolerance (5%)
    if po:
        total += 1
        po_total = sum(l["qty"] * l["unit_price"] for l in po["lines"])
        diff_pct = abs(invoice["subtotal"] - po_total) / po_total * 100 if po_total > 0 else 100
        if diff_pct <= 5:
            score += 1
        elif diff_pct <= 10:
            score += 0.5
            flags.append({"severity": "warn", "code": "AMOUNT_VAR", "msg": f"Amount variance {diff_pct:.1f}% (>5% tolerance)"})
        else:
            flags.append({"severity": "block", "code": "AMOUNT_VAR", "msg": f"Amount variance {diff_pct:.1f}%"})

    # Check 5: Quantity match
    if po and grn:
        total += 1
        qty_invoiced = sum(l["qty"] for l in invoice.get("lines", []))
        if grn.get("qty_received") and qty_invoiced > 0:
            diff = abs(qty_invoiced - grn["qty_received"]) / grn["qty_received"] * 100
            if diff <= 2:
                score += 1
            else:
                flags.append({"severity": "warn", "code": "QTY_MISMATCH", "msg": f"Qty mismatch: {qty_invoiced} invoiced vs {grn['qty_received']} received"})

    # Check 6: Date sanity
    total += 1
    if invoice.get("invoice_date") and po and po.get("po_date"):
        try:
            inv_d = datetime.fromisoformat(invoice["invoice_date"].replace("Z", "+00:00"))
            po_d = datetime.fromisoformat(po["po_date"].replace("Z", "+00:00"))
            if inv_d >= po_d:
                score += 1
            else:
                flags.append({"severity": "warn", "code": "DATE_PRE_PO", "msg": "Invoice dated before PO"})
        except (ValueError, AttributeError):
            score += 1
    else:
        score += 1

    confidence = round(score / total * 100, 1) if total > 0 else 0
    has_block = any(f["severity"] == "block" for f in flags)

    if has_block:
        verdict = "blocked"
        match_label = flags[0]["msg"] if flags else "Blocked"
        tone = "rose"
    elif any(f["severity"] == "warn" for f in flags):
        verdict = "held"
        match_label = flags[0]["msg"]
        tone = "amber"
    else:
        verdict = "auto_approved"
        match_label = "3-way ✓"
        tone = "emerald"

    return {
        "verdict": verdict,
        "confidence": confidence,
        "match_label": match_label,
        "tone": tone,
        "flags": flags,
        "score": score,
        "total_checks": total,
    }

async def _seed_invoices_if_empty():
    if await db.invoices.count_documents({}) > 0:
        return
    pos = []
    async for p in db.purchase_orders.find({}).limit(5):
        pos.append(p)
    grns = {}
    async for g in db.grns.find({}):
        grns[g["po_id"]] = g
    if not pos:
        return

    samples = [
        {"po_idx": 0, "tds_rate": 0.02, "amount_factor": 1.0},   # 3-way OK
        {"po_idx": 1, "tds_rate": 0.02, "amount_factor": 1.08},  # qty/amount variance
        {"po_idx": 2, "tds_rate": 0.02, "amount_factor": 1.0},   # 3-way OK
        {"po_idx": 3, "tds_rate": 0.02, "amount_factor": 1.0, "skip_grn": True},  # GRN missing
        {"po_idx": 4, "tds_rate": 0.02, "amount_factor": 1.0},   # 3-way OK
    ]
    now = now_utc()
    for i, s in enumerate(samples):
        if s["po_idx"] >= len(pos):
            continue
        po = pos[s["po_idx"]]
        subtotal = sum(l["qty"] * l["unit_price"] for l in po["lines"]) * s["amount_factor"]
        tax = subtotal * 0.18
        tds = subtotal * s["tds_rate"]
        total = subtotal + tax
        grn = grns.get(po["po_id"]) if not s.get("skip_grn") else None

        inv = {
            "invoice_id": f"inv_{uuid.uuid4().hex[:10]}",
            "invoice_number": f"INV/26-27/{102 - i*1:04d}",
            "vendor_id": po["vendor_id"],
            "vendor_name": po.get("vendor_name"),
            "po_id": po["po_id"],
            "po_number": po["po_number"],
            "grn_id": grn["grn_id"] if grn else None,
            "grn_number": grn["grn_number"] if grn else None,
            "invoice_date": (now - timedelta(days=i)).isoformat(),
            "due_date": (now + timedelta(days=30 - i*2)).isoformat(),
            "payment_terms": "Net 30" if i % 2 == 0 else "Net 45",
            "currency": "INR",
            "subtotal": round(subtotal, 2),
            "tax_amount": round(tax, 2),
            "tds_amount": round(tds, 2),
            "total_amount": round(total, 2),
            "lines": [{"sku": l.get("sku"), "description": l["description"], "qty": l["qty"], "unit_price": l["unit_price"] * s["amount_factor"], "line_total": l["qty"] * l["unit_price"] * s["amount_factor"]} for l in po["lines"]],
            "irn": f"a1{uuid.uuid4().hex[:38]}".lower(),
            "uploaded_at": now,
            "uploaded_by": "system_seed",
            "match_result": _3way_match({"vendor_id": po["vendor_id"], "subtotal": subtotal, "invoice_date": (now - timedelta(days=i)).isoformat(), "lines": [{"qty": l["qty"]} for l in po["lines"]]}, po, grn),
        }
        # Status from verdict
        inv["status"] = inv["match_result"]["verdict"]
        await db.invoices.insert_one(inv)

@api.get("/invoices")
async def list_invoices(user: dict = Depends(get_current_user)):
    await _seed_invoices_if_empty()
    q = {}
    if user["role"] == "vendor":
        mine = await db.vendors.find_one({"owner_user_id": user["user_id"]}, {"vendor_id": 1})
        if not mine:
            return []
        q["vendor_id"] = mine["vendor_id"]
    cursor = db.invoices.find(q, {"_id": 0}).sort("uploaded_at", -1).limit(200)
    return [inv async for inv in cursor]

@api.post("/invoices")
async def create_invoice(body: InvoiceIn, user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    po = None
    grn = None
    if body.po_id:
        po = await db.purchase_orders.find_one({"po_id": body.po_id})
    if body.grn_id:
        grn = await db.grns.find_one({"grn_id": body.grn_id})

    match = _3way_match(body.model_dump(), po, grn)
    inv = {
        "invoice_id": f"inv_{uuid.uuid4().hex[:10]}",
        **body.model_dump(),
        "vendor_name": (po or {}).get("vendor_name") if po else None,
        "po_number": (po or {}).get("po_number"),
        "grn_number": (grn or {}).get("grn_number"),
        "uploaded_at": now_utc(),
        "uploaded_by": user["user_id"],
        "match_result": match,
        "status": match["verdict"],
    }
    await db.invoices.insert_one(inv)
    inv.pop("_id", None)
    return inv

@api.post("/invoices/{invoice_id}/rerun-match")
async def rerun_match(invoice_id: str, user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    inv = await db.invoices.find_one({"invoice_id": invoice_id})
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    po = await db.purchase_orders.find_one({"po_id": inv.get("po_id")}) if inv.get("po_id") else None
    grn = await db.grns.find_one({"grn_id": inv.get("grn_id")}) if inv.get("grn_id") else None
    match = _3way_match(inv, po, grn)
    await db.invoices.update_one(
        {"invoice_id": invoice_id},
        {"$set": {"match_result": match, "status": match["verdict"], "match_run_at": now_utc()}}
    )
    updated = await db.invoices.find_one({"invoice_id": invoice_id}, {"_id": 0})
    return updated

@api.post("/invoices/run-bot")
async def run_bot_on_queue(user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    """Run the matching bot on all 'held' or 'pending' invoices in the queue."""
    count = 0
    async for inv in db.invoices.find({"status": {"$in": ["held", "pending"]}}):
        po = await db.purchase_orders.find_one({"po_id": inv.get("po_id")}) if inv.get("po_id") else None
        grn = await db.grns.find_one({"grn_id": inv.get("grn_id")}) if inv.get("grn_id") else None
        match = _3way_match(inv, po, grn)
        await db.invoices.update_one(
            {"invoice_id": inv["invoice_id"]},
            {"$set": {"match_result": match, "status": match["verdict"], "match_run_at": now_utc()}}
        )
        count += 1
    return {"ok": True, "processed": count}

@api.get("/invoices/stats")
async def invoice_stats(user: dict = Depends(get_current_user)):
    await _seed_invoices_if_empty()
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}, "total": {"$sum": "$total_amount"}}}]
    out = {"auto_approved": 0, "held": 0, "blocked": 0, "pending": 0, "scheduled_amount": 0.0}
    async for row in db.invoices.aggregate(pipeline):
        sid = row["_id"]
        if sid in out:
            out[sid] = row["count"]
        if sid == "auto_approved":
            out["scheduled_amount"] += row.get("total", 0)
    out["ocr_accuracy_pct"] = 98.4  # Demo placeholder
    out["total_invoices"] = sum([out["auto_approved"], out["held"], out["blocked"], out["pending"]])
    return out

# ---- Optional: GPT-4o vision invoice OCR (signed Cloudinary URL -> structured data) ----
class InvoiceOCRIn(BaseModel):
    image_url: str

@api.post("/invoices/ocr-extract")
async def invoice_ocr_extract(body: InvoiceOCRIn, user: dict = Depends(require_role("admin", "reviewer", "approver"))):
    """Extract structured invoice data from an image/PDF URL using GPT-4o vision via Emergent LLM key."""
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent
    except ImportError:
        raise HTTPException(status_code=503, detail="OCR integration not available (emergentintegrations missing)")
    key = os.environ.get("EMERGENT_LLM_KEY")
    if not key:
        raise HTTPException(status_code=503, detail="EMERGENT_LLM_KEY not configured")
    chat = LlmChat(api_key=key, session_id=f"ocr_{uuid.uuid4().hex[:8]}",
                   system_message="You are an invoice OCR extractor for Indian B2B invoices. Return a JSON object only with keys: invoice_number, vendor_name, gstin, invoice_date (YYYY-MM-DD), subtotal, tax_amount, tds_amount, total_amount, currency, irn, line_items (array of {description, qty, unit_price, line_total}). Use null for missing fields. No prose.").with_model("openai", "gpt-4o-mini")
    msg = UserMessage(
        text="Extract invoice fields as JSON. Use INR amounts in numbers (no commas, no ₹ symbol).",
        file_contents=[ImageContent(image_url=body.image_url)],
    )
    try:
        reply = await chat.send_message(msg)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"OCR failed: {e}")
    # Try to parse the JSON
    import json as _json
    text = reply.strip()
    if text.startswith("```"):
        text = text.split("```", 2)[-2] if text.count("```") >= 2 else text
        if text.startswith("json"):
            text = text[4:].strip()
    try:
        data = _json.loads(text)
    except _json.JSONDecodeError:
        data = {"raw_text": reply, "_parse_warning": "Model did not return clean JSON"}
    return {"ok": True, "extracted": data}

app.include_router(api)
