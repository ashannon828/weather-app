import React from "react";

export default function Chart({ tempData }) {
  return (
    <div>
      <h2>{tempData.city.name} Tempurature Forcast:</h2>
      {JSON.stringify(tempData)}
    </div>
  );
}
