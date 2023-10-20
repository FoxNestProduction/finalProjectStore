import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';
import { partnersCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import SectionSwipperFilterSearch from '../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import AppPagination from '../../components/Pagination/Pagination';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const keyFromSearch = useSelector((state) => state.search.key);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);

  const [menuProducts, setMenuProducts] = useState(products);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  useEffect(() => {
    setCount(products.length);
    const from = (page - 1) * productsPerPage;
    const to = page * productsPerPage;
    console.log('from', from);
    console.log('to', to);
    console.log(menuProducts);
    setMenuProducts(products.slice(from, to));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [products, page, productsPerPage]);

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

      <ListItems
        title={keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? 'Search Results' : 'Our Dishes'}
        /* eslint-disable-next-line max-len */
        // react-hooks/exhaustive-deps
        /* eslint-disable-next-line max-len */
        // items={keyFromSearch === 'food' && itemsFromSearch.length !== 0 ? itemsFromSearch : products}
        items={menuProducts}
        itemComponent={ProductCardItem}
        actions={null}
        type="food"
        pagination={(
          <AppPagination
            page={page}
            setPage={setPage}
            productsPerPage={productsPerPage}
            count={count}
          />
)}
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
