import React from 'react';
import Box from '@mui/material/Box';

import ProductCard from '../../components/ProductCard/ProductCard';
import ListItems from '../../components/ListItems/ListItem';
import QuestionsList from '../../components/QuestionsList/QuestionsList';

const ProductPage = () => {
  return (
    <Box>
      <ProductCard />
      <ListItems />
      <QuestionsList />
    </Box>
  );
};

export default ProductPage;
