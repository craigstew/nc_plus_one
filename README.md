# Northcoders NC_PLUS_ONE – Craig Stewart

**About**

NC_PLUS_ONE is a full-stack application that allows registered users to create, manage and edit events. It features user authentication, a PostgreSQL database and a frontend interface for interacting with event data.

**Setup**

Follow these commands to set up the virtual environment, install the required dependencies and create the database.

```bash
python -m venv .venv
pip install -r requirements.txt
python main.py
```

**Environment Variables**

Create a `.env` file in the root directory of the project and add your database credentials and JWT secret.

Generate a secure JWT secret by running:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the generated value into your `.env` file:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=your_generated_secret_here
```

Replace the empty values with your own database credentials. Make sure `.env` is included in `.gitignore` to prevent sensitive information from being uploaded to GitHub.

**View Database**

Use the following commands to access the PostgreSQL database, view available tables and inspect table contents.

```sql
psql
\c nc_plus_one
\dt
SELECT * FROM table_name;
```

**Running the Application**

To run the application, you will need to start both the backend and frontend servers in separate terminal windows.

**1. Start the backend server**

```bash
uvicorn main:app --reload
```

**2. Start the frontend server**

```bash
npm run dev
```

Once both servers are running successfully, open the following URL in your browser to access the application:

http://localhost:5173/

**Authentication**

Once logged in, users have a session duration of 1 hour before their access token expires. Once the token expires, users will need to log in again to continue using the application.

**Data Persistence**

Please note that any new user accounts registered, events created or existing events edited during a session will be reset to the original starter database once both the backend and frontend servers are stopped and restarted. Any changes made during testing will not be permanently saved.

**Access & Demo Account**

This application is restricted to registered users. A valid login is required to access any of the application's features.

Users can either register a new account or use the demo credentials below to explore the application:

- **Email:** alice@example.com
- **Password:** password123
