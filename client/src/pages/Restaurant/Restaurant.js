import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import TopDishes from '../../components/TopDishes/TopDishes';

const RestaurantPage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);

  const styleRestaurant = {
    mobile: 315,
    tablet: 420,
    lgTablet: 500,
    desktop: 800,
  };

  return (
    <>
      <Container
        component="section"
        sx={{
          bgcolor: 'background.default',
          my: '60px',
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          color="text.primary"
          sx={{ textAlign: 'center', mb: 6 }}
        >
          Our All Restaurants
        </Typography>
        {partners.map(({ rating, name, imageUrl, description }) => (
          <Link key={name} to={`/restaurants/${fixedEncodeURIComponent(name)}`}>
            <RestaurantCard
              rating={rating}
              name={name}
              imageUrl={imageUrl}
              description={description}
              styleWidth={styleRestaurant}
            />
          </Link>
        ))}
      </Container>
      <TopDishes />
      <QuestionsList />
    </>
  );
};

export default RestaurantPage;
