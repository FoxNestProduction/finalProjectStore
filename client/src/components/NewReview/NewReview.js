import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setNewRating, setNewReviewText } from '../../redux/slices/reviewsSlice';

const NewReview = () => {
  const dispatch = useDispatch();
  const textReview = useSelector((state) => state.reviews.newReview);
  const rating = useSelector((state) => state.reviews.newRating);
  const handleReviewTextChange = (event) => {
    dispatch(setNewReviewText(event.target.value));
    console.log(textReview);
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
          label="You can rate the service"
          value={rating}
          onChange={(event, newValue) => {
            dispatch(setNewRating(newValue));
          }}
        />
      </Stack>
    </>
  );
};

export default NewReview;
