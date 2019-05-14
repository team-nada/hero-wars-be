-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE if EXISTS Users;
DROP TABLE if EXISTS Record;
DROP TABLE if EXISTS Characters;
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS record;
DROP TABLE if EXISTS characters;

CREATE TABLE characters (
  id serial primary key,
  name varchar(255),
  intelligence int,
  strength int,
  speed int,
  durability int,
  power int,
  combat int,
  publisher varchar(255),
  alignment varchar(255),
  race varchar(255),
  groupAffiliation text,
  image_url text
);

CREATE TABLE users (
  id serial primary key,
  username varchar(255)
);

CREATE TABLE record (
  id serial primary key,
  -- Foreign Key
  character_id INTEGER NOT NULL REFERENCES characters(ID),
  wins int,
  losses int,
  appearances int
);
