import React, { memo, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import ItemsEditor from '../../ItemsEditor/ItemsEditor';
import useGetAPI from '../../../customHooks/useGetAPI';
import { fetchGetPartner } from '../../../redux/slices/partnersSlice';
import { fetchGetOneProduct } from '../../../redux/slices/productsSlice';

const EditDishPage = () => {
  const { itemNo } = useParams();
  const dispatch = useDispatch();

  const dishLoading = useSelector((state) => state.products.loading);
  const dish = useSelector((state) => state.products.oneProduct);

  useEffect(() => {
    dispatch(fetchGetOneProduct(itemNo));
  }, [dispatch, itemNo]);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Dish
      </Typography>
      {dishLoading
        ? (<Typography>Loading...</Typography>)
        : (dish && <ItemsEditor type="dish" />)}
    </Container>
  );
};

export default memo(EditDishPage);
