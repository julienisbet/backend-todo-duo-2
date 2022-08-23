-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if EXISTS users cascade;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

INSERT into users (first_name, last_name, email, password_hash) values 
('Snow', 'White', 'ilovepolygamy@sevenmen.com', 'apple'),
('Elsa', 'Oldenburg', 'canttouchthis@frozen.com', 'olaf'),
('Mulan', 'Fa', 'imnotawoman@warrior.com', 'mushu'),
('Moana', 'Waialiki', 'runaway@dwayne.com', 'heihei')