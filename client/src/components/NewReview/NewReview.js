import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setNewReview } from '../../redux/slices/reviewsSlice';

const NewReview = () => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => state.reviews.newReview.rating);

  const handleReviewTextChange = (event) => {
    const newReviewText = event.target.value;
    dispatch(setNewReview({ field: 'content', value: `${newReviewText}` }));
  };

  return (
    <>
      <TextField
        autoFocus
        multiline
        rows={4}
        margin="dense"
        id="review"
        label="leave your feedback about the service"
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleReviewTextChange}
      />
      <Stack direction="row" color="primary.main" sx={{ pt: 2 }}>
        <Typography component="legend">You can rate the service</Typography>
        <Rating
          name="simple-controlled"
          label="You can rate our service"
          value={rating}
          onChange={(event, newValue) => {
            dispatch(setNewReview({ field: 'rating', value: newValue }));
          }}
        />
      </Stack>
    </>
  );
};

export default memo(NewReview);
