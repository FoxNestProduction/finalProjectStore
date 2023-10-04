import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import { gridStylesRestaurant, actionsStyle } from './styles';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import ArrowIcon from '../../assets/svgComponents/ArrowIcon';

const ListItems = ({ title, actions, items }) => {
  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>

        { items && items.map(({ name, rating, url, _id, isHealthy, isTranding, isSupreme }) => (

          <Grid key={_id} item mobile={12} lgTablet={6} desktop={4} sx={gridStylesRestaurant}>
            <RestaurantItem
              name={name}
              rating={rating}
              isHealthy={isHealthy}
              isTranding={isTranding}
              isSupreme={isSupreme}
              url={url}
              id={_id}
            />
          </Grid>
        ))}
      </Grid>
      <Link
        underline="none"
        href="/Menu"
        color="text.secondaryGray"
        sx={actionsStyle}
      >
        <Typography
          variant="body4"
          component="p"
        >
          View All
        </Typography>
        <ArrowIcon />
      </Link>
      {/* {actions} */}
      <Divider sx={{ paddingTop: '67px' }} />
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  items: PropTypes.array,
};

ListItems.defaultProps = {
  title: '',
  actions: null,
  items: [],
};

export default ListItems;
