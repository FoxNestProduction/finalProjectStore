export const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

export const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
