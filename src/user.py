from connection import connection_db
from fastapi import HTTPException

def get_user(email):

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user is None:
        raise HTTPException (
            status_code=401,
            detail={"code": "UNAUTHORISED", "message": "Invalid Credentials"},
        )

    return user


def get_user_by_id(id):

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    user = cursor.fetchone()

    if user is None:
        raise HTTPException (
            status_code=401,
            detail={"code": "UNAUTHORISED", "message": "Invalid Credentials"},
        )

    return user