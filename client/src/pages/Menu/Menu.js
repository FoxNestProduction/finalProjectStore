/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import useBreakpoint from '../../customHooks/useBreakpoint';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { resetSearch, setInputSearchValue, setSearch } from '../../redux/slices/searchSlice';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';
import { productsPerPageMap } from '../../constants/bpMapConstants';
import { resetFilter, setFilterParams } from '../../redux/slices/filterSlice';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const itemsFromFilter = useSelector((state) => state.filter.filteredProducts);
  const keyFromSearch = useSelector((state) => state.search.key);
  const filterParams = useSelector((state) => state.filter.filterParams);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const products = useSelector((state) => state.products.products);
  const location = useLocation();
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const productsAnchor = useSelector((state) => state.scrollAnchor.scrollAnchor);

  useEffect(() => {
    const queryString = location.search;
    // console.log('!!!queryString from menu', queryString);

    // itemsFromFilter.length === 0 - це перевірка при переході з іншої
    // сторінки на сторінку меню чи є в сторі вже відфільтровані продукти
    // щоб не кидати лишній запит на сервер
    // if (!queryString && !filterParams.sort && itemsFromFilter.length === 0) {
    //   console.log('🔥🔥🔥fetchSortedProducts from Menu');
    //   dispatch(fetchSortedProducts(`?perPage=${filterParams.perPage}&startPage=${filterParams.startPage}`));
    // }
    if (!queryString) {
      console.log('🔥🔥🔥fetchSortedProducts from Menu');
      dispatch(fetchSortedProducts(`?perPage=${filterParams.perPage}&startPage=${filterParams.startPage}`));
    }
  // }, [filterParams.perPage, filterParams.startPage]); // eslint-disable-line
  }, [filterParams.perPage]); // eslint-disable-line

  useEffect(() => {
    // dispatch(setSearch([]));
    // dispatch(setInputSearchValue(''));
    dispatch(resetSearch());

    return () => {
      console.log('❗️❗️❗️ Reset state in return ');
      dispatch(resetSearch());
      dispatch(resetFilter());
      dispatch(setFilterParams({
        filterCategories: [],
        isTrending: false,
        rating: null,
        isHealthy: false,
        isSupreme: false,
        minPrice: 0,
        maxPrice: 30,
        sort: '',
        startPage: 1,
      }));
    };
  }, [dispatch]); // eslint-disable-line

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
