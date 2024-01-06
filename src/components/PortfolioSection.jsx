import { Box } from "@mui/material";
import React from "react";
import Portfolio from "./Portfolio";
import ExchangeCoins from "./ExchangeCoins";

function PortfolioSection() {
  return (
    <Box
      sx={{ display: {lg: "flex", md: "flex", sm: "flex", xs: "block"}, gap: "20px" }}
      className="mt-4"
    >
      <Portfolio />
      <ExchangeCoins />
    </Box>
  );
}

export default PortfolioSection;
