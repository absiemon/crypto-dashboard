import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

function HeaderSection() {
  const {
    currency,
    setCurrency,
    allCryptoCurrencies,
    searchCrypto,
    setSearchCrypto,
  } = useContext(CryptoContext);
  return (
    <Box
      sx={{
        display: { lg: "flex", md: "flex", sm: "flex", xs: "block" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <FormControl
        sx={{
          my: 1,
          minWidth: 120,
          width: { lg: "20%", md: "30%", sm: "50%", xs: "100%" },
        }}
      >
        <Select
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSvgIcon-root": {
              color: "black",
            },
          }}
          className="shadow-md "
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "6px",
          "& .css-dncllk-MuiInputBase-root-MuiFilledInput-root": {
            backgroundColor: "white",
            borderRadius: "6px",
          },
        }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={allCryptoCurrencies?.map((option) => option?.name)}
        value={searchCrypto}
        onChange={(event) => {
          setSearchCrypto(event.target.innerHTML);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="filled-basic"
            label="search"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              ...params.InputProps,
              type: "search",
            }}
            sx={{
              width: "100%",
              borderRadius: "6px",
            }}
            className="shadow-md bg-white "
          />
        )}
      />
    </Box>
  );
}

export default HeaderSection;
