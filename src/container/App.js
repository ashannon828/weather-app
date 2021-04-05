import "./App.css";
import React from "react";
import { connect } from "react-redux";
import Search from "../components/Search";
import Chart from "../components/Chart";
import Error from "../components/Error";

import { fetchWeatherData, setCityInput } from "../actions/actions.js";

const mapStateToProps = (state) => {
  return {
    city: state.setFieldInput.city,
    tempData: state.fetchWeatherData.tempData,
    isPending: state.fetchWeatherData.isPending,
    err: state.fetchWeatherData.err,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCity: (event) => dispatch(setCityInput(event)),
    fetchWeatherData: () => dispatch(fetchWeatherData()),
  };
};

function App({ city, setCity, fetchWeatherData, tempData, isPending, err }) {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
