from connection import connection_db
from src.setup_handler import *

def seed():

    cursor = connection_db().cursor()
    drop_tables(cursor)
    build_tables(cursor)
    insert_data_into_tables(cursor)
    connection_db().commit()

seed()
connection_db().close()