import { createSlice } from "@reduxjs/toolkit";
import { getProject, setProjectByProjectName } from "../utils/localstorageFuncs";
import { getSampleData } from "../utils/helpers";

const projects = {
  defaultProject: {
    config: {},
    paths: {},
    set: false
  }
}

if (!window.localStorage.getItem('projects')) window.localStorage.setItem('projects', JSON.stringify(projects));

type Servers = { url: string };

const projectName = "defaultProject";

const def= getProject(projectName);

if(projectName === "defaultProject" && !def.set){
  const c = getSampleData("/sampleconfig")
  const p = getSampleData("/samplepath") 
  projects.defaultProject.config = c
  projects.defaultProject.paths = p
  projects.defaultProject.set = true
  setProjectByProjectName("defaultProject", projects.defaultProject)
}
const projectConfiguration = getProject(projectName);

const serverArr: Servers[]  = [...projectConfiguration.config.servers] 


const endpoints = (projectConfiguration.paths.endpoints as RequestConfiguration[]).map(endpoint => {
  return {
    ...endpoint, ...(!endpoint.baseUrl && {baseUrl: serverArr[0].url}), headers:{"content-type": "application/json"}
  }
})
const initialState: {endpoints: RequestConfiguration[], selectedEndpoint: number, selectedProjectName: string} = {endpoints, selectedEndpoint: 0, selectedProjectName: "defaultProject"}
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

function saveEndpointsInLocalStorage(index:number, field: keyof RequestConfiguration, data: any ){
  const eps = JSON.parse(JSON.stringify([...projectConfiguration.paths.endpoints] as RequestConfiguration[]))
  eps[index][field] = data

  projectConfiguration.paths.endpoints = eps

  setProjectByProjectName("defaultProject", projectConfiguration)
}

function pushNew(endpoint: RequestConfiguration){
  const eps = [...projectConfiguration.paths.endpoints, endpoint] as RequestConfiguration[]
  projectConfiguration.paths.endpoints = eps
  setProjectByProjectName("defaultProject", projectConfiguration)
}

function removeEndpointFromLocalStorage(index: number) {
  const eps = [...projectConfiguration.paths.endpoints] as RequestConfiguration[]
  eps.splice(index, 1)
  projectConfiguration.paths.endpoints = eps
  setProjectByProjectName("defaultProject", projectConfiguration)
}

const requestConfigurationSlice = createSlice({
  name: "requestConfiguration",
  initialState,
  reducers: {
    setBaseUrl(state, action) {
        state.endpoints[state.selectedEndpoint].baseUrl = action.payload.baseUrl;
        saveEndpointsInLocalStorage(state.selectedEndpoint, "baseUrl", action.payload.baseUrl)
    },
    setMethod(state, action) {
        state.endpoints[state.selectedEndpoint].method = action.payload.method
        saveEndpointsInLocalStorage(state.selectedEndpoint, "method", action.payload.method)
    },
    setPaths(state, action) {
      state.endpoints[state.selectedEndpoint].path = action.payload.path
      saveEndpointsInLocalStorage(state.selectedEndpoint, "path", action.payload.path)
    },
    setParams(state, action) {
      state.endpoints[state.selectedEndpoint].requestParams = action.payload.params
      saveEndpointsInLocalStorage(state.selectedEndpoint, "requestParams", action.payload.params)
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
      saveEndpointsInLocalStorage(state.selectedEndpoint, "requestQueries", action.payload.queries)
    },
    setHeaders(state, action) {
      state.endpoints[state.selectedEndpoint].headers = action.payload.headers
      saveEndpointsInLocalStorage(state.selectedEndpoint, "headers", action.payload.headers)
    },
    setBody(state, action) {
      state.endpoints[state.selectedEndpoint].requestBody = action.payload.body
      // saveEndpointsInLocalStorage(state.selectedEndpoint, "requestBody", action.payload.body)
    },
    setDescriptionDetails(state, action) {
      state.endpoints[state.selectedEndpoint].description = action.payload.description
      state.endpoints[state.selectedEndpoint].summary = action.payload.summary
      state.endpoints[state.selectedEndpoint].operationId = action.payload.operationId
      state.endpoints[state.selectedEndpoint].name = action.payload.name
      saveEndpointsInLocalStorage(state.selectedEndpoint, "description", action.payload.description)
      saveEndpointsInLocalStorage(state.selectedEndpoint, "summary", action.payload.summary)
      saveEndpointsInLocalStorage(state.selectedEndpoint, "operationId", action.payload.operationId)
      saveEndpointsInLocalStorage(state.selectedEndpoint, "name", action.payload.name)

    },
    setTag(state,action) {
      state.endpoints[state.selectedEndpoint].tags = action.payload.tags
      saveEndpointsInLocalStorage(state.selectedEndpoint, "tags", action.payload.tags)
    },
    setSelectedEndpoint(state, action) {
      state.selectedEndpoint = action.payload.index
    }, 
    setNewEnpoint(state, action) {
      state.endpoints.push(action.payload.endpoint)
      state.selectedEndpoint = state.endpoints.length - 1
      pushNew(action.payload.endpoint)
    },
    setAuthd(state, action){
      if(action.payload.authd.use){
        state.endpoints[state.selectedEndpoint].authd.position = action.payload.authd.position
        state.endpoints[state.selectedEndpoint].authd.use = true
        saveEndpointsInLocalStorage(state.selectedEndpoint, 'authd', {use: true, position: action.payload.authd.position})
      } else {
        state.endpoints[state.selectedEndpoint].authd.use = false
        saveEndpointsInLocalStorage(state.selectedEndpoint, 'authd', {use: false, position: undefined})
      }
    },
    deleteEndpoint(state, action) {
      state.endpoints.splice(action.payload.index, 1)
      if(state.selectedEndpoint >= action.payload.index) state.selectedEndpoint--
      removeEndpointFromLocalStorage(action.payload.index)
    }
  },
});

export const { setBaseUrl, setMethod, setPaths, setParams, setQueries, setHeaders, setBody, setDescriptionDetails, setTag, setSelectedEndpoint, setNewEnpoint, setAuthd, deleteEndpoint} = requestConfigurationSlice.actions;

export default requestConfigurationSlice.reducer;
