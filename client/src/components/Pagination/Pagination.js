import React from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

const pageSize = 3;

const AppPagination = () => {
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      my: '30px',
    }}
    >
      <Pagination count={10} color="primary" size="large" />
    </Container>
  );
};

export default AppPagination;
