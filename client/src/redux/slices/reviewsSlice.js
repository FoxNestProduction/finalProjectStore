import { createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

const initialState = {
  newReview: {
    user_id: '',
    customer: {},
    rating: null,
    content: '',
    _id: '',
  },
  search: '',
  indexSearch: null,
};

/* eslint-disable no-param-reassign */
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setNewReview(state, action) {
      const { field, value } = action.payload;
      state.newReview[field] = value;
    },
    searchReviews(state, action) {
      state.search = action.payload;
    },
    setIndexSearchReview(state, action) {
      state.indexSearch = action.payload;
    },
    resetReviewState(state) {
      state.newReview.rating = null;
      state.newReview.content = '';
      state.newReview._id = '';
    },
  },
});

export const {
  setNewReview,
  searchReviews,
  setIndexSearchReview,
  resetReviewState,
} = reviewsSlice.actions;

export const addNewReview = (review) => async (dispatch, getState) => {
  try {
    const state = getState();
    // eslint-disable-line no-use-before-define
    const { data } = await instance.post('/comments', state.reviews.newReview);
    const { customer, date, content, rating, _id } = data;
    dispatch(setNewReview({ field: 'customer', value: customer }));
    dispatch(setNewReview({ field: 'date', value: date }));
    dispatch(setNewReview({ field: 'content', value: content }));
    dispatch(setNewReview({ field: 'rating', value: rating }));
    dispatch(setNewReview({ field: '_id', value: _id }));
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

/* eslint-enable no-param-reassign */

export default reviewsSlice.reducer;
