/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
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

const MenuPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isQuery = useRef(false);
  const isMounted = useRef(false);

  const itemsFromSearch = useSelector((state) => state.search.search);
  const itemsFromFilter = useSelector((state) => state.filter.filteredProducts);
  const keyFromSearch = useSelector((state) => state.search.key);
  const filterParams = useSelector((state) => state.filter.filterParams);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const products = useSelector((state) => state.products.products);
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const productsAnchor = useSelector((state) => state.scrollAnchor.scrollAnchor);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = getQueryStringFromFilterParams(filterParams);
  //     navigate(queryString);
  //   }
  //   isMounted.current = true;
  // }, [filterParams]); // eslint-disable-line

  useEffect(() => {
    if (location.search) {
      const initialFilterParams = getParamsFromURL(location.search);
      dispatch(setFilterParams(initialFilterParams));
      isQuery.current = true;
    }

    return () => {
      // console.log('❗️❗️❗️ Reset state in return ');
      dispatch(resetSearch());
      dispatch(deleteFilteredData());
      dispatch(resetFilterParams());
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const params = getParamsFilteredFromDefaultValues(filterParams);
    const hasFilters = checkFiltersInParams(params);
    const queryString = getQueryStringFromParams(params);
    // console.log(queryString);

    if (isMounted.current) {
      navigate(queryString);
    }
    isMounted.current = true;

    if (!isQuery.current) {
      if (hasFilters) {
        // console.log('😈😈😈 fetchFilteredProducts');
        dispatch(fetchFilteredProducts(queryString));
      } else {
        // console.log('💦💦💦 fetchSortedProducts');
        dispatch(fetchSortedProducts(queryString));
      }
    }
    isQuery.current = false;
  }, [filterParams]); // eslint-disable-line

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

      {keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? (
        <ListItems
          title={`Search Results (${itemsFromSearch.length})`}
          items={itemsFromSearch}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          // pagination
          anchor={productsAnchor}
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
          anchor={productsAnchor}
          itemsFrom="filter"
        />
      ) : (
        <ListItems
          title="All Dishes"
          items={products}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          pagination
          sorting
          anchor={productsAnchor}
          itemsFrom="allDishes"
        />
      )}

      {topPartners.length > 0 && (
        <ListItems
          title="Our Top Restaurants"
          items={topPartners}
          itemComponent={RestaurantItem}
          actions={<ListItemAction type="partners" />}
          type="partners"
        />
      )}
    </>
  );
};

export default MenuPage;
