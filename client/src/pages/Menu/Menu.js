/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import useBreakpoint from '../../customHooks/useBreakpoint';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setInputSearchValue, setSearch } from '../../redux/slices/searchSlice';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const itemsFromFilter = useSelector((state) => state.filter.filteredProducts);
  const keyFromSearch = useSelector((state) => state.search.key);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const products = useSelector((state) => state.products.products);
  const location = useLocation();
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const productsAnchor = useSelector((state) => state.scrollAnchor.scrollAnchor);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    dispatch(fetchSortedProducts('?perPage=10&startPage=1'));
  }, [breakpoint]);// eslint-disable-line

  useEffect(() => {
    dispatch(setSearch([]));
    dispatch(setInputSearchValue(''));
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

      {keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? (
        <ListItems
          title={`Search Results (${itemsFromSearch.length})`}
          items={itemsFromSearch}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
          pagination
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
