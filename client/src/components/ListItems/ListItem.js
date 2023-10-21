import React, { createElement, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer } from './styles';
import AppPagination from '../Pagination/Pagination';
import usePaginationBreakpoint from '../../customHooks/usePaginationBreakpoint';

const ListItems = ({ title, items, itemComponent, actions, pagination, anchor, type }) => {
  const breakpoint = usePaginationBreakpoint();
  const productsPerPageMap = {
    mobileTablet: 10,
    lgTablet: 9,
    desktop: 12,
    lgDesktop: 15,
  };

  const [pageProducts, setPageProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageMap[breakpoint]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);

  useEffect(() => {
    setProductsPerPage(productsPerPageMap[breakpoint]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
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
