import React from "react";
import PropTypes from "prop-types";

export default function Search({ city, setCity, fetchWeatherData }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWeatherData();
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

Search.propTypes = {
  city: PropTypes.string,
  setCity: PropTypes.func,
  fetchWeatherData: PropTypes.func,
};
