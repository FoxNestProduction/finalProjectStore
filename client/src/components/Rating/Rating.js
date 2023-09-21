import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const RatingItem = ({ ratingValue }) => {
  const [value, setValue] = React.useState(2.5);

  return (
    <Box
      sx={{
        '& > legend': { mt: -1 },
      }}
    >
      <Rating sx={{ size: 2 }} name="read-only" value={value} readOnly size="small" />
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
