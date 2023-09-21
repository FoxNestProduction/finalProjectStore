import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  isOpen: false,
  isTextField: false,
  isDialogContentText: false,
  title: '',
  content: '',
  buttonAgree: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialValue,
  reducers: {
    openModal(state) {
      const newState = { ...state };
      newState.isOpen = true;
      return newState;
    },
    closeModal(state) {
      const newState = { ...state };
      newState.isOpen = false;
      return newState;
    },

    setTitle(state, action) {
      const newState = { ...state };
      newState.title = action.payload;
      return newState;
    },

    setContent(state, action) {
      const newState = { ...state };
      newState.content = action.payload;
      return newState;
    },

    setButtonAgree(state, action) {
      const newState = { ...state };
      newState.buttonAgree = action.payload;
      return newState;
    },

    setTextField: (state) => {
      const newState = { ...state };
      newState.isTextField = true;
      return newState;
    },
    setDialogContentText: (state) => {
      const newState = { ...state };
      newState.isTextField = false;
      return newState;
    },
  },
});

export const {
  openModal,
  closeModal,
  setDialogContentText,
  setTextField,
  setTitle,
  setContent,
  setButtonAgree,
} = modalSlice.actions;

export default modalSlice.reducer;
