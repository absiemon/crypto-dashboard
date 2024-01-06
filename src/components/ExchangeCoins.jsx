import {
  Autocomplete,
  Box,
  Button,
  Container,
  Input,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";

function ExchangeCoins() {
  const { allCryptoCurrencies } = useContext(CryptoContext);
  const [selectedCoinOne, setSelectedCoinOne] = useState("Bitcoin");
  const [selectedCoinTwo, setSelectedCoinTwo] = useState("Ethereum");
  const [enteredValue, setEnteredValue] = useState("");
  const [exchangedValue, setExchangedValue] = useState();
  const [exchangedValueId, setExchangedValueId] = useState();
  const [errorState, setErrorState] = useState(true);

  const handleExchangeCoins = () => {
    //checking for invalid inputs. Means we can not accept any charater rather than 0- 9
    const regex = /^[-+]?[0-9]+$/;
    if (regex.test(enteredValue)) {
      setErrorState(true);
      let firstValue = 0;
      let secondValue = 0;
      // consverting coins value
      for (let i = 0; i < allCryptoCurrencies.length; i++) {
        if (firstValue > 0 && secondValue > 0) {
          break;
        }
        if (allCryptoCurrencies[i]?.name === selectedCoinOne) {
          firstValue = allCryptoCurrencies[i]?.current_price;
        }
        if (allCryptoCurrencies[i]?.name === selectedCoinTwo) {
          secondValue = allCryptoCurrencies[i]?.current_price;
          setExchangedValueId(allCryptoCurrencies[i]?.symbol);
        }
      }
      const ans = ((firstValue / secondValue) * parseInt(enteredValue)).toFixed(
        2
      );
      setExchangedValue(ans);
    } else {
      setErrorState(false);
      setExchangedValue();
    }
  };

  return (
    <Container
      className="bg-white p-4 "
      sx={{ mt: { lg: 0, md: 0, sm: 0, xs: 2 }, width:{lg: "50%", md: "50%", sm: "50%", xs: "100%" }}}
    >
      <p className="text-xl font-bold"> Exchange Coins</p>
      <Box
        sx={{
          display: { lg: "flex", md: "block", sm: "block", xs: "block" },
          mt: 3,
          gap: 2,
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-yellow-400">Sell</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allCryptoCurrencies?.map((option) => option?.name)}
              value={selectedCoinOne}
              onChange={(event) => {
                setSelectedCoinOne(event.target.innerText);
              }}
              sx={{
                width: { lg: 200, md: "100%", sm: "100%", xs: "100%" },
                backgroundColor: "#f3f3f3",
                borderRadius: "5px",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <p className="text-emerald-600">Buy</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allCryptoCurrencies?.map((option) => option?.name)}
              value={selectedCoinTwo}
              onChange={(event) => {
                setSelectedCoinTwo(event.target.innerText);
              }}
              sx={{
                width: { lg: 200, md: "100%", sm: "100%", xs: "100%" },
                backgroundColor: "#f3f3f3",
                borderRadius: "5px",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    ...params.InputProps,
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="xs:mt-4 sm:mt-4 bdsm:mt-4 md:mt-0 xs:ml-[35px] sm:ml-[35px] md:ml-[0px] exchg_coins_form">
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-[100%] h-14"
            type="number"
            placeholder="Enter value"
            value={enteredValue}
            onChange={(e) => setEnteredValue(e.target.value)}
          />
          <p className="text-red-400 text-sm text-center">
            {!errorState && "Enter valid value"}
          </p>
          <p className="text-emerald-600 mt-7">
            {exchangedValue} {exchangedValueId}
          </p>
        </div>
      </Box>
      <div className="flex items-center w-[100%] justify-center mt-6">
        <button
          className="flex items-center justify-center bg-blue-600 px-4 py-2 rounded-md text-white"
          onClick={handleExchangeCoins}
        >
          Exchange Coin
        </button>
      </div>
    </Container>
  );
}

export default ExchangeCoins;
