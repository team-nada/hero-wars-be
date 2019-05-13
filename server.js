'use strict';

require('dotenv').config();


// Libraries imported thought NPM
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

const app = express();

// Server listens on port from .env file or port 3000 if non existant.
const PORT = process.envPORT || 3000;

app.use(cors());
// app.use(express.static('./public'));

// Set up os PSQL
const client = new pg.Client(process.env.DATABASE_URL);

// COnnect to PSQL Client
client.connect();

const numberOfHeroes = 10;

function Characters(obj) {
  this.name = obj.name;
  this.intelligence = obj.powerstats;
  // this.strength = obj.powerstats.strength;
  // this.speed = obj.powerstats.speed;
  // this.durability = obj.powerstats.durability;
  // this.power = obj.powerstats.power;
  // this.combat = obj.powerstats.combat;
  // this.publisher = obj.biography.publisher;
  // this.alignment = obj.biography.alignment;
  // this.race = obj.appearance.race;
  // this.affiliation = obj.connections;
  // this.imageURL = obj.image.url;
}


app.get('/', (req, res) => {
  for (let i = 0; i <= numberOfHeroes; i++){
    let superHeroAPI = `https://superheroapi.com/api/${process.env.SUPERHERO_API}/${i}`;
    superagent.get(superHeroAPI).end( (err, apiResponse) => {
      let data = apiResponse.body;
      new Characters(data);
      console.log(data.powerstats);
  });
}});


// Check if a route exists
app.use('*', (req, res) => res.send('Sorry, that route does not exist.'));

// Start Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
