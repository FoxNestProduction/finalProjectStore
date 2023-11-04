import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchFilteredProducts, setFilterParams } from '../../redux/slices/filterSlice';
import getQueryStringFromFilterParams from '../../utils/filter/getQueryStringFromFilterParams';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';

const AppPagination = ({ pageQty, anchor, itemsFrom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector((state) => state.filter.filterParams.startPage);
  const filterParams = useSelector((state) => state.filter.filterParams);

  const handlePageChange = (event, currentPage) => {
    dispatch(setFilterParams({ startPage: currentPage }));

    const updatedFilterParams = {
      ...filterParams,
      startPage: currentPage,
    };

    if (itemsFrom === 'filter') {
      const queryString = getQueryStringFromFilterParams(updatedFilterParams);
      navigate(queryString);
      console.log('🧡🧡🧡 fetchFilteredProducts by Pagination');
      dispatch(fetchFilteredProducts(queryString));
    } else {
      delete updatedFilterParams.minPrice;
      delete updatedFilterParams.maxPrice;
      const queryString = getQueryStringFromFilterParams(updatedFilterParams);
      navigate(queryString);
      console.log('🧡🧡🧡 fetchSortedProducts by Pagination');
      dispatch(fetchSortedProducts(queryString));
    }

    // if (anchor) {
    //   setTimeout(() => {
    //     // eslint-disable-next-line react/prop-types
    //     anchor.scrollIntoView({
    //       block: 'start',
    //     });
    //   }, 200);
    // }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mt: '50px',
    }}
    >
      <Pagination
        page={page}
        count={pageQty}
        onChange={handlePageChange}
        color="secondary"
        sx={{
          '& .MuiButtonBase-root': (theme) => ({
            [theme.breakpoints.down('tablet')]: {
              minWidth: '30px',
              height: '30px',
            },
            fontWeight: theme.typography.fontWeightMedium,
          }),
          '& .MuiButtonBase-root.Mui-selected': {
            color: 'text.primaryLight',
          },
        }}
      />
    </Box>
  );
};

AppPagination.propTypes = {
  itemsFrom: PropTypes.string.isRequired,
  pageQty: PropTypes.number.isRequired,
  anchor: PropTypes.object,
};

AppPagination.defaultProps = {
  anchor: null,
};

export default AppPagination;
