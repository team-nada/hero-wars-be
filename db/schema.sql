-- noinspection SqlDialectInspectionForFile
-- noinspection SqlNoDataSourceInspectionForFile
-- noinspection SqlDialectInspection

DROP TABLE if EXISTS users;
DROP TABLE if EXISTS record;
DROP TABLE if EXISTS characters;

CREATE TABLE characters (
  id serial primary key,
  name varchar(255),
  intelligence int DEFAULT 50,
  strength int DEFAULT 50,
  speed int DEFAULT 50,
  durability int DEFAULT 50,
  power int DEFAULT 50,
  combat int DEFAULT 50,
  publisher varchar(255),
  alignment varchar(255) DEFAULT 'Neutral',
  race varchar(255) DEFAULT 'Unknown',
  groupAffiliation text DEFAULT 'no known affiliations.',
  image_url text
);

CREATE TABLE users (
  id serial primary key,
  username varchar(255)
);

-- CREATE TABLE record (
--   id serial primary key,
--   -- Foreign Key
--   character_id INTEGER NOT NULL REFERENCES characters(ID),
--   wins int,
--   losses int,
--   appearances int
-- );
