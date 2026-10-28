from connection import connection_db
from fastapi import FastAPI, Request
from src.setup_handler import *
from routes.events_route import events_router
from routes.auth_route import auth_router
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse

def seed():

    conn = connection_db()
    cursor = conn.cursor()
    drop_tables(cursor)
    build_tables(cursor)
    insert_data_into_tables(cursor)
    conn.commit()
    cursor.close()
    conn.close()


app = FastAPI(title="Event Booking API", debug=True)
app.include_router(events_router)
app.include_router(auth_router)

@app.exception_handler(HTTPException)
def handle_http_exception(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"error": exc.detail})

