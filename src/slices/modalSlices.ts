import { createSlice } from '@reduxjs/toolkit';
import { CONFIG_SELECTED, PATH_SELECTED } from '../actions/actions';

interface ModalState {
  displayModal: boolean;
  selected: "config" | "paths" | undefined
}

const initialState: ModalState  = {
  displayModal: false,
  selected: undefined
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      if(action.payload.type === CONFIG_SELECTED){
        state.selected = "config"
      } else if(action.payload.type === PATH_SELECTED){
        state.selected = "paths"
      }else if(action.payload.type === state.selected){
        state.selected = undefined
      }
      state.displayModal = !state.displayModal
    },
    closeModal(state) {
      state.displayModal = false
      state.selected = undefined
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
