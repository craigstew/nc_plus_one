# NORTHCODERS PROJECT 1 - Craig Stewart

## SETUP
### Create your own environment.
python -m venv .venv
### Install Projects Dependencies
pip install -r requirements.txt
### Run Python Script for Database Creation
python main.py


## View Database
### Enter PSQL
psql
### Connect to "nc_plus_one" Database
\c nc_plus_one
### View Database Tables
\dt
### Viewing Table Data
SELECT * FROM {Table Name You Want to See!}
