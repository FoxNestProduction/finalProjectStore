import React, { memo, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
// import ItemsEditorCopy from '../../ItemsEditor/ItemsEditorСopy';
import ItemsEditor from '../../components/ItemsEditor/ItemsEditor';
import { fetchGetOneProduct } from '../../../redux/slices/productsSlice';

const AddEditDishPage = () => {
  const { itemNo } = useParams();
  const dispatch = useDispatch();

  const { oneProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (itemNo) {
      dispatch(fetchGetOneProduct(itemNo));
    }
  }, [dispatch, itemNo]);

  const { pathname } = useLocation();

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        {itemNo && oneProduct ? oneProduct.name : 'Add new dish'}
      </Typography>
      {loading ? (<Typography>Loading...</Typography>) : oneProduct && (<ItemsEditor type="dish" isNewItem={!itemNo && true} />)}
    </Container>
  );
};

export default memo(AddEditDishPage);
