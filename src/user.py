from connection import connection_db

def get_user(email):

    conn = connection_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    return user
