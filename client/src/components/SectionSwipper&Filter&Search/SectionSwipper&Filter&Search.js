import { Box, Container } from '@mui/material';
import React from 'react';
import SwiperBanner from '../SwiperBanner/SwiperBanner';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { stylesGridConteiner, stylesSwipper, stylesSearch, stylesFilter } from './styles';

const SectionSwipperFilterSearch = () => {
  return (
    <Container
      component="section"
      sx={{
        mt: { mobile: '62px', tablet: '85px', desktop: '50px' },
        mb: { mobile: '70px', tablet: '80px', desktop: '90px' },
      }}
    >
      <Box component="div" sx={stylesGridConteiner}>
        <Box component="div" sx={stylesSwipper}>
          <SwiperBanner />
        </Box>
        <Box component="div" sx={stylesFilter}>
          <Filter />
        </Box>
        <Box component="div" sx={stylesSearch}>
          {/* <Search /> */}
        </Box>
      </Box>
    </Container>
  );
};

export default SectionSwipperFilterSearch;
