import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import useGetAPI from '../../customHooks/useGetAPI';

const RestaurantPage = () => {
  const [partners, loading, error] = useGetAPI('/partners');

  const topProducts = useSelector((state) => state.products.topProducts);

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
        {partners && partners.map(({ rating, name, imageUrl, description, customId }) => (
          <Link key={name} to={`/restaurants/${fixedEncodeURIComponent(name)}/${customId}`}>
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
      {topProducts.length > 0 && (
        <ListItems
          title="Our Top Dishes"
          items={topProducts}
          itemComponent={ProductCardItem}
          actions={null}
        />
      ) }
      <QuestionsList />
    </>
  );
};

export default RestaurantPage;
