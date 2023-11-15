import React from 'react';
import Box from '@mui/material/Box';
import { shallowEqual, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const ProductPage = () => {
  const topProducts = useSelector((state) => state.products.topProducts, shallowEqual);

  return (
    <Box>
      <ProductCard />
      {topProducts.length > 0 && (
        <ListItems
          title="Popular"
          items={topProducts}
          itemComponent={ProductCardItem}
          actions={null}
        />
      ) }
      <QuestionsList />
    </Box>
  );
};

export default ProductPage;
