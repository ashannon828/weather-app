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
  const city = getState().setFieldInput.city;
  const url = `http://localhost:8080/api/forcast/${city}`;

  dispatch({ type: FETCH_WEATHER_DATA_PENDING });

  if (!city) {
    dispatch({
      type: FETCH_WEATHER_DATA_FAILED,
      payload: { message: "Enter a city" },
    });
    return;
  }

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod !== "200") {
      dispatch({
        type: FETCH_WEATHER_DATA_FAILED,
        payload: { ...data, message: sentenceCase(data.message) },
      });
      return;
    }
    dispatch({ type: FETCH_WEATHER_DATA_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FETCH_WEATHER_DATA_FAILED,
      payload: { cod: 500, message: "Something went wrong" },
    });
  }
};
