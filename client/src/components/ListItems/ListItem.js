import React, { createElement, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer, stylesSortSelect } from './styles';
import AppPagination from '../Pagination/Pagination';
import useBreakpoint from '../../customHooks/useBreakpoint';
import Sorter from '../Sorter/Sorter';
import { productsPerPageMap } from '../../constants/bpMapConstants';

const ListItems = ({ title, items, itemComponent, actions,
  pagination, anchor, type, itemsFrom, sorting }) => {
  const { pathname } = useLocation();
  const breakpoint = useBreakpoint();

  const [pageProducts, setPageProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageMap[breakpoint]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [items]);

  useEffect(() => {
    setProductsPerPage(productsPerPageMap[breakpoint]);
  }, [breakpoint]);

  useEffect(() => {
    const from = (page - 1) * productsPerPage;
    const to = page * productsPerPage;
    setPageProducts(items.slice(from, to));

    const currentPageQty = Math.ceil(items.length / productsPerPage);
    setPageQty(currentPageQty);

    if (page > currentPageQty) {
      setPage(1);
    }
  }, [items, page, productsPerPage, breakpoint]);

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

      { sorting && (
      <Sorter
        type={type}
        itemsFrom={itemsFrom}
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
  sorting: PropTypes.bool,
  anchor: PropTypes.object,
  items: PropTypes.array,
  itemComponent: PropTypes.func,
  type: PropTypes.string,
  itemsFrom: PropTypes.string,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  pagination: false,
  sorting: false,
  anchor: {},
  items: [],
  itemComponent: () => {},
  type: '',
  itemsFrom: '',

};

export default ListItems;
