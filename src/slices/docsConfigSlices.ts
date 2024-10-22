import { createSlice } from '@reduxjs/toolkit';

interface ConfigState {
  generatedJson: any
}

const initialState: ConfigState  = {
  generatedJson: {}
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    genJson(state, action) {
      if(action.payload.generatedJson) state.generatedJson = action.payload.generatedJson
      else state.generatedJson = {}
    },
  },
});

export const { genJson } = configSlice.actions;

export default configSlice.reducer;
