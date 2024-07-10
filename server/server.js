dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
// import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

// create an express server that is listening on xxxx
const app = express();
const PORT = 3000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const characterColl = process.env.MONGO_DB_CHAR_COLL;
const filmColl = process.env.MONGO_DB_FILM_COLL;
const planetColl = process.env.MONGO_DB_PLAN_COLL;
const filmCharacterColl = process.env.MONGO_DB_FILMCHAR_COLL;
const filmPlanetColl = process.env.MONGO_DB_FILMPLAN_COLL;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route for all characters
app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(characterColl);
    const characters = await collection.find({}).toArray();

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting characters.");
  }
});

// GET route for character by id
app.get("/api/characters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(characterColl);
    const character = await collection.find({ id: parseInt(id) }).toArray();
    // const character = await collection
    //   .find({ _id: new ObjectId(id) })
    //   .toArray();

    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting character by id.");
  }
});

// GET all films for a character by character id
app.get("/api/characters/:id/films", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const filmIdArray = await db
      .collection(filmCharacterColl)
      .find({
        character_id: parseInt(id),
      })
      .project({ _id: 0, film_id: 1 })
      .toArray();

    const filmQueryParams = filmIdArray.map((element) => {
      return element.film_id;
    });

    const films = await db
      .collection(filmColl)
      .find({
        id: { $in: filmQueryParams },
      })
      .toArray();

    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting characters.");
  }
});

// GET home planet for a character by character id
app.get("/api/characters/:id/planets", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const planetIdArray = await db
      .collection(characterColl)
      .find({
        id: parseInt(id),
      })
      .project({ _id: 0, homeworld: 1 })
      .toArray();

    const planetQueryParams = planetIdArray.map((element) => {
      return element.homeworld;
    });

    const planet = await db
      .collection(planetColl)
      .find({
        id: { $in: planetQueryParams },
      })
      .toArray();

    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting characters.");
  }
});

// GET route for all films
app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmColl);
    const films = await collection.find({}).toArray();

    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting films.");
  }
});

// GET film by id
app.get("/api/films/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmColl);
    const film = await collection.find({ id: parseInt(id) }).toArray();
    // const film = await collection.find({ _id: new ObjectId(id) }).toArray();

    res.json(film);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting films.");
  }
});

// GET all characters for film by film id
app.get("/api/films/:id/characters", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const charIdArray = await db
      .collection(filmCharacterColl)
      .find({ film_id: parseInt(id) })
      .project({ _id: 0, character_id: 1 })
      .toArray();
    console.log("char Id Array", charIdArray);

    const charQueryParams = charIdArray.map((element) => {
      return element.character_id;
    });
    const characters = await db
      .collection(characterColl)
      .find({ id: { $in: charQueryParams } })
      .toArray();

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting characters from film.");
  }
});

// GET all planets for film by film id
app.get("/api/films/:id/planets", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const planetIdArray = await db
      .collection(filmPlanetColl)
      .find({ film_id: parseInt(id) })
      .project({ _id: 0, planet_id: 1 })
      .toArray();

    const planetQueryParams = planetIdArray.map((element) => {
      return element.planet_id;
    });
    const planets = await db
      .collection(planetColl)
      .find({ id: { $in: planetQueryParams } })
      .toArray();

    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting films.");
  }
});

// GET route for all planets
app.get("/api/planets", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    console.log("hit the planets route, after connect");
    const db = client.db(dbName);
    const collection = db.collection(planetColl);
    const planets = await collection.find({}).toArray();

    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting planets.");
  }
});

// GET planet by id
app.get("/api/planets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    console.log("hit the planets route, after connect");
    const db = client.db(dbName);
    const collection = db.collection(planetColl);
    const planet = await collection.find({ id: parseInt(id) }).toArray();
    // const planet = await collection.find({ _id: new ObjectId(id) }).toArray();

    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting planets.");
  }
});

// GET all films for planet by planet id
app.get("/api/planets/:id/films", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const filmIdArray = await db
      .collection(filmPlanetColl)
      .find({ planet_id: parseInt(id) })
      .project({ _id: 0, film_id: 1 })
      .toArray();

    const filmQueryParams = filmIdArray.map((element) => {
      return element.film_id;
    });
    const films = await db
      .collection(filmColl)
      .find({ id: { $in: filmQueryParams } })
      .toArray();

    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting planets.");
  }
});

// GET all characters for planet by planet id
app.get("/api/planets/:id/characters", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const charArray = await db
      .collection(characterColl)
      .find({ homeworld: parseInt(id) })
      .toArray();

    res.json(charArray);
  } catch (error) {
    console.error(error);
    res.status(500).send("there were an error getting planets.");
  }
});

// listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// then git add/commit/push
