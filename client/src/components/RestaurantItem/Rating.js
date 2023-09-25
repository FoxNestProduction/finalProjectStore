import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { PropTypes } from 'prop-types';
import StarIcon from '../SvgComponents/StarIcon';

const RatingItem = ({ ratingValue }) => {
  const [value, setValue] = React.useState(3);

  const changeRating = () => {
    setValue(ratingValue);
  };

  return (
    <Box>
      <Rating
        value={value}
        // value={changeRating()}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        // precision={0.5}
        size="large"
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
  ratingValue: null,
};

export default RatingItem;
