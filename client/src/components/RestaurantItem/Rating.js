import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const RatingItem = ({ ratingValue }) => {
  const [value, setValue] = React.useState(null);

  return (
    <Box
      sx={{
        '& > legend': { mt: -1 },
      }}
    >
      <Typography component="legend">rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
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
