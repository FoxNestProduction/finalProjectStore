import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  newReview: '',
  newRating: null,
};

/* eslint-disable no-param-reassign */

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action) { // eslint-disable-line no-shadow
      state.reviews = action.payload;
    },
    addReview(state, action) {
      const body = {
        comment: state.reviews.newReview,
        rating: state.reviews.newRating,
      };
      state.reviews.push(action.payload);
    },
    removeReview(state, action) {
      const itemToRemove = action.payload;
      /* eslint-disable-next-line no-underscore-dangle */
      state.reviews = state.reviews.filter((review) => review._id !== itemToRemove);
    },
    setNewReviewText(state, action) {
      state.newReview = action.payload;
    },
    setNewRating(state, action) {
      state.newRating = action.payload;
    },
  },
});

export const getReviews = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/comments');
    console.log(data);
    dispatch(setReviews(data));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('%cError loading reviews:', 'color: red; font-weight: bold;', error);
  }
};

export const addNewReview = (review) => async (dispatch, getState) => {
  try {
    const state = getState();
    const newFeedback = {
      user_id: '',
      comment: state.reviews.newReview,
      rating: state.reviews.newRating,
    };
    const { data } = await axios.post('http://localhost:4000/api/comments', newFeedback);
    console.log(data);
    dispatch(addReview(newFeedback));// eslint-disable-line no-use-before-define
  } catch (error) {
    console.log('%cError push review:', 'color: red; font-weight: bold;', error);
  }
};

export const removeReviewId = (_id) => async (dispatch) => {
  try {
    await axios.delete('http://localhost:4000/api/comments/_id');
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
  setNewReviewText,
} = reviewsSlice.actions;

/* eslint-enable no-param-reassign */

export default reviewsSlice.reducer;
