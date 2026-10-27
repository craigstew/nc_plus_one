from connection import connection_db
from fastapi import FastAPI, Request
from src.setup_handler import *
from routes.events_route import events_router

def seed():

    cursor = connection_db().cursor()
    drop_tables(cursor)
    build_tables(cursor)
    insert_data_into_tables(cursor)
    connection_db().commit()


app = FastAPI(title="Event Booking API", debug=True)
app.include_router(events_router)



