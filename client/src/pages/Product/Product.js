import React, { memo } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const ProductPage = () => {
  const topProducts = useSelector((state) => state.products.topProducts);

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

export default memo(ProductPage);
