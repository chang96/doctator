import React, { useState } from "react";
import "../elements.css";

type Servers = { url: string };
function ServersFunc() {
  const [state, setState] = useState<{ servers: Servers[] }>({ servers: [] });
  const addServer = () => {
    setState({ servers: [...state.servers, { url: "" }] });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const index = Number(name.split('-')[1])
    state.servers[index].url = value
    setState({ servers: [...state.servers]})
    
  };

  const deleteServer = (index: number) => {
    const newServers = [...state.servers];
    newServers.splice(index, 1);
    setState({ servers: newServers });
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
