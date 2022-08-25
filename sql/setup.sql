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
    user_id BIGINT,
    room TEXT,
    chore TEXT,
    complete BOOLEAN DEFAULT false,
    foreign key (user_id) references users(id)

);

INSERT into users (first_name, last_name, email, password_hash) values 
('Snow', 'White', 'ilovepolygamy@sevenmen.com', 'apple'),
('Elsa', 'Oldenburg', 'canttouchthis@frozen.com', '$2b$10$CsF6SmpeX/ydPCnoogyILepWflrUNdxcymduOReXIxHAKbK5u1Rfq'),
('Mulan', 'Fa', 'imnotawoman@warrior.com', 'mushu'),
('Moana', 'Waialiki', 'runaway@dwayne.com', 'heihei');

INSERT into todos (user_id, room, chore, complete) values
('2', 'kitchen', ' scrubfloors', false),
('3', 'kitchen', 'dishes', false),
('1', 'laundry', ' wash clothes', false),
('4', 'bedrooms', 'make beds', false),
('3', 'dining', 'windows', false),
('2', 'dining', 'set the table', false),
('1', 'bathroom', 'bath pets', false),
('1', 'kitchen', 'feed pets', false),
('4', 'bathroom', 'mirrors', false),
('4', 'kitchen', 'garbage', false)
