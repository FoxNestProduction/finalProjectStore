import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import useSortedItems from '../../customHooks/useSortedItems';
import { productsCardWidth } from '../../components/ListItems/styles';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';

const RestaurantPage = () => {
  const products = useSelector((state) => state.products.products, shallowEqual);
  const sortedProducts = useSortedItems(products, productsCardWidth);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  console.log(partners);

  const styleRestaurant = {
    mobile: 315,
    tablet: 420,
    lgTablet: 500,
    desktop: 800,
  };

  return (
    <Container
      component="section"
      sx={{
        bgcolor: 'background.default',
        m: '60px 0',
      }}
    >
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
      <ListItems title="Our Top Dishes" topDish items={sortedProducts} itemComponent={ProductCardItem} actions={null} />
      <QuestionsList />
    </Container>
  );
};

export default RestaurantPage;
