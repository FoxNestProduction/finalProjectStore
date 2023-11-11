import React, { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { resetSearch } from '../../redux/slices/searchSlice';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';
import {
  deleteFilteredData,
  fetchFilteredProducts,
  resetFilterParams,
  setFilterParams,
} from '../../redux/slices/filterSlice';
import { getParamsFromURL, checkFiltersInParams, getParamsFilteredFromDefaultValues, getQueryStringFromParams } from '../../utils/filterHelpers';
import { setProductsScrollAnchor } from '../../redux/slices/scrollAnchorSlice';
import { gridStylesContainer } from '../../components/ListItems/styles';
import Skeleton from '../../components/Skeleton/Skeleton';

const MenuPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isQuery = useRef(false);
  const isMounted = useRef(false);
  const productsScrollRef = useRef(null);

  const itemsFromSearch = useSelector((state) => state.search.search);
  const itemsFromFilter = useSelector((state) => state.filter.filteredProducts);
  const keyFromSearch = useSelector((state) => state.search.key);
  const filterParams = useSelector((state) => state.filter.filterParams);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const nothingFound = useSelector((state) => state.filter.nothingFound);
  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector((state) => state.products.loading);
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const loadingPartners = useSelector((state) => state.partners.loading);

  useEffect(() => {
    if (location.search) {
      const initialFilterParams = getParamsFromURL(location.search);
      dispatch(setFilterParams(initialFilterParams));
      isQuery.current = true;
    }

    return () => {
      dispatch(resetSearch());
      dispatch(deleteFilteredData());
      dispatch(resetFilterParams());
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const params = getParamsFilteredFromDefaultValues(filterParams);
    const hasFilters = checkFiltersInParams(params);
    const queryString = getQueryStringFromParams(params);

    if (isMounted.current) {
      navigate(queryString);
    }
    isMounted.current = true;

    if (!isQuery.current) {
      if (hasFilters) {
        dispatch(fetchFilteredProducts(queryString));
      } else {
        dispatch(fetchSortedProducts(queryString));
      }
    }
    isQuery.current = false;
  }, [filterParams]); // eslint-disable-line

  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

  useEffect(() => {
    if (productsScrollRef.current) {
      dispatch(setProductsScrollAnchor(productsScrollRef.current));
    }
  }, [dispatch]);

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
          itemsFrom="search"
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
      <Box ref={productsScrollRef}>
        {keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? (
          <ListItems
            title={`Search Results (${itemsFromSearch.length})`}
            items={itemsFromSearch}
            itemComponent={ProductCardItem}
            actions={null}
            type="food"
            itemsFrom="search"
          />
        ) : itemsFromFilter.length !== 0 ? (
          <ListItems
            title={`Filter Results (${filteredProductsQuantity})`}
            items={itemsFromFilter}
            itemComponent={ProductCardItem}
            actions={null}
            type="food"
            pagination
            sorting
            itemsFrom="filter"
            isScrolling
          />
        ) : (!nothingFound) ? (
          <ListItems
            title="All Dishes"
            items={products}
            itemComponent={ProductCardItem}
            actions={null}
            type="food"
            pagination
            sorting
            itemsFrom="allDishes"
          />
        ) : (
          <Container sx={{ pb: '60px' }}>
            <Typography
              variant="h3"
              component="p"
              color="primary.main"
              sx={{ textAlign: 'center',
                fontSize: { mobile: '22px', tablet: '26px', desktop: '32px' },
                px: '10px',
                fontWeight: 'fontWeightLight' }}
            >
              Sorry, no results match your current filter settings...🤷‍♀️
            </Typography>
          </Container>
        )}
      </Box>

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
