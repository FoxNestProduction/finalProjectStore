import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import RestaurantItem from '../RestaurantItem/RestaurantItem';
import ArrowIcon from '../../assets/svgComponents/ArrowIcon';

const ListItems = ({ title, actions }) => {
  return (
    <Container sx={{ mb: 18 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
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
          <Grid key={item.id} item mobile={6} desktop={3}>
            {item}
          </Grid>
        ))} */}
      </Grid>
      {actions}
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
};

ListItems.defaultProps = {
  title: '',
  actions: null,
};

export default ListItems;
