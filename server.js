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

// Connect to PSQL Client
client.connect();
const characterData = [];

function Characters(obj) {
  this.name = obj.name
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

  console.log(this);
  characterData.push(this);
}

// Grabs data from API, iterates over the array and pushes to the constructor.
app.get('/', (req, res) => {
  try {
    const superHeroAPI = 'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json';
    superagent.get(superHeroAPI)
      .then(result => {
        result.body.map((element) => {
          console.log(element);
          new Characters(element);
        });
      })
  } catch(e) {
    res.status(500).send('Sorry, something went wrong with the SuperHero API!');
  }
  });


// Check if a route exists
app.use('*', (req, res) => res.send('Sorry, that route does not exist.'));

// Start Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
