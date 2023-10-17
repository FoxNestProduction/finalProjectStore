import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  buttonBox: false,
  buttonAgree: {
    text: '',
    startIcon: false,
    endIcon: false,
    onClick: null,
    disabled: false,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = '';
      state.content = '';
      state.buttonBox = false;
      state.buttonAgree.text = '';
      state.buttonAgree.startIcon = false;
      state.buttonAgree.endIcon = false;
      state.buttonAgree.onClick = null;
      state.buttonAgree.disabled = false;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setButtonAgree(state, action) {
      state.buttonAgree = action.payload;
    },
    addButtonBox(state) {
      state.buttonBox = true;
    },
  },
});

export const {
  openModal,
  closeModal,
  setTitle,
  setContent,
  setButtonAgree,
  addButtonBox,
} = modalSlice.actions;

export default modalSlice.reducer;
