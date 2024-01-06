import { Box, Container } from '@mui/material'
import React from 'react'
import GraphSection from '../components/GraphSection'
import AllCryptoCurrencies from '../components/AllCryptoCurrencies'

function IndexPage() {
  return (
    <Box 
      className = "indexPage"
      sx={{
        display:{lg:'flex', md:'flex', sm:'block', xs: 'block'}, mt: 3, mb:3,
        gap:3,
        px:3
      }}
    >
      <GraphSection/>
      <AllCryptoCurrencies/>
    </Box>
  )
}

export default IndexPage