function initializeProjects(){

const projects = {
    defaultProject: {
      config: {},
      paths: {},
      set: false
    }
  }
  
  if (!window.localStorage.getItem('projects')) window.localStorage.setItem('projects', JSON.stringify(projects));
}

function getProject(projectName: string) {
    const projects = JSON.parse(window.localStorage.getItem('projects') || '{}');
    return projects[projectName]
}

function setProject(projectName: string, data:{config: any, paths: any, set: boolean}, fieldName: string){
    const projects = JSON.parse(window.localStorage.getItem('projects') || '{}');
    projects[projectName][fieldName] = data;
    window.localStorage.setItem('projects', JSON.stringify(projects));
}

function deleteProject(projectName: string){
    const projects = JSON.parse(window.localStorage.getItem('projects') || '{}');
    delete projects[projectName];
    window.localStorage.setItem('projects', JSON.stringify(projects));
}
export {
    initializeProjects,
    getProject,
    setProject,
    deleteProject
}