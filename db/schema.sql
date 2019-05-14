-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE if EXISTS Characters;
DROP TABLE if EXISTS Users;
DROP TABLE if EXISTS Record;

CREATE TABLE Characters (
  ID serial primary key,
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

CREATE TABLE Users (
  ID serial primary key,
  username varchar(255)
);

CREATE TABLE Record (
  ID serial primary key,
  -- Foreign Key
  character_ID INTEGER NOT NULL REFERENCES Characters(ID),
  wins int,
  losses int,
  appearances int
);
