import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from '../../API/instance';

const initialState = {
  reviews: [],
  newReview: {
    user_id: '',
    customer: {},
    rating: null,
    content: '',
  },
  search: '',
};

/* eslint-disable no-param-reassign */
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action) { // eslint-disable-line no-shadow
      state.reviews = action.payload;
    },
    addReview(state) {
      // state.reviews.unshift(state.newReview);
      state.reviews.push(state.newReview);
    },
    setNewReview(state, action) {
      const { field, value } = action.payload;
      state.newReview[field] = value;
    },
    searchReviews(state, action) {
      state.search = action.payload;
    },
    resetReviewState(state) {
      state.newReview.rating = null;
      state.newReview.content = '';
    },
  },
});

export const {
  setReviews,
  addReview,
  setNewReview,
  searchReviews,
  resetReviewState,
} = reviewsSlice.actions;

export const getReviews = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/comments');
    dispatch(setReviews(data));
  } catch (error) {
    console.log('%cError loading reviews:', 'color: red; font-weight: bold;', error);
  }
};

export const addNewReview = (review) => async (dispatch, getState) => {
  try {
    const state = getState();
    // eslint-disable-line no-use-before-define
    const { data } = await instance.post('/comments', state.reviews.newReview);
    const { customer, date, content, rating } = data;
    dispatch(setNewReview({ field: 'customer', value: customer }));
    dispatch(setNewReview({ field: 'date', value: date }));
    dispatch(setNewReview({ field: 'content', value: content }));
    dispatch(setNewReview({ field: 'rating', value: rating }));
    // dispatch(addReview(state.reviews.newReview));
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

/* eslint-enable no-param-reassign */

export default reviewsSlice.reducer;
