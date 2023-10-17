import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from '../../API/instance';

const initialState = {
  reviews: [],
  newReview: {
    user_id: '',
    rating: null,
    avatarUrl: '',
    content: '',
    userReview: '',
    date: Date.now(),
    product: '6507a306baee59670a047307',
  },
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
      state.reviews.push(state.newReview);
    },
    removeReview(state, action) {
      const itemToRemove = action.payload;
      /* eslint-disable-next-line no-underscore-dangle */
      state.reviews = state.reviews.filter((review) => review._id !== itemToRemove);
    },
    setNewReview(state, action) {
      const { field, value } = action.payload;
      state.newReview[field] = value;
    },
  },
});

export const getReviews = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/comments');
    console.log(data);
    dispatch(setReviews(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('%cError loading reviews:', 'color: red; font-weight: bold;', error);
  }
};

export const addNewReview = (review) => async (dispatch, getState) => {
  try {
    const state = getState();
    dispatch(addReview(state.newReview));// eslint-disable-line no-use-before-define
    const { data } = await instance.post('/comments', state.reviews.newReview, {
      headers: {
        Authorization: state.authorization.token,
      },
    });
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

export const removeReviewId = (_id) => async (dispatch) => {
  try {
    await instance.delete('/comments/_id');
    dispatch(removeReview(_id));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('%cError delete review:', 'color: red; font-weight: bold;', error);
  }
};

export const {
  setReviews,
  addReview,
  removeReview,
  setNewRating,
  setNewReview,
} = reviewsSlice.actions;

/* eslint-enable no-param-reassign */

export default reviewsSlice.reducer;
