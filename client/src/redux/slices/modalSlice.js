import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isTextField: false,
  isDialogContentText: false,
  title: '',
  textContent: '',
  buttonAgree: {
    text: '',
    startIcon: false,
    endIcon: false,
    onClick: null,
  },
};

/* eslint-disable no-param-reassign */

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setTextContent(state, action) {
      state.textContent = action.payload;
    },
    setButtonAgree(state, action) {
      state.buttonAgree = action.payload;
    },
    setTextField(state) {
      state.isTextField = true;
    },
    setDialogContentText(state) {
      state.isTextField = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  setDialogContentText,
  setTextField,
  setTitle,
  setTextContent,
  setButtonAgree,
} = modalSlice.actions;

/* eslint-enable no-param-reassign */

export default modalSlice.reducer;
