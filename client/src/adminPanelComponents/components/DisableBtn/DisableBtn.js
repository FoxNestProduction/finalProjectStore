import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { activateBtn, disableBtn, btn } from './styles';
import { fetchUpdatePartner } from '../../../redux/slices/partnersSlice';
import { fetchUpdateProduct } from '../../../redux/slices/productsSlice';

const DisableBtn = ({ item, type, isEditing, customStyles }) => {
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
        ...customStyles,
      }}
    >
      {item.enabled ? 'Disable' : 'Activate'}
    </Button>
  );
};

DisableBtn.propTypes = {
  type: PropTypes.oneOf(['dish', 'partner']).isRequired,
  item: PropTypes.object,
  isEditing: PropTypes.bool,
  customStyles: PropTypes.object,
};

DisableBtn.defaultProps = {
  item: null,
  isEditing: false,
  customStyles: {},
};

export default memo(DisableBtn);
