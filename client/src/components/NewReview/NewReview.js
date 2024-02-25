import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setNewReview } from '../../redux/slices/reviewsSlice';

const NewReview = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
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
        label={t('reviewsPage.labelNewReview')}
        type="text"
        fullWidth
        variant="outlined"
        onChange={handleReviewTextChange}
      />
      <Stack direction="row" color="primary.main" sx={{ pt: 2 }}>
        <Typography component="legend">{t('reviewsPage.textNewReview')}</Typography>
        <Rating
          name="simple-controlled"
          label={t('reviewsPage.labelRating')}
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
