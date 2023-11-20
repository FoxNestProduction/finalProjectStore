import { Box, Container } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SwiperBanner from '../SwiperBanner/SwiperBanner';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { stylesGridConteiner, stylesSwipper, stylesSearch, stylesFilter } from './styles';
import { getParamsFromURL } from '../../utils/filterHelpers';

const SectionSwipperFilterSearch = () => {
  const location = useLocation();

  const getInitialFilters = () => {
    const params = getParamsFromURL(location.search);
    return {
      filterCategories: params.filterCategories,
      isTrending: params.isTrending,
      rating: params.rating,
      isHealthy: params.isHealthy,
      isSupreme: params.isSupreme,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
    };
  };

  const [filters, setFilters] = useState(getInitialFilters);

  const resetFiltersLocalState = useCallback(() => {
    setFilters({
      filterCategories: [],
      isTrending: false,
      rating: null,
      isHealthy: false,
      isSupreme: false,
      minPrice: 0,
      maxPrice: 30,
    });
  }, []);

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
          <Filter
            filters={filters}
            setFilters={setFilters}
            resetFiltersLocalState={resetFiltersLocalState}
          />
        </Box>
        <Box component="div" sx={stylesSearch}>
          <Search resetFiltersLocalState={resetFiltersLocalState} />
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SectionSwipperFilterSearch);
