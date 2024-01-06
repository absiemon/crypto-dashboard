import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CryptoContext } from "../context/CryptoContext";
import graphLoader from '../data/graphLoader.gif'

ChartJS.register(ArcElement, Tooltip, Legend);

function Portfolio() {
  const { currency, allCryptoCurrencies, loading } = useContext(CryptoContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "black",
          pointStyleWidth: 15,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
  };

  const data2 = {
    labels: allCryptoCurrencies?.slice(0, 3).map((elm) => elm?.name) || [
      "A",
      "B",
      "C",
    ],
    datasets: [
      {
        label: "Market cap",
        data: allCryptoCurrencies
          ?.slice(0, 3)
          .map((elm) => elm?.market_cap) || [10, 20, 30],
        backgroundColor: ["#1D4ED8", "#f87171", "#fbbf24"],
        borderWidth: 0,
      },
    ],
  };
  useEffect(() => {
    let p = 0;
    allCryptoCurrencies?.slice(0, 3).map((elm) => {
      p += elm?.market_cap;
    });
    setTotalPrice(p.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }, [allCryptoCurrencies]);
 

  return (
    <>
      <div className="bg-white p-4 lg:w-[50%] sm:w-[50%] xs:w-[100%]">
        <div className="flex justify-between items-center portfolio_header">
          <p className="text-xl font-bold"> Portfolio</p>
          <p className="">
            <span className="text-gray-400">Total value</span>
            <span className="font-bold ml-2">
              {currency === "INR" ? "₹" : "$"}
              {totalPrice}
            </span>
          </p>
        </div>
        <div className="mt-4 pie_chart">
          {!loading ? (
            <Pie data={data2} options={options}/>
          ) : (
            <div className="h-[300px] w-[300px] flex flex-col justify-center items-center">
              <img src={graphLoader} />
              <p className="text-sm font-bold">Pie chart Loading..</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Portfolio;

