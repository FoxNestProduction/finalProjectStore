import React, { memo, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import ItemsEditor from '../../components/ItemsEditor/ItemsEditor';
import { fetchGetOneProduct } from '../../../redux/slices/productsSlice';

const AddEditDishPage = () => {
  const { itemNo } = useParams();
  const dispatch = useDispatch();

  const oneProduct = useSelector((state) => state.products.oneProduct);

  useEffect(() => {
    if (itemNo) {
      dispatch(fetchGetOneProduct(itemNo));
    }
  }, [dispatch, itemNo]);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        {!oneProduct ? 'Add new dish' : oneProduct?.name}
      </Typography>
      <ItemsEditor type="dish" isNewItem={!itemNo && true} />
    </Container>
  );
};

export default memo(AddEditDishPage);
