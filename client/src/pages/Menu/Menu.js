import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';
import { partnersCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const keyFromSearch = useSelector((state) => state.search.key);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);

  const productsAnchor = useSelector((state) => state.scrollAnchor.scrollAnchor);

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  // const topOfProducts = useRef();
  return (
    <>
      <SectionSwipperFilterSearch />

      {keyFromSearch === 'restaurant' && (
        <ListItems
          title={itemsFromSearch.length !== 0 ? 'Search Results' : ''}
          items={itemsFromSearch}
          itemComponent={RestaurantItem}
          actions={null}
          type="partners"
        />
      )}
      {/* <Box ref={topOfProducts}> */}
      {/*  Hello */}
      {/* </Box> */}
      <ListItems
        title={keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? 'Search Results' : 'Our Dishes'}
        items={keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? itemsFromSearch : products}
        itemComponent={ProductCardItem}
        actions={null}
        type="food"
        pagination
        anchor={productsAnchor}
      />

      <ListItems
        title="Our Top Restaurants"
        items={sortedPartners}
        itemComponent={RestaurantItem}
        actions={<ListItemAction />}
        type="partners"
      />
    </>
  );
};

export default MenuPage;
