require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dayjs = require("dayjs");

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

app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/forcast/:city", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&appid=${apiKey}`;
  let response = await fetch(url);
  let data = await response.json();

  // test if there's an error from openweathermap end point
  if (!data.hasOwnProperty("list")) {
    res.json(data);
    return;
  }

  // strip only the data needed from list, if I were to calc temp in C, I'd do that here.
  const newList = data.list.map((dt) => {
    const temp = dt.main.temp;
    return { dt: dt.dt, temp };
  });

  // clone array to append new data to
  const result = [...newList];

  // ran out of time, but I'd have tested performance of do while vs recursive function
  let idx = 0;
  do {
    result.push({
      dt: dayjs.unix(result[idx].dt).add(5, "d").unix(),
      temp: calcNewTemp(newList, idx),
    });
    idx++;
  } while (result.length < 80);

  res.json({ ...data, list: result });
});

app.listen(8080, () => console.log("server listening on port: 8080"));
