"""
Vendor Onboarding & Master Data Management Portal — Backend
FastAPI + MongoDB (Motor) + JWT auth + Emergent Google OAuth + Cloudinary uploads
"""
from dotenv import load_dotenv
load_dotenv()

import os
import uuid
import time
import secrets
import bcrypt
import jwt
import httpx
import cloudinary
import cloudinary.utils
import cloudinary.uploader
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Literal
from fastapi import FastAPI, HTTPException, Request, Response, Depends, Query, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
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
    cursor = db.vendors.find(query, {"_id": 0}).sort("updated_at", -1)
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
    if not v.get("general") or not v.get("compliance") or not v.get("bank"):
        raise HTTPException(status_code=400, detail="Complete all required sections before submitting")

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
    v = await db.vendors.find_one({"vendor_id": vendor_id}, {"_id": 0})
    return vendor_public(v)

# ---------------------------------------------------------------------------
# SAP mapping
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
    cursor = db.users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1)
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

app.include_router(api)
