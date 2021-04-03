import React from "react";

export default function Search({ city, setCity, fetchWeatherData }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(city);
    fetchWeatherData(city);
    // const apiKey = process.env.REACT_APP_API_KEY;
    // const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // const response = await fetch(url);
    // const forcast = await response.json();
    // if (forcast.cod === "404") {
    //   setErr("City not found");
    //   setTempData("");
    //   return;
    // }
    // if (forcast.cod === "400") {
    //   setErr("Enter a city");
    //   setTempData("");
    //   return;
    // }
    // setErr("");
    // setTempData(forcast.list);
    // return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
