const fetch = require('cross-fetch');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

app.get(["/", "/:name"], (req, res) => {
  const greeting = "<h1>Hello From Node on Fly!</h1>";
  const name = req.params["name"];

  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

app.get("/pokemon/:id", async (req, res) => {
  const id = req.params["id"];
  const pokemon = await getPokemon(id);
  res.send(pokemon.name);
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`))
