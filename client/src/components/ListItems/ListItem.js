import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import RestaurantItem from '../RestaurantItem/RestaurantItem';

const ListItems = () => {
  return (
    <Container sx={{ mb: 30 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Popular
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8, m: 0, justifyContent: 'space-between' }}>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <RestaurantItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <RestaurantItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <RestaurantItem />
        </Grid>
        <Grid item mobile={6} desktop={3} sx={{ p: 0 }}>
          <RestaurantItem />
        </Grid>
        {/* {data.map((item) => (
          <Grid key={1} item mobile={6} desktop={3}>
            {item}
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
};

export default ListItems;
