import React, { createElement, memo, useCallback, useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useMediaQuery } from '@mui/material';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer, stylesSortSelect, TitleBtn } from './styles';
import AppPagination from '../Pagination/Pagination';
import Sorter from '../Sorter/Sorter';
import { setFilterParams } from '../../redux/slices/filterSlice';
import scrollToElementTop from '../../utils/scrollToElementTop';
import { setIsApplyClicked } from '../../redux/slices/scrollAnchorSlice';
import { openModal, setContent } from '../../redux/slices/modalSlice';
import AddNewProductForm from '../forms/AddNewProductForm/AddNewProductForm';

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

  const isLgTablet = useMediaQuery('(min-width: 690px)');

  const handleOpenModal = useCallback(() => {
    dispatch(openModal());
    dispatch(setContent(<AddNewProductForm />));
  }, [dispatch]);

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
      <Grid sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: 'repeat(2,1fr)' }}>
        <Typography
          variant="h2"
          component="h2"
          color="text.primary"
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>
        <Button variant="standard" sx={TitleBtn} onClick={handleOpenModal}>
          {isLgTablet && <Typography mr={1}>Add new porduct</Typography>}
          <AddCircleOutlineIcon />
        </Button>
      </Grid>

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
