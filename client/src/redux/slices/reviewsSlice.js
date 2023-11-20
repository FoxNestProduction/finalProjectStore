import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../API/instance';

const initialState = {
  reviews: [],
  newReview: {
    user_id: '',
    rating: null,
    avatarUrl: '',
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
  setReviews,
  addReview,
  removeReview,
  setNewReview,
  searchReviews,
  setIndexSearchReview,
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

export const removeReviewId = (_id) => async (dispatch) => {
  try {
    await instance.delete('/comments/_id');
    dispatch(removeReview(_id));
  } catch (error) {
    console.log('%cError delete review:', 'color: red; font-weight: bold;', error);
  }
};

export default reviewsSlice.reducer;
