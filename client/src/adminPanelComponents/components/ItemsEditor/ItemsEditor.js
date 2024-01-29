import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {
  topBtnsWrapper, showDishesBtn, getCardStyles, showDishesBtnWrapper,
} from './styles';
import EditIcon from '../../../assets/svgComponents/EditIcon';
import AddEditPartnerForm from '../../forms/AddEditPartnerForm/AddEditPartnerForm';
import AddEditProductForm from '../../forms/AddEditProductForm/AddEditProductForm';
import DisableBtn from '../DisableBtn/DisableBtn';

const ItemsEditor = ({ type, isNewItem, showDishes, setShowDishes }) => {
  const [isEditing, setIsEditing] = useState(false);

  const item = useSelector((state) => {
    return type === 'partner' ? state.partners.currentEditingPartner : state.products.oneProduct;
  });

  return (
    <Card sx={getCardStyles(item)}>
      {!isNewItem && (
      <CardActions sx={topBtnsWrapper}>
        <DisableBtn item={item} type={type} isEditing={isEditing} isLarge />
        <IconButton
          sx={{
            bgcolor: 'background.footer',
            '&.Mui-disabled': {
              bgcolor: 'scrollbar.track',
            },
            '&:hover': {
              bgcolor: 'background.iconHover',
            },
          }}
          onClick={() => { setIsEditing(true); }}
          disabled={isEditing}
          title="Edit partner info"
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
          <Button
            type="button"
            variant="outlined"
            size="small"
            sx={showDishesBtn}
            onClick={(e) => {
              e.preventDefault();
              setShowDishes((prev) => !prev);
            }}
          >
            {showDishes ? 'Hide dishes' : 'Show dishes'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

ItemsEditor.propTypes = {
  type: PropTypes.oneOf(['dish', 'partner']).isRequired,
  isNewItem: PropTypes.bool,
  showDishes: PropTypes.bool,
  setShowDishes: PropTypes.func,
};

ItemsEditor.defaultProps = {
  isNewItem: false,
  showDishes: false,
  setShowDishes: {},
};

export default memo(ItemsEditor);
