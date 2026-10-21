import json
from src.data_handler import load_data

def drop_venues_data(cursor):
    cursor.execute("DROP TABLE IF EXISTS venues;")

def build_venues_data(cursor):
    cursor.execute("""CREATE TABLE venues (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NUll,
        address TEXT,
        capacity INTEGER
        );""")

def inserting_venues_data(cursor):

    data = load_data("db/data/venues.json")

    for venue in data:
        insert_statement = "INSERT INTO venues (name, address, capacity) VALUES (%s, %s, %s);"
        cursor.execute(insert_statement, (venue["name"], venue["address"], venue["capacity"]))