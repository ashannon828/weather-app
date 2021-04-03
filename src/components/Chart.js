import React from "react";

export default function Chart({ city, data }) {
  return (
    <div>
      <h2>{city} Tempurature Forcast:</h2>
      {JSON.stringify(data)}
    </div>
  );
}
