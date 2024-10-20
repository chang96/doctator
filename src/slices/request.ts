import { createSlice } from "@reduxjs/toolkit";
import { getProject } from "../utils/localstorageFuncs";
type Servers = { url: string };

const projectName = "defaultProject";
const projectConfiguration = getProject(projectName);
const serverArr = [...projectConfiguration.config.servers] as Servers[]



const endpoints = (projectConfiguration.paths.endpoints as RequestConfiguration[]).map(endpoint => {
  return {
    ...endpoint, baseUrl: serverArr[0].url, headers:{"content-type": "application/json"}
  }
})
console.log(endpoints)
const initialState: {endpoints: RequestConfiguration[], selectedEndpoint: number} = {endpoints, selectedEndpoint: 0}
// {
//   baseUrl: "",
//   headers: {},
//   queries: [],
//   params: [],
//   authentication: {},
//   method: "GET",
//   paths: "",
//   body: {},
//   description: "",
//   tags: [],
//   summary: "",
//   operationId: "",
//   name: "",
// };

const requestConfigurationSlice = createSlice({
  name: "requestConfiguration",
  initialState,
  reducers: {
    setBaseUrl(state, action) {
        state.endpoints[state.selectedEndpoint].baseUrl = action.payload.baseUrl;
    },
    setMethod(state, action) {
        state.endpoints[state.selectedEndpoint].method = action.payload.method
    },
    setPaths(state, action) {
      state.endpoints[state.selectedEndpoint].path = action.payload.path
    },
    setParams(state, action) {
      state.endpoints[state.selectedEndpoint].requestParams = action.payload.params
    },
    setQueries(state, action) {
      state.endpoints[state.selectedEndpoint].requestQueries = []
      action.payload.queries.forEach((query: Queries)  => {
        (state.endpoints[state.selectedEndpoint].requestQueries || []).push({
          name: query.name,
          value: query.value,
          staticField: query.staticField,
        })
      })
    },
    setHeaders(state, action) {
      state.endpoints[state.selectedEndpoint].headers = action.payload.headers
    },
    setBody(state, action) {
      state.endpoints[state.selectedEndpoint].requestBody = action.payload.body
    },
    setDescriptionDetails(state, action) {
      state.endpoints[state.selectedEndpoint].description = action.payload.description
      state.endpoints[state.selectedEndpoint].summary = action.payload.summary
      state.endpoints[state.selectedEndpoint].operationId = action.payload.operationId
      state.endpoints[state.selectedEndpoint].name = action.payload.name
    },
    setTag(state,action) {
      state.endpoints[state.selectedEndpoint].tags = action.payload.tags
    },
    setSelectedEndpoint(state, action) {
      state.selectedEndpoint = action.payload.index
    }, 
    setNewEnpoint(state, action) {
      state.endpoints.push(action.payload.endpoint)
      state.selectedEndpoint = state.endpoints.length - 1
    },
    setAuthd(state, action){
      if(action.payload.authd.use){
        state.endpoints[state.selectedEndpoint].authd.position = action.payload.authd.position
        state.endpoints[state.selectedEndpoint].authd.use = true
      } else {
        state.endpoints[state.selectedEndpoint].authd.use = false
      }
    },
    deleteEndpoint(state, action) {
      state.endpoints.splice(action.payload.index, 1)
      if(state.selectedEndpoint >= action.payload.index) state.selectedEndpoint--
    }
  },
});

export const { setBaseUrl, setMethod, setPaths, setParams, setQueries, setHeaders, setBody, setDescriptionDetails, setTag, setSelectedEndpoint, setNewEnpoint, setAuthd, deleteEndpoint} = requestConfigurationSlice.actions;

export default requestConfigurationSlice.reducer;
