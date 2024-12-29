import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isPreview: boolean;
}

const initialState: ModalState  = {
  isPreview: true,
};

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    addPreview(state, action) {
      state.isPreview = true
    },
    removePreview(state) {
      state.isPreview = false
    }
  },
});

export const { addPreview, removePreview } = previewSlice.actions;

export default previewSlice.reducer;
