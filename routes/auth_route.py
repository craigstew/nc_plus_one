from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from src.user import get_user
from src.password import verify_password
from src.auth import create_access_token

auth_router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str


@auth_router.post("/login")
def login(body: LoginRequest):

    if(not body.email or not body.password):
        raise HTTPException (
            status_code=400,
            detail={"code": "BAD_REQUEST", "message": "Either 'email' or 'password' is missing!"},
        )

    user = get_user(body.email)

    if verify_password(body.password, user[2]):
        return {
            "access_token": create_access_token(user[0]),
            "token_type": "bearer"
        }
    else:
        raise HTTPException (
            status_code=401,
            detail={"code": "UNAUTHORISED", "message": "Invalid Credentials"},
        )