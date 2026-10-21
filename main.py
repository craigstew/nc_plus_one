import psycopg2
from connection import connection_db
from src.build import build_table
from src.drop import drop_data

def removing_data():

    cursor = connection_db().cursor()
    cursor.execute(drop_data())
    connection_db().commit()
    cursor.close()

def build_tables():

    cursor = connection_db().cursor()
    cursor.execute(build_table())
    connection_db().commit()
    cursor.close()

def insert_data():

    pass

def seed():

    removing_data()
    build_tables()


seed()
connection_db().close()