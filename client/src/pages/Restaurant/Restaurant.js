import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import useGetAPI from '../../customHooks/useGetAPI';
import { gridStylesContainer } from '../../components/ListItems/styles';
import Skeleton from '../../components/Skeleton/Skeleton';

const RestaurantPage = () => {
  const [partners, loading, error] = useGetAPI('/partners');

  const topProducts = useSelector((state) => state.products.topProducts, shallowEqual);
  const loadingProducts = useSelector((state) => state.products.loading);

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
          All Restaurants
        </Typography>

        {loading ? (
          <>
            <Skeleton skeletonType="restaurantsPage" />
            <Skeleton skeletonType="restaurantsPage" />
            <Skeleton skeletonType="restaurantsPage" />
            <Skeleton skeletonType="restaurantsPage" />
            <Skeleton skeletonType="restaurantsPage" />
          </>
        ) : (
          partners && partners.map(({ rating, name, imageUrl, description, customId }) => (
            <Link key={name} to={`/restaurants/${fixedEncodeURIComponent(name)}/${customId}`}>
              <RestaurantCard
                rating={rating}
                name={name}
                imageUrl={imageUrl}
                description={description}
                styleWidth={styleRestaurant}
              />
            </Link>
          )))}
      </Container>
      {loadingProducts ? (
        <Container sx={{ mb: 13 }}>
          <Box sx={gridStylesContainer}>
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
          </Box>
        </Container>
      ) : (topProducts.length > 0 && (
        <ListItems
          title="Our Top Dishes"
          items={topProducts}
          itemComponent={ProductCardItem}
          actions={null}
        />
      )) }
      <QuestionsList />
    </>
  );
};

export default memo(RestaurantPage);
