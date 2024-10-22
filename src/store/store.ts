import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlices";
import configReducer from "../slices/docsConfigSlices"
import requestConfigReducer from "../slices/request";
import selectedEndpointReducer from "../slices/endpointsConfigSlices";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    config: configReducer,
    selectedEndpoint: selectedEndpointReducer,
    requestConfig: requestConfigReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
