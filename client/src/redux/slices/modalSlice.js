import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  isOpen: false,
  isTextField: false,
  isDialogContentText: false,
  title: '',
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
} = modalSlice.actions;

export default modalSlice.reducer;
