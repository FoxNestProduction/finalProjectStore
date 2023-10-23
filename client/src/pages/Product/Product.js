import React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import ProductCard from '../../components/ProductCard/ProductCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import TopDishes from '../../components/TopDishes/TopDishes';

const ProductPage = () => {
  const { productName } = useParams();

  return (
    <Box>
      <ProductCard productName={productName} />
      <TopDishes title="Popular" />
      <QuestionsList />
    </Box>
  );
};

export default ProductPage;
