from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

security = HTTPBearer()
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = "HS256"


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    features: List[str]
    icon: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    service: str
    budget: Optional[str] = None
    description: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    service: str
    budget: Optional[str] = None
    description: str


class ConsultationBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    preferred_date: str
    preferred_time: str
    topic: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ConsultationBookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    preferred_date: str
    preferred_time: str
    topic: str
    message: Optional[str] = None


class AdminLogin(BaseModel):
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@api_router.get("/")
async def root():
    return {"message": "Development Services API"}


@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(login: AdminLogin):
    if login.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    access_token = create_access_token({"sub": "admin"})
    return TokenResponse(access_token=access_token)


@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    
    for service in services:
        if isinstance(service.get('created_at'), str):
            service['created_at'] = datetime.fromisoformat(service['created_at'])
    
    return services


@api_router.post("/services", response_model=Service)
async def create_service(service: Service):
    doc = service.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.services.insert_one(doc)
    return service


@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote_request(quote: QuoteRequestCreate):
    quote_obj = QuoteRequest(**quote.model_dump())
    
    doc = quote_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.quotes.insert_one(doc)
    return quote_obj


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests(limit: int = 50, skip: int = 0):
    quotes = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    for quote in quotes:
        if isinstance(quote.get('created_at'), str):
            quote['created_at'] = datetime.fromisoformat(quote['created_at'])
    
    return quotes


@api_router.get("/quotes/count")
async def get_quotes_count():
    total = await db.quotes.count_documents({})
    return {"total": total}


@api_router.patch("/quotes/{quote_id}/status")
async def update_quote_status(quote_id: str, status: str):
    result = await db.quotes.update_one(
        {"id": quote_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    return {"success": True}


@api_router.post("/consultations", response_model=ConsultationBooking)
async def create_consultation(consultation: ConsultationBookingCreate):
    consultation_obj = ConsultationBooking(**consultation.model_dump())
    
    doc = consultation_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.consultations.insert_one(doc)
    return consultation_obj


@api_router.get("/consultations", response_model=List[ConsultationBooking])
async def get_consultations(limit: int = 50, skip: int = 0):
    consultations = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    for consultation in consultations:
        if isinstance(consultation.get('created_at'), str):
            consultation['created_at'] = datetime.fromisoformat(consultation['created_at'])
    
    return consultations


@api_router.get("/consultations/count")
async def get_consultations_count():
    total = await db.consultations.count_documents({})
    return {"total": total}


@api_router.patch("/consultations/{consultation_id}/status")
async def update_consultation_status(consultation_id: str, status: str):
    result = await db.consultations.update_one(
        {"id": consultation_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Consultation not found")
    
    return {"success": True}


@api_router.get("/stats")
async def get_stats():
    total_quotes = await db.quotes.count_documents({})
    pending_quotes = await db.quotes.count_documents({"status": "pending"})
    total_consultations = await db.consultations.count_documents({})
    pending_consultations = await db.consultations.count_documents({"status": "pending"})
    
    return {
        "total_quotes": total_quotes,
        "pending_quotes": pending_quotes,
        "total_consultations": total_consultations,
        "pending_consultations": pending_consultations
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()