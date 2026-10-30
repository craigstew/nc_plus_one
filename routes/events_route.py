from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from connection import connection_db
from src.auth import get_secret
from src.user import get_user_by_id
from src.datetime_check import check_valid_datetime_format
import jwt

class CreateEvent(BaseModel):
    title: str
    description: str
    starts_at: str
    ends_at: str
    venue_id: int

events_router = APIRouter(prefix="/events", tags=["events"])
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

@events_router.get("", status_code=200, dependencies=[Depends(get_current_user)])
def list_routes():
    conn = connection_db()
    cursor = conn.cursor()
    cursor.execute("SELECT events.id, title, starts_at, ends_at, venues.address FROM events INNER JOIN venues ON events.venue_id = venues.id ORDER BY events.id;")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return{"events": [{"id": r[0], "title": r[1], "starts_at": r[2], "ends_at": r[3], "location": r[4]} for r in rows]}


@events_router.get("/{event_id}", status_code=200, dependencies=[Depends(get_current_user)])
def get_event(event_id: str):
    if not event_id.isdigit():
        raise HTTPException (
            status_code=400,
            detail={"code": "BAD_REQUEST", "message": "Event_ID is not Integer!"},
        )

    conn = connection_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT events.id, events.title, events.description, events.starts_at, events.ends_at, venues.name, venues.address, venues.capacity, events.created_at  
        FROM events
        INNER JOIN venues ON events.venue_id = venues.id
        WHERE events.id = %s
        """,
        (event_id,),
    )
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if row is None:
        raise HTTPException (
            status_code=404,
            detail={"code": "NOT_FOUND", "message": "Event not found"},
        )
    return {"events": {
        "id": row[0],
        "title": row[1],
        "description": row[2],
        "starts_at": row[3].isoformat(),
        "ends_at": row[4].isoformat(),
        "location": row[5],
        "address": row[6],
        "capacity": row[7],
        "created_at": row[8].isoformat(),
    }}


@events_router.post("/{event_id}/rsvp", status_code=201, dependencies=[Depends(get_current_user)])
def add_user_to_rsvp(event_id: int, user_id = Depends(get_current_user)):

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM events where id = {event_id}")
    existing_event = cursor.fetchone()

    if not existing_event:
        raise HTTPException (
            status_code=404,
            detail={"code": "NOT_FOUND", "message": "Event not found"},
        )

    cursor.execute(f"SELECT * FROM rsvps WHERE event_id = {event_id} and attendee_id = {user_id}")
    already_rsvp = cursor.fetchone()

    if already_rsvp:
        raise HTTPException (
            status_code=409,
            detail={"code": "CONFLICT", "message": "User has already RSVPed to this event"},
        )

    cursor.execute("INSERT INTO rsvps (attendee_id, event_id) VALUES (%s, %s) RETURNING *", (user_id, event_id))
    new_rsvp = cursor.fetchone()

    conn.commit()
    cursor.close()
    conn.close()

    return {"rsvps": {"id" : new_rsvp[0], "attendee_id" : new_rsvp[1], "event_id" : new_rsvp[2], "created_at" : new_rsvp[3]}}


@events_router.delete("/{event_id}/rsvp/me", status_code=204, dependencies=[Depends(get_current_user)])
def add_rsvp(event_id: int, user_id = Depends(get_current_user)):

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM rsvps WHERE event_id = {event_id} and attendee_id = {user_id}")
    already_rsvp = cursor.fetchone()

    if not already_rsvp:
        raise HTTPException (
            status_code=404,
            detail={"code": "NOT_FOUND", "message": "No RSVP exists for this user on this event"},
        )
    
    cursor.execute("DELETE FROM rsvps WHERE attendee_id = %s AND event_id = %s", (user_id, event_id))
    conn.commit()
    cursor.close()
    conn.close()



@events_router.post("", status_code=201, dependencies=[Depends(get_current_user)])
def create_event(body: CreateEvent, user_id = Depends(get_current_user)):

    if(not body.title or not body.description or not body.starts_at or not body.ends_at or not body.venue_id):
        raise HTTPException (
            status_code=400,
            detail={"code": "BAD_REQUEST", "message": "Either 'title, 'description', 'starts_at', 'ends_at' or 'venue_id' is missing!"},
        )

    conn = connection_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM venues WHERE id = %s", (body.venue_id,))
    existing_venue = cursor.fetchone()

    if not existing_venue:
        raise HTTPException (
            status_code=404,
            detail={"code": "NOT_FOUND", "message": "Venue not found!"},
        )

    check_valid_datetime_format(body.starts_at)
    check_valid_datetime_format(body.ends_at)

    cursor.execute("INSERT INTO events (title, description, starts_at, ends_at, organiser_id, venue_id) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *",
                   (body.title, body.description, body.starts_at, body.ends_at, user_id, body.venue_id)
    )

    row = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()

    return {"event" : {"id": row[0], "title": row[1], "description": row[2], "starts_at": row[3], "ends_at": row[4], "venue_id": row[6], "organiser_id": row[5], "created_at": row[7]}}