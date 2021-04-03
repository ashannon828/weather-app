import React from "react";

export default function Search({ city, setCity, setErr, setData }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);
    const forcast = await response.json();
    if (forcast.cod === "404") {
      setErr("City not found");
      setData("");
      return;
    }
    if (forcast.cod === "400") {
      setErr("Enter a city");
      setData("");
      return;
    }
    setErr("");
    setData(forcast.list);
    return;
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
