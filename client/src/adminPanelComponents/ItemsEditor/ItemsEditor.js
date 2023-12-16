/* eslint-disable max-len */
import React, { useState, useEffect, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { Card, CardContent, Container } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {
  card,
  cardImgWrapper,
  cardImg,
  formWrapper,
  infoWrapper,
  toggleDisableBtn,
  disableBtn,
  activateBtn, showDishesBtn,
} from './styles';
import EditIcon from '../../assets/svgComponents/EditIcon';
import PartnerEditForm from '../forms/EditPartnerForm/EditPartnerForm';
import { topBtnsWrapper } from '../pages/EditPartnerPage/styles';

const ItemsEditor = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card sx={{ ...card, ...(!item?.enabled ? { border: '2px solid', borderColor: 'disable' } : {}) }}>
      <CardActions sx={topBtnsWrapper}>
        <Button
          type="button"
          variant="outlined"
          size="small"
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
            width="600"
            height="400"
            sx={cardImg}
          />
        </Box>
        <Box sx={formWrapper}>
          <PartnerEditForm
            restaurant={item}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </Box>
      </Box>
      {!isEditing && (
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
  item: PropTypes.object,
};

ItemsEditor.defaultProps = {
  item: {},
};

export default memo(ItemsEditor);
