import os
from dotenv import load_dotenv
import psycopg2

load_dotenv(".env")

if not os.getenv("DB_NAME"):
    raise RuntimeError("DB_NAME is not set. Add it to your .env file.")

conn = psycopg2.connect(
    dbname=os.environ["DB_NAME"],
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"]
)

def connection_db():
    return conn