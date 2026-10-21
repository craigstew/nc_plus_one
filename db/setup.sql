CREATE DATABASE nc_plus_one;

\c nc_plus_one;

DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
    test SERIAL PRIMARY KEY
);
