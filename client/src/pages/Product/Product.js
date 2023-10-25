import React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import useSortedItems from '../../customHooks/useSortedItems';
import ProductCard from '../../components/ProductCard/ProductCard';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import { productsCardWidth } from '../../components/ListItems/styles';

const ProductPage = () => {
  const products = useSelector((state) => state.products.products);
  const sortedProducts = useSortedItems(products, productsCardWidth);

  return (
    <Box>
      <ProductCard />
      <ListItems title="Popular" items={sortedProducts} itemComponent={ProductCardItem} actions={null} />
      <QuestionsList />
    </Box>
  );
};

export default ProductPage;
