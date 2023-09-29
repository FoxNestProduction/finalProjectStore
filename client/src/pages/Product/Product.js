import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ProductCard from '../../components/ProductCard/ProductCard';

const ProductPage = () => {
  return (
    <Container>
      <ProductCard />
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center' }}
      >
        Popular
      </Typography>
      <Grid container spacing={2} sx={{ mb: 8 }}>
        {/* {data.map((item) => (
          <Grid key={1} item mobile={6} desktop={3}>
            {item}
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
};

export default ProductPage;
