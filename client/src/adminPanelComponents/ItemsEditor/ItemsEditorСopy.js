/* eslint-disable max-len */
import React, { useState, useEffect, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import {
  card,
  topBtnsWrapper,
  toggleDisableBtn,
  disableBtn,
  activateBtn, showDishesBtn, getCardStyles,
} from './styles';
import EditIcon from '../../assets/svgComponents/EditIcon';
import PartnerEditForm from '../forms/EditPartnerForm/EditPartnerForm';
import { fetchUpdatePartner } from '../../redux/slices/partnersSlice';
import { fetchUpdateProduct } from '../../redux/slices/productsSlice';
import AddEditProductForm from '../forms/AddEditProductPage/AddEditProductForm';
import useGetAPI from '../../customHooks/useGetAPI';

const ItemsEditorCopy = ({ type, isNewItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { itemNo } = useParams();
  const [dish] = useGetAPI(`/products/${itemNo}`);

  const { customId } = useParams();
  const [partner] = useGetAPI(`/partner/${customId}`);

  const handleDisable = async () => {
    if (type === 'partner') {
      dispatch(fetchUpdatePartner({ customId: dish.customId, body: { enabled: !dish.enabled } }));
    } else {
      dispatch(fetchUpdateProduct({ itemNo: dish.itemNo, body: { enabled: !dish.enabled } }));
    }
  };

  return (
    <Card sx={getCardStyles(dish)}>
      {!isNewItem && (
      <CardActions sx={topBtnsWrapper}>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={handleDisable}
          disabled={isEditing}
          sx={{ ...toggleDisableBtn, ...(dish?.enabled ? disableBtn : activateBtn) }}
        >
          {dish.enabled ? 'Disable' : 'Activate'}
        </Button>
        <IconButton
          sx={{
            bgcolor: 'background.footer',
            '&.Mui-disabled': {
              bgcolor: 'scrollbar.track',
            },
          }}
          onClick={() => { setIsEditing(true); }}
          disabled={isEditing}
        >
          <EditIcon color={isEditing ? '#c8c5df' : undefined} />
        </IconButton>
      </CardActions>
      )}
      {type === 'partner' ? null : (
        <AddEditProductForm
          item={dish}
          isEditing={isNewItem ? true : isEditing}
          setIsEditing={isNewItem ? undefined : setIsEditing}
        />
      )}
    </Card>
  );
};

ItemsEditorCopy.propTypes = {
  type: PropTypes.oneOf(['product', 'partner']).isRequired,
  isNewItem: PropTypes.bool,
};

ItemsEditorCopy.defaultProps = {
  isNewItem: false,
};

export default memo(ItemsEditorCopy);
