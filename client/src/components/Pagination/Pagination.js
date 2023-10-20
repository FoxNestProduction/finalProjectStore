import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

// eslint-disable-next-line react/prop-types
const AppPagination = ({ page, setPage, productsPerPage, count }) => {
  console.log(count);
  // const [pagination, setPagination] = useState({
  //   count: 0, // quantity of products
  //   from: 0,
  //   to: pageSize,
  // });

  const handlePageChange = (event, currentPage) => {
    setPage(currentPage);
    console.log(currentPage);
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
        // count={10}
        page={page}
        count={Math.ceil(count / productsPerPage)}
        onChange={handlePageChange}
        // page={1} // the number of current page
        color="secondary"
        // hidePrevButton
        // hideNextButton
        sx={{
          '& .MuiButtonBase-root': {
            // fontSize: '16px',
            // // px: '2px',
            // minWidth: '30px',
            // height: '30px',
          },
          '& .MuiButtonBase-root.Mui-selected': {
            color: 'text.primaryLight',
          },
        }}
      />
    </Box>
  );
};

export default AppPagination;
