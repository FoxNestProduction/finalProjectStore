/* eslint-disable max-len */
import React, { useState, useEffect, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {
  card,
  topBtnsWrapper,
  toggleDisableBtn,
  disableBtn,
  activateBtn, showDishesBtn, getCardStyles, showDishesBtnWrapper,
} from './styles';
import EditIcon from '../../assets/svgComponents/EditIcon';
import AddEditPartnerForm from '../forms/AddEditPartnerForm/AddEditPartnerForm';
import { fetchUpdatePartner } from '../../redux/slices/partnersSlice';
import { fetchUpdateProduct } from '../../redux/slices/productsSlice';
import AddEditProductForm from '../forms/AddEditProductForm/AddEditProductForm';

const ItemsEditor = ({ type, isNewItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const item = useSelector((state) => {
    return type === 'partner' ? state.partners.currentEditingPartner : state.products.oneProduct;
  });

  const handleDisable = async () => {
    if (type === 'partner') {
      dispatch(fetchUpdatePartner({ customId: item.customId, body: { enabled: !item.enabled } }));
    } else {
      dispatch(fetchUpdateProduct({ itemId: item._id, body: { enabled: !item.enabled } }));
    }
  };

  return (
    <Card sx={getCardStyles(item)}>
      {!isNewItem && (
      <CardActions sx={topBtnsWrapper}>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={handleDisable}
          disabled={isEditing}
          sx={{ ...toggleDisableBtn, ...(item?.enabled ? disableBtn : activateBtn) }}
        >
          {item.enabled ? 'Disable' : 'Activate'}
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
      {type === 'partner' ? (
        <AddEditPartnerForm
          partner={isNewItem ? null : item}
          isEditing={isNewItem ? true : isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AddEditProductForm
          dish={isNewItem ? null : item}
          isEditing={isNewItem ? true : isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      {!isEditing && type === 'partner' && !isNewItem && (
        <CardActions sx={showDishesBtnWrapper}>
          <Button type="button" variant="outlined" size="small" sx={showDishesBtn}>Show dishes</Button>
        </CardActions>
      )}
    </Card>
  );
};

ItemsEditor.propTypes = {
  type: PropTypes.oneOf(['dish', 'partner']).isRequired,
  isNewItem: PropTypes.bool,
};

ItemsEditor.defaultProps = {
  isNewItem: false,
};

export default memo(ItemsEditor);
