import json
from src.data_handler import load_data

def drop_rsvps_data(cursor):
    cursor.execute("DROP TABLE IF EXISTS rsvps;")

def build_rsvps_data(cursor):
    cursor.execute("""CREATE TABLE rsvps (
        id SERIAL PRIMARY KEY,
        attendee_id INTEGER REFERENCES users(id),
        event_id INTEGER REFERENCES events(id),
        created_at TIMESTAMP DEFAULT NOW()
        );""")

def inserting_rsvps_data(cursor):

    data = load_data("db/data/rsvps.json")

    for rsvp in data:
        insert_statement = "INSERT INTO rsvps (attendee_id, event_id) VALUES (%s, %s);"
        cursor.execute(insert_statement, (rsvp["attendee_id"], rsvp["event_id"]))