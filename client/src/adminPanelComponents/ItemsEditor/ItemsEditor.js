/* eslint-disable max-len */
import React, { useState, useEffect, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {
  card,
  topBtnsWrapper,
  cardImgWrapper,
  dishCardImg,
  partnerCardImg,
  formWrapper,
  infoWrapper,
  toggleDisableBtn,
  disableBtn,
  activateBtn, showDishesBtn,
} from './styles';
import EditIcon from '../../assets/svgComponents/EditIcon';
import PartnerEditForm from '../forms/EditPartnerForm/EditPartnerForm';
import { instance } from '../../API/instance';
import { fetchUpdatePartner } from '../../redux/slices/partnersSlice';

const ItemsEditor = ({ entity, type }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const dispatch = useDispatch();
  const [item, setItem] = useState(entity);

  const handleDisable = async () => {
    // if (type === 'partner') {
    //   dispatch(fetchUpdatePartner({ partnerId: item.customId, body: { enabled: !item.enabled } }));
    // }
    const path = (type === 'dish') ? `/products/${item._id}` : `/partners/${item.customId}`;

    try {
      const { data } = await instance.put(path, { enabled: !item.enabled });
      setItem((prev) => ({ ...prev, enabled: data.enabled }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ ...card, ...(!item?.enabled ? { outline: '2px solid', outlineColor: (theme) => theme.palette.disable } : {}) }}>
      <CardActions sx={topBtnsWrapper}>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={handleDisable}
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
      <Box sx={infoWrapper}>
        <Box sx={cardImgWrapper}>
          <CardMedia
            component="img"
            src={item.imageUrl}
            alt={item.name}
            sx={type === 'dish' ? dishCardImg : partnerCardImg}
          />
        </Box>
        <Box sx={formWrapper}>
          {type === 'partner' ? (
            <PartnerEditForm
              partner={item}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (<Typography variant="h3">Dish form will be here :)</Typography>)}
        </Box>
      </Box>
      {!isEditing && type === 'partner' && (
        <CardActions sx={{ justifyContent: 'flex-end',
          p: '0',
          mt: {
            mobile: '20px',
            desktop: '10px',
          } }}
        >
          <Button type="button" variant="outlined" size="small" sx={showDishesBtn}>Show dishes</Button>
        </CardActions>
      )}
    </Card>
  );
};

ItemsEditor.propTypes = {
  entity: PropTypes.object,
  // item: PropTypes.object,
  type: PropTypes.oneOf(['dish', 'partner']).isRequired,
};

ItemsEditor.defaultProps = {
  entity: null,
  // item: null,
};

export default memo(ItemsEditor);
