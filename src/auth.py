from fastapi import APIRouter
from datetime import datetime, timezone, timedelta
import jwt
import os

auth_router = APIRouter(prefix="/auth", tags=["auth"])
ALGORITHM = "HS256"

def get_secret():
    secret = os.getenv("JWT_SECRET")
    return secret

def create_access_token(id: int):
    payload = {
        "sub": str(id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    return jwt.encode(payload, get_secret(), algorithm=ALGORITHM)
    
