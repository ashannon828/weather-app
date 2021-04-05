import { fetchWeatherData, setCityInput } from "./actions/actions";

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

export { mapStateToProps, mapDispatchToProps };
