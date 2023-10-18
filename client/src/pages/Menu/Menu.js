import React, { useEffect } from 'react';
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
  const itemsFromFilter = useSelector((state) => state.filter.filter);
  // console.log(itemsFromFilter);
  const keyFromSearch = useSelector((state) => state.search.key);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  // const changeItems = () => {
  //   let prod = [];
  //   if (keyFromSearch === 'food' && itemsFromSearch.length !== 0) {
  //     prod = itemsFromSearch;
  //   }
  //   if (itemsFromFilter.length !== 0) {
  //     prod = itemsFromFilter;
  //     dispatch(setSearch([]));
  //   } else {
  //     prod = products;
  //   }
  //   return prod;
  // };
  return (
    <>
      <SectionSwipperFilterSearch />

      {/* {keyFromSearch === 'restaurant' && (
        <ListItems
          title={itemsFromSearch.length !== 0 ? 'Search Results' : ''}
          items={itemsFromSearch}
          itemComponent={RestaurantItem}
          actions={null}
          type="partners"
        />
      )}

      {keyFromSearch === 'food' && itemsFromSearch.length !== 0 && (
        <ListItems
          title={keyFromSearch === 'food' && itemsFromSearch.length !== 0 ?
          'Search Results' : 'Our Dishes'}
          items={itemsFromSearch.length !== 0 ? itemsFromSearch : products}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
        />
      )} */}

      {/* {itemsFromFilter.length !== 0 && ( */}
      <ListItems
        title={itemsFromFilter.length !== 0 ? 'Search Results' : 'Our Dishes'}
        items={itemsFromFilter.length !== 0 ? itemsFromFilter : products}
        // items={changeItems()}
        itemComponent={ProductCardItem}
        actions={null}
        type="food"
      />
      {/* )} */}

      {/* {products && (
        <ListItems
          title="Our Dishes"
          items={itemsFromFilter.length !== 0 ? itemsFromFilter : products}
          itemComponent={ProductCardItem}
          actions={null}
          type="food"
        />
      )} */}

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
