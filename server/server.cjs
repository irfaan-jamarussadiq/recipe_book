const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

dotenv.config();

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: "recipeBook",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(bodyParser.json());

app.get("/api/recipes", (request, response) => {
  connection
    .promise()
    .query("SELECT * FROM Recipe")
    .then(([rows, fields]) => {
      return response.json(rows);
    })
    .catch((error) => console.log(error));
});

app.post("/api/recipes", bodyParser.json(), async (request, response) => {
  const { name, description, imageName } = request.body;
  const [results] = await connection
    .promise()
    .query("SELECT 1 FROM Recipe WHERE name = ?", name);
  if (results && results.length > 0) {
    // If recipe name exists, don't create a new recipe.
    response.status(409).send("Recipe with same name already exists");
  } else {
    // Update recipe if name doesn't exist already
    await connection
      .promise()
      .query(
        "INSERT INTO Recipe SET name = ?, description = ?, imageName = ?",
        [name, description, imageName],
      );
    response.status(201).send("New recipe created");
  }
});

app.delete("/api/recipes", bodyParser.json(), async (request, response) => {
  const { name, description, imageName } = request.body;
  const [results] = await connection
    .promise()
    .query("SELECT 1 FROM Recipe WHERE name = ?", name);
  if (results && results.length > 0) {
    // If recipe name exists, delete the recipe.
    await connection.promise().query("DELETE FROM Recipe WHERE name = ?", name);
    response.status(200).send("Recipe was succesfully deleted.");
  } else {
    response.status(404).send("Could not find recipe to delete.");
  }
});

app.listen(port);
