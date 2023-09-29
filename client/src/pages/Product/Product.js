import React from 'react';
import Box from '@mui/material/Box';

import ProductCard from '../../components/ProductCard/ProductCard';
import ListItems from '../../components/ListItems/ListItem';

const ProductPage = () => {
  return (
    <Box>
      <ProductCard />
      <ListItems />
    </Box>
  );
};

export default ProductPage;
