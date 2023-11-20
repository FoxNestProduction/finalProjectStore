import React, { createElement, memo, useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer, stylesSortSelect } from './styles';
import AppPagination from '../Pagination/Pagination';
import Sorter from '../Sorter/Sorter';
import { setFilterParams } from '../../redux/slices/filterSlice';
import scrollToElementTop from '../../utils/scrollToElementTop';
import { setIsApplyClicked } from '../../redux/slices/scrollAnchorSlice';

const ListItems = ({ title, items, itemComponent, actions,
  pagination, type, itemsFrom, sorting, isScrolling }) => {
  const dispatch = useDispatch();

  const anchor = useSelector((state) => state.scrollAnchor.productsScrollAnchor);
  const isApplyClicked = useSelector((state) => state.scrollAnchor.isApplyClicked);
  const nothingFound = useSelector((state) => state.filter.nothingFound);

  const page = useSelector((state) => state.filter.filterParams.page);
  const productsPerPage = useSelector((state) => state.filter.filterParams.perPage);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const allProductsQuantity = useSelector((state) => state.products.productsQuantity);

  const [pageQty, setPageQty] = useState(1);

  useEffect(() => {
    let currentPageQty;
    if (itemsFrom === 'filter') {
      currentPageQty = Math.ceil(filteredProductsQuantity / productsPerPage);
    } else {
      currentPageQty = Math.ceil(allProductsQuantity / productsPerPage);
    }
    setPageQty(currentPageQty);

    if (page > currentPageQty) {
      dispatch(setFilterParams({ startPage: 1 }));
    }
  }, [filteredProductsQuantity, allProductsQuantity, itemsFrom, productsPerPage, page, dispatch]);

  useEffect(() => {
    if (anchor && isScrolling && isApplyClicked && !nothingFound) {
      setTimeout(() => {
        scrollToElementTop(anchor);
      }, 200);
      dispatch(setIsApplyClicked(false));
    }
  }, [items, nothingFound]); // eslint-disable-line

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
      />
      )}

      <Grid container spacing={0} sx={gridStylesContainer}>
        { items && items.map((item) => (
          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={type === 'partners' ? gridStylesItemPartners : gridStylesItemProducts}>
            {createElement(itemComponent, { ...item })}
          </Grid>
        ))}
      </Grid>

      {actions}
      {(pagination && pageQty > 1) && (
      <AppPagination
        pageQty={pageQty}
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
  items: PropTypes.array,
  itemComponent: PropTypes.object,
  type: PropTypes.string,
  itemsFrom: PropTypes.string,
  isScrolling: PropTypes.bool,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  pagination: false,
  sorting: false,
  items: [],
  itemComponent: {},
  type: '',
  itemsFrom: '',
  isScrolling: false,
};

export default memo(ListItems);
