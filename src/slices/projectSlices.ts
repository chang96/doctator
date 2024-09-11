import { createSlice } from '@reduxjs/toolkit';

interface Project {
    config: any,
    paths: any,
    set: boolean
}

let initialState: Record<string, Project> = {
  defaultProject: {
    config: {},
    paths: {},
    set: false
  }
};
const loadedProjects = window.localStorage.getItem('projects')
if (loadedProjects) {
    const toJson = JSON.parse(loadedProjects)
    initialState = {...initialState, ...toJson}
}



const projectsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action) {
      state[action.payload.name] = action.payload.project
      window.localStorage.setItem('projects', JSON.stringify(state))
    },
  },
});

export const { setProject } = projectsSlice.actions;

export default projectsSlice.reducer;
