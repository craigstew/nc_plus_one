from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from connection import connection_db
from src.auth import get_secret
from src.user import get_user_by_id

user_router = APIRouter(prefix="/user", tags=["user"])
bearer_scheme = HTTPBearer(auto_error=False)

def get_current_user(credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)):
    unauthorised = HTTPException (
        status_code=401,
        detail={"code": "NOT_AUTHENTICATED", "message": "User not authenticated!"},
    )

    if credentials is None:
        raise unauthorised

    try:
        payload = jwt.decode(credentials.credentials, get_secret(), "HS256")
        user_id = int(payload["sub"])
    except:
        raise unauthorised

    user = get_user_by_id(user_id)
    if user is None:
        raise HTTPException (
            status_code=401,
            detail={"code": "UNAUTHORISED", "message": "Invalid User ID"},
        )

    return user_id

@user_router.get("/me/events", status_code=200, dependencies=[Depends(get_current_user)])
def find_events_user_rsvp(user_id = Depends(get_current_user)):
    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT events.id, events.title,events.starts_at, rsvps.created_at AS rsvp_date,
        ROW_NUMBER() OVER (ORDER BY events.starts_at, events.id) AS event_rank,
        COUNT(*) OVER () AS total_rsvps
        FROM rsvps
        JOIN events ON events.id = rsvps.event_id
        WHERE rsvps.attendee_id = %s
        ORDER BY events.starts_at, events.id
        """,(user_id,))

    users_rsvps = cursor.fetchall()
    cursor.close()
    conn.close()
    return{"events": [{"id": rsvp[0], "title": rsvp[1], "starts_at": rsvp[2], "rsvp_date": rsvp[3], "event_rank": rsvp[4], "total_rsvps": rsvp[5]} for rsvp in users_rsvps]}