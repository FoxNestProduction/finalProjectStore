import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { activateBtn, disableBtn, btn, largeBtn, smallBtn } from './styles';
import { fetchUpdatePartner } from '../../../redux/slices/partnersSlice';
import { fetchUpdateProduct } from '../../../redux/slices/productsSlice';

const DisableBtn = ({ item, type, isEditing, isLarge }) => {
  const dispatch = useDispatch();

  const handleDisable = async () => {
    if (type === 'partner') {
      dispatch(fetchUpdatePartner({ customId: item.customId, body: { enabled: !item.enabled } }));
    } else {
      dispatch(fetchUpdateProduct({ itemId: item._id, body: { enabled: !item.enabled } }));
    }
  };

  return (
    <Button
      type="button"
      variant="outlined"
      size="small"
      onClick={handleDisable}
      disabled={isEditing}
      sx={{
        ...btn,
        ...(item?.enabled ? disableBtn : activateBtn),
        ...(isLarge ? largeBtn : smallBtn),
      }}
    >
      {item.enabled ? 'Disable' : 'Activate'}
    </Button>
  );
};

DisableBtn.propTypes = {
  type: PropTypes.oneOf(['dish', 'partner']).isRequired,
  isLarge: PropTypes.bool,
  item: PropTypes.object,
  isEditing: PropTypes.bool,
};

DisableBtn.defaultProps = {
  isLarge: false,
  item: null,
  isEditing: false,
};

export default memo(DisableBtn);
