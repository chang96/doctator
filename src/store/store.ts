import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlices";
import configReducer from "../slices/docsConfigSlices"
import requestConfigReducer from "../slices/request";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    config: configReducer,
    requestConfig: requestConfigReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
