import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import StarIcon from '../../assets/svgComponents/StarIcon';

const RatingItem = ({ ratingValue }) => {
  const [value, setValue] = useState(ratingValue);

  return (
    <Box>
      <Rating
        sx={{
          width: {
            mobile: 140,
            tablet: 140,
            desktop: 150,
          },
          marginLeft: '-4px',
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        // precision={0.5}
        size="small"
        icon={<StarIcon fill="#6C5FBC" />}
        emptyIcon={<StarIcon fill="#e7ddc5" />}
        readOnly
      />
    </Box>
  );
};

RatingItem.propTypes = {
  ratingValue: PropTypes.number,
};

RatingItem.defaultProps = {
  ratingValue: 3,
};

export default RatingItem;
