import React, { memo } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import ItemsEditor from '../../ItemsEditor/ItemsEditor';
import useGetAPI from '../../../customHooks/useGetAPI';

const EditDishPage = () => {
  const { dishId } = useParams();
  const [dish, dishLoading] = useGetAPI(`/products/${dishId}`);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Dish
      </Typography>
      {dishLoading
        ? (<Typography>Loading...</Typography>)
        : (dish && <ItemsEditor entity={dish} type="dish" />)}
    </Container>
  );
};

export default memo(EditDishPage);
