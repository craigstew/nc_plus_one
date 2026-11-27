
# Northcoders Project 1 – Craig Stewart

## ⚙️ Setup

1. **Create a virtual environment**
   ```bash
   python -m venv .venv
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create the database**
   ```bash
   python main.py
   ```

## 🗄️ Viewing the Database

1. **Open PostgreSQL**
   ```bash
   psql
   ```

2. **Connect to the database**
   ```sql
   \c nc_plus_one
   ```

3. **View available tables**
   ```sql
   \dt
   ```

4. **View table contents**
   ```sql
   SELECT * FROM table_name;
   ```
   Replace `table_name` with the name of the table you want to view.
