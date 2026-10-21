import json
from src.data_handler import load_data

def drop_events_data(cursor):
    cursor.execute("DROP TABLE IF EXISTS events;")

def build_events_data(cursor):
    cursor.execute("""CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        starts_at TIMESTAMP NOT NULL,
        ends_at TIMESTAMP NOT NULL,
        organiser_id INTEGER REFERENCES users(id),
        venue_id INTEGER REFERENCES venues(id),
        created_at TIMESTAMP DEFAULT NOW()
        );""")

def inserting_events_data(cursor):

    data = load_data("db/data/events.json")

    for event in data:
        insert_statement = "INSERT INTO events (title, description, starts_at, ends_at, organiser_id, venue_id) VALUES (%s, %s, %s, %s, %s, %s);"
        cursor.execute(insert_statement, (event["title"], event["description"], event["starts_at"], event["ends_at"], event["organiser_id"], event["venue_id"]))