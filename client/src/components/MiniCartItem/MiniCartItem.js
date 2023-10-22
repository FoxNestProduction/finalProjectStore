import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {
  cartProductImg,
  MiniCartItemContainer,
} from './styles';

const MiniCartItem = ({ _id, name, cartQuantity, currentPrice, imageUrl }) => {
  return (
    <Card
      sx={MiniCartItemContainer}
    >
      <Box>
        <CardMedia
          component="img"
          sx={cartProductImg}
          image={imageUrl}
          alt={name}
        />
      </Box>
      <Box
        sx={{
          alignSelf: 'center',
        }}
      >
        <CardContent>
          <Typography>
            {name}
          </Typography>
          <Typography>
            $
            {currentPrice}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          m: '5px 5px',
        }}
      >
        <Button>
          <RemoveRoundedIcon />
        </Button>
      </Box>
    </Card>
  );
};

MiniCartItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  cartQuantity: PropTypes.number,
  currentPrice: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
};

MiniCartItem.defaultProps = {
  _id: '',
  cartQuantity: 1,
  imageUrl: './img/pasta.png',
};

export default MiniCartItem;
