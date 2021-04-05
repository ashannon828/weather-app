import React from "react";
import dayjs from "dayjs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Chart({ tempData }) {
  const data = tempData.list.map((day) => {
    return { dt: dayjs.unix(day.dt).format(), temp: day.temp };
  });

  return (
    <div>
      <h2>{tempData.city.name} Tempurature Forcast:</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="dt"></XAxis>
          <YAxis dataKey="temp"></YAxis>
          <Bar dataKey="temp" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
