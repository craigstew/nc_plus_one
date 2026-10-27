from fastapi import APIRouter, HTTPException
from connection import connection_db

events_router = APIRouter(prefix="/events", tags=["events"])

@events_router.get("", status_code=200)
def list_routes():
    conn = connection_db()
    cursor = conn.cursor()
    cursor.execute("SELECT events.id, title, starts_at, ends_at, venues.address FROM events INNER JOIN venues ON events.venue_id = venues.id ORDER BY events.id;")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return{"events": [{"id": r[0], "title": r[1], "starts_at": r[2], "ends_at": r[3], "location": r[4]} for r in rows]}


@events_router.get("/{event_id}")
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