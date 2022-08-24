-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if EXISTS users cascade;
DROP TABLE if EXISTS todos cascade;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    room TEXT,
    chore TEXT,
    complete BOOLEAN

);

INSERT into users (first_name, last_name, email, password_hash) values 
('Snow', 'White', 'ilovepolygamy@sevenmen.com', 'apple'),
('Elsa', 'Oldenburg', 'canttouchthis@frozen.com', 'olaf'),
('Mulan', 'Fa', 'imnotawoman@warrior.com', 'mushu'),
('Moana', 'Waialiki', 'runaway@dwayne.com', 'heihei');

INSERT into todos (room, chore, complete) values
('kitchen', 'dishes', 'false'),
('kitchen', ' scrubfloors', 'false'),
('laundry', ' wash clothes', 'false'),
('bedrooms', 'make beds', 'false'),
('dining', 'windows', 'false'),
('dining', 'set the table', 'false'),
('bathroom', 'bath pets', 'false'),
('kitchen', 'feed pets', 'false'),
('bathroom', 'mirrors', 'false'),
('kitchen', 'garbage', 'false')
