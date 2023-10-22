import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';

const AppPagination = ({ page, setPage, pageQty, anchor }) => {
  const handlePageChange = (event, currentPage) => {
    setPage(currentPage);
    if (anchor) {
      setTimeout(() => {
        // eslint-disable-next-line react/prop-types
        anchor.scrollIntoView({
          block: 'start',
        });
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
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  pageQty: PropTypes.number.isRequired,
  anchor: PropTypes.object,
};

AppPagination.defaultProps = {
  anchor: null,
};

export default AppPagination;
