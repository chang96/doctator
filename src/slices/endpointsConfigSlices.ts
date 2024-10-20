import { createSlice } from '@reduxjs/toolkit';

interface SelectedEndpoint {
    index: number
}

const initialState: SelectedEndpoint  = {
  index: 0
};

const selectedEndpointSlice = createSlice({
    name:'selectedEndpoint',
    initialState,
    reducers: {
        setIndex(state, action) {
            state.index = action.payload.index
        }
    }
})

export const { setIndex } = selectedEndpointSlice.actions;

export default selectedEndpointSlice.reducer;