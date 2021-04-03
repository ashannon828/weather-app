import React from "react";

export default function Chart({ city, tempData }) {
  return (
    <div>
      <h2>{city} Tempurature Forcast:</h2>
      {JSON.stringify(tempData)}
    </div>
  );
}
