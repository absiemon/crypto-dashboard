import {
  Box,
  Checkbox,
  Container,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import CryptoLineChart from "./CryptoLineChart";
import CryptoBarChart from "./CryptoBarChart";
import CryptoBarChartHorizontal from "./CryptoBarChartHorizontal";
import { CryptoContext } from "../context/CryptoContext";
import { dataRefactoring } from "../lib/dataRefactoring";
import graphLoader from "../data/graphLoader.gif";

// Root component of all charts.

function CryptoGraph() {
  const { currency, allCryptoCurrencies, searchCrypto } =
    useContext(CryptoContext);
  const [cryptCurrency, setCryptoCurrency] = useState([]);
  const [chartType, setChartType] = useState("Line Chart");
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(1);
  const [interval, setInterval] = useState([]);
  const [isGraphLoading, setIsGraphLoading] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCryptoCurrency(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    try {
      setIsGraphLoading(true);
      const newSearchCrypto = searchCrypto.toLowerCase().split(" ").join("-");
      fetch(
        `https://api.coingecko.com/api/v3/coins/${newSearchCrypto}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}&interval=${interval}`
      ).then((response) => {
        const res = response.json();
        res.then((data) => {
          // Saving or caching data into localstorage because free Apis is giving limited requests.
          localStorage.setItem("graphData.json", JSON.stringify(data));
          const newData = dataRefactoring(days, data?.prices);
          setChartData(newData);
          setIsGraphLoading(false);
        });
      }).catch((err)=>{
        setIsGraphLoading(false);
        window.alert("Too many Api requests")
      })
    } catch (error) {
      setIsGraphLoading(false);
      window.alert("Too many Api requests")
    }
  }, [days, searchCrypto, currency]);

  return (
    <Container className="bg-white rounded-md">
      <Box
        sx={{
          display: { lg: "flex", md: "flex", sm: "flex", xs: "block" },
          pt: { lg: 0, md: 0, sm: 0, xs: 2 },
        }}
        className="justify-between h-20 items-center"
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <div
            className={`
              bg-gray-200 py-2 px-4 rounded-md cursor-pointer hover:text-blue-700 hover:border-2 hover:border-blue-700
              ${days === 1 && "text-blue-700 border-2 border-blue-700"}
              `}
            role="button"
            onClick={() => setDays(1)}
          >
            1D
          </div>
          <div
            className={`
              bg-gray-200 py-2 px-4 rounded-md cursor-pointer hover:text-blue-700 hover:border-2 hover:border-blue-700
              ${days === 7 && "text-blue-700 border-2 border-blue-700"}
              `}
            role="button"
            onClick={() => setDays(7)}
          >
            1W
          </div>
          <div
            className={`
              bg-gray-200 py-2 px-4 rounded-md cursor-pointer hover:text-blue-700 hover:border-2 hover:border-blue-700
              ${days === 30 && "text-blue-700 border-2 border-blue-700"}
              `}
            role="button"
            onClick={() => setDays(30)}
          >
            1M
          </div>
          <div
            className={`
              bg-gray-200 py-2 px-4 rounded-md cursor-pointer hover:text-blue-700 hover:border-2 hover:border-blue-700
              ${days === 365 && "text-blue-700 border-2 border-blue-700"}
              `}
            role="button"
            onClick={() => setDays(365)}
          >
            1Y
          </div>
        </Box>
        <Box
          sx={{
            display: { lg: "flex", md: "flex", sm: "flex", xs: "block" },
            gap: "4px",
            justifyContent: { lg: "center", md: "center", sm: "", xs: "" },
            alignItems: { lg: "center", md: "center", sm: "", xs: "" },
          }}
        >
          <FormControl sx={{ my: 1, minWidth: 120 }}>
            <Select
              defaultValue="Cryptocurrency"
              value={cryptCurrency}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
              displayEmpty
              multiple
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "#f3f3f3",
                width: "180px",
                overflowX: "hidden",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "black",
                },
              }}
            >
              {allCryptoCurrencies &&
                allCryptoCurrencies?.slice(0, 5).map((obj) => (
                  <MenuItem key={obj?.name} value={obj?.name}>
                    <Checkbox checked={cryptCurrency.indexOf(obj?.name) > -1} />
                    <ListItemText primary={obj?.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={chartType}
              onChange={(event) => setChartType(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "#f3f3f3",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "black",
                },
              }}
            >
              <MenuItem value="Line Chart">Line Chart</MenuItem>
              <MenuItem value="Bar Chart Horizontal">
                Bar Chart Horizontal
              </MenuItem>
              <MenuItem value="Bar Chart Vertical">Bar Chart Vertical</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {!isGraphLoading ? (
        <>
          {chartType === "Line Chart" && <CryptoLineChart data={chartData} />}
          {chartType === "Bar Chart Vertical" && (
            <CryptoBarChart data={chartData} />
          )}
          {chartType === "Bar Chart Horizontal" && (
            <CryptoBarChartHorizontal data={chartData} />
          )}
        </>
      ) : (
        <div className="h-[600px] flex flex-col justify-center items-center">
          <img src={graphLoader} />
          <p className="text-sm font-bold">Graph Loading..</p>
        </div>
      )}
    </Container>
  );
}

export default CryptoGraph;
