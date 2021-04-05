import React from "react";
import PropTypes from "prop-types";

export default function Error({ err }) {
  return <p>{err}</p>;
}

Error.propTypes = {
  err: PropTypes.string,
};
