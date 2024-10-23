import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProject,
  getProject,
  setProjectByProjectName,
} from "../utils/localstorageFuncs";
import { getSampleData } from "../utils/helpers";
import newConfig from "../sampleData/newConfig.json";
import newPaths from "../sampleData/newPaths.json";

const projects = {
  defaultProject: {
    config: {},
    paths: {},
    set: false,
  },
};

if (!window.localStorage.getItem("projects"))
  window.localStorage.setItem("projects", JSON.stringify(projects));

type Servers = { url: string };

const allProjects = JSON.parse(window.localStorage.getItem("projects") || "{}");
const projectName = "defaultProject";

const def = getProject(projectName);

if (projectName === "defaultProject" && !def.set) {
  const c = getSampleData("/sampleconfig");
  const p = getSampleData("/samplepath");
  projects.defaultProject.config = c;
  projects.defaultProject.paths = p;
  projects.defaultProject.set = true;
  setProjectByProjectName("defaultProject", projects.defaultProject);
}
const projectConfiguration = getProject(projectName);

const serverArr: Servers[] = [...projectConfiguration.config.servers];

const endpoints = (
  projectConfiguration.paths.endpoints as RequestConfiguration[]
).map((endpoint) => {
  return {
    ...endpoint,
    ...(!endpoint.baseUrl && { baseUrl: serverArr[0].url }),
    headers: { "content-type": "application/json" },
  };
});
const initialState: {
  endpoints: RequestConfiguration[];
  selectedEndpoint: number;
  selectedProjectName: string;
  projectList: string[];
} = {
  endpoints,
  selectedEndpoint: 0,
  selectedProjectName: "defaultProject",
  projectList: Object.keys(allProjects),
};
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

function saveEndpointsInLocalStorage(
  index: number,
  field: keyof RequestConfiguration,
  data: any,
  projectName: string
) {
  const projectConfiguration = getProject(projectName);

  const eps = JSON.parse(
    JSON.stringify([
      ...projectConfiguration.paths.endpoints,
    ] as RequestConfiguration[])
  );
  eps[index][field] = data;

  projectConfiguration.paths.endpoints = eps;

  setProjectByProjectName(projectName, projectConfiguration);
}

function pushNew(endpoint: RequestConfiguration, projectName: string) {
  const projectConfiguration = getProject(projectName);

  const eps = [
    ...projectConfiguration.paths.endpoints,
    endpoint,
  ] as RequestConfiguration[];
  projectConfiguration.paths.endpoints = eps;
  setProjectByProjectName(projectName, projectConfiguration);
}

function removeEndpointFromLocalStorage(index: number, projectName: string) {
  const projectConfiguration = getProject(projectName);

  const eps = [
    ...projectConfiguration.paths.endpoints,
  ] as RequestConfiguration[];
  eps.splice(index, 1);
  projectConfiguration.paths.endpoints = eps;
  setProjectByProjectName(projectName, projectConfiguration);
}

const requestConfigurationSlice = createSlice({
  name: "requestConfiguration",
  initialState,
  reducers: {
    setBaseUrl(state, action) {
      state.endpoints[state.selectedEndpoint].baseUrl = action.payload.baseUrl;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "baseUrl",
        action.payload.baseUrl,
        state.selectedProjectName
      );
    },
    setMethod(state, action) {
      state.endpoints[state.selectedEndpoint].method = action.payload.method;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "method",
        action.payload.method,
        state.selectedProjectName
      );
    },
    setPaths(state, action) {
      state.endpoints[state.selectedEndpoint].path = action.payload.path;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "path",
        action.payload.path,
        state.selectedProjectName
      );
    },
    setParams(state, action) {
      state.endpoints[state.selectedEndpoint].requestParams =
        action.payload.params;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "requestParams",
        action.payload.params,
        state.selectedProjectName
      );
    },
    setQueries(state, action) {
      state.endpoints[state.selectedEndpoint].requestQueries = [];
      action.payload.queries.forEach((query: Queries) => {
        (state.endpoints[state.selectedEndpoint].requestQueries || []).push({
          name: query.name,
          value: query.value,
          staticField: query.staticField,
        });
      });
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "requestQueries",
        action.payload.queries,
        state.selectedProjectName
      );
    },
    setHeaders(state, action) {
      state.endpoints[state.selectedEndpoint].headers = action.payload.headers;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "headers",
        action.payload.headers,
        state.selectedProjectName
      );
    },
    setBody(state, action) {
      state.endpoints[state.selectedEndpoint].requestBody = action.payload.body;
      // saveEndpointsInLocalStorage(state.selectedEndpoint, "requestBody", action.payload.body, state.selectedProjectName)
    },
    setDescriptionDetails(state, action) {
      state.endpoints[state.selectedEndpoint].description =
        action.payload.description;
      state.endpoints[state.selectedEndpoint].summary = action.payload.summary;
      state.endpoints[state.selectedEndpoint].operationId =
        action.payload.operationId;
      state.endpoints[state.selectedEndpoint].name = action.payload.name;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "description",
        action.payload.description,
        state.selectedProjectName
      );
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "summary",
        action.payload.summary,
        state.selectedProjectName
      );
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "operationId",
        action.payload.operationId,
        state.selectedProjectName
      );
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "name",
        action.payload.name,
        state.selectedProjectName
      );
    },
    setTag(state, action) {
      state.endpoints[state.selectedEndpoint].tags = action.payload.tags;
      saveEndpointsInLocalStorage(
        state.selectedEndpoint,
        "tags",
        action.payload.tags,
        state.selectedProjectName
      );
    },
    setSelectedEndpoint(state, action) {
      state.selectedEndpoint = action.payload.index;
    },
    setNewEnpoint(state, action) {
      state.endpoints.push(action.payload.endpoint);
      state.selectedEndpoint = state.endpoints.length - 1;
      pushNew(action.payload.endpoint, state.selectedProjectName);
    },
    setAuthd(state, action) {
      if (action.payload.authd.use) {
        state.endpoints[state.selectedEndpoint].authd.position =
          action.payload.authd.position;
        state.endpoints[state.selectedEndpoint].authd.use = true;
        saveEndpointsInLocalStorage(
          state.selectedEndpoint,
          "authd",
          { use: true, position: action.payload.authd.position },
          state.selectedProjectName
        );
      } else {
        state.endpoints[state.selectedEndpoint].authd.use = false;
        saveEndpointsInLocalStorage(
          state.selectedEndpoint,
          "authd",
          { use: false, position: undefined },
          state.selectedProjectName
        );
      }
    },
    deleteEndpoint(state, action) {
      state.endpoints.splice(action.payload.index, 1);
      if (state.selectedEndpoint >= action.payload.index)
        state.selectedEndpoint--;
      removeEndpointFromLocalStorage(
        action.payload.index,
        state.selectedProjectName
      );
    },
    setSelectedProjectName(state, action) {
      const selectedProject = getProject(action.payload.projectName);
      const serverArr: Servers[] = [...selectedProject.config.servers];
      const endpoints = (
        selectedProject.paths.endpoints as RequestConfiguration[]
      ).map((endpoint) => {
        return {
          ...endpoint,
          ...(!endpoint.baseUrl && { baseUrl: serverArr[0].url }),
          headers: { "content-type": "application/json" },
        };
      });
      state.selectedEndpoint = 0;
      state.endpoints = endpoints;
      state.selectedProjectName = action.payload.projectName;
    },
    addProjectList(state, action) {
      const newProjectName = action.payload.newProject;
      state.projectList.push(newProjectName);
      const newProjectObject = {
        [newProjectName]: {
          config: newConfig,
          paths: newPaths,
          set: true,
        },
      };
      setProjectByProjectName(newProjectName, newProjectObject[newProjectName]);
    },
    removeProjectFromList(state, action) {
      const projectName = state.projectList[action.payload.index];
      state.projectList.splice(action.payload.index, 1);
      deleteProject(projectName);
    },
  },
});

export const {
  setBaseUrl,
  setMethod,
  setPaths,
  setParams,
  setQueries,
  setHeaders,
  setBody,
  setDescriptionDetails,
  setTag,
  setSelectedEndpoint,
  setNewEnpoint,
  setAuthd,
  deleteEndpoint,
  addProjectList,
  removeProjectFromList,
  setSelectedProjectName,
} = requestConfigurationSlice.actions;

export default requestConfigurationSlice.reducer;
