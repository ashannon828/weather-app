import {
  SET_CITY_INPUT,
  FETCH_WEATHER_DATA_PENDING,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILED,
} from "../constants/constants.js";

const initialCityState = {
  city: "",
};

export const setFieldInput = (state = initialCityState, action = {}) => {
  switch (action.type) {
    case SET_CITY_INPUT:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};

const initialFetchState = {
  tempData: "",
  isPending: false,
  err: "",
};

export const fetchWeatherData = (state = initialFetchState, action = {}) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA_PENDING:
      return { ...state, isPending: true };
    case FETCH_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        tempData: action.payload,
        isPending: false,
        err: "",
      };
    case FETCH_WEATHER_DATA_FAILED:
      return { ...state, err: action.payload, isPending: false, tempData: "" };
    default:
      return state;
  }
};
