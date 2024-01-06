import { Box, Container } from '@mui/material'
import React from 'react'
import HeaderSection from './HeaderSection'
import CryptoGraph from './CryptoGraph'
import PortfolioSection from './PortfolioSection'

function GraphSection() {
  return (
    <Box sx={{
      width: {lg: '70%', md:'100%', sm:'100%', xs:'100%'},
    }}>
      <HeaderSection/>
      <CryptoGraph/>
      <PortfolioSection/>
    </Box>
  )
}

export default GraphSection