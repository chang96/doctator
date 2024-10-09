import { createSlice } from "@reduxjs/toolkit";

interface RequestConfiguration {
  baseUrl: string;
  headers?: Record<string, string>;
  queries?: Record<string, string>[];
  params?: string[];
  authentication?: Record<string, string>;
  method: string;
  paths?: string;
  body?: Record<string, any>;
  description?: Record<string, any>;
  tags: Record<string, string>;
}

const initialState: RequestConfiguration = {
  baseUrl: "",
  headers: {},
  queries: [],
  params: [],
  authentication: {},
  method: "GET",
  paths: "",
  body: {},
  description: {},
  tags: {},
};

const requestConfigurationSlice = createSlice({
  name: "requestConfiguration",
  initialState,
  reducers: {
    setBaseUrl(state, action) {
        state.baseUrl = action.payload.baseUrl;
    },
    setMethod(state, action) {
        state.method = action.payload.method
    }
  },
});

export const { setBaseUrl, setMethod} = requestConfigurationSlice.actions;

export default requestConfigurationSlice.reducer;
