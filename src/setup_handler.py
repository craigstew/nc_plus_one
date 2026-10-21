from src.users import *
from src.venues import *
from src.events import *
from src.rsvps import *

def drop_tables(cursor):
        
    drop_rsvps_data(cursor)
    drop_events_data(cursor)
    drop_venues_data(cursor)
    drop_users_data(cursor)

def build_tables(cursor):

    build_users_data(cursor)
    build_venues_data(cursor)
    build_events_data(cursor)
    build_rsvps_data(cursor)

def insert_data_into_tables(cursor):
    
    inserting_users_data(cursor)
    inserting_venues_data(cursor)
    inserting_events_data(cursor)
    inserting_rsvps_data(cursor)