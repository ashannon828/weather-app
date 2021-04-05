import { SET_CITY_INPUT } from "../constants/constants.js";

const initialCityState = {
  city: "",
};

const setFieldInput = (state = initialCityState, action = {}) => {
  switch (action.type) {
    case SET_CITY_INPUT:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};

export default setFieldInput;
