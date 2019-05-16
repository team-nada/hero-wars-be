'use strict';

require('dotenv').config();

// Libraries imported thought NPM
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

const app = express();

// Server listens on port from .env file or port 3000 if non existant.
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(express.static('./public'));

// Set up os PSQL
const client = new pg.Client(process.env.DATABASE_URL);

// Connect to PSQL Client
client.connect();
client.on('error', err => console.err(err));

function Characters(obj) {
  this.name = obj.name,
  this.intelligence = obj.powerstats.intelligence,
  this.strength = obj.powerstats.strength,
  this.speed = obj.powerstats.speed,
  this.durability = obj.powerstats.durability,
  this.power = obj.powerstats.power,
  this.combat = obj.powerstats.combat,
  this.publisher = obj.biography.publisher,
  this.alignment = obj.biography.alignment,
  this.race = obj.appearance.race,
  this.affiliation = obj.connections.groupAffiliation,
  this.smallImageURL = obj.images.sm,
  this.largeImageURL = obj.images.lg
}

//Stores the current characters data in the database
Characters.prototype = {
  store: function (){
    const insertStatement = 'INSERT INTO characters ( name, intelligence, strength, speed, durability, power, combat, publisher, alignment, race, groupAffiliation, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
    const values = [this.name, this.intelligence, this.strength, this.speed, this.durability, this.power, this.combat, this.publisher, this.alignment, this.race, this.affiliation, this.largeImageURL];
    client.query(insertStatement, values);
  }
}

//Checks if the DB has data
function dbHasData(){
  const selectStatement = 'SELECT * FROM characters';
  return client.query(selectStatement)
    .then( result => {
      if(result.rowCount > 0){
        return true;
      }else {
        return false;
      }
    });
}

//Calls the API and stores response in the database
function callApi(){
  console.log('Calling the API');
  const superHeroAPI = 'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json';
  superagent.get(superHeroAPI)
    .then(result => {
      result.body.map((element) => {
        let currentCharacter = new Characters(element);
        currentCharacter.store();
      });
    }).catch(error => console.error(error));
}

//Gets 10 random characters from the DB
function getCharactersFromDb(limitItem){
  try{
    const selectStatement = `SELECT * FROM characters ORDER BY RANDOM() LIMIT ${limitItem};`;
    let heroes =  client.query(selectStatement);
    return heroes;

  }catch(e) {
    console.error(e);
  }
}

app.get('/test', (req, res) => {
  try{
    res.status(200).send('Test Success!');
  } catch(e) {
    res.status(500).send('Sorry, something went wrong with the test');
  }
});

// Grabs data from API, iterates over the array and pushes to the constructor.
app.get('/', (req, res) => {
  dbHasData().then( result => {
    if(!result){
      console.log('We have no data. db check returns: ', result);
      try{
        callApi();
        return result;
      }catch(e) {
        res.status(500).send('Sorry, something went wrong with the SuperHero API!');
      }
    }
  }).then( () => {
    getCharactersFromDb(10).then( dbResult => {
      res.status(200).send(dbResult.rows);
    });
  });
});

//Send all characters fromt he DB to allow updates / deletes
app.get('/listcharacter', (req, res) => {
  dbHasData().then( result => {
    if(!result){
      console.log('We have no data. db check returns: ', result);
      try{
        callApi();
        return result;
      }catch(e) {
        res.status(500).send('Sorry, something went wrong with the SuperHero API!');
      }
    }
  }).then( () => {
    getCharactersFromDb(null).then( dbResult => {
      res.status(200).send(dbResult.rows);
    });
  });
});

// Route to allow a Hero to be added to the database
// Need to pull in information from FR Form.
app.get('/add', (req, res) => {
  try {
    // Testing
    let tempValue = {
      name: 'Roger',
      powerstats: { intelligence: 50,
                    strength: 50,
                    speed: 50,
                    durability: 50,
                    power: 50,
                    combat: 50},
                    appearance: { gender: 'Male',
                                  race: 'Human',
                                  biography: {publisher: 'Marvel Comics',
                                              alignment: 'good'},
                                              connections: {groupAffiliation: 'House-Huba'},
                                              images: {lg: 'https://pbs.twimg.com/profile_images/2414356616/image_400x400.jpg'}}};
    let currentCharacter = new Characters(tempValue);
    console.log(tempValue);
    currentCharacter.store()
    res.status(200).send('Hero Added to Database');
  } catch(e) {
    res.status(500).send('There was an issue with the Add');

  }
});

// Route to delete a Hero from the database
// app.get('/delete', (req, res, id) => {
//   try {
//     let deleteStatement = `DELETE FROM character where id=${id};`;
//     client.query(deleteStatement)
//       res.redirect('/update');
//   } catch(e) {
//       res.status(500).send('Sorry, something went wrong with the SuperHero API!');
//   };
// });

// Check if a route exists
app.use('*', (req, res) => res.send('Sorry, that route does not exist.'));

// Start Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
