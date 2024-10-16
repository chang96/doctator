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
  description?: string;
  tags: string[];
  summary: string;
  operationId: string;
  name: string;
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
  description: "",
  tags: [],
  summary: "",
  operationId: "",
  name: "",
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
    },
    setPaths(state, action) {
      state.paths = action.payload.paths
    },
    setParams(state, action) {
      state.params = action.payload.params
    },
    setQueries(state, action) {
      state.queries = action.payload.queries
    },
    setHeaders(state, action) {
      state.headers = action.payload.headers
    },
    setBody(state, action) {
      state.body = action.payload.body
    },
    setDescriptionDetails(state, action) {
      state.description = action.payload.description
      state.summary = action.payload.summary
      state.operationId = action.payload.operationId
      state.name = action.payload.name
    },
    setTag(state,action) {
      state.tags = action.payload.tags
    }
  },
});

export const { setBaseUrl, setMethod, setPaths, setParams, setQueries, setHeaders, setBody, setDescriptionDetails, setTag} = requestConfigurationSlice.actions;

export default requestConfigurationSlice.reducer;
