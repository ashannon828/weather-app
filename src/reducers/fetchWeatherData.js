import {
  FETCH_WEATHER_DATA_PENDING,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILED,
} from "../constants/constants.js";

const initialFetchState = {
  tempData: "",
  isPending: false,
  err: "",
};

const fetchWeatherData = (state = initialFetchState, action = {}) => {
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

export default fetchWeatherData;
