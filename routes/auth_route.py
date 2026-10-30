from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from src.user import get_user
from src.password import verify_password
from src.auth import create_access_token
from src.password import hash_password
from connection import connection_db

auth_router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
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


@auth_router.post("/register", status_code=201)
def register(body: RegisterRequest):

    if(not body.name or not body.email or not body.password):
        raise HTTPException (
            status_code=400,
            detail={"code": "BAD_REQUEST", "message": "Either 'name, 'email' or 'password' is missing!"},
        )

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (body.email,))
    existing_user = cursor.fetchone()

    if existing_user:
        raise HTTPException (
            status_code=409,
            detail={"code": "CONFLICT", "message": "Email already registered"},
        )

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s) RETURNING *",
                   (body.name, body.email, hash_password(body.password))
    )

    row = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return {"user": {"id" : row[0], "name" : row[3], "email" : row[1], "created_at" : row[4]}}