require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dayjs = require("dayjs");

const db = require("./db/db");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

const average = (nums) => {
  return nums.reduce((a, b) => a + b) / nums.length;
};

const calcNewTemp = (l, idx) => {
  const len = 3;
  // generate decrementing t sub j array
  const dec =
    idx < len
      ? [...l.slice(0, idx).reverse(), ...l.slice(idx - len).reverse()]
      : [...l.slice(idx - len, idx).reverse()];

  // generate incrementing t sub j array
  const inc =
    idx + len > l.length - 1
      ? [
          ...l.slice(idx + 1, l.length),
          ...l.slice(0, len - l.slice(idx + 1, l.length).length),
        ]
      : l.slice(idx + 1, idx + len + 1);

  // Map over and destructure dec and inc arrays so only temp prop is used
  const newTemp =
    (l[idx].temp +
      average(dec.map(({ temp }) => temp)) * (1 - idx * 0.02) +
      average(inc.map(({ temp }) => temp)) * idx * 0.02) /
    2;

  return Math.round(newTemp * 100) / 100;
};

const formatList = (data) => {
  // strip only the data needed from list, if I were to calc temp in C, I'd do that here.
  const newList = data.list.map((dt) => {
    const temp = dt.main.temp;
    return { dt: dt.dt, temp };
  });

  // clone array to append new data to
  const formattedList = [...newList];

  // ran out of time, but I'd have tested performance of do while vs recursive function
  let idx = 0;
  do {
    formattedList.push({
      dt: dayjs.unix(formattedList[idx].dt).add(5, "d").unix(),
      temp: calcNewTemp(newList, idx),
    });
    idx++;
  } while (formattedList.length < 80);

  return formattedList;
};

const cacheCity = (data) => {
  // create data for db
  const cityId = data.city.id;
  const d = new Date();
  const dt = d.toISOString();
  const jsonData = JSON.stringify(data);

  // add data to db
  // run into an issue adding Kharkiv vs Kharkov since they share the same cityId
  // something I'd fix if I had more time
  const stmt = db.prepare("INSERT INTO cache VALUES (?,?,?,?)");
  stmt.run(cityId, data.city.name.toLowerCase(), dt, jsonData);
  stmt.finalize();
};

app.get("/api/forcast/:city", async (req, res) => {
  const city = req.params.city.toLowerCase();
  const apiKey = process.env.API_KEY;

  try {
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS cache (city_id INTEGER PRIMARY KEY, city_name TEXT, date TEXT, data BLOB)"
      );

      db.get(
        `SELECT * FROM cache WHERE city_name='${city.toLowerCase()}'`,
        async (err, row) => {
          if (err) throw err;
          // if data exists in DB, return it
          if (row) {
            console.log("from cache");
            res.json({ ...JSON.parse(row.data) });
          } else {
            const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            // test if data is returned without error
            if (!Object.prototype.hasOwnProperty.call(data, "list")) {
              res.json(data);
              return;
            }

            const formattedList = formatList(data);
            const finalData = { ...data, list: formattedList };

            cacheCity(finalData);

            console.log("from api");

            res.json(finalData);
          }
        }
      );
    });
  } catch (err) {
    // with more time, I'd also add more robust error handling
    console.error(err);
  }
});

app.listen(8080, () => console.log("server listening on port: 8080"));
