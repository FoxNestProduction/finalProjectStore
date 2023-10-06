import React from 'react';
import Box from '@mui/material/Box';

import { useParams } from 'react-router';
import ProductCard from '../../components/ProductCard/ProductCard';
import ListItems from '../../components/ListItems/ListItem';
import QuestionsList from '../../components/QuestionsList/QuestionsList';

const ProductPage = () => {
  const { productName } = useParams();

  return (
    <Box>
      <ProductCard productName={productName} />
      <ListItems />
      <QuestionsList />
    </Box>
  );
};

export default ProductPage;
