import React, { useState } from "react";
import "../elements.css";
import { getProject, setProjectByProjectName } from "../../utils/localstorageFuncs";
type Sec = { schemeName: string; type: string; in?: string; name?: string; description?: string; bearerFormat?: string; scheme?: string };
type F = keyof Sec;
function SecuritySchemes() {
  const projectName = 'defaultProject'
  const projectConfiguration = getProject(projectName)
  const securitySchemesObj = (projectConfiguration.config.components.securitySchemes as Record<string, Omit<Sec, 'schemeName'>>)
  const securitySchemesArr = Object.entries(securitySchemesObj).map(([name, sec]) => ({...sec, schemeName: name }));
  const [state, setState] = useState<{ securityScheme: Sec[] }>({
    securityScheme: [...securitySchemesArr],
  });
  const addSecurityScheme = () => {
    const newSec = { schemeName: "", type: "", in: "", name: "", description:"", bearerFormat: "", scheme: "" };
    setState({ securityScheme: [...state.securityScheme, newSec] });
    projectConfiguration.config.components.securitySchemes = [...state.securityScheme, newSec].reduce((acc, curr) => {
      for (const k in curr) {
        if (curr[k as F]  === 'unused') {
          delete curr[k as F];
        }
      }
      acc[curr.schemeName] = curr
      return acc;
    }, {} as Record<string, Sec>)
    setProjectByProjectName(projectName, projectConfiguration)
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    const stateCopy = [...state.securityScheme]
    stateCopy[Number(index)][field as F] = value;
    setState({ securityScheme: [...stateCopy] });
    projectConfiguration.config.components.securitySchemes = [...stateCopy].reduce((acc, curr) => {
      for (const k in curr) {
        if (curr[k as F]  === 'unused') {
          delete curr[k as F];
        }
      }
      acc[curr.schemeName] = curr
      return acc;
    }, {} as Record<string, Sec>)
    setProjectByProjectName(projectName, projectConfiguration)
  };
  const deleteSecurityScheme = (index: number) => {
    const newSec = [...state.securityScheme];
    newSec.splice(index, 1);
    setState({ securityScheme: newSec });
    projectConfiguration.config.components.securitySchemes = [...newSec].reduce((acc, curr) => {
      for (const k in curr) {
        if (curr[k as F]  === 'unused') {
          delete curr[k as F];
        }
      }
      acc[curr.schemeName] = curr
      return acc;
    }, {} as Record<string, Sec>)
    setProjectByProjectName(projectName, projectConfiguration)
  };

  return (
    <div className="c">
      <div>
        <p>Security Scheme:</p>
      </div>

      <div>
        {state.securityScheme.map((sec, index) => {
          console.log(sec.type)
          if (sec.type === 'http') {
            sec.description = 'unused'
            sec.in = 'unused'
            sec.name = 'unused'
            sec.bearerFormat = sec.bearerFormat === "unused" ? "" : sec.bearerFormat
            sec.scheme = sec.scheme === "unused" ? "" : sec.scheme
          }
          if (sec.type === 'apiKey') {
            sec.bearerFormat = 'unused'
            sec.description = 'unused'
            sec.scheme = 'unused'
            sec.in = sec.in === "unused" ? "" : sec.in
            sec.name = sec.name === "unused" ? "" : sec.name
          }
          const x = Object.entries(sec).filter(([k, v]) => v !== 'unused')
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                onClick={() => deleteSecurityScheme(index)}
              >
                X
              </button>
              {x.map(([k, v], i) => {
                return <div key={i}>
                <div>{k}:</div>
                <input
                  name={`${k}-${index}`}
                  value={v}
                  onChange={handleChange}
                />
              </div>
              })}
             
              {/* <div>
                <div>scheme name:</div>
                <input
                  name={`schemeName-${index}`}
                  value={sec.schemeName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>type:</div>
                <input
                  name={`type-${index}`}
                  value={sec.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>in:</div>
                <input name={`in-${index}`} value={"header"} readOnly />
              </div>
              <div>
                <div>name:</div>
                <input
                  name={`name-${index}`}
                  value={sec.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>description:</div>
                <input
                  name={`description-${index}`}
                  value={sec.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>bearerFormat:</div>
                <input
                  name={`bearerFormat-${index}`}
                  value={sec.bearerFormat}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>scheme:</div>
                <input
                  name={`scheme-${index}`}
                  value={sec.scheme}
                  onChange={handleChange}
                />
              </div> */}
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addSecurityScheme()}
      >
        +
      </button>
    </div>
  );
}

export default SecuritySchemes;
