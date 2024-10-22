import React, { useState } from "react";
import "../elements.css";
import { getProject, setProjectByProjectName } from "../../utils/localstorageFuncs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Servers = { url: string };
function ServersFunc() {
  const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)
  const projectConfiguration = getProject(projectName)
  const serversArr = projectConfiguration.config.servers as Servers[]
  const [state, setState] = useState<{ servers: Servers[] }>({ servers: [...serversArr] });
  const addServer = () => {
    setState({ servers: [...state.servers, { url: "" }] });
    projectConfiguration.config.servers = [...state.servers, { url: "" }]
    setProjectByProjectName(projectName, projectConfiguration)
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const index = Number(name.split('-')[1])
    state.servers[index].url = value
    setState({ servers: [...state.servers]})
    projectConfiguration.config.servers[index].url = value 
    setProjectByProjectName(projectName, projectConfiguration)
  };

  const deleteServer = (index: number) => {
    const newServers = [...state.servers];
    newServers.splice(index, 1);
    setState({ servers: newServers });
    projectConfiguration.config.servers = newServers
    setProjectByProjectName(projectName, projectConfiguration)
  };

  return (
    <div className="c">
      <div>
        <p>Servers:</p>
      </div>
      <div className="fc">
        {state.servers.map((server, index) => {
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                style={{ cursor: "pointer" }}
                onClick={() => deleteServer(index)}
              >
                X
              </button>
              <div>
                <div>url {index + 1}:</div>
                <div>
                  <input
                  value={server.url}
                    name={`url-${index}`}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addServer()}
      >
        +
      </button>
    </div>
  );
}

export default ServersFunc;
