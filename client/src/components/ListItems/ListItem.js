import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import ProductCardItem from '../ProductCardItem/ProductCardItem';

const ListItems = () => {
  return (
    <Container sx={{ mb: 18 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Popular
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8, m: 0, justifyContent: 'space-between' }}>
        <Grid item xs mobile={6} desktop={3} sx={{ p: 0 }}>
          <ProductCardItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <ProductCardItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <ProductCardItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <ProductCardItem />
        </Grid>
        {/* {data.map((item) => (
          <Grid key={item.id} item mobile={6} desktop={3}>
            {item}
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
};

export default ListItems;
