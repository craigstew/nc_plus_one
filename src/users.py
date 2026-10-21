import json

def drop_users_data(cursor):
    cursor.execute("DROP TABLE IF EXISTS users;")

def build_users_data(cursor):
    cursor.execute("""CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );""")

def inserting_users_data(cursor):

    with open("db/data/users.json") as file:
        data = json.load(file)

    for user in data:
        insert_statement = "INSERT INTO users (email, password, name) VALUES (%s, %s, %s);"
        cursor.execute(insert_statement, (user["email"], user["password"], user["name"]))