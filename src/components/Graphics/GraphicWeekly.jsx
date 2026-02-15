import React from "react";
import styled from "styled-components";
import {
  //  LineChart, Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const GraphicWeeklyDiv = styled.div`
  background: #e8e8e8;
  border-radius: 20px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-family: var(--font-family);
    margin-bottom: 20px;
    color: #333;
  }
`;
const data = [
  { name: "Пн", temp: 12 },
  { name: "Вт", temp: 14 },
  { name: "Ср", temp: 13 },
  { name: "Чт", temp: 15 },
  { name: "Пт", temp: 18 },
  { name: "Сб", temp: 22 },
  { name: "Нд", temp: 21 },
];
const GraphicWeekly = () => {
  return (
    <GraphicWeeklyDiv>
      <h3>Прогноз на тиждень (t°C)</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ccc"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorTemp)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GraphicWeeklyDiv>
  );
};
export default GraphicWeekly;
