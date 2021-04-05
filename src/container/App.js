import "./App.css";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../components/Search";
import Chart from "../components/Chart";
import Error from "../components/Error";

import { mapStateToProps, mapDispatchToProps } from "../helpers";

function App({ city, setCity, fetchWeatherData, tempData, err }) {
  console.log(tempData);
  return (
    <div className="App">
      <h1>Weather Forcast</h1>
      {err && <Error err={err.message} />}
      <Search
        city={city}
        setCity={setCity}
        fetchWeatherData={fetchWeatherData}
      />
      {tempData && <Chart city={city} tempData={tempData} />}
    </div>
  );
}

App.propTypes = {
  city: PropTypes.string,
  setCity: PropTypes.func,
  fetchWeatherData: PropTypes.func,
  tempData: PropTypes.object,
  err: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
