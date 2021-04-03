import {
  SET_CITY_INPUT,
  FETCH_WEATHER_DATA_PENDING,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILED,
} from "../constants/constants.js";

const sentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const setCityInput = (city) => ({
  type: SET_CITY_INPUT,
  payload: city,
});

export const fetchWeatherData = (city) => async (dispatch, getState) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${
    getState().setFieldInput.city
  }&appid=${apiKey}`;

  dispatch({ type: FETCH_WEATHER_DATA_PENDING });

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      dispatch({
        type: FETCH_WEATHER_DATA_FAILED,
        payload: sentenceCase(data.message),
      });
      return;
    }

    dispatch({ type: FETCH_WEATHER_DATA_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_WEATHER_DATA_FAILED, payload: err });
  }
};
