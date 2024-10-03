import { useState } from "react";
import "../elements.css";
import {
  getProject,
  setProjectByProjectName,
} from "../../utils/localstorageFuncs";
type SecurityType = Record<string, boolean | Array<any>>;
function Security() {
  const projectName = "defaultProject";
  const projectConfiguration = getProject(projectName);
  const securityArr = projectConfiguration.config.security as SecurityType[];
  const securityComponents = projectConfiguration.config.components
    .securitySchemes as Record<string, any>;
  const securityArrKeys = Object.keys(securityComponents);
  const secTypes = {} as SecurityType;
  const reducedSecArr = securityArrKeys.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, secTypes);

  const transformedSecurityArr = securityArr.map((sec) => {
    return { ...reducedSecArr, ...sec };
  });

  const [state, setState] = useState<{ security: SecurityType[] }>({
    security: [...transformedSecurityArr],
  });
  const addSecurity = () => {
    const newSecurity: SecurityType = reducedSecArr;
    setState({ security: [...state.security, newSecurity] });
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    const [field, , index] = name.split("**");

    if (!state.security[Number(index)][field]) {
      state.security[Number(index)][field] = [];
    } else if (state.security[Number(index)][field]) {
      state.security[Number(index)][field] = false;
    }
    setState({ security: [...state.security] });
    const stateCopy = JSON.parse(
      JSON.stringify(state.security)
    ) as SecurityType[];

    // stateCopy[Number(index)][field] ? stateCopy[Number(index)][field] = false : stateCopy[Number(index)][field] = []
    const delUnused = stateCopy.map((x) => {
      for (const k in x) {
        if (!x[k]) {
          delete x[k];
        }
      }

      return x;
    });
    projectConfiguration.config.security = delUnused;

    setProjectByProjectName(projectName, projectConfiguration);
  };
  const deleteSecurity = (index: number) => {
    const newSecurity = [...state.security];
    newSecurity.splice(index, 1);
    setState({ security: newSecurity });
  };
  return (
    <div className="c">
      <div>
        <p>Security</p>
      </div>

      <div className="fc">
        {state.security.map((sec, index) => {
          const secArr = Object.entries(sec);
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                style={{ cursor: "pointer" }}
                onClick={() => deleteSecurity(index)}
              >
                X
              </button>
              {secArr.map(([k, v], j) => {
                return (
                  <div key={j} className="fr">
                    <input
                      onChange={(e) => handleChange(e)}
                      defaultChecked={!!v}
                      type="checkbox"
                      name={`${k}**${j}**${index}`}
                    />
                    <div>{k}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addSecurity()}
      >
        +
      </button>
    </div>
  );
}

export default Security;
