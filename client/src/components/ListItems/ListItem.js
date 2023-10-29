import React, { createElement, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer, stylesSortSelect } from './styles';
import AppPagination from '../Pagination/Pagination';
import useBreakpoint from '../../customHooks/useBreakpoint';
import Sorter from '../Sorter/Sorter';
import { productsPerPageMap } from '../../constants/bpMapConstants';
import Skeleton from '../Skeleton/Skeleton';

const ListItems = ({ title, items, itemComponent, actions, pagination, anchor, type }) => {
  const { pathname } = useLocation();

  const [selectedValueSortBy, setSelectedValueSortBy] = React.useState('');

  useEffect(() => {
    setSelectedValueSortBy('Default');
  }, [items]);

  const itemsCopy = React.useMemo(() => {
    const copy = [...items];
    if (selectedValueSortBy === 'Price UP') {
      return copy.sort((a, b) => a.currentPrice - b.currentPrice);
    }
    if (selectedValueSortBy === 'Price DOWN') {
      return copy.sort((a, b) => b.currentPrice - a.currentPrice);
    }
    if (selectedValueSortBy === 'Rating UP') {
      return copy.sort((a, b) => a.rating - b.rating);
    }
    if (selectedValueSortBy === 'Rating DOWN') {
      return copy.sort((a, b) => b.rating - a.rating);
    }
    return copy;
  }, [items, selectedValueSortBy]);

  const breakpoint = useBreakpoint();

  const [pageProducts, setPageProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageMap[breakpoint]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);

  const isLoading = useSelector((state) => state.skeleton.isLoading);

  useEffect(() => {
    setPage(1);
  }, [itemsCopy]);

  useEffect(() => {
    setProductsPerPage(productsPerPageMap[breakpoint]);
  }, [breakpoint]);

  useEffect(() => {
    const from = (page - 1) * productsPerPage;
    const to = page * productsPerPage;
    setPageProducts(itemsCopy.slice(from, to));

    const currentPageQty = Math.ceil(itemsCopy.length / productsPerPage);
    setPageQty(currentPageQty);

    if (page > currentPageQty) {
      setPage(1);
    }
  }, [itemsCopy, page, productsPerPage, breakpoint]);

  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        variant="h2"
        component="h2"
        color="text.primary"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>

      { pathname === '/menu' && (
      <Sorter
        type={type}
        selectedValueSortBy={selectedValueSortBy}
        setSelectedValueSortBy={setSelectedValueSortBy}
      />
      )}

      <Grid container spacing={0} sx={gridStylesContainer}>
        { pageProducts && pageProducts.map((item) => (
          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={type === 'partners' ? gridStylesItemPartners : gridStylesItemProducts}>
            {createElement(itemComponent, { ...item })}
          </Grid>
        ))}
      </Grid>

      {actions}
      {(pagination && pageQty > 1) && (
      <AppPagination
        page={page}
        setPage={setPage}
        pageQty={pageQty}
        anchor={anchor}
      />
      )}
      <Divider sx={{ marginTop: '67px' }} />
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.object,
  pagination: PropTypes.bool,
  anchor: PropTypes.object,
  items: PropTypes.array,
  itemComponent: PropTypes.func,
  type: PropTypes.string,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  pagination: false,
  anchor: {},
  items: [],
  itemComponent: () => {},
  type: '',
};

export default ListItems;
