import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import { instance } from '../../API/instance';
import { gridStylesContainer } from '../../components/ListItems/styles';
import Skeleton from '../../components/Skeleton/Skeleton';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const itemsFromFilter = useSelector((state) => state.filter.filter);
  const keyFromSearch = useSelector((state) => state.search.key);
  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector((state) => state.products.loading);

  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const loadingPartners = useSelector((state) => state.partners.loading);

  const productsAnchor = useSelector((state) => state.scrollAnchor.scrollAnchor);

  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  // приклад запиту за продуктами, які відповідають пошуку
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await instance.post('/products/search', { query: 'cheese' });
  //       console.log(response);
  //     } catch (err) {
  //       console.error('Error getting searched products: ', err);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <SectionSwipperFilterSearch />

      {keyFromSearch === 'restaurant' && itemsFromSearch.length !== 0 && (
        <ListItems
          title={`Search Restaurant (${itemsFromSearch.length})`}
          items={itemsFromSearch}
          itemComponent={RestaurantItem}
          actions={null}
          type="partners"
        />
      )}
      {loadingProducts && (
        <>
          <Typography
            variant="h2"
            component="h2"
            color="text.primary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            All Dishes
          </Typography>
          <Container sx={{ mb: 13 }}>
            <Box sx={gridStylesContainer}>
              <Skeleton skeletonType="product" />
              <Skeleton skeletonType="product" />
              {isLgTablet && (
                <Skeleton skeletonType="product" />
              )}
              {isDesktop && (
                <>
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                </>
              )}
            </Box>
          </Container>
          <Container sx={{ mb: 13 }}>
            <Box sx={gridStylesContainer}>
              <Skeleton skeletonType="product" />
              <Skeleton skeletonType="product" />
              {isLgTablet && (
                <Skeleton skeletonType="product" />
              )}
              {isDesktop && (
                <>
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                </>
              )}
            </Box>
          </Container>
          <Container sx={{ mb: 13 }}>
            <Box sx={gridStylesContainer}>
              <Skeleton skeletonType="product" />
              <Skeleton skeletonType="product" />
              {isLgTablet && (
                <Skeleton skeletonType="product" />
              )}
              {isDesktop && (
                <>
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                </>
              )}
            </Box>
          </Container>
          {!isLgTablet && !isDesktop ? (
            <>
              <Container sx={{ mb: 13 }}>
                <Box sx={gridStylesContainer}>
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                </Box>
              </Container>
              <Container sx={{ mb: 13 }}>
                <Box sx={gridStylesContainer}>
                  <Skeleton skeletonType="product" />
                  <Skeleton skeletonType="product" />
                </Box>
              </Container>
            </>
          ) : null}
        </>
      )}
      {keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? (
        <ListItems
          title={`Search Results (${itemsFromSearch.length})`}
          items={itemsFromSearch}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          pagination
          anchor={productsAnchor}
        />
      ) : itemsFromFilter.length !== 0 ? (
        <ListItems
          title={`Filter Results (${itemsFromFilter.length})`}
          items={itemsFromFilter}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          pagination
          anchor={productsAnchor}
        />
      ) : (
        <ListItems
          title={!loadingProducts && 'All Dishes'}
          items={products}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          pagination
          anchor={productsAnchor}
        />
      )}

      {loadingPartners ? (
        <Container sx={{ mb: 13 }}>
          <Typography
            variant="h2"
            component="h2"
            color="text.primary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Our Top Restaurants
          </Typography>
          <Box sx={gridStylesContainer}>
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
          </Box>
        </Container>
      ) : (topPartners.length > 0 && (
        <ListItems
          title="Our Top Restaurants"
          items={topPartners}
          itemComponent={RestaurantItem}
          actions={<ListItemAction type="partners" />}
          type="partners"
        />
      )) }
    </>
  );
};

export default MenuPage;
