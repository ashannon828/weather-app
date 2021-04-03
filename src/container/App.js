import "./App.css";
import React, { useState } from "react";
import Search from "../components/Search";
import Chart from "../components/Chart";
import Error from "../components/Error";

function App() {
  //state: {cityInput, CitySearched, tempData, error}
  const [city, setCity] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState("");

  return (
    <div className="App">
      <h1>Weather Test</h1>
      {err && <Error err={err} />}
      <Search city={city} setCity={setCity} setErr={setErr} setData={setData} />
      {data && <Chart city={city} data={data} />}
    </div>
  );
}

export default App;
