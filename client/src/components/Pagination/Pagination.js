import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterParams } from '../../redux/slices/filterSlice';
import scrollToElementTop from '../../utils/scrollToElementTop';

const AppPagination = ({ pageQty }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.filter.filterParams.startPage);
  const anchor = useSelector((state) => state.scrollAnchor.productsScrollAnchor);

  const handlePageChange = (event, currentPage) => {
    dispatch(setFilterParams({ startPage: currentPage }));

    if (anchor) {
      setTimeout(() => {
        scrollToElementTop(anchor);
      }, 200);
    }
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
  pageQty: PropTypes.number.isRequired,
};

export default memo(AppPagination);
