import { Box } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Component for showing Line chart for selected crypto currency
const CryptoLineChart = ({ data }) => {
  // Getting minimum and maximum price for selected days (1, 7, 30, 365)
  const minPrice = Math.min(...data?.map((entry) => entry?.price));
  const maxPrice = Math.max(...data?.map((entry) => entry?.price));
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload; // Assuming only one line in the chart
      return (
        <div className="bg-gray-300 rounded-md p-2">
          <p>Date: {dataPoint?.fullDate}</p>
          <p>Price: {dataPoint?.price}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{mt: { lg: 0, md: 0, sm: 0, xs: 16 }}}>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="1 0" vertical={false} />
          <XAxis
            dataKey="date"
            minTickGap={20} // Adjust the minTickGap as needed
            interval={Math.ceil(data.length / 10)} // Adjust the interval dynamically
            tick={{ dy: 10 }}
            axisLine={false}
            padding={{ left: 20 }}
          />
          <YAxis
            axisLine={false}
            dataKey="price"
            tickCount={8}
            domain={[
              Math.floor(minPrice) - Math.floor(Math.floor(minPrice) / 1000),
              Math.ceil(maxPrice) + Math.floor(Math.floor(maxPrice) / 1000),
            ]}
          />
          
          <Tooltip content={renderCustomTooltip} />
          <Legend />
          <Line
            type="linear"
            dataKey="price"
            stroke="#1D4ED8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            fill="#1D4ED8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CryptoLineChart;
