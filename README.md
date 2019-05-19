<a id="top"></a>

# Hero Wars API

A Hero Wars API for a superhero card game. The backend contains endpoints to get initial data from the SuperHero API and stores a list of characters into a database. Features include update and delete characters from the database.

## Authors

- Paula Thomas
- Liz Mahoney
- Jhia Turner
- Roger Huba
- Anthony Berry

## Version

1.0.0

## Links

**Backend URL:** https://hero-wars-be.herokuapp.com/ 

**Front-end URL:** https://hero-wars.space/

**Front-end GitHub Repo:** https://github.com/team-nada/hero-wars-fe

## Resources 

**SuperHero API:**  https://superheroapi.com/index.html

**SQL** https://www.w3schools.com/sql/

## Getting started  
  
  1. Create a folder on a local drive and clone the repo with the provided link.

  2. Once the repo has been cloned, go to the root of the directory and run `npm install` to ensure all packages are up to date and install on your local.


  ### Local database setup 
  1. Run `psql -d hero-wars -f db/schema.sql`, if there is an error go to #2.
  2. Be sure to have psql installed before updating the database and at the root of the project directory.
     1. Then run `psql` , 
     2. On the command line create the database with ` CREATE DATABASE hero-wars; `. (Psql should display `DATABASE CREATED`).
     3. To access the database run `\c herowars`, a message should say `You are now connected to database "herowars" as user <username>`.
     4. Run `\dt` to see 3 tables:  `character`, `record`, and `users`.
     5. Run `ctrl+z` to exit psql.


## To run scripts 

Reset Heroku database:

- Must be on master branch
- on terminal run: `npm run-script heroku-reset`;

[Back to top](#top)
