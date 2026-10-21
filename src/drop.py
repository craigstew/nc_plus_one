def drop_data():
    return """DROP TABLE IF EXISTS rsvps; 
    DROP TABLE IF EXISTS events; 
    DROP TABLE IF EXISTS venues; 
    DROP TABLE IF EXISTS users;"""