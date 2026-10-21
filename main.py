import psycopg2

conn = psycopg2.connect(
    dbname="nc_plus_one",
    host="localhost"
)

def removing_data():

    cursor = conn.cursor()

    drop_statement = """DROP TABLE IF EXISTS rsvps; 
    DROP TABLE IF EXISTS events; 
    DROP TABLE IF EXISTS venues; 
    DROP TABLE IF EXISTS users;"""

    cursor.execute(drop_statement)
    conn.commit()
    cursor.close()


def build_tables():

    cursor = conn.cursor()

    build_statement = """CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NUll,
    address TEXT,
    capacity INTEGER
    );

    CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    organiser_id INTEGER REFERENCES users(id),
    venue_id INTEGER REFERENCES venues(id),
    created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE rsvps (
    id SERIAL PRIMARY KEY,
    attendee_id INTEGER REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    created_at TIMESTAMP DEFAULT NOW()
    );"""

    cursor.execute(build_statement)
    conn.commit()
    cursor.close()


def insert_data():

    cursor = conn.cursor()

    insert_statement = """INSERT INTO users (email, password, name)
    VALUES ('craig@kpmg.com', 'password', 'Craig')"""

    cursor.execute(insert_statement)
    conn.commit()
    cursor.close()

def seed():

    removing_data()
    build_tables()


seed()
conn.close()