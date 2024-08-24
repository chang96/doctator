import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  displayModal: boolean;
}

const initialState: ModalState  = {
  displayModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.displayModal = true
    },
    closeModal(state) {
      state.displayModal = false
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
