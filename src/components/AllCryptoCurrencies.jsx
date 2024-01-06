import { Box, Divider } from "@mui/material";
import React, { useContext } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { CryptoContext } from "../context/CryptoContext";
import graphLoader from '../data/graphLoader.gif'

// Component for showing all crypto currencies by their market capitalization
function AllCryptoCurrencies() {
  const { allCryptoCurrencies, currency, loading } = useContext(CryptoContext);
  return (
    <Box
      sx={{
        width: { lg: "30%", md: "100%", sm: "100%", xs: "100%" },
        mt: { lg: 0, md: 2, sm: 2, xs: 2 },
      }}
      className="bg-white rounded-md"
    >
      <p className="w-44 font-semibold p-5">Cryptocurrencies by market cap</p>
      <Divider />
      {!loading ? (
        <div className="h-[140vh] overflow-y-scroll">
          {allCryptoCurrencies &&
            allCryptoCurrencies?.map((obj, index) => {
              return (
                <Box className="" key={obj?.id}>
                  <Box
                    sx={{ display: "flex" }}
                    className="justify-between items-center px-5 pb-3 pt-3"
                  >
                    <div className="font-medium">
                      <p className="text-sm">{obj?.name}</p>
                      <p className="text-sm text-gray-400">
                        Mkt.Cap 
                        {currency === "USD" && "$"}
                        {currency === "INR" && "₹"}
                        {currency === "JYP" && "¥"}
                        {currency === "EUR" && "€"}
                        {obj?.market_cap}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ArrowDropUpIcon
                        className={`${
                          obj?.price_change_percentage_24h.toString()[0] === "-"
                            ? "text-red-600 rotate-180"
                            : "text-emerald-600"
                        }
                      `}
                        sx={{ fontSize: "2rem", borderRadius: "10px" }}
                      />
                      <p
                        className={`${
                          obj?.price_change_percentage_24h.toString()[0] === "-"
                            ? "text-red-600"
                            : "text-emerald-600"
                        }
                      `}
                      >
                        {obj?.price_change_percentage_24h?.toFixed(2)}%
                      </p>
                    </div>
                  </Box>
                  {index !== allCryptoCurrencies?.length - 1 && <Divider />}
                </Box>
              );
            })}
        </div>
      ) : (
        <div className="h-[140vh] flex flex-col justify-center items-center">
          <img src={graphLoader} />
          <p className="text-sm font-bold">Cryptos are Loading..</p>
        </div>
      )}
    </Box>
  );
}

export default AllCryptoCurrencies;
