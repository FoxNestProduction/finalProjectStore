import { createSlice } from '@reduxjs/toolkit';
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
  error: null,
};

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
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setNewReview,
  searchReviews,
  setIndexSearchReview,
  resetReviewState,
  setError,
} = reviewsSlice.actions;

export const addNewReview = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { data } = await instance.post('/comments', state.reviews.newReview);
    const { customer, date, content, rating, _id } = data;
    dispatch(setNewReview({ field: 'customer', value: customer }));
    dispatch(setNewReview({ field: 'date', value: date }));
    dispatch(setNewReview({ field: 'content', value: content }));
    dispatch(setNewReview({ field: 'rating', value: rating }));
    dispatch(setNewReview({ field: '_id', value: _id }));
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export default reviewsSlice.reducer;
