require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/forcast/:city", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&appid=${apiKey}`;
  let response = await fetch(url);
  let data = await response.json();

  res.json(data);
});

app.listen(8080, () => console.log("server listening on port: 8080"));
