import React, { memo } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import useGetAPI from '../../../customHooks/useGetAPI';
import ItemsEditorCopy from '../../ItemsEditor/ItemsEditorСopy';

const AddDishPage = () => {
  const { itemNo } = useParams();
  const [dish, loading] = useGetAPI(`/products/${itemNo}`);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1">
        {dish ? dish.name : 'Add new dish'}
      </Typography>
      {loading
        ? (<Typography>Loading...</Typography>)
        : (dish && <ItemsEditorCopy type="product" />)}
    </Container>
  );
};

export default memo(AddDishPage);
