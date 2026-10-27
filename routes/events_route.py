from fastapi import APIRouter
from connection import connection_db

events_router = APIRouter(prefix="/events", tags=["events"])

@events_router.get("", status_code=200)
def list_routes():
    conn = connection_db()
    cursor = conn.cursor()
    cursor.execute("SELECT events.id, title, starts_at, ends_at, venues.address FROM events INNER JOIN venues ON events.venue_id = venues.id ORDER BY events.id;")
    rows = cursor.fetchall()
    cursor.close()
    return{"events": [{"id": r[0], "title": r[1], "starts_at": r[2], "ends_at": r[3], "location": r[4]} for r in rows]}